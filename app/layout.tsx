import type { Metadata } from "next";
import { AOSInitializer } from '@/components/AOSInitializer';
import AOS from 'aos';
import 'aos/dist/aos.css';
import "./globals.css";


export const metadata: Metadata = {
  title: "Egypt vs China Game",
  description: "Created for CHW3M as our final culminating for 10%",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AOSInitializer/>
        {children}
      </body>
    </html>
  );
}
