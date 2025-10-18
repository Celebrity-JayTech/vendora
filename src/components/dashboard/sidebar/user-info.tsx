import { Button } from "@/components/ui/button";
import { User } from "@clerk/nextjs/server";
import React from "react";
import "./sidebar.css";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function UserInfo({ user }: { user: User | null }) {
  const role = user?.privateMetadata.role?.toString();
  return (
    <div>
      <Button className="button" variant="ghost">
        <div className="avatar-container">
          {/* User Avatar */}
          <Avatar className="h-15 w-15 cursor-pointer">
            <AvatarImage
              src={user?.imageUrl}
              width={300}
              height={300}
              alt={`${user?.firstName!} ${user?.lastName!}`}
              className="h-full w-full rounded-full object-cover"
            />
            <AvatarFallback className="bg-primary serif font-sans text-white">
              {user?.firstName} {user?.lastName}{" "}
            </AvatarFallback>
          </Avatar>

          <div
            className="flex flex-col gap-y-1"
            style={{ fontFamily: "caprasimo", fontSize: "20px", color: "#616161ff" }}
          >
            {/* User Email Address */}
            {user?.firstName} {user?.lastName}
            <span
              className="text-muted-foreground"
              style={{ fontSize: "15px", fontFamily: "sans-serif" }}
            >
              <Badge variant="secondary" className="capitalize">
                {role?.toLocaleLowerCase()} Dashboard
              </Badge>
            </span>
            {/* User Badge */}
          </div>
        </div>
      </Button>
    </div>
  );
}
