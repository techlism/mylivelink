import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from '../components/theme-provider';
import { ClerkProvider } from '@clerk/nextjs'



const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Links Live",
  description: "Open source linktree alternative. Created by Techlism",
  openGraph:{
    type: 'website',
    url: 'https://my-links.live',
    title: 'My Links Live',
    description: 'Open source linktree alternative. Created by Techlism',
    images: [
      {
        url: '/ogmylinkslive.png',
        width: 1280,
        height: 720,
        alt: 'My Links Live',
      },
    ],
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
