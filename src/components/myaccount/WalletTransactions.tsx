/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState } from 'react';
import { WalletTransaction } from '@/types/wallet';

import { useQuery } from '@tanstack/react-query';
import { WalletTransactionsResponse } from '@/types/wallet';

async function fetchWalletTransactions(
    page: number,
    perPage: number
): Promise<WalletTransactionsResponse> {
    const res = await fetch(`/api/wallet/transactions?page=${page}&per_page=${perPage}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-store',
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch transactions: ${res.status}`);
    }

    return res.json();
}

export function useWalletTransactions(page: number = 1, perPage: number = 20) {
    return useQuery({
        queryKey: ['wallet', 'transactions', page, perPage],
        queryFn: () => fetchWalletTransactions(page, perPage),
        staleTime: 0,
        gcTime: 0,
        refetchOnMount: 'always',
        refetchOnWindowFocus: true,
        placeholderData: undefined, // Don't keep previous data
    });
}

export const WalletTransactions: React.FC = () => {
    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState<string>('');
    const perPage = 10;

    const { data, isLoading, isFetching, isError, error, refetch } = useWalletTransactions(page, perPage);

    const handleFilterSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        refetch();
    };

    const getFilteredTransactions = (): WalletTransaction[] => {
        if (!data?.success || !data?.data?.transactions) return [];

        const transactions = data.data.transactions;

        if (!filter) return transactions;

        return transactions.filter(t => t.type === filter);
    };

    const filteredTransactions = getFilteredTransactions();

    // Show loading state when fetching new page
    // const showLoading = isLoading || isFetching;

    // Loading state
    if (isLoading) {
        return (
            <div className="yith-funds-history-wrapper">
                <div className="yith-funds-history-list">
                    <div className="yith-funds-history-header">
                        <h3 className="yith-funds-history-filter">Funds history</h3>
                        <div className="yith-funds-history-filter-content">
                            <select disabled className="yith-funds-filter-select">
                                <option value="">Show All</option>
                            </select>
                            <input type="submit" className="button ywf_history_filter_button" value="Filter" disabled />
                        </div>
                    </div>

                    <div className="yith-funds-history-table-wrapper">
                        <table className="yith-funds-history-table shop_table shop_table_responsive">
                            <thead>
                                <tr>
                                    <th className="yith_funds_history-log-date">Date</th>
                                    <th className="yith_funds_history-description">Reason</th>
                                    <th className="yith_funds_history-deposit-amount">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[1, 2, 3].map((i) => (
                                    <tr key={i} className="yith_funds_history_item">
                                        <td className="yith_funds_history-log-date">
                                            <div className="skeleton skeleton-text" style={{ width: '120px' }}></div>
                                        </td>
                                        <td className="yith_funds_history-description">
                                            <div className="skeleton skeleton-text" style={{ width: '80%' }}></div>
                                        </td>
                                        <td className="yith_funds_history-deposit-amount">
                                            <div className="skeleton skeleton-text" style={{ width: '80px' }}></div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }

    // Error state
    if (isError) {
        return (
            <div className="yith-funds-history-wrapper">
                <div className="yith-funds-history-list">
                    <div className="yith-funds-history-header">
                        <h3>Funds history</h3>
                    </div>
                    <div className="yith-funds-error">
                        <p>{error?.message || 'Failed to load transactions'}</p>
                        <button
                            type="button"
                            className="button"
                            onClick={() => refetch()}
                        >
                            Retry
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Check if we have valid data
    if (!data?.success || !data?.data) {
        return (
            <div className="yith-funds-history-wrapper">
                <div className="yith-funds-history-list">
                    <div className="yith-funds-history-header">
                        <h3>Funds history</h3>
                    </div>
                    <div className="yith-funds-error">
                        <p>No transaction data available</p>
                    </div>
                </div>
            </div>
        );
    }

    const { pagination } = data.data;

    return (
        <div className="yith-funds-history-wrapper">
            <div className="yith-funds-history-list">
                <div className="yith-funds-history-header">
                    <h3 className="yith-funds-history-filter">Funds history</h3>
                    <div className="yith-funds-history-filter-content">
                        <form onSubmit={handleFilterSubmit}>
                            <select
                                id="yith-funds-history-filter"
                                name="funds_history_filter"
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                                disabled={isFetching}
                            >
                                <option value="">Show All</option>
                                <option value="deposit">Deposit</option>
                                <option value="pay">Payment</option>
                                <option value="admin_op">Admin activity</option>
                                <option value="restore">Funds restored</option>
                                <option value="remove">Funds refunded</option>
                            </select>
                            <input
                                type="submit"
                                className="button ywf_history_filter_button"
                                value="Filter"
                                disabled={isFetching}
                            />
                        </form>
                    </div>
                </div>

                <div className="yith-funds-history-table-wrapper" style={{ position: 'relative' }}>
                    {/* Loading overlay when fetching new page */}
                    {isFetching && (
                        <div className="yith-funds-loading-overlay">
                            <div className="yith-funds-spinner"></div>
                        </div>
                    )}

                    <table className="yith-funds-history-table shop_table shop_table_responsive">
                        <thead>
                            <tr>
                                <th className="yith_funds_history-log-date">Date</th>
                                <th className="yith_funds_history-description">Reason</th>
                                <th className="yith_funds_history-deposit-amount">Amount</th>
                            </tr>
                        </thead>
                        <tbody key={page}>
                            {filteredTransactions.length === 0 ? (
                                <tr>
                                    <td colSpan={3} className="no-transactions">
                                        No transactions found.
                                    </td>
                                </tr>
                            ) : (
                                filteredTransactions.map((transaction) => {
                                    const isNegative = transaction.amount < 0;
                                    const isPositive = transaction.amount > 0;

                                    return (
                                        <tr key={transaction.id} className="yith_funds_history_item">
                                            <td className="yith_funds_history-log-date" data-title="Date">
                                                <time
                                                    dateTime={new Date(transaction.timestamp * 1000).toISOString().split('T')[0]}
                                                    title={transaction.timestamp.toString()}
                                                >
                                                    {transaction.date}
                                                </time>
                                            </td>
                                            <td className="yith_funds_history-description" data-title="Reason">
                                                <p dangerouslySetInnerHTML={{ __html: transaction.reason }} />
                                            </td>
                                            <td className="yith_funds_history-deposit-amount" data-title="Amount">
                                                <span className={isNegative ? 'ywf_minus' : isPositive ? 'ywf_plus' : ''}>
                                                    {isPositive && '+'}
                                                    <span className="woocommerce-Price-amount amount">
                                                        {isNegative && '-'}
                                                        <span className="woocommerce-Price-currencySymbol">£</span>
                                                        {Math.abs(transaction.amount).toFixed(2)}
                                                    </span>
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                        {pagination && pagination.total_pages > 1 && (
                            <tfoot>
                                <tr className="yith_funds_history_pagination">
                                    <td colSpan={3}>
                                        {page > 1 && (
                                            <a
                                                className="prev page-numbers"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    if (!isFetching) {
                                                        setPage(p => p - 1);
                                                    }
                                                }}
                                                href="#"
                                                style={{ opacity: isFetching ? 0.5 : 1, pointerEvents: isFetching ? 'none' : 'auto' }}
                                            >
                                                « Previous
                                            </a>
                                        )}

                                        {Array.from({ length: pagination.total_pages }, (_, i) => i + 1).map((pageNum) => {
                                            if (pageNum === page) {
                                                return (
                                                    <span
                                                        key={pageNum}
                                                        aria-label={`Page ${pageNum}`}
                                                        aria-current="page"
                                                        className="page-numbers current"
                                                    >
                                                        {pageNum}
                                                    </span>
                                                );
                                            }

                                            return (
                                                <a
                                                    key={pageNum}
                                                    aria-label={`Page ${pageNum}`}
                                                    className="page-numbers"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        if (!isFetching) {
                                                            setPage(pageNum);
                                                        }
                                                    }}
                                                    href="#"
                                                    style={{ opacity: isFetching ? 0.5 : 1, pointerEvents: isFetching ? 'none' : 'auto' }}
                                                >
                                                    {pageNum}
                                                </a>
                                            );
                                        })}

                                        {pagination.has_more && (
                                            <a
                                                className="next page-numbers"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    if (!isFetching) {
                                                        setPage(p => p + 1);
                                                    }
                                                }}
                                                href="#"
                                                style={{ opacity: isFetching ? 0.5 : 1, pointerEvents: isFetching ? 'none' : 'auto' }}
                                            >
                                                Next »
                                            </a>
                                        )}
                                    </td>
                                </tr>
                            </tfoot>
                        )}
                    </table>
                </div>
            </div>
        </div>
    );
};