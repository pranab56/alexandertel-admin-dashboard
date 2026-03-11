"use client";

import { Button } from "@/components/ui/button";
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
import { ChevronRight, CreditCard, Download } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function OrderDetails() {
  const params = useParams();
  const id = params?.id || "1023";

  return (
    <div className="space-y-8 pb-10">
      {/* Breadcrumb */}
      <div className="flex items-center text-[15px] font-semibold text-gray-500 mb-1 space-x-2">
        <Link href="/orders" className="hover:text-primary transition-colors text-gray-800">Orders</Link>
        <ChevronRight className="w-5 h-5 text-gray-400" />
        <span className="text-primary font-bold">Order Details</span>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
        <div>
          <h1 className="text-3xl font-medium text-gray-900">Order #{id}</h1>
          <p className="text-gray-500 text-sm font-normal mt-1">Placed on Oct 24, 2023, 10:45 AM . Via Web Portal</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="bg-white border-gray-100 text-gray-700 hover:bg-gray-50 rounded px-5 h-12 font-medium shadow-sm transition-all active:scale-[0.98]">
            <Download className="w-5 h-5 mr-2" />
            Downloaded Invoice
          </Button>
          <Select>
            <SelectTrigger className="bg-secondary text-white data-[placeholder]:text-white hover:bg-secondary/90 rounded px-5 !h-12 font-medium shadow-sm transition-all focus:ring-0 border-none w-auto gap-2">
              <SelectValue placeholder="Update Status" />
            </SelectTrigger>
            <SelectContent align="end" className="rounded-xl p-1 border-gray-100 shadow-xl font-medium text-gray-700">
              <SelectItem value="processing" className="cursor-pointer rounded-lg focus:bg-gray-50">Processing</SelectItem>
              <SelectItem value="shipped" className="cursor-pointer rounded-lg focus:bg-gray-50">Shipped</SelectItem>
              <SelectItem value="delivered" className="cursor-pointer rounded-lg focus:bg-gray-50">Delivered</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Info Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Customer Info */}
        <div className="bg-white rounded-xl border border-gray-100 flex flex-col">
          <h2 className="text-lg font-medium text-gray-800 mb-2 bg-blue-50 px-4 py-6">Customer Info</h2>
          <div className="space-y-6 flex-1 p-4">
            <div>
              <p className="text-[13px] font-medium text-gray-500 mb-2">Name</p>
              <p className="font-medium text-gray-900 text-base">Alex Janssen</p>
            </div>
            <div className="h-px bg-gray-100" />
            <div>
              <p className="text-[13px] font-medium text-gray-500 mb-2">Contact</p>
              <p className="font-medium text-gray-900 text-base">alex.j@example.com</p>
              <p className="font-medium text-gray-900 text-base mt-1">+31 6 12345678</p>
            </div>
            <div className="h-px bg-gray-100" />
            <div>
              <p className="text-[13px] font-medium text-gray-500 mb-2">Shipping Address</p>
              <p className="font-medium text-gray-900 text-base leading-relaxed">Street 123, Floor 4 1011 AB<br />Amsterdam The Netherlands</p>
            </div>
          </div>
        </div>

        {/* Shipping & Payment Method */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col ">
          <h2 className="text-lg font-medium text-gray-800 mb-2 bg-blue-50 px-4 py-6">Shipping & Payment Method</h2>
          <div className="space-y-6 flex-1 p-4">
            <div>
              <p className="text-[13px] font-medium text-gray-500 mb-2">Express Delivery</p>
              <p className="font-medium text-gray-900 text-base">Estimated: 1-2 Business Days</p>
            </div>
            <div className="h-px bg-gray-100" />
            <div>
              <p className="text-[13px] font-medium text-gray-500 mb-2">Trashing Number</p>
              <p className="font-medium text-gray-900 text-base">MT 884920112</p>
            </div>
            <div className="h-px bg-gray-100" />
            <div>
              <p className="text-[13px] font-medium text-gray-500 mb-2">IDEAL</p>
              <p className="font-medium text-gray-900 text-base">Transaction D: 0029311029</p>
            </div>
          </div>
        </div>

        {/* Billing Summery */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col">
          <h2 className="text-lg font-medium text-gray-800 mb-2 bg-blue-50 px-4 py-6">Billing Summery</h2>
          <div className="space-y-6 flex-1 p-4">
            <div className="flex justify-between items-center">
              <p className="font-semibold text-gray-600">Express Delivery</p>
              <p className="font-bold text-gray-900">€ 758.00</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="font-semibold text-gray-600">Shipping (Express)</p>
              <p className="font-bold text-gray-900">€ 12.50</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="font-semibold text-gray-600">Tax (VAT 21%)</p>
              <p className="font-bold text-gray-900">€ 159.18</p>
            </div>
          </div>
          <div className="flex justify-between items-center mt-auto p-4">
            <p className="font-medium text-gray-900 text-lg">Grand Total:</p>
            <p className="font-bold text-gray-900 text-[26px]">€ 929.68</p>
          </div>
        </div>

      </div>

      {/* Items Ordered */}
      <div className="mt-12 space-y-6">
        <h2 className="text-3xl font-medium text-gray-900">Items Ordered</h2>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-blue-50 border-gray-50 bg-blue-50">
                <TableHead className="py-6 px-8 text-gray-900 font-medium text-[15px] h-14">Product Name</TableHead>
                <TableHead className="py-6 text-gray-900 font-medium text-[15px] h-14">SKU</TableHead>
                <TableHead className="py-6 text-gray-900 font-medium text-[15px] h-14">Quantity</TableHead>
                <TableHead className="py-6 text-gray-900 font-medium text-[15px] h-14">Unit Price</TableHead>
                <TableHead className="py-6 px-8 text-gray-900 font-medium text-[15px] h-14">Total Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[1, 2, 3].map((_, idx) => (
                <TableRow key={idx} className="hover:bg-gray-50/50 border-gray-50">
                  <TableCell className="py-7 px-8 flex items-center gap-5">
                    <div className="w-14 h-14 bg-[#F2F0FF] rounded-xl flex items-center justify-center shrink-0">
                      <CreditCard className="w-7 h-7 text-primary rotate-90" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 text-[15px]">Global Roaming SIM</p>
                      <p className="text-sm font-semibold text-gray-500 mt-1">Universal compatibility</p>
                    </div>
                  </TableCell>
                  <TableCell className="py-7 font-semibold text-gray-700">10% Off Subscription</TableCell>
                  <TableCell className="py-7 font-semibold text-gray-700">2</TableCell>
                  <TableCell className="py-7 font-semibold text-gray-700">€ 12.50</TableCell>
                  <TableCell className="py-7 px-8 font-semibold text-gray-700">€ 298.00</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

    </div>
  );
}
