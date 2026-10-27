import "./globals.css";
import { ReactNode } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ThemeProvider } from "next-themes";
import { Inter, Outfit } from "next/font/google";
import { AuthProvider } from "./components/auth";
import { ErrorBoundary } from "./components/ErrorBoundary";
// removed
import LocationTracker from "./components/LocationTracker";
import AnalyticsProvider from "./components/AnalyticsProvider";
import ScrollToTop from "./components/ScrollToTop";
import PageTransition from "./components/PageTransition";
import ProfileAssetsSync from "./components/ProfileAssetsSync";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://boitenge.vercel.app"),
  title: "Jerome Nzaramyimana | Software Developer in Kigali, Rwanda",
  description:
    "Portfolio of Jerome Nzaramyimana, a software developer in Kigali, Rwanda. Explore selected web and mobile applications, technologies, experience, and contact details.",
  keywords: [
    "Jerome Nzaramyimana",
    "Jerome Boitenge",
    "Software developer Kigali",
    "React developer Rwanda",
    "Next.js developer",
    "Node.js developer",
    "Full-stack developer Rwanda",
  ],
  authors: [{ name: "Jerome Nzaramyimana", url: "https://boitenge.vercel.app/" }],
  creator: "Jerome Nzaramyimana",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://boitenge.vercel.app/",
    siteName: "Jerome Nzaramyimana",
    title: "Jerome Nzaramyimana | Software Developer",
    description:
      "Selected web and mobile applications by Jerome Nzaramyimana, a software developer based in Kigali, Rwanda.",
    images: [{ url: "/Nzaramyimana-Jerome.jpeg", alt: "Jerome Nzaramyimana" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jerome Nzaramyimana | Software Developer",
    description:
      "Selected web and mobile applications by Jerome Nzaramyimana, a software developer based in Kigali, Rwanda.",
    images: ["/Nzaramyimana-Jerome.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://boitenge.vercel.app/",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${outfit.variable}`}>
      <head>
        <meta
          name="google-site-verification"
          content="hlBEraVPXXswe0AyXbaHOY1b00RHf8WCeCXpnQ4qtnQ"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Jerome Nzaramyimana",
              alternateName: "Jerome Boitenge",
              url: "https://boitenge.vercel.app/",
              image: "https://boitenge.vercel.app/Nzaramyimana-Jerome.jpeg",
              jobTitle: "Software Developer",
              email: "jeromeboitenge@gmail.com",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Kigali",
                addressCountry: "RW",
              },
              sameAs: [
                "https://github.com/jeromeboitenge",
                "https://www.linkedin.com/in/jerome-aldrin-463b4a411",
              ],
            }),
          }}
        />
      </head>

      <body className="font-sans bg-lightBg dark:bg-darkBg text-lightText dark:text-darkText transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ErrorBoundary>
            <AuthProvider>
              <AnalyticsProvider>
                <ProfileAssetsSync />
                <LocationTracker />
                <Navbar />
                <main className="min-h-screen pt-20">
                  <PageTransition>{children}</PageTransition>
                </main>
                <Footer />
                <ScrollToTop />
              </AnalyticsProvider>
            </AuthProvider>
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  );
}
