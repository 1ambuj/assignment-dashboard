import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarRail,
} from "@/components/ui/sidebar";
import { ChevronDown, ChevronRight, GalleryVerticalEnd } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { sidebarLinks as data } from "@/data/sidebarData";

export default function AppSidebar({ ...props }) {
  const location = useLocation();
  const [openItems, setOpenItems] = useState({}); 

  const toggleOpen = (id) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const isActive = (path) => location.pathname === path;

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold text-3xl">abun</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.map((item) => {
              const hasChildren = item.children && item.children.length > 0;
              const isOpen = !!openItems[item.id];

              return (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    asChild
                    onClick={() => hasChildren && toggleOpen(item.id)}
                    className="flex justify-between items-center w-full font-sm"
                  >
                    {hasChildren ? (
                      <button
                        type="button"
                        className="flex w-full justify-between items-center text-sm"
                      >
                        <span className="text-left text-sm">
                          <Link to={item.path} state={{ data: item }}>{item.title}</Link>
                        </span>
                        {isOpen ? (
                          <ChevronDown className="ml-auto size-4" />
                        ) : (
                          <ChevronRight className="ml-auto size-4" />
                        )}
                      </button>
                    ) : (
                      <Link to={item.path} className="text-sm">
                        {item.title}
                      </Link>
                    )}
                  </SidebarMenuButton>

                  {hasChildren && isOpen && (
                    <SidebarMenuSub className="pl-4 mt-1 space-y-1">
                      {item.children.map((child) => (
                        <SidebarMenuSubItem key={child.id}>
                          <SidebarMenuSubButton
                            asChild
                            isActive={isActive(child.path)}
                          >
                            <Link to={child.path} className="text-sm">
                              {child.title}
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
        </SidebarGroup>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
