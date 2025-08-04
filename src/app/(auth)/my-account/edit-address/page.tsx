import { AddressDetails } from '@/components/myaccount/AddressDetails';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "My Account - Edit Address - Lucky Day Competitions",
    description: "Enter exciting competitions to win amazing prizes!",
};

export default async function Page() {
    return (
        <div className="tab-block">
            <div className="tab-content">
                <AddressDetails />
            </div>
        </div>
    );
}