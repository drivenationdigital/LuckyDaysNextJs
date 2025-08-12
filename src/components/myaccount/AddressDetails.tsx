'use client';
import { useSession } from '@/app/hooks/useSession';
import Link from 'next/link';
import React from 'react'

export const AddressDetails: React.FC = () => {
    const { user, isLoggedIn } = useSession();
    if (!isLoggedIn) {
        return <p>You must be logged in to view this page.</p>;
    }

    console.log(user);


    return (
        <div className="tab-pane active">
            <div className="woocommerce-notices-wrapper"></div>
            <p>The following addresses will be used on the checkout page by default.</p>

            <div className="u-columns woocommerce-Addresses col2-set addresses">
                <div className="col-12 woocommerce-Address">
                    <header className="woocommerce-Address-title title">
                        <h3>Billing address</h3>
                        <Link href="/my-account/edit-address/billing/" className="edit theme-btn">{
                            (user?.billing_address.address_1 && user?.billing_address.city && user?.billing_address.postcode) ? 'Edit' : 'Add'}
                        </Link>
                    </header>

                    <address>
                        {(user?.billing_address?.address_1 && user?.billing_address?.city && user?.billing_address?.postcode) ? (
                            <>
                                <p>{user?.billing_address?.first_name} {user?.billing_address?.last_name}<br />
                                    {user?.billing_address?.address_1}<br />
                                    {user?.billing_address?.city}<br />
                                    {user?.billing_address?.postcode}</p>
                            </>
                        ) : (
                            <>You have not set up this type of address yet.</>
                        )}
                    </address>
                </div>

                <div className="col-12 woocommerce-Address">
                    <header className="woocommerce-Address-title title">
                        <h3>Shipping address</h3>
                        <Link href="/my-account/edit-address/shipping/" className="edit theme-btn">
                            {(user?.shipping_address?.address_1 && user?.shipping_address?.city && user?.shipping_address?.postcode) ? 'Edit' : 'Add'}
                        </Link>
                    </header>
                    <address>
                        {(user?.shipping_address?.address_1 && user?.shipping_address?.city && user?.shipping_address?.postcode) ? (
                            <>
                                <p>{user?.shipping_address?.first_name} {user?.shipping_address?.last_name}<br />
                                    {user?.shipping_address?.address_1}<br />
                                    {user?.shipping_address?.city}<br />
                                    {user?.shipping_address?.postcode}</p>
                            </>
                        ) : (
                            <>You have not set up this type of address yet.</>
                        )}
                    </address>
                </div>

            </div>
        </div>
    );
}