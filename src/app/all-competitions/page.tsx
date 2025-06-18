import CompetitionsContent from "@/components/AllCompetitions";

export const metadata = {
    title: "All Competitions - Lucky Day Competitions",
    description: "Enter exciting competitions to win amazing prizes!",
};

export default function Page() {
    return (
        <>
            <div className="text-center luckydays-alert-block">
                <div className="container">
                    <a href="/next-draw">
                        <strong>Next Draw</strong> View All Prizes <i className="fa fa-caret-right"></i>
                    </a>
                </div>
            </div>

            <div className="category-banner text-center">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-6 offset-sm-3">
                            <h1>All Prizes</h1>
                            <p>Here is where you can browse the range of prizes available to be won through Lucky Day Competitions.</p>
                        </div>
                    </div>
                </div>
            </div>

            <main>
                <div className="top-competition-section">
                    <CompetitionsContent />
                </div>
            </main>
        </>
    );
}
