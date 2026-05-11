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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown, CreditCard, Search } from "lucide-react";
import { useState } from "react";
import { useGetAllProductQuery } from "@/features/product/productApi";
import { useCreateInventoryMutation, useAddStockMutation, useGetInventoryQuery } from "@/features/inventory/inventoryApi";
import toast from "react-hot-toast";

type InventoryStatus = "In Stock" | "Low Stock" | "Out of Stock";

interface InventoryItem {
  _id: string;
  product: {
    _id: string;
    name: string;
    catagory?: string;
    sku?: string;
  };
  quantity: number;
  lowStockAlert?: number;
}

export default function Inventory() {
  const [page, setPage] = useState(1);
  const { data: inventoryResponse, isLoading: isInventoryLoading } = useGetInventoryQuery({ page, limit: 10 });
  const { data: productsResponse } = useGetAllProductQuery({ page: 1, limit: 100 });
  const [addStock, { isLoading: isUpdatingStock }] = useAddStockMutation();

  const [searchTerm, setSearchTerm] = useState("");
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [bulkProduct, setBulkProduct] = useState("");
  const [bulkQuantity, setBulkQuantity] = useState("");
  const [reserved, setReserved] = useState("0");

  const [editProduct, setEditProduct] = useState<InventoryItem | null>(null);
  const [editQuantity, setEditQuantity] = useState("");

  const products = Array.isArray(productsResponse?.data) ? productsResponse?.data : productsResponse?.data?.data || [];
  const inventoryItems = inventoryResponse?.data?.data || [];
  const meta = inventoryResponse?.data?.meta || { total: 0, limit: 10, page: 1, totalPage: 1 };

  const [createInventory, { isLoading: isCreating }] = useCreateInventoryMutation();

  const handleCreateInventory = async () => {
    if (!bulkProduct || !bulkQuantity) {
      toast.error("Please select a product and enter quantity");
      return;
    }

    try {
      await createInventory({
        product: bulkProduct,
        quantity: Number(bulkQuantity),
        reserved: Number(reserved)
      }).unwrap();
      toast.success("Inventory created successfully");
      setIsCreateModalOpen(false);
      setBulkProduct("");
      setBulkQuantity("");
      setReserved("0");
    } catch (error: unknown) {
      const err = error as { data?: { message?: string } };
      toast.error(err.data?.message || "Failed to create inventory");
    }
  };

  const handleEditStock = async () => {
    if (!editProduct || !editQuantity) {
      toast.error("Please enter quantity");
      return;
    }

    try {
      await addStock({
        productId: editProduct.product?._id,
        quantity: Number(editQuantity)
      }).unwrap();
      toast.success("Stock updated successfully");
      setIsUpdateModalOpen(false);
      setEditProduct(null);
      setEditQuantity("");
    } catch (error: unknown) {
      const err = error as { data?: { message?: string } };
      toast.error(err.data?.message || "Failed to update stock");
    }
  };

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
          <h1 className="text-2xl font-medium text-gray-900">Inventory Management</h1>
          <p className="text-gray-500 max-w-sm">Manage your inventory product catalog, stock levels, and pricing.</p>
        </div>

        {/* Create Inventory Dialog */}
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-secondary hover:bg-secondary/90 text-white rounded-sm px-6 py-4 h-auto font-medium shadow-sm">
              Create Inventory
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] p-0 rounded-lg border-none overflow-hidden gap-0">
            <DialogHeader className="p-6 pb-4 border-b border-gray-100">
              <DialogTitle className="text-[20px] font-medium text-gray-900">Create New Inventory</DialogTitle>
            </DialogHeader>
            <div className="p-6 space-y-6">

              <div className="space-y-3">
                <label className="text-[15px] font-medium text-gray-800">Select Product</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      className="w-full justify-between bg-[#F8F9FC] border-none rounded-sm h-12 text-gray-600 hover:bg-[#F8F9FC]/80"
                    >
                      {bulkProduct
                        ? products.find((product: { _id: string; name: string }) => product._id === bulkProduct)?.name
                        : "Select product..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[450px] p-0">
                    <Command>
                      <CommandInput placeholder="Search product..." />
                      <CommandList>
                        <CommandEmpty>No product found.</CommandEmpty>
                        <CommandGroup>
                          {products.map((product: { _id: string; name: string }) => (
                            <CommandItem
                              key={product._id}
                              value={product._id}
                              onSelect={(currentValue) => {
                                setBulkProduct(currentValue === bulkProduct ? "" : currentValue);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  bulkProduct === product._id ? "opacity-100" : "opacity-0"
                                )}
                              />
                              {product.name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-3">
                <label className="text-[15px] font-medium text-gray-800">Quantity</label>
                <Input
                  type="number"
                  placeholder="Enter quantity"
                  value={bulkQuantity}
                  onChange={(e) => setBulkQuantity(e.target.value)}
                  className="w-full bg-[#F8F9FC] border-none rounded-sm mt-1 h-12 text-gray-600 focus-visible:ring-1 focus-visible:ring-primary/20"
                />
              </div>

              <div className="space-y-3">
                <label className="text-[15px] font-medium text-gray-800">Reserved</label>
                <Input
                  type="number"
                  placeholder="Enter reserved quantity"
                  value={reserved}
                  onChange={(e) => setReserved(e.target.value)}
                  className="w-full bg-[#F8F9FC] border-none rounded-sm mt-1 h-12 text-gray-600 focus-visible:ring-1 focus-visible:ring-primary/20"
                />
              </div>

            </div>
            <DialogFooter className="p-6 pt-0 sm:justify-center gap-3">
              <DialogClose asChild>
                <Button variant="outline" className="w-full sm:w-[150px] h-12 rounded-sm bg-[#F2F2F2] border-none font-medium text-gray-700 hover:bg-[#E5E5E5] transition-colors">
                  Cancel
                </Button>
              </DialogClose>
              <Button
                onClick={handleCreateInventory}
                disabled={isCreating}
                className="w-full sm:w-[180px] h-12 rounded-sm bg-primary hover:bg-primary/90 text-white font-medium transition-transform active:scale-[0.98]"
              >
                {isCreating ? "Creating..." : "Create Inventory"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:max-w-3xl">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-14 bg-gray-50 border-none h-14 rounded-lg text-gray-600 font-medium focus-visible:ring-1 focus-visible:ring-primary/20"
          />
        </div>
        <Select defaultValue="all-status">
          <SelectTrigger className="w-full md:w-[200px] h-14 py-7 cursor-pointer bg-gray-50 border-none rounded-lg text-gray-600 font-medium px-5">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent className="rounded-xl border-gray-100 font-medium">
            <SelectItem className="cursor-pointer text-gray-600" value="all-status">All Status</SelectItem>
            <SelectItem className="cursor-pointer text-gray-600" value="in-stock">In Stock</SelectItem>
            <SelectItem className="cursor-pointer text-gray-600" value="low-stock">Low Stock</SelectItem>
            <SelectItem className="cursor-pointer text-gray-600" value="out-of-stock">Out of Stock</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-gray-50 bg-[#F8F9FC]">
              <TableHead className="py-6 px-8 text-gray-900 font-medium h-14 text-[15px]">Product Name</TableHead>
              <TableHead className="py-6 text-gray-900 font-medium h-14 text-[15px]">Category</TableHead>
              <TableHead className="py-6 text-gray-900 font-medium h-14 text-[15px]">SKU</TableHead>
              <TableHead className="py-6 text-gray-900 font-medium h-14 text-[15px]">Stock</TableHead>
              <TableHead className="py-6 text-gray-900 font-medium h-14 text-[15px]">Re-Order</TableHead>
              <TableHead className="py-6 px-8 text-gray-900 font-medium h-14 text-[15px]">Status</TableHead>
              <TableHead className="py-6 px-8 text-right text-gray-900 font-medium h-14 text-[15px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isInventoryLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i} className="animate-pulse">
                  <TableCell colSpan={7} className="h-20 bg-gray-50/50" />
                </TableRow>
              ))
            ) : inventoryItems.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-40 text-center text-gray-400 font-medium">
                  No inventory items found.
                </TableCell>
              </TableRow>
            ) : inventoryItems.map((item: InventoryItem, idx: number) => (
              <TableRow key={idx} className="hover:bg-gray-50/50 border-gray-50">
                <TableCell className="py-5 px-8 flex items-center gap-5">
                  <div className="w-12 h-12 bg-[#F2F0FF] rounded-xl flex items-center justify-center shrink-0">
                    <CreditCard className="w-6 h-6 text-primary rotate-90" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-900 text-[15px]">{item.product?.name || "N/A"}</span>
                    <span className="text-gray-500 font-medium text-[13px]">{item.product?.catagory || "Generic"}</span>
                  </div>
                </TableCell>
                <TableCell className="py-5 font-semibold text-gray-700">{item.product?.catagory || "Uncategorized"}</TableCell>
                <TableCell className="py-5 font-semibold text-gray-700">{item.product?.sku || "N/A"}</TableCell>
                <TableCell className="py-5 font-semibold text-gray-700">{item.quantity}</TableCell>
                <TableCell className="py-5 font-semibold text-gray-700">{item.lowStockAlert || 0}</TableCell>
                <TableCell className="py-5 px-8">
                  <Badge className={cn("px-4 py-1.5 rounded-full font-medium border-none shadow-none", getStatusStyles(item.quantity > 10 ? "In Stock" : item.quantity > 0 ? "Low Stock" : "Out of Stock"))}>
                    {item.quantity > 10 ? "In Stock" : item.quantity > 0 ? "Low Stock" : "Out of Stock"}
                  </Badge>
                </TableCell>
                <TableCell className="py-5 px-8 text-right">
                  <Button
                    onClick={() => {
                      setEditProduct(item);
                      setEditQuantity(item.quantity.toString());
                      setIsUpdateModalOpen(true);
                    }}
                    className="bg-secondary hover:bg-secondary/90 text-white rounded-sm px-6 font-medium h-11 transition-transform active:scale-[0.98]"
                  >
                    Edit Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="p-8 border-t border-gray-50 flex flex-col md:flex-row items-center justify-between gap-4 bg-white">
          <p className="text-gray-500 font-medium">Showing {inventoryItems.length} of {meta.total} Items</p>
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
      {/* Edit Inventory Dialog */}
      <Dialog open={isUpdateModalOpen} onOpenChange={setIsUpdateModalOpen}>
        <DialogContent className="sm:max-w-[500px] p-0 rounded-lg border-none overflow-hidden gap-0">
          <DialogHeader className="p-6 pb-4 border-b border-gray-100">
            <DialogTitle className="text-[20px] font-medium text-gray-900">Edit Inventory Stock</DialogTitle>
          </DialogHeader>
          <div className="p-6 space-y-6">
            <div className="space-y-3">
              <label className="text-[15px] font-medium text-gray-800">Product Name</label>
              <Input
                value={editProduct?.product?.name || ""}
                disabled
                className="w-full bg-[#F8F9FC] border-none rounded-sm h-12 text-gray-400 cursor-not-allowed"
              />
            </div>

            <div className="space-y-3">
              <label className="text-[15px] font-medium text-gray-800">Quantity</label>
              <Input
                type="number"
                placeholder="Update quantity"
                value={editQuantity}
                onChange={(e) => setEditQuantity(e.target.value)}
                className="w-full bg-[#F8F9FC] border-none rounded-sm mt-1 h-12 text-gray-600 focus-visible:ring-1 focus-visible:ring-primary/20"
              />
            </div>
          </div>
          <DialogFooter className="p-6 pt-0 sm:justify-center gap-3">
            <DialogClose asChild>
              <Button variant="outline" className="w-full sm:w-[150px] h-12 rounded-sm bg-[#F2F2F2] border-none font-medium text-gray-700 hover:bg-[#E5E5E5] transition-colors">
                Cancel
              </Button>
            </DialogClose>
            <Button
              onClick={handleEditStock}
              disabled={isUpdatingStock}
              className="w-full sm:w-[180px] h-12 rounded-sm bg-primary hover:bg-primary/90 text-white font-medium transition-transform active:scale-[0.98]"
            >
              {isUpdatingStock ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}