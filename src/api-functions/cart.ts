import { BASE_URL } from "@/actions/api";

export async function getStoreApiNonce(): Promise<string> {
    const res = await fetch(`${BASE_URL}/api/get-nonce`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await res.json();
    return data.nonce;
  }