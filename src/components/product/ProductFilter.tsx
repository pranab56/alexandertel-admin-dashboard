"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

interface ProductFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export default function ProductFilter({
  searchTerm,
  onSearchChange,
}: ProductFilterProps) {
  return (
    <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between">
      <div className="relative w-full md:max-w-2xl">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          placeholder="Search products by name or SKU..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-14 bg-gray-50 border-none h-14 rounded-lg text-gray-600 font-medium focus-visible:ring-1 focus-visible:ring-primary/20"
        />
      </div>
      <div className="flex w-full md:w-auto gap-3">
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px] h-14 bg-gray-50 border-none rounded-lg text-gray-600 font-medium shadow-none">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="publish">Published</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
