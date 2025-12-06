"use client"

import { useState, useEffect } from "react"
import { Search, Copy, Check, ChevronRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Topbar, TopbarLeft, TopbarRight } from "@/components/ui/topbar"
import { API_URL } from "@/lib/config"

interface DocSection {
  id: string
  title: string
  content: string
  code?: string
  language?: string
}

const sections: DocSection[] = [
  {
    id: "introduction",
    title: "Introduction",
    content: "Welcome to the Prashnly SDK documentation. Our SDK allows you to easily embed an AI-powered FAQ chat widget into your website with just a few lines of code. It's designed to be lightweight, fast, and fully customizable.",
  },
  {
    id: "installation",
    title: "Installation",
    content: "To get started, you don't need to install any heavy packages. Simply include our script tag in your HTML file. Place it before the closing </body> tag for the best performance.",
    code: `<script src="${API_URL}/prashnly.js"></script>`,
    language: "html",
  },
  {
    id: "initialization",
    title: "Initialization",
    content: "Once the script is loaded, you need to initialize the SDK with your unique API Key. You can find your API Key in the Dashboard settings.",
    code: `Prashnly.init({
  apiKey: 'pk_live_your_api_key_here',
  // Optional: Custom backend URL for enterprise
  baseUrl: 'http://localhost:3000' 
});`,
    language: "javascript",
  },
  {
    id: "rendering",
    title: "Rendering the Widget",
    content: "Create a container element in your HTML where you want the chat widget to appear. Then, tell Prashnly to render the widget into that container.",
    code: `<!-- Add this where you want the chat -->
<div id="prashnly-chat"></div>

<script>
  // Render the chat widget
  Prashnly.render('prashnly-chat');
</script>`,
    language: "html",
  },
  {
    id: "customization",
    title: "Customization",
    content: "You can customize the appearance of the chat widget by applying CSS styles to the container element. The widget is responsive and will adapt to the container's width.",
    code: `#prashnly-chat {
  width: 100%;
  max-width: 400px;
  height: 600px;
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
}`,
    language: "css",
  },
]

export default function SDKDocsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const [filteredSections, setFilteredSections] = useState(sections)
  const [activeSection, setActiveSection] = useState("introduction")

  useEffect(() => {
    if (!searchQuery) {
      setFilteredSections(sections)
      return
    }
    
    const lowerQuery = searchQuery.toLowerCase()
    const filtered = sections.filter(
      (section) =>
        section.title.toLowerCase().includes(lowerQuery) ||
        section.content.toLowerCase().includes(lowerQuery)
    )
    setFilteredSections(filtered)
  }, [searchQuery])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      {
        rootMargin: "-20% 0px -35% 0px",
        threshold: 0.1,
      }
    )

    sections.forEach((section) => {
      const element = document.getElementById(section.id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
       {/* Top Navigation */}
       <Topbar className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <TopbarLeft>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">P</span>
            </div>
            <span className="font-bold text-lg">Prashnly Docs</span>
            <Badge variant="secondary" className="ml-2">v1.0.0</Badge>
          </div>
        </TopbarLeft>
        <TopbarRight>
          <div className="hidden md:flex items-center gap-4 text-sm font-medium text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Guide</a>
            <a href="#" className="hover:text-primary transition-colors">API Reference</a>
            <a href="#" className="hover:text-primary transition-colors">Support</a>
          </div>
          <Button variant="default" size="sm" className="ml-4">
            Go to Dashboard
          </Button>
        </TopbarRight>
      </Topbar>

      <div className="pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Sidebar Navigation */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="sticky top-24 space-y-8">
              <div>
                <h5 className="font-semibold mb-4 text-sm tracking-wider text-muted-foreground uppercase">Getting Started</h5>
                <ul className="space-y-3 text-sm">
                  {sections.map((section) => (
                    <li key={section.id}>
                      <a 
                        href={`#${section.id}`} 
                        className={`block transition-colors border-l-2 pl-4 -ml-4 ${
                          activeSection === section.id
                            ? "border-primary text-primary font-medium"
                            : "border-transparent text-muted-foreground hover:text-primary hover:border-primary/50"
                        }`}
                        onClick={(e) => {
                            e.preventDefault()
                            document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth" })
                            setActiveSection(section.id)
                        }}
                      >
                        {section.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9">
            {/* Search Header */}
            <div className="mb-12 relative">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
                SDK Documentation
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
                Everything you need to integrate Prashnly into your web application.
              </p>
              
              <div className="relative max-w-2xl">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-muted-foreground" />
                </div>
                <Input
                  type="text"
                  placeholder="Search documentation..."
                  className="pl-12 py-6 text-lg bg-secondary/50 border-transparent focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all rounded-xl"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <span className="text-xs text-muted-foreground bg-background/50 px-2 py-1 rounded border border-border">CTRL + K</span>
                </div>
              </div>
            </div>

            {/* Content Sections */}
            <div className="space-y-16">
              {filteredSections.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">No results found for "{searchQuery}"</p>
                </div>
              ) : (
                filteredSections.map((section, index) => (
                  <section key={section.id} id={section.id} className="scroll-mt-24 group">
                    <div className="flex items-center gap-2 mb-4">
                        <h2 className="text-2xl font-bold group-hover:text-primary transition-colors">
                        {section.title}
                        </h2>
                        <a href={`#${section.id}`} className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-primary transition-opacity">
                            #
                        </a>
                    </div>
                    
                    <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                      {section.content}
                    </p>

                    {section.code && (
                      <Card className="relative bg-[#0d1117] border-border overflow-hidden group/code">
                        <div className="flex items-center justify-between px-4 py-2 border-b border-border/10 bg-white/5">
                          <div className="flex items-center gap-2">
                            <div className="flex gap-1.5">
                              <div className="w-3 h-3 rounded-full bg-red-500/20" />
                              <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                              <div className="w-3 h-3 rounded-full bg-green-500/20" />
                            </div>
                            <span className="text-xs text-muted-foreground font-mono ml-2">{section.language}</span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 text-xs text-muted-foreground hover:text-white hover:bg-white/10"
                            onClick={() => copyToClipboard(section.code!, index)}
                          >
                            {copiedIndex === index ? (
                              <Check className="h-3.5 w-3.5 mr-1.5 text-green-400" />
                            ) : (
                              <Copy className="h-3.5 w-3.5 mr-1.5" />
                            )}
                            {copiedIndex === index ? "Copied!" : "Copy"}
                          </Button>
                        </div>
                        <div className="p-4 overflow-x-auto">
                          <pre className="text-sm font-mono text-gray-300 leading-relaxed">
                            <code>{section.code}</code>
                          </pre>
                        </div>
                      </Card>
                    )}
                  </section>
                ))
              )}
            </div>
            
            {/* Footer Navigation */}
            <div className="mt-20 pt-8 border-t border-border flex justify-between items-center">
                <div className="text-sm text-muted-foreground">
                    Last updated: November 28, 2025
                </div>
                <Button variant="outline" className="gap-2">
                    Next: API Reference <ChevronRight className="w-4 h-4" />
                </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
