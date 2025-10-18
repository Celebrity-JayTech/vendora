import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

export default async function DashboardPage() {
  // GET USER AND REDIRECT DEPENDING ON ROLE
  const user = await currentUser();
  if (!user?.privateMetadata?.role || user?.privateMetadata.role === "USER") redirect("/");
  if (user?.privateMetadata.role === "ADMIN") redirect("/dashboard/admin");
  if (user?.privateMetadata.role === "SELLER") redirect("/dashboard/seller");
  return <div>Dashboard Page</div>;
}
