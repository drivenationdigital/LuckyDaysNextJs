'use server'

import { API_URL } from "@/actions/api";
import { cookies } from "next/headers";

export async function getSession() {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
        return null;
    }

    try {
        const res = await fetch(`${API_URL}/wp-json/next/v1/me`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                // Include the token in the Authorization header if needed
                "Authorization": `Bearer ${token}`,
            },
        });

        if (!res.ok) {
            const errorData = await res.json();
            console.error("Failed to fetch session:", errorData);
            return null;
        }

        const data = await res.json();
        console.log("Session data:", data);
        
        return data;
    } catch (error) {
        console.error("Failed to fetch session:", error);
        return null;
    }
}