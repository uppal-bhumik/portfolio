import type { Metadata } from "next";
import { Archivo, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ClientProviders from "@/components/ClientProviders";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
});
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Bhumik Uppal — Software Engineer & Applied AI Builder",
  description:
    "Building intelligent products from concept to production using AI, full-stack engineering, machine learning, and scalable backend systems.",
  icons: {
    icon: [
      { url: "/favicon/favicon.ico" },
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [
      { url: "/favicon/apple-touch-icon.png" },
    ],
  },
  manifest: "/favicon/site.webmanifest",
  metadataBase: new URL("https://www.bhumik.tech"),
  openGraph: {
    title: "Bhumik Uppal — Software Engineer & Applied AI Builder",
    description:
      "Building intelligent products from concept to production using AI, full-stack engineering, machine learning, and scalable backend systems.",
    url: "https://www.bhumik.tech",
    siteName: "Bhumik Uppal",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "Bhumik Uppal — Software Engineer & Applied AI Builder",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bhumik Uppal — Software Engineer & Applied AI Builder",
    description:
      "Building intelligent products from concept to production using AI, full-stack engineering, machine learning, and scalable backend systems.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${archivo.variable} ${inter.variable} ${jetbrainsMono.variable} font-sans bg-paper text-ink selection:bg-ink selection:text-paper`}
      >
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
