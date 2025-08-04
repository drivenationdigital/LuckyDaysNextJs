
import { ViewOrderComponent } from '@/components/myaccount/AccountViewOrder';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "My Account - View Orders - Lucky Day Competitions",
    description: "Enter exciting competitions to win amazing prizes!",
};

export default async function Page({
    params,
}: {
    params: Promise<{ id: number }>
}) {
    const { id } = await params

    if (!id) {
        return (
            <div className="tab-block">
                <div className="tab-content">
                    <p>Order not found.</p>
                </div>
            </div>
        );
    }
    return (
        <div className="tab-block">
            <div className="tab-content">
                <ViewOrderComponent orderId={id} />
            </div>
        </div>
    );
}