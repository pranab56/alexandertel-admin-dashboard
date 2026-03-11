"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { useState } from "react";

type PromoStatus = "Active" | "Expired";

interface Promo {
  code: string;
  name: string;
  type: string;
  status: PromoStatus;
  usageCount: string;
  expiryDate: string;
}

const mockPromos: Promo[] = [
  { code: "SUMMER24", name: "Summer Campaign", type: "10% Off Subscription", status: "Active", usageCount: "1,240 / 5,000", expiryDate: "Aug 31, 2025" },
  { code: "SUMMER24", name: "Summer Campaign", type: "10% Off Subscription", status: "Expired", usageCount: "1,240 / 5,000", expiryDate: "Aug 31, 2025" },
  { code: "SUMMER24", name: "Summer Campaign", type: "10% Off Subscription", status: "Active", usageCount: "1,240 / 5,000", expiryDate: "Aug 31, 2025" },
  { code: "SUMMER24", name: "Summer Campaign", type: "10% Off Subscription", status: "Active", usageCount: "1,240 / 5,000", expiryDate: "Aug 31, 2025" },
  { code: "SUMMER24", name: "Summer Campaign", type: "10% Off Subscription", status: "Active", usageCount: "1,240 / 5,000", expiryDate: "Aug 31, 2025" },
  { code: "SUMMER24", name: "Summer Campaign", type: "10% Off Subscription", status: "Expired", usageCount: "1,240 / 5,000", expiryDate: "Aug 31, 2025" },
  { code: "SUMMER24", name: "Summer Campaign", type: "10% Off Subscription", status: "Active", usageCount: "1,240 / 5,000", expiryDate: "Aug 31, 2025" },
  { code: "SUMMER24", name: "Summer Campaign", type: "10% Off Subscription", status: "Expired", usageCount: "1,240 / 5,000", expiryDate: "Aug 31, 2025" },
  { code: "SUMMER24", name: "Summer Campaign", type: "10% Off Subscription", status: "Active", usageCount: "1,240 / 5,000", expiryDate: "Aug 31, 2025" },
];

export default function Loyalty() {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const getStatusStyles = (status: PromoStatus) => {
    switch (status) {
      case "Active":
        return "bg-[#E6F9F0] text-[#2DC766] hover:bg-[#E6F9F0]";
      case "Expired":
        return "bg-[#F2F2F2] text-[#808080] hover:bg-[#F2F2F2]";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold text-gray-900">Loyalty & Promotions Management</h1>
          <p className="text-gray-500 max-w-lg">Configure customer reward structures and manage multi-channel promotional campaigns.</p>
        </div>

        {/* Create Promo Modal */}
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90 text-white rounded-xl px-6 py-3 h-auto font-medium shadow-sm">
              Create Promo Code
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] p-0 rounded-xl border-none overflow-hidden gap-0 max-h-[90vh] overflow-y-auto hidden-scrollbar">
            <DialogHeader className="p-6 pb-4 border-b border-gray-100 sticky top-0 bg-white z-10">
              <DialogTitle className="text-[20px] font-medium text-gray-900">Create Promo Code</DialogTitle>
            </DialogHeader>
            <div className="p-6 space-y-6">

              <div className="space-y-3">
                <label className="text-[15px] font-medium text-gray-800">Promo Code</label>
                <Input
                  placeholder="E.G., WINTER2024"
                  className="w-full bg-[#F8F9FC] border-none rounded-xl h-14 text-gray-600 focus-visible:ring-1 focus-visible:ring-primary/20"
                />
              </div>

              <div className="space-y-3">
                <label className="text-[15px] font-medium text-gray-800">Description</label>
                <Textarea
                  placeholder="Describe this promotion for internal use ..."
                  className="w-full bg-[#F8F9FC] border-none rounded-xl min-h-[120px] text-gray-600 resize-none p-4 focus-visible:ring-1 focus-visible:ring-primary/20 shadow-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <label className="text-[15px] font-medium text-gray-800">Discount Type</label>
                  <Select defaultValue="percentage">
                    <SelectTrigger className="w-full bg-[#F8F9FC] border-none rounded-xl py-6 h-14 text-gray-600 focus:ring-1 focus:ring-primary/20">
                      <SelectValue placeholder="Percentage Off" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-gray-100">
                      <SelectItem value="percentage">Percentage Off</SelectItem>
                      <SelectItem value="fixed">Fixed Amount</SelectItem>
                      <SelectItem value="shipping">Free Shipping</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-3">
                  <label className="text-[15px] font-medium text-gray-800">Discount Value</label>
                  <Select defaultValue="20">
                    <SelectTrigger className="w-full bg-[#F8F9FC] border-none py-6 rounded-xl h-14 text-gray-600 focus:ring-1 focus:ring-primary/20">
                      <SelectValue placeholder="20" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-gray-100">
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="20">20</SelectItem>
                      <SelectItem value="30">30</SelectItem>
                      <SelectItem value="40">40</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <label className="text-[15px] font-medium text-gray-800">Usage Limit</label>
                  <Select defaultValue="1000">
                    <SelectTrigger className="w-full bg-[#F8F9FC] border-none py-6 rounded-xl h-14 text-gray-600 focus:ring-1 focus:ring-primary/20">
                      <SelectValue placeholder="1000" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-gray-100">
                      <SelectItem value="500">500</SelectItem>
                      <SelectItem value="1000">1000</SelectItem>
                      <SelectItem value="5000">5000</SelectItem>
                      <SelectItem value="unlimited">Unlimited</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-3">
                  <label className="text-[15px] font-medium text-gray-800">Target Audience</label>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-full bg-[#F8F9FC] border-none py-6 rounded-xl h-14 text-gray-600 focus:ring-1 focus:ring-primary/20">
                      <SelectValue placeholder="All Customers" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-gray-100">
                      <SelectItem value="all">All Customers</SelectItem>
                      <SelectItem value="new">New Customers</SelectItem>
                      <SelectItem value="returning">Returning Customers</SelectItem>
                      <SelectItem value="vip">VIP Customers</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <label className="text-[15px] font-medium text-gray-800">Start Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full bg-[#F8F9FC] border-none rounded-xl h-14 text-left font-normal flex items-center justify-between px-4 text-base hover:bg-[#F8F9FC]/80",
                          !startDate && "text-gray-400"
                        )}
                      >
                        {startDate ? format(startDate, "PPP") : "mm/dd/yyyy"}
                        <CalendarIcon className="h-5 w-5 text-gray-400" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-3">
                  <label className="text-[15px] font-medium text-gray-800">End Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full bg-[#F8F9FC] border-none rounded-xl h-14 text-left font-normal flex items-center justify-between px-4 text-base hover:bg-[#F8F9FC]/80",
                          !endDate && "text-gray-400"
                        )}
                      >
                        {endDate ? format(endDate, "PPP") : "mm/dd/yyyy"}
                        <CalendarIcon className="h-5 w-5 text-gray-400" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={endDate}
                        onSelect={setEndDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

            </div>
            <DialogFooter className="p-6 pt-2 pb-6 sm:justify-center gap-3 sticky bottom-0 bg-white">
              <DialogClose asChild>
                <Button variant="outline" className="w-full sm:w-[150px] h-12 rounded-xl bg-[#F2F2F2] border-none font-medium text-gray-700 hover:bg-[#E5E5E5] transition-colors">
                  Cancel
                </Button>
              </DialogClose>
              <Button className="w-full sm:w-[180px] h-12 rounded-xl bg-primary hover:bg-primary/90 text-white font-medium transition-transform active:scale-[0.98]">
                Create Promo
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-gray-50 bg-[#F8F9FC]">
              <TableHead className="py-6 px-8 text-gray-900 font-medium h-14 text-[15px]">Promo Code</TableHead>
              <TableHead className="py-6 text-gray-900 font-medium h-14 text-[15px]">Type</TableHead>
              <TableHead className="py-6 text-gray-900 font-medium h-14 text-[15px]">Status</TableHead>
              <TableHead className="py-6 text-gray-900 font-medium h-14 text-[15px]">Usage Count</TableHead>
              <TableHead className="py-6 px-8 text-gray-900 font-medium h-14 text-[15px]">Expiry Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockPromos.map((promo, idx) => (
              <TableRow key={idx} className="hover:bg-gray-50/50 border-gray-50">
                <TableCell className="py-5 px-8 flex items-center gap-4">
                  <div className="w-[52px] h-[52px] bg-[#F4F6F9] rounded-full flex items-center justify-center shrink-0">
                    <span className="font-medium text-gray-700 text-[13px]">SALE</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-900 text-[15px]">{promo.code}</span>
                    <span className="text-gray-500 font-medium text-[13px]">{promo.name}</span>
                  </div>
                </TableCell>
                <TableCell className="py-5 font-medium text-gray-700 text-[15px]">{promo.type}</TableCell>
                <TableCell className="py-5">
                  <Badge className={cn("px-4 py-1.5 rounded-full font-medium border-none shadow-none text-[14px]", getStatusStyles(promo.status))}>
                    {promo.status}
                  </Badge>
                </TableCell>
                <TableCell className="py-5 font-medium text-gray-700 text-[15px]">{promo.usageCount}</TableCell>
                <TableCell className="py-5 px-8 font-medium text-gray-700 text-[15px]">
                  {promo.expiryDate}
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