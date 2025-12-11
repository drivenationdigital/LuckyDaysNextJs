/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useRef } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import WinnersModal from "./WinnersModal";

// Types
type InstantWinPrize = {
    prize: string;
    image: string;
    prize_count: number;
    prize_remaining: number;
    prize_won_count: number;
    has_wins: string;
};



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
                <div className='bg-white' style={{borderRadius:"4px"}}>
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
            </div>

            {/* Modal */}
            <WinnersModal
                show={modalOpen}
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