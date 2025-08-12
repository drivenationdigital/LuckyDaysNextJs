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
                                    <Image src="/images/award.png" alt="Prizes" width={70} height={70} />
                                </div>
                                <div className="award-desc wow fadeIn">
                                    <h1>Over £75M</h1>
                                    <h5>Won in prizes</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-4 col-md-5">
                            <div className="award-item d-flex align-items-center">
                                <div className="award-img wow fadeIn">
                                    <Image src="/images/smile.png" alt="Winners" width={70} height={70} />
                                </div>
                                <div className="award-desc wow fadeIn">
                                    <h1>Over 30,000+</h1>
                                    <h5>Lucky winners</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-4 col-md-3 text-right">
                            <div className="tp-banner text-right">
                                <a href="https://uk.trustpilot.com/review/luckydaycompetitions.com" target="_blank">
                                    <Image src="/images/trustpilot.png" alt="Trustpilot" width={100} height={100} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="clearfix"></div>
            </section>
        );
}