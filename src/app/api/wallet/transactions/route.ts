/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_URL, SESSION_COOKIE_NAME } from "@/actions/api";
import { authFetch } from "@/utils/authFetch";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// Force dynamic rendering - no caching
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: NextRequest) {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

    if (!token) {
        return NextResponse.json({ loggedIn: false }, { status: 401 });
    }

    const page = parseInt(request.nextUrl.searchParams.get("page") ?? "1", 10);
    const perPage = parseInt(request.nextUrl.searchParams.get("per_page") ?? "20", 10);

    try {
        const res = await authFetch(
            `${API_URL}/wp-json/app-yith-wallet/v1/transaction-history?page=${page}&per_page=${perPage}`
        );

        if (!res.ok) {
            return NextResponse.json(
                { error: "Oops, Failed to fetch wallet transactions" },
                { status: res.status }
            );
        }

        const data = await res.json();

        if (!data.success) {
            return NextResponse.json({ error: data.message, data }, { status: 400 });
        }

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