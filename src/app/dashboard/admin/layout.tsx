// Sidebard
import Header from "@/components/dashboard/header/header";
import Sidebar from "@/components/dashboard/sidebar/sidebar";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  // BLOCK NON ADMIN FROM ACCESSING THE ADMIN DASHBOARD
  const user = await currentUser();
  if (!user || user.privateMetadata.role !== "ADMIN") redirect("/");
  return (
    <div className="h-full w-full">
      {/**Side Bar */}
      <Sidebar isAdmin />
      <div className="md:m w-full">
        {/* Header */}
        <Header user={user} />
        <div className="left-0 w-full">{children}</div>
      </div>
    </div>
  );
}
