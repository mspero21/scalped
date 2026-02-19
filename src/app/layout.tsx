import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Toaster } from "react-hot-toast";
import { FavoriteTeamProvider } from "@/hooks/use-favorite-team";
import { ThemeProvider } from "@/hooks/use-team-theme";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Scalped - Rank Your Stadium Experiences",
  description: "Track, rank, and share your sports stadium experiences. The Beli for stadiums.",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/icons/icon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/icons/icon.svg", type: "image/svg+xml" },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Scalped",
  },
  openGraph: {
    title: "Scalped - Rank Your Stadium Experiences",
    description: "Track, rank, and share your sports stadium experiences. The Beli for stadiums.",
    type: "website",
    locale: "en_US",
    siteName: "Scalped",
  },
  twitter: {
    card: "summary_large_image",
    title: "Scalped - Rank Your Stadium Experiences",
    description: "Track, rank, and share your sports stadium experiences.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased stadium-bg`}>
        <FavoriteTeamProvider>
        <ThemeProvider>
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#ffffff',
                color: '#0f172a',
                borderRadius: '8px',
                padding: '12px 16px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              },
              success: {
                iconTheme: {
                  primary: '#ea580c',
                  secondary: '#fff',
                },
              },
              error: {
                iconTheme: {
                  primary: '#dc2626',
                  secondary: '#fff',
                },
              },
            }}
          />
          <Navbar />
          {children}
        </ThemeProvider>
        </FavoriteTeamProvider>
      </body>
    </html>
  );
}
