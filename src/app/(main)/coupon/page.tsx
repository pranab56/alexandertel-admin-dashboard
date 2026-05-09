"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Trash2 } from "lucide-react";
import { useState } from "react";
import { useCreateCouponMutation, useDeleteCouponMutation, useGetAllCouponsQuery } from "@/features/coupon/couponApi";
import toast from "react-hot-toast";

interface Coupon {
  _id: string;
  code: string;
  discountType: string;
  discountValue: number;
  expireAt: string;
  isActive: boolean;
  createdAt: string;
}

export default function CouponPage() {
  const { data: couponResponse, isLoading } = useGetAllCouponsQuery(undefined);
  const [createCoupon, { isLoading: isCreating }] = useCreateCouponMutation();
  const [deleteCoupon] = useDeleteCouponMutation();

  const [formData, setFormData] = useState({
    code: "",
    discountType: "percentage",
    discountValue: 0,
    expireAt: undefined as Date | undefined,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [couponToDelete, setCouponToDelete] = useState<string | null>(null);

  const coupons: Coupon[] = couponResponse?.data || [];

  const handleCreateCoupon = async () => {
    if (!formData.code || !formData.expireAt || formData.discountValue <= 0) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      await createCoupon({
        code: formData.code,
        discountType: formData.discountType,
        discountValue: Number(formData.discountValue),
        expireAt: formData.expireAt.toISOString(),
      }).unwrap();
      toast.success("Coupon created successfully");
      setIsModalOpen(false);
      setFormData({
        code: "",
        discountType: "percentage",
        discountValue: 0,
        expireAt: undefined,
      });
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to create coupon");
    }
  };

  const handleDelete = async () => {
    if (!couponToDelete) return;

    const toastId = toast.loading("Deleting coupon...");
    try {
      await deleteCoupon(couponToDelete).unwrap();
      toast.success("Coupon deleted successfully", { id: toastId });
      setIsDeleteModalOpen(false);
      setCouponToDelete(null);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to delete coupon", { id: toastId });
    }
  };

  const getStatusStyles = (isActive: boolean) => {
    return isActive
      ? "bg-[#E6F9F0] text-[#2DC766] hover:bg-[#E6F9F0]"
      : "bg-[#F2F2F2] text-[#808080] hover:bg-[#F2F2F2]";
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold text-gray-900">Coupon Management</h1>
          <p className="text-gray-500 max-w-lg">Manage discount codes and promotional offers for your customers.</p>
        </div>

        {/* Create Coupon Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90 text-white rounded-xl px-6 py-3 h-auto font-medium shadow-sm">
              Create Coupon Code
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] p-0 rounded-xl border-none overflow-hidden gap-0 max-h-[90vh] overflow-y-auto hidden-scrollbar">
            <DialogHeader className="p-6 pb-4 border-b border-gray-100 sticky top-0 bg-white z-10">
              <DialogTitle className="text-[20px] font-medium text-gray-900">Create Coupon Code</DialogTitle>
            </DialogHeader>
            <div className="p-6 space-y-6">
              <div className="space-y-3">
                <label className="text-[15px] font-medium text-gray-800">Coupon Code</label>
                <Input
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  placeholder="E.G., DISCOUNT10"
                  className="w-full bg-[#F8F9FC] border-none rounded-xl h-14 text-gray-600 focus-visible:ring-1 focus-visible:ring-primary/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <label className="text-[15px] font-medium text-gray-800">Discount Type</label>
                  <Select
                    value={formData.discountType}
                    onValueChange={(v) => setFormData({ ...formData, discountType: v })}
                  >
                    <SelectTrigger className="w-full bg-[#F8F9FC] border-none rounded-xl py-6 h-14 text-gray-600 focus:ring-1 focus:ring-primary/20">
                      <SelectValue placeholder="Discount Type" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-gray-100">
                      <SelectItem value="percentage">Percentage</SelectItem>
                      <SelectItem value="fixed">Fixed Amount</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-3">
                  <label className="text-[15px] font-medium text-gray-800">Discount Value</label>
                  <Input
                    type="number"
                    value={formData.discountValue}
                    onChange={(e) => setFormData({ ...formData, discountValue: Number(e.target.value) })}
                    placeholder="Value"
                    className="w-full bg-[#F8F9FC] border-none rounded-xl h-14 text-gray-600 focus-visible:ring-1 focus-visible:ring-primary/20"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[15px] font-medium text-gray-800">Expiry Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full bg-[#F8F9FC] border-none rounded-xl h-14 text-left font-normal flex items-center justify-between px-4 text-base hover:bg-[#F8F9FC]/80",
                        !formData.expireAt && "text-gray-400"
                      )}
                    >
                      {formData.expireAt ? format(formData.expireAt, "PPP") : "Select expiry date"}
                      <CalendarIcon className="h-5 w-5 text-gray-400" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.expireAt}
                      onSelect={(date) => setFormData({ ...formData, expireAt: date })}
                      initialFocus
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <DialogFooter className="p-6 pt-2 pb-6 sm:justify-center gap-3 sticky bottom-0 bg-white">
              <DialogClose asChild>
                <Button variant="outline" className="w-full sm:w-[150px] h-12 rounded-xl bg-[#F2F2F2] border-none font-medium text-gray-700 hover:bg-[#E5E5E5] transition-colors">
                  Cancel
                </Button>
              </DialogClose>
              <Button
                onClick={handleCreateCoupon}
                disabled={isCreating}
                className="w-full sm:w-[180px] h-12 rounded-xl bg-primary hover:bg-primary/90 text-white font-medium transition-transform active:scale-[0.98]"
              >
                {isCreating ? "Creating..." : "Create Coupon"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-gray-500">Loading coupons...</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-gray-50 bg-[#F8F9FC]">
                <TableHead className="py-6 px-8 text-gray-900 font-medium h-14 text-[15px]">Coupon Code</TableHead>
                <TableHead className="py-6 text-gray-900 font-medium h-14 text-[15px]">Discount Type</TableHead>
                <TableHead className="py-6 text-gray-900 font-medium h-14 text-[15px]">Discount Value</TableHead>
                <TableHead className="py-6 text-gray-900 font-medium h-14 text-[15px]">Status</TableHead>
                <TableHead className="py-6 text-gray-900 font-medium h-14 text-[15px]">Expiry Date</TableHead>
                <TableHead className="py-6 px-8 text-right text-gray-900 font-medium h-14 text-[15px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {coupons.length > 0 ? (
                coupons.map((coupon) => (
                  <TableRow key={coupon._id} className="hover:bg-gray-50/50 border-gray-50">
                    <TableCell className="py-5 px-8">
                      <div className="flex items-center gap-4">
                        <div className="w-[42px] h-[42px] bg-[#F4F6F9] rounded-full flex items-center justify-center shrink-0">
                          <span className="font-medium text-gray-700 text-[11px]">CODE</span>
                        </div>
                        <span className="font-medium text-gray-900 text-[15px]">{coupon.code}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-5 font-medium text-gray-700 text-[15px] capitalize">
                      {coupon.discountType}
                    </TableCell>
                    <TableCell className="py-5 font-medium text-gray-700 text-[15px]">
                      {coupon.discountValue}
                      {coupon.discountType === "percentage" ? "%" : ""}
                    </TableCell>
                    <TableCell className="py-5">
                      <Badge className={cn("px-4 py-1.5 rounded-full font-medium border-none shadow-none text-[14px]", getStatusStyles(coupon.isActive))}>
                        {coupon.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-5 font-medium text-gray-700 text-[15px]">
                      {format(new Date(coupon.expireAt), "MMM dd, yyyy")}
                    </TableCell>
                    <TableCell className="py-5 px-8 text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setCouponToDelete(coupon._id);
                          setIsDeleteModalOpen(true);
                        }}
                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="py-10 text-center text-gray-500 font-medium">
                    No coupons found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}

        {/* Info Area */}
        {coupons.length > 0 && (
          <div className="p-6 border-t border-gray-50 bg-white">
            <p className="text-gray-500 font-medium">Total Coupons: {coupons.length}</p>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className="sm:max-w-[400px] p-0 rounded-2xl border-none overflow-hidden">
          <DialogHeader className="p-6 pb-2">
            <DialogTitle className="text-xl font-semibold text-gray-900 text-center">Delete Coupon</DialogTitle>
          </DialogHeader>
          <div className="p-6 pt-0 text-center">
            <p className="text-gray-500 text-[15px]">
              Are you sure you want to delete this coupon? This action cannot be undone.
            </p>
          </div>
          <DialogFooter className="p-6 pt-0 sm:justify-center gap-3">
            <DialogClose asChild>
              <Button variant="outline" className="w-full sm:w-[130px] h-11 rounded-xl bg-gray-100 border-none font-medium text-gray-700 hover:bg-gray-200">
                Cancel
              </Button>
            </DialogClose>
            <Button
              onClick={handleDelete}
              className="w-full sm:w-[130px] h-11 rounded-xl bg-red-500 hover:bg-red-600 text-white font-medium shadow-md shadow-red-100"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}