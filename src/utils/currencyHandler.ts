export function updatePersistedCurrency(currency: 'GBP' | 'EUR') {
    document.cookie = `ld_currency=${currency}; path=/; max-age=31536000; SameSite=None; Secure`;
}

export function getPersistedCurrency(): 'GBP' | 'EUR' {
    const match = document.cookie.match(/ld_currency=(GBP|EUR)/);
    return (match?.[1] as 'GBP' | 'EUR') || 'GBP';
}