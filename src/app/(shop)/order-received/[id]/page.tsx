import OrderReceived from "@/components/checkout/OrderRecieved";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Thank you - Lucky Day Competitions",
    description: "Enter exciting competitions to win amazing prizes!",
    icons: {
        icon: 'images/favicon.png',
    }
};

export default async function Page({
    params,
}: {
    params: Promise<{ id: number }>
}) {
    const { id } = await params

    if (!id || isNaN(id)) {
        return (
            <div className="woocommerce-checkout woocommerce-page woocommerce-order-received">
                <main id="content">
                    <div className="container my-4">
                        <h1>Invalid Order ID</h1>
                        <p>Please check the order ID and try again.</p>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="woocommerce-checkout woocommerce-page woocommerce-order-received">
            <main id="content">
                <OrderReceived order_id={id} />
            </main>
        </div>
    );

}