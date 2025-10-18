"use client";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { SunIcon, MoonIcon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <Button variant="outline" size="icon" className="h-10 w-10 rounded-full bg-white">
        <SunIcon className="h-5 w-5" />
      </Button>
    );
  }

  const bgColor = theme === "dark" ? "#0a0a0a" : "#ffffff";
  const textColor = theme === "dark" ? "text-white" : "text-black";

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button size="icon" className="h-10 w-10 rounded-full">
          <SunIcon className="h-[1.4rem] w-[1.4rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <MoonIcon className="absolute h-[1.4rem] w-[1.4rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
        </Button>
      </DropdownMenuTrigger>

      {open && <div className="fixed inset-0 z-40 bg-black/30" onClick={() => setOpen(false)} />}

      <DropdownMenuContent
        className={`z-50 w-56 border border-gray-200 dark:border-gray-800 ${textColor}`}
        style={{ backgroundColor: bgColor }}
      >
        <DropdownMenuLabel>Appearance</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={theme === "light"}
          className="rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white"
          onClick={() => {
            setTheme("light");
            setOpen(false);
          }}
        >
          Light Mode
        </DropdownMenuCheckboxItem>

        <DropdownMenuCheckboxItem
          checked={theme === "dark"}
          className="rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white"
          onClick={() => {
            setTheme("dark");
            setOpen(false);
          }}
        >
          Dark Mode
        </DropdownMenuCheckboxItem>

        <DropdownMenuCheckboxItem
          checked={theme === "system"}
          className="rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white"
          onClick={() => {
            setTheme("system");
            setOpen(false);
          }}
        >
          System
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
