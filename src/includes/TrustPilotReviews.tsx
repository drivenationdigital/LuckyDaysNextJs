'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

export default function TrustpilotWidget() {
    const [isWebView, setIsWebView] = useState(false);

    useEffect(() => {
        const ua = navigator.userAgent || '';

        // Detect iOS/Android WebView
        const webview =
            ua.includes('wv') ||
            ua.includes('WebView') ||
            /; wv\)/.test(ua) ||
            ua.includes('Linux;') && ua.includes('Android') && !ua.includes('Chrome');

        setIsWebView(webview);

        // Try to manually load Trustpilot widget *after* script loads
        const interval = setInterval(() => {
            if (window.Trustpilot) {
                const el = document.getElementById('tp-widget');
                if (el) {
                    window.Trustpilot.loadFromElement(el, true);
                    clearInterval(interval);
                }
            }
        }, 300);

        return () => clearInterval(interval);
    }, []);

    // WebView fallback (Trustpilot does NOT support widget in embedded browsers)
    if (isWebView) {
        return null;
    }

    return (
        <div className="rating-section text-center">
            <div className="container-fluid">

                {/* Load Trustpilot script */}
                <Script
                    src="https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js"
                    strategy="afterInteractive"
                />

                <div
                    id="tp-widget"
                    className="trustpilot-widget"
                    data-locale="en-GB"
                    data-template-id="54ad5defc6454f065c28af8b"
                    data-businessunit-id="5dcc16aa3fb8f30001e75400"
                    data-style-height="240px"
                    data-style-width="100%"
                    data-theme="light"
                    data-stars="4,5"
                    data-review-languages="en"
                >
                    <a
                        href="https://uk.trustpilot.com/review/luckydaycompetitions.com"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Trustpilot
                    </a>
                </div>
            </div>
        </div>
    );
}
