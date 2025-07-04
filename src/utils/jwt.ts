/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { JWT_SECRET } from '@/actions/api';
import { jwtVerify } from 'jose';

export async function verifyJwtToken(token: string) {
    try {
        const secret = new TextEncoder().encode(JWT_SECRET);
        return await jwtVerify<{ user_id: number; iat: number; exp: number }>(token, secret);
    } catch (err: any) {
        return null;
    }
}
