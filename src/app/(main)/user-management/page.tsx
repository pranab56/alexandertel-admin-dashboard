"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";

const users = [
  { id: "#U-9821", name: "John Doe", email: "john@example.com", status: "Active" },
  { id: "#U-9821", name: "John Doe", email: "john@example.com", status: "Inactive" },
  { id: "#U-9821", name: "John Doe", email: "john@example.com", status: "Active" },
  { id: "#U-9821", name: "John Doe", email: "john@example.com", status: "Active" },
  { id: "#U-9821", name: "John Doe", email: "john@example.com", status: "Inactive" },
  { id: "#U-9821", name: "John Doe", email: "john@example.com", status: "Active" },
  { id: "#U-9821", name: "John Doe", email: "john@example.com", status: "Active" },
  { id: "#U-9821", name: "John Doe", email: "john@example.com", status: "Inactive" },
  { id: "#U-9821", name: "John Doe", email: "john@example.com", status: "Active" },
];

const statusStyles = {
  Active: "bg-[#E6F9F1] text-[#10B981]",
  Inactive: "bg-gray-100 text-gray-500",
};

export default function UserManagement() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      {/* Header Filters */}
      <Card className="border-none shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] bg-white rounded-2xl p-0">
        <CardContent className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
          <div className="relative flex-1 min-w-0 sm:min-w-[300px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Select you subject here..."
              className="pl-10 h-12 bg-gray-50/50 border-gray-100 rounded-xl focus-visible:ring-blue-500 w-full"
            />
          </div>
          <Select defaultValue="status">
            <SelectTrigger className="w-full sm:w-[180px] h-12 py-6 bg-gray-50/50 border-gray-100 rounded-xl">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="status">Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Users List Table */}
      <Card className="border-none shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] bg-white rounded-2xl overflow-hidden">
        <CardContent className="p-0">
          <div className="p-6 sm:p-8 space-y-1">
            <h1 className="text-xl sm:text-2xl font-medium text-[#213F7D]">Users List</h1>
            <p className="text-xs sm:text-sm text-gray-500">Manage access control and user permissions for the platform.</p>
          </div>

          <div className="overflow-x-auto w-full">
            <div className="inline-block min-w-full align-middle">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#E9F0FD] text-[#4A5568] text-xs sm:text-sm font-medium">
                    <th className="px-4 sm:px-8 py-4 whitespace-nowrap">User ID</th>
                    <th className="px-4 sm:px-8 py-4 whitespace-nowrap">User Name</th>
                    <th className="px-4 sm:px-8 py-4 whitespace-nowrap">Email</th>
                    <th className="px-4 sm:px-8 py-4 text-center whitespace-nowrap">Status</th>
                    <th className="px-4 sm:px-8 py-4 text-center whitespace-nowrap">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {users.map((user, index) => (
                    <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-4 sm:px-8 py-5 text-xs sm:text-sm font-medium text-[#2D3748] whitespace-nowrap">{user.id}</td>
                      <td className="px-4 sm:px-8 py-5 text-xs sm:text-sm text-[#4A5568] whitespace-nowrap">{user.name}</td>
                      <td className="px-4 sm:px-8 py-5 text-xs sm:text-sm text-[#4A5568] whitespace-nowrap">{user.email}</td>
                      <td className="px-4 sm:px-8 py-5 text-center">
                        <span className={cn(
                          "px-2 sm:px-3 py-1 rounded-lg text-[10px] sm:text-xs font-semibold inline-block min-w-[60px] sm:min-w-[70px]",
                          statusStyles[user.status as keyof typeof statusStyles]
                        )}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-4 sm:px-8 py-5 text-xs sm:text-sm text-center">
                        <button className="text-[#3B82F6] cursor-pointer font-semibold hover:underline transition-all">
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <div className="p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-50">
            <p className="text-sm text-[#718096] text-center sm:text-left">
              Showing <span className="font-semibold text-[#2D3748]">1</span> to <span className="font-semibold text-[#2D3748]">5</span> of <span className="font-semibold text-[#2D3748]">128</span> results
            </p>
            <div className="flex items-center gap-1 sm:gap-2 flex-wrap justify-center">
              <button className="p-2 rounded-lg border border-gray-200 text-[#718096] hover:bg-gray-50 transition-all">
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[#1E61D5] text-white font-medium shadow-md shadow-blue-200 text-sm sm:text-base">1</button>
              <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg text-[#718096] hover:bg-gray-50 transition-all font-medium text-sm sm:text-base">2</button>
              <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg text-[#718096] hover:bg-gray-50 transition-all font-medium text-sm sm:text-base">3</button>
              <span className="px-1 sm:px-2 text-[#718096]">...</span>
              <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg text-[#718096] hover:bg-gray-50 transition-all font-medium text-sm sm:text-base">12</button>
              <button className="p-2 rounded-lg border border-gray-200 text-[#718096] hover:bg-gray-50 transition-all">
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}