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
import { Search } from "lucide-react";
import { useState } from "react";

type RepairStatus = "Paid" | "Pending" | "Error";

interface Repair {
  id: string;
  customerName: string;
  customerEmail: string;
  devices: string;
  type: string;
  status: RepairStatus;
}

const initialRepairs: Repair[] = Array(9).fill({
  id: "#1207",
  customerName: "James Wilson",
  customerEmail: "james.w@example.com",
  devices: "Pay in Store",
  type: "Pickup",
  status: "Paid",
});

export default function Repairs() {
  const [searchTerm, setSearchTerm] = useState("");

  const getStatusStyles = (status: RepairStatus) => {
    switch (status) {
      case "Paid":
        return "bg-[#E6F9F0] text-[#2DC766] hover:bg-[#E6F9F0]";
      case "Pending":
        return "bg-[#FFF4E5] text-[#FFA500] hover:bg-[#FFF4E5]";
      case "Error":
        return "bg-[#FFEBEB] text-[#E74C3C] hover:bg-[#FFEBEB]";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-medium text-gray-900">Repairs</h1>
        <p className="text-gray-500">Manage and track customer device repair orders</p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-8/12">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 bg-gray-50 border-none bg-background h-14 rounded-xl text-gray-600 focus-visible:ring-1 focus-visible:ring-primary/20"
          />
        </div>
        <div className='w-4/12'>
          <Select defaultValue="all">
            <SelectTrigger className="w-full h-14 bg-background border-none py-7 cursor-pointer rounded-xl text-gray-600 font-medium focus-visible:ring-1 focus-visible:ring-primary/20">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-gray-100">
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="error">Error</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-blue-50 bg-blue-50 border-gray-50">
              <TableHead className="py-6 px-8 text-gray-900 font-medium h-14 w-[15%]">Repair ID</TableHead>
              <TableHead className="py-6 text-gray-900 font-medium h-14 w-[25%]">Customer</TableHead>
              <TableHead className="py-6 text-gray-900 font-medium h-14 w-[20%]">Devices</TableHead>
              <TableHead className="py-6 text-gray-900 font-medium h-14 w-[10%]">Type</TableHead>
              <TableHead className="py-6 text-gray-900 font-medium h-14 w-[10%]">Status</TableHead>
              <TableHead className="py-6 px-8 text-right text-gray-900 font-medium h-14 w-[20%]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {initialRepairs.map((repair, idx) => (
              <TableRow key={idx} className="hover:bg-gray-50/50 border-gray-50">
                <TableCell className="py-5 px-8 font-medium text-gray-700">{repair.id}</TableCell>
                <TableCell className="py-5 font-medium text-gray-700">
                  <div className="flex flex-col">
                    <span className="font-bold text-gray-900">{repair.customerName}</span>
                    <span className="text-gray-500 font-medium">{repair.customerEmail}</span>
                  </div>
                </TableCell>
                <TableCell className="py-5 font-medium text-gray-700">{repair.devices}</TableCell>
                <TableCell className="py-5 font-medium text-gray-700">{repair.type}</TableCell>
                <TableCell className="py-5">
                  <Badge className={cn("px-4 py-1.5 rounded font-bold border-none shadow-none", getStatusStyles(repair.status))}>
                    {repair.status}
                  </Badge>
                </TableCell>
                <TableCell className="py-5 px-8 text-right">
                  <div className="flex items-center justify-end gap-3">
                    {/* Assign Technician Modal */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="bg-[#F2F2F2] hover:bg-[#E5E5E5] text-gray-700 rounded-xl px-5 font-medium h-12">
                          <span className="leading-tight text-center">Assign<br />Technician</span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[500px] p-0 rounded-xl border-none overflow-hidden gap-0">
                        <DialogHeader className="p-6 pb-4 border-b border-gray-100">
                          <DialogTitle className="text-[20px] font-medium text-gray-900">Assign Technician</DialogTitle>
                        </DialogHeader>
                        <div className="p-6 space-y-6">
                          <div className="space-y-3">
                            <label className="text-[15px] font-medium text-gray-800">Select Technician</label>
                            <Select>
                              <SelectTrigger className="w-full bg-[#F8F9FC] py-6 border-none rounded-xl h-14 text-gray-600 focus:ring-1 focus:ring-primary/20">
                                <SelectValue placeholder="Choose a technician ..." />
                              </SelectTrigger>
                              <SelectContent className="rounded-xl border-gray-100">
                                <SelectItem value="tech1">Tech 1</SelectItem>
                                <SelectItem value="tech2">Tech 2</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-3">
                            <label className="text-[15px] font-medium text-gray-800">Priority Level</label>
                            <Select>
                              <SelectTrigger className="w-full bg-[#F8F9FC] py-6 border-none rounded-xl h-14 text-gray-600 focus:ring-1 focus:ring-primary/20">
                                <SelectValue placeholder="Select Priority Level" />
                              </SelectTrigger>
                              <SelectContent className="rounded-xl border-gray-100">
                                <SelectItem value="high">High</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="low">Low</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-3">
                            <label className="text-[15px] font-medium text-gray-800">Assignment Notes</label>
                            <Textarea
                              placeholder="Type notes for the technician here ..."
                              className="w-full bg-[#F8F9FC] border-none rounded-xl min-h-[140px] text-gray-600 resize-none p-4 focus-visible:ring-1 focus-visible:ring-primary/20 shadow-none"
                            />
                          </div>
                        </div>
                        <DialogFooter className="p-6 pt-0 sm:justify-center gap-3">
                          <DialogClose asChild>
                            <Button variant="outline" className="w-full sm:w-[140px] h-12 rounded-xl bg-[#F2F2F2] border-none font-medium text-gray-700 hover:bg-[#E5E5E5]">
                              Cancel
                            </Button>
                          </DialogClose>
                          <Button className="w-full sm:w-[170px] h-12 rounded-xl bg-primary hover:bg-primary/90 text-white font-medium">
                            Assign Technician
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>

                    {/* Update Status Modal */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="bg-[#F2F2F2] hover:bg-[#E5E5E5] text-gray-700 rounded-xl px-5 font-medium h-12">
                          <span className="leading-tight text-center">Update<br />Status</span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[500px] p-0 rounded-xl border-none overflow-hidden gap-0">
                        <DialogHeader className="p-6 pb-4 border-b border-gray-100">
                          <DialogTitle className="text-[20px] font-medium text-gray-900">Update Repair Status</DialogTitle>
                        </DialogHeader>
                        <div className="p-6 space-y-6">
                          <div className="space-y-3">
                            <label className="text-[15px] font-medium text-gray-800">Current Status</label>
                            <Select defaultValue="in-progress">
                              <SelectTrigger className="w-full bg-[#F8F9FC] py-6 border-none rounded-xl h-14 text-gray-600 focus:ring-1 focus:ring-primary/20">
                                <SelectValue placeholder="In-Progress" />
                              </SelectTrigger>
                              <SelectContent className="rounded-xl border-gray-100">
                                <SelectItem value="in-progress">In-Progress</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-3">
                            <label className="text-[15px] font-medium text-gray-800">Status Notes</label>
                            <Textarea
                              placeholder="Describe the current progress or issues encountered ..."
                              className="w-full bg-[#F8F9FC] border-none rounded-xl min-h-[140px] text-gray-600 resize-none p-4 focus-visible:ring-1 focus-visible:ring-primary/20 shadow-none"
                            />
                          </div>
                        </div>
                        <DialogFooter className="p-6 pt-0 sm:justify-center gap-3">
                          <DialogClose asChild>
                            <Button variant="outline" className="w-full sm:w-[140px] h-12 rounded-xl bg-[#F2F2F2] border-none font-bold text-gray-700 hover:bg-[#E5E5E5]">
                              Cancel
                            </Button>
                          </DialogClose>
                          <Button className="w-full sm:w-[170px] h-12 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold">
                            Update Status
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="p-8 border-t border-gray-50 flex flex-col md:flex-row items-center justify-between gap-4 bg-white">
          <p className="text-gray-500 font-medium">Showing 4 of 248 Orders</p>
          <div className="flex items-center gap-2">
            <Button variant="ghost" className="text-gray-400 font-medium hover:bg-transparent">Prev</Button>
            <div className="flex items-center gap-2 px-2">
              <Button className="w-10 h-10 p-0 rounded-lg bg-primary text-white font-medium hover:bg-primary/90">1</Button>
              <Button variant="outline" className="w-10 h-10 p-0 rounded-lg border-gray-100 text-gray-600 font-medium hover:bg-gray-50">2</Button>
              <Button variant="outline" className="w-10 h-10 p-0 rounded-lg border-gray-100 text-gray-600 font-medium hover:bg-gray-50">3</Button>
              <span className="text-gray-400 px-1 font-medium">...</span>
              <Button variant="outline" className="w-10 h-10 p-0 rounded-lg border-gray-100 text-gray-600 font-medium hover:bg-gray-50">10</Button>
            </div>
            <Button variant="ghost" className="text-gray-400 font-medium hover:bg-transparent">Next</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
