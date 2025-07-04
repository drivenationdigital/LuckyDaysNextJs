import { SESSION_COOKIE_NAME } from "@/actions/api";
import { NextResponse } from "next/server";

export async function POST() {
    // remove the session cookie
    const res = NextResponse.json({ message: "Logged out successfully" }, { status: 200 });
    res.cookies.delete(SESSION_COOKIE_NAME);
    return res;
}