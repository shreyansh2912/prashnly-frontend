"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PricingModal } from "@/components/pricing-modal";

export function SubscriptionSection() {
  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle>Subscription</CardTitle>
        <CardDescription>Manage your plan and billing</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-foreground">Current Plan</p>
            <p className="text-sm text-muted-foreground">
              You are currently on the <span className="font-bold text-primary">Basic</span> plan.
            </p>
          </div>
          <PricingModal />
        </div>
      </CardContent>
    </Card>
  );
}
