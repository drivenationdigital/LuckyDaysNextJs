/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
export const dynamic = 'force-dynamic';

import { API_URL } from '@/actions/api';
import { authFetch } from '@/utils/authFetch';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { id: cartKey } = params;

        if (!cartKey) {
            return NextResponse.json({ error: "Cart key is required" }, { status: 400 });
        }

        const response = await authFetch(`${API_URL}/wp-json/next/v2/get-next-cart/${cartKey}`, {
            method: 'GET',
            cache: 'no-store', // Ensures fresh data on each request
        }, false);

        if (!response.ok) {
            const errorData = await response.json();
            return NextResponse.json({ message: errorData.message || "Failed to fetch cart" }, { status: response.status });
        }

        const data = await response.json();
        return NextResponse.json(data.data);
    } catch (error: any) {
        return NextResponse.json({ message: error.message || "Fetch failed" }, { status: 500 });
    }
}
