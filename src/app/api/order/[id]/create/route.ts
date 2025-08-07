/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
export const dynamic = 'force-dynamic';

import { API_URL } from '@/actions/api';
import { authFetch } from '@/utils/authFetch';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: cartKey } = await params;

        if (!cartKey) {
            return NextResponse.json({ error: "Cart key is required" }, { status: 400 });
        }

        const body = await request.json();
        const billingData = body.billing_data;
        const paymentMethod = body.payment_method || 'default';
        const paymentDetails = body.payment_details || {};

        if (!billingData) {
            return NextResponse.json({ error: "Billing data is required" }, { status: 400 });
        }

        // Prepare the data to be sent to the API
        const postData = {
            cart_key: cartKey,
            billing_data: billingData,
            payment_method: paymentMethod,
            payment_details: paymentDetails
        };

        // Make the API request
        const response = await authFetch(`${API_URL}/wp-json/next/v1/create-order`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
        }, false);

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ message: error.message || "Fetch failed" }, { status: 400 });
    }
}
