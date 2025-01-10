import type { Metadata } from "next";
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
        {children}
      </body>
    </html>
  );
}
