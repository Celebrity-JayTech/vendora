// Nest.js
import type { Metadata } from "next";
import { Geist, Geist_Mono, Chivo, Pacifico } from "next/font/google";
import "./globals.css";
//Clerk Provider
import { ClerkProvider } from "@clerk/nextjs";
//Global css
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import ModalProvider from "@/providers/modal-provider";

//Fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const pacifico = Pacifico({
  variable: "--font-pacifico",
  subsets: ["latin"],
  weight: ["400"],
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
  icons: {
    icon: "/favicon.svg",
  },
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
            <ModalProvider>{children}</ModalProvider>
            <Toaster />

            <link
              href="https://fonts.googleapis.com/css2?family=Caprasimo&display=swap"
              rel="stylesheet"
            />
            {/* Luckiest Guy */}
            <link
              href="https://fonts.googleapis.com/css2?family=Luckiest+Guy&display=swap"
              rel="stylesheet"
            />
            {/* Playwrite España (variable) */}
            <link
              href="https://fonts.googleapis.com/css2?family=Playwrite+Espana:wght@400..700&display=swap"
              rel="stylesheet"
            />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
