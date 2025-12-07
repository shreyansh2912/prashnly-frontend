"use client";

import type React from "react";
import { useState } from "react";
import { ProfileSection } from "@/components/settings/profile-section";
import { SecuritySection } from "@/components/settings/security-section";
import { SubscriptionSection } from "@/components/settings/subscription-section";
import { PreferencesSection } from "@/components/settings/preferences-section";
import { DangerZone } from "@/components/settings/danger-zone";

export default function SettingsPage() {
  const [avatar, setAvatar] = useState("/user-avatar.jpg");
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
    // Implement save logic
  };

  const handleChangePassword = () => {
    if (passwordData.new !== passwordData.confirm) {
      return;
    }
    setPasswordData({ current: "", new: "", confirm: "" });
    setIsPasswordModalOpen(false);
  };

  return (
    <div className="flex-1 overflow-auto p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground mt-2">
            Manage your profile and preferences
          </p>
        </div>

        <div className="space-y-6">
          <ProfileSection
            formData={formData}
            handleFormChange={handleFormChange}
            avatar={avatar}
            handleAvatarChange={handleAvatarChange}
            handleSaveProfile={handleSaveProfile}
          />

          <SecuritySection
            passwordData={passwordData}
            handlePasswordChange={handlePasswordChange}
            handleChangePassword={handleChangePassword}
            isPasswordModalOpen={isPasswordModalOpen}
            setIsPasswordModalOpen={setIsPasswordModalOpen}
          />

          <SubscriptionSection />

          <PreferencesSection theme={theme} setTheme={setTheme} />

          <DangerZone />
        </div>
      </div>
    </div>
  );
}
