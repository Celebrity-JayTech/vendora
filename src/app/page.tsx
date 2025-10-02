import ThemeToggle from "@/components/shared/theme-toggle";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="font-chivo">
      <div className="flex justify-end m-5">
        <ThemeToggle />
      </div>
      <h1>Shop at VENDORA</h1>
      <Button variant={"destructive"}>Start Shopping</Button>
    </div>
  );
}
