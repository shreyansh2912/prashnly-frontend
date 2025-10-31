"use client";

import type React from "react";

import { useState, useRef } from "react";
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
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from "@/components/ui/modal";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarNav,
  SidebarNavItem,
} from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge";
import { AnalyticsIcon, DashboardIcon, DocumentIcon, SettingsIcon, UserIcon } from "@/components/svg"


export default function SettingsPage() {
  const [avatar, setAvatar] = useState("/user-avatar.jpg");
  const [activeNav, setActiveNav] = useState("dashboard")
  const [theme, setTheme] = useState("dark");
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "Alex",
    lastName: "Johnson",
    email: "alex.johnson@prashnly.com",
    company: "Tech Innovations Inc",
    role: "Product Manager",
  });
  const [passwordData, setPasswordData] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setAvatar(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = () => {
    console.log("[v0] Saving profile:", formData);
  };

  const handleChangePassword = () => {
    if (passwordData.new !== passwordData.confirm) {
      console.log("[v0] Passwords do not match");
      return;
    }
    console.log("[v0] Changing password");
    setPasswordData({ current: "", new: "", confirm: "" });
    setIsPasswordModalOpen(false);
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold">
              P
            </div>
            <span className="font-bold text-foreground">Prashnly</span>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarNav>
            <SidebarNavItem
              isActive={activeNav === "dashboard"}
              onClick={() => setActiveNav("dashboard")}
              className="cursor-pointer"
            >
              <DashboardIcon />
              <span>Dashboard</span>
            </SidebarNavItem>
            <SidebarNavItem
              isActive={activeNav === "documents"}
              onClick={() => setActiveNav("documents")}
              className="cursor-pointer"
            >
              <DocumentIcon />
              <span>Documents</span>
            </SidebarNavItem>
            <SidebarNavItem
              isActive={activeNav === "analytics"}
              onClick={() => setActiveNav("analytics")}
              className="cursor-pointer"
            >
              <AnalyticsIcon />
              <span>Analytics</span>
            </SidebarNavItem>
            <SidebarNavItem
              isActive={activeNav === "settings"}
              onClick={() => setActiveNav("settings")}
              className="cursor-pointer"
            >
              <SettingsIcon />
              <span>Settings</span>
            </SidebarNavItem>
          </SidebarNav>
        </SidebarContent>

        <SidebarFooter>
          <div className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors cursor-pointer">
            <UserIcon />
            <span>Profile</span>
          </div>
        </SidebarFooter>
      </Sidebar>
      <div className="min-h-screen bg-background p-4 md:p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-foreground">Settings</h1>
            <p className="text-muted-foreground mt-2">
              Manage your profile and preferences
            </p>
          </div>

          {/* Profile Section */}
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

          {/* Security Section */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Security</CardTitle>
              <CardDescription>
                Manage your password and security settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <p className="font-semibold text-foreground">Password</p>
                  <p className="text-sm text-muted-foreground">
                    Last changed 3 months ago
                  </p>
                </div>
                <Modal
                  open={isPasswordModalOpen}
                  onOpenChange={setIsPasswordModalOpen}
                >
                  <ModalTrigger asChild>
                    <Button variant="secondary">Change Password</Button>
                  </ModalTrigger>
                  <ModalContent>
                    <ModalHeader>
                      <ModalTitle>Change Password</ModalTitle>
                      <ModalDescription>
                        Enter your current password and choose a new one
                      </ModalDescription>
                    </ModalHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="current">Current Password</Label>
                        <Input
                          id="current"
                          name="current"
                          type="password"
                          value={passwordData.current}
                          onChange={handlePasswordChange}
                          placeholder="Enter current password"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new">New Password</Label>
                        <Input
                          id="new"
                          name="new"
                          type="password"
                          value={passwordData.new}
                          onChange={handlePasswordChange}
                          placeholder="Enter new password"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm">Confirm Password</Label>
                        <Input
                          id="confirm"
                          name="confirm"
                          type="password"
                          value={passwordData.confirm}
                          onChange={handlePasswordChange}
                          placeholder="Confirm new password"
                        />
                      </div>
                    </div>
                    <ModalFooter>
                      <Button
                        variant="outline"
                        onClick={() => setIsPasswordModalOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button onClick={handleChangePassword}>
                        Update Password
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </div>
            </CardContent>
          </Card>

          {/* Preferences Section */}
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

          {/* Danger Zone */}
          <Card className="border-destructive/50 bg-destructive/5">
            <CardHeader>
              <CardTitle className="text-destructive">Danger Zone</CardTitle>
              <CardDescription>Irreversible actions</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="destructive">Delete Account</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
