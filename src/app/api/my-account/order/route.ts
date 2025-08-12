/* eslint-disable @typescript-eslint/no-explicit-any */
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

    // page number
    const page = parseInt(request.nextUrl.searchParams.get("page") ?? "1", 10);
    
    try {
        const res = await authFetch(`${API_URL}/wp-json/next/v1/my-orders?page=${page}`);
        const data = await res.json();

        if (!data.success) {
            return NextResponse.json({ error: data.message, data }, { status: 400 });
        }

        if (!res.ok) {
            return NextResponse.json({ error: "Oops, Failed to fetch orders" }, { status: res.status });
        }
        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
