import { Navbar } from "@/components/navbar/Navbar";
import { Providers } from "./providers";
import { Toaster } from "@/components/ui/sonner"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <Providers>
      <div className="min-h-screen flex">
        {/* SIDEBAR */}
        <Navbar />
        <Toaster position="top-right" />
        {/* CONTENT */}
        <main className="flex-1 p-6 bg-muted/40">
          {children}
        </main>
      </div>
    </Providers>
  );
}