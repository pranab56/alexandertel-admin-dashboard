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
import { Wallet as WalletIcon } from "lucide-react";

interface TopupRequest {
  id: string;
  name: string;
  initials: string;
  walletBalance: string;
  status: string;
  lastActivity: string;
}

const mockTopups: TopupRequest[] = Array(9).fill({
  id: "#45920",
  name: "Alex Rivera",
  initials: "AR",
  walletBalance: "€45.00",
  status: "In Stock",
  lastActivity: "2 hours ago",
});

const statsData = [
  { label: "Total Outstanding Value", value: "€4,250.00", isPrimary: true },
  { label: "Bank Transfers", value: "4", isPrimary: false },
  { label: "Pay in Store", value: "2", isPrimary: false },
];

export default function Wallet() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-medium text-gray-900">Pending Top-ups</h1>
        <p className="text-gray-500">Current requests requiring administrative approval.</p>
      </div>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statsData.map((stat, idx) => (
          <div
            key={idx}
            className={cn(
              "group p-6 rounded-xl shadow-sm flex items-center gap-5 transition-all duration-300 hover:scale-[1.02] hover:bg-[#1E1F3F]",
              stat.isPrimary ? "bg-[#1E1F3F] text-white" : "bg-white border border-gray-100 text-gray-900 hover:text-white"
            )}
          >
            <div className={cn(
              "w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-colors duration-300",
              stat.isPrimary ? "bg-white/10" : "bg-[#F2F0FF] group-hover:bg-white/10"
            )}>
              <WalletIcon className={cn("w-6 h-6 transition-opacity duration-300", stat.isPrimary ? "text-primary" : "text-primary opacity-80 group-hover:opacity-100")} strokeWidth={1.5} />
            </div>
            <div>
              <p className={cn("text-[15px] font-semibold transition-colors duration-300", stat.isPrimary ? "text-gray-300" : "text-gray-500 group-hover:text-gray-300")}>{stat.label}</p>
              <h3 className="text-[26px] font-medium mt-1 transition-colors duration-300">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-gray-50 bg-[#F8F9FC]">
              <TableHead className="py-6 px-8 text-gray-900 font-medium h-14 text-[15px]">Customer Name</TableHead>
              <TableHead className="py-6 text-gray-900 font-medium h-14 text-[15px]">Wallet Balance</TableHead>
              <TableHead className="py-6 text-gray-900 font-medium h-14 text-[15px]">Status</TableHead>
              <TableHead className="py-6 px-8 text-gray-900 font-medium h-14 text-[15px]">Last Activity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockTopups.map((topup, idx) => (
              <TableRow key={idx} className="hover:bg-gray-50/50 border-gray-50">
                <TableCell className="py-5 px-8 flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#F2F2F2] rounded-full flex items-center justify-center shrink-0">
                    <span className="font-medium text-gray-700 text-[15px]">{topup.initials}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-900 text-[15px]">{topup.name}</span>
                    <span className="text-gray-500 font-medium text-[13px]">ID: {topup.id}</span>
                  </div>
                </TableCell>
                <TableCell className="py-5 font-semibold text-gray-700 text-[15px]">{topup.walletBalance}</TableCell>
                <TableCell className="py-5">
                  <Badge className="bg-[#E6F9F0] text-[#2DC766] hover:bg-[#E6F9F0] px-4 py-1.5 rounded-full font-medium border-none shadow-none text-[14px]">
                    {topup.status}
                  </Badge>
                </TableCell>
                <TableCell className="py-5 px-8 font-medium text-gray-600 text-[15px]">
                  {topup.lastActivity}
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
              <Button className="w-10 h-10 p-0 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 shadow-md">1</Button>
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