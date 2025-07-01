/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
export const dynamic = 'force-dynamic';

import { API_URL } from '@/actions/api';
import { authFetch } from '@/utils/authFetch';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { id: cartKey } = params;

        if (!cartKey) {
            return NextResponse.json({ error: "Cart key is required" }, { status: 400 });
        }

        const body = await request.json();
        const billingData = body.billing_data;

        if (!billingData) {
            return NextResponse.json({ error: "Billing data is required" }, { status: 400 });
        }

        // Prepare the data to be sent to the API
        const postData = {
            cart_key: cartKey,
            billing_data: billingData,
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
        console.log('Order creation response:', data);
        
        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ message: error.message || "Fetch failed" }, { status: 400 });
    }
}
