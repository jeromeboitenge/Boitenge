import "./globals.css";
import { ReactNode } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ThemeProvider } from "next-themes";
import { Inter, Outfit } from "next/font/google";
import { AuthProvider } from "./components/auth";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { BackendStatusToast } from "./components/BackendStatusToast";

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
  ],
  authors: [{ name: "Jerome Boitenge" }],
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
              <BackendStatusToast />
              <Navbar />
              <main className="min-h-screen pt-20">{children}</main>
              <Footer />
            </AuthProvider>
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  );
}
