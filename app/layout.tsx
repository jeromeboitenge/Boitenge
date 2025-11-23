import "./globals.css";
import { ReactNode } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ThemeProvider } from "next-themes";

export const metadata = {
  title: "Jerome Nzaramyimana | Software Engineer",
  description:
    "Jerome Nzaramyimana | Software Engineer | MERN Developer |Hardware And Software Maintenance|system Analyst| Rwanda",
  keywords: [
    "Jerome Boitenge",
    "Jerome Nzaramyimana",
    "Software Engineer Rwanda",
    "MERN Developer",
    "React Developer Rwanda",
  ],
  authors: [{ name: "Jerome Boitenge" }],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta
          name="google-site-verification"
          content="hlBEraVPXXswe0AyXbaHOY1b00RHf8WCeCXpnQ4qtnQ"
        />
      </head>

      <body className="font-poppins bg-lightBg dark:bg-darkText">
        <ThemeProvider attribute="class" defaultTheme="light">
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
