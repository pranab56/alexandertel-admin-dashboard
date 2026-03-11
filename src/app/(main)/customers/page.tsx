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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CreditCard, Gift, Mail, MapPin, Phone } from "lucide-react";

interface Customer {
  id: string;
  name: string;
  initials: string;
  email: string;
  walletBalance: string;
  loyaltyPoints: number;
}

const mockCustomers: Customer[] = Array(9).fill({
  id: "#45920",
  name: "Alex Rivera",
  initials: "AR",
  email: "alex.rivera@example.com",
  walletBalance: "€45.00",
  loyaltyPoints: 45,
});

export default function Customers() {
  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-gray-900">Customers Management</h1>
        <p className="text-gray-500">Manage and view your customer directory and loyalty programs.</p>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-gray-50 bg-[#F8F9FC]">
              <TableHead className="py-6 px-8 text-gray-900 font-bold h-14 text-[15px]">Customer Name</TableHead>
              <TableHead className="py-6 text-gray-900 font-bold h-14 text-[15px]">Email Address</TableHead>
              <TableHead className="py-6 text-gray-900 font-bold h-14 text-[15px]">Wallet Balance</TableHead>
              <TableHead className="py-6 text-gray-900 font-bold h-14 text-[15px]">Loyalty Points</TableHead>
              <TableHead className="py-6 px-8 text-right text-gray-900 font-bold h-14 text-[15px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockCustomers.map((customer, idx) => (
              <TableRow key={idx} className="hover:bg-gray-50/50 border-gray-50">
                <TableCell className="py-5 px-8 flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#F2F2F2] rounded-full flex items-center justify-center shrink-0">
                    <span className="font-bold text-gray-700 text-[15px]">{customer.initials}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-gray-900 text-[15px]">{customer.name}</span>
                    <span className="text-gray-500 font-medium text-[13px]">ID: {customer.id}</span>
                  </div>
                </TableCell>
                <TableCell className="py-5 font-medium text-gray-600 text-[15px]">{customer.email}</TableCell>
                <TableCell className="py-5 font-medium text-gray-600 text-[15px]">{customer.walletBalance}</TableCell>
                <TableCell className="py-5">
                  <Badge className="bg-[#F2F2F2] text-gray-700 hover:bg-[#F2F2F2] px-4 py-1.5 rounded-full font-bold border-none shadow-none text-[14px]">
                    {customer.loyaltyPoints}
                  </Badge>
                </TableCell>
                <TableCell className="py-5 px-8 text-right">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-secondary hover:bg-secondary/90 text-white rounded-xl px-6 font-bold h-10 transition-transform active:scale-[0.98]">
                        View Profile
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px] p-0 rounded-[24px] border-none overflow-hidden gap-0">
                      <DialogHeader className="p-6 pb-4 border-b border-gray-100 bg-[#F8F9FC]">
                        <DialogTitle className="text-[20px] font-bold text-gray-900">Customer Profile</DialogTitle>
                      </DialogHeader>
                      <div className="p-8 space-y-8">
                        {/* Profile Header Block */}
                        <div className="flex items-center gap-6">
                          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                            <span className="font-bold text-primary text-[28px]">{customer.initials}</span>
                          </div>
                          <div>
                            <h2 className="text-[22px] font-bold text-gray-900">{customer.name}</h2>
                            <p className="text-gray-500 font-medium mt-1">Customer ID: {customer.id}</p>
                          </div>
                        </div>

                        {/* Details List */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-[#F2F2F2] rounded-xl flex items-center justify-center shrink-0">
                              <Mail className="w-5 h-5 text-gray-600" />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[13px] text-gray-500 font-medium">Email Address</span>
                              <span className="font-bold text-gray-900 text-[15px]">{customer.email}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-[#F2F2F2] rounded-xl flex items-center justify-center shrink-0">
                              <Phone className="w-5 h-5 text-gray-600" />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[13px] text-gray-500 font-medium">Phone Number</span>
                              <span className="font-bold text-gray-900 text-[15px]">+1 (555) 123-4567</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-[#F2F2F2] rounded-xl flex items-center justify-center shrink-0">
                              <MapPin className="w-5 h-5 text-gray-600" />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[13px] text-gray-500 font-medium">Shipping Address</span>
                              <span className="font-bold text-gray-900 text-[15px]">123 Business Avenue, Suite 100</span>
                            </div>
                          </div>
                        </div>

                        {/* Balance & Loyalty Cards */}
                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                          <div className="bg-[#F8F9FC] p-4 rounded-2xl flex flex-col gap-2">
                            <CreditCard className="w-6 h-6 text-primary" />
                            <span className="text-[13px] text-gray-500 font-medium">Wallet Balance</span>
                            <span className="text-[20px] font-bold text-gray-900">{customer.walletBalance}</span>
                          </div>
                          <div className="bg-[#FFF8E7] p-4 rounded-2xl flex flex-col gap-2">
                            <Gift className="w-6 h-6 text-[#FFA500]" />
                            <span className="text-[13px] text-[#A67E33] font-medium">Loyalty Points</span>
                            <span className="text-[20px] font-bold text-[#D98C00]">{customer.loyaltyPoints}</span>
                          </div>
                        </div>

                      </div>
                      <DialogFooter className="p-6 pt-0 sm:justify-center gap-3">
                        <DialogClose asChild>
                          <Button variant="outline" className="w-full h-12 rounded-xl bg-[#F2F2F2] border-none font-bold text-gray-700 hover:bg-[#E5E5E5] transition-colors">
                            Close Profile
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
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