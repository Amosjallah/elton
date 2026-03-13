import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import "./globals.css";

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#2563eb',
};

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://profilelogistics.com';

// Environment variable constants
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID !== 'your_google_analytics_id' 
  ? process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID 
  : null;
const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
const isRecaptchaConfigured = RECAPTCHA_SITE_KEY && RECAPTCHA_SITE_KEY !== 'your_recaptcha_site_key';
const GOOGLE_SITE_VERIFICATION = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION !== 'your_google_site_verification_code'
  ? process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
  : '';

const SITE_NAME = 'PROFILE LOGISTICS';
const SITE_LOGO = '/profile-logistics-logo.jpg';
const SITE_DESCRIPTION = 'The Stationery Clinic – Emerging stationery company in Tema and Accra. High-quality office and school supplies.';

// Favicon & OG: uses tiwa logo.png from public
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${SITE_NAME} | The Stationery Clinic`,
    template: `%s | ${SITE_NAME}`
  },
  description: SITE_DESCRIPTION,
  keywords: [
    SITE_NAME,
    "stationery Ghana",
    "office supplies Accra",
    "school supplies Tema",
    "stationery company Ghana",
    "Profile Logistics stationery",
    "The Stationery Clinic"
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  applicationName: SITE_NAME,
  referrer: "origin-when-cross-origin",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: SITE_LOGO, sizes: 'any', type: 'image/jpeg' },
    ],
    shortcut: SITE_LOGO,
    apple: SITE_LOGO,
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: SITE_NAME,
  },
  formatDetection: {
    telephone: true,
    email: false,
    address: false,
  },
  verification: {
    google: GOOGLE_SITE_VERIFICATION,
  },
  openGraph: {
    type: "website",
    locale: "en_GH",
    url: siteUrl,
    title: `${SITE_NAME} | The Stationery Clinic`,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
    images: [
      {
        url: SITE_LOGO,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} Logo`,
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [SITE_LOGO],
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "shopping",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* PWA Meta Tags */}
        <meta name="theme-color" content="#2563eb" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="PROFILE LOGISTICS" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#2563eb" />
        <meta name="msapplication-tap-highlight" content="no" />

        {/* Favicon from public folder */}
        <link rel="icon" href={SITE_LOGO} type="image/jpeg" sizes="any" />
        <link rel="shortcut icon" href={SITE_LOGO} />

        {/* Apple Touch Icons from public */}
        <link rel="apple-touch-icon" href={SITE_LOGO} />
        <link rel="apple-touch-startup-image" href={SITE_LOGO} />

        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@4.1.0/fonts/remixicon.css"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font -- App Router: fonts loaded in root layout apply to all pages */}
        <link href="https://fonts.googleapis.com/css2?family=Pacifico&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

        {/* Structured Data - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "PROFILE LOGISTICS",
              "url": siteUrl,
              "logo": siteUrl + "/profile-logistics-logo.jpg",
              "description": "The Stationery Clinic – Emerging stationery company in Tema and Accra. High-quality office and school supplies.",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "GH",
                "addressLocality": "Tema & Accra",
                "streetAddress": "Tema and Accra, Ghana"
              },
              "telephone": "+233272983503",
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "telephone": "+233272983503",
                "availableLanguage": "English"
              }
            })
          }}
        />
      </head>

      {/* Google Analytics */}
      {GA_MEASUREMENT_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}', {
                page_path: window.location.pathname,
              });
            `}
          </Script>
        </>
      )}

      {/* Google reCAPTCHA v3 */}
      {isRecaptchaConfigured && (
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`}
          strategy="afterInteractive"
        />
      )}

      <body className="antialiased font-sans overflow-x-hidden pwa-body">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[10000] focus:px-6 focus:py-3 focus:bg-blue-600 focus:text-white focus:rounded-lg focus:font-semibold focus:shadow-lg"
        >
          Skip to main content
        </a>
        <CartProvider>
          <WishlistProvider>
            <div id="main-content">
              {children}
            </div>
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
