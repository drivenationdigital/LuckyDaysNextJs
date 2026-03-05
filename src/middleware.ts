// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { SESSION_COOKIE_NAME } from './actions/api';
import { verifyJwtToken } from './utils/jwt';

export async function middleware(req: NextRequest) {
    // Handle login_token on order-received before anything else
    const loginToken = req.nextUrl.searchParams.get('login_token');
    if (loginToken) {
        const cleanUrl = req.nextUrl.clone();
        cleanUrl.searchParams.delete('login_token');

        const response = NextResponse.redirect(cleanUrl);
        response.cookies.set(SESSION_COOKIE_NAME, loginToken, {
            path: '/',
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 60 * 60 * 48,
        });

        return response;
    }

    // Existing auth protection for /my-account
    const token = req.cookies.get(SESSION_COOKIE_NAME)?.value;

    if (!token) {
        return redirectToLogin(req);
    }

    try {
        await verifyJwtToken(token);
        return NextResponse.next();
    } catch (err) {
        console.error('JWT verification failed:', err);
        return redirectToLogin(req);
    }
}

function redirectToLogin(req: NextRequest) {
    const loginUrl = new URL('/auth/', req.url);
    loginUrl.searchParams.set('redirect', req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
}

export const config = {
    matcher: [
        '/my-account/:path*',
        '/order-received/:path*',
    ],
};