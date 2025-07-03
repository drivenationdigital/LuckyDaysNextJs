/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useState } from 'react'

export const CheckoutCouponForm: React.FC<{ onApply: (coupon: string) => void }> = ({ onApply }) => {
    const [showForm, setShowForm] = useState(false);
    const [coupon, setCoupon] = useState("");

    // Toggle the display of the coupon form
    const toggleFormDisplay = () => {
        setShowForm(!showForm);
        const form = document.getElementById('woocommerce-checkout-form-coupon');
        if (form) {
            form.style.display = showForm ? 'none' : 'block';
        }
    };

    return (
        <>
            <div className="woocommerce-form-coupon-toggle">
                <div className="woocommerce-info">
                    <a href="#" className="showcoupon" aria-expanded="false" onClick={toggleFormDisplay}>
                        <i className="fa fa-ticket-alt" aria-hidden="true"></i> Add a coupon <i className="fa fa-caret-right"></i></a>
                </div>
            </div>
            <form className="checkout_coupon woocommerce-form-coupon"
                onSubmit={(e) => {
                    e.preventDefault();
                    onApply(coupon);
                }}
                style={
                    { display: showForm ? 'block' : 'none' }
                } id="woocommerce-checkout-form-coupon">
                <p className="form-row form-row-first">
                    <label htmlFor="coupon_code" className="screen-reader-text">Coupon:</label>
                    <input
                        type="text"
                        onChange={(e) => setCoupon(e.target.value)}
                        name="coupon_code"
                        className="input-text"
                        placeholder="Coupon code"
                        id="coupon_code"
                        defaultValue=""
                    />
                </p>

                <p className="form-row form-row-last">
                    <button type="submit"
                        disabled={!coupon.trim()}
                        className="button" name="apply_coupon" value="Apply coupon">Apply coupon</button>
                </p>

                <div className="clear"></div>
            </form>
        </>
    );
}