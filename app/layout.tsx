import type { Metadata } from "next";
import "./globals.css";
import { RootProvider } from "fumadocs-ui/provider";

export const metadata: Metadata = {
  title: "Omi Stake",
  description: "Omi Stake",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="min-h-screen bg-[#0a0a0a] text-gray-100">
        <RootProvider>
          <main className="">{children}</main>
        </RootProvider>
      </body>
    </html>
  );
}
