/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { JWT_SECRET } from '@/actions/api';
import { jwtVerify, SignJWT } from 'jose';

export async function verifyJwtToken(token: string) {
    try {
        const secret = new TextEncoder().encode(JWT_SECRET);
        return await jwtVerify<{ user_id: number; iat: number; exp: number }>(token, secret);
    } catch (err: any) {
        return null;
    }
}

export async function createJwtToken(payload: any) {
    try {
        const secret = new TextEncoder().encode('55-0e6d8229e71a7bf09ac094ebb4b3e74263695f962d338e6554fe1f68da0e3155');
        return await new SignJWT(payload)
            .setProtectedHeader({ alg: 'HS256' })
            .sign(secret);
    } catch (err: any) {
        console.error('Error creating JWT token:', err);
        return null;
    }
}