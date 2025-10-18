"use client";

// React, Next.js
import Link from "next/link";
import { usePathname } from "next/navigation";

// UI Components
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

// Icons
import { icons } from "@/constants/icons";

// types
import { DashboardSidebarMenuInterface } from "@/lib/types";

// Utils
import { cn } from "@/lib/utils";

export default function SidebarNavAdmin({
  menuLinks,
}: {
  menuLinks: DashboardSidebarMenuInterface[];
}) {
  const pathname = usePathname();
  return (
    <nav className="relative grow">
      <Command className="overflow-visible rounded-lg bg-transparent">
        <CommandInput placeholder="Search..." />
        <CommandList className="overflow-visible py-2">
          <CommandEmpty style={{ fontFamily: "revert-layer", fontWeight: "bolder" }}>
            Not Found.
          </CommandEmpty>
          <CommandGroup className="relative pt-0">
            {menuLinks.map((link, index) => {
              let icon;
              const iconSearch = icons.find((icon) => icon.value === link.icon);

              if (iconSearch) icon = <iconSearch.path />;
              return (
                <Link
                  key={index}
                  href={link.link}
                  className="flex w-full items-center gap-2 rounded-md transition-all hover:bg-transparent"
                >
                  <CommandItem
                    className={cn(
                      "mt-1 h-12 w-full cursor-pointer rounded-md transition-all hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-white",
                      {
                        "bg-gray-300 font-semibold dark:text-black": link.link === pathname,
                      },
                    )}
                  >
                    {icon}
                    <span>{link.label}</span>
                  </CommandItem>
                </Link>
              );
            })}
          </CommandGroup>
        </CommandList>
      </Command>
    </nav>
  );
}
