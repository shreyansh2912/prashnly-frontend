"use client"

import { Logo } from "@/components/logo"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function LogosPage() {
  const downloadSVG = (filename: string, content: string) => {
    const element = document.createElement("a")
    element.setAttribute("href", `data:image/svg+xml;charset=utf-8,${encodeURIComponent(content)}`)
    element.setAttribute("download", filename)
    element.style.display = "none"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-2">Prashnly Logo System</h1>
          <p className="text-muted-foreground">Complete brand identity with monogram, wordmark, and favicon</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Monogram */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Monogram</CardTitle>
              <CardDescription>Icon-only logo for small spaces</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-center p-8 bg-secondary/30 rounded-lg">
                <Logo variant="monogram" size="xl" />
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Sizes:</p>
                <div className="flex gap-4 items-center">
                  <Logo variant="monogram" size="sm" />
                  <Logo variant="monogram" size="md" />
                  <Logo variant="monogram" size="lg" />
                  <Logo variant="monogram" size="xl" />
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full bg-transparent"
                onClick={() =>
                  downloadSVG(
                    "prashnly-monogram.svg",
                    `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="none">
  <defs>
    <linearGradient id="monoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#00D9FF;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#00B8D4;stop-opacity:1" />
    </linearGradient>
  </defs>
  <path d="M 16 12 L 16 52 M 16 12 L 32 12 Q 38 12 38 20 Q 38 28 32 28 L 16 28" stroke="url(#monoGradient)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
  <circle cx="42" cy="22" r="6" stroke="url(#monoGradient)" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
  <path d="M 42 28 L 42 36" stroke="url(#monoGradient)" strokeWidth="3.5" strokeLinecap="round"/>
  <circle cx="42" cy="42" r="2" fill="url(#monoGradient)"/>
</svg>`,
                  )
                }
              >
                Download SVG
              </Button>
            </CardContent>
          </Card>

          {/* Wordmark */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Wordmark</CardTitle>
              <CardDescription>Logo with text for primary use</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-center p-8 bg-secondary/30 rounded-lg">
                <Logo variant="wordmark" size="lg" />
              </div>
              <p className="text-sm text-muted-foreground">
                Full brand identity combining the P + ? monogram with the Prashnly wordmark and tagline.
              </p>
              <Button
                variant="outline"
                className="w-full bg-transparent"
                onClick={() =>
                  downloadSVG(
                    "prashnly-wordmark.svg",
                    `<svg viewBox="0 0 280 80" xmlns="http://www.w3.org/2000/svg" fill="none">
  <defs>
    <linearGradient id="wordmarkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#00D9FF;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#00B8D4;stop-opacity:1" />
    </linearGradient>
  </defs>
  <g transform="translate(10, 10)">
    <path d="M 8 6 L 8 26 M 8 6 L 16 6 Q 20 6 20 10 Q 20 14 16 14 L 8 14" stroke="url(#wordmarkGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="21" cy="11" r="3" stroke="url(#wordmarkGradient)" strokeWidth="2" fill="none" strokeLinecap="round"/>
    <path d="M 21 14 L 21 18" stroke="url(#wordmarkGradient)" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="21" cy="21" r="1" fill="url(#wordmarkGradient)"/>
  </g>
  <text x="70" y="55" fontFamily="Plus Jakarta Sans, -apple-system, BlinkMacSystemFont, sans-serif" fontSize="48" fontWeight="700" fill="#F5F5F5" letterSpacing="-0.5">Prashnly</text>
  <text x="70" y="72" fontFamily="Plus Jakarta Sans, -apple-system, BlinkMacSystemFont, sans-serif" fontSize="12" fontWeight="500" fill="#A0A0A0" letterSpacing="0.5">AI-POWERED FAQ ASSISTANT</text>
</svg>`,
                  )
                }
              >
                Download SVG
              </Button>
            </CardContent>
          </Card>

          {/* Favicon */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Favicon</CardTitle>
              <CardDescription>Optimized for browser tabs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-center p-8 bg-secondary/30 rounded-lg">
                <Logo variant="favicon" size="xl" />
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Sizes:</p>
                <div className="flex gap-4 items-center">
                  <Logo variant="favicon" size="sm" />
                  <Logo variant="favicon" size="md" />
                  <Logo variant="favicon" size="lg" />
                  <Logo variant="favicon" size="xl" />
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full bg-transparent"
                onClick={() =>
                  downloadSVG(
                    "prashnly-favicon.svg",
                    `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill="none">
  <defs>
    <linearGradient id="faviconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#00D9FF;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#00B8D4;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="32" height="32" rx="6" fill="#0A0E27" opacity="0.8"/>
  <path d="M 8 6 L 8 26 M 8 6 L 16 6 Q 20 6 20 14 Q 20 20 16 20 L 8 20" stroke="url(#faviconGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  <circle cx="22" cy="13" r="3.5" stroke="url(#faviconGradient)" strokeWidth="2" fill="none" strokeLinecap="round"/>
  <path d="M 22 16.5 L 22 21" stroke="url(#faviconGradient)" strokeWidth="2" strokeLinecap="round"/>
  <circle cx="22" cy="24" r="1.2" fill="url(#faviconGradient)"/>
</svg>`,
                  )
                }
              >
                Download SVG
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Usage Guidelines */}
        <Card className="mt-12 border-border/50">
          <CardHeader>
            <CardTitle>Usage Guidelines</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-foreground mb-2">Monogram</h3>
              <p className="text-sm text-muted-foreground">
                Use for favicons, app icons, avatars, and small spaces where the full wordmark won't fit. Maintains
                clarity at sizes as small as 16x16px.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">Wordmark</h3>
              <p className="text-sm text-muted-foreground">
                Primary logo for headers, landing pages, and marketing materials. Combines the monogram with the
                Prashnly name and tagline for full brand recognition.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">Favicon</h3>
              <p className="text-sm text-muted-foreground">
                Optimized for browser tabs and bookmarks. Features a subtle background for better visibility in light
                contexts while maintaining the Cyber Blue accent.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">Color</h3>
              <p className="text-sm text-muted-foreground">
                All logos use a Cyber Blue gradient (#00D9FF to #00B8D4) that matches the Prashnly design system. The
                gradient adds depth and visual interest while maintaining brand consistency.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
