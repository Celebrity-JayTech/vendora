import ThemeToggle from "@/components/shared/theme-toggle";
import { UserButton } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";
export default function Header({ user }: { user: User | null }) {
  return (
    <div
      className="bg-background/80 fixed top-0 right-0 left-0 z-[30] flex h-16 items-center gap-4 border-b-[1px] border-gray-500/20 p-4 backdrop-blur-md md:left-[300px]"
      role="banner"
    >
      <div className="flex items-center gap-2">{/* Something */}</div>

      <div className="ml-auto flex items-center gap-2">
        <span
          style={{ fontWeight: "800", color: "#1E90FF" }}
          className="font-font-pacifico text-[20px]"
        >
          WELCOME {user?.firstName?.toLocaleUpperCase()} {user?.lastName?.toLocaleUpperCase()}
        </span>

        <UserButton afterSignOutUrl="/" />
        <ThemeToggle />
      </div>
    </div>
  );
}
