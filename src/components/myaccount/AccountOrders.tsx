/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { fetchMyOrders } from '@/api-functions/my-account';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import React, { useState } from 'react';

// type Order = {
//     id: number;
//     number: string;
//     date: string;
//     datetime: string;
//     status: string;
//     total: string;
//     itemCount: number;
//     currencySymbol: string;
//     viewUrl: string;
// };

const RecentOrdersTable: React.FC = () => {
    const [page, setPage] = useState(1);

    const {
        data,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['my-orders', page],
        queryFn: () => fetchMyOrders(page),
        staleTime: 1000 * 60 * 5, // 5 minutes cache
    });

    return (
        <div className="tab-pane active">
            <div className="woocommerce-notices-wrapper"></div>
            <div className="title">
                <h3>Your recent orders</h3>
            </div>

            <table className="woocommerce-orders-table shop_table shop_table_responsive my_account_orders">
                <thead>
                    <tr>
                        <th>Order</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Total</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.orders.map((order: any) => (
                        <tr key={order.id}>
                            <td><Link href={`/my-account/view-order/${order.id}`}>#{order.number}</Link></td>
                            <td><time dateTime={order.datetime}>{order.date}</time></td>
                            <td>{order.status}</td>
                            <td>
                                <span>{order.currencySymbol}{order.total}</span>{' '}
                                for {order.itemCount} {order.itemCount === 1 ? 'item' : 'items'}
                            </td>
                            <td>
                                <Link href={`/my-account/view-order/${order.id}`} className="woocommerce-button button view">
                                    View
                                </Link>
                                {/* <Link href={`/order-received/${order.id}`} className="woocommerce-button button view">
                                    View Thank you
                                </Link> */}
                            </td>
                        </tr>
                    ))}

                    {isLoading && (
                        <tr>
                            <td colSpan={5} className="text-center">
                                Loading orders...
                            </td>
                        </tr>
                    )}

                    {isError && (
                        <tr>
                            <td colSpan={5} className="text-center">
                                Failed to load orders. Please try again later.
                            </td>
                        </tr>
                    )}

                    {data?.orders.length === 0 && !isLoading && (
                        <tr>
                            <td colSpan={5} className="text-center">
                                No orders found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div className="woocommerce-pagination woocommerce-pagination--without-numbers woocommerce-Pagination">
                <button
                    className="woocommerce-button woocommerce-button--next woocommerce-Button woocommerce-Button--next button"
                    onClick={() => setPage((p) => Math.max(p - 1, 1))}
                    disabled={page === 1}
                >
                    Previous
                </button>

                <span className="woocommerce-pagination__page-numbers">
                    {` `}Page {data?.pagination.page} of {data?.pagination.total_pages}{` `}
                </span>

                <button
                    className="woocommerce-button woocommerce-button--next woocommerce-Button woocommerce-Button--next button"
                    onClick={() => setPage((p) => Math.min(p + 1, data?.pagination.total_pages))}
                    disabled={page === data?.pagination.total_pages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default RecentOrdersTable;
