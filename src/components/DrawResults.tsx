'use client'
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchDrawResults } from "@/api-functions/home";
import Link from "next/link";

interface IPastDrawResult {
    id: number;
    title: string;
    draw_image?: string;
    slug: string;
    description?: string;
}

// Skeleton loader for cards
const WinnerSkeleton = () => (
    <div className="col-12 col-sm-6 col-lg-4">
        <div className="winner-box skeleton">
            <div className="img-blk skeleton-img"></div>
            <div className="info-blk">
                <div className="skeleton-text short"></div>
                <div className="skeleton-text"></div>
            </div>
        </div>
    </div>
);

const generatePagination = (current: number, total: number) => {
    const delta = 2;
    const range: number[] = [];
    const rangeWithDots: (number | string)[] = [];
    let last: number | undefined;

    for (let i = 1; i <= total; i++) {
        if (i === 1 || i === total || (i >= current - delta && i <= current + delta)) {
            range.push(i);
        }
    }

    for (const i of range) {
        if (last) {
            if (i - last === 2) {
                rangeWithDots.push(last + 1);
            } else if (i - last > 2) {
                rangeWithDots.push("…");
            }
        }
        rangeWithDots.push(i);
        last = i;
    }

    return rangeWithDots;
};

export const PastDrawsSection: React.FC = () => {
    const [page, setPage] = useState(1);

    const { data, isFetching } = useQuery({
        queryKey: ['past-winners', page],
        queryFn: () => fetchDrawResults(9, page),
        staleTime: 1000 * 60 * 5,
    });

    useEffect(() => {
        // scroll to .prizes-worth-section - 100px
        const section = document.querySelector('.prizes-worth-section');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
        }
    }, [page]);

    if ((!data || !data.results || data.results.length === 0) && !isFetching) {
        return <div className="text-center">No past draw results found.</div>;
    }

    const totalPages = data?.pagination?.total_pages || 1;
    const paginationItems = generatePagination(page, totalPages);

    return (
        <section className="winner-section">
            <div className="container text-center">
                <div className="row equal">
                    {isFetching && !data ? (
                        // First load skeletons
                        Array.from({ length: 9 }).map((_, i) => <WinnerSkeleton key={i} />)
                    ) : (
                        // Keep showing old winners, but add skeleton overlay when changing page
                        data.results.map((result: IPastDrawResult, index: number) => (
                            <div className="mb-4 col-md-6 col-lg-4" key={index}>
                                <Link href={`/draw-results/${result.slug}`} className="draw-result-preview">
                                    <div className="draw-result-img" style={{ backgroundImage: `url(${result.draw_image ?? 'https://staging.luckydaycompetitions.com/wp-content/themes/luckydays23/images/draw-result-placeholder.jpg'})` }}></div>
                                    <div className="draw-result-preview-inner">
                                        <h4 className="card-title">{result.title}</h4>
                                        {result.description && (
                                        <div dangerouslySetInnerHTML={{ __html: result.description }} />
                                        )}
                                        <span className="view-all">View all results <i className="fa fa-angle-right"></i></span>
                                    </div>
                                </Link>
                            </div>
                        ))
                    )}
                </div>

                {totalPages > 1 && (
                    <div className="product-pagination previous-winners-pagination">
                        <ul className="page-numbers">
                            <li>
                                <button
                                    disabled={page === 1}
                                    onClick={() => setPage(p => p - 1)}
                                    className="page-numbers"
                                >
                                    <i className="fa fa-angle-left"></i>
                                </button>
                            </li>

                            {paginationItems.map((item, idx) => (
                                <li key={idx}>
                                    {item === "…" ? (
                                        <span className="page-numbers dots">…</span>
                                    ) : (
                                        <button
                                            className={`page-numbers ${page === item ? 'current' : ''}`}
                                            onClick={() => setPage(item as number)}
                                        >
                                            {item}
                                        </button>
                                    )}
                                </li>
                            ))}

                            <li>
                                <button
                                    disabled={page === totalPages}
                                    onClick={() => setPage(p => p + 1)}
                                    className="page-numbers"
                                >
                                    <i className="fa fa-angle-right"></i>
                                </button>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
            <div className="clearfix"></div>
        </section>
    );
};
