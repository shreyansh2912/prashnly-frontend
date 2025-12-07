"use client"

import { useState, useEffect } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UsageProgress } from "@/components/usage-progress"
import { UsageHistory } from "@/components/usage-history"
import { API_URL } from "@/lib/config"
import { Loader2 } from "lucide-react"

export default function UsagePage() {
  const [analyticsData, setAnalyticsData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const token = localStorage.getItem("token")
        const res = await fetch(`${API_URL}/api/analytics`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (res.ok) {
          const data = await res.json()
          setAnalyticsData(data)
        }
      } catch (error) {
        console.error("Failed to fetch analytics:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchAnalytics()
  }, [])

  const tokensLeft = analyticsData 
    ? (analyticsData.plan === 'enterprise' ? 'Unlimited' : Math.max(0, analyticsData.maxTokens - analyticsData.tokensUsed).toLocaleString()) 
    : '...'

  return (
    <div className="flex h-screen bg-background">
      <AppSidebar activeItem="usage" />
      <div className="flex-1 overflow-auto p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Usage & Tokens</h1>
            <p className="text-muted-foreground mt-2">
              Track your token consumption and remaining balance.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : analyticsData ? (
            <div className="space-y-6">
                {/* Summary Cards */}
                <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Tokens Left</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{tokensLeft}</div>
                            <p className="text-xs text-muted-foreground">
                                Resets next billing cycle
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Current Plan</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold capitalize">{analyticsData.plan}</div>
                            <p className="text-xs text-muted-foreground">
                                {analyticsData.plan === 'basic' ? 'Upgrade for more tokens' : 'Premium features unlocked'}
                            </p>
                        </CardContent>
                    </Card>
                </div>

              <Card className="border-border">
                <CardHeader>
                  <CardTitle>Usage Overview</CardTitle>
                  <CardDescription>Monitor your token consumption</CardDescription>
                </CardHeader>
                <CardContent>
                    <UsageProgress 
                      used={analyticsData.tokensUsed} 
                      max={analyticsData.maxTokens} 
                      plan={analyticsData.plan} 
                    />
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader>
                  <CardTitle>Usage History</CardTitle>
                  <CardDescription>Recent activity</CardDescription>
                </CardHeader>
                <CardContent>
                    <UsageHistory history={analyticsData.history} />
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
                Failed to load usage data.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
