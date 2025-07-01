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

        const { coupon } = await request.json();

        if (!coupon || typeof coupon !== 'string') {
            return NextResponse.json({ error: `Invalid coupon code: ${coupon}` }, { status: 400 });
        }

        const response = await authFetch(`${API_URL}/wp-json/next/v1/add-coupon`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cart_key: cartKey, coupon }),
        }, false);

        if (!response.ok) {
            const errorData = await response.json();
            console.log(errorData);
            
            throw new Error(`Failed to apply coupon: ${errorData.message || 'Unknown error'}`);
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ message: error.message || "Fetch failed" }, { status: 400 });
    }
}
