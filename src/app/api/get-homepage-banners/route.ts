/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
export const dynamic = 'force-dynamic';

import { API_URL } from '@/actions/api';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const response = await fetch(`${API_URL}/wp-json/next/v1/get-home-banners`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-store, no-cache, must-revalidate",
            },
            cache: "no-store",
        });

        const data = await response.json();
        
        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message || "Fetch failed" }, { status: 500 });
    }
}
