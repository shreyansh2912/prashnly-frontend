import * as React from "react"
import { cn } from "@/lib/utils"

const Topbar = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex h-16 items-center justify-between border-b border-border bg-background px-6 shadow-sm",
        className,
      )}
      {...props}
    />
  ),
)
Topbar.displayName = "Topbar"

const TopbarLeft = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("flex items-center gap-4", className)} {...props} />,
)
TopbarLeft.displayName = "TopbarLeft"

const TopbarCenter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-1 items-center justify-center", className)} {...props} />
  ),
)
TopbarCenter.displayName = "TopbarCenter"

const TopbarRight = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("flex items-center gap-4", className)} {...props} />,
)
TopbarRight.displayName = "TopbarRight"

export { Topbar, TopbarLeft, TopbarCenter, TopbarRight }
