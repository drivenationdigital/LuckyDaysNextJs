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

export const fetchWinners = async (limit=9, page=1) => {
    const response = await fetch(`${BASE_URL}/api/winners?limit=${limit}&page=${page}`, {
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

export const fetchDrawResults = async (limit=9, page=1) => {
    const response = await fetch(`${BASE_URL}/api/draw-results?limit=${limit}&page=${page}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        next: {
            revalidate: 60, // This ensures the data is always fresh
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch draw results');
    }

    const data = await response.json();
    return data;
}

export const fetchLiveDraws = async (limit=9, page=1) => {
    const response = await fetch(`${BASE_URL}/api/live-draws?limit=${limit}&page=${page}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        next: {
            revalidate: 60, // This ensures the data is always fresh
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch live draws');
    }

    const data = await response.json();
    return data;
}