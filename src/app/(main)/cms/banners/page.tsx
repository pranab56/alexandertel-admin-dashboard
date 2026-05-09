"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Plus,
  Trash2,
  Edit2,
  Image as ImageIcon,
  Loader2,
  AlertCircle,
  Upload
} from "lucide-react";
import { useState, useRef } from "react";
import {
  useGetBannerQuery,
  useCreateBannerMutation,
  useUpdateBannerMutation,
  useDeleteBannerMutation
} from "@/features/cms/cmsApi";
import toast from "react-hot-toast";
import Image from "next/image";
import { baseURL } from "@/utils/BaseURL";

export default function BannersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<any>(null);
  const [selectedBannerId, setSelectedBannerId] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    imageFile: null as File | null,
  });

  const { data: bannerResponse, isLoading } = useGetBannerQuery({});
  const [createBanner, { isLoading: isCreating }] = useCreateBannerMutation();
  const [updateBanner, { isLoading: isUpdating }] = useUpdateBannerMutation();
  const [deleteBanner, { isLoading: isDeleting }] = useDeleteBannerMutation();

  const banners = bannerResponse?.data || [];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, imageFile: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setFormData({ name: "", imageFile: null });
    setImagePreview(null);
    setEditingBanner(null);
  };

  const handleEdit = (banner: any) => {
    setEditingBanner(banner);
    setFormData({ name: banner.name, imageFile: null });
    setImagePreview(banner.images);
    setIsModalOpen(true);
  };

  const handleSubmit = async () => {
    if (!formData.name) {
      toast.error("Banner name is required");
      return;
    }

    const submitData = new FormData();
    submitData.append("name", formData.name);
    if (formData.imageFile) {
      submitData.append("images", formData.imageFile);
    }

    try {
      if (editingBanner) {
        await updateBanner({ id: editingBanner._id, data: submitData }).unwrap();
        toast.success("Banner updated successfully");
      } else {
        if (!formData.imageFile) {
          toast.error("Please select an image");
          return;
        }
        await createBanner(submitData).unwrap();
        toast.success("Banner created successfully");
      }
      setIsModalOpen(false);
      resetForm();
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  const handleDelete = async () => {
    if (!selectedBannerId) return;
    try {
      await deleteBanner({ id: selectedBannerId }).unwrap();
      toast.success("Banner deleted successfully");
      setIsDeleteModalOpen(false);
      setSelectedBannerId(null);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to delete banner");
    }
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-medium text-gray-900 tracking-tight">Promotional Banners</h1>
          <p className="text-gray-500 font-medium mt-1">Manage high-impact visuals for your homepage and special offers.</p>
        </div>

        <Dialog open={isModalOpen} onOpenChange={(val) => {
          setIsModalOpen(val);
          if (!val) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/95 text-white rounded-xl px-8 h-14 font-medium shadow-lg transition-all active:scale-95 gap-2">
              <Plus className="w-5 h-5" /> Add New Banner
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px] p-0 rounded-2xl border-none shadow-2xl overflow-hidden">
            <DialogHeader className="p-8 pb-4 bg-[#F8F9FC] border-b border-gray-100">
              <DialogTitle className="text-2xl font-medium text-gray-900">
                {editingBanner ? "Edit Banner" : "Create New Banner"}
              </DialogTitle>
              <DialogDescription className="font-medium text-gray-500 pt-1">
                Upload a high-quality image and set a descriptive name.
              </DialogDescription>
            </DialogHeader>

            <div className="p-8 space-y-6">
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-700 uppercase tracking-wider">Banner Name</Label>
                <Input
                  placeholder="e.g., Summer Flash Sale 2024"
                  className="bg-gray-50 border-none h-14 rounded-xl font-medium px-4 focus-visible:ring-1 focus-visible:ring-primary/20"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-700 uppercase tracking-wider">Banner Image</Label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="group relative h-[250px] w-full bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 hover:bg-primary/[0.02] transition-all overflow-hidden"
                >
                  {imagePreview ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={imagePreview.startsWith('data:') ? imagePreview : `http://humayon5002.binarybards.online${imagePreview}`}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white font-medium flex-col gap-2">
                        <Upload className="w-8 h-8" />
                        Change Image
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-3 text-gray-400">
                      <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center text-primary">
                        <ImageIcon className="w-8 h-8" />
                      </div>
                      <p className="font-medium text-sm">Click to upload banner image</p>
                      <span className="text-xs font-medium">Recommended size: 1920x600px</span>
                    </div>
                  )}
                  <input
                    type="file"
                    className="hidden"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>
              </div>
            </div>

            <DialogFooter className="p-8 pt-0 sm:justify-start gap-3">
              <Button
                onClick={handleSubmit}
                disabled={isCreating || isUpdating}
                className="w-full sm:w-auto px-10 h-14 rounded-xl bg-primary hover:bg-primary/95 text-white font-medium shadow-lg transition-all active:scale-95"
              >
                {(isCreating || isUpdating) ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : editingBanner ? "Secure Update" : "Create Banner"}
              </Button>
              <DialogClose asChild>
                <Button variant="ghost" className="w-full sm:w-auto h-14 rounded-xl font-medium text-gray-400 hover:bg-gray-100 transition-colors">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Banner Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-[300px] bg-gray-50 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : banners.length === 0 ? (
        <div className="bg-white border border-gray-100 rounded-3xl h-[400px] flex flex-col items-center justify-center text-center p-10">
          <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
            <ImageIcon className="w-10 h-10 text-gray-200" />
          </div>
          <h3 className="text-xl font-medium text-gray-900">No banners found</h3>
          <p className="text-gray-500 font-medium mt-2 max-w-sm">Launch a new marketing campaign by adding your first banner.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {banners.map((banner: any) => (
            <div key={banner._id} className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all hover:-translate-y-2">
              <div className="relative h-[220px] w-full overflow-hidden">
                <Image
                  src={`${baseURL}${banner.images}`}
                  alt={banner.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button
                    size="icon"
                    onClick={() => handleEdit(banner)}
                    className="w-10 h-10 bg-white/90 hover:bg-white text-gray-800 rounded-xl shadow-lg backdrop-blur-sm transition-all active:scale-90"
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    size="icon"
                    onClick={() => {
                      setSelectedBannerId(banner._id);
                      setIsDeleteModalOpen(true);
                    }}
                    className="w-10 h-10 bg-white/90 hover:bg-rose-500 text-rose-500 hover:text-white rounded-xl shadow-lg backdrop-blur-sm transition-all active:scale-90"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-medium text-gray-900 text-lg line-clamp-1">{banner.name}</h3>
                <p className="text-[12px] text-gray-400 font-medium uppercase tracking-widest mt-2">Active Display</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className="sm:max-w-[400px] p-0 rounded-2xl border-none shadow-2xl overflow-hidden">
          <div className="p-10 text-center bg-white">
            <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-6 transition-transform hover:scale-110">
              <AlertCircle className="w-10 h-10 text-rose-500" />
            </div>
            <h3 className="text-2xl font-medium text-gray-900 mb-2">Delete Banner?</h3>
            <p className="text-gray-500 font-medium">This will remove the banner from your website immediately. This action is irreversible.</p>
          </div>
          <div className="flex border-t border-gray-100">
            <Button
              variant="ghost"
              onClick={() => setIsDeleteModalOpen(false)}
              className="flex-1 h-16 rounded-none font-medium text-gray-500 hover:bg-gray-50 border-r border-gray-100"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              disabled={isDeleting}
              className="flex-1 h-16 rounded-none font-medium text-rose-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
            >
              {isDeleting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Remove Banner"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}