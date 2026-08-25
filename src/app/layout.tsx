import type { Metadata } from "next";
import { Poppins, Raleway } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "EdgeTech Solutions - Precision Wood Finishing & Edging",
  description: "High-quality wood edging and surface finishing solutions for furniture manufacturers, cabinet makers, and interior wood projects in South Africa.",
  icons: {
    icon: "/images/ET-logo-144x33.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${raleway.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-white text-[#4B4F58] antialiased selection:bg-[#6592c7] selection:text-black">
        {children}
      </body>
    </html>
  );
}
