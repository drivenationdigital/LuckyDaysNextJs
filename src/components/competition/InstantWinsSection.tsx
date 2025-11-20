"use client";

import { useState, useRef } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import Image from "next/image";

// Types
type InstantWinPrize = {
    prize: string;
    image: string;
    prize_count: number;
    prize_remaining: number;
    prize_won_count: number;
    has_wins: string;
};

type WinnerResponse = {
    success: boolean;
    data: {
        html: string;
        has_more: boolean;
    };
};

type WinnersQueryParams = {
    product_id: number | string;
    prize: string;
    pageParam?: number;
};

// Fetch winners paginated
async function fetchWinners({ product_id, prize, pageParam = 1 }: WinnersQueryParams) {
    try {
        const res = await fetch(`/api/product/${product_id}/instant-wins/${prize}/prizes?page=${pageParam}&offset=${(pageParam - 1) * 20}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            // body: JSON.stringify({
            //     product_id,
            //     prize,
            //     limit: 20,
            //     offset: (pageParam - 1) * 20,
            // }),
        });

        const json: WinnerResponse = await res.json();

        if (!json.success) {
            throw new Error("Failed to load winners");
        }
        return json.data;
    } catch (error) {
        console.error("Error fetching winners:", error);
        return { html: "<p class='instant-win-error'>Error loading winners</p>", has_more: false };
    }
}

// Winners Modal
function WinnersModal({
    isOpen,
    onClose,
    productId,
    prize,
}: {
    isOpen: boolean;
    onClose: () => void;
    productId: number | string | null;
    prize: string | null;
}) {
    const containerRef = useRef<HTMLDivElement>(null);

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        error,
    } = useInfiniteQuery({
        initialPageParam: 1,
        queryKey: ["winners", productId, prize],
        queryFn: ({ pageParam = 1 }) => fetchWinners({ product_id: productId!, prize: prize!, pageParam }),
        getNextPageParam: (lastPage, pages) => (lastPage.has_more ? pages.length + 1 : undefined),
        retry: 1,
        enabled: isOpen && !!productId && !!prize,
    });

    // Infinite scroll
    const handleScroll = () => {
        const el = containerRef.current;
        if (el && hasNextPage && !isFetchingNextPage) {
            if (el.scrollTop + el.clientHeight >= el.scrollHeight - 100) {
                fetchNextPage();
            }
        }
    };

    if (!isOpen) return null;


    console.log(data);

    if (!data || !data.pages.length) return null;

    return (
        <div className="modal-backdrop">
            <div className="modal">
                <div className="modal-header">
                    <h5>All Winners for {prize}</h5>
                    <button onClick={onClose}>X</button>
                </div>
                <div
                    className="modal-body"
                    ref={containerRef}
                    onScroll={handleScroll}
                    style={{ maxHeight: "400px", overflowY: "auto" }}
                >
                    {isLoading && <div className="iw-loader">Loading...</div>}
                    {error && <div className="instant-win-error">Error loading winners</div>}

                    <div className="instant-wins-number-container">
                        {data?.pages.map((page, i) => (
                            <div
                                key={i}
                                dangerouslySetInnerHTML={{ __html: page.html }}
                            />
                        ))}
                    </div>

                    {isFetchingNextPage && <div className="iw-loader">Loading more...</div>}
                    {!hasNextPage && !isLoading && (
                        <div className="instant-win-empty">No more winners</div>
                    )}
                </div>
            </div>
        </div>
    );
}

// Accordion (Prize list)
function InstantWinsAccordion({
    data,
    productId,
    onPrizeClick,
}: {
    data: InstantWinPrize[];
    productId: number | string;
    onPrizeClick: (prize: string, productId: number | string) => void;
}) {
    return (
        <>
            {data.map((item, index) => {
                const hasWins = item.prize_won_count > 0 ? "has-wins" : "no-wins";
                return (
                    <div className="card" key={index}>
                        <div
                            className={`instant-wins-group-header text-left collapsed ${hasWins}`}
                            data-prize={item.prize}
                            style={{ cursor: "pointer" }}
                            onClick={() => hasWins === "has-wins" && onPrizeClick(item.prize, productId)}
                        >
                            <Image
                                src={item.image || "/images/placeholder.jpg"}
                                alt={item.prize}
                                width={60}
                                height={60}
                            />
                            <div className="prize-text">
                                <span>
                                    <strong>{item.prize}</strong>
                                </span>
                                <span className="winners-count">
                                    <strong>
                                        {item.prize_remaining}/{item.prize_count}
                                    </strong>
                                </span>
                            </div>
                        </div>
                    </div>
                );
            })}
        </>
    );
}

// Section
const InstantWinsSection: React.FC<{ product_id: number }> = ({
    product_id,
}) => {
    const [notice, setNotice] = useState<string | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedPrize, setSelectedPrize] = useState<string | null>(null);

    const { data, isLoading } = useQuery<{ success: boolean; data: InstantWinPrize[] }>({
        queryKey: ["instant-wins", product_id],
        queryFn: async () => {
            const res = await fetch(`/api/product/${product_id}/instant-wins`);
            const json = await res.json();
            if (!res.ok || !json.length) {
                setNotice(json.message || "Failed to fetch instant wins");
                throw new Error(json.message || "Failed to fetch instant wins");
            }
            setNotice(null);
            return {
                success: true,
                data: json,
            };
        },
        staleTime: 60 * 1000,
        refetchInterval: 120 * 1000,
        retry: 1,
    });

    if (isLoading) return null;
    if (!data?.data || data.data.length === 0) return null;

    return (
        <section className="pro-info-tab mt-0 pt-1">
            <div className="container">
                <h3 className="text-center">Instant Wins</h3>
                <div id="product-accordion">
                    {notice && (
                        <div className="alert alert-danger text-center" role="alert">
                            {notice}
                        </div>
                    )}
                    <div className="instant-wins-container">
                        <div id="dropdown-iw" className="collapse show" data-parent="#faq">
                            <div className="card-body">
                                <div id="accordion">
                                    <InstantWinsAccordion
                                        data={data.data}
                                        productId={product_id}
                                        onPrizeClick={(prize) => {
                                            setSelectedPrize(prize);
                                            setModalOpen(true);
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            <WinnersModal
                isOpen={modalOpen}
                onClose={() => {
                    setModalOpen(false);
                    setSelectedPrize(null);
                }}
                productId={product_id}
                prize={selectedPrize}
            />
        </section>
    );
};

export default InstantWinsSection;