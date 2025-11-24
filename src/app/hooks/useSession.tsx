"use client";
import { useQuery } from "@tanstack/react-query";

export interface IAddress {
    first_name: string;
    last_name: string;
    company: string;
    address_1: string;
    address_2: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
    phone?: string;
    email?: string;
}

export type WPUser = {
    id: number;
    username: string;
    email: string;
    display_name: string;
    first_name: string;
    last_name: string;
    billing_address: IAddress;
    shipping_address: IAddress;
    roles: string[];
};

export function useSession() {
    const { data, isLoading, refetch, isFetched, } = useQuery<WPUser | null>({
        queryKey: ["session"],
        queryFn: async () => {
            const res = await fetch("/api/session", {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                // avoid caching to always get the latest session info
                cache: "no-store",
            });

            if (!res || !res.ok) return null;
            const data = await res.json();
            return data.user;
        },
        staleTime: 5 * 60 * 1000, // Cache for 5 minutes
        refetchOnWindowFocus: false,
    });

    const logout = async () => {
        try {
            // remove the session cookie, invalidate the session
            const res = await fetch("/api/auth/logout", {
                method: "POST",
                credentials: "include",
            });

            if (!res || !res.ok) {
                throw new Error("Failed to log out");
            }

            // refetch the session to update the state
            await refetch();
            // Optionally, you can redirect the user to the home page or login page
            window.location.href = "/auth";
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return {
        user: data,
        isLoggedIn: !!data,
        isLoading,
        refetch,
        isFetched,
        logout,
    };
}