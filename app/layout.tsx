import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import "react-datepicker/dist/react-datepicker.css"
import { Toaster } from "@/components/ui/sonner"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SmartSpace",
  description: "A Virtual Classroom Platform",
  icons: {
    icon: '/icons/logo.png'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{
      layout: {
        logoImageUrl: '/icons/logo-name.png',
        socialButtonsVariant: 'iconButton'
      },
      variables: {
        colorText: '#fff',
        colorPrimary: '#0E78F9',
        colorBackground: '#1c1f3e',
        colorInputBackground: '#252a41',
        colorInputText: '#fff',
      }
    }}>
      <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#161925]`}
      >
        {children}
        <Toaster />
      </body>
    </html>
    </ClerkProvider>
  );
}
