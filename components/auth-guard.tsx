"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Loader2 } from "lucide-react"

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = () => {
      const publicPaths = ["/", "/login", "/signup"]
      
      const isPublicPath = publicPaths.includes(pathname) || pathname.startsWith("/chat")

      const token = localStorage.getItem("token")

      if (!token && !isPublicPath) {
        router.push("/login")
      } else if (token && (pathname === "/login" || pathname === "/signup")) {
        router.push("/dashboard")
      } else {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [pathname, router])

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return <>{children}</>
}
