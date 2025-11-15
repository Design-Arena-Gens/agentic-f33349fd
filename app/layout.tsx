import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Video Style Transformer - AI-Powered Cinematic Effects",
  description: "Transform your videos with professional cinematic styles, action effects, aesthetic looks, and AI enhancement",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
