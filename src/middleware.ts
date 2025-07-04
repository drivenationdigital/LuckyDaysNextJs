// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { SESSION_COOKIE_NAME } from './actions/api';
import { verifyJwtToken } from './utils/jwt';

export async function middleware(req: NextRequest) {
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
    matcher: ['/my-account/:path*'],
};
