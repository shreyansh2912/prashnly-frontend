"use client"

import { useState } from "react"
import { Check, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { API_URL } from "@/lib/config"
import { toast } from "sonner"

const PLANS = [
  {
    name: "Basic",
    id: "basic",
    price: "Free",
    description: "Essential features for individuals",
    features: ["10 Documents", "5,000 Tokens/month", "Standard Support"],
    current: true, // Logic to check current plan needed
  },
  {
    name: "Premium",
    id: "premium",
    price: "$19/mo",
    description: "Advanced features for power users",
    features: ["Unlimited Documents", "10,000 Tokens/month", "Priority Support", "Password Protection"],
    current: false,
  },
  {
    name: "Enterprise",
    id: "enterprise",
    price: "Contact Us",
    description: "For large teams and organizations",
    features: ["Unlimited Documents", "Unlimited Tokens", "Dedicated Support", "SSO & Advanced Security"],
    current: false,
  },
]

export function PricingModal() {
  const [isLoading, setIsLoading] = useState<string | null>(null)

  const handleUpgrade = async (planId: string) => {
    if (planId === "enterprise") {
      toast.info("Please contact sales for Enterprise plan.")
      return
    }

    setIsLoading(planId)
    try {
      const token = localStorage.getItem("token")
      const res = await fetch(`${API_URL}/api/payment/create-checkout-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ plan: planId }),
      })

      const data = await res.json()

      if (res.ok) {
        window.location.href = data.url
      } else {
        toast.error(data.message || "Failed to initiate checkout")
      }
    } catch (error) {
      console.error("Upgrade error:", error)
      toast.error("Something went wrong. Please try again.")
    } finally {
      setIsLoading(null)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Upgrade Plan</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[900px]">
        <DialogHeader>
          <DialogTitle>Upgrade your plan</DialogTitle>
          <DialogDescription>Choose the plan that fits your needs.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 md:grid-cols-3 py-6">
          {PLANS.map((plan) => (
            <Card key={plan.id} className={plan.id === "premium" ? "border-primary shadow-lg" : ""}>
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4 text-3xl font-bold">{plan.price}</div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  variant={plan.id === "premium" ? "default" : "outline"}
                  disabled={!!isLoading || plan.current}
                  onClick={() => !plan.current && handleUpgrade(plan.id)}
                >
                  {isLoading === plan.id ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : plan.current ? (
                    "Current Plan"
                  ) : (
                    "Upgrade"
                  )}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
