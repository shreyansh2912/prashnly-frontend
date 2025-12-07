"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UsageProgress } from "@/components/usage-progress";
import { UsageHistory } from "@/components/usage-history";
import { API_URL } from "@/lib/config";

export function AnalyticsSection() {
  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/api/analytics`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setAnalyticsData(data);
      }
    } catch (error) {
      console.error("Failed to fetch analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-border">
        <CardHeader>
          <CardTitle>Usage Overview</CardTitle>
          <CardDescription>Monitor your token consumption</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Loading usage data...</p>
          ) : analyticsData ? (
            <UsageProgress 
              used={analyticsData.tokensUsed} 
              max={analyticsData.maxTokens} 
              plan={analyticsData.plan} 
            />
          ) : (
            <p>Failed to load usage data.</p>
          )}
        </CardContent>
      </Card>

      <Card className="border-border">
        <CardHeader>
          <CardTitle>Usage History</CardTitle>
          <CardDescription>Recent activity</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Loading history...</p>
          ) : analyticsData ? (
            <UsageHistory history={analyticsData.history} />
          ) : (
            <p>Failed to load history.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
