'use client';

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
                className="modal fade"
                ref={modalRef}
                role="dialog"
                tabIndex={-1}
                style={{ padding: '15px', display: 'block' }}
                aria-modal="true"
            >
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h5 className="modal-title">All Winners for {prize} ({productId})</h5>
                            <button type="button" className="btn-close" onClick={handleClose} />
                        </div>

                        <div className="modal-body" style={{ minHeight: '120px' }}>
                            {/* Blank loader */}
                            <div className="iw-loader">Loading...</div>
                        </div>

                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={handleClose}
                            >
                                Close
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </>,
        document.body
    );
}

export default WinnersModal;
