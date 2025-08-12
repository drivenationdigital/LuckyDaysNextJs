import { PastDrawsSection } from "@/components/DrawResults";
import { AwardsSection } from "@/components/home/AwardsSection";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Draw Results - Lucky Day Competitions",
    description: "Explore the draw results of our exciting competitions and see who has won amazing prizes!",
    icons: {
        icon: 'images/favicon.png',
    }
};

export default function Page() {
    return (
        <main>
            <div className="category-banner past-winners-banner text-center"
                style={{ backgroundImage: `url('https://cdn.prod.luckydaycompetitions.com/wp-content/uploads/2025/06/10104950/draw-resuls.jpg')` }}>
            </div>
            <AwardsSection />
            <PastDrawsSection />
        </main>
    )
}

