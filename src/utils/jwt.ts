/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-shared-wp-secret'; // must match WP

export function verifyJwtToken(token: string) {
    try {
        return jwt.verify(token, JWT_SECRET) as { user_id: number; iat: number; exp: number };
    } catch (_: any) {
        return null;
    }
}
