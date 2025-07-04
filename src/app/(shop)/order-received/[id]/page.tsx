import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Thank you - Lucky Day Competitions",
    description: "Enter exciting competitions to win amazing prizes!",
};

export default function Page() {
    return (
        <main id="content">
            <div className="container woocommerce">
                <h1>Order Received</h1>
                <p>Thank you for your order! Your order has been received and is being processed.</p>
                <p>You will receive an email confirmation shortly.</p>
                <Link href="/" className="btn btn-primary">Return to Shop</Link>
            </div>
        </main>
    );
}