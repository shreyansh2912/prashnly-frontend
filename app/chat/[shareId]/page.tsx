"use client"

import { useState, useRef, useEffect } from "react"
import { useParams, useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleContent,
  ChatBubbleMessage,
  ChatBubbleTimestamp,
} from "@/components/ui/chat-bubble"
import { Loader2, Send, MessageSquarePlus } from "lucide-react"
import { API_URL } from "@/lib/config"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: string
}

export default function PublicChatPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()
  const shareToken = params.shareId as string
  const chatId = searchParams.get('chatId')
  
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isChatStarted, setIsChatStarted] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Load Chat History if chatId exists
  useEffect(() => {
    if (chatId) {
      setIsChatStarted(true)
      fetchChatHistory(chatId)
    } else {
      setIsChatStarted(false)
      setMessages([
        {
          id: "1",
          type: "assistant",
          content: "Hello! Ask me anything about this document.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ])
    }
  }, [chatId])

  const fetchChatHistory = async (id: string) => {
    try {
      setIsLoading(true)
      const res = await fetch(`${API_URL}/api/chat/${id}?shareToken=${shareToken}`)
      if (!res.ok) throw new Error("Failed to load chat history")
      
      const history = await res.json()
      
      const formattedMessages: Message[] = history.map((msg: any) => ({
        id: msg._id,
        type: msg.role,
        content: msg.content,
        timestamp: new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }))

      setMessages(formattedMessages)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleStartChat = () => {
    setIsChatStarted(true)
  }

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
      const res = await fetch(`${API_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: userMessage.content,
          shareToken: shareToken,
          chatId: chatId, // Send chatId if it exists
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

      // If this was a new chat, update the URL with the new chatId
      if (!chatId && data.chatId) {
        router.push(`/chat/${shareToken}?chatId=${data.chatId}`)
      }

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

  if (!isChatStarted) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-background p-4">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center mx-auto shadow-lg">
            <span className="text-primary-foreground font-bold text-4xl">P</span>
          </div>
          <h1 className="text-3xl font-bold">Welcome to Prashnly</h1>
          <p className="text-muted-foreground">
            Start a new conversation to ask questions about this document. Your chat history will be saved.
          </p>
          <Button size="lg" className="w-full" onClick={handleStartChat}>
            <MessageSquarePlus className="mr-2 h-5 w-5" />
            Start New Chat
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Header */}
      <div className="border-b border-border bg-background px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">P</span>
          </div>
          <span className="font-bold text-xl">Prashnly Chat</span>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.map((message) => (
            <ChatBubble key={message.id} variant={message.type}>
              <ChatBubbleAvatar>{message.type === "user" ? "You" : "AI"}</ChatBubbleAvatar>
              <ChatBubbleContent variant={message.type}>
                <div className={`prose dark:prose-invert max-w-none ${message.type === 'user' ? 'text-primary-foreground' : ''}`}>
                    {message.type === 'assistant' ? (
                      <div className="bg-blue-200 p-2 rounded-lg rounded-bl-none">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {message.content}
                        </ReactMarkdown>
                        </div>
                    ) : (
                        <ChatBubbleMessage variant={message.type}>{message.content}</ChatBubbleMessage>
                    )}
                </div>
                <ChatBubbleTimestamp>{message.timestamp}</ChatBubbleTimestamp>
              </ChatBubbleContent>
            </ChatBubble>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
               <div className="bg-muted rounded-lg p-3 flex items-center gap-2">
                 <Loader2 className="h-4 w-4 animate-spin" />
                 <span className="text-sm text-muted-foreground">Thinking...</span>
               </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-border bg-background p-4">
        <div className="max-w-3xl mx-auto flex gap-2">
          <Input
            placeholder="Ask a question about the document..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            className="flex-1"
          />
          <Button onClick={handleSendMessage} disabled={isLoading || !inputValue.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <div className="text-center mt-2">
            <p className="text-xs text-muted-foreground">Powered by Prashnly</p>
        </div>
      </div>
    </div>
  )
}
