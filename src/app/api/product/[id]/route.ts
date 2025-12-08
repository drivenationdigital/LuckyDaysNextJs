/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { API_URL } from '@/actions/api';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest,
    { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    if (!id) {
        return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    try {
        const headerCurrency = request.headers.get('x-app-currency');

        const currency =
            headerCurrency === 'GBP' || headerCurrency === 'EUR'
                ? headerCurrency
                : 'GBP';

        const response = await fetch(`${API_URL}/wp-json/next/v1/get-product/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-store, no-cache, must-revalidate",
                "X-App-Currency": currency,
            },
            cache: "no-store",
        });

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message || "Fetch failed" }, { status: 500 });
    }
}
