'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

type AddToCartModalProps = {
    show: boolean;
    onClose: () => void;
};

function PostalEntryModal({
    show,
    onClose,
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
                className="modal fade"
                id="postEntry"
                tabIndex={-1}
                role="dialog"
                ref={modalRef}
                style={{
                    padding: '15px',
                    display: 'block',
                }}
                aria-modal="true"
            >
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="postEntryLabel">Postal Entry</h5>
                        </div>
                        <div className="modal-body">
                            <p>This competition is guaranteed to go ahead when the timer is complete or all tickets are sold. Whichever occurs first.</p>
                            <p>By entering this competition, you have confirmed that you have read and agree to our&nbsp;
                                <Link href="/terms-and-conditions/" target="_blank" rel="noopener">terms and conditions.</Link></p>
                            <p>For the free entry method see our&nbsp;<Link href="/terms-and-conditions/" target="_blank" rel="noopener">terms and conditions 3.10</Link>.</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal"
                                onClick={handleClose}
                            >Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>,
        document.body
    );
}

export default function PostalEntry() {
    const [show, setShow] = useState(false);

    return (
        <>
            <a className="postal-entry-link" href="#" data-bs-toggle="modal" data-bs-target="#postEntry" onClick={() => setShow(true)}>
                Free postal entry information <i className="fa fa-angle-right"></i>
            </a>

            <PostalEntryModal show={show} onClose={() => setShow(false)} />
        </>
    );
}

