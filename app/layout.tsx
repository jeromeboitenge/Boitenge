import './globals.css';
import { ReactNode, useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ThemeProvider } from 'next-themes';

export const metadata = {
  title: 'Jerome Boitenge | Full-Stack Software Engineer',
  description: 'Portfolio of Jerome Boitenge - Full-Stack Developer',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class">
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
