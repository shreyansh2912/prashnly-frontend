"use client";

import type React from "react";
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

interface SecuritySectionProps {
  passwordData: {
    current: string;
    new: string;
    confirm: string;
  };
  handlePasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangePassword: () => void;
  isPasswordModalOpen: boolean;
  setIsPasswordModalOpen: (open: boolean) => void;
}

export function SecuritySection({
  passwordData,
  handlePasswordChange,
  handleChangePassword,
  isPasswordModalOpen,
  setIsPasswordModalOpen,
}: SecuritySectionProps) {
  return (
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
  );
}
