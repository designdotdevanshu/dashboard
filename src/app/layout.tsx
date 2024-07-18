import type { Metadata } from "next";
import ThemeContextProvider from "@/context/ThemeContext";
import NotificationProvider from "@/context/NotificationContext";
import Header from "@/components/header";
import { Toaster } from "@/components/ui/toaster";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
        <ThemeContextProvider>
          <NotificationProvider>
            <div className="flex min-h-screen flex-col bg-gray-100 dark:bg-slate-900 dark:text-white">
              <Header />
              <main className="flex-grow p-4">{children}</main>
              <Toaster />
            </div>
          </NotificationProvider>
        </ThemeContextProvider>
      </body>
    </html>
  );
}
