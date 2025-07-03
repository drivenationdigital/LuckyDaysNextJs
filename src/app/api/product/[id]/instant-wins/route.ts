/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
export const dynamic = 'force-dynamic';

import { API_URL } from '@/actions/api';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest,
    { params }: { params: Promise<{ id: string }> }

  ) {
    const { id } = await params;

    if (!id) {
        return NextResponse.json({ error: "Product Identifier is required" }, { status: 400 });
    }

    try {
        const response = await fetch(`${API_URL}/wp-json/next/v1/get-product-iw/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-store, no-cache, must-revalidate",
            },
            cache: "no-store",
        });

        const data = await response.json();

        if (data && data.success === true) {
            return NextResponse.json(data.data);
        } else{
            return NextResponse.json({ error: data.message || "Failed to fetch instant wins" }, { status: 404 });
        }
    } catch (error: any) {
        return NextResponse.json({ error: error.message || "Fetch failed" }, { status: 500 });
    }
}
