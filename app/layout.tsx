import type { Metadata } from "next";
import "./globals.css";
import "@/styles/header.css"

import Header from "@/components/header";
import Footer from "@/components/footer";


export const metadata: Metadata = {
  title: "Budget Tracking App",
  description: "Budget Tracking App - İpek Coskun",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
