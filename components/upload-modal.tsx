import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { API_URL } from "@/lib/config"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, Loader2, Eye, EyeOff } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { io } from "socket.io-client"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface UploadModalProps {
  onUploadComplete: () => void
}

export function UploadModal({ onUploadComplete }: UploadModalProps) {
  const [file, setFile] = useState<File | null>(null)
  const [title, setTitle] = useState("")
  const [visibility, setVisibility] = useState("private")
  const [protectionType, setProtectionType] = useState("none")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [progress, setProgress] = useState(0)
  const [statusMessage, setStatusMessage] = useState("")

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      if (!title) {
        setTitle(e.target.files[0].name)
      }
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setIsLoading(true)
    setProgress(0)
    setStatusMessage("Starting upload...")
    
    const formData = new FormData()
    formData.append("file", file)
    formData.append("title", title)
    formData.append("visibility", visibility)
    formData.append("protectionType", protectionType)
    if (protectionType === "password") {
        formData.append("password", password)
    }

    try {
      const token = localStorage.getItem("token") // Assuming token is stored here
      const res = await fetch(`${API_URL}/api/documents/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })

      if (!res.ok) throw new Error("Upload failed")

      const data = await res.json()
      const documentId = data._id

      // Connect to Socket.io
      const socket = io(API_URL)

      socket.on(`uploadProgress:${documentId}`, (data: { progress: number, message: string }) => {
        setProgress(data.progress)
        setStatusMessage(data.message)

        if (data.progress === 100) {
            setTimeout(() => {
                setIsOpen(false)
                setFile(null)
                setTitle("")
                setVisibility("private")
                setProtectionType("none")
                setPassword("")
                setProgress(0)
                setStatusMessage("")
                socket.disconnect()
                onUploadComplete()
                setIsLoading(false)
            }, 1000)
        }
      })

    } catch (error) {
      console.error(error)
      alert("Failed to upload document")
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Upload className="mr-2 h-4 w-4" />
          Upload Document
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload Document</DialogTitle>
          <DialogDescription>
            Upload a PDF or text file. Configure security settings below.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="document">Document</Label>
            <Input id="document" type="file" onChange={handleFileChange} accept=".pdf,.txt,.doc,.docx" disabled={isLoading} />
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="title">Title</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Document Title" disabled={isLoading} />
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label>Visibility</Label>
            <Select value={visibility} onValueChange={setVisibility} disabled={isLoading}>
              <SelectTrigger>
                <SelectValue placeholder="Select visibility" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">Public</SelectItem>
                <SelectItem value="private">Private</SelectItem>
                <SelectItem value="protected">Protected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {visibility === "protected" && (
            <div className="grid w-full max-w-sm items-center gap-3 border p-3 rounded-md">
                <Label>Protection Type</Label>
                <RadioGroup value={protectionType} onValueChange={setProtectionType} className="flex gap-4">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="otp" id="otp" />
                        <Label htmlFor="otp">OTP</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="password" id="password" />
                        <Label htmlFor="password">Password</Label>
                    </div>
                </RadioGroup>

                {protectionType === "password" && (
                    <div className="mt-2 relative">
                        <Label htmlFor="password-input">Set Password</Label>
                        <div className="relative">
                            <Input 
                                id="password-input" 
                                type={showPassword ? "text" : "password"} 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                placeholder="Enter password"
                                disabled={isLoading}
                                className="pr-10"
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                                ) : (
                                    <Eye className="h-4 w-4 text-muted-foreground" />
                                )}
                            </Button>
                        </div>
                        {password && (
                            <div className="text-xs mt-1">
                                Strength: <span className={password.length > 8 ? "text-green-500" : "text-red-500"}>{password.length > 8 ? "Strong" : "Weak"}</span>
                            </div>
                        )}
                    </div>
                )}
            </div>
          )}
          
          {isLoading && (
            <div className="space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{statusMessage}</span>
                    <span>{progress}%</span>
                </div>
                <Progress value={progress} />
            </div>
          )}

        </div>
        <DialogFooter>
          <Button onClick={handleUpload} disabled={!file || isLoading || (visibility === 'protected' && protectionType === 'password' && !password)}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? "Processing..." : "Upload"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
