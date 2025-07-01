'use client';
import React from 'react'

export const CheckoutCouponForm: React.FC = () => {
    return (
        <>
            <div className="woocommerce-form-coupon-toggle">
                <div className="woocommerce-info">
                    <a href="#" className="showcoupon" aria-expanded="false">
                        <i className="fa fa-ticket-alt" aria-hidden="true"></i> Add a coupon <i className="fa fa-caret-right"></i></a>
                </div>
            </div>
            <form className="checkout_coupon woocommerce-form-coupon" method="post" style={
                { display: 'none' }
            } id="woocommerce-checkout-form-coupon">
                <p className="form-row form-row-first">
                    <label htmlFor="coupon_code" className="screen-reader-text">Coupon:</label>
                    <input type="text" name="coupon_code" className="input-text" placeholder="Coupon code" id="coupon_code" defaultValue="" />
                </p>

                <p className="form-row form-row-last">
                    <button type="submit" className="button" name="apply_coupon" value="Apply coupon">Apply coupon</button>
                </p>

                <div className="clear"></div>
            </form>
        </>
    );
}