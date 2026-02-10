'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { WalletBalanceResponse } from '@/types/wallet';
import { CURRENCY_MAP } from '@/types/posts';

async function fetchWalletBalance(): Promise<WalletBalanceResponse> {
    const res = await fetch('/api/wallet/balance', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-store',
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch wallet balance: ${res.status}`);
    }

    return res.json();
}

export function useWalletBalance() {
    return useQuery({
        queryKey: ['wallet', 'balance'],
        queryFn: fetchWalletBalance,
        staleTime: 0, // Always fetch fresh data
        gcTime: 0, // Don't keep in cache
        refetchOnMount: 'always',
        refetchOnWindowFocus: true,
    });
}

export const WalletBalance: React.FC = () => {
    const { data, isLoading, isError, error, refetch } = useWalletBalance();

    // Loading state
    if (isLoading) {
        return (
            <div className="yith-funds-endpoint-header">
                <div className="yith-funds-balance">
                    <span className="yith-funds-icon">
                        <div className="skeleton skeleton-icon"></div>
                    </span>

                    <div className="yith-funds-amount-wrapper">
                        <div className="skeleton skeleton-text skeleton-label"></div>
                        <div className="skeleton skeleton-text skeleton-amount"></div>
                    </div>
                </div>

                <div className="yith-funds-withdrawable">
                    <div className="skeleton skeleton-text skeleton-withdrawable"></div>
                </div>

                <div className="yith-funds-actions">
                    <div className="skeleton skeleton-button"></div>
                </div>
            </div>
        );
    }

    // Error state
    if (isError) {
        return (
            <div className="yith-funds-endpoint-header">
                <div className="yith-funds-error">
                    <p>{error?.message || 'Failed to load wallet balance'}</p>
                    <button
                        type="button"
                        className="button"
                        onClick={() => refetch()}
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    // Check if we have valid data
    if (!data?.success || !data?.data) {
        return (
            <div className="yith-funds-endpoint-header">
                <div className="yith-funds-error">
                    <p>No wallet data available</p>
                    <button
                        type="button"
                        className="button"
                        onClick={() => refetch()}
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    const {
        available,
        withdrawable,
        currency
    } = data.data;

    return (
        <div className="yith-funds-endpoint-header">
            <form method="get" onSubmit={(e) => e.preventDefault()}>
                <div className="yith-funds-balance">
                    <span className="yith-funds-icon">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="2" y="5" width="20" height="14" rx="2" />
                            <line x1="2" y1="10" x2="22" y2="10" />
                        </svg>
                    </span>

                    <div className="yith-funds-amount-wrapper">
                        <p className="yith-funds-label">Available funds:</p>
                        <p className="yith-funds-amount">{CURRENCY_MAP[currency]}{available.toFixed(2)}</p>
                    </div>
                </div>

                <div className="yith-funds-withdrawable">
                    <p>
                        <strong>Withdrawable Funds:</strong> {CURRENCY_MAP[currency]}{withdrawable.toFixed(2)}
                    </p>
                </div>

                <div className="yith-funds-actions">
                    <p>
                        To manage funds, please visit <a href="https://www.luckydaycompetitions.com/" target="_blank" rel="noopener noreferrer" style={{
                            color: '#B77B13'
                        }}>luckydaycompetitions.com</a>
                    </p>
                </div>
            </form>
        </div>
    );
};