"use client";

import type React from "react";
import { useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ProfileSectionProps {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    company: string;
    role: string;
  };
  handleFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  avatar: string;
  handleAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSaveProfile: () => void;
}

export function ProfileSection({
  formData,
  handleFormChange,
  avatar,
  handleAvatarChange,
  handleSaveProfile,
}: ProfileSectionProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>
          Update your personal details and avatar
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Avatar Upload */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="flex flex-col items-center gap-4">
            <img
              src={avatar || "/placeholder.svg"}
              alt="Profile avatar"
              className="w-24 h-24 rounded-full border-2 border-primary object-cover"
            />
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
            <Button
              variant="secondary"
              size="sm"
              onClick={handleAvatarClick}
            >
              Change Avatar
            </Button>
          </div>
          <div className="flex-1 space-y-2">
            <p className="text-sm font-semibold text-foreground">
              Profile Picture
            </p>
            <p className="text-sm text-muted-foreground">
              Upload a new profile picture. Recommended size: 400x400px
            </p>
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleFormChange}
              placeholder="First name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleFormChange}
              placeholder="Last name"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleFormChange}
              placeholder="Email address"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              name="company"
              value={formData.company}
              onChange={handleFormChange}
              placeholder="Company name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Input
              id="role"
              name="role"
              value={formData.role}
              onChange={handleFormChange}
              placeholder="Your role"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-4">
          <Button onClick={handleSaveProfile}>Save Changes</Button>
        </div>
      </CardContent>
    </Card>
  );
}
