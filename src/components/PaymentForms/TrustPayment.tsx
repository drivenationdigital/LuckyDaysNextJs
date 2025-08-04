/* eslint-disable @typescript-eslint/no-explicit-any */
import { createJwtToken } from '@/utils/jwt';
import React, { useEffect, useState } from 'react';

declare global {
    interface Window { ST: any; }
}

const TrustPaymentForm = () => {
    const [loaded, setLoaded] = useState(false);
    const [jwt, setJwt] = useState<string | null>(null);

    useEffect(() => {
        if (loaded) return;

        const script = document.createElement('script');
        script.src = 'https://cdn.eu.trustpayments.com/js/latest/st.js';
        script.async = true;
        script.onload = async () => {
            const payload = {
                currencyiso3a: 'GBP',
                orderreference: 'ORDER-' + crypto.randomUUID(),
                sitereference: 'test_acecompetition138979', // 🔁 Replace with your real site reference
                accounttypedescription: 'ECOM',
                requesttypedescriptions: ['THREEDQUERY', 'AUTH'],
                baseamount: '1050', // £10.50 in minor units
                locale: 'en_GB',
            };

            const data = await createJwtToken(payload)

            setJwt(data)
            setLoaded(true)
        };
        document.body.appendChild(script);
        return () => { document.body.removeChild(script); };
    }, []);

    useEffect(() => {
        if (!loaded || !jwt || !window.SecureTrading) return;

        try {
            const st = window.SecureTrading({ jwt });
            console.log('Initializing SecureTrading with JWT:', jwt, st);
            st.Components();
        } catch (e) {
            console.error('Failed to initialize SecureTrading:', e);
        }
    }, [loaded, jwt]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        window.ST?.Components.submit();
    };

    return (
        <>
            <div id="st-notification-frame"></div>
            <form id="st-form" method="POST" onSubmit={handleSubmit}>
                <div id="st-card-number"></div>
                <div id="st-expiration-date"></div>
                <div id="st-security-code"></div>
                <button type="submit">Pay securely</button>
            </form>
        </>
    );
};

export default TrustPaymentForm;