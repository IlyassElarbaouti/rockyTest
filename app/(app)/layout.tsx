import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rocky Mountain Limo",
  description: "Rocky Mountain Limo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
<>
      <Navbar />
      <main className=" relative overflow-hidden">
        {children}
      </main>
      <div className="h-1 bg-slate-50 " />
      <Footer />
</>

  );
}
