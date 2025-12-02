/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_URL, SESSION_COOKIE_NAME } from "@/actions/api";
import { authFetch } from "@/utils/authFetch";
import { cookies } from "next/headers";

import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

    if (!token) {
        return NextResponse.json({ loggedIn: false }, { status: 401 });
    }

    try {
        const userRes = await authFetch(`${API_URL}/wp-json/next/v1/me`);

        if (!userRes.ok) {
            const errorData = await userRes.json();
            throw new Error(errorData.message || "Failed to fetch user data");
        }

        const data = await userRes.json();
        return NextResponse.json({ loggedIn: true, user: data.user });
    } catch (error: any) {
        return NextResponse.json({ loggedIn: false, message: error.message }, { status: 401 });
    }
}
