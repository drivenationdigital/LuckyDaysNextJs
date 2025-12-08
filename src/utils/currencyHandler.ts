export function updatePersistedCurrency(currency: 'GBP' | 'EUR') {
    if (typeof document === 'undefined') return;

    document.cookie = `ld_currency=${currency}; path=/; max-age=31536000; SameSite=None; Secure`;
}

export function getPersistedCurrency(): 'GBP' | 'EUR' {
    if (typeof document === 'undefined') {
        return 'GBP';
    }
    const match = document.cookie.match(/ld_currency=(GBP|EUR)/) as [string, 'GBP' | 'EUR'] | null;

    return match?.[1] || 'GBP';
}
