/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
    try {
        const { cartKey, userId } = await req.json();

        if (!cartKey) {
            return NextResponse.json({ success: false, message: "Missing cartKey" }, { status: 400 });
        }

        if (!userId) {
            return NextResponse.json({ success: false, message: "Missing userId" }, { status: 401 });
        }

        const secret = process.env.CHECKOUT_SHARED_SECRET!;

        console.log(secret);
        

        const token = jwt.sign(
            { cart_key: cartKey, user_id: userId, source: "next-app", },
            secret,
            { algorithm: "HS256", expiresIn: "5m" }
        );

        return NextResponse.json({
            success: true,
            url: `${process.env.WP_CHECKOUT_URL}?session=${encodeURIComponent(token)}`
        });
    } catch (e: any) {
        return NextResponse.json({ success: false, message: e.message }, { status: 500 });
    }
}
