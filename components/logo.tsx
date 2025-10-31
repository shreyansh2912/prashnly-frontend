"use client"

interface LogoProps {
  variant?: "monogram" | "wordmark" | "favicon"
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
}

const sizeMap = {
  sm: "w-6 h-6",
  md: "w-8 h-8",
  lg: "w-12 h-12",
  xl: "w-16 h-16",
}

export function Logo({ variant = "monogram", size = "md", className = "" }: LogoProps) {
  const sizeClass = sizeMap[size]

  if (variant === "monogram") {
    return (
      <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="none" className={`${sizeClass} ${className}`}>
        <defs>
          <linearGradient id="monoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#00D9FF", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "#00B8D4", stopOpacity: 1 }} />
          </linearGradient>
        </defs>

        <path
          d="M 16 12 L 16 52 M 16 12 L 32 12 Q 38 12 38 20 Q 38 28 32 28 L 16 28"
          stroke="url(#monoGradient)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <circle cx="42" cy="22" r="6" stroke="url(#monoGradient)" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        <path d="M 42 28 L 42 36" stroke="url(#monoGradient)" strokeWidth="3.5" strokeLinecap="round" />
        <circle cx="42" cy="42" r="2" fill="url(#monoGradient)" />
      </svg>
    )
  }

  if (variant === "wordmark") {
    return (
      <svg
        viewBox="0 0 280 80"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        className={`${className}`}
        style={{
          width: "auto",
          height: size === "sm" ? "24px" : size === "md" ? "32px" : size === "lg" ? "48px" : "64px",
        }}
      >
        <defs>
          <linearGradient id="wordmarkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#00D9FF", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "#00B8D4", stopOpacity: 1 }} />
          </linearGradient>
        </defs>

        <g transform="translate(10, 10)">
          <path
            d="M 8 6 L 8 26 M 8 6 L 16 6 Q 20 6 20 10 Q 20 14 16 14 L 8 14"
            stroke="url(#wordmarkGradient)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <circle
            cx="21"
            cy="11"
            r="3"
            stroke="url(#wordmarkGradient)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          <path d="M 21 14 L 21 18" stroke="url(#wordmarkGradient)" strokeWidth="2" strokeLinecap="round" />
          <circle cx="21" cy="21" r="1" fill="url(#wordmarkGradient)" />
        </g>

        <text
          x="70"
          y="55"
          fontFamily="Plus Jakarta Sans, -apple-system, BlinkMacSystemFont, sans-serif"
          fontSize="48"
          fontWeight="700"
          fill="#F5F5F5"
          letterSpacing="-0.5"
        >
          Prashnly
        </text>

        <text
          x="70"
          y="72"
          fontFamily="Plus Jakarta Sans, -apple-system, BlinkMacSystemFont, sans-serif"
          fontSize="12"
          fontWeight="500"
          fill="#A0A0A0"
          letterSpacing="0.5"
        >
          AI-POWERED FAQ ASSISTANT
        </text>
      </svg>
    )
  }

  if (variant === "favicon") {
    return (
      <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill="none" className={`${sizeClass} ${className}`}>
        <defs>
          <linearGradient id="faviconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#00D9FF", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "#00B8D4", stopOpacity: 1 }} />
          </linearGradient>
        </defs>

        <rect width="32" height="32" rx="6" fill="#0A0E27" opacity="0.8" />

        <path
          d="M 8 6 L 8 26 M 8 6 L 16 6 Q 20 6 20 14 Q 20 20 16 20 L 8 20"
          stroke="url(#faviconGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <circle
          cx="22"
          cy="13"
          r="3.5"
          stroke="url(#faviconGradient)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <path d="M 22 16.5 L 22 21" stroke="url(#faviconGradient)" strokeWidth="2" strokeLinecap="round" />
        <circle cx="22" cy="24" r="1.2" fill="url(#faviconGradient)" />
      </svg>
    )
  }

  return null
}
