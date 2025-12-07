"use client"

import { useState, useEffect } from "react"
import { Topbar, TopbarLeft, TopbarRight } from "@/components/ui/topbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { UserIcon } from "@/components/svg"
import { API_URL } from "@/lib/config"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

interface Chat {
  _id: string
  document: {
    _id: string
    title: string
    shareToken: string
  }
  updatedAt: string
  messages: {
    role: string
    content: string
  }[]
}

export default function ChatsPage() {
  const [chats, setChats] = useState<Chat[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  const fetchChats = async () => {
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        window.location.href = "/login"
        return
      }

      const res = await fetch(`${API_URL}/api/chats`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.ok) {
        const data = await res.json()
        setChats(data)
      }
    } catch (error) {
      console.error("Failed to fetch chats", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchChats()
  }, [])

  return (
    <>
      {/* Topbar */}
      <Topbar>
        <TopbarLeft>
          <h1 className="text-xl font-bold text-foreground">All Chats</h1>
        </TopbarLeft>
        <TopbarRight>
          <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
            <UserIcon />
          </div>
        </TopbarRight>
      </Topbar>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto p-8">
        <Card>
          <CardHeader>
            <CardTitle>Chat History</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : chats.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No chat history found.
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Document</TableHead>
                    <TableHead>Last Message</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {chats.map((chat) => (
                    <TableRow 
                      key={chat._id} 
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => {
                          if (chat.document?.shareToken) {
                              window.open(`/chat/${chat.document.shareToken}`, '_blank')
                          } else {
                              alert("Cannot open chat: Document share link not found.")
                          }
                      }}
                    >
                      <TableCell className="font-medium">
                        {chat.document?.title || "Untitled Document"}
                      </TableCell>
                      <TableCell className="max-w-md truncate">
                        {chat.messages[chat.messages.length - 1]?.content || "No messages"}
                      </TableCell>
                      <TableCell>
                        {new Date(chat.updatedAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={(e) => {
                                e.stopPropagation();
                                if (chat.document?.shareToken) {
                                    window.open(`/chat/${chat.document.shareToken}`, '_blank')
                                }
                            }}
                        >
                            Open
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  )
}
