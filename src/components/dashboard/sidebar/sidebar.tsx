import { currentUser } from "@clerk/nextjs/server";
import { FC } from "react";
import VendoraIcon from "./VendoraIcon";

//Logo
import Logo from "@/components/shared/logo";
//User-Info
import UserInfo from "./user-info";
import SidebarNavAdmin from "./nav-admin";
import { adminDashboardSidebarOptions } from "@/constants/data";

interface SidebarProps {
  isAdmin?: boolean;
}

const Sidebar: FC<SidebarProps> = async ({ isAdmin }) => {
  const user = await currentUser();

  return (
    <div className="bg-background/100 md: fixed top-0 bottom-0 left-0 z-50 flex w-[300px] flex-col border-r border-gray-500/20 p-4 md:top-0 md:h-screen">
      <div className="flex gap-4">
        {/* Vendora Logo */}
        <Logo width="70px" height="70px" />

        {/* Vendora Name Icon */}
        <VendoraIcon font="luckiest" size={46} />
      </div>

      <span className="mt-3" />

      {/* User Information/Details */}
      {user && <UserInfo user={user} />}
      {isAdmin && <SidebarNavAdmin menuLinks={adminDashboardSidebarOptions} />}
    </div>
  );
};

export default Sidebar;
