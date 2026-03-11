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
import { Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useState } from "react";

type OrderStatus = "Paid" | "Pending" | "Processing" | "Error";

interface Order {
  id: string;
  customer: string;
  paymentMethod: string;
  status: OrderStatus;
}

const initialOrders: Order[] = [
  { id: "#1207", customer: "Jane Koper", paymentMethod: "Pay in Store", status: "Paid" },
  { id: "#1207", customer: "Jane Koper", paymentMethod: "Pay in Store", status: "Pending" },
  { id: "#1207", customer: "Jane Koper", paymentMethod: "Pay in Store", status: "Processing" },
  { id: "#1207", customer: "Jane Koper", paymentMethod: "Pay in Store", status: "Error" },
  { id: "#1207", customer: "Jane Koper", paymentMethod: "Pay in Store", status: "Paid" },
  { id: "#1207", customer: "Jane Koper", paymentMethod: "Pay in Store", status: "Pending" },
  { id: "#1207", customer: "Jane Koper", paymentMethod: "Pay in Store", status: "Paid" },
  { id: "#1207", customer: "Jane Koper", paymentMethod: "Pay in Store", status: "Processing" },
  { id: "#1207", customer: "Jane Koper", paymentMethod: "Pay in Store", status: "Error" },
];

export default function Orders() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const getStatusStyles = (status: OrderStatus) => {
    switch (status) {
      case "Paid":
        return "bg-[#E6F9F0] text-[#2DC766] hover:bg-[#E6F9F0]";
      case "Pending":
        return "bg-[#FFF4E5] text-[#FFA500] hover:bg-[#FFF4E5]";
      case "Processing":
        return "bg-[#EEEBFF] text-[#6C63FF] hover:bg-[#EEEBFF]";
      case "Error":
        return "bg-[#FFEBEB] text-[#E74C3C] hover:bg-[#FFEBEB]";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-medium text-gray-900">Orders Management</h1>
          <p className="text-gray-500 mt-1">Manage your all orders list</p>
        </div>
        <Button onClick={() => router.push("/orders/35434")} className="bg-primary hover:bg-primary/90 text-white rounded-lg px-10 py-3.5 h-auto font-medium">
          Add New Product
        </Button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-8/12">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 bg-gray-50 border-none bg-background h-14 rounded-xl text-gray-600 focus-visible:ring-1 focus-visible:ring-primary/20"
          />
        </div>
        <div className='w-4/12'>
          <Select defaultValue="all">
            <SelectTrigger className="w-full h-14 bg-background border-none py-7 cursor-pointer rounded-xl text-gray-600 font-medium focus-visible:ring-1 focus-visible:ring-primary/20">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-gray-100">
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="error">Error</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-gray-50 bg-blue-50">
              <TableHead className="py-6 px-8 text-gray-900 font-semibold">Order ID</TableHead>
              <TableHead className="py-6 text-gray-900 font-semibold">Customer</TableHead>
              <TableHead className="py-6 text-gray-900 font-semibold">Payment Method</TableHead>
              <TableHead className="py-6 text-gray-900 font-semibold">Status</TableHead>
              <TableHead className="py-6 px-8 text-right text-gray-900 font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {initialOrders.map((order, idx) => (
              <TableRow key={idx} className="hover:bg-gray-50/50 border-gray-50">
                <TableCell className="py-5 px-8 font-medium text-gray-700">{order.id}</TableCell>
                <TableCell className="py-5 font-medium text-gray-700">{order.customer}</TableCell>
                <TableCell className="py-5 font-medium text-gray-700">{order.paymentMethod}</TableCell>
                <TableCell className="py-5">
                  <Badge className={cn("px-4 py-1.5 rounded-full font-bold border-none shadow-none", getStatusStyles(order.status))}>
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell className="py-5 px-8 text-right space-x-3">
                  <Button asChild className="bg-secondary hover:bg-secondary/90 text-white rounded px-5 font-normal h-10">
                    <Link href={`/orders/${order.id.replace('#', '')}`}>
                      View Details
                    </Link>
                  </Button>
                  <Button variant="outline" className="bg-gray-50 hover:bg-gray-100 text-gray-700 border-none rounded px-5 font-normal h-10">
                    Invoice
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="p-8 border-t border-gray-50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 font-medium">Showing 4 of 248 Orders</p>
          <div className="flex items-center gap-2">
            <Button variant="ghost" className="text-gray-400 font-medium hover:bg-transparent">Prev</Button>
            <div className="flex items-center gap-2 px-2">
              <Button className="w-10 h-10 p-0 rounded-lg bg-primary text-white font-medium hover:bg-primary/90">1</Button>
              <Button variant="outline" className="w-10 h-10 p-0 rounded-lg border-gray-100 text-gray-600 font-medium hover:bg-gray-50">2</Button>
              <Button variant="outline" className="w-10 h-10 p-0 rounded-lg border-gray-100 text-gray-600 font-medium hover:bg-gray-50">3</Button>
              <span className="text-gray-400 px-1 font-medium">...</span>
              <Button variant="outline" className="w-10 h-10 p-0 rounded-lg border-gray-100 text-gray-600 font-medium hover:bg-gray-50">10</Button>
            </div>
            <Button variant="ghost" className="text-gray-400 font-medium hover:bg-transparent">Next</Button>
          </div>
        </div>
      </div>
    </div>
  );
}