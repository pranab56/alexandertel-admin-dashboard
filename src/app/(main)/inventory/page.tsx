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
import { AlertTriangle, CreditCard, Search, Wallet } from "lucide-react";
import { useState } from "react";

type InventoryStatus = "In Stock" | "Low Stock" | "Out of Stock";

interface InventoryItem {
  id: string;
  name: string;
  brand: string;
  category: string;
  sku: string;
  stock: number;
  reOrder: number;
  status: InventoryStatus;
}

const mockInventory: InventoryItem[] = [
  { id: "1", name: "iPhone 15 Pro", brand: "Apple INC.", category: "Mobile", sku: "MT-SIM-001", stock: 45, reOrder: 10, status: "In Stock" },
  { id: "2", name: "iPhone 15 Pro", brand: "Apple INC.", category: "Mobile", sku: "MT-SIM-001", stock: 45, reOrder: 10, status: "Low Stock" },
  { id: "3", name: "iPhone 15 Pro", brand: "Apple INC.", category: "Mobile", sku: "MT-SIM-001", stock: 45, reOrder: 10, status: "Out of Stock" },
  { id: "4", name: "iPhone 15 Pro", brand: "Apple INC.", category: "Mobile", sku: "MT-SIM-001", stock: 45, reOrder: 10, status: "In Stock" },
  { id: "5", name: "iPhone 15 Pro", brand: "Apple INC.", category: "Mobile", sku: "MT-SIM-001", stock: 45, reOrder: 10, status: "In Stock" },
  { id: "6", name: "iPhone 15 Pro", brand: "Apple INC.", category: "Mobile", sku: "MT-SIM-001", stock: 45, reOrder: 10, status: "Low Stock" },
  { id: "7", name: "iPhone 15 Pro", brand: "Apple INC.", category: "Mobile", sku: "MT-SIM-001", stock: 45, reOrder: 10, status: "Out of Stock" },
  { id: "8", name: "iPhone 15 Pro", brand: "Apple INC.", category: "Mobile", sku: "MT-SIM-001", stock: 45, reOrder: 10, status: "Low Stock" },
  { id: "9", name: "iPhone 15 Pro", brand: "Apple INC.", category: "Mobile", sku: "MT-SIM-001", stock: 45, reOrder: 10, status: "In Stock" },
];

const statsData = [
  { label: "Total Items", value: "1,240", icon: Wallet, valueClass: "text-gray-900" },
  { label: "Low Stock Items", value: "12", icon: Wallet, valueClass: "text-gray-900" },
  { label: "Out of Stock", value: "3", icon: Wallet, valueClass: "text-[#E74C3C]" },
];

export default function Inventory() {
  const [searchTerm, setSearchTerm] = useState("");

  const getStatusStyles = (status: InventoryStatus) => {
    switch (status) {
      case "In Stock":
        return "bg-[#E6F9F0] text-[#2DC766] hover:bg-[#E6F9F0]";
      case "Low Stock":
        return "bg-[#FFF4E5] text-[#FFA500] hover:bg-[#FFF4E5]";
      case "Out of Stock":
        return "bg-[#FFEBEB] text-[#E74C3C] hover:bg-[#FFEBEB]";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold text-gray-900">Inventory Management</h1>
          <p className="text-gray-500 max-w-sm">Manage your inventory product catalog, stock levels, and pricing.</p>
        </div>

        {/* Bulk Update Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-secondary hover:bg-secondary/90 text-white rounded-xl px-6 py-6 h-auto font-bold shadow-sm">
              Bulk Update
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] p-0 rounded-[24px] border-none overflow-hidden gap-0">
            <DialogHeader className="p-6 pb-4 border-b border-gray-100">
              <DialogTitle className="text-[20px] font-bold text-gray-900">Bulk Update Inventory</DialogTitle>
            </DialogHeader>
            <div className="p-6 space-y-6">

              <div className="space-y-3">
                <label className="text-[15px] font-bold text-gray-800">Adjust Stock Quantity</label>
                <Input
                  placeholder="Enter amount (e.g. 10)"
                  className="w-full bg-[#F8F9FC] border-none rounded-xl h-14 text-gray-600 focus-visible:ring-1 focus-visible:ring-primary/20"
                />
              </div>

              <div className="space-y-3">
                <label className="text-[15px] font-bold text-gray-800">Update Category</label>
                <Select>
                  <SelectTrigger className="w-full bg-[#F8F9FC] border-none rounded-xl h-14 text-gray-600 focus:ring-1 focus:ring-primary/20">
                    <SelectValue placeholder="Keep current categories" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-gray-100">
                    <SelectItem value="keep">Keep current categories</SelectItem>
                    <SelectItem value="mobile">Mobile</SelectItem>
                    <SelectItem value="accessories">Accessories</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <label className="text-[15px] font-bold text-gray-800">Update Status</label>
                <Select>
                  <SelectTrigger className="w-full bg-[#F8F9FC] border-none rounded-xl h-14 text-gray-600 focus:ring-1 focus:ring-primary/20">
                    <SelectValue placeholder="Keep current statuses" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-gray-100">
                    <SelectItem value="keep">Keep current statuses</SelectItem>
                    <SelectItem value="in-stock">In Stock</SelectItem>
                    <SelectItem value="low-stock">Low Stock</SelectItem>
                    <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="bg-[#F4F9FF] p-5 rounded-2xl flex gap-4 mt-2">
                <AlertTriangle className="w-6 h-6 text-gray-500 shrink-0" />
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Review your changes</h4>
                  <p className="text-[14px] text-gray-600 leading-relaxed">
                    You are about to update stock and attributes for 3 items. Fields left blank will not be modified. Changes will be applied instantly across all warehouses.
                  </p>
                </div>
              </div>

            </div>
            <DialogFooter className="p-6 pt-0 sm:justify-center gap-3">
              <DialogClose asChild>
                <Button variant="outline" className="w-full sm:w-[150px] h-12 rounded-xl bg-[#F2F2F2] border-none font-bold text-gray-700 hover:bg-[#E5E5E5] transition-colors">
                  Cancel
                </Button>
              </DialogClose>
              <Button className="w-full sm:w-[180px] h-12 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold transition-transform active:scale-[0.98]">
                Apply Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statsData.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-100 flex items-center gap-5 transition-transform hover:scale-[1.02]">
            <div className="w-14 h-14 rounded-2xl bg-[#F4F6FB] flex items-center justify-center shrink-0">
              <stat.icon className="w-7 h-7 text-primary opacity-60" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-[15px] text-gray-500 font-semibold">{stat.label}</p>
              <h3 className={cn("text-[26px] font-bold mt-1", stat.valueClass)}>{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:max-w-3xl">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-14 bg-gray-50 border-none h-14 rounded-xl text-gray-600 font-medium focus-visible:ring-1 focus-visible:ring-primary/20"
          />
        </div>
        <Select defaultValue="all-status">
          <SelectTrigger className="w-full md:w-[200px] h-14 bg-gray-50 border-none rounded-xl text-gray-600 font-bold px-5">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent className="rounded-xl border-gray-100 font-medium">
            <SelectItem value="all-status">All Status</SelectItem>
            <SelectItem value="in-stock">In Stock</SelectItem>
            <SelectItem value="low-stock">Low Stock</SelectItem>
            <SelectItem value="out-of-stock">Out of Stock</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-gray-50 bg-[#F8F9FC]">
              <TableHead className="py-6 px-8 text-gray-900 font-bold h-14 text-[15px]">Product Name</TableHead>
              <TableHead className="py-6 text-gray-900 font-bold h-14 text-[15px]">Category</TableHead>
              <TableHead className="py-6 text-gray-900 font-bold h-14 text-[15px]">SKU</TableHead>
              <TableHead className="py-6 text-gray-900 font-bold h-14 text-[15px]">Stock</TableHead>
              <TableHead className="py-6 text-gray-900 font-bold h-14 text-[15px]">Re-Order</TableHead>
              <TableHead className="py-6 px-8 text-gray-900 font-bold h-14 text-[15px]">Status</TableHead>
              <TableHead className="py-6 px-8 text-right text-gray-900 font-bold h-14 text-[15px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockInventory.map((item, idx) => (
              <TableRow key={idx} className="hover:bg-gray-50/50 border-gray-50">
                <TableCell className="py-5 px-8 flex items-center gap-5">
                  <div className="w-12 h-12 bg-[#F2F0FF] rounded-xl flex items-center justify-center shrink-0">
                    <CreditCard className="w-6 h-6 text-primary rotate-90" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-gray-900 text-[15px]">{item.name}</span>
                    <span className="text-gray-500 font-medium text-[13px]">{item.brand}</span>
                  </div>
                </TableCell>
                <TableCell className="py-5 font-semibold text-gray-700">{item.category}</TableCell>
                <TableCell className="py-5 font-semibold text-gray-700">{item.sku}</TableCell>
                <TableCell className="py-5 font-semibold text-gray-700">{item.stock}</TableCell>
                <TableCell className="py-5 font-semibold text-gray-700">{item.reOrder}</TableCell>
                <TableCell className="py-5 px-8">
                  <Badge className={cn("px-4 py-1.5 rounded-full font-bold border-none shadow-none", getStatusStyles(item.status))}>
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell className="py-5 px-8 text-right">
                  <Button className="bg-secondary hover:bg-secondary/90 text-white rounded-xl px-6 font-bold h-11 transition-transform active:scale-[0.98]">
                    Edit Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="p-8 border-t border-gray-50 flex flex-col md:flex-row items-center justify-between gap-4 bg-white">
          <p className="text-gray-500 font-medium">Showing 4 of 248 Orders</p>
          <div className="flex items-center gap-2">
            <Button variant="ghost" className="text-gray-400 font-bold hover:bg-transparent text-[15px]">Prev</Button>
            <div className="flex items-center gap-2 px-2">
              <Button className="w-10 h-10 p-0 rounded-lg bg-primary text-white font-bold hover:bg-primary/90 shadow-md">1</Button>
              <Button variant="outline" className="w-10 h-10 p-0 rounded-lg border-gray-100 text-gray-600 font-bold hover:bg-gray-50">2</Button>
              <Button variant="outline" className="w-10 h-10 p-0 rounded-lg border-gray-100 text-gray-600 font-bold hover:bg-gray-50">3</Button>
              <span className="text-gray-400 px-1 font-bold">...</span>
              <Button variant="outline" className="w-10 h-10 p-0 rounded-lg border-gray-100 text-gray-600 font-bold hover:bg-gray-50">10</Button>
            </div>
            <Button variant="ghost" className="text-gray-400 font-bold hover:bg-transparent text-[15px]">Next</Button>
          </div>
        </div>
      </div>
    </div>
  );
}