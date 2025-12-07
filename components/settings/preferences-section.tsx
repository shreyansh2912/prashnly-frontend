"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface PreferencesSectionProps {
  theme: string;
  setTheme: (theme: string) => void;
}

export function PreferencesSection({ theme, setTheme }: PreferencesSectionProps) {
  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle>Preferences</CardTitle>
        <CardDescription>Customize your experience</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-foreground">Theme</p>
            <p className="text-sm text-muted-foreground">
              Choose your preferred color scheme
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant={theme === "dark" ? "default" : "outline"}
              size="sm"
              onClick={() => setTheme("dark")}
            >
              Dark
            </Button>
            <Button
              variant={theme === "light" ? "default" : "outline"}
              size="sm"
              onClick={() => setTheme("light")}
            >
              Light
            </Button>
          </div>
        </div>
        <div className="border-t border-border pt-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-foreground">
                Email Notifications
              </p>
              <p className="text-sm text-muted-foreground">
                Receive updates about your account
              </p>
            </div>
            <Badge variant="default">Enabled</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
