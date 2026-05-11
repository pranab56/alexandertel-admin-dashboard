"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useChangePasswordMutation, useGetProfileQuery, useUpdateProfileMutation } from "@/features/profile/profileApi";
import Image from "next/image";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { baseURL } from "@/utils/BaseURL";

interface ProfileData {
  userName: string;
  email: string;
  phoneNumber: string;
  location: string;
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

interface ValidationErrors {
  userName?: string;
  email?: string;
  phoneNumber?: string;
  location?: string;
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

export default function ProfilePage() {
  const { data: profileData, isLoading: isProfileLoading } = useGetProfileQuery(undefined);
  const [updateProfile] = useUpdateProfileMutation();
  const [changePassword] = useChangePasswordMutation();

  const [formData, setFormData] = useState<ProfileData>({
    userName: "",
    email: "",
    phoneNumber: "",
    location: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [imgPreview, setImgPreview] = useState<string | null>(null);
  console.log(imgPreview)
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const imageUrl = (path: string) => {
    if (!path) return "https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg";
    if (path.startsWith("http")) return path;
    return `${baseURL}${path}`;
  };

  useEffect(() => {
    if (profileData?.data) {
      const { userName, email, phoneNumber, location, profile } = profileData.data;
      setFormData((prev) => ({
        ...prev,
        userName: userName || "",
        email: email || "",
        phoneNumber: phoneNumber || "",
        location: location || "",
      }));
      if (profile) {
        setImgPreview(imageUrl(profile));
      }
    }
  }, [profileData]);

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
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const validate = () => {
    const newErrors: ValidationErrors = {};
    if (!formData.userName.trim()) newErrors.userName = "User name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = "Phone number is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";

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
      // 1. Handle Profile Update
      const updateData = {
        userName: formData.userName,
        phoneNumber: formData.phoneNumber,
        location: formData.location,
      };

      const profileFormData = new FormData();
      profileFormData.append("data", JSON.stringify(updateData));
      if (imageFile) {
        profileFormData.append("images", imageFile);
      }

      await updateProfile(profileFormData).unwrap();

      // 2. Handle Password Change if requested
      if (formData.currentPassword && formData.newPassword) {
        await changePassword({
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
          confirmPassword: formData.confirmPassword,
        }).unwrap();
      }

      toast.success("Profile updated successfully!", { id: toastId });
    } catch (error: unknown) {
      console.log(error);
      const err = error as { data?: { message?: string } };
      toast.error(err.data?.message || "Failed to update profile. Please try again.", { id: toastId });
    }
  };

  if (isProfileLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#1D68D5] border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-10">
      {/* Profile Photo Card */}
      <Card className="border-none shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] bg-white rounded-3xl overflow-hidden">
        <CardContent className="p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border border-gray-100 bg-[#EBF2FA] flex items-center justify-center shrink-0">

            <Image src={imgPreview || imageUrl("")} fill alt="Profile Preview" className="object-cover" />

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
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-[#1A1D2E] ml-1">User Name</Label>
              <Input
                name="userName"
                value={formData.userName}
                onChange={handleInputChange}
                placeholder="Enter your user name here..."
                className={cn(
                  "h-12 bg-[#EBF2FA] border-none rounded-2xl focus-visible:ring-1 px-5 transition-all text-base",
                  errors.userName ? "ring-2 ring-red-500 bg-red-50/50" : "focus-visible:ring-[#1D68D5]"
                )}
              />
              {errors.userName && <p className="text-xs font-medium text-red-500 mt-1 ml-1 animate-in fade-in slide-in-from-top-1">{errors.userName}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-[#1A1D2E] ml-1">Email Address</Label>
              <Input
                name="email"
                readOnly
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter you email address here..."
                className={cn(
                  "h-12 bg-[#EBF2FA] border-none rounded-2xl focus-visible:ring-1 px-5 transition-all text-base opacity-70 cursor-not-allowed",
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
            <Label className="text-sm font-medium text-[#1A1D2E] ml-1">Location</Label>
            <Input
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="Location"
              className={cn(
                "h-12 bg-[#EBF2FA] border-none rounded-2xl focus-visible:ring-1 px-5 transition-all text-base",
                errors.location ? "ring-2 ring-red-500 bg-red-50/50" : "focus-visible:ring-[#1D68D5]"
              )}
            />
            {errors.location && <p className="text-xs font-medium text-red-500 mt-1 ml-1 animate-in fade-in slide-in-from-top-1">{errors.location}</p>}
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
            if (profileData?.data) {
              const { userName, email, phoneNumber, location, profile } = profileData.data;
              setFormData({
                userName: userName || "",
                email: email || "",
                phoneNumber: phoneNumber || "",
                location: location || "",
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
              });
              setImgPreview(profile ? process.env.NEXT_PUBLIC_BASE_URL + profile : null);
              setImageFile(null);
            }
            setErrors({});
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
