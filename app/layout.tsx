import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { WalletContextProvider } from "./contexts/WalletContext";
import { Toaster } from "react-hot-toast";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "🔥 Sovereign Launchpad | Create & Launch Tokens on Solana",
  description: "The ultimate token launchpad powered by Meteora DBC. Create, launch, and trade tokens with AI-powered agents. Built by King Hermes.",
  keywords: [
    "Solana",
    "Token Launchpad",
    "Meteora",
    "Bonding Curve",
    "DeFi",
    "King Hermes",
    "AI Agents",
    "Token Creation",
  ],
  authors: [{ name: "King Hermes", url: "https://github.com/Maliot100X" }],
  openGraph: {
    title: "🔥 Sovereign Launchpad",
    description: "Create & Launch Tokens on Solana with AI-Powered Agents",
    type: "website",
    locale: "en_US",
    siteName: "Sovereign Launchpad",
  },
  twitter: {
    card: "summary_large_image",
    title: "🔥 Sovereign Launchpad",
    description: "Create & Launch Tokens on Solana with AI-Powered Agents",
    creator: "@kinghermes",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  themeColor: "#0a0a0f",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased">
        <WalletContextProvider>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "#12121a",
                color: "#fff",
                border: "1px solid rgba(255, 215, 0, 0.3)",
              },
              success: {
                iconTheme: {
                  primary: "#00ff88",
                  secondary: "#12121a",
                },
              },
              error: {
                iconTheme: {
                  primary: "#ff4444",
                  secondary: "#12121a",
                },
              },
            }}
          />
        </WalletContextProvider>
      </body>
    </html>
  );
}
