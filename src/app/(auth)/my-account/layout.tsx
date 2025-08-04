import React from 'react';
import MyAcccountNav from '@/components/myaccount/MyAccountNav';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'My Account',
    description: 'Manage your account, view orders, and update details.',
    icons: {
        icon: 'images/favicon.png',
    }
};

export default function MyAccountLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main id="content">
            <div className="container woocommerce-account woocommerce-page">
                <article id="post-13" className="post-13 page type-page status-publish hentry">
                    <div className="entry-content">
                        <div className="woocommerce">
                            <section className="dashboard-section">
                                <div className="dashboard-block d-lg-flex">
                                    <MyAcccountNav />
                                    {children}
                                </div>
                            </section>
                        </div>
                    </div>
                </article>
            </div>
        </main>
    );
}
