/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { createContext, useCallback, useContext } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { CompetitionSections } from '@/types/posts';
import { fetchHomeCompetitions } from '@/api-functions/posts';

interface ObservedQueryContextProps {
    data: any; // Replace 'any' with the type of your data
    isLoading: boolean;
    error: any; // Replace 'any' with the type of your error object
    isFetching: boolean;
    isFetchingNextPage: boolean;
    fetchNextPage: () => Promise<any>;
    hasNextPage: boolean | undefined;
    refetch: () => Promise<any>;
    getMorePosts: () => void;
}

const ObservedQueryContext = createContext<ObservedQueryContextProps>(
    {} as ObservedQueryContextProps
);

const ObservedQueryProvider = ({ children }: any) => {
    const key = 'competitions';

    const { isLoading, error, data, isFetching, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } = useInfiniteQuery({
        queryKey: [key],
        queryFn: ({ pageParam }: { pageParam?: number }) => {
            return fetchHomeCompetitions(pageParam || 1);
        },
        getNextPageParam: (lastPage: { total_pages: number, data: CompetitionSections[], limit: number; }, pages: any[]) => {
            const maxPages = Math.ceil(lastPage.total_pages / lastPage.limit);
            const nextPage = pages.length + 1;
            return nextPage <= maxPages ? nextPage : undefined;
        },
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        initialPageParam: 1,
        retry: 1,
    });

    const getMorePosts = useCallback(async () => {
        if (hasNextPage && !isFetchingNextPage) {
            await fetchNextPage();
        }
    }, [hasNextPage, fetchNextPage, isFetchingNextPage]);

    const contextValue = {
        data,
        isLoading,
        isFetching,
        error,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
        refetch,
        getMorePosts,
    };

    return (
        <ObservedQueryContext.Provider value={contextValue}>
            {children}
        </ObservedQueryContext.Provider>
    );
};

export const useObservedQuery = (): ObservedQueryContextProps => {
    return useContext(ObservedQueryContext);
};

export default ObservedQueryProvider;
