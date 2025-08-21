import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/components/ReduxProvider";
import { Toaster } from "react-hot-toast";
import Layout from "@/components/layout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI SaaS Chatbot Platform | Create Intelligent Chatbots",
  description: "Build, deploy, and manage intelligent AI chatbots for your business. Customizable, scalable, and easy-to-use chatbot platform with advanced features and seamless integration.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>
        <Toaster position="top-right" />
        <Layout>

        {children}
        </Layout>
        </ReduxProvider>
      </body>
    </html>
  );
}
