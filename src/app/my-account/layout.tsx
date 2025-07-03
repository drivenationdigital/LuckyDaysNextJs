'use client';
import Link from 'next/link';
import { useSession } from '../hooks/useSession';
import AuthPage from '@/components/AuthPage';
import { usePathname } from 'next/navigation';
import React from 'react';

export default function MyAccountLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { isLoading, isLoggedIn, refetch } = useSession();
    const pathname = usePathname();

    if (isLoading) return <div className="text-center py-10">Loading...</div>;

    if (!isLoggedIn) return <AuthPage onAuthenticated={refetch} />;


    const navItems = [
        { href: '/my-account', label: 'Dashboard', key: 'dashboard' },
        { href: '/my-account/orders', label: 'Orders', key: 'orders' },
        { href: '/my-account/balance', label: 'Gift Card Balance', key: 'pw-gift-card-balance' },
        { href: '/my-account/edit-address', label: 'Addresses', key: 'edit-address' },
        { href: '/my-account/payment-methods', label: 'Payment methods', key: 'payment-methods' },
        { href: '/my-account/edit-account', label: 'Account details', key: 'edit-account' },
    ];

    const normalize = (url: string) => url.replace(/\/+$/, ''); // Remove trailing slashes

    const isActive = (href: string) => {
        if (!pathname) return false;
        return normalize(pathname) === normalize(href);
    };

    return (
        <main id="content">
            <div className="container">
                <article id="post-13" className="post-13 page type-page status-publish hentry">
                    <div className="entry-content">
                        <div className="woocommerce">
                            <section className="dashboard-section">
                                <div className="dashboard-block d-lg-flex">
                                    <div className="menu-block align-self-start d-none d-lg-block">
                                        <ul className="nav dashboard-tabs">
                                            {navItems.map(({ href, label, key }) => (
                                                <li
                                                    key={key}
                                                    className={`woocommerce-MyAccount-navigation-link woocommerce-MyAccount-navigation-link--${key} ${isActive(href) ? 'is-active' : ''
                                                        }`}
                                                >
                                                    <Link href={href}>{label}</Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="form-group d-lg-none">
                                        <select
                                            className="form-control custom-select"
                                            id="tab_selector"
                                            defaultValue=""
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (value) window.location.href = value;
                                            }}
                                        >
                                            <option disabled>Account Menu</option>
                                            {navItems.map(({ href, label }) => (
                                                <option key={href} value={href}>
                                                    {label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

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
