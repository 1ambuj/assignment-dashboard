
import Sidebar from "@/components/Sidebar"
import { Outlet } from "react-router-dom"
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar"

export default function MainLayout() {
  return (
  <SidebarProvider className="flex">
  <Sidebar />
  <main className="flex-1 overflow-auto relative">
      <Outlet />
    <SidebarTrigger className="absolute top-0 left-0" />
  </main>
</SidebarProvider>

  )
}
