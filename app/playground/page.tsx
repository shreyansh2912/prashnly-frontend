"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleContent,
  ChatBubbleMessage,
  ChatBubbleTimestamp,
} from "@/components/ui/chat-bubble"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: string
  isTyping?: boolean
}

interface Document {
  id: string
  name: string
  type: string
}

export default function PlaygroundPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content: "Hello! I'm Prashnly, your AI-powered FAQ assistant. How can I help you today?",
      timestamp: "10:30 AM",
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const documents: Document[] = [
    { id: "1", name: "Privacy Policy", type: "PDF" },
    { id: "2", name: "Terms of Service", type: "PDF" },
    { id: "3", name: "User Guide", type: "DOC" },
    { id: "4", name: "API Documentation", type: "MD" },
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    // Simulate typing animation
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content:
          "Based on the documents you've provided, I can help answer that question. This is a simulated response showing how Prashnly processes your queries using the uploaded documents.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 2000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-screen flex-col">
        {/* Header */}
        <div className="border-b border-border bg-background px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Chat Playground</h1>
              <p className="text-sm text-muted-foreground">Test Prashnly with your documents</p>
            </div>
            <Button variant="outline" size="sm">
              Clear Chat
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-1 gap-6 overflow-hidden p-6">
          {/* Chat Area */}
          <div className="flex flex-1 flex-col">
            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto rounded-lg border border-border bg-muted/30 p-6 mb-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <ChatBubble key={message.id} variant={message.type}>
                    <ChatBubbleAvatar>{message.type === "user" ? "You" : "AI"}</ChatBubbleAvatar>
                    <ChatBubbleContent variant={message.type}>
                      <ChatBubbleMessage variant={message.type}>{message.content}</ChatBubbleMessage>
                      <ChatBubbleTimestamp>{message.timestamp}</ChatBubbleTimestamp>
                    </ChatBubbleContent>
                  </ChatBubble>
                ))}

                {/* Typing Animation */}
                {isLoading && (
                  <ChatBubble variant="assistant">
                    <ChatBubbleAvatar>AI</ChatBubbleAvatar>
                    <ChatBubbleContent variant="assistant">
                      <ChatBubbleMessage variant="assistant">
                        <div className="flex gap-1">
                          <span
                            className="inline-block h-2 w-2 rounded-full bg-foreground/60 animate-bounce"
                            style={{ animationDelay: "0ms" }}
                          />
                          <span
                            className="inline-block h-2 w-2 rounded-full bg-foreground/60 animate-bounce"
                            style={{ animationDelay: "150ms" }}
                          />
                          <span
                            className="inline-block h-2 w-2 rounded-full bg-foreground/60 animate-bounce"
                            style={{ animationDelay: "300ms" }}
                          />
                        </div>
                      </ChatBubbleMessage>
                    </ChatBubbleContent>
                  </ChatBubble>
                )}

                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input Area */}
            <div className="space-y-3">
              {/* Document References */}
              <div className="flex flex-wrap gap-2">
                {documents.map((doc) => (
                  <Badge key={doc.id} variant="default" className="cursor-pointer hover:bg-primary/20">
                    📄 {doc.name}
                  </Badge>
                ))}
              </div>

              {/* Message Input */}
              <div className="flex gap-2">
                <Input
                  placeholder="Ask a question about your documents..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} disabled={isLoading || !inputValue.trim()} className="px-6">
                  Send
                </Button>
              </div>
            </div>
          </div>

          {/* Sidebar - Document Info */}
          <div className="w-80 hidden lg:flex flex-col gap-4">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg">Active Documents</CardTitle>
                <CardDescription>Files being referenced in this chat</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between rounded-lg border border-border/50 bg-muted/50 p-3"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg">📄</span>
                        <div>
                          <p className="text-sm font-medium text-foreground">{doc.name}</p>
                          <p className="text-xs text-muted-foreground">{doc.type}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        ✕
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg">Quick Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Ask specific questions about your documents</li>
                  <li>• Use natural language for best results</li>
                  <li>• Reference document names for clarity</li>
                  <li>• Prashnly learns from your interactions</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
