"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Toast, ToastIcon, ToastContent, ToastTitle, ToastDescription, ToastClose } from "@/components/ui/toast"

interface QAPair {
  id: string
  question: string
  answer: string
}

export default function CreateDocumentPage() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [qaPairs, setQaPairs] = useState<QAPair[]>([{ id: "1", question: "", answer: "" }])
  const [tags, setTags] = useState("")
  const [showToast, setShowToast] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const addQAPair = () => {
    const newId = Math.max(...qaPairs.map((p) => Number.parseInt(p.id)), 0) + 1
    setQaPairs([...qaPairs, { id: newId.toString(), question: "", answer: "" }])
  }

  const removeQAPair = (id: string) => {
    if (qaPairs.length > 1) {
      setQaPairs(qaPairs.filter((pair) => pair.id !== id))
    }
  }

  const updateQAPair = (id: string, field: "question" | "answer", value: string) => {
    setQaPairs(qaPairs.map((pair) => (pair.id === id ? { ...pair, [field]: value } : pair)))
  }

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 4000)
  }

  const isFormValid = title.trim() && description.trim() && qaPairs.some((p) => p.question.trim() && p.answer.trim())

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Create New Document</h1>
          <p className="text-muted-foreground">Add company policies and FAQs to train your AI assistant</p>
        </div>

        {/* Main Form */}
        <div className="space-y-6">
          {/* Basic Information */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Document title and description</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Document Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Return Policy 2024"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-input"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <textarea
                  id="description"
                  placeholder="Describe what this document covers..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="flex min-h-24 w-full rounded-md border border-input bg-input px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                />
              </div>
            </CardContent>
          </Card>

          {/* Q&A Pairs */}
          <Card className="border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Questions & Answers</CardTitle>
                  <CardDescription>Add Q&A pairs to train the AI</CardDescription>
                </div>
                <Button
                  onClick={addQAPair}
                  variant="secondary"
                  size="sm"
                  className="bg-primary/10 text-primary hover:bg-primary/20"
                >
                  + Add Q&A
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {qaPairs.map((pair, index) => (
                <div key={pair.id} className="space-y-3 p-4 rounded-lg border border-border/50 bg-muted/30">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-muted-foreground">Pair {index + 1}</span>
                    {qaPairs.length > 1 && (
                      <Button
                        onClick={() => removeQAPair(pair.id)}
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`question-${pair.id}`} className="text-xs">
                      Question
                    </Label>
                    <Input
                      id={`question-${pair.id}`}
                      placeholder="What is your return policy?"
                      value={pair.question}
                      onChange={(e) => updateQAPair(pair.id, "question", e.target.value)}
                      className="bg-input"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`answer-${pair.id}`} className="text-xs">
                      Answer
                    </Label>
                    <textarea
                      id={`answer-${pair.id}`}
                      placeholder="Provide a detailed answer..."
                      value={pair.answer}
                      onChange={(e) => updateQAPair(pair.id, "answer", e.target.value)}
                      className="flex min-h-20 w-full rounded-md border border-input bg-input px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Tags */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Tags</CardTitle>
              <CardDescription>Add tags to categorize this document</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="tags">Tags (comma-separated)</Label>
                <Input
                  id="tags"
                  placeholder="e.g., policy, returns, shipping"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="bg-input"
                />
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-3 justify-end">
            <Button variant="outline" className="border-border bg-transparent">
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={!isFormValid || isSaving}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {isSaving ? "Saving..." : "Save Document"}
            </Button>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50">
          <Toast variant="success" className="border-green-500/20 bg-green-500/10">
            <ToastIcon>✓</ToastIcon>
            <ToastContent>
              <ToastTitle>Document Created Successfully</ToastTitle>
              <ToastDescription>Your document has been saved and is ready for training.</ToastDescription>
            </ToastContent>
            <ToastClose onClick={() => setShowToast(false)}>×</ToastClose>
          </Toast>
        </div>
      )}
    </div>
  )
}
