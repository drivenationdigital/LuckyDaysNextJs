import RecentOrdersTable from '@/components/myaccount/AccountOrders';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "My Account - Orders - Lucky Day Competitions",
    description: "Enter exciting competitions to win amazing prizes!",
};

export default async function Page() {
    return (
        <div className="tab-block">
            <div className="tab-content">
                <RecentOrdersTable />
            </div>
        </div>
    );
}