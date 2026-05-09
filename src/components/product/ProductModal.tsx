"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CloudUpload, Plus, Trash2 } from "lucide-react";
import { useRef } from "react";
import Image from "next/image";

interface ProductModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  editingId: string | null;
  formData: any;
  setFormData: (data: any) => void;
  storage: any[];
  setStorage: (data: any) => void;
  ram: any[];
  setRam: (data: any) => void;
  colors: any[];
  setColors: (data: any) => void;
  imagePreview: string | null;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => Promise<void>;
  isSaving: boolean;
}

export default function ProductModal({
  isOpen,
  onOpenChange,
  editingId,
  formData,
  setFormData,
  storage,
  setStorage,
  ram,
  setRam,
  colors,
  setColors,
  imagePreview,
  onImageChange,
  onSubmit,
  isSaving,
}: ProductModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addArrayItem = (setter: any) => {
    setter((prev: any) => [...prev, { type: "", price: 0 }]);
  };

  const removeArrayItem = (setter: any, index: number) => {
    setter((prev: any) => prev.filter((_: any, i: number) => i !== index));
  };

  const updateArrayItem = (setter: any, index: number, field: string, value: any) => {
    setter((prev: any) => prev.map((item: any, i: number) =>
      i === index ? { ...item, [field]: field === 'price' ? Number(value) : value } : item
    ));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl p-0 rounded-lg border-none overflow-hidden gap-0 max-h-[90vh] overflow-y-auto hidden-scrollbar">
        <DialogHeader className="p-6 pb-4 border-b border-gray-100 sticky top-0 bg-white z-10">
          <DialogTitle className="text-xl font-medium text-gray-900">
            {editingId ? "Edit Product" : "Add New Product"}
          </DialogTitle>
        </DialogHeader>
        <div className="p-4 space-y-8">

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-[14px] font-medium text-gray-700">Product Name</label>
              <Input
                placeholder="e.g. MacBook Pro"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-[#F8F9FC] border-none rounded-sm h-12 mt-1 text-gray-600 focus-visible:ring-1 focus-visible:ring-primary/20"
              />
            </div>
            <div className="space-y-3">
              <label className="text-[14px] font-medium text-gray-700">Category</label>
              <Select
                value={formData.catagory}
                onValueChange={(val) => setFormData({ ...formData, catagory: val })}
              >
                <SelectTrigger className="w-full bg-[#F8F9FC] border-none rounded-sm mt-1 h-12 py-6 text-gray-600 focus:ring-1 focus:ring-primary/20">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent className="rounded-sm border-gray-100">
                  <SelectItem value="mobile">Mobile</SelectItem>
                  <SelectItem value="laptop">Laptop</SelectItem>
                  <SelectItem value="sim">SIM Card</SelectItem>
                  <SelectItem value="accessory">Accessory</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[14px] font-medium text-gray-700">Description</label>
            <Textarea
              placeholder="Enter detailed product description ..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-[#F8F9FC] border-none rounded-sm min-h-[120px] text-gray-600 resize-none p-4 focus-visible:ring-1 focus-visible:ring-primary/20 shadow-none mt-1"
            />
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="space-y-3">
              <label className="text-[14px] font-medium text-gray-700">Device Type</label>
              <Select
                value={formData.deviceType}
                onValueChange={(val) => setFormData({ ...formData, deviceType: val })}
              >
                <SelectTrigger className="w-full bg-[#F8F9FC] border-none rounded-sm h-12 mt-1 text-gray-600 focus:ring-1 focus:ring-primary/20 py-6">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="old">Old</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-3">
              <label className="text-[14px] font-medium text-gray-700">Battery</label>
              <Input
                placeholder="e.g. 5000mAh"
                value={formData.battery}
                onChange={(e) => setFormData({ ...formData, battery: e.target.value })}
                className="w-full bg-[#F8F9FC] border-none rounded-sm h-12 mt-1 text-gray-600"
              />
            </div>
            <div className="space-y-3">
              <label className="text-[14px] font-medium text-gray-700">Display</label>
              <Input
                placeholder="e.g. 6.7 inch OLED"
                value={formData.dispalyy}
                onChange={(e) => setFormData({ ...formData, dispalyy: e.target.value })}
                className="w-full bg-[#F8F9FC] border-none rounded-sm h-12 mt-1 text-gray-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="space-y-3">
              <label className="text-[14px] font-medium text-gray-700">CPU (cheap)</label>
              <Input
                placeholder="e.g. M3 Pro"
                value={formData.cheap}
                onChange={(e) => setFormData({ ...formData, cheap: e.target.value })}
                className="w-full bg-[#F8F9FC] border-none rounded-sm h-12 mt-1 text-gray-600"
              />
            </div>
            <div className="space-y-3">
              <label className="text-[14px] font-medium text-gray-700">Camera</label>
              <Input
                placeholder="e.g. 48MP Triple"
                value={formData.camera}
                onChange={(e) => setFormData({ ...formData, camera: e.target.value })}
                className="w-full bg-[#F8F9FC] border-none rounded-sm mt-1 h-12 text-gray-600"
              />
            </div>
            <div className="space-y-3">
              <label className="text-[14px] font-medium text-gray-700">Base Price</label>
              <Input
                type="number"
                placeholder="0.00"
                value={formData.basePrice}
                onChange={(e) => setFormData({ ...formData, basePrice: e.target.value })}
                className="w-full bg-[#F8F9FC] border-none mt-1 rounded-sm h-12 text-gray-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-[14px] font-medium text-gray-700">Stock</label>
              <Input
                type="number"
                placeholder="0"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                className="w-full bg-[#F8F9FC] border-none mt-1 rounded-sm h-12 text-gray-600"
              />
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-[14px] font-medium text-gray-900 uppercase tracking-tighter">Storage Options</label>
                <Button type="button" variant="ghost" size="sm" onClick={() => addArrayItem(setStorage)} className="text-primary font-medium">
                  <Plus className="w-4 h-4 mr-1" /> Add Option
                </Button>
              </div>
              {storage.map((item, idx) => (
                <div key={idx} className="flex gap-4 items-center animate-in fade-in slide-in-from-top-1">
                  <Input
                    placeholder="Type (e.g. 128GB)"
                    value={item.type}
                    onChange={(e) => updateArrayItem(setStorage, idx, 'type', e.target.value)}
                    className="bg-gray-50 border-none h-11"
                  />
                  <Input
                    type="number"
                    placeholder="Extra Price"
                    value={item.price}
                    onChange={(e) => updateArrayItem(setStorage, idx, 'price', e.target.value)}
                    className="bg-gray-50 border-none h-11"
                  />
                  <Button variant="ghost" size="icon" onClick={() => removeArrayItem(setStorage, idx)} className="text-red-500 hover:text-red-600 hover:bg-red-50">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-[14px] font-medium text-gray-900 uppercase tracking-tighter">RAM Options</label>
                <Button type="button" variant="ghost" size="sm" onClick={() => addArrayItem(setRam)} className="text-primary font-medium">
                  <Plus className="w-4 h-4 mr-1" /> Add Option
                </Button>
              </div>
              {ram.map((item, idx) => (
                <div key={idx} className="flex gap-4 items-center animate-in fade-in slide-in-from-top-1">
                  <Input
                    placeholder="Type (e.g. 8GB)"
                    value={item.type}
                    onChange={(e) => updateArrayItem(setRam, idx, 'type', e.target.value)}
                    className="bg-gray-50 border-none h-11"
                  />
                  <Input
                    type="number"
                    placeholder="Extra Price"
                    value={item.price}
                    onChange={(e) => updateArrayItem(setRam, idx, 'price', e.target.value)}
                    className="bg-gray-50 border-none h-11"
                  />
                  <Button variant="ghost" size="icon" onClick={() => removeArrayItem(setRam, idx)} className="text-red-500 hover:text-red-600 hover:bg-red-50">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-[14px] font-medium text-gray-900 uppercase tracking-tighter">Color Options</label>
                <Button type="button" variant="ghost" size="sm" onClick={() => addArrayItem(setColors)} className="text-primary font-medium">
                  <Plus className="w-4 h-4 mr-1" /> Add Color
                </Button>
              </div>
              {colors.map((item, idx) => (
                <div key={idx} className="flex gap-4 items-center animate-in fade-in slide-in-from-top-1">
                  <div className="flex-1 relative">
                    <Input
                      placeholder="Hex Code (e.g. #000000)"
                      value={item.type}
                      onChange={(e) => updateArrayItem(setColors, idx, 'type', e.target.value)}
                      className="bg-gray-50 border-none h-11 pl-12"
                    />
                    <div
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border border-gray-200"
                      style={{ backgroundColor: item.type || '#ddd' }}
                    />
                  </div>
                  <Input
                    type="number"
                    placeholder="Extra Price"
                    value={item.price}
                    onChange={(e) => updateArrayItem(setColors, idx, 'price', e.target.value)}
                    className="bg-gray-50 border-none h-11"
                  />
                  <Button variant="ghost" size="icon" onClick={() => removeArrayItem(setColors, idx)} className="text-red-500 hover:text-red-600 hover:bg-red-50">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[14px] font-medium text-gray-800">Product Image</label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="w-full border-2 border-dashed border-blue-400 rounded-lg mt-1 h-48 flex flex-col items-center justify-center p-6 text-center cursor-pointer hover:bg-gray-50/50 transition-colors relative group"
            >
              {imagePreview ? (
                <div className="absolute inset-2">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    fill
                    className="object-contain rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                    <CloudUpload className="text-white w-8 h-8" />
                  </div>
                </div>
              ) : (
                <>
                  <CloudUpload className="w-8 h-8 text-gray-300 mb-2" />
                  <p className="text-[15px] text-gray-500">
                    <span className="font-medium text-primary">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-[13px] text-gray-400 mt-1">Accepts PNG, JPG or WEBP (max. 10MB)</p>
                </>
              )}
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={onImageChange}
              />
            </div>
          </div>

        </div>
        <DialogFooter className="p-6 pt-4 pb-8 sm:justify-center gap-3 sticky bottom-0 bg-white border-t border-gray-50 z-10 shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.1)]">
          <DialogClose asChild>
            <Button variant="outline" className="w-full sm:w-[150px] h-12 rounded-sm bg-[#F2F2F2] border-none font-medium text-gray-700 hover:bg-[#E5E5E5] transition-colors">
              Cancel
            </Button>
          </DialogClose>
          <Button
            onClick={onSubmit}
            disabled={isSaving}
            className="w-full sm:w-[180px] h-12 rounded-sm bg-primary hover:bg-primary/90 text-white font-medium shadow-md transition-transform active:scale-95"
          >
            {isSaving ? "Saving..." : (editingId ? "Save Changes" : "Save Product")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
