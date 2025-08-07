/* eslint-disable @typescript-eslint/no-unused-vars */
import { API_URL, SESSION_COOKIE_NAME } from "@/actions/api";
import { authFetch } from "@/utils/authFetch";
import { cookies } from "next/headers";

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

    if (!token) {
        return NextResponse.json({ loggedIn: false }, { status: 401 });
    }
    if (!token) return NextResponse.json({ loggedIn: false }, { status: 401 });

    const res = await authFetch(`${API_URL}/wp-json/next/v1/payment-methods`);
    const data = await res.json();

    if (!res.ok) return NextResponse.json(data, { status: res.status });
    return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

    if (!token) {
        return NextResponse.json({ loggedIn: false }, { status: 401 });
    }

    const body = await req.json();
    const res = await authFetch(`${API_URL}/wp-json/next/v1/payment-methods`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) return NextResponse.json(data, { status: res.status });
    return NextResponse.json(data);
}