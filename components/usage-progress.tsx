"use client"

import { Progress } from "@/components/ui/progress"

interface UsageProgressProps {
  used: number
  max: number
  plan: string
}

export function UsageProgress({ used, max, plan }: UsageProgressProps) {
  const percentage = Math.min((used / max) * 100, 100)
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="font-medium">Token Usage</span>
        <span className="text-muted-foreground">
          {used.toLocaleString()} / {plan === 'enterprise' ? 'Unlimited' : max.toLocaleString()}
        </span>
      </div>
      <Progress value={percentage} className="h-2" />
      <p className="text-xs text-muted-foreground">
        {plan === 'enterprise' 
          ? "You have unlimited tokens." 
          : `You have used ${percentage.toFixed(1)}% of your monthly quota.`}
      </p>
    </div>
  )
}
