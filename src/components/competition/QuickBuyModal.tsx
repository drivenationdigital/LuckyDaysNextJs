/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import TicketForm from './ProductActions';
import { CompetitionProduct } from '@/types/posts';

type QuickBuyModalProps = {
    productName?: string;
    show: boolean;
    onClose: () => void;
    product: CompetitionProduct | null; // Adjust type as needed
};

export default function QuickBuyModal({
    show,
    onClose,
    product,
}: QuickBuyModalProps) {
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

            // Trigger show animation
            setTimeout(() => {
                if (modalRef.current) {
                    modalRef.current.classList.add('show');
                }
            }, 10); // Delay to allow DOM update before adding class

        } else if (isVisible) {
            // Trigger hide animation then unmount after
            if (modalRef.current) {
                modalRef.current.classList.remove('show');
            }
            setTimeout(() => {
                setIsVisible(false);
                document.body.style.overflowY = '';
            }, 300); // should match CSS animation
            window.removeEventListener('keydown', handleEscape);
        }

        return () => window.removeEventListener('keydown', handleEscape);
    }, [show]);

    useEffect(() => {
        return () => {
            document.body.style.overflowY = '';
        };
    }, []);

    const handleClose = () => {
        if (modalRef.current) {
            modalRef.current.classList.remove('show');
        }
        setTimeout(() => {
            setIsVisible(false);
            onClose();
            document.body.style.overflowY = '';
        }, 300); // Delay matches fade-out CSS
    };

    if (!isMounted || !isVisible || !product) return null;

    return createPortal(
        <>
            <div
                className="modal-backdrop fade show"
                onClick={handleClose}
                style={{ transition: 'opacity 0.3s ease' }}
            />
            <div
                className="modal basket-popup modal-bg fade"
                id="enter-now"
                tabIndex={-1}
                role="dialog"
                ref={modalRef}
                style={{
                   
                    display: 'block',
                }}
                aria-modal="true"
            >
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-close-button">
                            <button
                                type="button"
                                className="close"
                                onClick={handleClose}
                                aria-label="Close"
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    padding: 0,
                                    cursor: 'pointer',
                                }}
                            >
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                        <div className="modal-body quick-buy-popup">
                            <div className="modal-quick-buy-wrapper">
                                <div className="modal-quick-buy-title-new">
                                    <h2>{product?.title}</h2>
                                    <div className="modal-quick-buy-price">
                                        <h4>
                                            <span className="woocommerce-Price-amount amount">
                                                <bdi><span className="woocommerce-Price-currencySymbol">£</span>
                                                    {parseFloat(product.regular_price.replace(/[^0-9.-]+/g, '')).toFixed(2)}
                                                </bdi>
                                            </span>
                                            <span className="per-ticket"> per ticket</span>
                                        </h4>
                                    </div>
                                </div>

                                <div className="competition-timer-section shadow-img product-details-info">
                                    <div className="que-ans-block">
                                        <div className="item wow fadeIn">
                                            <TicketForm
                                                product={product}
                                            />

                                            <div className="product_meta">
                                                <span className="posted_in">
                                                    Categories:
                                                    <a href="https://staging.luckydaycompetitions.com/prizes/all-prizes/" rel="tag">
                                                        All Prizes
                                                    </a>
                                                    ,{' '}
                                                    <a href="https://staging.luckydaycompetitions.com/prizes/farming-machinery/" rel="tag">
                                                        Farm &amp; Plant
                                                    </a>
                                                    ,{' '}
                                                    <a href="https://staging.luckydaycompetitions.com/prizes/featured-prizes/" rel="tag">
                                                        Featured Prizes
                                                    </a>
                                                    ,{' '}
                                                    <a href="https://staging.luckydaycompetitions.com/prizes/instant-wins/" rel="tag">
                                                        Instant Wins
                                                    </a>
                                                </span>
                                            </div>

                                            <div className="sep-35"></div>

                                            <div className="free-postal-btn">
                                                <a
                                                    className="button alt"
                                                    href="javascript:;"
                                                    data-toggle="modal"
                                                    data-target="#postEntry"
                                                >
                                                    Free postal entries information <i className="fas fa-caret-right"></i>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>,
        document.body
    );
}

