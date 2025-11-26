/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useCart } from "@/app/context/cart-context";
import React, { useState } from "react";

export function ApplyCoupon() {
    const { addCoupon } = useCart();
    const [coupon, setCoupon] = useState("");
    const [loading, setLoading] = useState(false);

    const handleApply = async () => {
        if (!coupon.trim()) return;
        setLoading(true);

        try {
            await addCoupon(coupon.trim());
        } catch (error: any) {
        } finally {
            setLoading(false);
        }
    };

    // use bootstrap classes for styling

    return (
        <div className="coupon-box">
            <div className="d-flex d-flex-row gap-2">
                <input
                    id="coupon_code"
                    name="coupon_code"
                    type="text"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="Coupon code"
                    className="border rounded px-3 py-2 text-sm"
                    disabled={loading}
                />
                <button
                    onClick={handleApply}
                    disabled={loading || !coupon.trim()}
                    className="mr-2 px-4 button fw-medium"
                >
                    {loading ? "Applying..." : "Apply Coupon"}
                </button>
            </div>
        </div>
    );
}
