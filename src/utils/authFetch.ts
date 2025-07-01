/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { JWT_SECRET, SESSION_COOKIE_NAME } from "@/actions/api";

/**
 * Custom fetch wrapper that automatically adds Authorization header from JWT cookie.
 * Optionally validates the token before making the request.
 *
 * @param input - The fetch URL or Request object.
 * @param init - Optional fetch options.
 * @param forceVerify - If true, throws if the token is invalid or expired.
 * @returns A standard Fetch API Response object.
 */
export async function authFetch(
    input: string,
    init: RequestInit = {},
    forceVerify: boolean = true
): Promise<Response> {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    let isValidToken = false;

    if (!token && forceVerify) {
        throw new Error("No auth token found");
    }

    try {
        if (token) {
            jwt.verify(token, JWT_SECRET!, (err) => {
                if (err) {
                    throw err;
                }
            });

            isValidToken = true;
        }
    } catch (error: any) {
        isValidToken = false;
        
        // Remove the token cookie if verification fails
        cookieStore.delete(SESSION_COOKIE_NAME);
        console.error("Token verification failed:", error);

        // If forceVerify is true AND token is invalid, throw an error
        // This allows you to handle expired or invalid tokens gracefully
        // in your application logic, such as redirecting to login.
        if (forceVerify || error.name === "TokenExpiredError") {
            throw new Error("Invalid or expired token");
        }
    }

    // Merge headers
    const headers: Record<string, string> = {
        ...(init.headers instanceof Headers
            ? Object.fromEntries(init.headers.entries())
            : (init.headers as Record<string, string>)) ?? {},
        "Content-Type": "application/json",
    };
    
    // If token is valid, add Authorization header
    if (isValidToken && token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    const res = await fetch(input, {
        ...init,
        headers,
        credentials: "include",
    });

    return res;
}
