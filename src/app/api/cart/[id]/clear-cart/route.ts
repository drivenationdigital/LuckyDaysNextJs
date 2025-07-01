/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
export const dynamic = 'force-dynamic';

import { API_URL } from '@/actions/api';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { id: cartKey } = params;

        if (!cartKey) {
            return NextResponse.json({ error: "Cart key is required" }, { status: 400 });
        }

        const response = await fetch(`${API_URL}/wp-json/next/v1/clear-cart`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify({ cart_key: cartKey }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.log("Error clearing cart:", errorData);
            
            return NextResponse.json({ error: errorData.message || "Failed to clear cart" }, { status: response.status });
        }

        const data = await response.json();
        
        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message || "Fetch failed" }, { status: 500 });
    }
}
