import { cookies } from "next/headers";

export async function getPersistedSSRCurrency(): Promise<'GBP' | 'EUR'> {
    const cookieStore = await cookies();
    const currency = cookieStore.get('ld_currency')?.value;

    return (currency === 'GBP' || currency === 'EUR') ? currency : 'GBP';
}


export async function headlessFetch(url: string, options: RequestInit = {}) {
    const currency = await getPersistedSSRCurrency();

    return fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            'X-App-Currency': currency,
        },
    });
}
