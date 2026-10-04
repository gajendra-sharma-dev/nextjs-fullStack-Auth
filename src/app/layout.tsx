import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"

    >
      <body className="min-h-full flex flex-col" ><Toaster position="top-right" reverseOrder={false} />{children}</body>
    </html>
  );
}
