/* eslint-disable @typescript-eslint/no-explicit-any */
export const runtime = 'edge';

import Link from 'next/link';
import type { Metadata, ResolvingMetadata } from 'next'
import { fetchProductById, fetchProductMetaData } from '@/api-functions/posts';
import Countdown from '@/components/competition/CountDownTimer';
import SlickGalleryWithThumbs from '@/components/competition/Slider';
import InstantWinsSection from '@/components/competition/InstantWinsSection';
import TicketForm from '@/components/competition/ProductActions';
import PostalEntryModal from '@/components/competition/PostalEntryModal';

type Props = {
    params: Promise<{ id: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    // read route params
    const { id } = await params

    const response = await fetchProductMetaData(id);

    if (!response || !response.success) {
        return {
            title: 'Product not found - Lucky Day Competitions',
            description: 'The product you are looking for does not exist.',
            openGraph: {
                title: 'Product not found - Lucky Day Competitions',
                description: 'The product you are looking for does not exist.',
                images: ['/images/favicon.png'],
            },
            icons: {
                icon: '/images/favicon.png',
            },
        };
    }

    // optionally access and extend (rather than replace) parent metadata
    const previousImages = (await parent).openGraph?.images || []

    return {
        title: `${response.data.title} - Lucky Day Competitions`,
        description: response.data.description,
        keywords: response.data.keywords,
        openGraph: {
            images: [response.data.image, ...previousImages],
        },
        icons: {
            icon: '/images/favicon.png',
        },
    }
}

export default async function Page({
    params,
}: {
    params: Promise<{ id: number }>
}) {
    const { id } = await params

    const response = await fetchProductById(id.toString());

    if (!response || !response?.success === true) {
        return (
            <div className="container">
                <h1>Product not found</h1>
                <p>The product you are looking for does not exist.</p>
                <Link href="/">Go back to homepage</Link>
            </div>
        );
    }

    const product = response.data;

    if (!product) {
        return (
            <div className="container">
                <h1>Product not found</h1>
                <p>The product you are looking for does not exist.</p>
                <Link href="/">Go back to homepage</Link>
            </div>
        );
    }

    const mainImage = product.images?.find((img: any) => img.type === 'main');
    const galleryImages = product.images?.filter((img: any) => img.type === 'gallery') || [];

    return (
        <div id="primary" className="content-area woocommerce woocommerce-page woocommerce-js customize-support">
            <div className="product type-product product-type-drive_digital_instant_wins">
                <main id="main">
                    {/* Main section */}
                    <section className="main-product">
                        <div className="container">
                            <section className="product">
                                <div className="row">
                                    <SlickGalleryWithThumbs
                                        mainImage={mainImage}
                                        galleryImages={galleryImages}
                                    />

                                    {/* Right Column - Details */}
                                    <div className="col-lg-6">
                                        <div className="product-details-title-new">
                                            <h2>{product.name || 'Competition'}</h2>

                                            {/* Countdown Placeholder */}
                                            <div className="continue-row-in">
                                                <div className="tickets-box-rs">
                                                    <div className="continue-row-info product-time">
                                                        <Countdown endTime={new Date(product.competition_dates.end_date).toISOString()} />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Tickets Remaining */}
                                            <div className="continue-row-in">
                                                <h3>Tickets remaining: {product.tickets.left}</h3>
                                                <div className="tickets-box-rs">
                                                    <div className="ticket-block">
                                                        <div className="progress">
                                                            <div className="progress-bar" style={{ width: `${product.tickets.percentage_left}%` }}>
                                                                <span>{Math.floor(product.tickets.percentage_left)}%</span>
                                                            </div>
                                                            <div className="valuesprogress">{product.tickets.left}/{product.tickets.max}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="clearfix"></div>
                                        {/* Purchase Block */}
                                        <div className="competition-timer-section shadow-img">
                                            <div className="que-ans-block">
                                                <div className="item wow fadeIn">
                                                    <h4>
                                                        {product.regular_price}{' '}
                                                        <span>per ticket</span>
                                                    </h4>

                                                    {product.tickets.stock_count > 0 && !product.ticket_sales_disabled ? (
                                                        <TicketForm product={product} />
                                                    ) : (
                                                        <div className="no-ticket-message">
                                                            {product.ticket_sales_disabled ? product.disabled_message
                                                                : product.tickets.left <= 0
                                                                    ? 'No tickets available'
                                                                    : Date.now() > product.competition_dates.end * 1000
                                                                        ? 'Competition has ended'
                                                                        : null}
                                                        </div>
                                                    )}

                                                    <PostalEntryModal />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </section>

                    {product.is_instant_win && (
                        <InstantWinsSection product_id={id} />
                    )}

                    {/* Product Content Section */}
                    <section className="product-content">
                        {/* Main description row */}
                        <div className="product-content-row product-description-row grey-bg">
                            <div className="container">
                                <div className="row align-items-center">
                                    {product.product_content?.main_description?.has_right_content ? (
                                        <>
                                            <div className="col-md-6 left-content" dangerouslySetInnerHTML={{ __html: product.product_content.main_description.left_content }} />
                                            <div className="col-md-6 right-content" dangerouslySetInnerHTML={{ __html: product.product_content.main_description.right_content }} />
                                        </>
                                    ) : (
                                        <div className="col-md-10 offset-md-1 text-center" dangerouslySetInnerHTML={{ __html: product.product_content.main_description.left_content }} />
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Additional content rows */}
                        {product.product_content?.content_rows?.map((row: any, idx: number) => (
                            <div key={idx} className={`product-content-row ${row.row_class} ${row.background_colour}`}>
                                <div className="container">
                                    <div className="row align-items-center">
                                        <div className="col-md-6 left-content" dangerouslySetInnerHTML={{ __html: row.left_content }} />
                                        <div className="col-md-6 right-content" dangerouslySetInnerHTML={{ __html: row.right_content }} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </section>

                    <section className="pro-info-tab">
                        <div className="container">
                            <h3 className="text-center">More Information</h3>
                            <div id="product-accordion">
                                <div className="accordion" id="faq">
                                    {product.dropdown_items?.map((item: any, index: number) => (
                                        <div className="card" key={index}>
                                            <div className="card-header">
                                                <a href="#"
                                                    className="btn btn-header-link collapsed"
                                                    data-bs-toggle="collapse"
                                                    data-bs-target={`#dropdown-${index}`}
                                                    aria-expanded="false">
                                                    {item.title}
                                                </a>
                                            </div>

                                            <div id={`dropdown-${index}`} className="collapse" aria-labelledby="faqhead2"
                                                data-parent="#faq">
                                                <div className="card-body" dangerouslySetInnerHTML={{ __html: item.content }} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                </main>
            </div>
        </div>
    );
}