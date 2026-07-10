import { redirect } from "next/navigation";
import { headers } from "next/headers";

import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { createClient } from "@/lib/supabase/server";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const headerList = await headers();

  const pathname =
    headerList.get("x-pathname") ||
    headerList.get("next-url") ||
    "";

  let title = "Dashboard";

  if (pathname.includes("/admin/pets")) {
    title = "Pets Management";
  } else if (pathname.includes("/admin/gallery")) {
    title = "Gallery";
  } else if (pathname.includes("/admin/settings")) {
    title = "Settings";
  }

  return (
    <div className="min-h-screen bg-[#FFF8F0]">
      <DashboardSidebar />

      <main
        className="transition-all duration-300"
        style={{
          marginLeft: "280px",
          width: "calc(100% - 280px)",
          minHeight: "100vh",
        }}
      >
        <div className="mx-auto w-full max-w-[1600px] p-8">
          <DashboardHeader title={title} />

          <div className="mt-8">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}