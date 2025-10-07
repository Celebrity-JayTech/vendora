import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

// Header
import Header from "@/components/dashboard/header/header";

// Sidebard
import Sidebar from "@/components/dashboard/sidebar/sidebar";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  // BLOCK NON ADMIN FROM ACCESSING THE ADMIN DASHBOARD
  const user = await currentUser();
  if (!user || user.privateMetadata.role !== "ADMIN") redirect("/");
  return (
    <div className="h-full w-full">
      {/**Side Bar */}
      <Sidebar />
      <div className="ml-[300px] w-full">
        {/* Header */}
        <Header />
        <div className="mt-[75px] w-full p-4">{children}</div>
      </div>
    </div>
  );
}
