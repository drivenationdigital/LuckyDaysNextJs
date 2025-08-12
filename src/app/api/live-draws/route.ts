/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_URL } from "@/actions/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const page = parseInt(request.nextUrl.searchParams.get("page") ?? "1", 10);
        const limit = parseInt(request.nextUrl.searchParams.get("limit") ?? "9", 10);

        const res = await fetch(`${API_URL}/wp-json/next/v1/get-livedraw-data?limit=${limit}&page=${page}`);
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "Failed to fetch draw results data");
        }
        const data = await res.json();
        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}