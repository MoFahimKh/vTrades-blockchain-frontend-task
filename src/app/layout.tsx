import { Geist, Geist_Mono, Poppins } from "next/font/google";

import "./globals.css";
import NotificationBar from "@/components/NotificationBar";
import WalletEventsListener from "@/components/WalletEventsListener";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "700"]
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} antialiased`}
      >
        {" "}
        <NotificationBar />
        <WalletEventsListener />
        {children}
      </body>
    </html>
  );
}
