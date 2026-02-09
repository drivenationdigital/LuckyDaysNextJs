/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_URL, SESSION_COOKIE_NAME } from "@/actions/api";
import { authFetch } from "@/utils/authFetch";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// Force dynamic rendering - no caching
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

    if (!token) {
        return NextResponse.json({ loggedIn: false }, { status: 401 });
    }

    try {
        const res = await authFetch(`${API_URL}/wp-json/app-yith-wallet/v1/wallet-balance`);

        if (!res.ok) {
            return NextResponse.json(
                { error: "Oops, Failed to fetch wallet balance" },
                { status: res.status }
            );
        }

        const data = await res.json();

        if (!data.success) {
            return NextResponse.json({ error: data.message, data }, { status: 400 });
        }

        // Return with no-cache headers
        return NextResponse.json(data, {
            headers: {
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0',
            }
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}