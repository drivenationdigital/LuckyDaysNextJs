import { BASE_URL } from "@/actions/api";

export async function getStoreApiNonce(): Promise<string> {
    const res = await fetch(`${BASE_URL}/api/cart/get-nonce`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await res.json();
    return data.nonce;
  }

export async function fetchUpsell(productId: number) {
    const res = await fetch(`${BASE_URL}/api/cart/popup`, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
         },
        body: JSON.stringify({ product_id: productId }),
    });

    const json = await res.json();
    return json?.success ? json.data : null;
}
