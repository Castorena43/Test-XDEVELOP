import { Navbar } from "@/components/navbar/Navbar";
import { Providers } from "./providers";

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
        {/* CONTENT */}
        <main className="flex-1 p-6 bg-muted/40">
          {children}
        </main>
      </div>
    </Providers>
  );
}