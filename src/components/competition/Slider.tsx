'use client';
import React from 'react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import Fancybox from "../../components/FancyBox";

import 'swiper/css';
import 'swiper/css/navigation';

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

    return (
        <div className="col-lg-6 engine-detail-left-content">

            {/* large image swiper */}
            
            <div className="prize-main-slider">               
                <Swiper slidesPerView={1} modules={[Navigation]} navigation className="main-slider">
                    {images.map((img, idx) => (                 
                        <SwiperSlide key={idx}>
                            <Fancybox>            
                                <Image
                                    src={img?.url}
                                    alt={`Image ${idx + 1}`}
                                    width={745}
                                    height={497}
                                    unoptimized
                                    className='img-blur' 
                                />
                            
                                <a href={img?.url} data-fancybox="gallery-main">
                                    <Image
                                        src={img?.url}
                                        alt={`Image ${idx + 1}`}
                                        width={745}
                                        height={497}
                                        unoptimized
                                    />
                                </a>
                            </Fancybox>     
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <div className="image-thumbs">

                {/* no swiper, grid desktop version */}
                <div className="thumbs-desktop">
                    {images.map((img, idx) => (
                        <Fancybox key={idx}>       
                            <a href={img?.url} data-fancybox="gallery-desktop">
                                <Image
                                    src={img?.url}
                                    alt={`Image ${idx + 1}`}
                                    width={745}
                                    height={497}
                                    unoptimized
                                />
                            </a>
                        </Fancybox>  
                    ))}
                </div>

               {/* swiper, mobile version */}
               <div className="thumbs-mobile">
                    <Swiper
                        slidesPerView={5} 
                        spaceBetween={10}
                        modules={[Navigation]} 
                        navigation={{prevEl: ".swiper-button-prev-outer", nextEl: ".swiper-button-next-outer"}} 
                        className="mobile-thumbs-slider"
                        onInit={(swiper) => {
                                // swiper.params.navigation.prevEl = ".swiper-button-prev-outer";
                                // swiper.params.navigation.nextEl = ".swiper-button-next-outer";
                                swiper.navigation.init();
                                swiper.navigation.update();
                            }}
                        >
                        {images.map((img, idx) => (                 
                            <SwiperSlide key={idx}>
                                <Fancybox>                                      
                                    <a href={img?.url} data-fancybox="gallery-mobile">
                                        <Image
                                            src={img?.url}
                                            alt={`Image ${idx + 1}`}
                                            width={745}
                                            height={497}
                                            unoptimized
                                        />
                                    </a>
                                </Fancybox>     
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div className="swiper-button-prev swiper-button-prev-outer"></div>
                    <div className="swiper-button-next swiper-button-next-outer"></div>
               </div>

            </div>
        </div>
    );
};

export default SlickGalleryWithThumbs;
