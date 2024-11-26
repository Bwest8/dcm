import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { type LucideIcon } from "lucide-react";

interface NavItemProps {
  item: {
    label: string;
    href?: string;
    icon: LucideIcon;
    children?: Array<{
      label: string;
      href: string;
      icon: LucideIcon;
    }>;
  };
  mobile?: boolean;
}

export function NavItem({ item, mobile = false }: NavItemProps) {
  const pathname = usePathname();
  const Icon = item.icon;

  if (item.children) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className={cn(
              mobile
                ? "h-9 w-9 p-0 sm:h-10 sm:w-fit sm:px-4"
                : "h-9 px-4 gap-2",
              item.children.some((child) => pathname === child.href) &&
                "bg-primary/10"
            )}
          >
            <Icon className="h-4 w-4 sm:mr-2" />
            <span className={mobile ? "hidden sm:inline-block" : ""}>
              {item.label}
            </span>
            <ChevronDown
              className={cn(
                "h-4 w-4 opacity-50",
                mobile ? "hidden sm:block ml-1" : "ml-1"
              )}
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          className={cn("w-48", mobile && "w-56")}
        >
          {item.children.map((child) => {
            const ChildIcon = child.icon;
            return (
              <DropdownMenuItem key={child.href} asChild>
                <Link
                  href={child.href}
                  className={cn(
                    "w-full flex items-center gap-2",
                    pathname === child.href && "bg-primary/10"
                  )}
                >
                  <ChildIcon className="h-4 w-4" />
                  <span>{child.label}</span>
                </Link>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Button
      variant="ghost"
      className={cn(
        mobile
          ? "h-9 w-9 p-0 sm:h-10 sm:w-fit sm:px-4"
          : "h-9 px-4 gap-2",
        pathname === item.href && "bg-primary/10"
      )}
      asChild
    >
      <Link href={item.href!}>
        <Icon className="h-4 w-4 sm:mr-2" />
        <span className={mobile ? "hidden sm:inline-block" : ""}>
          {item.label}
        </span>
      </Link>
    </Button>
  );
}