import type { Metadata } from "next";
import { Poppins } from 'next/font/google';
import { GoogleTagManager } from '@next/third-parties/google'

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import 'bootstrap/dist/css/bootstrap.css';
import './woocommerce.css';
import './fontawesome.css';
import "./globals.css";


import BootstrapClient from "@/components/BootstrapClient";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import Providers from "./context/QueryClientProvider";
import { CartProvider } from "./context/cart-context";

export const metadata: Metadata = {
  title: "Home - Lucky Day Competitions",
  description: "Enter exciting competitions to win amazing prizes!",
  icons: {
    icon: 'images/favicon.png',
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
        <Providers>
          <CartProvider>
            <Header />
            <div className="body-container">
              {children}
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