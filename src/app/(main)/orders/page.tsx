"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { Search, ChevronLeft, ChevronRight, Eye, CreditCard, Calendar } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useAllOrdersQuery } from "@/features/orders/ordersApi";

interface Order {
  _id: string;
  orderId?: string;
  date: string;
  userName: string;
  totalPrice: number;
  PaymentMethod: string;
  status: string;
}

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");

  const { data: orderResponse, isLoading } = useAllOrdersQuery({ 
    page, 
    limit: 10 
  });

  const orders = orderResponse?.data || [];
  const meta = orderResponse?.meta || { total: 0, totalPage: 1, limit: 10, page: 1 };

  const getStatusStyles = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
      case "paid":
        return "bg-[#E6F9F0] text-[#2DC766]";
      case "pending":
        return "bg-[#FFF4E5] text-[#FFA500]";
      case "cancelled":
        return "bg-[#FFEBEB] text-[#E74C3C]";
      default:
        return "bg-gray-100 text-gray-500";
    }
  };

  const filteredOrders = orders.filter((order: Order) => {
    const matchesSearch = order.userName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          order.orderId?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-medium text-gray-900 tracking-tight">Orders Management</h1>
        <p className="text-gray-500 font-medium">Monitoring global billing and administrative order records.</p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col lg:flex-row gap-6 items-center justify-between">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            placeholder="Search by order ID or customer name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 bg-gray-50 border-none h-14 rounded-xl text-gray-600 font-medium focus-visible:ring-1 focus-visible:ring-primary/20 w-full"
          />
        </div>
        <div className='w-full lg:w-[240px]'>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full h-14 bg-gray-50 border-none py-7 rounded-xl text-gray-600 font-medium focus:ring-1 focus:ring-primary/20">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-gray-100 font-medium">
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-[#F8F9FC]">
            <TableRow className="hover:bg-transparent border-gray-50">
              <TableHead className="py-6 px-8 text-gray-900 font-medium text-[15px]">Order Info</TableHead>
              <TableHead className="py-6 text-gray-900 font-medium text-[15px]">Customer</TableHead>
              <TableHead className="py-6 text-gray-900 font-medium text-[15px]">Amount</TableHead>
              <TableHead className="py-6 text-gray-900 font-medium text-[15px]">Status</TableHead>
              <TableHead className="py-6 px-8 text-right text-gray-900 font-medium text-[15px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i} className="animate-pulse">
                  <TableCell colSpan={5} className="h-20 bg-gray-50/50" />
                </TableRow>
              ))
            ) : filteredOrders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-64 text-center">
                  <div className="flex flex-col items-center justify-center text-gray-400 font-medium">
                    <CreditCard className="w-12 h-12 mb-4 opacity-20" />
                    <p>No transactions found.</p>
                    <Button variant="link" onClick={() => {setSearchTerm(""); setStatusFilter("all")}} className="text-primary font-medium mt-2">Reset Filters</Button>
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredOrders.map((order: Order) => (
              <TableRow key={order._id} className="hover:bg-gray-50/50 border-gray-50 transition-colors group">
                <TableCell className="py-6 px-8">
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-900 text-[15px]">{order.orderId || "N/A"}</span>
                    <div className="flex items-center gap-2 text-gray-400 text-[12px] font-medium mt-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(order.date).toLocaleDateString()}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-6">
                  <span className="font-medium text-gray-700">{order.userName}</span>
                </TableCell>
                <TableCell className="py-6">
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-900 text-lg">€{order.totalPrice.toLocaleString()}</span>
                    <span className="text-[11px] text-primary font-medium uppercase tracking-wider">{order.PaymentMethod}</span>
                  </div>
                </TableCell>
                <TableCell className="py-6">
                  <Badge className={cn("px-4 py-1.5 rounded-full font-medium border-none shadow-none text-[12px] capitalize", getStatusStyles(order.status))}>
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell className="py-6 px-8 text-right">
                  <Button asChild variant="ghost" size="icon" className="w-11 h-11 rounded-xl text-gray-400 hover:text-primary hover:bg-primary/10 transition-all">
                    <Link href={`/orders/${order._id}`}>
                      <Eye className="w-5 h-5" />
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="p-8 border-t border-gray-50 flex flex-col md:flex-row items-center justify-between gap-4 bg-white">
          <p className="text-gray-500 font-medium text-sm">Showing {filteredOrders.length} of {meta.total} Transactions</p>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              className="text-gray-400 font-medium hover:bg-transparent"
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
            >
              <ChevronLeft className="w-5 h-5 mr-1" /> Prev
            </Button>
            <div className="flex items-center gap-2 px-2">
              {Array.from({ length: meta.totalPage }, (_, i) => i + 1).map((pageNum) => (
                <Button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  className={cn(
                    "w-10 h-10 p-0 rounded-lg font-medium transition-all",
                    page === pageNum 
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
              className="text-gray-400 font-medium hover:bg-transparent"
              onClick={() => setPage(Math.min(meta.totalPage, page + 1))}
              disabled={page === meta.totalPage}
            >
              Next <ChevronRight className="w-5 h-5 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}