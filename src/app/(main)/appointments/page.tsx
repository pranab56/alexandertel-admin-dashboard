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
import { useRouter } from "next/navigation";

const appointments = [
  {
    id: "#APT-8821",
    date: "Oct 24, 2023",
    time: "10:30 AM - 11:30 AM",
    client: "Sarah Jenkins",
    provider: "Dr. Marcus Thorne",
    status: "Upcoming",
  },
  {
    id: "#APT-8821",
    date: "Oct 24, 2023",
    time: "10:30 AM - 11:30 AM",
    client: "Sarah Jenkins",
    provider: "Dr. Marcus Thorne",
    status: "Completed",
  },
  {
    id: "#APT-8821",
    date: "Oct 24, 2023",
    time: "10:30 AM - 11:30 AM",
    client: "Sarah Jenkins",
    provider: "Dr. Marcus Thorne",
    status: "Canceled",
  },
  {
    id: "#APT-8821",
    date: "Oct 24, 2023",
    time: "10:30 AM - 11:30 AM",
    client: "Sarah Jenkins",
    provider: "Dr. Marcus Thorne",
    status: "Upcoming",
  },
  {
    id: "#APT-8821",
    date: "Oct 24, 2023",
    time: "10:30 AM - 11:30 AM",
    client: "Sarah Jenkins",
    provider: "Dr. Marcus Thorne",
    status: "Upcoming",
  },
  {
    id: "#APT-8821",
    date: "Oct 24, 2023",
    time: "10:30 AM - 11:30 AM",
    client: "Sarah Jenkins",
    provider: "Dr. Marcus Thorne",
    status: "Completed",
  },
  {
    id: "#APT-8821",
    date: "Oct 24, 2023",
    time: "10:30 AM - 11:30 AM",
    client: "Sarah Jenkins",
    provider: "Dr. Marcus Thorne",
    status: "Upcoming",
  },
  {
    id: "#APT-8821",
    date: "Oct 24, 2023",
    time: "10:30 AM - 11:30 AM",
    client: "Sarah Jenkins",
    provider: "Dr. Marcus Thorne",
    status: "Canceled",
  },
  {
    id: "#APT-8821",
    date: "Oct 24, 2023",
    time: "10:30 AM - 11:30 AM",
    client: "Sarah Jenkins",
    provider: "Dr. Marcus Thorne",
    status: "Upcoming",
  },
];

export default function AppointmentsPage() {
  const router = useRouter();

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Top Filter Bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl flex flex-col sm:flex-row items-stretch sm:items-center p-3 gap-4 shadow-sm"
      >
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search Client or Provider name"
            className="pl-11 h-12 bg-[#F9FAFB] border-none rounded-xl focus-visible:ring-1 focus-visible:ring-[#6BB9BA] w-full"
          />
        </div>

        <Select defaultValue="all">
          <SelectTrigger className="w-full sm:w-[180px] h-12 bg-white py-6 border-[#E5E7EB] text-gray-600 rounded-xl">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Status</SelectItem>
            <SelectItem value="upcoming">Upcoming</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="canceled">Canceled</SelectItem>
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
                <TableHead className="py-5 px-6 font-semibold text-gray-600 text-[13px] uppercase tracking-wider">Appointment ID</TableHead>
                <TableHead className="py-5 px-6 font-semibold text-gray-600 text-[13px] uppercase tracking-wider">Date & Time</TableHead>
                <TableHead className="py-5 px-6 font-semibold text-gray-600 text-[13px] uppercase tracking-wider">Client</TableHead>
                <TableHead className="py-5 px-6 font-semibold text-gray-600 text-[13px] uppercase tracking-wider">Provider</TableHead>
                <TableHead className="py-5 px-6 font-semibold text-gray-600 text-[13px] uppercase tracking-wider text-center">Status</TableHead>
                <TableHead className="py-5 px-6 font-semibold text-gray-600 text-[13px] uppercase tracking-wider text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.map((apt, index) => (
                <TableRow key={index} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <TableCell className="py-5 px-6 font-bold text-gray-800">{apt.id}</TableCell>
                  <TableCell className="py-5 px-6">
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-800">{apt.date}</span>
                      <span className="text-sm text-gray-500 font-medium">{apt.time}</span>
                    </div>
                  </TableCell>
                  <TableCell className="py-5 px-6 font-medium text-gray-800">{apt.client}</TableCell>
                  <TableCell className="py-5 px-6 font-medium text-gray-800">{apt.provider}</TableCell>
                  <TableCell className="py-5 px-6 text-center">
                    <Badge
                      className={cn(
                        "px-4 py-1.5 rounded-full font-medium text-[12px] border-none shadow-none",
                        apt.status === "Upcoming"
                          ? "bg-[#E9F7F7] text-[#6BB9BA] hover:bg-[#E9F7F7]"
                          : apt.status === "Completed"
                            ? "bg-[#F3F4F6] text-gray-500 hover:bg-[#F3F4F6]"
                            : "bg-[#FFE9E9] text-[#FF5858] hover:bg-[#FFE9E9]"
                      )}
                    >
                      {apt.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-5 px-6 text-right">
                    <Button onClick={() => router.push(`/appointments/${index + 1}`)} variant="ghost" size="icon" className="hover:bg-gray-100 rounded-full h-8 w-8">
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