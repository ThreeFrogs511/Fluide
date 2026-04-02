import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fluide",
  description: "Writing about stuttering, breathing, and well-being.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1 w-full max-w-3xl mx-auto px-6 md:px-8 py-12">
          {children}
        </main>
        <footer className="py-10 text-center text-sm text-neutral-500">
          Fluide &copy; {new Date().getFullYear()}
        </footer>
      </body>
    </html>
  );
}
