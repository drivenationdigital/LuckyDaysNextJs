'use client'
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchWinners } from "@/api-functions/home";
import { IPastWinner } from "./home/WinnersSection";

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

export const AllWinnersSection: React.FC = () => {
    const [page, setPage] = useState(1);

    const { data, isFetching } = useQuery({
        queryKey: ['all-winners', page],
        queryFn: () => fetchWinners(9, page),
        staleTime: 1000 * 60 * 5,
    });

    // when page changes, scroll to top of .winner-section
    useEffect(() => {
        const winnerSection = document.querySelector('.winner-section');
        if (winnerSection) {
            winnerSection.scrollIntoView({ behavior: 'smooth' });
        }
    }, [page]);


    if ((!data || !data.winners || data.winners.length === 0) && !isFetching) {
        return <div className="text-center">No winners found.</div>;
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
                        data.winners.map((winner: IPastWinner, index: number) => (
                            <div className="col-12 col-sm-6 col-lg-4" key={index}>
                                <div className={`winner-box text-center ${isFetching ? 'loading' : ''}`}>
                                    <div
                                        className="img-blk"
                                        style={{
                                            backgroundImage: `url(${winner.image})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center'
                                        }}
                                    ></div>
                                    <div className="info-blk">
                                        <h4>{winner.prize_won}</h4>
                                        <h6><strong>Won by:</strong> {winner.winner_name}</h6>
                                    </div>
                                </div>
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
