import { BASE_URL } from "@/actions/api";
import { Metadata } from "next";
import Image from "next/image";

type Props = {
    params: Promise<{ slug: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(
    { params }: Props,
): Promise<Metadata> {
    // read route params
    const { slug } = await params

    const formattedSlug = slug.replace(/-/g, ' ').toUpperCase();

    return {
        title: `${formattedSlug} - Lucky Day Competitions`,
        description: 'Draw Results for ' + formattedSlug,
        keywords: [
            slug,
            'Lucky Day Competitions',
            'Draw Results',
        ],
        icons: {
            icon: '/images/favicon.png',
        },
    }
}

interface IDrawResults {
    title: string;
    draw_image: string;
    results: Array<{
        competition_title: string;
        winner_name: string;
        winning_ticket_number: string;
    }>;
}

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params

    if (!slug) {
        return (
            <div className="woocommerce-checkout woocommerce-page woocommerce-order-received">
                <main id="content">
                    <div className="container my-4">
                        <h1>Invalid Draw Result</h1>
                        <p>Please check the draw result slug and try again.</p>
                    </div>
                </main>
            </div>
        );
    }

    let drawResultData: IDrawResults | null = null;

    try {
        const drawResult = await fetch(`${BASE_URL}/api/draw-results/${slug}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-store, no-cache, must-revalidate",
            },
            cache: "no-store",
        });

        const json = await drawResult.json();
        if (json && json.success) {
            drawResultData = json.data; // assuming your API returns { success: true, data: {...} }
        } else {
            throw new Error(json?.error || "Failed to fetch draw result");
        }
    } catch (error) {
        console.error("Error fetching draw result:", error);
    }

    if (!drawResultData) {
        return (
            <main className="content-page">
                <div className="container text-center">
                    <div className="col-sm-8 offset-sm-2">
                        <h2>Draw not found</h2>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <>
            <div className="category-banner draw-result-banner text-center">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-8 offset-sm-2">
                            <span>Draw Results</span>
                            <h1>{drawResultData.title}</h1>
                        </div>
                    </div>
                </div>
            </div>

            <main className="content-page">
                <div className="container text-center">
                    <div className="col-sm-8 offset-sm-2">
                        {drawResultData.draw_image && (
                            <Image src={drawResultData.draw_image} alt={drawResultData.title}
                                layout="responsive"
                                width={500}
                                height={300}
                            />
                        )}
                        <div className="sep-30"></div>
                        <div className="draw-result-list">
                            {drawResultData.results.map((result: IDrawResults["results"][number], index: number) => (
                                <div className="single-result mb-4" key={index}>
                                    <i className="fas fa-medal" aria-hidden="true"></i>
                                    <strong>
                                        {result.competition_title}: <br />
                                    </strong>
                                    <span className="winner-name">{result.winner_name}</span>
                                    <span className="winner-ticket">
                                        {" "} - Ticket #{result.winning_ticket_number}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </>
    );

}