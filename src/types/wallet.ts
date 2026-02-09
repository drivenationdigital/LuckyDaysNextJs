export interface WalletBalance {
    available: number;
    withdrawable: number;
    currency: string;
    currency_symbol: string;
}

export interface WalletBalanceResponse {
    success: boolean;
    data?: WalletBalance;
    message?: string;
    error?: string;
}

export interface WalletTransaction {
    id: string;
    date: string;
    reason: string;
    amount: number;
    type: 'pay' | 'deposit' | 'restore' | 'remove' | string;
    order_id: number | null;
    order_url?: string;
    editor_name?: string;
    timestamp: number;
}

export interface WalletPagination {
    current_page: number;
    per_page: number;
    total_transactions: number;
    total_pages: number;
    has_more: boolean;
}

export interface WalletTransactionsData {
    transactions: WalletTransaction[];
    pagination: WalletPagination;
}

export interface WalletTransactionsResponse {
    success: boolean;
    data?: WalletTransactionsData;
    message?: string;
    error?: string;
}
