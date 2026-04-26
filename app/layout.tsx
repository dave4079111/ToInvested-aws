import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./app.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ToInvested - Start Investing with $1 | Smart Investment Platform",
  description: "Join 50K+ investors building wealth with ToInvested. Start investing with as little as $1. 0% commission, bank-level security, and real-time analytics.",
  keywords: ["investing", "stocks", "portfolio", "wealth building", "financial freedom"],
  authors: [{ name: "ToInvested" }],
  creator: "ToInvested",
  publisher: "ToInvested",
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1",
  
  // Open Graph for social sharing
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://toinvested.com",
    siteName: "ToInvested",
    title: "ToInvested - Start Investing with $1",
    description: "Join thousands of investors building their wealth. Start with as little as $1.",
    images: [
      {
        url: "https://toinvested.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "ToInvested - Investment Platform",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "ToInvested - Start Investing with $1",
    description: "Join 50K+ investors building their wealth. 0% commission, bank-level security.",
    images: ["https://toinvested.com/twitter-image.png"],
  },

  // Additional metadata
  alternates: {
    canonical: "https://toinvested.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Conversion tracking and analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'GA_MEASUREMENT_ID', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />

        {/* Preconnect to external services */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* Theme color */}
        <meta name="theme-color" content="#0066ff" />
      </head>
      <body className={inter.className}>
        {children}

        {/* Structured data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "ToInvested",
              url: "https://toinvested.com",
              logo: "https://toinvested.com/logo.png",
              description: "Smart investment platform for building wealth",
              sameAs: [
                "https://twitter.com/toinvested",
                "https://facebook.com/toinvested",
                "https://linkedin.com/company/toinvested",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "Customer Support",
                email: "support@toinvested.com",
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
