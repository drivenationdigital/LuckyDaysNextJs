import { BASE_URL } from "@/actions/api";

export const fetchHomeCompetitions = async (page: number) => {
    const response = await fetch(`${BASE_URL}/api/get-home-competitions?page=${page}&_=${Date.now()}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        next: {
            revalidate: 0, // This ensures the data is always fresh
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch competitions');
    }

    const data = await response.json();
    return data;
};

export const fetchAllCompetitions = async (page: number) => {
    const response = await fetch(`${BASE_URL}/api/get-all-competitions?page=${page}&_=${Date.now()}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        next: {
            revalidate: 60, // This ensures the data is always fresh
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch competitions');
    }

    const data = await response.json();
    return data;
};

export const fetchHomepageBanners = async () => {
    const response = await fetch(`${BASE_URL}/api/get-homepage-banners`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        next: {
            revalidate: 60, // This ensures the data is always fresh
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch homepage banners');
    }

    const data = await response.json();
    return data;
}

export const fetchProductMetaData = async (identifier: string) => {
    const response = await fetch(`${BASE_URL}/api/product/${identifier}/meta`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        next: {
            revalidate: 60, // This ensures the data is always fresh
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch product metadata');
    }

    const data = await response.json();
    return data;
}

export const fetchProductById = async (id: string) => {
    const response = await fetch(`${BASE_URL}/api/product/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        next: {
            revalidate: 60, // This ensures the data is always fresh
        }
    });

    if (!response.ok || response.status !== 200) {
        throw new Error('Failed to fetch product by ID');
    }

    const data = await response.json();
    return data;
}