'use client'
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchLiveDraws } from "@/api-functions/home";

interface ILiveDraws {
    id: number;
    title: string;
    draw_date?: string;
    facebook_video_id?: string;
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

export const LiveDrawsSection: React.FC = () => {
    const [page, setPage] = useState(1);

    const { data, isFetching } = useQuery({
        queryKey: ['live-draws', page],
        queryFn: () => fetchLiveDraws(9, page),
        staleTime: 1000 * 60 * 5,
    });

    useEffect(() => {
        // scroll to .prizes-worth-section - 100px
        const section = document.querySelector('.prizes-worth-section');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
        }
        
    }, [page]);

    // useEffect(() => {
    //    setTimeout(() => {
    //         const videos = document.querySelectorAll(".row.equal.videos iframe");
    //         videos.forEach(video => {
    //             console.log(video.getBoundingClientRect()) 
    //              const rect = video.getBoundingClientRect();
    //              console.log(rect.height > rect.width ? "portrait" : "landscape");
    //         })
    //    }, 3000);
    // }, []);

    const renderFacebookVideo = (videoId?: string) => {
        if (!videoId) return null;
        const videoUrl = `https://www.facebook.com/facebook/videos/${videoId}`;
        return (

            <iframe
                src={`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(videoUrl)}&show_text=true&width=500`}
                width="500"
                height="280"
                style={{ border: 'none', overflow: 'hidden' }}
                scrolling="no"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; fullscreen; clipboard-write; encrypted-media; picture-in-picture; web-share"
            />
        );
    };

    if ((!data || !data.results || data.results.length === 0) && !isFetching) {
        return <div className="text-center">No past draw results found.</div>;
    }



    const totalPages = data?.pagination?.total_pages || 1;
    const paginationItems = generatePagination(page, totalPages);

    return (
        <div className="container text-center">
            <div className="row equal videos">
                {isFetching && !data ? (
                    // First load skeletons
                    Array.from({ length: 9 }).map((_, i) => <WinnerSkeleton key={i} />)
                ) : (
                    // Keep showing old winners, but add skeleton overlay when changing page
                    data.results.map((result: ILiveDraws, index: number) => (
                        <div className="col-sm-6" key={index}>
                                <div className="fb-video-container">
                                    <div className="fb-video-title">{result.title}</div>
                                    <div className="fb-video-date">{result.draw_date}</div>
                                    <div className="sep-10"></div>
                                    {renderFacebookVideo(result.facebook_video_id)}
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
    );
};
