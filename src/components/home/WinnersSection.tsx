'use client';
import { fetchWinners } from '@/api-functions/home';
import { useQuery } from '@tanstack/react-query';
import React from 'react'

interface IPastWinner {
    id: number;
    prize_won: string;
    winner_name: string;
    winner_location: string;
    permalink: string;
    image: string;
}

export const WinnersSection: React.FC = () => {
    const {
        data,
    } = useQuery({
        queryKey: ['winners'],
        queryFn: fetchWinners,
        staleTime: 1000 * 60 * 5, // 5 minutes cache
    });

    if (!data || !data.winners || data.winners.length === 0) {
        return <div className="text-center">No winners found.</div>;
    }

    return (
        <section className="winner-section">
            <div className="container">
                <div className="text-center winner-title-content">
                    <div className="sub-titless">All Competitions</div>
                    <h2 className="white-color">{data?.winner_count} winners &amp; counting</h2>
                </div>

                <div className="row equal">
                    {data && data.winners?.length > 0 && data.winners.map((winner: IPastWinner, index: number) => (
                        <div className="col-12 col-sm-6 col-lg-4" key={index}>
                            <a href={winner.permalink} className="winner-box text-center">
                                <div className="img-blk"
                                    style={{
                                        backgroundImage: `url(${winner.image})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center'
                                    }}
                                ></div>
                                <div className="info-blk">
                                    <h4>{winner.prize_won}</h4>
                                    <h6><strong>Won by:</strong> {winner.winner_name}</h6>
                                    <div className="clearfix"></div>
                                </div>
                            </a>
                        </div>
                    ))}
                </div>
            </div>

            <div className="rowtheme-btn"> <a className="theme-btn" href="/past-winners/"><span>View more winners</span></a></div>
            <div className="clearfix"></div>
        </section>
    );
}