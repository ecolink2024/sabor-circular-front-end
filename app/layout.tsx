"use client";
import "./globals.css";
import { Providers } from "@/providers/providers";
import { montserrat } from "@/public/fonts/font";
import Navbar from "@/components/navbar/Navbar";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const bgColor =
    pathname !== "/"
      ? "linear-gradient(180deg, #FFD293 0%, rgba(255, 210, 147, 0) 100%)"
      : "#febb5e";

  return (
    <html lang="en">
      <body
        className={`${montserrat.className} antialiased`}
        style={{
          background: bgColor,
        }}
      >
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
