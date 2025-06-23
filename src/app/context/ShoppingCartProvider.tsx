/* eslint-disable @typescript-eslint/no-explicit-any */
// lib/ShoppingCartContext.tsx
'use client';

import { BASE_URL } from '@/actions/api';
import { addItemToCart } from '@/actions/cart';
import React, { createContext, useEffect, useState, ReactNode, useContext } from 'react';

interface CartItem {
    key: string;
    id: number;
    name: string;
    quantity: number;
    line_total: {
        value: string;
        currency_code: string;
    };
    // Extend as needed
}

interface Cart {
    items: CartItem[];
    totals: any;
}

interface ShoppingCartContextValue {
    cart: Cart | null;
    isLoading: boolean;
    addItem: (productId: number, quantity?: number) => Promise<void>;
    removeItem: (key: string) => Promise<void>;
    updateItemQty: (key: string, quantity: number) => Promise<void>;
    clearCart: () => Promise<void>;
    refreshCart: () => Promise<void>;
}

const ShoppingCartContext = createContext<ShoppingCartContextValue | undefined>(undefined);

export const ShoppingCartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<Cart | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const fetchCart = async () => {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/api/get-cart`, {
            credentials: 'include',
        });
        
        const data = await res.json();
        console.log('Fetched cart data:', data);
        
        setCart(data);
        setIsLoading(false);
    };

    const addItem = async (productId: number, quantity = 1) => {
        await addItemToCart(productId, quantity);
        await fetchCart();
    };

    const removeItem = async (key: string) => {
        await fetch(`${process.env.NEXT_PUBLIC_WC_URL}/wp-json/wc/store/cart/remove-item`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ key }),
        });
        await fetchCart();
    };

    const updateItemQty = async (key: string, quantity: number) => {
        await fetch(`${process.env.NEXT_PUBLIC_WC_URL}/wp-json/wc/store/cart/update-item`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ key, quantity }),
        });
        await fetchCart();
    };

    const clearCart = async () => {
        await fetch(`${process.env.NEXT_PUBLIC_WC_URL}/wp-json/wc/store/cart/items`, {
            method: 'DELETE',
            credentials: 'include',
        });
        await fetchCart();
    };

    useEffect(() => {
        fetchCart();
    }, []);

    return (
        <ShoppingCartContext.Provider
            value={{
                cart,
                isLoading,
                addItem,
                removeItem,
                updateItemQty,
                clearCart,
                refreshCart: fetchCart,
            }}
        >
            {children}
        </ShoppingCartContext.Provider>
    );
};

// useContext hook for easier access
export const useShoppingCart = () => {
    const context = useContext(ShoppingCartContext);
    if (!context) {
        throw new Error('useShoppingCart must be used within a ShoppingCartProvider');
    }
    return context;
};
