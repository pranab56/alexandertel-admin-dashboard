"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";
import toast from "react-hot-toast";

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  jobTitle: string;
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

interface ValidationErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  jobTitle?: string;
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

export default function ProfilePage() {
  const [formData, setFormData] = useState<ProfileData>({
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phoneNumber: "+1 (555) 012-3456",
    jobTitle: "Senior Administrator, Compliance Department",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [imgPreview, setImgPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof ValidationErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Image size must be less than 2MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgPreview(reader.result as string);
        toast.success("Photo uploaded successfully!");
      };
      reader.readAsDataURL(file);
    }
  };

  const validate = () => {
    const newErrors: ValidationErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = "Phone number is required";
    if (!formData.jobTitle.trim()) newErrors.jobTitle = "Job title is required";

    if (formData.newPassword || formData.confirmPassword) {
      if (!formData.currentPassword) newErrors.currentPassword = "Current password is required to change password";
      if ((formData.newPassword?.length || 0) < 8) newErrors.newPassword = "Password must be at least 8 characters";
      if (formData.newPassword !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) {
      toast.error("Please fill in all required fields correctly.");
      return;
    }

    const toastId = toast.loading("Updating profile...");
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success("Profile updated successfully!", { id: toastId });
    } catch (error) {
      console.log(error)
      toast.error("Failed to update profile. Please try again.", { id: toastId });
    }
  };

  return (
    <div className="space-y-6 pb-10">
      {/* Profile Photo Card */}
      <Card className="border-none shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] bg-white rounded-3xl overflow-hidden">
        <CardContent className="p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border border-gray-100 bg-[#EBF2FA] flex items-center justify-center shrink-0">
            {imgPreview ? (
              <Image src={imgPreview} fill alt="Profile Preview" className="object-cover" />
            ) : (
              <Image src="https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg" height={1000} width={1000} alt="Default Profile" className="h-full w-full object-cover" />
            )}
          </div>
          <div className="space-y-4 sm:space-y-3 w-full">
            <div className="space-y-1">
              <h2 className="text-xl font-medium text-[#1A1D2E]">Profile Photo</h2>
              <p className="text-sm text-[#64748B]">JPG or PNG, max 2MB. A clear face photo is recommended.</p>
            </div>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
              <Button
                onClick={() => fileInputRef.current?.click()}
                variant="secondary"
                className="bg-[#EBF2FA] hover:bg-[#dbe7fb] text-[#1D68D5] rounded-2xl px-6 h-10 font-medium transition-colors w-full sm:w-auto"
              >
                Update Photo
              </Button>
              <Button
                onClick={() => {
                  setImgPreview(null);
                  toast.success("Photo removed");
                }}
                variant="ghost"
                className="text-[#1D68D5] hover:text-[#1A5BBF] hover:bg-transparent p-0 h-auto font-medium"
              >
                Remove
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personal Information Card */}
      <Card className="border-none shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] bg-white rounded-3xl overflow-hidden">
        <div className="p-6 sm:p-8 pb-4 border-b border-gray-50">
          <h2 className="text-xl font-medium text-[#1A1D2E]">Personal Information</h2>
        </div>
        <CardContent className="p-6 sm:p-8 space-y-6 text-left">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-[#1A1D2E] ml-1">First Name</Label>
              <Input
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="Enter you first name here..."
                className={cn(
                  "h-12 bg-[#EBF2FA] border-none rounded-2xl focus-visible:ring-1 px-5 transition-all text-base",
                  errors.firstName ? "ring-2 ring-red-500 bg-red-50/50" : "focus-visible:ring-[#1D68D5]"
                )}
              />
              {errors.firstName && <p className="text-xs font-medium text-red-500 mt-1 ml-1 animate-in fade-in slide-in-from-top-1">{errors.firstName}</p>}
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-[#1A1D2E] ml-1">Last Name</Label>
              <Input
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Enter you last name here..."
                className={cn(
                  "h-12 bg-[#EBF2FA] border-none rounded-2xl focus-visible:ring-1 px-5 transition-all text-base",
                  errors.lastName ? "ring-2 ring-red-500 bg-red-50/50" : "focus-visible:ring-[#1D68D5]"
                )}
              />
              {errors.lastName && <p className="text-xs font-medium text-red-500 mt-1 ml-1 animate-in fade-in slide-in-from-top-1">{errors.lastName}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-[#1A1D2E] ml-1">Email Address</Label>
              <Input
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter you email address here..."
                className={cn(
                  "h-12 bg-[#EBF2FA] border-none rounded-2xl focus-visible:ring-1 px-5 transition-all text-base",
                  errors.email ? "ring-2 ring-red-500 bg-red-50/50" : "focus-visible:ring-[#1D68D5]"
                )}
              />
              {errors.email && <p className="text-xs font-medium text-red-500 mt-1 ml-1 animate-in fade-in slide-in-from-top-1">{errors.email}</p>}
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-[#1A1D2E] ml-1">Phone Number</Label>
              <Input
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder="+1 (555) 012-3456"
                className={cn(
                  "h-12 bg-[#EBF2FA] border-none rounded-2xl focus-visible:ring-1 px-5 transition-all text-base",
                  errors.phoneNumber ? "ring-2 ring-red-500 bg-red-50/50" : "focus-visible:ring-[#1D68D5]"
                )}
              />
              {errors.phoneNumber && <p className="text-xs font-medium text-red-500 mt-1 ml-1 animate-in fade-in slide-in-from-top-1">{errors.phoneNumber}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-[#1A1D2E] ml-1">Job Title</Label>
            <Input
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleInputChange}
              placeholder="Senior Administrator, Compliance Department"
              className={cn(
                "h-12 bg-[#EBF2FA] border-none rounded-2xl focus-visible:ring-1 px-5 transition-all text-base",
                errors.jobTitle ? "ring-2 ring-red-500 bg-red-50/50" : "focus-visible:ring-[#1D68D5]"
              )}
            />
            {errors.jobTitle && <p className="text-xs font-medium text-red-500 mt-1 ml-1 animate-in fade-in slide-in-from-top-1">{errors.jobTitle}</p>}
          </div>
        </CardContent>
      </Card>

      {/* Account Security Card */}
      <Card className="border-none shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20_px_-2px_rgba(0,0,0,0.04)] bg-white rounded-3xl overflow-hidden">
        <div className="p-6 sm:p-8 pb-4 border-b border-gray-50">
          <h2 className="text-xl font-medium text-[#1A1D2E]">Account Security</h2>
        </div>
        <CardContent className="p-6 sm:p-8 space-y-6 text-left">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-[#1A1D2E] ml-1">Current Password</Label>
            <Input
              name="currentPassword"
              type="password"
              value={formData.currentPassword}
              onChange={handleInputChange}
              placeholder="Enter your current password here..."
              className={cn(
                "h-12 bg-[#EBF2FA] border-none rounded-2xl focus-visible:ring-1 px-5 transition-all text-base",
                errors.currentPassword ? "ring-2 ring-red-500 bg-red-50/50" : "focus-visible:ring-[#1D68D5]"
              )}
            />
            {errors.currentPassword && <p className="text-xs font-medium text-red-500 mt-1 ml-1 animate-in fade-in slide-in-from-top-1">{errors.currentPassword}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-[#1A1D2E] ml-1">New Password</Label>
              <Input
                name="newPassword"
                type="password"
                value={formData.newPassword}
                onChange={handleInputChange}
                placeholder="Enter your new password here..."
                className={cn(
                  "h-12 bg-[#EBF2FA] border-none rounded-2xl focus-visible:ring-1 px-5 transition-all text-base",
                  errors.newPassword ? "ring-2 ring-red-500 bg-red-50/50" : "focus-visible:ring-[#1D68D5]"
                )}
              />
              {errors.newPassword && <p className="text-xs font-medium text-red-500 mt-1 ml-1 animate-in fade-in slide-in-from-top-1">{errors.newPassword}</p>}
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-[#1A1D2E] ml-1">Confirm New Password</Label>
              <Input
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Enter your confirm new password here..."
                className={cn(
                  "h-12 bg-[#EBF2FA] border-none rounded-2xl focus-visible:ring-1 px-5 transition-all text-base",
                  errors.confirmPassword ? "ring-2 ring-red-500 bg-red-50/50" : "focus-visible:ring-[#1D68D5]"
                )}
              />
              {errors.confirmPassword && <p className="text-xs font-medium text-red-500 mt-1 ml-1 animate-in fade-in slide-in-from-top-1">{errors.confirmPassword}</p>}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bottom Actions */}
      <div className="flex flex-col-reverse sm:flex-row justify-end items-stretch sm:items-center gap-4 pt-4">
        <Button
          variant="outline"
          className="h-12 px-10 rounded-2xl border-[#FF5B5B] text-[#FF5B5B] hover:bg-[#FF5B5B] hover:text-white transition-all font-medium w-full sm:w-auto"
          onClick={() => {
            setFormData({
              firstName: "John",
              lastName: "Doe",
              email: "john@example.com",
              phoneNumber: "+1 (555) 012-3456",
              jobTitle: "Senior Administrator, Compliance Department",
              currentPassword: "",
              newPassword: "",
              confirmPassword: "",
            });
            setErrors({});
            setImgPreview(null);
            toast("Changes discarded", { icon: "🧹" });
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          className="h-12 px-10 rounded-2xl bg-[#1D68D5] hover:bg-[#1A5BBF] text-white transition-all shadow-lg font-medium w-full sm:w-auto"
        >
          Save Profile
        </Button>
      </div>
    </div>
  );
}
