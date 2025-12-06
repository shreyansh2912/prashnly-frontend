"use client"

import { useState, useEffect } from "react"
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarNav,
  SidebarNavItem,
} from "@/components/ui/sidebar"
import { Topbar, TopbarLeft, TopbarRight } from "@/components/ui/topbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AnalyticsIcon, ArrowUpIcon, BellIcon, DashboardIcon, DocumentIcon, SettingsIcon, UserIcon } from "@/components/svg"
import { UploadModal } from "@/components/upload-modal"
import { API_URL } from "@/lib/config"
import { Loader2, ExternalLink } from "lucide-react"
import Link from "next/link"

interface Document {
  _id: string
  title: string
  status: string
  createdAt: string
  shareToken?: string
}

export default function DashboardPage() {
  const [activeNav, setActiveNav] = useState("dashboard")
  const [documents, setDocuments] = useState<Document[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchDocuments = async () => {
    try {
      const token = localStorage.getItem("token")
      if (!token) return // Handle auth redirect in real app

      const res = await fetch(`${API_URL}/api/documents`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.ok) {
        const data = await res.json()
        setDocuments(data)
      }
    } catch (error) {
      console.error("Failed to fetch docs", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchDocuments()
  }, [])

  // Mock KPI data (keep for UI)
  const kpis = [
    {
      title: "Total Documents",
      value: documents.length.toString(),
      change: "+1",
      trend: "up",
      description: "Uploaded files",
    },
    // ... keep other mock KPIs for visual fullness
    {
      title: "Avg Response Time",
      value: "245ms",
      change: "-8.2%",
      trend: "down",
      description: "Faster is better",
    },
    {
      title: "Accuracy Rate",
      value: "98.7%",
      change: "+2.1%",
      trend: "up",
      description: "Model performance",
    },
    {
      title: "Active Users",
      value: "3,421",
      change: "+18.3%",
      trend: "up",
      description: "This month",
    },
  ]

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
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
            <SidebarNavItem
              isActive={activeNav === "dashboard"}
              onClick={() => setActiveNav("dashboard")}
              className="cursor-pointer"
            >
              <DashboardIcon />
              <span>Dashboard</span>
            </SidebarNavItem>
            {/* ... other nav items */}
          </SidebarNav>
        </SidebarContent>

        <SidebarFooter>
          <div className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors cursor-pointer">
            <UserIcon />
            <span>Profile</span>
          </div>
        </SidebarFooter>
      </Sidebar>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Topbar */}
        <Topbar>
          <TopbarLeft>
            <h1 className="text-xl font-bold text-foreground">Dashboard</h1>
          </TopbarLeft>
          <TopbarRight>
            <Button variant="ghost" size="icon">
              <BellIcon />
            </Button>
            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
              <UserIcon />
            </div>
          </TopbarRight>
        </Topbar>

        {/* Main Content Area */}
        <div className="flex-1 overflow-auto">
          <div className="p-8">
            {/* KPI Cards */}
            <div className="mb-8">
              <h2 className="mb-4 text-lg font-semibold text-foreground">Key Metrics</h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                {kpis.map((kpi, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-muted-foreground">{kpi.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-end justify-between">
                        <div>
                          <div className="text-2xl font-bold text-foreground">{kpi.value}</div>
                          <p className="text-xs text-muted-foreground mt-1">{kpi.description}</p>
                        </div>
                        <div
                          className={`flex items-center gap-1 text-sm font-semibold ${
                            kpi.trend === "up" ? "text-green-500" : "text-red-500"
                          }`}
                        >
                          <ArrowUpIcon />
                          {kpi.change}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Quick Actions & Recent Activity */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {/* Quick Actions */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common tasks</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <UploadModal onUploadComplete={fetchDocuments} />
                  
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <AnalyticsIcon />
                    View Analytics
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <SettingsIcon />
                    Configure AI
                  </Button>
                </CardContent>
              </Card>

              {/* Recent Activity / Documents List */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Your Documents</CardTitle>
                  <CardDescription>Manage your knowledge base</CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  ) : documents.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      No documents uploaded yet.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {documents.map((doc) => (
                        <div
                          key={doc._id}
                          className="flex items-start gap-4 pb-4 border-b border-border last:border-0 last:pb-0"
                        >
                          <div className="mt-1">
                             <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                               <DocumentIcon />
                             </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <p className="text-sm font-medium text-foreground">{doc.title}</p>
                              <Badge
                                variant={
                                  doc.status === "completed"
                                  ? "default"
                                  : doc.status === "processing" ? "secondary" : "destructive"
                                }
                                className="text-xs"
                                >
                                {/* {console.log(doc.shareToken)}            */}
                                {doc.status}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-4 mt-1">
                                <p className="text-xs text-muted-foreground">
                                    {new Date(doc.createdAt).toLocaleDateString()}
                                </p>
                                {doc.shareToken && (
                                    <Link 
                                        href={`/chat/${doc.shareToken}`} 
                                        target="_blank"
                                        className="text-xs text-primary flex items-center gap-1 hover:underline"
                                    >
                                        Open Chat <ExternalLink className="w-3 h-3" />
                                    </Link>
                                )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
