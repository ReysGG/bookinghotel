import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import '@/app/globals.css'
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/navbar/footbar";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Home",
  description: "Aplikasi Sigma",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}> 
        <Navbar></Navbar>
        <main className="bg-gray-50 min-h-screen">{children}</main>
        <Footer></Footer>
      </body>
    </html>
  );
}
