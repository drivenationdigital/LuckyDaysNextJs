/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_URL } from "@/actions/api";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const res = await fetch(`${API_URL}/wp-json/next/v1/pastwinners`);
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "Failed to fetch past winners data");
        }
        const data = await res.json();
        return NextResponse.json({ winners: data.results || [], winner_count: data.count || 0 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}