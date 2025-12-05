/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_URL } from "@/actions/api";
import { NextRequest, NextResponse } from "next/server";

// no cache for this route
export const revalidate = 0;
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
    const body = await request.json();

    const id = body.product_id || "";
    const prize = body.prize || "";
    const limit = body.limit || 20;
    const offset = body.offset || 0;

    const decodedPrize = decodeURIComponent(prize);

    const apiURL =
        `${API_URL}/wp-json/next/v2/instant-win-winners` +
        `?product_id=${id}` +
        `&prize=${encodeURIComponent(decodedPrize)}` +
        `&limit=${limit}` +
        `&offset=${offset}`;

    console.log("Calling API:", apiURL);

    try {
        const response = await fetch(apiURL, {
            method: "GET",
            cache: "no-store",
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-store, no-cache, must-revalidate",
            },
        });

        const data = await response.json();

        return NextResponse.json(data, {
            status: response.status,
            headers: {
                "Cache-Control": "no-store, no-cache, must-revalidate",
            },
        });

    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || "Fetch failed" },
            { status: 500 }
        );
    }
}