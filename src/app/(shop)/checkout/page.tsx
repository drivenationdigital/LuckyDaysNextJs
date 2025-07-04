import CheckoutForm from "@/components/checkout/Checkout";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Checkout - Lucky Day Competitions",
    description: "Enter exciting competitions to win amazing prizes!",
};

export default function Page() {
    return (
        <main id="content">
            <div className="container woocommerce-checkout">
                <article className="page type-page status-publish hentry">
                    <header className="header">
                        <h1 className="entry-title">Checkout</h1>
                    </header>
                    <div className="entry-content">
                        <CheckoutForm />
                    </div>
                </article>
            </div>
        </main>
    );
}
