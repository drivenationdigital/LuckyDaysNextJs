
import React from 'react';
// import Link from 'next/link';
import Link from 'next/link';

export interface ProductCardProps {
    href: string;
    imageUrl: string;
    categoryLabel: string;
    title: string;
    price: string;
    progressPercent: number;
    ticketsRemaining: string;
    endsText: string;
    productId: number;
    onQuickBuy: (productId: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
    href,
    imageUrl,
    categoryLabel,
    title,
    price,
    progressPercent,
    ticketsRemaining,
    endsText,
    productId,
    onQuickBuy,
}) => {
    function decodeHtml(str: string) {
        if (!str) return "";
        const txt = document.createElement("textarea");
        txt.innerHTML = str;
        return txt.value;
    }


    return (
        <li className="col-lg-4 col-sm-6 col-6">
            <div className="ending-item wow fadeIn sell-item">
                <div className="ending-item-s">
                    <Link href={href} className="product-image-link d-block">
                        <div
                            className="ending-img"
                            style={{ backgroundImage: `url(${imageUrl})` }}
                        />
                    <div className="product-category-text-img">{categoryLabel}</div>
                    </Link>
                </div>

                <div className="desc text-left">
                    <Link href={href} className="product-title-link">
                        <h4>{decodeHtml(title)}</h4>
                        <div className="price-row-div">
                            <p className="discount-price">
                                <span className="big">{price}</span>
                            </p>
                        </div>
                    </Link>
                    <div className="product-card-lower">
                        <Link href={href} className="ticket-block tickets-box-rs w-100">
                            <span className="tickets-remaining-label">Tickets remaining</span>
                            <div className="progress">
                                <div
                                    className="progress-bar wow fadeIn"
                                    style={{ width: `${progressPercent}%` }}
                                >
                                    <span>{Math.floor(progressPercent)}%</span>
                                </div>
                                <div className="valuesprogress">{ticketsRemaining}</div>
                            </div>
                        </Link>
                        <div className="product-category-btn-home">
                            {(ticketsRemaining && parseInt(ticketsRemaining) > 0) && (
                                <button className="quick-buy-btn" name="quick-buy" data-pid={productId}
                                    data-skip-link="true"
                                    onClick={(e) => {
                                        e.stopPropagation();       // Prevent event bubbling to the Link
                                        e.preventDefault();        // Prevent Link navigation
                                        onQuickBuy(productId);     // Your modal logic
                                    }}
                                >
                                    <i className="fas fa-bolt"></i>Quick Buy
                                </button>
                            )}
                            <Link href={href} className="enter-now-btn">
                                <i className="fas fa-ticket-alt"></i>Enter Now
                            </Link>

                        </div>
                    </div>
                </div>
                <div className="overlays-text-top-title">
                    <span>{endsText}</span>
                </div>
            </div>
        </li>
    );
};

export const ProductCardLoader: React.FC = () => {
    return (
        <li className="col-lg-4 col-sm-6 col-6">
            <div className="ending-item loader-item">
                <div className="ending-item-s">
                    <div className="ending-img placeholder-glow loader-img" />
                    <div className="placeholder-glow category-label-placeholder">
                        <span className="placeholder col-6" />
                    </div>
                </div>
                <div className="desc text-left">
                    <h4 className="placeholder-glow">
                        <span className="placeholder col-8" />
                    </h4>
                    <div className="price-row-div placeholder-glow">
                        <p className="discount-price">
                            <span className="placeholder col-4 big" />
                        </p>
                    </div>
                    <div className="product-card-lower">
                        <div className="ticket-block tickets-box-rs">
                            <span className="tickets-remaining-label">
                                <span className="placeholder col-4 big" />
                            </span>
                            <div className="progress">
                                <div className="progress-bar loader-progress-bar" style={{ width: `70%` }}>
                                    <span className="placeholder col-2" />
                                </div>
                            </div>
                        </div>
                        <div className="product-category-btn-home d-flex gap-2 mt-3">
                            <div className="placeholder-glow w-50">
                                <span className="placeholder btn-placeholder" />
                            </div>
                            <div className="placeholder-glow w-50">
                                <span className="placeholder btn-placeholder" />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </li>
    );
};

export default ProductCard;
