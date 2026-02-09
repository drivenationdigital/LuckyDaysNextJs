'use client';

import { useSession } from '@/app/hooks/useSession';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

export default function MyAccountNav() {
    const pathname = usePathname();
    const { logout } = useSession();

    const navItems = [
        { href: '/my-account', label: 'Dashboard', key: 'dashboard' },
        { href: '/my-account/orders', label: 'Orders', key: 'orders' },
        // { href: '/my-account/balance', label: 'Gift Card Balance', key: 'pw-gift-card-balance' },
        { href: '/my-account/edit-address', label: 'Addresses', key: 'edit-address' },
        { href: '/my-account/my-wallet', label: 'My Wallet', key: 'my-wallet' },
        { href: '/my-account/payment-methods', label: 'Payment methods', key: 'payment-methods' },
        { href: '/my-account/edit-account', label: 'Account details', key: 'edit-account' },
    ];

    const normalize = (url: string) => url.replace(/\/+$/, ''); // Remove trailing slashes

    const isActive = (href: string) => {
        if (!pathname) return false;
        return normalize(pathname) === normalize(href);
    };

    const handleLogout = () => {
        if (confirm('Are you sure you want to log out?')) {
            logout();
        };
    }

    return (
        <>
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

                    {/* Logout link */}
                    <li className="woocommerce-MyAccount-navigation-link woocommerce-MyAccount-navigation-link--customer-logout">
                        <a
                            href="#"
                            onClick={() => {
                                handleLogout();
                            }} className="woocommerce-Button woocommerce-Button--logout">
                            Logout
                        </a>
                    </li>
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
        </>
    );
}