// 'use server';

import { getStoreApiNonce } from "@/api-functions/cart";
import { BASE_URL } from "./api";

export async function addItemToCart(productId: number, quantity: number = 1) {
    const nonce = await getStoreApiNonce();

    const response = await fetch(`${BASE_URL}/api/add-to-cart`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'X-WC-Store-API-Nonce': nonce,
            'Nonce': nonce,
        },
        body: JSON.stringify({ productId, quantity, nonce }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to add item: ${errorData.message || 'Unknown error'}`);

    }

    return response.json();
}