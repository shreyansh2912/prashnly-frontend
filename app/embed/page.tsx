"use client"

import { useState, useRef, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleContent,
  ChatBubbleMessage,
} from "@/components/ui/chat-bubble"
import { Loader2, Send } from "lucide-react"
import { API_URL } from "@/lib/config"

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: string
}

export default function EmbedPage() {
  const searchParams = useSearchParams()
  const apiKey = searchParams.get("apiKey")
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content: "Hi! How can I help you today?",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    try {
      // Note: In a real app, we shouldn't pass the API key directly to the frontend like this
      // if it's a secret key. But for a public widget key, it's acceptable.
      // We need to make sure the backend accepts this key.
      
      // We'll assume the backend has a middleware to handle API Key auth or we pass it in header
      // For this prototype, we'll assume the backend can validate the key.
      
      // However, my current backend middleware expects 'Bearer token'. 
      // I might need to update authMiddleware to accept 'x-api-key' header.
      
      const res = await fetch(`${API_URL}/api/chat`, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}` // Using the key as a bearer token for now (hacky)
            // Ideally: "x-api-key": apiKey
        },
        body: JSON.stringify({
          question: userMessage.content,
          // No documentId or shareToken means "search all my docs"
        }),
      })

      const data = await res.json()

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: data.answer || "Sorry, I encountered an error.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error(error)
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          type: "assistant",
          content: "Error: Could not connect to the server.",
          timestamp: new Date().toLocaleTimeString(),
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (!apiKey) {
    return <div className="p-4 text-red-500">Error: API Key missing.</div>
  }

  return (
    <div className="flex h-full flex-col bg-background">
      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <ChatBubble key={message.id} variant={message.type}>
              <ChatBubbleAvatar>{message.type === "user" ? "You" : "AI"}</ChatBubbleAvatar>
              <ChatBubbleContent variant={message.type}>
                <ChatBubbleMessage variant={message.type}>{message.content}</ChatBubbleMessage>
              </ChatBubbleContent>
            </ChatBubble>
          ))}
          {isLoading && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-border bg-background p-3">
        <div className="flex gap-2">
          <Input
            placeholder="Ask..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            className="flex-1 h-9"
          />
          <Button size="sm" onClick={handleSendMessage} disabled={isLoading || !inputValue.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
