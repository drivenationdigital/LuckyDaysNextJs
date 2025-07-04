import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "My Account - Edit Account - Lucky Day Competitions",
    description: "Enter exciting competitions to win amazing prizes!",
};

export default async function Page() {
    return (
        <div className="tab-block">
            <div className="tab-content">
                <div className="tab-pane active">
                    <div className="woocommerce-notices-wrapper"></div>
                    <div className="title">
                        <h3>Your current account details</h3>
                    </div>
                </div>
            </div>
        </div>
    );
}