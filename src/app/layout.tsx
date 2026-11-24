import type { Metadata } from "next";
import "@/styles/globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Motionbase — Application Design Inspiration & Motion UI Intelligence",
  description:
    "Discover mobile, web, and desktop application references, inspect design systems and motion behavior, explore components, and generate implementation prompts for AI development tools.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-brand-bg bg-editorial-glow bg-no-repeat text-brand-pearl antialiased selection:bg-brand-coral selection:text-brand-bg">
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
