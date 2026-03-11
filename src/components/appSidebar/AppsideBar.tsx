"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import {
  Award,
  Box,
  ChevronDown,
  FileText,
  LayoutGrid,
  LogOut,
  LucideIcon,
  RefreshCcw,
  ShoppingBag,
  Truck,
  User,
  Users,
  Wallet,
  Wrench
} from "lucide-react";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

type MenuItem = {
  name: string;
  path: string;
  icon: LucideIcon;
  children?: { name: string; path: string }[];
};

const clientMenuItems: MenuItem[] = [
  { name: "Overview", path: "/", icon: LayoutGrid },
  { name: "Orders", path: "/orders", icon: ShoppingBag },
  { name: "Repairs", path: "/repairs", icon: Wrench },
  { name: "Products", path: "/products", icon: Box },
  { name: "Inventory", path: "/inventory", icon: RefreshCcw },
  { name: "Customers", path: "/customers", icon: Users },
  { name: "Wallet & Payments", path: "/wallet", icon: Wallet },
  { name: "Shipping $ Pickup", path: "/shipping", icon: Truck },
  { name: "Loyalty & Promo", path: "/loyalty", icon: Award },
  {
    name: "CMS",
    path: "/cms",
    icon: FileText,
    children: [
      { name: "Privacy Policy", path: "/cms/privacy-policy" },
      { name: "Terms & Conditions", path: "/cms/terms-and-conditions" }
    ]
  },
  { name: "Profile", path: "/profile", icon: User },
];

export default function AppSideBar() {
  const pathname = usePathname();
  const router = useRouter();
  const { state, isMobile, setOpenMobile } = useSidebar();
  const isCollapsed = state === "collapsed" && !isMobile;
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({
    CMS: pathname.startsWith("/cms")
  });

  const toggleMenu = (name: string) => {
    setOpenMenus((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  const handleLogout = () => {
    if (isMobile) setOpenMobile(false);
    router.push("/auth/login");
  };

  const handleItemClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <Sidebar collapsible="icon" className="border-none">
      <SidebarContent className="bg-secondary text-white flex flex-col h-full font-sans border-none overflow-hidden">

        {/* Header / Logo */}
        <SidebarHeader className={cn(
          "p-6 pb-4 pt-10 flex items-center justify-center transition-all duration-300",
          isCollapsed && "p-2"
        )}>
          <Link href="/" className="flex items-center justify-center" onClick={handleItemClick}>
            <div className={cn(
              "bg-white flex items-center justify-center transition-all duration-300 aspect-square",
              isCollapsed ? "w-10 h-10 rounded-lg" : "w-32 h-32 rounded-[32px]"
            )}>
              <div className="relative w-full h-full p-6 flex items-center justify-center">
                <div className="w-16 h-16 border-[6px] border-black rounded-full flex items-center justify-center rotate-[-10deg]">
                  <span className="text-black text-4xl font-black italic tracking-tighter">M</span>
                </div>
                {/* Decorative orbit ring */}
                <div className="absolute inset-4 border-2 border-black/10 rounded-full rotate-[45deg] scale-110"></div>
              </div>
            </div>
          </Link>
        </SidebarHeader>

        {/* Navigation - Scrollable Area */}
        <SidebarGroup className="flex-1 px-4 mt-6 overflow-y-auto CustomScrollbar overflow-x-hidden">
          <SidebarGroupContent>
            <SidebarMenu className="gap-1.5">
              {clientMenuItems.map((item) => {
                const active = isActive(item.path);
                const hasChildren = item.children && item.children.length > 0;

                return (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton
                      asChild
                      tooltip={isCollapsed ? item.name : undefined}
                      onClick={hasChildren ? (e) => { e.preventDefault(); toggleMenu(item.name); } : handleItemClick}
                      className={cn(
                        "h-12 transition-all duration-200 rounded-xl",
                        active && !hasChildren
                          ? "bg-primary text-white hover:bg-primary/90"
                          : "text-white/70 hover:bg-white/5 hover:text-white cursor-pointer",
                        isCollapsed ? "justify-center px-0 w-10 mx-auto" : "px-4"
                      )}
                    >
                      {hasChildren ? (
                        <div className={cn(
                          "flex items-center w-full",
                          isCollapsed ? "justify-center" : "justify-between"
                        )}>
                          <div className="flex items-center gap-4">
                            <item.icon className={cn(
                              "w-5 h-5 shrink-0",
                              active && !hasChildren && "scale-105"
                            )} />
                            {!isCollapsed && (
                              <span className="text-[15px] font-medium tracking-wide">
                                {item.name}
                              </span>
                            )}
                          </div>
                          {!isCollapsed && (
                            <ChevronDown className={cn(
                              "w-4 h-4 transition-transform duration-200 opacity-70",
                              openMenus[item.name] && "rotate-180"
                            )} />
                          )}
                        </div>
                      ) : (
                        <Link href={item.path} className={cn(
                          "flex items-center gap-4 w-full",
                          isCollapsed && "justify-center"
                        )}>
                          <item.icon className={cn(
                            "w-5 h-5 shrink-0",
                            active && !hasChildren && "scale-105"
                          )} />
                          {!isCollapsed && (
                            <span className="text-[15px] font-medium tracking-wide">
                              {item.name}
                            </span>
                          )}
                        </Link>
                      )}
                    </SidebarMenuButton>

                    {hasChildren && !isCollapsed && openMenus[item.name] && (
                      <SidebarMenuSub className="ml-5 mt-1 border-white/20 mr-2">
                        {item.children?.map((child) => (
                          <SidebarMenuSubItem key={child.name}>
                            <SidebarMenuSubButton
                              asChild
                              className={cn(
                                "h-10 text-[14px] text-white/70 hover:text-white hover:bg-white/5 rounded-lg px-4 transition-colors mt-1 cursor-pointer",
                                pathname === child.path && "bg-white/10 text-white font-medium"
                              )}
                              onClick={handleItemClick}
                            >
                              <Link href={child.path}>
                                <span>{child.name}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    )}
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Footer / Logout */}
        <SidebarFooter className={cn(
          "p-6 mt-auto transition-all duration-300",
          isCollapsed && "p-2 items-center"
        )}>
          <button
            onClick={handleLogout}
            className={cn(
              "w-full h-14 bg-[#FF5858] hover:bg-[#FF4848] text-white rounded-2xl font-semibold flex items-center justify-center gap-3 transition-all active:scale-[0.98] cursor-pointer",
              isCollapsed && "h-12 w-12 rounded-xl p-0"
            )}
            title={isCollapsed ? "Logout" : undefined}
          >
            <div className="w-7 h-7 border-2 border-white rounded-full flex items-center justify-center">
              <LogOut className="w-4 h-4" />
            </div>
            {!isCollapsed && <span className="text-lg">Logout</span>}
          </button>
        </SidebarFooter>

      </SidebarContent>
    </Sidebar>
  );
}
