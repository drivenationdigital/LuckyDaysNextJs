/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { getPaymentMethods } from '@/api-functions/my-account';
import { useQuery } from '@tanstack/react-query';
import React from 'react'

export const AccountPaymentMethods: React.FC = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['payment-methods'],
        queryFn: () => getPaymentMethods(),
        staleTime: 1000 * 60 * 1, // 5 minutes cache
    });

    if (isLoading) {
        return <p>Loading payment methods...</p>;
    }

    console.log(`Payment methods data:`, data);


    if (isError || !data || data.length === 0) {
        return (
            <div className="tab-pane active">
                <div className="woocommerce-notices-wrapper"></div>
                <p>Payment methods not found.</p>
            </div>
        );
    }


    return (
        <div className="tab-pane active">
            <div className="woocommerce-notices-wrapper"></div>
            <div className="title">
                <h3>Your payment methods</h3>
            </div>
            <ul className="payment-methods-list">
                {data.map((method: any) => (
                    <li key={method.id}>
                        <span>{method.type}</span>
                        <span>{method.card_number}</span>
                        <span>{method.expiry_date}</span>
                        {method.is_default && <span>(Default)</span>}
                    </li>
                ))}
            </ul>
        </div>
    );
}