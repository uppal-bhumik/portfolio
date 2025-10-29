import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bhumik Uppal - AI/ML Developer",
  description: "Personal portfolio of Bhumik Uppal, an AI/ML Developer specializing in Generative AI, Computer Vision, and MLOps.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}