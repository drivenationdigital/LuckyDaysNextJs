import Script from 'next/script';

export default function TrustpilotWidget() {
    return (
        <div className='rating-section text-center'>
            <div className="container-fluid wow fadeIn">

                <Script
                    src="https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js"
                    strategy="afterInteractive"
                />

                <div
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
