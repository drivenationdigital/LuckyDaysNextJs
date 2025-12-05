'use client'
import { fetchOrderById } from "@/api-functions/my-account";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { IOrderDetails, IOrderItem, WinningNumbers } from "../myaccount/AccountViewOrder";
import Link from "next/link";

export interface DrawNumberItem {
    productName: string;
    drawNumbers: string[];
    quantity: number;
    productUrl: string;
    total: string;
}

export interface OrderDetails {
    orderNumber: string;
    date: string;
    email: string;
    subtotal: string;
    discount: string;
    total: string;
    billingName: string;
    billingPhone?: string;
    billingEmail: string;
    items: DrawNumberItem[];
}

interface Props {
    order_id: number;
}

export default function OrderReceived({ order_id }: Props) {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['order', order_id],
        queryFn: () => fetchOrderById(order_id),
        staleTime: 1000 * 60 * 1, // 5 minutes cache
    });

    // useEffect(() => {
    //     if (!order_id) return;

    //     const deepLink = `luckydays://order-received/${order_id}`;
    //     window.location.href = deepLink;
        
    // }, [order_id]);
    useEffect(() => {
        if (!order_id) return;

        const deepLink = `luckydays://order-received/${order_id}`;

        // If running inside the mobile app WebView
        if (window.ReactNativeWebView) {
            alert("In App WebView detected, not redirecting.");
            // window.ReactNativeWebView.postMessage(JSON.stringify({
            //     type: "OPEN_DEEP_LINK",
            //     url: deepLink
            // }));
            return; // <-- do NOT redirect inside WebView
        }

        // Normal browser behavior
        window.location.href = deepLink;

    }, [order_id]);


    if (isLoading) {
        return (
            <div className="order-loading-container">
                <div className="text-center">
                    <div className="spinner-border text-primary mb-3" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="lead">We&apos;re loading your order details...</p>
                </div>
            </div>
        )
    }

    if (isError || !data) {
        return (
            <div className="container my-4">
                <h1>Order not found</h1>
                <p>We couldnt find an order with that ID.</p>
            </div>
        );
    }

    const {
        discount,
        subtotal,
        total,
        currencySymbol,
        items,
        billing,
        winning_numbers = [],
    } = data as IOrderDetails;

    console.log(data);
    

    return (
        <div className="container my-4">
            <article className="post">
                <header className="header mb-4">
                    <h1 className="entry-title">Order received</h1>
                </header>
                <div className="entry-content">
                    <div className="woocommerce">
                        <div className="sep-20"></div>

                        <div className="container">
                            <div className="woocommerce-order custom-thankyou">
                                {/* Success message */}
                                <p className="woocommerce-notice woocommerce-notice--success woocommerce-thankyou-order-received">
                                    Thank you. Your order has been received.
                                </p>
                                <p>
                                    You should receive an email confirming your order in a few
                                    minutes. Please check your junk mail if you can&apos;t see
                                    it.{" "}
                                    <Link
                                        style={{ color: "#00a0b9" }}
                                        rel="noopener noreferrer"
                                        href={`/my-account/view-order/${order_id}`}
                                    >
                                        your account here <i className="fa fa-angle-right"></i>
                                    </Link>
                                </p>

                                <div className="sep-20"></div>

                                {/* Draw Numbers */}
                                <p className="woocommerce-thankyou-order-received">
                                    Your draw numbers
                                </p>
                                <table className="woocommerce-table woocommerce-table--order-details shop_table order_details mb-4">
                                    <thead>
                                        <tr>
                                            <th>Product</th>
                                            <th>Draw Numbers</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {items.map((item: IOrderItem, index: number) => (
                                            <tr
                                                key={index}
                                                className="woocommerce-table__line-item order_item"
                                            >
                                                <td>
                                                    <strong>{item.name}</strong>
                                                </td>
                                                <td>{item.ticket_numbers.join(", ")}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <hr />

                                <WinningNumbers winningNumbers={winning_numbers} />

                                {/* Order Details */}
                                <section className="woocommerce-order-details mb-4">
                                    <h2 className="woocommerce-order-details__title">
                                        Order details
                                    </h2>

                                    <table className="woocommerce-table woocommerce-table--order-details shop_table order_details">
                                        <thead>
                                            <tr>
                                                <th>Product</th>
                                                <th>Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {items.map((item: IOrderItem, index: number) => (
                                                <tr
                                                    key={index}
                                                    className="woocommerce-table__line-item order_item"
                                                >
                                                    <td>
                                                        <Link href={`/product/${item.slug}`}>
                                                            {item.name}
                                                        </Link>{" "}
                                                        <strong className="product-quantity">
                                                            × {item.quantity}
                                                        </strong>
                                                        <ul className="wc-item-meta list-unstyled">
                                                            <li>
                                                                <strong>Tickets:</strong>{" "}
                                                                {item.ticket_numbers?.length > 0 && (
                                                                    <span>{item.ticket_numbers.join(', ')}</span>
                                                                )}
                                                            </li>
                                                        </ul>
                                                    </td>
                                                    <td>{item.total}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <th scope="row">Subtotal:</th>
                                                <td>{currencySymbol}{subtotal}</td>
                                            </tr>
                                            {discount > 0 && (
                                                <tr>
                                                    <th scope="row">Discount:</th>
                                                    <td>-{currencySymbol}{discount.toFixed(2)}</td>
                                                </tr>
                                            )}
                                            
                                            <tr>
                                                <th scope="row">Total:</th>
                                                <td>{currencySymbol}{total}</td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </section>

                                {/* Customer Details */}
                                <section className="woocommerce-customer-details">
                                    <h2 className="woocommerce-column__title">
                                        Billing address
                                    </h2>
                                    <address>
                                        {billing.name}<br />
                                        {billing.phone && (
                                            <p className="woocommerce-customer-details--phone">
                                                {billing.phone}
                                            </p>
                                        )}
                                        <p className="woocommerce-customer-details--email">
                                            {billing.email}
                                        </p>
                                    </address>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    );
}
