import type { Metadata } from "next";
import { Poppins } from 'next/font/google';
import { GoogleTagManager } from '@next/third-parties/google'

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import 'bootstrap/dist/css/bootstrap.css';
import './css/woocommerce.css';
import './css/woocommerce-layout.css';
import './css/woocommerce-small-screen.css';
import './css/fontawesome.css';
import './css/jcf.css';
import './css/dd-plugin.css';
import "./globals.css";

import BootstrapClient from "./context/bootstrap-client-provider";
import Header from "../includes/Header";
import Footer from "../includes/Footer";

import Providers from "./context/query-client-provider";
import { CartProvider } from "./context/cart-context";
import Link from "next/link";

import NextTopLoader from 'nextjs-toploader';
import { BottomBar } from "@/includes/BottomBar";
import NativeTokenBridge from "@/components/NativeTokenBridge";

export const metadata: Metadata = {
  title: "Home - Lucky Day Competitions",
  description: "Enter exciting competitions to win amazing prizes!",
  icons: {
    icon: 'images/favicon.png',
  },
  other: {
    viewport:
      "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
  }
};

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['400', '500', '600', '700']
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${poppins.variable}`}>
      <body>
        <NativeTokenBridge />
        
        <NextTopLoader 
          color="#b67407"
          initialPosition={0.08}
          crawlSpeed={200}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #2299DD,0 0 5px #2299DD"
          template='<div class="bar" role="bar"><div class="peg"></div></div> 
  <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
          zIndex={1600}
          showAtBottom={false}
          showForHashAnchor={false}
        />
        <Providers>
          <CartProvider>
            <Header />
            <div className="body-container">
              <div className="text-center luckydays-alert-block">
                <div className="container">
                  <Link href="/next-draw"><strong>Next Draw</strong> View All Prizes <i className="fa fa-caret-right"></i></Link>
                </div>
              </div>
              {children}
              <BottomBar />
              <Footer />
            </div>
          </CartProvider>
        </Providers>
        <BootstrapClient />
      </body>

      <GoogleTagManager gtmId="GTM-NQWT8ZT" />
    </html>
  )
}