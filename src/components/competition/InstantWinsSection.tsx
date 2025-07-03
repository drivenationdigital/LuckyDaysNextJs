'use client';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'
import Image from 'next/image';

type Ticket = {
    number: number;
    winner: string | null;
    prize: string;
};

type InstantWinGroup = {
    subtitle?: string;
    image?: string;
    tickets: Ticket[];
};

type InstantWinsData = {
    [key: string]: InstantWinGroup;
};

type InstantWinsAccordionProps = {
    data: InstantWinsData;
};

function InstantWinsAccordion({ data }: InstantWinsAccordionProps) {
    if (!data || Object.keys(data).length === 0) return null;

    return (
        <>
            {Object.entries(data).map(([key, group], index) => {
                const panelId = `iw-panel-${index}`;
                const { tickets, subtitle, image } = group;
                const winners = tickets.filter((ticket) => ticket.winner);
                const instantWinsLeft = tickets.length - winners.length;

                return (
                    <div className="card" key={key}>
                        <div
                            data-bs-toggle="collapse"
                            data-bs-target={`#${panelId}`}
                            className="instant-wins-group-header text-left collapsed" 
                            style={{ cursor: "pointer" }}
                        >
                            <Image
                                className="instant-win-image"
                                src={image || '/images/placeholder.jpg'}
                                alt={key}
                                width={60}
                                height={60}
                            />
                            <div className="prize-text">
                                <span>{key}</span>
                                <span className="winners-count">{instantWinsLeft} Remaining</span>
                            </div>
                        </div>

                        <div id={panelId} className="card-header collapse">
                            <div className="card-body instant-win-groups">
                                {subtitle && (
                                    <div className="instant-win-grouped-item subtitle">{subtitle}</div>
                                )}

                                <div className="instant-wins-number-container">
                                    {tickets.map((ticket) => {
                                        const won = !!ticket.winner;
                                        return (
                                            <div
                                                key={ticket.number}
                                                className={`instant-win-grouped-item ${won ? 'won' : 'not-won'}`}
                                                style={{ order: ticket.number }}
                                            >
                                                <span
                                                    className={`instant-win-number ${won ? 'won' : 'not-won'}`}
                                                    style={{ fontWeight: 700 }}
                                                >
                                                    {won ? (
                                                        <span data-id={ticket.number}>WON</span>
                                                    ) : (
                                                        ticket.number
                                                    )}
                                                </span>
                                                <div className="sep-30"></div>
                                                <span
                                                    className={`instant-win-item-tag ${won ? 'won' : 'not-won'}`}
                                                >
                                                    {won ? ticket.winner : 'Win Now'}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </>
    );
}

const InstantWinsSection: React.FC<{ product_id: number }> = ({ product_id }) => {
    const [notice, setNotice] = useState<string | null>(null);

    const {
        data: instantWins,
        isLoading,
    } = useQuery<InstantWinsData>({
        queryKey: ["instant-wins", product_id],
        queryFn: async () => {
            const res = await fetch(`/api/product/${product_id}/instant-wins`);
            if (!res.ok) {
                const errorData = await res.json();
                setNotice(`${errorData.message || "Failed to fetch instant wins"}`);
                throw new Error(errorData.message || "Failed to fetch instant wins");
            }

            setNotice(null); // Clear notice on successful fetch
            return res.json();
        },
        staleTime: 60 * 1000,
        refetchInterval: 120 * 1000,
        retry: 1,
    });

    if (isLoading || !instantWins) return null;

    if (instantWins && Object.keys(instantWins).length === 0) return null

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
                                    {isLoading && (
                                        <div className="text-center">
                                            <div className="spinner-border text-primary" role="status">
                                                <span className="sr-only">Loading...</span>
                                            </div>
                                        </div>
                                    )}

                                    {instantWins && (
                                        <InstantWinsAccordion data={instantWins} />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default InstantWinsSection;