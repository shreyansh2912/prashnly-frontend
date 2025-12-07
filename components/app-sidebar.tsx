"use client"

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarNav,
  SidebarNavItem,
} from "@/components/ui/sidebar"
import { AnalyticsIcon, DashboardIcon, DocumentIcon, SettingsIcon, UserIcon } from "@/components/svg"
import { LogOut, MessageSquare } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function AppSidebar() {
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path || pathname?.startsWith(`${path}/`)

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold">
            P
          </div>
          <span className="font-bold text-foreground">Prashnly</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarNav>
          <Link href="/dashboard">
            <SidebarNavItem
              isActive={isActive("/dashboard")}
              className="cursor-pointer"
            >
              <DashboardIcon />
              <span>Dashboard</span>
            </SidebarNavItem>
          </Link>
          
          <Link href="/chats">
            <SidebarNavItem
              isActive={isActive("/chats")}
              className="cursor-pointer"
            >
              <div className="h-4 w-4 flex items-center justify-center">
                <MessageSquare className="h-4 w-4" />
              </div>
              <span>Chats</span>
            </SidebarNavItem>
          </Link>

          <Link href="/usage">
            <SidebarNavItem
              isActive={isActive("/usage")}
              className="cursor-pointer"
            >
              <AnalyticsIcon />
              <span>Usage & Tokens</span>
            </SidebarNavItem>
          </Link>

          <Link href="/settings">
            <SidebarNavItem
              isActive={isActive("/settings")}
              className="cursor-pointer"
            >
              <SettingsIcon />
              <span>Settings</span>
            </SidebarNavItem>
          </Link>
        </SidebarNav>
      </SidebarContent>

      <SidebarFooter>
        <div className="flex flex-col gap-2">
            <Link href="/settings">
                <div className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors cursor-pointer ${isActive('/settings') ? 'bg-sidebar-accent text-sidebar-accent-foreground' : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'}`}>
                    <UserIcon />
                    <span>Profile</span>
                </div>
            </Link>
            <AlertDialog>
            <AlertDialogTrigger asChild>
                <div className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors cursor-pointer w-full">
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
                </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
                <AlertDialogDescription>
                    You will be redirected to the login page.
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => {
                    localStorage.removeItem("token")
                    window.location.href = "/login"
                }}>
                    Logout
                </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
            </AlertDialog>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
