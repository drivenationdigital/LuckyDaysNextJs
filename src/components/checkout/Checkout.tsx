/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { CheckoutCouponForm } from './CheckoutCoupon';
import { useSession } from '@/app/hooks/useSession';
import { useCart } from '@/app/context/cart-context';

import { useEffect, useRef, useState } from 'react';
import intlTelInput from 'intl-tel-input';
import 'intl-tel-input/build/css/intlTelInput.css';
import { CartNotice } from '../cart/Cart';
import PayPalForm from '../PaymentForms/PayPal';

interface IPaymentData {
    payment_method: string;
    details?: any; // Optional details for more context
}

export default function CheckoutForm() {
    const phoneRef = useRef<HTMLInputElement>(null);
    const itiRef = useRef<ReturnType<typeof intlTelInput> | null>(null);
    const selectedCountryRef = useRef<HTMLInputElement>(null);
    const [isLoading, setIsLoading] = useState(false);
    const checkoutForm = useRef<HTMLFormElement>(null);

    const { cart, clearCart, addCoupon, isMutating, removeCoupon } = useCart();
    const { user } = useSession();

    const handleCheckoutSubmit = async (formData: FormData, paymentData?: IPaymentData) => {
        const billingData = {
            first_name: formData.get('billing_first_name'),
            last_name: formData.get('billing_last_name'),
            email: formData.get('billing_email'),
            phone: phoneRef.current?.value,
            country: selectedCountryRef.current?.value,
        };

        // Validate required fields
        if (!billingData.first_name || !billingData.last_name || !billingData.email || !billingData.phone) {
            alert("Please fill in all required fields.");
            return;
        }

        // Validate email confirmation
        if (formData.get('billing_email') !== formData.get('billing_em_ver')) {
            alert("Email addresses do not match.");
            return;
        }

        // Prepare data for API request
        const data: {
            billing_data: typeof billingData;
            payment_details?: any;
            payment_method?: IPaymentData['payment_method'];
        } = {
            billing_data: billingData,
        };

        if (paymentData) {
            // Handle other payment methods if needed
            data.payment_details = paymentData.details; // This should be set after PayPal payment is approved
            data.payment_method = paymentData?.payment_method || 'default'; // Default or other payment method
        }

        // Send data to the API
        try {
            setIsLoading(true);
            const response = await fetch(`/api/order/${cart?.cart_key}/create`,  // Replace with actual API endpoint
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

            setIsLoading(false);

            const result = await response.json();
            console.log('Order creation response:', result);

            if (!response.ok) {
                alert(`Error: ${result.message}`);
            } else {
                clearCart(); // Clear the cart after successful order creation
                window.location.href = `/order-received/${result.order_id}/?key=${result.order_key}`; // Redirect to order received page
            }
        } catch (error) {
            setIsLoading(false);
            console.error('Error creating order:', error);
            alert('An error occurred while creating the order. Please try again later.');
        }
    }

    const handleApply = async (coupon: string) => {
        if (!coupon.trim()) return;

        try {
            await addCoupon(coupon.trim());
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error("Error applying coupon:", error);
        }
    };

    useEffect(() => {
        const onChange = (number: string, dialCode: string) => {
            if (selectedCountryRef.current) {
                selectedCountryRef.current.value = JSON.stringify({ dialCode, number });
            }
        };

        if (!phoneRef.current) return;

        itiRef.current = intlTelInput(phoneRef.current, {
            initialCountry: 'GB',
            // preferredCountries: ['GB', 'IE'],
            separateDialCode: true,
        });

        const handleChange = () => {
            const input = phoneRef.current;
            if (!input || !itiRef.current) return;

            const number = itiRef.current.getNumber(intlTelInput.utils?.numberFormat.E164);
            const selectedCountryData = itiRef.current.getSelectedCountryData();
            onChange?.(number, selectedCountryData.dialCode!);
        };

        phoneRef.current.addEventListener('blur', handleChange);
        phoneRef.current.addEventListener('countrychange', handleChange);

        return () => {
            phoneRef.current?.removeEventListener('blur', handleChange);
            phoneRef.current?.removeEventListener('countrychange', handleChange);
            itiRef.current?.destroy();
        };
    }, []);

    // if cart is empty, redirect to home page
    useEffect(() => {
        if (!cart || cart.items.length === 0) {
            window.location.href = '/basket';
        }
    }, [cart]);

    if (!cart || cart.items.length === 0) {
        return null;
    }

    return (
        <div className="woocommerce">
            <CartNotice />

            {(isLoading || isMutating) && (
                <div
                    className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center"
                    style={{ zIndex: 1050 }}
                >
                    <div className="spinner-border text-light" role="status" style={{ width: "3rem", height: "3rem" }}>
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}

            <CheckoutCouponForm onApply={handleApply} />
            <form className='checkout woocommerce-checkout' name='checkout'
                onSubmit={(e) => {
                    e.preventDefault();
                    handleCheckoutSubmit(new FormData(e.currentTarget));
                }}
                id='st-form' ref={checkoutForm}>
                <div className="col2-set" id="customer_details">
                    <div className="col-1">
                        <div className="woocommerce-billing-fields">
                            <h3>Billing details</h3>
                            <div className="woocommerce-billing-fields__field-wrapper">
                                <p className="form-row form-row-first validate-required" id="billing_first_name_field">
                                    <label htmlFor="billing_first_name" className="required_field">
                                        First name <span className="required">*</span>
                                    </label>
                                    <span className="woocommerce-input-wrapper">
                                        <input type="text" name="billing_first_name" id="billing_first_name" defaultValue={user?.billing_address.first_name} />
                                    </span>
                                </p>

                                <p className="form-row form-row-last validate-required" id="billing_last_name_field">
                                    <label htmlFor="billing_last_name" className="required_field">
                                        Last name <span className="required">*</span>
                                    </label>
                                    <span className="woocommerce-input-wrapper">
                                        <input type="text" name="billing_last_name" id="billing_last_name" defaultValue={user?.billing_address.last_name} />
                                    </span>
                                </p>

                                {/* Phone Number */}
                                <p className="form-row form-row-wide validate-required validate-phone" id="billing_phone_field">
                                    <label htmlFor="billing_phone" className="required_field">
                                        Phone <span className="required">*</span>
                                    </label>
                                    <span className="woocommerce-input-wrapper">
                                        <input
                                            ref={phoneRef}
                                            type="tel"
                                            name="billing_phone"
                                            id="billing_phone"
                                            autoComplete="off"
                                            defaultValue={user?.billing_address.phone}
                                        />
                                    </span>
                                </p>

                                <p className="form-row form-row-first validate-required validate-email" id="billing_email_field">
                                    <label htmlFor="billing_email" className="required_field">
                                        Email address <span className="required">*</span>
                                    </label>
                                    <span className="woocommerce-input-wrapper">
                                        <input type="email" name="billing_email" id="billing_email" defaultValue={user?.billing_address.email} />
                                    </span>
                                </p>

                                <input ref={selectedCountryRef} type="hidden" id="selected_country_info" name="selected_country_info" />

                                <p className="form-row form-row-last validate-required" id="billing_em_ver_field">
                                    <label htmlFor="billing_em_ver" className="required_field">
                                        Confirm email address <span className="required">*</span>
                                    </label>
                                    <span className="woocommerce-input-wrapper">
                                        <input type="text" name="billing_em_ver" id="billing_em_ver" defaultValue={user?.billing_address.email} />
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <table className="shop_table woocommerce-checkout-review-order-table">
                    <thead>
                        <tr>
                            <th className="product-name">Product</th>
                            <th className="product-total">Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart?.items.map((item) => (
                            <tr className="cart_item" key={item.product_id}>
                                <td className="product-name">
                                    {item.name}&nbsp; <strong className="product-quantity">×&nbsp;{item.quantity}</strong>
                                </td>
                                <td className="product-total">
                                    <span className="woocommerce-Price-amount amount"><bdi><span className="woocommerce-Price-currencySymbol">£</span>{item.price}</bdi></span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr className="cart-subtotal">
                            <th>Subtotal</th>
                            <td><span className="woocommerce-Price-amount amount">
                                <bdi><span className="woocommerce-Price-currencySymbol">£</span>{cart?.discounted_subtotal}</bdi></span></td>
                        </tr>

                        {/* Coupons */}
                        {(cart?.coupons && cart.coupons.length > 0) && (
                            cart.coupons.map((coupon, index) => (
                                <tr className="cart-discount" key={index}>
                                    <th>
                                        {coupon.description || `Coupon: ${coupon.code}`}
                                        <button className="remove-coupon" onClick={() => removeCoupon(coupon.code)}>Remove</button>
                                    </th>
                                    <td data-title="Discount">
                                        <span className="woocommerce-Price-amount amount">
                                            <bdi>
                                                <span className="woocommerce-Price-currencySymbol">-£</span>
                                                {coupon.discount}
                                            </bdi>
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )}

                        <tr className="order-total">
                            <th>Total</th>
                            <td><strong><span className="woocommerce-Price-amount amount"><bdi>
                                <span className="woocommerce-Price-currencySymbol">£</span>{cart?.total}</bdi></span></strong> </td>
                        </tr>
                    </tfoot>
                </table>

                <div id="payment" className="woocommerce-checkout-payment">
                    <div className="form-row place-order">
                        <small style={{ display: "block", borderBottom: "1px #cfcfcf solid", paddingBottom: "15px", marginBottom: "20px", width: "100%" }}>Ace Competitions Ltd, Trading as Lucky Day Competitions. Company registration number: NI659574. Trading Address: 72 Tievcrom Road, Forkhill, Newry, BT35 9RX</small>

                        {cart?.total && parseFloat(cart.total) > 0 ? (
                            <PayPalForm cart={cart}
                                callback={(status, details) => {
                                    console.log(`Payment status: ${status}`);
                                    if (details && status === 'success') {
                                        handleCheckoutSubmit(new FormData(checkoutForm.current!), {
                                            payment_method: 'paypal',
                                            details
                                        });
                                    }
                                }}
                            />
                        ) : (
                            <button type="submit" className="button alt" name="woocommerce_checkout_place_order" id="place_order" value="Place order" data-value="Place order">Place Order</button>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );

}