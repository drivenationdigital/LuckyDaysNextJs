/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { createContext, useContext, useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";

export type CartItem = {
    product_id: string | number;
    name: string;
    slug: string;
    quantity: number;
    total_price: string;
    thumbnail_url: string;
    price: string;
    discounted_price: string;
    discounted_total_price: string;
    max_tickets: number;
    stock_count: number;
    tickets_left: number;
    multi_buy_discount_percent?: number; // Optional, only if applicable

};

export type CartCoupons = {
    code: string;
    discount: string;
    type: "fixed" | "percentage";
    description?: string;
};

export type CartData = {
    cart_key: string;
    shipping: string;
    total: string;
    currency: string;
    subtotal: string;
    discounted_subtotal?: string; // Optional, only if applicable
    tax: string;
    items: CartItem[];
    ignored_coupons?: {
        code: string;
        message: string;
        status?: number; // Optional, for error handling
    }[];
    coupons: CartCoupons[]; // ✅ Add this line
};

type CartContextType = {
    cart: CartData | undefined;
    isLoading: boolean;
    notice: string | null;
    setNotice: (msg: string | null) => void;
    addItem: (productId: number, quantity?: number) => Promise<{ success: boolean; message?: string }>;
    removeItem: (itemId: number | string) => Promise<void>;
    updateQty: (itemId: number | string, quantity: number) => Promise<void>;
    clearCart: () => Promise<void>;
    addCoupon: (code: string) => Promise<void>;
    removeCoupon: (code: string) => Promise<void>;
    sync: () => void;
    isMutating: boolean;
};

const CartContext = createContext<CartContextType | null>(null);
const CART_KEY = "cart.key";

export function getStoredCartKey(): string {
    if (typeof window === "undefined") return "";
    let key = localStorage.getItem(CART_KEY) ?? "";
    if (!key) {
        key = uuidv4();
        localStorage.setItem(CART_KEY, key);
    }

    return key;
}

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const queryClient = useQueryClient();
    const cartKey = useMemo(() => getStoredCartKey(), []);
    const [notice, setNotice] = useState<string | null>(null);
    const [isMutating, setIsMutating] = useState(false);

    const {
        data: cart,
        isLoading,
    } = useQuery<CartData>({
        queryKey: ["cart", cartKey],
        queryFn: async () => {
            const res = await fetch(`/api/cart/${cartKey}`);
            if (!res.ok) {
                const errorData = await res.json();
                if (errorData?.message == "invalid or expired token") {
                    setNotice(null); // Clear any existing notices
                } else {
                    setNotice(`❌ ${errorData.message || "Failed to fetch cart"}`);
                }

                throw new Error(errorData.message || "Failed to fetch cart");
            }

            return res.json();
        },
        staleTime: 60 * 1000,
        // refetchInterval: 30 * 1000,
    });

    const sync = () => queryClient.invalidateQueries({ queryKey: ["cart", cartKey] });

    const addItem = async (productId: number, quantity: number = 1) => {
        try {
            setIsMutating(true); // ✅ Start loading
            const res = await fetch(`/api/cart/${cartKey}/add-item`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ productId, quantity }),
            });
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || "Failed to add item to cart");
            }
            const data = await res.json();
            if (!data.success) {
                throw new Error(data.message || "Failed to add item to cart");
            }

            sync();

            return data; // Return the response data if needed
        } catch (err: any) {
            setNotice(`❌ ${err.message}`);
            return {
                success: false,
                message: err.message || "Failed to add item to cart",
            }
        }
        finally {
            setIsMutating(false); // ✅ End loading
        }
    };

    const removeItem = async (itemId: string | number) => {
        try {
            setIsMutating(true); // ✅ Start loading
            const res = await fetch(`/api/cart/${cartKey}/remove-item`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ itemId }),
            });
            if (!res.ok) throw new Error("Failed to remove item");
            setNotice("🗑️ Item removed from cart.");
            sync();
        } catch (err: any) {
            setNotice(`❌ ${err.message}`);
        } finally {
            setIsMutating(false); // ✅ End loading
        }
    };

    const updateQty = async (itemId: string | number, quantity: number) => {
        try {
            setIsMutating(true); // ✅ Start loading
            await fetch(`/api/cart/${cartKey}/update-qty`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ itemId, quantity }),
            });
            setNotice("🔄 Quantity updated.");
            sync();
        } catch (err: any) {
            setNotice(`❌ ${err.message}`);
        } finally {
            setIsMutating(false); // ✅ End loading
        }
    };

    const clearCart = async () => {
        try {
            setIsMutating(true); // ✅ Start loading
            await fetch(`/api/cart/${cartKey}/clear-cart`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            });
            setNotice("🧹 Cart cleared.");
            localStorage.removeItem(CART_KEY); // Clear stored cart key
            queryClient.removeQueries({ queryKey: ["cart", cartKey] }); // Remove cached cart data
        } catch (err: any) {
            setNotice(`❌ ${err.message}`);
        } finally {
            setIsMutating(false); // ✅ End loading
        }
    };

    const addCoupon = async (code: string) => {
        try {
            setIsMutating(true); // ✅ Start loading
            const res = await fetch(`/api/cart/${cartKey}/coupons/apply`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ coupon: code }),
            });
            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.message || "Failed to apply coupon");
            }
            setNotice("🎟️ Coupon applied.");
            sync();
        } catch (err: any) {
            setNotice(`❌ ${err.message}`);
        } finally {
            setIsMutating(false); // ✅ End loading
        }
    };

    const removeCoupon = async (code: string) => {
        try {
            setIsMutating(true); // ✅ Start loading
            await fetch(`/api/cart/${cartKey}/coupons/remove`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ coupon: code }),
            });
            setNotice("🚫 Coupon removed.");
            sync();
        } catch (err: any) {

            setNotice(`❌ ${err.message}`);
        } finally {
            setIsMutating(false); // ✅ End loading
        }
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                isLoading,
                notice,
                setNotice,
                addItem,
                removeItem,
                updateQty,
                clearCart,
                addCoupon,
                removeCoupon,
                sync,
                isMutating
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart must be used within CartProvider");
    return ctx;
};