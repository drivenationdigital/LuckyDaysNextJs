export const dynamic = 'force-dynamic';

import Image from "next/image";
import ObservedQueryProvider from "./context/competitions-context";
import { HomeProducts } from "@/components/HomeProducts";
import { HomeSlider } from "@/components/HomeBanner";
import { fetchHomepageBanners } from "@/api-functions/posts";
import Testimonials from "@/components/home/Testimonials";
import { WinnersSection } from "@/components/home/WinnersSection";

export default async function Page() {
  const data = await fetchHomepageBanners();

  return (
    <>
      <HomeSlider slides={data} />

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

      <main id="main">
        <ObservedQueryProvider>
          <HomeProducts />
        </ObservedQueryProvider>

        <section className="big-winner-section text-center">
          <div className="container">
            <div className="container-border">
              <h5 className="title-line"><span>How it works</span></h5>
              <div className="row item-list">
                <div className="col-md-3">
                  <div className="item wow fadeIn">
                    <Image src="/images/choose.png" alt="choose icon" width={110} height={100} />
                    <h3>Choose</h3>
                    <p>Choose which competition you’d like to enter into</p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="item wow fadeIn">
                    <Image src="/images/select.png" alt="select icon" width={110} height={100} />
                    <h3>Select</h3>
                    <p>Select how many tickets you’d like to purchase</p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="item wow fadeIn">
                    <Image src="/images/pay.png" alt="pay icon" width={110} height={100} />
                    <h3>Pay</h3>
                    <p>Pay securely by card, ApplePay/GooglePay or PayPal</p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="item wow fadeIn">
                    <Image src="/images/tune-in.png" alt="facebook icon" width={110} height={100} />
                    <h3>Tune in!</h3>
                    <p>Watch the live draw on Facebook to see if you’ve won</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Testimonials />
        <WinnersSection />
      </main>
    </>
  )
}
