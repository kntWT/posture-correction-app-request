import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "@/components/ui/sonner";
import { ProjectProvider } from "@/contexts/ProjectContext";
import { BackendHostProvider } from "@/contexts/BackendHostContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Posture Correction App",
  description: "A web application for posture correction.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ProjectProvider>
          <BackendHostProvider>
            <AuthProvider>
              {children}
              <Toaster />
            </AuthProvider>
          </BackendHostProvider>
        </ProjectProvider>
      </body>
    </html>
  );
}
