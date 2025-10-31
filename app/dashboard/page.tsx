"use client"

import { useState } from "react"
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

export default function DashboardPage() {
  const [activeNav, setActiveNav] = useState("dashboard")

  // Mock data
  const kpis = [
    {
      title: "Total Questions",
      value: "12,458",
      change: "+12.5%",
      trend: "up",
      description: "Last 30 days",
    },
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

  const recentActivity = [
    {
      id: 1,
      type: "question",
      title: "New question from customer",
      description: "How do I reset my password?",
      time: "2 minutes ago",
      status: "answered",
    },
    {
      id: 2,
      type: "document",
      title: "Document uploaded",
      description: "Q3_2024_Policy_Updates.pdf",
      time: "15 minutes ago",
      status: "processing",
    },
    {
      id: 3,
      type: "question",
      title: "New question from customer",
      description: "What are your business hours?",
      time: "1 hour ago",
      status: "answered",
    },
    {
      id: 4,
      type: "document",
      title: "Document processed",
      description: "FAQ_Database_v2.pdf",
      time: "3 hours ago",
      status: "completed",
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
            <SidebarNavItem
              isActive={activeNav === "documents"}
              onClick={() => setActiveNav("documents")}
              className="cursor-pointer"
            >
              <DocumentIcon />
              <span>Documents</span>
            </SidebarNavItem>
            <SidebarNavItem
              isActive={activeNav === "analytics"}
              onClick={() => setActiveNav("analytics")}
              className="cursor-pointer"
            >
              <AnalyticsIcon />
              <span>Analytics</span>
            </SidebarNavItem>
            <SidebarNavItem
              isActive={activeNav === "settings"}
              onClick={() => setActiveNav("settings")}
              className="cursor-pointer"
            >
              <SettingsIcon />
              <span>Settings</span>
            </SidebarNavItem>
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
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <DocumentIcon />
                    Upload Document
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <AnalyticsIcon />
                    View Analytics
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <SettingsIcon />
                    Configure AI
                  </Button>
                  <Button variant="default" className="w-full justify-start bg-primary hover:bg-primary/90">
                    <DocumentIcon />
                    New Project
                  </Button>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest events from your workspace</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-start gap-4 pb-4 border-b border-border last:border-0 last:pb-0"
                      >
                        <div className="mt-1">
                          {activity.type === "question" ? (
                            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                              <svg
                                className="h-4 w-4 text-primary"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                            </div>
                          ) : (
                            <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                              <DocumentIcon />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <p className="text-sm font-medium text-foreground">{activity.title}</p>
                            <Badge
                              variant={
                                activity.status === "answered" || activity.status === "completed"
                                  ? "default"
                                  : "secondary"
                              }
                              className="text-xs"
                            >
                              {activity.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground truncate">{activity.description}</p>
                          <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
