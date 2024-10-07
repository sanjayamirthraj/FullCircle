import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/how-to-use", label: "How to Use" }, 
  { href: "/about", label: "About" }, 
];

const linkClasses = "text-foreground transition-colors hover:text-foreground";

export function NavigationHeader() {
  return (
    <div className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-50">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <span className="sr-only">Speech Transact</span>
        </Link>
        {navigation.map((link) => (
          <Button
            key={link.href}
            variant={"link"}
            className={cn(linkClasses, "p-0")}
          >
            <Link href={link.href}>{link.label}</Link>
          </Button>
        ))}
      </nav>
     
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <div className="ml-auto flex-1 sm:flex-initial">
          <div className="flex justify-end gap-2">
            <div className="text-xs text-muted-foreground my-auto mr-1">
             <ConnectButton/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
