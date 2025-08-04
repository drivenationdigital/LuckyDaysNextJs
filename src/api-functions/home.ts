import { BASE_URL } from "@/actions/api";

export const fetchTestimonials = async () => {
    const response = await fetch(`${BASE_URL}/api/testimonials`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        next: {
            revalidate: 60, // This ensures the data is always fresh
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch testimonials');
    }

    const data = await response.json();
    return data.testimonials || [];
}

export const fetchWinners = async () => {
    const response = await fetch(`${BASE_URL}/api/winners`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        next: {
            revalidate: 60, // This ensures the data is always fresh
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch testimonials');
    }

    const data = await response.json();
    return data;
}