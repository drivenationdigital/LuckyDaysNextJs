/* eslint-disable @typescript-eslint/no-explicit-any */
export const dynamic = 'force-dynamic';

import { API_URL } from '@/actions/api';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string, prize: string } }
) {
    const { id, prize } = params;

    if (!id) {
        return NextResponse.json(
            { error: 'Product Identifier is required' },
            { status: 400 }
        );
    }

    // Read query params from client request (e.g., /api/instant-win-winners/123?prize=Gold&limit=10)
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit') || '12';
    const offset = searchParams.get('offset') || '0';

    console.log(`${API_URL}/wp-json/next/v1/instant-win-winners?product_id=${id}&prize=${encodeURIComponent(
        prize
    )}&limit=${limit}&offset=${offset}`);
    
    try {
        const response = await fetch(
            `${API_URL}/wp-json/next/v1/instant-win-winners?product_id=${id}&prize=${encodeURIComponent(
                prize
            )}&limit=${limit}&offset=${offset}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-store, no-cache, must-revalidate',
                },
                cache: 'no-store',
            }
        );

        const data = await response.json();

        if (response.ok) {
            return NextResponse.json(data);
        } else {
            return NextResponse.json(
                { error: data.message || 'Failed to fetch instant wins' },
                { status: response.status }
            );
        }
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || 'Fetch failed' },
            { status: 500 }
        );
    }
}
