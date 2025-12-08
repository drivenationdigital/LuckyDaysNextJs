import NextDrawOnlyCompetitions from "@/components/NextDrawOnlyCompetitions";

export const metadata = {
    title: "Next Draw Competitions - Lucky Day Competitions",
    description: "Enter exciting competitions to win amazing prizes!",
};

export default function Page() {
    return (
        <>
            <div className="category-banner text-center">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-6 offset-sm-3">
                            <h1>Next Draw</h1>
                            <p>Last chance - these products are ending very soon!</p>
                        </div>
                    </div>
                </div>
            </div>

            <main>
                <div className="top-competition-section">
                    <NextDrawOnlyCompetitions />
                </div>
            </main>
        </>
    );
}
