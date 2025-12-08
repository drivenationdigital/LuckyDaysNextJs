// utils/headlessFetch.server.ts
import { cookies } from "next/headers";

export async function headlessFetch(url: string, options: RequestInit = {}) {
    const cookieStore = await cookies();
    const currencyCookie = cookieStore.get('ld_currency')?.value;

    const currency: 'GBP' | 'EUR' =
        currencyCookie === 'GBP' || currencyCookie === 'EUR'
            ? currencyCookie
            : 'GBP';

    return fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            'X-App-Currency': currency,
        },
        cache: 'no-store',
    });
}
