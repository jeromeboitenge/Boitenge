import "./globals.css";
import { ReactNode } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ThemeProvider } from "next-themes";

export const metadata = {
  title: "Jerome Boitenge | Full-Stack Software Engineer",
  description: "Portfolio of Jerome Boitenge - Full-Stack Developer",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-poppins bg-lightBg dark:bg-darkText">
        {/* ThemeProvider MUST be inside body*/}
        <ThemeProvider attribute="class" defaultTheme="light">
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
