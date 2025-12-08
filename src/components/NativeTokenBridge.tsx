/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { SESSION_COOKIE_NAME } from "@/actions/api";
import { useSession } from "@/app/hooks/useSession";
import { useEffect } from "react";

export default function NativeTokenBridge() {
        const { isLoggedIn, refetch } = useSession();
    
    useEffect(() => {
        function handleNativeToken() {
            const token = (window as any).__NATIVE_TOKEN__;
            if (!token) return;

            document.cookie = `${SESSION_COOKIE_NAME}=${token}; path=/; Secure; SameSite=None`;

            if (!isLoggedIn) {
                refetch();
            }
        }

        window.addEventListener("native-token-ready", handleNativeToken);
        return () => window.removeEventListener("native-token-ready", handleNativeToken);
    }, [isLoggedIn]);

    return null;
}
