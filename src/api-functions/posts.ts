export const fetchHomeCompetitions = async (page: number) => {
    const response = await fetch(`http://localhost:3000/api/get-home-competitions?page=${page}&_=${Date.now()}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        cache: "no-store",
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
    const response = await fetch(`http://localhost:3000/api/get-all-competitions?page=${page}&_=${Date.now()}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        cache: "no-store",
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
    const response = await fetch(`http://localhost:3000/api/get-homepage-banners`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        cache: "no-store",
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

export const fetchProductMetaData = async (id: string) => {
    const response = await fetch(`http://localhost:3000/api/get-product-meta-data?id=${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        cache: "no-store",
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
    const response = await fetch(`http://localhost:3000/api/get-product-by-id?id=${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        cache: "no-store",
        next: {
            revalidate: 60, // This ensures the data is always fresh
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch product by ID');
    }

    const data = await response.json();
    return data;
}