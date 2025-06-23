/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
export const dynamic = 'force-dynamic';

import { API_URL } from '@/actions/api';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const response = await fetch(`${API_URL}/wp-json/next/v1/nonce`, {
            credentials: 'include',
        });

        const { nonce } = await response.json();
        if (!nonce) {
            return NextResponse.json({ error: "Nonce not found" }, { status: 404 });
        }

        return NextResponse.json({ nonce });
    } catch (error: any) {
        return NextResponse.json({ error: error.message || "Fetch failed" }, { status: 500 });
    }
}
