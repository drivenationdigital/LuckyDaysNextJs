import FaqAccordion from "@/components/FAQ";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "FAQ - Lucky Day Competitions",
    description: "Explore the FAQ of our exciting competitions and see who has won amazing prizes!",
    icons: {
        icon: 'images/favicon.png',
    }
};

export default function Page() {
    return (
        <>
            <div className="category-banner text-center">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-6 offset-sm-3">
                            <h1>Facts &amp; FAQs</h1>
                        </div>
                    </div>
                </div>
            </div>
            <FaqAccordion />
            <br />
        </>
    )
}
