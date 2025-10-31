import * as React from "react"
import { cn } from "@/lib/utils"

interface ChatBubbleProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "user" | "assistant"
  timestamp?: string
}

const ChatBubble = React.forwardRef<HTMLDivElement, ChatBubbleProps>(
  ({ className, variant = "assistant", timestamp, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex gap-3 mb-4", variant === "user" ? "flex-row-reverse" : "flex-row", className)}
      {...props}
    />
  ),
)
ChatBubble.displayName = "ChatBubble"

const ChatBubbleAvatar = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-semibold flex-shrink-0",
        className,
      )}
      {...props}
    />
  ),
)
ChatBubbleAvatar.displayName = "ChatBubbleAvatar"

const ChatBubbleContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { variant?: "user" | "assistant" }
>(({ className, variant = "assistant", ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col gap-1 max-w-xs", className)} {...props} />
))
ChatBubbleContent.displayName = "ChatBubbleContent"

const ChatBubbleMessage = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { variant?: "user" | "assistant" }
>(({ className, variant = "assistant", ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg px-4 py-2 text-sm",
      variant === "user"
        ? "bg-primary text-primary-foreground rounded-br-none"
        : "bg-muted text-foreground rounded-bl-none",
      className,
    )}
    {...props}
  />
))
ChatBubbleMessage.displayName = "ChatBubbleMessage"

const ChatBubbleTimestamp = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <span ref={ref} className={cn("text-xs text-muted-foreground px-2", className)} {...props} />
  ),
)
ChatBubbleTimestamp.displayName = "ChatBubbleTimestamp"

export { ChatBubble, ChatBubbleAvatar, ChatBubbleContent, ChatBubbleMessage, ChatBubbleTimestamp }
