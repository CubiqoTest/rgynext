import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CubiQo - RGY Chats",
  description: "Room-first discovery with intent-based conversations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
