import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from '../components/theme-provider';
import { ClerkProvider } from '@clerk/nextjs'



const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://my-links.live'),
  title: "My Links Live",
  description: "Open source linktree alternative. Created by Techlism",
  openGraph:{
    images : '/ogmylinkslive.png',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider
              attribute="class"
              defaultTheme="light"
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
