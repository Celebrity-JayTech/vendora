import { currentUser } from "@clerk/nextjs/server";
import { FC } from "react";

//Logo
import Logo from "@/components/shared/logo";
//CSS
import "./sidebar.css";
//User-Info
import UserInfo from "./user-info";

interface SidebarProps {
  isAdmin?: boolean;
}

const Sidebar: FC<SidebarProps> = async ({ isAdmin }) => {
  const user = await currentUser();
  return (
    <div className="side-bar-container">
      <Logo width="100%" height="180px" />
      <span className="mt-3" />
      <UserInfo user={user} />
    </div>
  );
};

export default Sidebar;
