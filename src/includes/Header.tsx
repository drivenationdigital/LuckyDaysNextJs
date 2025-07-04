'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useCart } from '@/app/context/cart-context';

const Header = ({ currency = 'GBP' }) => {
    const [showOverlay, setShowOverlay] = useState(false);
    const [showMoreDropdown, setShowMoreDropdown] = useState(false);

    const {cart} = useCart();

    const toggleOverlay = () => setShowOverlay(!showOverlay);

    return (
        <header className="top-header">
            <div className="d-header">
                <div className="d-header-logo">
                    <Link href="/">
                        <Image src="/images/logo.png?v=1.02" alt="logo" width={150} height={50} />
                    </Link>
                </div>

                <div className="d-header-nav">
                    <ul className="d-flex">
                        <li><Link href="/all-competitions">All Competitions</Link></li>
                        <li><Link href="/past-winners">Winners</Link></li>
                        <li><Link href="/draw-results">Results</Link></li>
                        <li><Link href="/live-draws">Live Draws</Link></li>
                        <li
                            className="dropdown"
                            onMouseEnter={() => setShowMoreDropdown(true)}
                            onMouseLeave={() => setShowMoreDropdown(false)}
                        >
                            <a href="#" onClick={(e) => e.preventDefault()} className="dropdown-toggle">More</a>
                                <div className={`dropdown-menu ${showMoreDropdown ? 'show' : ''}`}>
                                    <Link className="dropdown-item" href="/my-account">My Account</Link>
                                    <Link className="dropdown-item" href="/faqs">Facts & FAQs</Link>
                                    <a className="dropdown-item" href="https://www.luckydaymerch.com/product/lucky-day-competitions-gift-voucher/" target="_blank" rel="noopener noreferrer">Gift Vouchers</a>
                                    <a className="dropdown-item" href="https://www.luckydaymerch.com/" target="_blank" rel="noopener noreferrer">Lucky Day Merch</a>
                                </div>
                        </li>
                        <li className="currency-nav" style={{ display: 'none' }}>
                            <a href="#" onClick={(e) => e.preventDefault()} className="dropdown-toggle">{currency === 'GBP' ? 'GBP (£)' : 'EUR (€)'}</a>
                            <div className="dropdown-menu wcml-horizontal-list product wcml_currency_switcher">
                                <a className="dropdown-item" rel="GBP">GBP (£)</a>
                                <a className="dropdown-item" rel="EUR">EUR (€)</a>
                            </div>
                        </li>
                    </ul>
                </div>

                <div className="d-header-icons">
                    <Link className="d-header-basket" href="/basket">
                        <Image src="/images/basket-icon.png" alt="Basket" width={24} height={24} />
                        <span className="d-header-basket-count">{cart?.items.length || 0}</span>
                    </Link>
                    <Link className="d-header-account" href="/my-account">
                        <Image src="/images/account-icon.png" alt="Account" width={24} height={24} />
                    </Link>
                </div>
            </div>

            {/* Mobile Header */}
            <div className="m-header">
                <nav className="navbar navbar-expand-md">
                    <div className="container">
                        <div className="col-md-3 menu-col">
                            <div className="desktop-menu-header">
                                <div className="wrapper-menu" onClick={toggleOverlay}>
                                    <div className="container">
                                        <div className="section"></div>
                                        <div className="section"></div>
                                        <ul className="toggle open-menu">
                                            <li></li><li></li><li></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 logo-col">
                            <div className="desktop-logo-header">
                                <Link href="/">
                                    <Image src="/images/logo.png?v=1.02" alt="logo" width={150} height={50} />
                                </Link>
                            </div>
                        </div>
                        <div className="col-md-3 cart-col">
                            <div className="desktop-cart-header">
                                <div className="my-accountdesktop"><Link href="/my-account">My Account</Link></div>
                                <span className="cart-h"><Link href="/basket"><Image src="/images/cart.png" alt="Cart" width={24} height={24} /></Link></span>
                            </div>
                            <div className="mobile-cart-header">
                                <ul>
                                    <li><Link href="/basket"><Image src="/images/basket-icon.png" alt="Cart" width={24} height={24} /></Link></li>
                                    <li><Link href="/my-account"><Image src="/images/account-icon.png" alt="Account" width={24} height={24} /></Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Overlay Mobile Menu */}
                {showOverlay && (
                    <div className="overlay-menu">
                        <a href="#" className="overlay-close" onClick={toggleOverlay}><i className="fa fa-times"></i></a>
                        <ul className="mobile-menu">
                            <li className="logo-list">
                                <Link href="/"><Image src="/images/logo.png?v=1.02" alt="logo" width={120} height={40} /></Link>
                            </li>
                            <li><Link href="/">Home</Link></li>
                            <li><Link href="/all-competitions">Competitions</Link></li>
                            <li><Link href="/live-draws">Live Draws</Link></li>
                            <li><Link href="/draw-results">Draw Results</Link></li>
                            <li><Link href="/past-winners">Our winners</Link></li>
                            <li><a href="https://www.luckydaymerch.com/product/lucky-day-competitions-gift-voucher/" target="_blank" rel="noopener noreferrer">Gift Vouchers</a></li>
                            <li><Link href="/faqs">Facts & FAQs</Link></li>
                            <li><a href="https://www.luckydaymerch.com/" target="_blank" rel="noopener noreferrer">Lucky Day Merch</a></li>
                            <li><Link href="/my-account">My Account</Link></li>
                        </ul>

                        <div className="mobile-currency-nav wcml_currency_switcher">
                            <a className={currency === 'GBP' ? 'currency-active' : ''} rel="GBP">
                                <Image src="/images/flag-uk.jpg" alt="UK Flag" width={24} height={16} /> GBP (£)
                            </a>
                            <a className={currency === 'EUR' ? 'currency-active' : ''} rel="EUR">
                                <Image src="/images/flag-euro.jpg" alt="EU Flag" width={24} height={16} /> EUR (€)
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
