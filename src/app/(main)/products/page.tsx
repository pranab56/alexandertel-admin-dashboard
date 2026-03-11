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
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { CloudUpload, CreditCard, Search } from "lucide-react";
import { useState } from "react";

type ProductStatus = "Active" | "Low Stock" | "Inactive";

interface Product {
  name: string;
  description: string;
  category: string;
  sku: string;
  price: string;
  status: ProductStatus;
}

const mockProducts: Product[] = [
  { name: "Global Roaming SIM", description: "Universal compatibility", category: "Prepaid Plans", sku: "MT-SIM-001", price: "€29.99", status: "Active" },
  { name: "Global Roaming SIM", description: "Universal compatibility", category: "Prepaid Plans", sku: "MT-SIM-001", price: "€29.99", status: "Low Stock" },
  { name: "Global Roaming SIM", description: "Universal compatibility", category: "Prepaid Plans", sku: "MT-SIM-001", price: "€29.99", status: "Inactive" },
  { name: "Global Roaming SIM", description: "Universal compatibility", category: "Prepaid Plans", sku: "MT-SIM-001", price: "€29.99", status: "Active" },
  { name: "Global Roaming SIM", description: "Universal compatibility", category: "Prepaid Plans", sku: "MT-SIM-001", price: "€29.99", status: "Active" },
  { name: "Global Roaming SIM", description: "Universal compatibility", category: "Prepaid Plans", sku: "MT-SIM-001", price: "€29.99", status: "Low Stock" },
  { name: "Global Roaming SIM", description: "Universal compatibility", category: "Prepaid Plans", sku: "MT-SIM-001", price: "€29.99", status: "Active" },
  { name: "Global Roaming SIM", description: "Universal compatibility", category: "Prepaid Plans", sku: "MT-SIM-001", price: "€29.99", status: "Inactive" },
  { name: "Global Roaming SIM", description: "Universal compatibility", category: "Prepaid Plans", sku: "MT-SIM-001", price: "€29.99", status: "Active" },
];

export default function Products() {
  const [searchTerm, setSearchTerm] = useState("");

  const getStatusStyles = (status: ProductStatus) => {
    switch (status) {
      case "Active":
        return "bg-[#E6F9F0] text-[#2DC766] hover:bg-[#E6F9F0]";
      case "Low Stock":
        return "bg-[#FFF4E5] text-[#FFA500] hover:bg-[#FFF4E5]";
      case "Inactive":
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
          <h1 className="text-2xl font-bold text-gray-900">Product Management</h1>
          <p className="text-gray-500 max-w-sm">Manage your telecommunications product catalog, stock levels, and pricing.</p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90 text-white rounded px-6 py-3.5 h-auto font-medium">
              Add New Product
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-3xl p-0 rounded border-none overflow-hidden gap-0 max-h-[90vh] overflow-y-auto hidden-scrollbar">
            <DialogHeader className="p-6 pb-4 border-b border-gray-100 sticky top-0 bg-white z-10">
              <DialogTitle className="text-[20px] font-bold text-gray-900">Add New Product</DialogTitle>
            </DialogHeader>
            <div className="p-6 space-y-6">

              <div className="space-y-3">
                <label className="text-[15px] font-medium text-gray-800">Product Name</label>
                <Input
                  placeholder="e.g. iPhone 15 Pro Max"
                  className="w-full bg-[#F8F9FC] border-none rounded-xl h-14 text-gray-600 focus-visible:ring-1 focus-visible:ring-primary/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <label className="text-[15px] font-medium text-gray-800">SKU</label>
                  <Input
                    placeholder="MT-12345-ABC"
                    className="w-full bg-[#F8F9FC] border-none rounded-xl h-14 text-gray-600 focus-visible:ring-1 focus-visible:ring-primary/20"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[15px] font-medium text-gray-800">Category</label>
                  <Select>
                    <SelectTrigger className="w-full bg-[#F8F9FC] border-none rounded-xl h-14 py-7 text-gray-600 focus:ring-1 focus:ring-primary/20">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-gray-100">
                      <SelectItem value="prepaid">Prepaid Plans</SelectItem>
                      <SelectItem value="postpaid">Postpaid Plans</SelectItem>
                      <SelectItem value="devices">Devices</SelectItem>
                      <SelectItem value="accessories">Accessories</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[15px] font-medium text-gray-800">Description</label>
                <Textarea
                  placeholder="Enter detailed product description ..."
                  className="w-full bg-[#F8F9FC] border-none rounded-xl min-h-[140px] text-gray-600 resize-none p-4 focus-visible:ring-1 focus-visible:ring-primary/20 shadow-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <label className="text-[15px] font-medium text-gray-800">Price</label>
                  <Input
                    placeholder="€29.99"
                    className="w-full bg-[#F8F9FC] border-none rounded-xl h-14 text-gray-600 focus-visible:ring-1 focus-visible:ring-primary/20"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[15px] font-medium text-gray-800">Stock Quantity</label>
                  <Input
                    type="number"
                    placeholder="0"
                    className="w-full bg-[#F8F9FC] border-none rounded-xl h-14 text-gray-600 focus-visible:ring-1 focus-visible:ring-primary/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <label className="text-[15px] font-medium text-gray-800">Re-order Level</label>
                  <Input
                    type="number"
                    placeholder="5"
                    className="w-full bg-[#F8F9FC] border-none rounded-xl h-14 text-gray-600 focus-visible:ring-1 focus-visible:ring-primary/20"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[15px] font-medium text-gray-800">Status</label>
                  <Select defaultValue="active">
                    <SelectTrigger className="w-full bg-[#F8F9FC] border-none rounded-xl h-14 py-7 text-gray-600 focus:ring-1 focus:ring-primary/20">
                      <SelectValue placeholder="Active" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-gray-100">
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[15px] font-medium text-gray-800">Uploaded Image</label>
                <div className="w-full border-2 border-dashed border-gray-200 rounded-2xl h-32 flex flex-col items-center justify-center p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors">
                  <CloudUpload className="w-6 h-6 text-gray-500 mb-2" />
                  <p className="text-[15px] text-gray-700">
                    <span className="font-bold text-gray-900">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-[13px] text-gray-500 mt-1">PNG, JPG or WEBP (max. 5MB)</p>
                </div>
              </div>

            </div>
            <DialogFooter className="p-6 pt-2 pb-6 sm:justify-center gap-3 sticky bottom-0 bg-white">
              <DialogClose asChild>
                <Button variant="outline" className="w-full sm:w-[150px] h-12 rounded-xl bg-[#F2F2F2] border-none font-medium text-gray-700 hover:bg-[#E5E5E5]">
                  Cancel
                </Button>
              </DialogClose>
              <Button className="w-full sm:w-[180px] h-12 rounded-xl bg-primary hover:bg-primary/90 text-white font-medium">
                Save Product
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-6/12">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 bg-gray-50 border-none h-14 rounded-xl text-gray-600 focus-visible:ring-1 focus-visible:ring-primary/20"
          />
        </div>
        <div className="flex w-6/12 gap-4">
          <Select defaultValue="all-categories">
            <SelectTrigger className="w-full h-14 py-7 bg-gray-50 border-none rounded-xl text-gray-600 font-medium whitespace-nowrap">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-gray-100">
              <SelectItem value="all-categories">All Categories</SelectItem>
              <SelectItem value="prepaid">Prepaid Plans</SelectItem>
              <SelectItem value="postpaid">Postpaid Plans</SelectItem>
              <SelectItem value="devices">Devices</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all-status">
            <SelectTrigger className="w-full h-14 py-7 bg-gray-50 border-none rounded-xl text-gray-600 font-medium whitespace-nowrap">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-gray-100">
              <SelectItem value="all-status">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="low-stock">Low Stock</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-blue-50 border-gray-50 bg-blue-50">
              <TableHead className="py-6 px-8 text-gray-900 font-medium h-14 text-[15px]">Customer</TableHead>
              <TableHead className="py-6 text-gray-900 font-medium h-14 text-[15px]">Category</TableHead>
              <TableHead className="py-6 text-gray-900 font-medium h-14 text-[15px]">SKU</TableHead>
              <TableHead className="py-6 text-gray-900 font-medium h-14 text-[15px]">Price</TableHead>
              <TableHead className="py-6 px-8 text-gray-900 font-medium h-14 text-[15px]">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockProducts.map((product, idx) => (
              <TableRow key={idx} className="hover:bg-gray-50/50 border-gray-50">
                <TableCell className="py-5 px-8 flex items-center gap-5">
                  <div className="w-12 h-12 bg-[#F2F0FF] rounded-xl flex items-center justify-center shrink-0">
                    <CreditCard className="w-6 h-6 text-primary rotate-90" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-900 text-[15px]">{product.name}</span>
                    <span className="text-gray-500 font-medium text-[13px]">{product.description}</span>
                  </div>
                </TableCell>
                <TableCell className="py-5 font-semibold text-gray-700">{product.category}</TableCell>
                <TableCell className="py-5 font-semibold text-gray-700">{product.sku}</TableCell>
                <TableCell className="py-5 font-semibold text-gray-700">{product.price}</TableCell>
                <TableCell className="py-5 px-8">
                  <Badge className={cn("px-4 py-1.5 rounded-full font-bold border-none shadow-none", getStatusStyles(product.status))}>
                    {product.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="p-8 border-t border-gray-50 flex flex-col md:flex-row items-center justify-between gap-4 bg-white">
          <p className="text-gray-500 font-medium">Showing 4 of 248 Orders</p>
          <div className="flex items-center gap-2">
            <Button variant="ghost" className="text-gray-400 font-medium hover:bg-transparent text-[15px]">Prev</Button>
            <div className="flex items-center gap-2 px-2">
              <Button className="w-10 h-10 p-0 rounded-lg bg-primary text-white font-medium hover:bg-primary/90">1</Button>
              <Button variant="outline" className="w-10 h-10 p-0 rounded-lg border-gray-100 text-gray-600 font-medium hover:bg-gray-50">2</Button>
              <Button variant="outline" className="w-10 h-10 p-0 rounded-lg border-gray-100 text-gray-600 font-medium hover:bg-gray-50">3</Button>
              <span className="text-gray-400 px-1 font-medium">...</span>
              <Button variant="outline" className="w-10 h-10 p-0 rounded-lg border-gray-100 text-gray-600 font-medium hover:bg-gray-50">10</Button>
            </div>
            <Button variant="ghost" className="text-gray-400 font-medium hover:bg-transparent text-[15px]">Next</Button>
          </div>
        </div>
      </div>
    </div>
  );
}