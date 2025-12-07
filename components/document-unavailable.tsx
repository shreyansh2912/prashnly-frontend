import { FileX, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function DocumentUnavailable() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-center">
      <div className="relative mb-8 animate-bounce">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-muted">
          <FileX className="h-12 w-12 text-muted-foreground" />
        </div>
        <div className="absolute -bottom-2 -right-2 flex h-10 w-10 items-center justify-center rounded-full bg-destructive ring-4 ring-background">
          <Lock className="h-5 w-5 text-destructive-foreground" />
        </div>
      </div>

      <div className="max-w-md space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <h1 className="text-3xl font-bold tracking-tight">Document Unavailable</h1>
        <p className="text-muted-foreground">
          This document is currently inactive or has been made private by the owner. 
          Please contact the document owner if you believe this is a mistake.
        </p>
        
        <div className="pt-4">
          <Link href="/">
            <Button variant="outline" className="min-w-[140px]">
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
