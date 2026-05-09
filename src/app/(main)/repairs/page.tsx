"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { Search } from "lucide-react";
import { useState } from "react";
import { useGetAllRepairsQuery, useUpdateStatusMutation } from "@/features/repairs/repairsApi";
import toast from "react-hot-toast";

type RepairStatus = "pending" | "accepted" | "in-progress" | "completed" | "cancelled";

export default function Repairs() {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const { data: repairsResponse, isLoading } = useGetAllRepairsQuery({ page, limit: 10 });
  const [updateStatus, { isLoading: isUpdating }] = useUpdateStatusMutation();

  const repairs = repairsResponse?.data || [];
  const meta = repairsResponse?.meta || { total: 0, limit: 10, page: 1, totalPage: 1 };

  const getStatusStyles = (status: RepairStatus) => {
    switch (status) {
      case "pending":
        return "bg-[#FFF4E5] text-[#FFA500] hover:bg-[#FFF4E5]";
      case "accepted":
        return "bg-[#E6F9F0] text-[#2DC766] hover:bg-[#E6F9F0]";
      case "in-progress":
        return "bg-[#E0F2FE] text-[#0284C7] hover:bg-[#E0F2FE]";
      case "completed":
        return "bg-green-100 text-green-700 hover:bg-green-100";
      case "cancelled":
        return "bg-[#FFEBEB] text-[#E74C3C] hover:bg-[#FFEBEB]";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      await updateStatus({ id, data: { status: newStatus } }).unwrap();
      toast.success("Status updated successfully");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update status");
    }
  };

  const filteredRepairs = repairs.filter((repair: any) => {
    const matchesSearch = repair.user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      repair._id?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || repair.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-medium text-gray-900">Repairs Management</h1>
        <p className="text-gray-500">Manage and track customer device repair orders</p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:max-w-2xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            placeholder="Search by ID or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 bg-gray-50 border-none h-14 rounded-lg text-gray-600 font-medium focus-visible:ring-1 focus-visible:ring-primary/20"
          />
        </div>
        <div className='w-full md:w-[240px]'>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full h-14 bg-gray-50 border-none py-7 cursor-pointer rounded-lg text-gray-600 font-medium focus-visible:ring-1 focus-visible:ring-primary/20">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent className="rounded-lg border-gray-100 font-medium">
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="accepted">Accepted</SelectItem>
              <SelectItem value="in-progress">In-Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden min-h-[400px]">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-gray-50 bg-[#F8F9FC]">
              <TableHead className="py-6 px-8 text-gray-900 font-medium h-14 text-[15px]">Repair ID</TableHead>
              <TableHead className="py-6 text-gray-900 font-medium h-14 text-[15px]">Customer</TableHead>
              <TableHead className="py-6 text-gray-900 font-medium h-14 text-[15px]">Product</TableHead>
              <TableHead className="py-6 text-gray-900 font-medium h-14 text-[15px]">Service Type</TableHead>
              <TableHead className="py-6 text-gray-900 font-medium h-14 text-[15px]">Status</TableHead>
              <TableHead className="py-6 px-8 text-center text-gray-900 font-medium h-14 text-[15px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i} className="animate-pulse">
                  <TableCell colSpan={6} className="h-20 bg-gray-50/50" />
                </TableRow>
              ))
            ) : filteredRepairs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-60 text-center text-gray-400 font-medium">
                  No repairs found.
                </TableCell>
              </TableRow>
            ) : filteredRepairs.map((repair: any) => (
              <TableRow key={repair._id} className="hover:bg-gray-50/50 border-gray-50 transition-colors">
                <TableCell className="py-5 px-8 font-medium text-gray-700">#{repair._id.slice(-6).toUpperCase()}</TableCell>
                <TableCell className="py-5">
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-900 text-[15px] truncate max-w-[200px]">{repair.user?.email}</span>
                    <span className="text-gray-500 font-medium text-[13px]">{repair.address}</span>
                  </div>
                </TableCell>
                <TableCell className="py-5 font-medium text-gray-700">{repair.product?.name || "Manual Service"}</TableCell>
                <TableCell className="py-5">
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-700 capitalize">{repair.serviceType}</span>
                    <span className="text-[12px] text-gray-400 font-medium">{repair.timeSlot}</span>
                  </div>
                </TableCell>
                <TableCell className="py-5">
                  <Badge className={cn("px-4 py-1.5 rounded-full font-medium border-none shadow-none text-[13px]", getStatusStyles(repair.status as RepairStatus))}>
                    {repair.status.replace('-', ' ')}
                  </Badge>
                </TableCell>
                <TableCell className="py-5 px-8">
                  <div className="flex items-center justify-center">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="bg-[#F2F2F2] hover:bg-[#E5E5E5] text-gray-700 rounded-sm px-6 font-medium h-10 transition-transform active:scale-95">
                          Update Status
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[450px] p-0 rounded-lg border-none shadow-2xl overflow-hidden">
                        <DialogHeader className="p-6 pb-4 border-b border-gray-100 bg-[#F8F9FC]">
                          <DialogTitle className="text-xl font-medium text-gray-900">Change Repair Status</DialogTitle>
                        </DialogHeader>
                        <div className="p-8 space-y-6">
                          <div className="space-y-4">
                            <label className="text-sm font-medium text-gray-400 uppercase tracking-wider">Select New Status</label>
                            <Select
                              defaultValue={repair.status}
                              onValueChange={(val) => handleUpdateStatus(repair._id, val)}
                            >
                              <SelectTrigger className="w-full bg-[#F8F9FC] border-none rounded-sm h-12 text-gray-700 font-medium focus:ring-1 focus:ring-primary/20 mt-1">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="rounded-sm border-gray-100 font-medium">
                                <SelectItem value="pending">Pending Review</SelectItem>
                                <SelectItem value="accepted">Accepted Order</SelectItem>
                                <SelectItem value="in-progress">Repair In-Progress</SelectItem>
                                <SelectItem value="completed">Work Completed</SelectItem>
                                <SelectItem value="cancelled">Order Cancelled</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <DialogFooter className="p-6 pt-0 sm:justify-center">
                          <DialogClose asChild>
                            <Button variant="outline" className="w-full h-12 rounded-sm bg-gray-50 border-none font-medium text-gray-600 hover:bg-gray-100 transition-colors">
                              Close Window
                            </Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="p-8 border-t border-gray-50 flex flex-col md:flex-row items-center justify-between gap-4 bg-white">
          <p className="text-gray-500 font-medium">Showing {filteredRepairs.length} of {meta.total} Repairs</p>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              className="text-gray-400 font-medium hover:bg-transparent text-[15px]"
              disabled={meta.page === 1}
              onClick={() => setPage(page - 1)}
            >
              Prev
            </Button>
            <div className="flex items-center gap-2 px-2">
              {Array.from({ length: meta.totalPage }, (_, i) => i + 1).map((pageNum) => (
                <Button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  className={cn(
                    "w-10 h-10 p-0 rounded-lg font-medium transition-all",
                    meta.page === pageNum
                      ? "bg-primary text-white hover:bg-primary/90 shadow-md"
                      : "bg-white border border-gray-100 text-gray-600 hover:bg-gray-50"
                  )}
                >
                  {pageNum}
                </Button>
              ))}
            </div>
            <Button
              variant="ghost"
              className="text-gray-400 font-medium hover:bg-transparent text-[15px]"
              disabled={meta.page === meta.totalPage}
              onClick={() => setPage(page + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
