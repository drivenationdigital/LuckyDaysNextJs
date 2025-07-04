import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Page Not Found - Lucky Day Competitions",
    description: "The page you are looking for does not exist.",
    icons: {
        icon: 'images/favicon.png',
    }
};

export default function NotFound() {
    return (
        <div id="content" style={{ height: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="container text-center" style={{ marginTop: '50px' }}>
                <h1>404 - Not Found</h1>
                <p>The page you are looking for does not exist.</p>
            </div>
        </div>
    );
}