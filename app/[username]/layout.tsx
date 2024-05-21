import type { Metadata } from "next";
import { Gabarito } from "next/font/google";

import { ThemeProvider } from '@/components/theme-provider';

const inter = Gabarito({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "My Live Link",
//   description: "Open source linktree alternative. Created by Techlism",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
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
  );
}
