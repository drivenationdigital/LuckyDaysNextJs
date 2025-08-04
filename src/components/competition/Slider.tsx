'use client';
import React from 'react';
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
    const images = [mainImage, ...galleryImages];


    // if there are no images, return null
    if (!images || images.length === 0 || !mainImage?.url) {
        return <div className="col-lg-6 engine-detail-left-content">No images available</div>;
    }

    // if there is only one image, duplicate it to show in the slider
    if (images.length === 1) {
        images.push(images[0]);
    }

    const settings = {
        customPaging: function (i: number) {
            return (
                <a>
                    <Image
                        src={images[i]?.thumbnail || images[i]?.url}
                        alt={`Thumbnail ${i + 1}`}
                        width={100}
                        height={100}
                        unoptimized
                    />
                </a>
            );
        },
        dots: true,
        dotsClass: "slick-dots slick-thumb",
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
    };

    return (
        <div className="col-lg-6 engine-detail-left-content">
            <div className="prize-main-slider mb-5">
                <Slider {...settings} className="main-slider">
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
            </div>
        </div>
    );
};

export default SlickGalleryWithThumbs;
