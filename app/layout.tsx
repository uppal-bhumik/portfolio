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
  title: "Bhumik Uppal — AI Engineer & Product Builder",
  description:
    "AI engineer specialising in generative AI, computer vision, and MLOps. Springer-published researcher building production-grade intelligent systems.",
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
