import { LiveDrawsSection } from "@/components/LiveDraws";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Live Draws - Lucky Day Competitions",
    description: "Explore the live draws of our exciting competitions and see who has won amazing prizes!",
    icons: {
        icon: 'images/favicon.png',
    }
};
export default function Page() {
    return (
        <main>
            <div className="sep-30"></div>
            <LiveDrawsSection />
        </main>
    )
}
