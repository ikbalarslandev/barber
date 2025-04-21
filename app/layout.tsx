import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Barber",
  description: "barber shop booking page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  fetch("https://www.google.com/maps/conversion/debug/collect", {
    method: "POST",
    headers: {
      "Content-Type": "text/plain",
    },
    body: JSON.stringify({
      conversion_partner_id: "business-cm9mhiyaz0003rxr11p8nubxf",
      rwg_token:
        "tAJKvS9WeONmWKEwjG0--HdpzMq0yAVNL8KMxbb44QtbcxMhSx_NUud5b8PLUBFehAIxOBO-iYRIJOknEFkIJmdsofdVJ6uOweQ%3D%3D",
      merchant_changed: "2",
    }),
  })
    .then((res) => {
      console.log("Status:", res.status);
      return res.text();
    })
    .then((data) => {
      console.log("Response:", data);
    })
    .catch((err) => {
      console.error("Error:", err);
    });

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
