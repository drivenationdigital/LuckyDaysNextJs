/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
export const dynamic = 'force-dynamic';

import { API_URL } from '@/actions/api';
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

        const { itemId } = await request.json();

        if (!itemId || typeof itemId !== 'number') {
            return NextResponse.json({ error: `Invalid product ID : ${itemId}` }, { status: 400 });
        }
    
        const response = await fetch(`${API_URL}/wp-json/next/v1/remove-from-cart`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ product_id: itemId, cart_key: cartKey }),
        });
        if (!response.ok) {
            const errorData = await response.json();
            return NextResponse.json({ error: errorData.message || "Failed to remove item from cart" }, { status: response.status });
        }

        const data = await response.json();
        return NextResponse.json(data.data || { success: true, message: "Item removed from cart" });
    } catch (error: any) {
        return NextResponse.json({ error: error.message || "Fetch failed" }, { status: 500 });
    }
}
