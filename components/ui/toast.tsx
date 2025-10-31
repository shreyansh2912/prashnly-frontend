import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const toastVariants = cva(
  "flex items-center gap-3 rounded-lg border border-border bg-card text-card-foreground px-4 py-3 shadow-lg animate-in fade-in slide-in-from-bottom-5 duration-300",
  {
    variants: {
      variant: {
        default: "border-border bg-card",
        success: "border-green-500/20 bg-green-500/10 text-green-700 dark:text-green-400",
        error: "border-destructive/20 bg-destructive/10 text-destructive",
        warning: "border-yellow-500/20 bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
        info: "border-primary/20 bg-primary/10 text-primary",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof toastVariants> {}

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(({ className, variant, ...props }, ref) => (
  <div ref={ref} className={cn(toastVariants({ variant }), className)} {...props} />
))
Toast.displayName = "Toast"

const ToastIcon = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("flex-shrink-0 text-lg", className)} {...props} />,
)
ToastIcon.displayName = "ToastIcon"

const ToastContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex-1 flex flex-col gap-1", className)} {...props} />
  ),
)
ToastContent.displayName = "ToastContent"

const ToastTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => <h3 ref={ref} className={cn("font-semibold text-sm", className)} {...props} />,
)
ToastTitle.displayName = "ToastTitle"

const ToastDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => <p ref={ref} className={cn("text-xs opacity-90", className)} {...props} />,
)
ToastDescription.displayName = "ToastDescription"

const ToastClose = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "flex-shrink-0 text-lg hover:opacity-70 transition-opacity duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
      {...props}
    />
  ),
)
ToastClose.displayName = "ToastClose"

export { Toast, ToastIcon, ToastContent, ToastTitle, ToastDescription, ToastClose, toastVariants }
