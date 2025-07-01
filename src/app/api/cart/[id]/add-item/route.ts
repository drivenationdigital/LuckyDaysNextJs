/* eslint-disable @typescript-eslint/no-explicit-any */
export const dynamic = 'force-dynamic';

import { API_URL } from '@/actions/api';
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

        const { productId, nonce=1, quantity = 1 } = await request.json();

        if (!productId || typeof productId !== 'number') {
            return NextResponse.json({ error: `Invalid product ID : ${productId}` }, { status: 400 });
        }
        if (typeof quantity !== 'number' || quantity <= 0) {
            return NextResponse.json({ error:  `Invalid quantity: ${quantity}` }, { status: 400 });
        }

        const response = await fetch(`${API_URL}/wp-json/next/v1/add-to-cart`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json', 'nonce': nonce },
            body: JSON.stringify({ product_id: productId, quantity, cart_key: cartKey}),
        });
        if (!response.ok) {
            const errorData = await response.json();
            return NextResponse.json({ error: errorData.message || 'Failed to add item' }, { status: response.status });
        }

        const data = await response.json();
        return NextResponse.json(data, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message || "Fetch failed" }, { status: 500 });
    }
}
