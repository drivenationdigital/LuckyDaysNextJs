'use client'

import Slider from 'react-slick'
import { useQuery } from '@tanstack/react-query';
import { fetchTestimonials } from '@/api-functions/home';
import Image from 'next/image';


type ITestimonial = {
    title: string
    location: string
    content: string
    image_url: string
    video_url?: string
    is_video: boolean
}

const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
}

const Testimonials = ({ showTitle = true }) => {
    const {
        data,
    } = useQuery({
        queryKey: ['testimonials'],
        queryFn: fetchTestimonials,
        staleTime: 1000 * 60 * 5, // 5 minutes cache
    });


    if (!data || data.length === 0) {
        return <div>No testimonials available</div>;
    }

    return (
        <section className="winner-section">
            <div className="container">
                {showTitle && (
                    <div className="text-center winner-title-content">
                        <div className="sub-titless">Our Winning</div>
                        <h2 className="white-color">Testimonials</h2>
                    </div>
                )}

                <div className="testimonials-container slick-initialized slick-slider">
                    <Slider {...settings}>
                        {data.map((testimonial: ITestimonial, index: number) => (
                            <div key={index} className="testimonial-item">
                                <div className="row align-items-center">
                                    <div className="col-12 col-sm-5">
                                        <a className="testimonial-media" tabIndex={-1} {...testimonial.is_video ? { href: testimonial.video_url, 'data-fancybox': '' } : {}}>
                                            <div className="img-blk"
                                                style={{
                                                    backgroundImage: `url(${testimonial.image_url})`,
                                                    backgroundColor: testimonial.video_url ? '' : '#666666'
                                                }}>
                                                {testimonial.is_video && (
                                                    <Image
                                                        src="/images/play-icon.png"
                                                        alt='Play Video'
                                                        width={50}
                                                        height={50}
                                                    />
                                                )}
                                            </div>
                                            <div className="clearfix"></div>
                                        </a>
                                    </div>

                                    <div className="col-12 col-sm-7">
                                        <div className="testimonial-content">
                                            <h5>{testimonial.title}</h5>
                                            <p className="testimonial-location">{testimonial.location}</p>
                                            <p dangerouslySetInnerHTML={{ __html: testimonial.content }} />
                                        </div>
                                    </div>
                                </div>
                                <div className="clearfix"></div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </section>
    )
}

export default Testimonials
