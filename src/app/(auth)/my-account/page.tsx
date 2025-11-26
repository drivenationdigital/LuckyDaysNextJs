import Link from "next/link";

import { Metadata } from 'next';
import { LogoutButton } from "@/components/myaccount/LogoutButton";

export const metadata: Metadata = {
    title: "My Account - Lucky Day Competitions",
    description: "Enter exciting competitions to win amazing prizes!",
    icons: {
        icon: 'images/favicon.png',
    }
};

export default async function Page() {
    return (
        <div className="tab-block">
            <div className="tab-content">
                <div className="tab-pane active">
                    <div className="woocommerce-notices-wrapper"></div>

                    <div className="title">
                        <h3>Welcome!</h3>
                        <Link href="/my-account/logout/" className="logout">
                            (Log out)
                        </Link>
                    </div>

                    <p className="mb-4">
                        From your account dashboard you can view your{' '}
                        <Link href="/my-account/orders/">recent orders</Link>, manage your{' '}
                        <Link href="/my-account/edit-address/">shipping and billing addresses</Link>, and{' '}
                        <Link href="/my-account/edit-account/">edit your password and account details</Link>.
                    </p>

                    <div className="d-grid dashboard-cta">
                        <Link href="/my-account/orders/" className="shortcut-icon">
                            <i className="fa fa-box fa-lg"></i>
                            <p className="mb-0">Orders</p>
                        </Link>

                        <Link href="/my-account/edit-address/" className="shortcut-icon">
                            <i className="fa fa-map-marker"></i>
                            <p className="mb-0">Addresses</p>
                        </Link>

                        <Link href="/my-account/edit-account/" className="shortcut-icon">
                            <i className="fa fa-user"></i>
                            <p className="mb-0">Account</p>
                        </Link>
                    </div>

                    {/* if mobile. show logout button */}
                    <div className="mobile-logout-btn d-lg-none">
                        <LogoutButton />
                    </div>

                    <div className="sep-20"></div>
                </div>
            </div>
        </div>
    );
};
