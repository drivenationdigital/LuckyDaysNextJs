/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { API_URL } from "@/actions/api";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST(req: NextRequest) {
    try {
        const { product_id } = await req.json();

        if (!product_id) {
            return NextResponse.json({ success: false }, { status: 400 });
        }

        // Call your EXISTING WordPress popup endpoint
        const res = await fetch(
            `${API_URL}/wp-json/next/v1/fetch-product-upsell`,
            {
                method: "POST",
                cache: "no-store",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ product_id }),
            }
        );

        const data = await res.json();

        return NextResponse.json(data);
    } catch (e: any) {
        return NextResponse.json({ success: false, error: e.message }, { status: 500 });
    }
}
