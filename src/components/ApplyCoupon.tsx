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

    return (
        <div className="coupon-box">
            <h4 className="text-lg font-medium mb-2">Have a coupon?</h4>
            <div className="flex gap-2 items-center">
                <input
                    type="text"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="Enter coupon code"
                    className="border rounded px-3 py-2 text-sm"
                    disabled={loading}
                />
                <button
                    onClick={handleApply}
                    disabled={loading || !coupon.trim()}
                    className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
                >
                    {loading ? "Applying..." : "Apply"}
                </button>
            </div>
        </div>
    );
}
