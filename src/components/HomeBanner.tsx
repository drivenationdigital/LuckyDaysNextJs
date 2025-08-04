'use client';

import React from 'react';
import Slider, { Settings } from 'react-slick';
import Image from 'next/image';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';

import { fetchHomepageBanners } from '@/api-functions/posts';

type Slide = {
    main_title: string;
    lower_title: string;
    image: string;
    mobile_image: string;
    link: {
        url: string;
        title: string;
    };
    product_end_date: string;
    show_days: boolean;
    show_seconds: boolean;
    video?: {
        url: string;
    } | null;
};

const calculateCountdown = (endsAt: string) => {
    const end = new Date(endsAt).getTime();
    const now = Date.now();
    const diff = end - now;

    if (diff <= 0) return { days: 0, hours: 0, minutes: 0 };

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);

    return { days, hours, minutes, seconds: Math.floor((diff / 1000) % 60) };
};

function BannerContentPlaceholder() {
    return (
        <section className="sliderhome-section banner placeholder-banner-wrapper">
            <div className="placeholder-slide">
                {/* Desktop Image Placeholder */}
                <div className="placeholder-image desktop" />

                {/* Mobile Image Placeholder */}
                <div className="placeholder-image mobile" />
            </div>
            <div className="overlay-bg-home" />
        </section>
    );
}

export default function BannerContent() {
    const {
        data,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['homepage-banners'],
        queryFn: fetchHomepageBanners,
        staleTime: 1000 * 60 * 5, // 5 minutes cache
    });

    if (isLoading) return <BannerContentPlaceholder />;

    if (isError || !data || data.length === 0) return <div>No banners available</div>;

    return <HomeSlider slides={data} />;
}

export const HomeSlider: React.FC<{
    slides: Slide[];
    className?: string;
}> = ({
    slides,
    className = ''
}) => {
    const settings: Settings = {
        dots: false,
        arrows: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
        autoplay: false,
        autoplaySpeed: 3000,

        infinite: true,
        swipeToSlide: true,   // Allows you to drag to any slide, not only step-by-step
    };


    return (
        <section className={`sliderhome-section banner ${className}`} id="sliderhome">
            <Slider {...settings} className="sliderhome">
                {slides.map((slide, idx) => {
                    const countdown = calculateCountdown(slide.product_end_date);
                    return (
                        <div key={idx} className="item">
                            <Link href={slide.link.url} className="slider-row">
                                {slide.video && slide.video.url ? (
                                    <video
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        className="video-banner">
                                        <source src={slide.video.url} type="video/mp4" />
                                    </video>
                                ) : <>
                                    <div className="d-none d-md-block">
                                        <Image src={slide.image} alt={slide.main_title} width={1920} height={800} />
                                    </div>
                                    <div className="d-block d-md-none">
                                        <Image src={slide.mobile_image} alt={slide.main_title} width={1080} height={1080} />
                                    </div>
                                </>}
                            </Link>

                            <div className="banner-item">
                                <div className="container">
                                    <div className="row no-gutters d-sm-block d-md-none">
                                        <div className="col-md-7 col-sm-12">
                                            <h3 className="wow fadeIn">{slide.main_title}</h3>
                                            <p className="wow fadeIn">{slide.lower_title}</p>
                                            <div className="banner-countdown" data-ends={slide.product_end_date}>
                                                <div className="banner-countdown-ends"><span>Ends In</span></div>
                                                {slide.show_days && (
                                                    <div className="banner-countdown-time banner-countdown-days">
                                                        <span>{countdown.days}</span><small>Days</small>
                                                    </div>
                                                )}
                                                <div className="banner-countdown-time banner-countdown-hours">
                                                    <span>{countdown.hours}</span><small>Hours</small>
                                                </div>
                                                <div className="banner-countdown-time banner-countdown-minutes">
                                                    <span>{countdown.minutes}</span><small>Minutes</small>
                                                </div>
                                                {slide.show_seconds && (
                                                    <div className="banner-countdown-time banner-countdown-seconds">
                                                        <span>{countdown.seconds}</span><small>Seconds</small>
                                                    </div>
                                                )}
                                            </div>
                                            <Link href={slide.link.url} className="theme-btn wow fadeIn">
                                                <span>{slide.link.title || 'ENTER NOW'}</span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </Slider>
            {/* <div className="overlay-bg-home absolute inset-0 z-0" /> */}
        </section>
    );
};
