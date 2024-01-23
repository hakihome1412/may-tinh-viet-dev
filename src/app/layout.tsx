import { RootStyleRegistry } from "@/components/root-style-provider";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Máy Tính Việt - Chuyên Laptop Dell, Alienware, HP, Lenovo",
  description:
    "Máy Tính Việt - Chuyên Mua bán Laptop xách tay từ USA, Laptop Workstation, Laptop Gaming, Dell Latitude, HP Elitebook, Lenovo Thinkpad, có trả góp.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="relative">
        <RootStyleRegistry>{children}</RootStyleRegistry>
      </body>
    </html>
  );
}
