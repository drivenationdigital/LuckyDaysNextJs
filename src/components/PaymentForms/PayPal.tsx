/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { PAYPAL_CLIENT_ID } from "@/actions/api";
import { CartData } from "@/app/context/cart-context";
import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useEffect, useRef } from "react";

function PayPalPaymentButton({ cart, callback, disabled }: {
    cart: CartData,
    callback: (status: 'success' | 'error' | 'cancelled' | 'pending' | 'processing' | 'unknown', details?: any) => void,
    disabled?: boolean
}) {
    const [{ isPending }] = usePayPalScriptReducer();
    const rendered = useRef(false);
    const amount = cart?.total ? parseFloat(cart.total) : '0.00';

    useEffect(() => {
        rendered.current = true;
    }, []);

    if (!cart?.total) return null;
    if (isPending) return <div>Loading PayPal...</div>;

    return (
        <PayPalButtons
            forceReRender={[cart.total]}
            style={{ layout: 'vertical' }}
            onClick={(data, actions) => {
                if (disabled) {
                    // Prevent checkout from continuing
                    return actions.reject();
                }

                // Allow the PayPal flow to continue
                return actions.resolve();
            }}
            createOrder={async (data, actions) => {
                return actions.order.create({
                    intent: 'CAPTURE',
                    purchase_units: [{
                        amount: {
                            currency_code: "GBP",
                            value: `${amount}`,
                            breakdown: {
                                item_total: { value: `${amount}`, currency_code: 'GBP' }
                            }
                        },
                        description: `Order from LuckyDays - Cart Key: ${cart?.cart_key}`,
                        // items: cart?.items.map(item => ({
                        //     name: item.name,
                        //     quantity: item.quantity.toString(),
                        //     unit_amount: {
                        //         currency_code: 'GBP',
                        //         value: item.price
                        //     },
                        // })) || [],
                    }],
                });
            }}
            onApprove={async (data, actions) => {
                const details = await actions.order?.capture();

                if (!details || !details.status) {
                    console.error('Transaction details are missing or invalid');
                    callback('error', details);
                    return;
                }

                if (details.status === 'COMPLETED') {
                    console.log('Payment successful:', details);
                    callback('success', details);
                    return;
                } else if (details.status === 'VOIDED') {
                    console.log('Payment was voided:', details);
                    callback('cancelled', details);
                    return;
                }
            }}
            onError={(err) => {
                console.error('PayPal error', err);
                alert("An error occurred while processing your PayPal payment.");
                callback('error', err);
            }}
        />
    );
}

export default function PayPalForm({ cart, callback, disabled }: {
    cart: CartData, callback: (
        status: 'success' | 'error' | 'cancelled' | 'pending' | 'processing' | 'unknown',
        details?: any // Optional details for more context
    ) => void,
    disabled?: boolean
}) {
    return (
        <PayPalScriptContext>
            <PayPalPaymentButton cart={cart} callback={callback} disabled={disabled} />
        </PayPalScriptContext >
    );
}

function PayPalScriptContext({ children }: { children: React.ReactNode }) {
    if (!PAYPAL_CLIENT_ID) {
        console.error('PayPal client ID is not set. Please check your environment variables.');
        return <div>Error: PayPal client ID is not configured.</div>;
    }
    
    return (
        <PayPalScriptProvider options={{
            clientId: PAYPAL_CLIENT_ID, // Replace with your actual PayPal client ID
            currency: "GBP",
            environment: "sandbox",
            disableFunding: "card", // 🚀 disable credit/debit card button
        }}>
            {children}
        </PayPalScriptProvider>
    );
}