import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { QueryProvider } from "@/providers/query-provider";
import { SheetProvider } from "@/providers/sheet-provider";
import { Toaster } from "@/components/ui/sonner"

export const metadata: Metadata = {
  title: "BudgeBuddy",
  description: "Manage your finances",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
        <html lang="en">
          <head>
          </head>
          <body
            className={`antialiased custom-scrollbar font-sans`}
          >
            
            <QueryProvider>
              <Toaster />
              <SheetProvider />
              
              {children}
              
            </QueryProvider>
          </body>
      </html>
    </ClerkProvider>
  );
}
