import type { Metadata } from "next";
import "./globals.css";
import { ProgressProvider } from "@/context/ProgressContext";
import { ThemeProvider } from "@/context/ThemeContext";

export const metadata: Metadata = {
  title: "DevJourney | Master Coding Step-by-Step",
  description: "DevJourney is a structured learning platform where students learn coding through guided lessons, practice, and real-world projects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var saved = localStorage.getItem('devjourney-theme');
                var sysDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (saved) {
                  document.documentElement.setAttribute('data-theme', saved);
                } else {
                  document.documentElement.setAttribute('data-theme', sysDark ? 'dark' : 'light');
                }
              } catch(e) {}
            `,
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <ProgressProvider>
            <main>{children}</main>
          </ProgressProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

