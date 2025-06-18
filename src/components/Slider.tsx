/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useRef } from 'react';
import Slider from 'react-slick';
import Image from 'next/image';

interface GalleryImage {
    url: string;
    thumbnail?: string;
}

interface Props {
    mainImage: GalleryImage;
    galleryImages: GalleryImage[];
}

const SlickGalleryWithThumbs: React.FC<Props> = ({ mainImage, galleryImages }) => {
    const mainSlider = useRef<Slider | null>(null);
    const thumbSlider = useRef<Slider | null>(null);

    const images = [mainImage, ...galleryImages];

    const mainSettings = {
        asNavFor: thumbSlider.current as any,
        ref: (slider: any) => (mainSlider.current = slider),
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        fade: true
    };

    const thumbSettings = {
        asNavFor: mainSlider.current as any,
        ref: (slider: any) => (thumbSlider.current = slider),
        slidesToShow: Math.min(images.length, 4),
        swipeToSlide: true,
        focusOnSelect: true,
        arrows: false
    };

    // if there are no images, return null
    if (!images || images.length === 0 || !mainImage?.url) {
        return <div className="col-lg-6 engine-detail-left-content">No images available</div>;
    }

    return (
        <div className="col-lg-6 engine-detail-left-content">
            <div className="prize-main-slider">
                <Slider {...mainSettings} className="main-slider">
                    {images.map((img, idx) => (
                        <div key={idx}>
                            <a href={img?.url} data-fancybox="gallery">
                                <Image
                                    src={img?.url}
                                    alt={`Image ${idx + 1}`}
                                    width={745}
                                    height={497}
                                    unoptimized
                                />
                            </a>
                        </div>
                    ))}
                </Slider>

                <Slider {...thumbSettings} className="thumb-slider">
                    {images.map((img, idx) => (
                        <div key={`thumb-${idx}`} className="thumb-item">
                            <Image
                                className='object-fit-cover'
                                loading="lazy"
                                src={img?.thumbnail || img?.url}
                                alt={`Thumbnail ${idx + 1}`}
                                width={150}
                                height={150}
                                unoptimized
                            />
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default SlickGalleryWithThumbs;
// 