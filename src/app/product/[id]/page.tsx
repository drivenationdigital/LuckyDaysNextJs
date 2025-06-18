/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata, ResolvingMetadata } from 'next'
import { fetchProductById, fetchProductMetaData } from '@/api-functions/posts';
import Countdown from '@/components/CountDownTimer';
import SlickGalleryWithThumbs from '@/components/Slider';

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

    const product = await fetchProductMetaData(id);

    // optionally access and extend (rather than replace) parent metadata
    const previousImages = (await parent).openGraph?.images || []

    return {
        title: `${product.title} - Lucky Day Competitions`,
        description: product.description,
        keywords: product.keywords,
        openGraph: {
            images: [product.image, ...previousImages],
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

    const product = await fetchProductById(id.toString());

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
            <div className="product">
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

                                        {/* Purchase Block */}
                                        <div className="competition-timer-section shadow-img">
                                            <div className="que-ans-block">
                                                <div className="item">
                                                    <h4>
                                                        {product.regular_price}{' '}
                                                        <span>per ticket</span>
                                                    </h4>

                                                    {product.tickets.stock_count > 0 && !product.ticket_sales_disabled ? (
                                                        <form className="cart" method="post" encType="multipart/form-data">
                                                            <div className="answers">
                                                                <div className="answers-label">Multi-Buy Discount</div>
                                                                <ul className="answers-list">
                                                                    {[
                                                                        { qty: 3, discount: 0.05 },
                                                                        { qty: 5, discount: 0.10 },
                                                                        { qty: 10, discount: 0.20 },
                                                                    ].map(({ qty, discount }) => {
                                                                        const ticketPrice = parseFloat(product.price_float);

                                                                        const savings = (ticketPrice * qty * discount).toFixed(2);
                                                                        const percent = discount * 100;

                                                                        return (
                                                                            <li data-value={qty} key={qty}>
                                                                                <input className="ticket-form-input" type="radio" />
                                                                                <strong>{qty}</strong> Tickets<br />
                                                                                <span className="answer-saving">
                                                                                    <strong>Save {percent}%</strong>
                                                                                    {` `}
                                                                                    (
                                                                                    <span className="woocommerce-Price-amount amount">
                                                                                        <bdi>
                                                                                            <span className="woocommerce-Price-currencySymbol">£</span>{savings}
                                                                                        </bdi>
                                                                                    </span>
                                                                                    )
                                                                                </span>
                                                                            </li>
                                                                        )
                                                                    })}
                                                                </ul>
                                                            </div>

                                                            <div className="quantity">
                                                                <label className="screen-reader-text">Quantity</label>
                                                                <input
                                                                    type="number"
                                                                    name="quantity"
                                                                    min="1"
                                                                    max={product.tickets_left}
                                                                    defaultValue="1"
                                                                />
                                                            </div>

                                                            <button type="submit" className="single_add_to_cart_button button alt">
                                                                Enter Now
                                                            </button>
                                                        </form>
                                                    ) : (
                                                        <div className="no-ticket-message">
                                                            {product.ticket_sales_disabled
                                                                ? product.disabled_message
                                                                : product.tickets.left <= 0
                                                                    ? 'No tickets available'
                                                                    : Date.now() > product.competition_dates.end * 1000
                                                                        ? 'Competition has ended'
                                                                        : null}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </section>

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
                </main>
            </div>
        </div>
    );

    return (
        <div id="primary" className='content-area woocommerce woocommerce-page woocommerce-js customize-support'>
            <div className='product'>
                <main id="main">
                    {/* Main section */}
                    <section className="main-product">
                        <div className="container">
                            <section className="product">
                                <div className="row">
                                    {/* Left Column - Image Gallery */}
                                    <div className="col-lg-6 engine-detail-left-content">
                                        <div className="prize-main-slider">
                                            <a
                                                href="https://cdn.staging.luckydaycompetitions.com/wp-content/uploads/2025/02/18151929/pexels-conojeghuo-175695-scaled.jpg"
                                                data-fancybox="gallery"
                                                className="prize-inner-slides"
                                            >
                                                <Image
                                                    src="https://cdn.staging.luckydaycompetitions.com/wp-content/uploads/2025/02/18151929/pexels-conojeghuo-175695-scaled.jpg"
                                                    alt="Prize"
                                                    width={745}
                                                    height={497}
                                                    unoptimized
                                                />
                                            </a>
                                        </div>

                                        <div className="product-details-title-new-btn">
                                            <div className="product-details-btn-n1">Ends Fri 27th Jun</div>
                                        </div>
                                    </div>

                                    {/* Right Column - Details */}
                                    <div className="col-lg-6">
                                        <div className="product-details-title-new">
                                            <h2>Instant Win April 2025</h2>

                                            <div className="continue-row-in">
                                                <div className="tickets-box-rs">
                                                    <div className="continue-row-info product-time">
                                                        <div className="grid-countdown" data-time="2025/06/27 12:00:00">
                                                            <div>21<span>days</span></div>
                                                            <div>20<span>hr</span></div>
                                                            <div>58<span>min</span></div>
                                                            <div>48<span>sec</span></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="continue-row-in">
                                                <h3>Tickets remaining: 947</h3>
                                                <div className="tickets-box-rs">
                                                    <div className="ticket-block">
                                                        <div className="progress">
                                                            <div className="progress-bar" style={{ width: '94.7%' }}>
                                                                <span>94%</span>
                                                            </div>
                                                            <div className="valuesprogress">947/1000</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="competition-timer-section shadow-img">
                                            <div className="que-ans-block">
                                                <div className="item">
                                                    <h4>£0.00 <span>per ticket</span></h4>

                                                    <form
                                                        className="cart"
                                                        action="https://staging.luckydaycompetitions.com/product/instant-win-april-2025/"
                                                        method="post"
                                                        encType="multipart/form-data"
                                                    >
                                                        <div className="answers">
                                                            <div className="answers-label">Multi-Buy Discount</div>
                                                            <ul className="answers-list">
                                                                {[3, 5, 10].map((val) => (
                                                                    <li key={val} data-value={val}>
                                                                        <input type="radio" className="ticket-form-input" name="multibuy" value={val} />
                                                                        <strong>{val}</strong> Tickets
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>

                                                        <div className="quantity">
                                                            <label htmlFor="quantity_6841a2bf9d794" className="screen-reader-text">
                                                                Instant Win April 2025 quantity
                                                            </label>
                                                            <input
                                                                type="number"
                                                                id="quantity_6841a2bf9d794"
                                                                name="quantity"
                                                                className="input-text qty text"
                                                                step="1"
                                                                min="1"
                                                                max="947"
                                                                defaultValue="1"
                                                            />
                                                        </div>

                                                        <button type="submit" name="add-to-cart" value="3095878" className="single_add_to_cart_button button alt">
                                                            Enter Now
                                                        </button>

                                                        <input
                                                            type="hidden"
                                                            name="gtm4wp_product_data"
                                                            value='{"internal_id":3095878,"item_id":3095878,"item_name":"Instant Win April 2025","sku":3095878,"price":0,"stocklevel":947,"stockstatus":"instock","google_business_vertical":"custom","item_category":"All Prizes","id":3095878}'
                                                        />
                                                    </form>

                                                    <div className="product_meta">
                                                        <span className="posted_in">
                                                            Categories: {' '}
                                                            <Link href="/prizes/all-prizes">All Prizes</Link>,{' '}
                                                            <Link href="/prizes/farming-machinery">Farm & Plant</Link>,{' '}
                                                            <Link href="/prizes/featured-prizes">Featured Prizes</Link>,{' '}
                                                            <Link href="/prizes/instant-wins">Instant Wins</Link>
                                                        </span>
                                                    </div>

                                                    <a className="postal-entry-link" href="javascript:;" data-toggle="modal" data-target="#postEntry">
                                                        Free postal entry information <i className="fa fa-angle-right"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </section>

                    {/* Product Content Section */}
                    <section className="product-content">
                        <div className="product-content-row product-description-row grey-bg">
                            <div className="container">
                                <div className="row align-items-center">

                                    <div className="col-md-10 offset-md-1 text-center">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="pro-info-tab">
                        <div className="container">
                            <h3 className="text-center">More Information</h3>
                            <div id="product-accordion">
                                <div className="accordion" id="faq">
                                    <div className="card">
                                        <div className="card-header">
                                            <a href="#" className="btn btn-header-link collapsed" data-toggle="collapse" data-target="#dropdown-iw" aria-expanded="false">Instant Win Prize List</a>
                                        </div>

                                        <div id="dropdown-iw" className="collapse" data-parent="#faq" >
                                            <div className="card-body">
                                                <div id="accordion">
                                                    <div className="card">
                                                        <div className="instant-wins-group-header text-left collapsed" data-toggle="collapse" data-target="#panel1" aria-expanded="false">
                                                            <img src="https://staging.luckydaycompetitions.com/wp-content/uploads/2025/06/cash .png" />
                                                            <div className="prize-text">
                                                                <span>£5 SITE CREDIT</span>
                                                                <span className="winners-count">59 Remaining</span>
                                                            </div>
                                                        </div>

                                                        <div id="panel1" className="collapse" >
                                                            <div className="card card-body instant-win-groups">
                                                                <div className="instant-wins-number-container">
                                                                    <div className="instant-win-grouped-item not-won" style={{ order: 926 }}>
                                                                        <span style={{ fontWeight: 700 }} className="instant-win-number not-won">926</span>
                                                                        <div className="sep-30"></div>
                                                                        <span className="instant-win-item-tag not-won">Win Now</span>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card">
                                        <div className="card-header">
                                            <a href="#" className="btn btn-header-link collapsed" data-toggle="collapse" data-target="#dropdown-1" aria-expanded="false">How to enter</a>
                                        </div>

                                        <div id="dropdown-1" className="collapse" aria-labelledby="faqhead2" data-parent="#faq" >
                                            <div className="card-body">
                                                <ul>
                                                    <li>Sign up for an account</li>
                                                    <li>Choose the competition you would like to enter and complete checkout</li>
                                                    <li>You will receive an email confirmation with your ticket number/s. If you don’t receive the email please check your junk folder. You can also locate your ticket numbers in the order section of your account at any time</li>
                                                    <li>Our exclusive competitions have a limited number of entries which are listed on each prize</li>
                                                    <li>Each competition runs for a limited time only</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card">
                                        <div className="card-header">
                                            <a href="#" className="btn btn-header-link collapsed" data-toggle="collapse" data-target="#dropdown-2" aria-expanded="true">When is the draw</a>
                                        </div>

                                        <div id="dropdown-2" className="collapse" aria-labelledby="faqhead2" data-parent="#faq">
                                            <div className="card-body">
                                                <ul>
                                                    <li>All draws on the website are listed with a draw date which is when the draw will take place for that given prize</li>
                                                    <li>There is also a timer counting down to the start of the live draw</li>
                                                    <li>All draws are guaranteed to go ahead on the draw date listed on the prize even if it has not sold out</li>
                                                    <li>If the draw sells out before the draw date, the live draw may be pulled forward</li>
                                                    <li>Follow us on Facebook and Instagram for live draw updates</li>
                                                    <li>We use Google’s Random Number Generator to randomly select the winning number for each competition, in a live stream on Facebook on the draw night</li>
                                                    <li>If you miss the draw, don’t worry you can watch it back at any time on the live draw section of the website</li>
                                                    <li>Watch back here – <a href="https://www.luckydaycompetitions.com/live-draws/">https://www.luckydaycompetitions.com/live-draws/</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card">
                                        <div className="card-header">
                                            <a href="#" className="btn btn-header-link collapsed" data-toggle="collapse" data-target="#dropdown-3" aria-expanded="true">What happens if I win a prize?</a>
                                        </div>

                                        <div id="dropdown-3" className="collapse" aria-labelledby="faqhead2" data-parent="#faq">
                                            <div className="card-body">
                                                <ul>
                                                    <li>Cash alternative available for all prizes</li>
                                                    <li>If your ticket number is picked as the winning number for a draw someone will contact you directly by phone or email</li>
                                                    <li>If you win a prize on Friday night’s draw you may not be contacted by phone until Monday as the office is closed over the weekend, however do not worry. If your ticket number has been drawn as the winner the prize is yours</li>
                                                    <li>We will arrange delivery of the prize (free of charge) to the winner</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card">
                                        <div className="card-header">
                                            <a href="#" className="btn btn-header-link collapsed" data-toggle="collapse" data-target="#dropdown-4" aria-expanded="true">Competition Rules</a>
                                        </div>

                                        <div id="dropdown-4" className="collapse" aria-labelledby="faqhead2" data-parent="#faq">
                                            <div className="card-body">
                                                <ul>
                                                    <li>By entering this competition, you have confirmed that you have read and agree to our <a href="https://www.luckydaycompetitions.com/terms-and-conditions/">terms and conditions</a></li>
                                                    <li>For free entry method see our <a href="https://www.luckydaycompetitions.com/terms-and-conditions/">terms and conditions</a> 3.10.</li>
                                                    <li>We are a certified and verified company that offers a secure service that protects your privacy to GDPR Regulations</li>
                                                    <li>Our fully compliant 3D secure 2 Authentication system reduces fraud and keeps our customers data safe whilst making payment on our website</li>
                                                    <li><strong>For total transparency</strong>, we video all draws LIVE on our <a href="https://www.facebook.com/dreamcargiveaways">Facebook page</a> using Google’s random number generator.</li>
                                                    <li>Entering the competition and successfully answering the question does not guarantee a prize, only entry into the LIVE draw.</li>
                                                    <li>There will only be one winner per competition unless otherwise stated</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}
