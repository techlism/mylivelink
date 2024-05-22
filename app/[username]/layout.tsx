import type { Metadata } from "next";
import { Gabarito } from "next/font/google";

import { ThemeProvider } from '@/components/theme-provider';

const gabarito = Gabarito({ subsets: ["latin"] });

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
        <body className={gabarito.className}>
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
