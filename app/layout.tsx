import "./globals.css";
import { Providers } from "@/providers/providers";
import { montserrat } from "@/public/fonts/font";
import Navbar from "@/components/navbar/Navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sabor Circular",
  description: "",

  icons: {
    icon: "/img/fondo-contact.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.className} antialiased`}
        style={{
          background: "#febb5e",
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
