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
          <Avatar className="h-16 w-16">
            <AvatarImage src={user?.imageUrl} alt={`${user?.firstName!} ${user?.lastName!}`} />
            <AvatarFallback className="bg-primary text-white">
              {user?.firstName} {user?.lastName}{" "}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col gap-y-1">
            {/* User Email Address */}
            {user?.firstName} {user?.lastName}
            <span className="text-muted-foreground">{user?.emailAddresses[0].emailAddress}</span>
            {/* User Badge */}
            <span className="w-fit">
              <Badge variant="secondary" className="capitalize">
                {role?.toLocaleLowerCase()} Dashboard
              </Badge>
            </span>
          </div>
        </div>
      </Button>
    </div>
  );
}
