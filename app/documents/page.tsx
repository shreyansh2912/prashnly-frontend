"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Upload, File, Trash2, Eye, Zap, CheckCircle, Clock, AlertCircle } from "lucide-react"

interface Document {
  id: string
  name: string
  size: string
  uploadedAt: string
  status: "processing" | "trained" | "pending"
  progress?: number
}

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: "1",
      name: "Company_Policies_2024.pdf",
      size: "2.4 MB",
      uploadedAt: "2 hours ago",
      status: "trained",
    },
    {
      id: "2",
      name: "FAQ_Database.docx",
      size: "1.8 MB",
      uploadedAt: "1 day ago",
      status: "trained",
    },
    {
      id: "3",
      name: "Support_Guidelines.pdf",
      size: "3.1 MB",
      uploadedAt: "5 minutes ago",
      status: "processing",
      progress: 65,
    },
  ])

  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const files = e.dataTransfer.files
    if (files && files.length > 0) {
      handleFiles(files)
    }
  }

  const handleFiles = (files: FileList) => {
    Array.from(files).forEach((file) => {
      const newDoc: Document = {
        id: Date.now().toString(),
        name: file.name,
        size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
        uploadedAt: "just now",
        status: "processing",
        progress: 0,
      }

      setDocuments((prev) => [newDoc, ...prev])

      // Simulate upload progress
      let progress = 0
      const interval = setInterval(() => {
        progress += Math.random() * 30
        if (progress >= 100) {
          progress = 100
          clearInterval(interval)
          setDocuments((prev) =>
            prev.map((doc) => (doc.id === newDoc.id ? { ...doc, status: "trained", progress: 100 } : doc)),
          )
        } else {
          setDocuments((prev) => prev.map((doc) => (doc.id === newDoc.id ? { ...doc, progress } : doc)))
        }
      }, 500)
    })
  }

  const handleDelete = (id: string) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== id))
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "trained":
        return (
          <Badge variant="success" className="flex items-center gap-1">
            <CheckCircle className="h-3 w-3" />
            Trained
          </Badge>
        )
      case "processing":
        return (
          <Badge variant="warning" className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            Processing
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            Pending
          </Badge>
        )
    }
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Documents</h1>
          <p className="mt-2 text-muted-foreground">Upload and manage your documents for AI training</p>
        </div>

        {/* Upload Section */}
        <Card className="mb-8 border-2 border-dashed border-border">
          <CardContent className="p-8">
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`rounded-lg border-2 border-dashed p-12 text-center transition-all duration-200 ${
                dragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-muted/50"
              }`}
            >
              <div className="flex flex-col items-center gap-4">
                <div className="rounded-full bg-primary/10 p-4">
                  <Upload className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Drag and drop your documents</h3>
                  <p className="mt-1 text-sm text-muted-foreground">or click to browse (PDF, DOCX, TXT)</p>
                </div>
                <Button variant="default" onClick={() => fileInputRef.current?.click()} className="mt-4">
                  Select Files
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept=".pdf,.docx,.txt"
                  onChange={(e) => e.target.files && handleFiles(e.target.files)}
                  className="hidden"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Documents List */}
        <Card>
          <CardHeader>
            <CardTitle>Your Documents</CardTitle>
            <CardDescription>
              {documents.length} document{documents.length !== 1 ? "s" : ""} uploaded
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {documents.length === 0 ? (
                <div className="py-12 text-center">
                  <File className="mx-auto h-12 w-12 text-muted-foreground/50" />
                  <p className="mt-4 text-muted-foreground">No documents yet. Upload one to get started!</p>
                </div>
              ) : (
                documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex flex-col gap-3 rounded-lg border border-border bg-muted/30 p-4 transition-all duration-200 hover:bg-muted/50"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex flex-1 items-start gap-4">
                        <div className="rounded-lg bg-primary/10 p-2">
                          <File className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground">{doc.name}</h4>
                          <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                            <span>{doc.size}</span>
                            <span>•</span>
                            <span>Uploaded {doc.uploadedAt}</span>
                            <span>•</span>
                            {getStatusBadge(doc.status)}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" title="View document">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" title="Train AI">
                          <Zap className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(doc.id)}
                          title="Delete document"
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    {doc.status === "processing" && doc.progress !== undefined && (
                      <div className="mt-2 w-full">
                        <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
                          <span>Processing</span>
                          <span>{Math.round(doc.progress)}%</span>
                        </div>
                        <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-muted">
                          <div
                            className="h-full bg-gradient-to-r from-primary to-primary/70 transition-all duration-300"
                            style={{ width: `${doc.progress}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
