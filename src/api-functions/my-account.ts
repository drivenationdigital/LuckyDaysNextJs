import { BASE_URL } from "@/actions/api";

export const fetchMyOrders = async (page: number) => {
    const response = await fetch(`${BASE_URL}/api/my-account/order?page=${page}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        next: {
            revalidate: 0, // This ensures the data is always fresh
        }
    });
    if (!response.ok) {
        throw new Error('Failed to fetch orders');
    }

    const data = await response.json();
    return data.data
};

export const fetchOrderById = async (id: number, token?: string) => {
    const response = await fetch(`${BASE_URL}/api/my-account/order/${id}?token=${token ?? '-1'}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        next: {
            revalidate: 0, // This ensures the data is always fresh
        }
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(`Failed to fetch order with ID ${id}: ${data.error || 'Unknown error'}`);
    }

    return data.data;
};

export const updateAccountDetails = async (details: {
    account_first_name: string;
    account_last_name: string;
    account_display_name: string;
    account_email: string;
    password_current?: string;
    password_new?: string;
}) => {
    const response = await fetch(`${BASE_URL}/api/my-account/update`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ account_details: details }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to update account details: ${errorData.error || 'Unknown error'}`);
    }

    return await response.json();
}

export const getPaymentMethods = async () => {
    const response = await fetch(`${BASE_URL}/api/my-account/payment-methods`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to fetch payment methods: ${errorData.error || 'Unknown error'}`);
    }

    const data = await response.json(); // Should return an array of payment methods
    return data.methods || []; // Ensure we return an array even if empty
};

export const createPaymentMethod = async (methodData: {
    type: string;
    card_number: string;
    expiry_date: string;
    cvv: string;
    is_default?: boolean;
}) => {
    const response = await fetch(`${BASE_URL}/api/my-account/payment-methods/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ payment_method: methodData }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to create payment method: ${errorData.error || 'Unknown error'}`);
    }

    return await response.json(); // Should return the created payment method
};

export const updatePaymentMethod = async (
    methodId: number,
    updatedFields: {
        card_number?: string;
        expiry_date?: string;
        is_default?: boolean;
    }
) => {
    const response = await fetch(`${BASE_URL}/api/my-account/payment-methods/${methodId}/update`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ payment_method: updatedFields }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to update payment method: ${errorData.error || 'Unknown error'}`);
    }

    return await response.json(); // Should return the updated payment method
};
