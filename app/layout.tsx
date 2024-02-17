import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/providers";
import Header from "@/components/Header";
import { getServerSession } from "next-auth";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession()
  return (
    <html lang="en">
      <body className={`${inter.className} dark`}>
        <Providers session={session}>
            <Header/>
          <main className="bg-[#27272A]">
        {children}
          </main>
          <Footer/>
        </Providers>
      </body>
    </html>
  );
}
