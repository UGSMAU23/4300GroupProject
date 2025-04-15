import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto, League_Spartan, Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import { SessionProvider, useSession } from "next-auth/react";
import { auth } from "@/auth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

const leagueSpartan = League_Spartan({
  variable: "--font-league",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dawghouse",
  description: "A quick and easy roommate matching service for UGA students.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  //console.log("ROOT session: ", session);
  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>
          <Navbar />
          {children}

          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
