"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Edit, Trash2 } from "lucide-react";
import Image from "next/image";
import { baseURL } from "@/utils/BaseURL";
import { Product } from "./types";

const imageUrl = (path: string) => {
  if (!path) return "/placeholder-image.jpg";
  if (path.startsWith("http")) return path;
  return `${baseURL}${path}`;
};

interface ProductTableProps {
  products: Product[];
  isLoading: boolean;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  meta: {
    total: number;
    page: number;
    totalPage: number;
  };
  onPageChange: (page: number) => void;
}

export default function ProductTable({
  products,
  isLoading,
  onEdit,
  onDelete,
  meta,
  onPageChange,
}: ProductTableProps) {
  const getStatusStyles = (status: string) => {
    switch (status) {
      case "publish": case "IN_STOCK":
        return "bg-[#E6F9F0] text-[#2DC766] hover:bg-[#E6F9F0]";
      case "LOW_STOCK":
        return "bg-[#FFF4E5] text-[#FFA500] hover:bg-[#FFF4E5]";
      case "OUT_OF_STOCK":
        return "bg-[#FFEBEB] text-[#E74C3C] hover:bg-[#FFEBEB]";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden min-h-[400px]">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-[#F8F9FC] border-gray-50 bg-[#F8F9FC]">
            <TableHead className="py-6 px-8 text-gray-900 font-medium h-14 text-[15px]">Customer</TableHead>
            <TableHead className="py-6 text-gray-900 font-medium h-14 text-[15px]">Category</TableHead>
            <TableHead className="py-6 text-gray-900 font-medium h-14 text-[15px]">Base Price</TableHead>
            <TableHead className="py-6 text-gray-900 font-medium h-14 text-[15px]">Stock</TableHead>
            <TableHead className="py-6 px-8 text-right text-gray-900 font-medium h-14 text-[15px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i} className="hover:bg-transparent border-gray-50">
                <TableCell className="py-5 px-8 flex items-center gap-5">
                  <div className="w-14 h-14 bg-gray-100 rounded-xl animate-pulse" />
                  <div className="flex flex-col gap-2">
                    <div className="h-5 w-32 bg-gray-100 rounded-lg animate-pulse" />
                    <div className="h-3 w-48 bg-gray-50 rounded-lg animate-pulse" />
                  </div>
                </TableCell>
                <TableCell className="py-5">
                  <div className="h-5 w-24 bg-gray-100 rounded-lg animate-pulse" />
                </TableCell>
                <TableCell className="py-5">
                  <div className="h-5 w-16 bg-gray-100 rounded-lg animate-pulse" />
                </TableCell>
                <TableCell className="py-5">
                  <div className="h-8 w-24 bg-gray-100 rounded-full animate-pulse" />
                </TableCell>
                <TableCell className="py-5 px-8 text-right">
                  <div className="flex justify-end gap-2">
                    <div className="h-10 w-10 bg-gray-100 rounded-lg animate-pulse" />
                    <div className="h-10 w-10 bg-gray-100 rounded-lg animate-pulse" />
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : products.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="h-60 text-center text-gray-400 font-medium">
                No products found.
              </TableCell>
            </TableRow>
          ) : products.map((product: Product) => (
            <TableRow key={product._id} className="hover:bg-gray-50/50 border-gray-50 group">
              <TableCell className="py-5 px-8 flex items-center gap-5">
                <div className="w-14 h-14 bg-gray-50 rounded-xl overflow-hidden relative shrink-0 border border-gray-100 shadow-sm transition-transform group-hover:scale-105">
                  <Image
                    src={product.image ? imageUrl(product.image) : "/placeholder-image.jpg"}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-medium text-gray-900 text-[15px]">{product.name}</span>
                  <span className="text-gray-500 font-medium text-[13px] line-clamp-1 max-w-[200px]">{product.description}</span>
                </div>
              </TableCell>
              <TableCell className="py-5 font-semibold text-gray-700 capitalize">
                {typeof product.catagory === 'object' ? product.catagory?.name : (product.catagory || "Mobile")}
              </TableCell>
              <TableCell className="py-5 font-semibold text-gray-700">€{product.basePrice}</TableCell>
              <TableCell className="py-5">
                <Badge className={cn("px-4 py-1.5 rounded-full font-medium border-none shadow-none", getStatusStyles(product.stockStatus || "IN_STOCK"))}>
                  {product.stockStatus?.replace('_', ' ') || "IN STOCK"}
                </Badge>
              </TableCell>
              <TableCell className="py-5 px-8 text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(product)}
                    className="text-gray-400 hover:text-primary hover:bg-primary/5 transition-colors"
                  >
                    <Edit className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(product._id)}
                    className="text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="p-8 border-t border-gray-50 flex flex-col md:flex-row items-center justify-between gap-4 bg-white">
        <p className="text-gray-500 font-medium">Showing {products.length} of {meta.total} Products</p>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            className="text-gray-400 font-medium hover:bg-transparent text-[15px]"
            disabled={meta.page === 1}
            onClick={() => onPageChange(meta.page - 1)}
          >
            Prev
          </Button>
          <div className="flex items-center gap-2 px-2">
            {Array.from({ length: meta.totalPage }, (_, i) => i + 1).map((pageNum) => (
              <Button
                key={pageNum}
                onClick={() => onPageChange(pageNum)}
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
            onClick={() => onPageChange(meta.page + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
