/* eslint-disable @typescript-eslint/no-unused-vars */
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

        const { coupon } = await request.json();

        if (!coupon || typeof coupon !== 'string') {
            return NextResponse.json({ error: `Invalid coupon code: ${coupon}` }, { status: 400 });
        }

        const response = await fetch(`${API_URL}/wp-json/next/v1/remove-coupon`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cart_key: cartKey, coupon }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to remove coupon: ${errorData.message || 'Unknown error'}`);
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message || "Fetch failed" }, { status: 500 });
    }
}
