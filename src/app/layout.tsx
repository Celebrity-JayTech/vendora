// Nest.js
import type { Metadata } from "next";
import { Geist, Geist_Mono, Chivo } from "next/font/google";

//Clerk Provider
import { ClerkProvider } from "@clerk/nextjs";
//Global css
import "./globals.css";
import { ThemeProvider } from "next-themes";

//Fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const chivo = Chivo({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-chivo",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

//MetaData
export const metadata: Metadata = {
  title: "Vendora",
  description:
    "Vendora is a modern campus-focused SaaS marketplace where students and small businesses can buy, sell, and discover products and services. With built-in wallet payments, bill settlements, flash sales, and personalized dark mode, Vendora makes campus commerce seamless and enjoyable.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${chivo.variable} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
