"use client"

import * as React from "react"
import { Topbar, TopbarLeft, TopbarRight } from "@/components/ui/topbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DocsSidebar } from "@/components/docs-sidebar"
import { CodeBlock } from "@/components/ui/code-block"
import { ExternalLink, Github, Mail } from "lucide-react"

export default function DocsPage() {
  const [activeSection, setActiveSection] = React.useState("introduction")
  const contentRef = React.useRef<HTMLDivElement>(null)

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <Topbar className="fixed top-0 left-0 right-0 z-50">
        <TopbarLeft>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <span className="font-bold text-lg">Prashnly</span>
          </div>
        </TopbarLeft>
        <TopbarRight>
          <Button variant="outline" size="sm">
            Dashboard
          </Button>
          <Button variant="outline" size="sm">
            API Keys
          </Button>
        </TopbarRight>
      </Topbar>

      <div className="flex pt-16">
        {/* Sidebar */}
        <DocsSidebar activeSection={activeSection} onSectionChange={scrollToSection} />

        {/* Main Content */}
        <main className="flex-1 ml-64 max-w-4xl mx-auto px-8 py-12">
          <div ref={contentRef} className="space-y-16">
            {/* Introduction */}
            <section id="introduction" className="scroll-mt-20">
              <h1 className="text-4xl font-bold mb-4">Developer Documentation</h1>
              <p className="text-lg text-muted-foreground mb-6">
                Prashnly helps you turn your company documents into an AI assistant. Integrate it into your product
                using our REST APIs or JavaScript SDK.
              </p>
              <Card>
                <CardHeader>
                  <CardTitle>What is Prashnly?</CardTitle>
                  <CardDescription>An AI-powered FAQ & Policy Assistant for your business</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>Prashnly enables you to:</p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Upload company policies, FAQs, and documentation</li>
                    <li>Train an AI model on your specific content</li>
                    <li>Embed a chat widget on your website or app</li>
                    <li>Handle customer inquiries automatically</li>
                    <li>Track usage and analytics</li>
                  </ul>
                </CardContent>
              </Card>
            </section>

            {/* Quick Start */}
            <section id="quick-start" className="scroll-mt-20">
              <h2 className="text-3xl font-bold mb-6">Quick Start</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">1. Install the SDK</h3>
                  <CodeBlock code="npm install prashnly-sdk" language="bash" />
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">2. Initialize with API Key</h3>
                  <CodeBlock
                    code={`import { Prashnly } from 'prashnly-sdk'

const prashnly = new Prashnly({
  apiKey: 'pk_live_your_api_key_here',
  projectId: 'proj_123456'
})`}
                    language="javascript"
                  />
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">3. Ask a Question</h3>
                  <CodeBlock
                    code={`const response = await prashnly.ask({
  question: 'What is your return policy?',
  documentIds: ['doc_123', 'doc_456']
})

console.log(response.answer)
console.log(response.confidence)`}
                    language="javascript"
                  />
                </div>
              </div>
            </section>

            {/* Authentication */}
            <section id="authentication" className="scroll-mt-20">
              <h2 className="text-3xl font-bold mb-6">Authentication</h2>
              <p className="text-muted-foreground mb-6">
                All API requests require a Bearer token in the Authorization header. Get your API key from the
                Dashboard.
              </p>
              <CodeBlock
                code={`curl -X GET https://api.prashnly.com/v1/docs \\
  -H "Authorization: Bearer pk_live_your_api_key_here" \\
  -H "Content-Type: application/json"`}
                language="bash"
              />
            </section>

            {/* API Reference */}
            <section id="api-reference" className="scroll-mt-20">
              <h2 className="text-3xl font-bold mb-6">API Reference</h2>
              <div className="space-y-8">
                {/* POST /query */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">POST /api/v1/query</CardTitle>
                    <CardDescription>Ask a question to your AI assistant</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Request</h4>
                      <CodeBlock
                        code={`{
  "question": "What is your return policy?",
  "documentIds": ["doc_123", "doc_456"],
  "maxTokens": 500
}`}
                        language="json"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Response</h4>
                      <CodeBlock
                        code={`{
  "id": "query_789",
  "answer": "Our return policy allows returns within 30 days...",
  "confidence": 0.95,
  "sources": ["doc_123"],
  "timestamp": "2024-01-15T10:30:00Z"
}`}
                        language="json"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* POST /upload */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">POST /api/v1/upload</CardTitle>
                    <CardDescription>Upload a document to train the AI</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Request</h4>
                      <CodeBlock
                        code={`curl -X POST https://api.prashnly.com/v1/upload \\
  -H "Authorization: Bearer pk_live_your_api_key_here" \\
  -F "file=@policy.pdf" \\
  -F "title=Company Policy"`}
                        language="bash"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Response</h4>
                      <CodeBlock
                        code={`{
  "id": "doc_123",
  "title": "Company Policy",
  "status": "processing",
  "uploadedAt": "2024-01-15T10:30:00Z"
}`}
                        language="json"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* GET /docs */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">GET /api/v1/docs</CardTitle>
                    <CardDescription>List all documents in your project</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CodeBlock
                      code={`{
  "documents": [
    {
      "id": "doc_123",
      "title": "Company Policy",
      "status": "trained",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ],
  "total": 1
}`}
                      language="json"
                    />
                  </CardContent>
                </Card>

                {/* DELETE /docs/:id */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">DELETE /api/v1/docs/:id</CardTitle>
                    <CardDescription>Delete a document</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CodeBlock
                      code={`curl -X DELETE https://api.prashnly.com/v1/docs/doc_123 \\
  -H "Authorization: Bearer pk_live_your_api_key_here"`}
                      language="bash"
                    />
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* SDK Methods */}
            <section id="sdk-methods" className="scroll-mt-20">
              <h2 className="text-3xl font-bold mb-6">SDK Methods</h2>
              <Card>
                <CardHeader>
                  <CardTitle>Available Methods</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-2 px-4 font-semibold">Method</th>
                          <th className="text-left py-2 px-4 font-semibold">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-border hover:bg-muted/50">
                          <td className="py-2 px-4 font-mono text-primary">ask()</td>
                          <td className="py-2 px-4">Ask a question to the AI assistant</td>
                        </tr>
                        <tr className="border-b border-border hover:bg-muted/50">
                          <td className="py-2 px-4 font-mono text-primary">upload()</td>
                          <td className="py-2 px-4">Upload a document for training</td>
                        </tr>
                        <tr className="border-b border-border hover:bg-muted/50">
                          <td className="py-2 px-4 font-mono text-primary">listDocs()</td>
                          <td className="py-2 px-4">Get all documents in the project</td>
                        </tr>
                        <tr className="border-b border-border hover:bg-muted/50">
                          <td className="py-2 px-4 font-mono text-primary">deleteDoc()</td>
                          <td className="py-2 px-4">Delete a specific document</td>
                        </tr>
                        <tr className="hover:bg-muted/50">
                          <td className="py-2 px-4 font-mono text-primary">getUsage()</td>
                          <td className="py-2 px-4">Get API usage statistics</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-3">Example Usage</h3>
                <CodeBlock
                  code={`const prashnly = new Prashnly({ apiKey: 'pk_live_...' })

// Ask a question
const answer = await prashnly.ask({
  question: 'How do I reset my password?'
})

// Upload a document
const doc = await prashnly.upload({
  file: new File(['...'], 'faq.pdf'),
  title: 'FAQ'
})

// List documents
const docs = await prashnly.listDocs()

// Get usage
const usage = await prashnly.getUsage()`}
                  language="javascript"
                />
              </div>
            </section>

            {/* Embed Widget */}
            <section id="embed-widget" className="scroll-mt-20">
              <h2 className="text-3xl font-bold mb-6">Embed Widget</h2>
              <p className="text-muted-foreground mb-6">
                Add a floating chat widget to your website with a single script tag.
              </p>
              <CodeBlock
                code={`<script src="https://cdn.prashnly.com/widget.js"></script>
<script>
  Prashnly.init({
    apiKey: 'pk_live_your_api_key_here',
    projectId: 'proj_123456',
    theme: {
      primaryColor: '#0EA5E9',
      position: 'bottom-right',
      title: 'Ask me anything'
    }
  })
</script>`}
                language="html"
              />
            </section>

            {/* Webhooks */}
            <section id="webhooks" className="scroll-mt-20">
              <h2 className="text-3xl font-bold mb-6">Webhooks</h2>
              <p className="text-muted-foreground mb-6">
                Receive real-time notifications when documents are trained or other events occur.
              </p>
              <div>
                <h3 className="text-xl font-semibold mb-3">document_trained Event</h3>
                <CodeBlock
                  code={`{
  "event": "document_trained",
  "timestamp": "2024-01-15T10:30:00Z",
  "data": {
    "documentId": "doc_123",
    "title": "Company Policy",
    "status": "trained",
    "tokensUsed": 1250
  }
}`}
                  language="json"
                />
              </div>
            </section>

            {/* Error Codes */}
            <section id="error-codes" className="scroll-mt-20">
              <h2 className="text-3xl font-bold mb-6">Error Codes</h2>
              <Card>
                <CardContent className="pt-6">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-2 px-4 font-semibold">Code</th>
                          <th className="text-left py-2 px-4 font-semibold">Meaning</th>
                          <th className="text-left py-2 px-4 font-semibold">Fix</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-border hover:bg-muted/50">
                          <td className="py-2 px-4 font-mono text-destructive">401</td>
                          <td className="py-2 px-4">Unauthorized</td>
                          <td className="py-2 px-4">Check your API key</td>
                        </tr>
                        <tr className="border-b border-border hover:bg-muted/50">
                          <td className="py-2 px-4 font-mono text-destructive">403</td>
                          <td className="py-2 px-4">Forbidden</td>
                          <td className="py-2 px-4">Check permissions</td>
                        </tr>
                        <tr className="border-b border-border hover:bg-muted/50">
                          <td className="py-2 px-4 font-mono text-destructive">404</td>
                          <td className="py-2 px-4">Not Found</td>
                          <td className="py-2 px-4">Verify resource ID</td>
                        </tr>
                        <tr className="border-b border-border hover:bg-muted/50">
                          <td className="py-2 px-4 font-mono text-destructive">429</td>
                          <td className="py-2 px-4">Rate Limited</td>
                          <td className="py-2 px-4">Wait before retrying</td>
                        </tr>
                        <tr className="hover:bg-muted/50">
                          <td className="py-2 px-4 font-mono text-destructive">500</td>
                          <td className="py-2 px-4">Server Error</td>
                          <td className="py-2 px-4">Contact support</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Support */}
            <section id="support" className="scroll-mt-20 pb-12">
              <h2 className="text-3xl font-bold mb-6">Support</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <Mail className="w-6 h-6 text-primary mb-2" />
                    <CardTitle className="text-lg">Email Support</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      <a href="mailto:support@prashnly.com" className="text-primary hover:underline">
                        support@prashnly.com
                      </a>
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <ExternalLink className="w-6 h-6 text-primary mb-2" />
                    <CardTitle className="text-lg">Documentation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      <a href="#" className="text-primary hover:underline">
                        docs.prashnly.com
                      </a>
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <Github className="w-6 h-6 text-primary mb-2" />
                    <CardTitle className="text-lg">GitHub</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      <a href="#" className="text-primary hover:underline">
                        github.com/prashnly
                      </a>
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
                <p>Prashnly API Documentation v1.0</p>
                <p>Last updated: January 2024</p>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}
