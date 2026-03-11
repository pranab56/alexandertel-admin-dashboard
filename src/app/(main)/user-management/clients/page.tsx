"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Eye, Search } from "lucide-react";
import { useRouter } from 'next/navigation';

const clients = [
  {
    id: 1,
    name: "Sarah Birman",
    email: "sarah.b@example.com",
    appointments: "24 sessions",
    totalSpend: "$2,840.00",
    status: "Active",
  },
  {
    id: 2,
    name: "Sarah Birman",
    email: "sarah.b@example.com",
    appointments: "24 sessions",
    totalSpend: "$2,840.00",
    status: "Inactive",
  },
  {
    id: 3,
    name: "Sarah Birman",
    email: "sarah.b@example.com",
    appointments: "24 sessions",
    totalSpend: "$2,840.00",
    status: "Active",
  },
  {
    id: 4,
    name: "Sarah Birman",
    email: "sarah.b@example.com",
    appointments: "24 sessions",
    totalSpend: "$2,840.00",
    status: "Active",
  },
  {
    id: 5,
    name: "Sarah Birman",
    email: "sarah.b@example.com",
    appointments: "24 sessions",
    totalSpend: "$2,840.00",
    status: "Active",
  },
  {
    id: 6,
    name: "Sarah Birman",
    email: "sarah.b@example.com",
    appointments: "24 sessions",
    totalSpend: "$2,840.00",
    status: "Inactive",
  },
  {
    id: 7,
    name: "Sarah Birman",
    email: "sarah.b@example.com",
    appointments: "24 sessions",
    totalSpend: "$2,840.00",
    status: "Active",
  },
  {
    id: 8,
    name: "Sarah Birman",
    email: "sarah.b@example.com",
    appointments: "24 sessions",
    totalSpend: "$2,840.00",
    status: "Active",
  },
  {
    id: 9,
    name: "Sarah Birman",
    email: "sarah.b@example.com",
    appointments: "24 sessions",
    totalSpend: "$2,840.00",
    status: "Inactive",
  },
];



export default function ClientsPage() {
  const router = useRouter();
  const handleView = (id: number) => {
    router.push(`/user-management/clients/${id}`);
  };
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Top Filter Bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl flex flex-col sm:flex-row items-stretch sm:items-center gap-4 p-4 shadow-sm"
      >
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search by name, email or ID ..."
            className="pl-11 h-12 bg-[#F9FAFB] border-none rounded-xl focus-visible:ring-1 focus-visible:ring-[#6BB9BA] w-full"
          />
        </div>

        <Select defaultValue="join-date">
          <SelectTrigger className="w-full sm:w-[180px] h-12 bg-white py-6 border-[#E5E7EB] text-gray-600 rounded-xl">
            <SelectValue placeholder="Join Date" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="join-date">Join Date</SelectItem>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      {/* Table Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl shadow-sm overflow-hidden"
      >
        <div className="overflow-x-auto">
          <Table className="min-w-[800px] lg:min-w-full">
            <TableHeader className="bg-[#E9F2F2] border-none">
              <TableRow className="border-none hover:bg-transparent">
                <TableHead className="py-5 px-6 font-semibold text-gray-600 text-[13px] uppercase tracking-wider">Client Name</TableHead>
                <TableHead className="py-5 px-6 font-semibold text-gray-600 text-[13px] uppercase tracking-wider">Email</TableHead>
                <TableHead className="py-5 px-6 font-semibold text-gray-600 text-[13px] uppercase tracking-wider">Appointments</TableHead>
                <TableHead className="py-5 px-6 font-semibold text-gray-600 text-[13px] uppercase tracking-wider">Total Spend</TableHead>
                <TableHead className="py-5 px-6 font-semibold text-gray-600 text-[13px] uppercase tracking-wider">Status</TableHead>
                <TableHead className="py-5 px-6 font-semibold text-gray-600 text-[13px] uppercase tracking-wider text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.map((client, index) => (
                <TableRow key={index} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <TableCell className="py-5 px-6 font-medium text-gray-800">{client.name}</TableCell>
                  <TableCell className="py-5 px-6 text-gray-600">{client.email}</TableCell>
                  <TableCell className="py-5 px-6 text-gray-600">{client.appointments}</TableCell>
                  <TableCell className="py-5 px-6 font-semibold text-gray-800">{client.totalSpend}</TableCell>
                  <TableCell className="py-5 px-6">
                    <Badge
                      className={cn(
                        "px-4 py-1.5 rounded-full font-medium text-[12px] border-none",
                        client.status === "Active"
                          ? "bg-[#E9F7F7] text-[#6BB9BA] hover:bg-[#E9F7F7]"
                          : "bg-[#F3F4F6] text-gray-500 hover:bg-[#F3F4F6]"
                      )}
                    >
                      {client.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-5 px-6 text-right">
                    <Button onClick={() => handleView(client.id)} variant="ghost" size="icon" className="hover:bg-gray-100 rounded-full h-8 w-8">
                      <Eye className="w-5 h-5 text-gray-600" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </motion.div>

      {/* Pagination */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex items-center justify-center gap-3 pt-4"
      >
        <Button variant="ghost" size="icon" className="w-10 h-10 rounded-full bg-white shadow-sm hover:shadow transition-shadow">
          <ChevronLeft className="w-5 h-5 text-gray-500" />
        </Button>

        <Button className="w-10 h-10 rounded-full bg-[#6BB9BA] text-white hover:bg-[#5aa8a9] shadow-md">
          1
        </Button>

        {[2, 3].map((page) => (
          <Button key={page} variant="ghost" className="w-10 h-10 rounded-full bg-white text-gray-500 shadow-sm hover:shadow hover:bg-gray-50">
            {page}
          </Button>
        ))}

        <span className="text-gray-400 px-1">...</span>

        <Button variant="ghost" className="w-10 h-10 rounded-full bg-white text-gray-500 shadow-sm hover:shadow hover:bg-gray-50">
          12
        </Button>

        <Button variant="ghost" size="icon" className="w-10 h-10 rounded-full bg-white shadow-sm hover:shadow transition-shadow">
          <ChevronRight className="w-5 h-5 text-gray-500" />
        </Button>
      </motion.div>
    </div>
  );
}