import { AllWinnersSection } from "@/components/AllWinners";
import { AwardsSection } from "@/components/home/AwardsSection";
import Testimonials from "@/components/home/Testimonials";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Past Winners - Lucky Day Competitions",
    description: "Explore the past winners of our exciting competitions and see who has won amazing prizes!",
    icons: {
        icon: 'images/favicon.png',
    }
};

export default function Page() {
    return (
        <main>
            <div className="category-banner past-winners-banner text-center" 
            style={{ backgroundImage: `url('https://cdn.staging.luckydaycompetitions.com/wp-content/uploads/2025/04/15141210/past-winner-banner.jpeg')` }}>
            </div>
            <AwardsSection />
            <Testimonials showTitle={false} />
            <AllWinnersSection />
        </main>
    )
}
