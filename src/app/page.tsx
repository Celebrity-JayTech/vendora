import ThemeToggle from "@/components/shared/theme-toggle";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
    <div className="font-chivo">
      <div className="m-5 flex justify-end gap-x-5">
        <UserButton />
        <ThemeToggle />
      </div>
      <h1>Shop at VENDORA</h1>
      <Button variant="outline">Start Shopping</Button>
    </div>
  );
}
