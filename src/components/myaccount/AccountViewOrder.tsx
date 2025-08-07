'use client';
import { fetchOrderById } from '@/api-functions/my-account';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import React from 'react'

export const WinningNumbers = ({ winningNumbers }: { winningNumbers?: { number: string; prize: string }[] }) => {
    if (!winningNumbers || winningNumbers.length === 0) {
        return null;
    }

    return (
        <>
            <div className="sep-10"></div>
            <hr />
            <p className="woocommerce-thankyou-order-received">Congratulations – you have won a prize!</p>
            <p>If you have won free tickets or credit, you will receive an email in the next 5-10 minutes once they have been applied to your account. For all other prizes, please <b><a href="/claim?vk=50000053">contact us</a></b> here to claim them.</p>
            <table className="woocommerce-table woocommerce-table--order-details shop_table order_details order-success-prize-won">
                <thead>
                    <tr>
                        <th className="woocommerce-table__product-table product-total">Winning Number</th>
                        <th className="woocommerce-table__product-table product-total">Prize Won</th>
                    </tr>
                </thead>
                <tbody>
                    {winningNumbers.map((item, index) => (
                        <tr key={index}>
                            <td>
                                <span>{item.number}</span>
                            </td>
                            <td>
                                <span className="instant-win-display">{item.prize}</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <hr />
            <div className="sep-10"></div>
        </>
    )
}

export interface IOrderItem {
    name: string;
    quantity: number;
    total: string;
    ticket_numbers: string[];
    slug: string;
}

export interface IOrderDetails {
    number: string;
    status: string;
    date: string;
    total: string;
    subtotal: string;
    discount: number;
    currencySymbol: string;
    items: IOrderItem[];
    billing: {
        name: string;
        phone: string;
        email: string;
    };
    winning_numbers?: {
        number: string;
        prize: string;
    }[];
}

export const ViewOrderComponent: React.FC<{ orderId: number }> = ({ orderId }) => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['order', orderId],
        queryFn: () => fetchOrderById(orderId),
        staleTime: 1000 * 60 * 1, // 5 minutes cache
    });

    if (isLoading) {
        return <p>Loading order details...</p>;
    }

    if (isError || !data) {
        return (
            <div className="tab-pane active">
                <div className="woocommerce-notices-wrapper"></div>
                <p>Order not found.</p>
            </div>
        );
    }

    const {
        number,
        status,
        date,
        total,
        currencySymbol,
        items,
        billing,
        winning_numbers = [],
    } = data as IOrderDetails;

    return (
        <div className="tab-pane active">
            <div className="woocommerce-notices-wrapper"></div>
            <p>
                Order #<mark className="order-number">{number}</mark> was placed on{" "}
                <mark className="order-date">{date}</mark> and is currently{" "}
                <mark className="order-status">{status}</mark>.
            </p>

            <section className="woocommerce-order-details">
                <h2 className="woocommerce-order-details__title">Order details</h2>

                <table className="woocommerce-table woocommerce-table--order-details shop_table order_details">
                    <thead>
                        <tr>
                            <th className="woocommerce-table__product-name product-name">Product</th>
                            <th className="woocommerce-table__product-table product-total">Total</th>
                        </tr>
                    </thead>

                    <tbody>
                        {items.map((item:IOrderItem, index:number) => (
                            <tr className="woocommerce-table__line-item order_item" key={index}>
                                <td className="woocommerce-table__product-name product-name">
                                    <Link href={`/product/${item.slug}`}>
                                        {item.name}
                                    </Link>
                                    <strong className="product-quantity">×&nbsp;{item.quantity}</strong>
                                    {item.ticket_numbers?.length > 0 && (
                                        <ul className="wc-item-meta">
                                            <li>
                                                <strong className="wc-item-meta-label">Tickets:</strong>
                                                <p>{item.ticket_numbers.join(', ')}</p>
                                            </li>
                                        </ul>
                                    )}
                                </td>

                                <td className="woocommerce-table__product-total product-total">
                                    <span className="woocommerce-Price-amount amount">
                                        <bdi>
                                            <span className="woocommerce-Price-currencySymbol">{currencySymbol}</span>
                                            {parseFloat(item.total).toFixed(2)}
                                        </bdi>
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                    <tfoot>
                        <tr>
                            <th scope="row">Subtotal:</th>
                            <td>
                                <span className="woocommerce-Price-amount amount">
                                    <span className="woocommerce-Price-currencySymbol">{currencySymbol}</span>
                                    {parseFloat(total).toFixed(2)}
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Total:</th>
                            <td>
                                <span className="woocommerce-Price-amount amount">
                                    <span className="woocommerce-Price-currencySymbol">{currencySymbol}</span>
                                    {parseFloat(total).toFixed(2)}
                                </span>
                            </td>
                        </tr>
                    </tfoot>
                </table>

                <WinningNumbers winningNumbers={winning_numbers} />
            </section>

            <section className="woocommerce-customer-details">
                <h2 className="woocommerce-column__title">Billing address</h2>
                <address>
                    {billing.name && <div>{billing.name}</div>}
                    {billing.phone && <p className="woocommerce-customer-details--phone">{billing.phone}</p>}
                    {billing.email && <p className="woocommerce-customer-details--email">{billing.email}</p>}
                </address>
            </section>
        </div>
    );
}