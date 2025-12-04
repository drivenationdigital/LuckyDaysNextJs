/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

type WinnersModalProps = {
    show: boolean;
    onClose: () => void;
    productId: number;
    prize: string | null;
};

function WinnersModal({ show, onClose, productId, prize }: WinnersModalProps) {
    const [isMounted, setIsMounted] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') handleClose();
        };

        if (show) {
            setIsVisible(true);
            document.body.style.overflowY = 'hidden';
            window.addEventListener('keydown', handleEscape);

            setTimeout(() => {
                modalRef.current?.classList.add('show');
            }, 10);
        } else if (isVisible) {
            modalRef.current?.classList.remove('show');

            setTimeout(() => {
                setIsVisible(false);
                document.body.style.overflowY = '';
            }, 300);

            window.removeEventListener('keydown', handleEscape);
        }

        return () => window.removeEventListener('keydown', handleEscape);
    }, [show]);

    const handleClose = () => {
        modalRef.current?.classList.remove('show');

        setTimeout(() => {
            setIsVisible(false);
            onClose();
            document.body.style.overflowY = '';
        }, 300);
    };

    if (!isMounted || !isVisible) return null;

    return createPortal(
        <>
            <div
                className="modal-backdrop fade show"
                onClick={handleClose}
                style={{ transition: 'opacity 0.3s ease' }}
            />
            <div
                className="modal-bg modal fade winners-modal"
                ref={modalRef}
                role="dialog"
                tabIndex={-1}
                style={{ display: 'block' }}
                aria-modal="true"
            >
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">

                        <div className="modal-close-button">
                            <i className="fas fa-times" onClick={handleClose}></i>
                        </div>

                        <div className="modal-header justify-content-center">
                            <h2 className="modal-title text-center">All Winners for {prize}</h2>
                        </div>

                        <div className="modal-body" style={{ minHeight: '120px' }}>

                            <div className="que-ans-block">
                                <PrizeWinners
                                    productId={productId}
                                    prize={prize}
                                />
                            </div>
                            
                        </div>

                        {/* <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={handleClose}
                            >
                                Close
                            </button>
                        </div> */}

                    </div>
                </div>
            </div>
        </>,
        document.body
    );
}

// type WinnerResponse = {
//     success: boolean;
//     data: {
//         html: string;
//         has_more: boolean;
//     };
// };

type WinnersQueryParams = {
    product_id: number | string;
    prize: string;
    pageParam?: number;
};


async function fetchWinners({ product_id, prize, pageParam = 1 }: WinnersQueryParams) {
    try {
        const offset = (pageParam - 1) * 20;

        const res = await fetch(
            `/api/get-winners-for-prize?` +
            `prize=${encodeURIComponent(prize)}&product_id=${encodeURIComponent(product_id)}&limit=20&offset=${offset}`,
            {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            }
        );

        if (!res.ok) {
            return { rows: [], has_more: false };
        }

        const json = await res.json();

        if (!json || !json.success || !json.data) {
            return { rows: [], has_more: false };
        }

        return json.data; // { rows, count, has_more, total, offset }
    } catch (error) {
        console.error("Error fetching winners:", error);
        return { rows: [], has_more: false };
    }
}


// Winners Modal
function PrizeWinners({
    productId,
    prize,
}: {
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
        queryKey: [`iw-winner-${productId}-${prize}`],
        queryFn: ({ pageParam = 1 }) =>
            fetchWinners({
                product_id: productId!,
                prize: prize!,
                pageParam,
            }),
        getNextPageParam: (lastPage, pages) =>
            lastPage?.has_more ? pages.length + 1 : undefined,
        retry: 0,
        throwOnError: false,
    });

    const handleScroll = () => {
        const el = containerRef.current;
        if (el && hasNextPage && !isFetchingNextPage) {
            if (el.scrollTop + el.clientHeight >= el.scrollHeight - 100) {
                fetchNextPage();
            }
        }
    };

    const pages = data?.pages ?? [];

    return (
        <div
            className="modal-body"
            ref={containerRef}
            onScroll={handleScroll}
            style={{ maxHeight: "400px", overflowY: "auto" }}
        >
            {isLoading && (
                <div className="iw-loader">Loading...</div>
            )}

            {error && (
                <div className="instant-win-error">
                    Unable to load winners.
                </div>
            )}

            <div className="instant-wins-number-container">
                {pages.map((page, pageIndex) =>
                    page.rows?.map((row: any, i: number) => (
                        <div key={`${pageIndex}-${i}`} className="iw-row">
                            <span className="iw-number">{row.number}</span>
                            <span className="iw-user">{row.user}</span>
                        </div>
                    ))
                )}
            </div>

            {isFetchingNextPage && (
                <div className="iw-loader">Loading more...</div>
            )}
        </div>
    );
}


export default WinnersModal;
