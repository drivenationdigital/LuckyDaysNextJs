/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_URL, SESSION_COOKIE_NAME } from "@/actions/api";
import { authFetch } from "@/utils/authFetch";
import { cookies } from "next/headers";

import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id: orderId } = await params;

    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

    if (!token) {
        return NextResponse.json({ loggedIn: false }, { status: 401 });
    }

    if (isNaN(parseInt(orderId)) || !orderId) {
        return NextResponse.json({ error: "Invalid order ID" }, { status: 400 });
    }

    try {
        const res = await authFetch(`${API_URL}/wp-json/next/v1/my-orders/${orderId}`);
        const data = await res.json();

        if (!res.ok) {
            return NextResponse.json({ error: "Failed to fetch order", details: data }, { status: res.status });
        }
        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
