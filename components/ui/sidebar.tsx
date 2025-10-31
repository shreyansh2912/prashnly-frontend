import * as React from "react"
import { cn } from "@/lib/utils"
import type { HTMLNavElement } from "react"

const Sidebar = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex h-screen w-64 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground",
        className,
      )}
      {...props}
    />
  ),
)
Sidebar.displayName = "Sidebar"

const SidebarHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("border-b border-sidebar-border px-6 py-4", className)} {...props} />
  ),
)
SidebarHeader.displayName = "SidebarHeader"

const SidebarContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex-1 overflow-y-auto px-4 py-6", className)} {...props} />
  ),
)
SidebarContent.displayName = "SidebarContent"

const SidebarFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("border-t border-sidebar-border px-6 py-4", className)} {...props} />
  ),
)
SidebarFooter.displayName = "SidebarFooter"

const SidebarNav = React.forwardRef<HTMLNavElement, React.HTMLAttributes<HTMLNavElement>>(
  ({ className, ...props }, ref) => <nav ref={ref} className={cn("flex flex-col gap-2", className)} {...props} />,
)
SidebarNav.displayName = "SidebarNav"

const SidebarNavItem = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement> & { isActive?: boolean }
>(({ className, isActive, ...props }, ref) => (
  <a
    ref={ref}
    className={cn(
      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200",
      isActive
        ? "bg-sidebar-primary text-sidebar-primary-foreground"
        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
      className,
    )}
    {...props}
  />
))
SidebarNavItem.displayName = "SidebarNavItem"

export { Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarNav, SidebarNavItem }
