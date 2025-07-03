// components/Footer.js
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
    return (
        <footer>
            <div className="footer-inner">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-7">
                            <div className="footer-blk about-blk">
                                <h4>About Lucky Day Competitions</h4>
                                <p>
                                    Ace Competitions Ltd, Trading as Lucky Day Competitions. Incorporated in the United Kingdom, company registration number: NI659574. Trading Address: 72 Tievcrom Road, Forkhill, Newry, BT35 9RX
                                </p>
                                <a href="https://uk.trustpilot.com/review/luckydaycompetitions.com" target="_blank" rel="noopener noreferrer">
                                    <Image src="/images/trustpilot.png" alt="trustpilot" width={180} height={80} />
                                </a>
                            </div>
                        </div>

                        <div className="col-lg-8">
                            <div className="row h-100">
                                <div className="col-md-6">
                                    <div className="footer-blk choose-blk d-none d-md-block">
                                        <h4>Information</h4>
                                        <nav className="d-flex justify-content-between">
                                            <ul className="footer-nav">
                                                <li><Link href="/faqs/">FAQs</Link></li>
                                                <li><Link href="/terms-and-conditions/">Terms &amp; Conditions</Link></li>
                                                <li><Link href="/terms-of-use/">Website Terms of Use</Link></li>
                                                <li><Link href="/privacy-policy/">Privacy Policy</Link></li>
                                                <li><Link href="/acceptable-use-policy/">Acceptable Use Policy</Link></li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="footer-blk get-in-blk">
                                        <h4>Get in Touch</h4>
                                        <ul className="contact-nav">
                                            <li className="d-md-flex">
                                                <i className="fas fa-envelope"></i>
                                                <div className="info">
                                                    <p>Email</p>
                                                    <a href="mailto:info@luckydaycompetitions.com">info@luckydaycompetitions.com</a>
                                                </div>
                                            </li>
                                        </ul>

                                        <ul className="social-nav d-flex">
                                            <li><a href="https://www.facebook.com/LuckyDayCompetitions/" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a></li>
                                            <li><a href="https://www.instagram.com/luckydaycompetitions/" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a></li>
                                            <li><a href="https://www.tiktok.com/@sammyluckydaycomps" target="_blank" rel="noopener noreferrer"><i className="fab fa-tiktok"></i></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="site-info text-center">
                <div className="container">
                    <p className="mb-0">
                        &copy; Copyright {new Date().getFullYear()} Lucky Day Competitions. All Rights Reserved. Built by <a href="https://www.drive-digital.co.uk/" target="_blank" rel="noopener noreferrer"><strong>Drive Digital</strong></a>.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
