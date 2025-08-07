/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { CheckoutCouponForm } from './CheckoutCoupon';
import { useSession } from '@/app/hooks/useSession';
import { useCart } from '@/app/context/cart-context';

import { useEffect, useMemo, useRef, useState } from 'react';
import intlTelInput from 'intl-tel-input';
import 'intl-tel-input/build/css/intlTelInput.css';
import { CartNotice } from '../cart/Cart';
import PayPalForm from '../PaymentForms/PayPal';
import CheckoutField from './CheckoutField';
import classNames from 'classnames';

interface IPaymentData {
    payment_method: string;
    details?: any; // Optional details for more context
}

export default function CheckoutForm() {
    const phoneRef = useRef<HTMLInputElement>(null);
    const itiRef = useRef<ReturnType<typeof intlTelInput> | null>(null);
    const selectedCountryRef = useRef<HTMLInputElement>(null);
    const checkoutForm = useRef<HTMLFormElement>(null);

    const { cart, clearCart, addCoupon, isMutating, removeCoupon } = useCart();
    const { user } = useSession();
    
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        billing_first_name: user?.billing_address.first_name || '',
        billing_last_name: user?.billing_address.last_name || '',
        billing_email: user?.billing_address.email || '',
        billing_em_ver: user?.billing_address.email || '',
        billing_phone: user?.billing_address.phone || '',
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        
        setFormData(prev => ({ ...prev, [name]: value }));

        // Clear error on change
        setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const validateFields = () => {
        const newErrors: typeof errors = {};

        if (!formData.billing_first_name) newErrors.billing_first_name = 'First name is required.';
        if (!formData.billing_last_name) newErrors.billing_last_name = 'Last name is required.';
        if (!formData.billing_email) newErrors.billing_email = 'Email is required.';
        if (!formData.billing_em_ver) newErrors.billing_em_ver = 'Please confirm your email.';
        if (formData.billing_email !== formData.billing_em_ver) newErrors.billing_em_ver = 'Emails do not match.';
        if (!phoneRef.current?.value) newErrors.billing_phone = 'Phone is required.';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const isFormValid = useMemo(() => validateFields() !== false, [formData, phoneRef.current?.value]);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateFields()) return;

        // Proceed with valid data
        const form = new FormData();
        for (const key in formData) {
            form.append(key, formData[key as keyof typeof formData]);
        }

        handleCheckoutSubmit(form);
    };

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
    
    const onChange = (number: string, dialCode: string) => {
        if (selectedCountryRef.current) {
            selectedCountryRef.current.value = JSON.stringify({ dialCode, number });
        }
    };

    const handleChange = () => {
        const input = phoneRef.current;
        if (!input || !itiRef.current) return;
        
        const number = itiRef.current.getNumber(intlTelInput.utils?.numberFormat.E164);
        
        const selectedCountryData = itiRef.current.getSelectedCountryData();
        onChange?.(number, selectedCountryData.dialCode!);
    };

    useEffect(() => {
        if (!phoneRef.current) return;

        itiRef.current = intlTelInput(phoneRef.current, {
            initialCountry: 'GB',
            // preferredCountries: ['GB', 'IE'],
            separateDialCode: true,
        });

        phoneRef.current.addEventListener('blur', handleChange);
        phoneRef.current.addEventListener('countrychange', handleChange);

        return () => {
            phoneRef.current?.removeEventListener('blur', handleChange);
            phoneRef.current?.removeEventListener('countrychange', handleChange);
            itiRef.current?.destroy();
        };
    }, []);

    useEffect(() => {
        if (user && user.billing_address) {
            setFormData({
                billing_first_name: user.billing_address.first_name || '',
                billing_last_name: user.billing_address.last_name || '',
                billing_email: user.billing_address.email || '',
                billing_em_ver: user.billing_address.email || '',
                billing_phone: user.billing_address.phone || '',
            });
        }
    }, [user]);

    // if cart is empty, redirect to home page
    useEffect(() => {
        if ((!cart || cart.items.length === 0) ) {
            window.location.href = '/basket';
        }
    }, [cart]);

    if (!cart || cart.items.length === 0) {
        return <>
            <div
                className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center"
                style={{ zIndex: 1050 }}
            >
                <div className="spinner-border text-light" role="status" style={{ width: "3rem", height: "3rem" }}>
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </>;
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
            <form className='checkout woocommerce-checkout' name='checkout' onSubmit={onSubmit}
                id='st-form' ref={checkoutForm}>
                <div className="col2-set" id="customer_details">
                    <div className="col-1">
                        <div className="woocommerce-billing-fields">
                            <h3>Billing details</h3>
                            <div className="woocommerce-billing-fields__field-wrapper">
                                <CheckoutField
                                    name="billing_first_name"
                                    label="First name"
                                    required
                                    value={formData.billing_first_name}
                                    error={errors.billing_first_name}
                                    onChange={handleInputChange}
                                />

                                <CheckoutField
                                    name="billing_last_name"
                                    label="Last name"
                                    required
                                    value={formData.billing_last_name}
                                    error={errors.billing_last_name}
                                    onChange={handleInputChange}
                                />

                                {/* Phone Number */}
                                <p className={
                                    classNames('form-row', 'woocommerce-input', 'validate-required',
                                        { 'woocommerce-invalid': !!errors.billing_phone },
                                        { 'woocommerce-invalid-required-field': true },
                                        { 'form-row-first': false },
                                        { 'form-row-last': false },
                                        { 'form-row-wide': true }
                                    )} id="billing_phone_field">
                                    <label htmlFor="billing_phone" className="required_field">
                                        Phone <span className="required">*</span>
                                    </label>
                                    <span className="woocommerce-input-wrapper">
                                        <input
                                            ref={phoneRef}
                                            onChange={handleInputChange}
                                            type="tel"
                                            name="billing_phone"
                                            id="billing_phone"
                                            autoComplete="off"
                                            defaultValue={user?.billing_address.phone}
                                        />
                                    </span>

                                    {errors.billing_phone && <span className="" style={{ color: '#b81c23', fontSize: '12px' }}>{errors.billing_phone}</span>}
                                </p>

                                <CheckoutField
                                    name="billing_email"
                                    label="Email address"
                                    type="email"
                                    required
                                    value={formData.billing_email}
                                    error={errors.billing_email}
                                    onChange={handleInputChange}
                                />

                                <CheckoutField
                                    name="billing_em_ver"
                                    label="Confirm email address"
                                    required
                                    value={formData.billing_em_ver}
                                    error={errors.billing_em_ver}
                                    onChange={handleInputChange}
                                />

                                <input ref={selectedCountryRef} type="hidden" id="selected_country_info" name="selected_country_info" />
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
                            <PayPalForm
                                disabled={isFormValid === false}
                                cart={cart}
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