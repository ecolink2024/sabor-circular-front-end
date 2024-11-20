import "./globals.css";
import { Providers } from "@/providers/providers";
import { montserrat } from "@/public/fonts/font";
import Navbar from "@/components/navbar/Navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.saborcircular.com.ar/"),
  title: "Sabor Circular - tu pedido en envases retornables",
  description:
    "Sabor Circular. Revolucionando el take away y el delivery con envases retornables.",
  keywords:
    "Sabor circular, envases retornables, delivery, take away, sustentabilidad, gastronomía, cultura del descarte, delivery consciente, sabor circular",
  icons: {
    icon: "/img/fondo-contact.png",
  },
  openGraph: {
    title: "Sabor Circular - Revolucionando el take away y delivery",
    description:
      "Impulsamos la revolución del take away y delivery por medio de envases retornables.",
    images: ["/img/open-graph-image.png"],
    url: "https://www.saborcircular.com.ar/",
    type: "website",
    siteName: "Sabor Circular",
  },
  alternates: {
    canonical: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sabor Circular - Revolucionando el take away y delivery",
    description:
      "Tu pedido en envases retornables, revolucionando el take away y delivery en envases retornables.",
    images: ["/img/open-graph-image.jpeg"],
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
