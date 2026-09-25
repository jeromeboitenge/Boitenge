import "./globals.css";
import { ReactNode } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ThemeProvider } from "next-themes";
import { Inter, Outfit } from "next/font/google";
import { AuthProvider } from "./components/auth";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { BackendStatusToast } from "./components/BackendStatusToast";
import LocationTracker from "./components/LocationTracker";
import AnalyticsProvider from "./components/AnalyticsProvider";
import ScrollToTop from "./components/ScrollToTop";
import PageTransition from "./components/PageTransition";

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
  title: "Jerome Nzaramyimana | Software Engineer",
  description:
    "Jerome Nzaramyimana | Software Engineer | MERN Developer | Hardware And Software Maintenance | System Analyst | Rwanda",
  keywords: [
    "Jerome Boitenge",
    "Jerome Nzaramyimana",
    "Software Engineer Rwanda",
    "MERN Developer",
    "React Developer Rwanda",
    "Next.js Developer",
    "Full Stack Developer",
    "Freelance Developer Rwanda",
  ],
  authors: [{ name: "Jerome Boitenge", url: "https://boitenge.vercel.app" }],
  creator: "Jerome Boitenge",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://boitenge.vercel.app",
    siteName: "Jerome Boitenge",
    title: "Jerome Nzaramyimana | Software Engineer",
    description:
      "Full-stack engineer crafting premium digital experiences with React, Next.js, and Node.js. Available for hire and remote work.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jerome Nzaramyimana | Software Engineer",
    description:
      "Full-stack engineer crafting premium digital experiences with React, Next.js, and Node.js.",
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
    canonical: "https://boitenge.vercel.app",
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
      </head>

      <body className="font-sans bg-lightBg dark:bg-darkBg text-lightText dark:text-darkText transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ErrorBoundary>
            <AuthProvider>
              <AnalyticsProvider>
                <BackendStatusToast />
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
