"use client";
import { useQuery } from "@tanstack/react-query";

export type WPUser = {
    id: number;
    username: string;
    email: string;
    display_name: string;
    first_name: string;
    last_name: string;
    billing_address: {
        first_name: string;
        last_name: string;
        company: string;
        address_1: string;
        address_2: string;
        city: string;
        state: string;
        postcode: string;
        country: string;
        phone: string;
        email: string;
    };
    roles: string[];
};

export function useSession() {
    const { data, isLoading, refetch, isFetched } = useQuery<WPUser | null>({
        queryKey: ["session"],
        queryFn: async () => {
            const res = await fetch("/api/session", {
                method: "GET",
                credentials: "include",
            });

            if (!res || !res.ok) return null;
            const data = await res.json();
            return data.user;
        },
        staleTime: 5 * 60 * 1000, // Cache for 5 minutes
        refetchOnWindowFocus: false,
    });

    return {
        user: data,
        isLoggedIn: !!data,
        isLoading,
        refetch,
        isFetched,
    };
}