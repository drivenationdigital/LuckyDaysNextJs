import Image from 'next/image';
import React from 'react'

export const AwardsSection: React.FC= () => {
        return (
            <section className="award-section d-md-block">
                <div className="container">
                    <div className="row justify-content-between">
                        <div className="col-4 col-md-4">
                            <div className="award-item d-flex  align-items-center">
                                <div className="award-img wow fadeIn">
                                    <Image src="/images/award.png" alt="Prizes" width={49} height={49} />
                                </div>
                                <div className="award-desc wow fadeIn">
                                    <h1>Over £85M</h1>
                                    <h5>Won in prizes</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-4 col-md-5">
                            <div className="award-item d-flex align-items-center">
                                <div className="award-img wow fadeIn">
                                    <Image src="/images/smile.png" alt="Winners" width={50} height={50} />
                                </div>
                                <div className="award-desc wow fadeIn">
                                    <h1>Over 40,000+</h1>
                                    <h5>Lucky winners</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-4 col-md-3 text-end">
                            <div className="tp-banner text-end">
                                <a href="https://uk.trustpilot.com/review/luckydaycompetitions.com" target="_blank">
                                    <Image src="/images/trustpilot.png" alt="Trustpilot" width={130} height={160} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="clearfix"></div>
            </section>
        );
}