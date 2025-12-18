import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Learn Chinese by Song - 黃昏",
  description: "Learn Traditional Chinese through the song 黃昏 by 周傳雄",
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <body className="antialiased">{children}</body>
    </html>
  );
}

