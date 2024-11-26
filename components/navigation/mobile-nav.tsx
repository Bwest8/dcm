import { navigationItems } from "./nav-items";
import { NavItem } from "./nav-item";

export function MobileNav() {
  return (
    <div className="flex md:hidden overflow-x-auto py-2 space-x-1">
      {navigationItems.map((item) => (
        <NavItem key={item.label} item={item} mobile />
      ))}
    </div>
  );
}