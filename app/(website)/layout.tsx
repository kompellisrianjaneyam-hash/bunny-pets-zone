import EntranceReveal from "@/components/animations/EntranceReveal";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingActions from "@/components/layout/FloatingActions";

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#FFF8F0]">
      <EntranceReveal />

      <Navbar />

      <main>{children}</main>

      <Footer />

      <FloatingActions />
    </div>
  );
}