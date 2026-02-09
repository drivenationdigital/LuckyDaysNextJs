import { WalletBalance } from '@/components/myaccount/WalletBalance';
import { WalletTransactions } from '@/components/myaccount/WalletTransactions';
import React from 'react';

const Page = () => {
    return (
        <div className="tab-block">
            <div className="tab-content">
                <div className="tab-pane active">
                    <div className="woocommerce-notices-wrapper"></div>

                    <div className="yith-funds-endpoint-wrapper">
                        <h2>My Wallet</h2>

                        <WalletBalance />
                        <WalletTransactions />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;