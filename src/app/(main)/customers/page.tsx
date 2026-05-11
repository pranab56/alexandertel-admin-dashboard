"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { CreditCard, Eye, Gift, Mail, MapPin, Phone, Trash2 } from "lucide-react";
import {
  useGetAllCustomersQuery,
  useDeleteCustomerMutation,
  useUpdateStatusMutation
} from "@/features/customers/customersApi";
import { useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";

interface Customer {
  _id: string;
  userName: string;
  email: string;
  verified: boolean;
  profile?: string;
  loyaltyPoints: number;
  phoneNumber?: string;
  location?: string;
  accountInformation?: {
    status: boolean;
  };
}

export default function Customers() {
  const [page, setPage] = useState(1);
  const { data: customersResponse, isLoading } = useGetAllCustomersQuery({ page, limit: 10 });
  const [deleteCustomer] = useDeleteCustomerMutation();
  const [updateStatus] = useUpdateStatusMutation();

  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const customers = customersResponse?.data?.data || [];
  const meta = customersResponse?.data?.meta || { total: 0, limit: 10, page: 1, totalPage: 1 };

  const handleToggleStatus = async (id: string) => {
    try {
      await updateStatus(id).unwrap();
      toast.success("Status updated successfully");
    } catch (error: unknown) {
      const err = error as { data?: { message?: string } };
      toast.error(err.data?.message || "Failed to update status");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this customer?")) {
      try {
        await deleteCustomer(id).unwrap();
        toast.success("Customer deleted successfully");
      } catch (error: unknown) {
        const err = error as { data?: { message?: string } };
        toast.error(err.data?.message || "Failed to delete customer");
      }
    }
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-medium text-gray-900">Customers Management</h1>
        <p className="text-gray-500">Manage and view your customer directory and loyalty programs.</p>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden min-h-[400px]">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-gray-50 bg-[#F8F9FC]">
              <TableHead className="py-6 px-8 text-gray-900 font-medium h-14 text-[15px]">Customer</TableHead>
              <TableHead className="py-6 text-gray-900 font-medium h-14 text-[15px]">Email Address</TableHead>
              <TableHead className="py-6 text-gray-900 font-medium h-14 text-[15px]">Status</TableHead>
              <TableHead className="py-6 text-gray-900 font-medium h-14 text-[15px]">Loyalty Points</TableHead>
              <TableHead className="py-6 px-8 text-right text-gray-900 font-medium h-14 text-[15px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i} className="animate-pulse">
                  <TableCell colSpan={5} className="h-20 bg-gray-50/50" />
                </TableRow>
              ))
            ) : customers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-60 text-center text-gray-400 font-medium font-medium">
                  No customers found.
                </TableCell>
              </TableRow>
            ) : (
              customers.map((customer: Customer) => (
                <TableRow key={customer._id} className="hover:bg-gray-50/50 border-gray-50 transition-colors">
                  <TableCell className="py-5 px-8 flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-50 border border-gray-100 rounded-full overflow-hidden relative shrink-0">
                      <Image
                        src={customer.profile || "/placeholder-user.jpg"}
                        alt={customer.userName}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-900 text-[15px]">{customer.userName}</span>
                      <span className="text-gray-500 font-medium text-[13px]">Verified: {customer.verified ? 'Yes' : 'No'}</span>
                    </div>
                  </TableCell>
                  <TableCell className="py-5 font-medium text-gray-600 text-[15px]">{customer.email}</TableCell>
                  <TableCell className="py-5">
                    <Badge
                      onClick={() => handleToggleStatus(customer._id)}
                      className={cn(
                        "px-4 py-1.5 rounded-full font-medium border-none shadow-none text-[13px] cursor-pointer transition-all active:scale-95",
                        customer.accountInformation?.status
                          ? "bg-[#E6F9F0] text-[#2DC766] hover:bg-[#D5F5E3]"
                          : "bg-[#FFEBEB] text-[#E74C3C] hover:bg-[#FADBD8]"
                      )}
                    >
                      {customer.accountInformation?.status ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-5">
                    <Badge className="bg-[#F2F2F2] text-gray-700 hover:bg-[#F2F2F2] px-4 py-1.5 rounded-full font-medium border-none shadow-none text-[14px]">
                      {customer.loyaltyPoints} pts
                    </Badge>
                  </TableCell>
                  <TableCell className="py-5 px-8 text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedCustomer(customer);
                          setIsDetailsOpen(true);
                        }}
                        className="h-9 w-9 text-gray-400 hover:text-primary hover:bg-primary/5 transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-5 h-5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(customer._id)}
                        className="h-9 w-9 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-5 h-5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="p-8 border-t border-gray-50 flex flex-col md:flex-row items-center justify-between gap-4 bg-white">
          <p className="text-gray-500 font-medium">Showing {customers.length} of {meta.total} Customers</p>
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
                      : "bg-white border border-gray-100 text-gray-600 hover:bg-gray-50 hover:border-gray-200"
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

      {/* Profile Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-xl p-0 rounded-lg border-none overflow-hidden gap-0">
          <DialogHeader className="p-6 pb-4 border-b border-gray-100 bg-[#F8F9FC]">
            <DialogTitle className="text-xl font-medium text-gray-900">Customer Profile</DialogTitle>
          </DialogHeader>
          {selectedCustomer && (
            <div className="p-8 space-y-8">
              {/* Profile Header Block */}
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 bg-gray-50 border-2 border-primary/10 rounded-full overflow-hidden relative shrink-0 shadow-sm">
                  <Image
                    src={selectedCustomer.profile || "/placeholder-user.jpg"}
                    alt={selectedCustomer.userName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-medium text-gray-900 tracking-tight">{selectedCustomer.userName}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-gray-500 font-medium">Customer ID:</p>
                    <code className="bg-gray-100 px-2 py-0.5 rounded text-[13px] font-medium text-gray-700">{selectedCustomer._id}</code>
                  </div>
                </div>
              </div>

              {/* Details List */}
              <div className="grid grid-cols-2 gap-y-6 gap-x-8">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#F2F2F2] rounded-xl flex items-center justify-center shrink-0 shadow-sm">
                    <Mail className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[12px] text-gray-400 font-medium uppercase tracking-wider">Email Address</span>
                    <span className="font-medium text-gray-900 text-[15px] truncate max-w-[180px]">{selectedCustomer.email}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#F2F2F2] rounded-xl flex items-center justify-center shrink-0 shadow-sm">
                    <Phone className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[12px] text-gray-400 font-medium uppercase tracking-wider">Phone Number</span>
                    <span className="font-medium text-gray-900 text-[15px]">{selectedCustomer.phoneNumber || '+1 (555) 000-0000'}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#F2F2F2] rounded-xl flex items-center justify-center shrink-0 shadow-sm">
                    <MapPin className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[12px] text-gray-400 font-medium uppercase tracking-wider">Location</span>
                    <span className="font-medium text-gray-900 text-[15px]">{selectedCustomer.location || 'Dhaka'}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#F2F2F2] rounded-xl flex items-center justify-center shrink-0 shadow-sm">
                    <Badge className={cn("p-1 rounded-sm", selectedCustomer.verified ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700")}>
                      {selectedCustomer.verified ? 'Verified' : 'Unverified'}
                    </Badge>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[12px] text-gray-400 font-medium uppercase tracking-wider">Verification</span>
                    <span className="font-medium text-gray-900 text-[15px]">{selectedCustomer.verified ? 'Complete' : 'Pending'}</span>
                  </div>
                </div>
              </div>

              {/* Balance & Loyalty Cards */}
              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-100">
                <div className="bg-[#F8F9FC] p-4 rounded-2xl flex flex-col gap-2 border border-blue-50/50">
                  <CreditCard className="w-6 h-6 text-primary" />
                  <span className="text-[13px] text-gray-500 font-medium uppercase">Wallet Balance</span>
                  <span className="text-2xl font-medium text-gray-900">€0.00</span>
                </div>
                <div className="bg-[#FFF8E7] p-4 rounded-2xl flex flex-col gap-2 border border-amber-50/50">
                  <Gift className="w-6 h-6 text-[#FFA500]" />
                  <span className="text-[13px] text-[#A67E33] font-medium uppercase">Loyalty Points</span>
                  <span className="text-2xl font-medium text-[#D98C00]">{selectedCustomer.loyaltyPoints}</span>
                </div>
              </div>

            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}