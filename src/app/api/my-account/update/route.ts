/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
export const dynamic = 'force-dynamic';

import { API_URL } from '@/actions/api';
import { authFetch } from '@/utils/authFetch';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
    request: NextRequest,
) {
    try {
        const body = await request.json();
        const accountDetails = body.account_details;

        if (!accountDetails) {
            return NextResponse.json({ error: "Account details are required" }, { status: 400 });
        }

        // Make the API request
        const response = await authFetch(`${API_URL}/wp-json/next/v1/update-account`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(accountDetails),
        });

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json({ error: "Failed to update account details", details: data }, { status: response.status });
        }

        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ message: error.message || "Fetch failed" }, { status: 400 });
    }
}
