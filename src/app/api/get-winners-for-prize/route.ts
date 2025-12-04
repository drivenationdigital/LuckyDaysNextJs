/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_URL } from "@/actions/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
) {
    const { searchParams } = new URL(request.url);

    // Prize now comes from the query parameters
    const prizeParam = searchParams.get("prize") || "";
    const decodedPrize = decodeURIComponent(prizeParam);

    const limit = searchParams.get("limit") || "12";
    const offset = searchParams.get("offset") || "0";
    const id = searchParams.get("product_id") || "";

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

        if (response.ok) {
            return NextResponse.json({
                "success": true,
                "data": {
                    "rows": [
                        {
                            "number": "26",
                            "user": "Mark T."
                        },
                        {
                            "number": "20",
                            "user": "Mark T."
                        },
                        {
                            "number": "93",
                            "user": "Mark T."
                        },
                        {
                            "number": "73",
                            "user": "Mark T."
                        },
                        {
                            "number": "31",
                            "user": "Mark T."
                        },
                        {
                            "number": "14",
                            "user": "Mark T."
                        },
                        {
                            "number": "9",
                            "user": "Mark T."
                        }
                    ],
                    "count": 7,
                    "has_more": false,
                    "total": 7,
                    "offset": 0
                }
            });
        }

        return NextResponse.json(
            { error: data.message || "Failed to fetch instant wins" },
            { status: response.status }
        );
    } catch (error: any) {
        console.log(error);
        
        return NextResponse.json(
            { error: error.message || "Fetch failed" },
            { status: 500 }
        );
    }
}
