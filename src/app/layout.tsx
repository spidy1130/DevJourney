import type { Metadata } from "next";
import "./globals.css";
import { ProgressProvider } from "@/context/ProgressContext";

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
    <html lang="en">
      <body>
        <ProgressProvider>
          <main>{children}</main>
        </ProgressProvider>
      </body>
    </html>
  );
}

