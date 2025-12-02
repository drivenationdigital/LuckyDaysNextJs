'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

type AddToCartModalProps = {
    productName?: string;
    show: boolean;
    onClose: () => void;
    showExtraContent?: boolean;
    extraContent?: {
        title: string;
        description: string;
        imageUrl: string;
        link: string;
    };
};

export default function AddToCartModal({
    show,
    onClose,
    productName,
    showExtraContent,
    extraContent,
}: AddToCartModalProps) {
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

    if (!isMounted || !isVisible) return null;

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
                    // transition: 'opacity 0.3s ease', 
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
                        <div className="modal-body">
                            <div className="basket-popup-wrapper">
                                <div className="basket-popup-title">
                                    <h3>
                                        <i className="fas fa-check"></i>Added to basket
                                    </h3>
                                    <p>{productName}</p>
                                </div>
                                <div className="basket-popup-btn-row">
                                    <div className="basket-popup-btn">
                                        <a className="keep-shopping-btn" href="#" onClick={handleClose}>
                                            Keep Shopping
                                        </a>
                                    </div>
                                    <div className="basket-popup-btn">
                                        <Link className="basket-view-btn" href="/basket/">
                                            <i className="fas fa-shopping-basket"></i>View basket
                                        </Link>
                                    </div>
                                </div>

                                {showExtraContent && extraContent && (
                                    <div className="product-card-wrapper">
                                        <div className="product-card-wrapper-row">
                                            <div className="product-card-img-left">
                                                <Link
                                                    href={extraContent.link}
                                                    className="product-card-img-link"
                                                >
                                                    <div
                                                        className="product-card-img"
                                                        style={{
                                                            backgroundImage: `url(${extraContent.imageUrl})`,
                                                        }}
                                                    />
                                                </Link>
                                            </div>
                                            <div className="product-card-info">
                                                <span>Don&apos;t miss this one!</span>
                                                <div className="product-card-title">
                                                    <h4>{extraContent.title}</h4>
                                                    <div className="price-t">
                                                        <span>{extraContent.description}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="product-card-btn">
                                            <Link href={extraContent.link} className="enter-now-btn">
                                                Enter Here
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>,
        document.body
    );
}

