import { BASE_URL } from "@/actions/api";

export async function fetchWinners({
    product_id,
    prize,
    offset = 0,
}: {
    product_id: number | string;
    prize: string;
    offset?: number;
}) {
    try {
        const res = await fetch(`${BASE_URL}/api/get-winners-for-prize`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                product_id,
                prize,
                limit: 20,
                offset,
            }),
        });

        if (!res.ok) {
            return { rows: [], has_more: false, offset: 0 };
        }

        const json = await res.json();

        if (!json?.success || !json?.data) {
            return { rows: [], has_more: false, offset: 0 };
        }

        return json.data; // must include: rows, has_more, offset
    } catch (error) {
        console.error('Error fetching winners:', error);
        return { rows: [], has_more: false, offset: 0 };
    }
}
