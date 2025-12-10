'use client';
import React from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import Fancybox from "../../components/FancyBox";

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

    const settingsMain = {
        infinite: true,
        speed: 200,
        slidesToShow: 1,
        slidesToScroll: 1,

    };

    const settingsThumbs = {
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
        dots: false,
        infinite:false,
        speed: 200,
        slidesToShow: 5,
        slidesToScroll: 1,
    };

    return (
        <div className="col-lg-6 engine-detail-left-content">

            {/* large image swiper */}
            <div className="prize-main-slider"  style={{color:"red"}}>               
                <Slider {...settingsMain} className="main-slider">
                    {images.map((img, idx) => (
                        <Fancybox key={idx} >
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
                    ))}
                </Slider>
            </div>

            <div className="image-thumbs">

                {/* no swiper, grid desktop version */}
                <div className="thumbs-desktop">
                    {images.map((img, idx) => (
                        <Fancybox key={idx} >
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
                    <Slider {...settingsThumbs} className="mobile-thumbs-slider">
                        {images.map((img, idx) => (  
                            <Fancybox key={idx}>                             
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
                        ))}
                    </Slider>
               </div>

            </div>
        </div>
    );
};

export default SlickGalleryWithThumbs;
