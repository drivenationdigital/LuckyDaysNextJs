import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "My Account - Payment Methods - Lucky Day Competitions",
    description: "Enter exciting competitions to win amazing prizes!",
};

export default async function Page() {
    return (
        <div className="tab-block">
            <div className="tab-content">
                <div className="tab-pane active">
                    <div className="woocommerce-notices-wrapper"></div>
                    <div className="title">
                        <h3>Your payment methods</h3>
                    </div>
                </div>
            </div>
        </div>
    );
}