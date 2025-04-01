"use client"
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { TNOContextProvider } from "@/contexts/tno-context";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body
        className={`antialiased`}
      >
        <AppRouterCacheProvider>
          <TNOContextProvider>
            <div className="w-screen h-screen">
              {children}
            </div>
          </TNOContextProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
