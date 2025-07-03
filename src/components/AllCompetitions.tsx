'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchAllCompetitions } from '@/api-functions/posts';
import { ProductCardLoader } from './competition/ProductCard';
import CompetitionGrid from './competition/CompetitionGrid';

export default function CompetitionsContent() {
    const {
        data,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['all-competitions', 1],
        queryFn: () => fetchAllCompetitions(1),
        staleTime: 1000 * 60 * 5, // cache for 5 mins
    });

    if (isLoading) {
        return (
            <div className="container">
                <ul className="comp-grid row equal">
                    {Array.from({ length: 6 }).map((_, i) => <ProductCardLoader key={i} />)}
                </ul>
            </div>
        );
    }

    if (isError || !data || data.length === 0) return <div>No competitions found.</div>;

    return <CompetitionGrid products={data} />;
}
