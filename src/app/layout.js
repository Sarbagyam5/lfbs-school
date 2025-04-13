import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Official Page of Little Flowers' Boarding School",
  },
  description: "Made by Sarbagya Ghimire",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <div className="flex flex-col w-auto items-center justify-center  bg-gray-200">
          {children}
        </div>
      </body>
      <Footer />
    </html>
  );
}
