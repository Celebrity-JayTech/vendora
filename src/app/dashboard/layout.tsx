import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

// Header
import Header from "@/components/dashboard/header/header";

// Sidebard
import Sidebar from "@/components/dashboard/sidebar/sidebar";
export default async function DashboardLayout({ children }: { children: ReactNode }) {
  //Redirect If Not Admin
  const user = await currentUser();
  if (!user || user.privateMetadata.role !== "ADMIN") redirect("/");
  return (
    <div className="h-full w-full">
      {/* Sidebar */}
      <Sidebar isAdmin />

      {/* Main area: no left margin on small screens, reserve space on md+ */}
      <div className="ml-0 md:ml-[300px]">
        {/* Header */}
        <Header user={user} />
        {/* Keep content below header: mt-16 matches header height */}
        <div className="mt-16 w-full p-4">{children}</div>
      </div>
    </div>
  );
}
