"use client"
import { cn } from "@/lib/utils"

interface DocsSidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

const sections = [
  { id: "introduction", label: "Introduction" },
  { id: "quick-start", label: "Quick Start" },
  { id: "authentication", label: "Authentication" },
  { id: "api-reference", label: "API Reference" },
  { id: "sdk-methods", label: "SDK Methods" },
  { id: "embed-widget", label: "Embed Widget" },
  { id: "webhooks", label: "Webhooks" },
  { id: "error-codes", label: "Error Codes" },
  { id: "support", label: "Support" },
]

export function DocsSidebar({ activeSection, onSectionChange }: DocsSidebarProps) {
  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-64px)] w-64 border-r border-border bg-background overflow-y-auto">
      <nav className="p-6 space-y-1">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => onSectionChange(section.id)}
            className={cn(
              "w-full text-left px-4 py-2 rounded-md text-sm font-medium transition-all duration-200",
              activeSection === section.id
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/50"
                : "text-muted-foreground hover:text-foreground hover:bg-muted",
            )}
          >
            {section.label}
          </button>
        ))}
      </nav>
    </aside>
  )
}
