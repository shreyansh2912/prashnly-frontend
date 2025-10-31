"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "./button"
import { Check, Copy } from "lucide-react"

interface CodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {
  code: string
  language?: string
  showLineNumbers?: boolean
}

const CodeBlock = React.forwardRef<HTMLPreElement, CodeBlockProps>(
  ({ code, language = "javascript", showLineNumbers = false, className, ...props }, ref) => {
    const [copied, setCopied] = React.useState(false)

    const handleCopy = () => {
      navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }

    return (
      <div className="relative group">
        <pre
          ref={ref}
          className={cn(
            "bg-code-bg border border-code-border rounded-lg p-4 overflow-x-auto text-sm font-mono text-code-foreground",
            "shadow-lg hover:border-primary/50 transition-colors duration-200",
            className,
          )}
          {...props}
        >
          <code>{code}</code>
        </pre>
        <Button
          size="sm"
          variant="ghost"
          onClick={handleCopy}
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        </Button>
      </div>
    )
  },
)
CodeBlock.displayName = "CodeBlock"

export { CodeBlock }
