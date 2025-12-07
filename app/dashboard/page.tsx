"use client"

import { useState, useEffect } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { Topbar, TopbarLeft, TopbarRight } from "@/components/ui/topbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AnalyticsIcon, ArrowUpIcon, BellIcon, DashboardIcon, DocumentIcon, SettingsIcon, UserIcon } from "@/components/svg"
import { UploadModal } from "@/components/upload-modal"
import { API_URL } from "@/lib/config"
import { Loader2, ExternalLink, Trash2, LogOut } from "lucide-react"
import Link from "next/link"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"

interface Document {
  _id: string
  title: string
  status: string
  createdAt: string
  shareToken?: string
  visibility?: string
  isActive?: boolean
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

  const handleDelete = async (id: string) => {

    try {
        const token = localStorage.getItem("token")
        const res = await fetch(`${API_URL}/api/documents/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
        })

        if (res.ok) {
            setDocuments((prev) => prev.filter((doc) => doc._id !== id))
        } else {
            alert("Failed to delete document")
        }
    } catch (error) {
        console.error("Delete failed", error)
        alert("An error occurred while deleting")
    }
  }

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    // Optimistic update
    setDocuments((prev) =>
      prev.map((doc) =>
        doc._id === id ? { ...doc, isActive: !currentStatus } : doc
      )
    )

    try {
      const token = localStorage.getItem("token")
      const res = await fetch(`${API_URL}/api/documents/${id}/status`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      })

      if (!res.ok) {
        // Revert on failure
        setDocuments((prev) =>
          prev.map((doc) =>
            doc._id === id ? { ...doc, isActive: currentStatus } : doc
          )
        )
        alert("Failed to update status")
      }
    } catch (error) {
      console.error("Toggle status failed", error)
      // Revert on error
      setDocuments((prev) =>
        prev.map((doc) =>
          doc._id === id ? { ...doc, isActive: currentStatus } : doc
        )
      )
      alert("An error occurred while updating status")
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
      <AppSidebar activeItem="dashboard" />

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
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Visibility</TableHead>
                          <TableHead>Active</TableHead>
                          <TableHead>Created At</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {documents.map((doc) => (
                          <TableRow key={doc._id}>
                            <TableCell className="font-medium">
                                <div className="flex items-center gap-2">
                                    <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                                        <DocumentIcon />
                                    </div>
                                    <span className="truncate max-w-[200px]" title={doc.title}>{doc.title}</span>
                                </div>
                            </TableCell>
                            <TableCell>
                                <Badge
                                    variant={
                                    doc.status === "completed"
                                    ? "default"
                                    : doc.status === "processing" ? "secondary" : "destructive"
                                    }
                                    className="text-xs"
                                    >
                                    {doc.status}
                                </Badge>
                            </TableCell>
                            <TableCell className="capitalize">{doc.visibility || 'private'}</TableCell>
                            <TableCell>
                                <Switch 
                                    checked={doc.isActive !== false} 
                                    onCheckedChange={() => handleToggleActive(doc._id, doc.isActive !== false)}
                                />
                            </TableCell>
                            <TableCell>{new Date(doc.createdAt).toLocaleDateString()}</TableCell>
                            <TableCell className="text-right">
                                <div className="flex items-center justify-end gap-2">
                                    {doc.shareToken && (
                                        <Link 
                                            href={`/chat/${doc.shareToken}`} 
                                            target="_blank"
                                        >
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-primary">
                                                <ExternalLink className="h-4 w-4" />
                                            </Button>
                                        </Link>
                                    )}
                                    <AlertDialog>
                                      <AlertDialogTrigger asChild>
                                        <Button 
                                            variant="ghost" 
                                            size="icon" 
                                            className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                      </AlertDialogTrigger>
                                      <AlertDialogContent>
                                        <AlertDialogHeader>
                                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                          <AlertDialogDescription>
                                            This action cannot be undone. This will permanently delete your document
                                            and remove it from our servers.
                                          </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                                          <AlertDialogAction onClick={() => handleDelete(doc._id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Delete</AlertDialogAction>
                                        </AlertDialogFooter>
                                      </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
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
