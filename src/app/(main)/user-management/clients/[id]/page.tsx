"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

const clientData = {
  id: "MND-88219",
  name: "Jane Doe",
  fullName: "Jane Amanda Doe",
  email: "jane.doe@example.com",
  phone: "+1 (555) 234-5678",
  location: "Chicago, IL, United States",
  memberSince: "Jan 12, 2023",
  lastLogin: "October 24, 2023-09:42 AM",
  accountCreated: "January 12, 2023",
  appointments: [
    { therapist: "Sarah Birman", dateTime: "$2,840.00", status: "UPCOMING" },
    { therapist: "Sarah Birman", dateTime: "$2,840.00", status: "COMPLETED" },
    { therapist: "Sarah Birman", dateTime: "$2,840.00", status: "UPCOMING" },
  ],
  invoices: [
    { id: "#INV-2023-10-01", amount: "$150.00" },
    { id: "#INV-2023-10-02", amount: "$150.00" },
    { id: "#INV-2023-10-03", amount: "$150.00" },
    { id: "#INV-2023-10-04", amount: "$150.00" },
  ],
};

const InfoItem = ({ label, value, isEmail }: { label: string; value: string; isEmail?: boolean }) => (
  <div className="space-y-1.5">
    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">{label}</p>
    <p className={cn("text-sm font-medium", isEmail ? "text-[#9B85C4]" : "text-gray-700")}>
      {value}
    </p>
  </div>
);

export default function ClientDetailsPage() {
  const params = useParams();
  console.log(params);

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 font-medium">
        <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <Link href="/user-management/clients" className="hover:text-gray-600 transition-colors">Clients</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-[#9B85C4]">Dr. Sarah Jenkins</span>
      </nav>

      {/* Profile Header Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="border-none shadow-sm overflow-hidden">
          <CardContent className="p-8 flex items-center gap-6">
            <div className="relative">
              <Avatar className="w-32 h-32 rounded-3xl border-4 border-white shadow-lg overflow-hidden">
                <AvatarImage src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=2662&auto=format&fit=crop" className="object-cover" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
            <div className="space-y-1">
              <h1 className="text-3xl font-bold text-gray-800">{clientData.name}</h1>
              <p className="text-sm font-medium text-gray-400">Client ID: #{clientData.id}</p>
              <p className="text-sm font-medium text-gray-400">Member since: {clientData.memberSince}</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="border-none shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-bold text-gray-700">Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                  <InfoItem label="Full Name" value={clientData.fullName} />
                  <InfoItem label="Email Address" value={clientData.email} isEmail />
                  <InfoItem label="Phone Number" value={clientData.phone} />
                  <InfoItem label="Location" value={clientData.location} />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Account Access */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="border-none shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-bold text-gray-700">Account Access</CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                  <InfoItem label="Last Login" value={clientData.lastLogin} />
                  <InfoItem label="Account Created" value={clientData.accountCreated} />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Appointment History */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="border-none shadow-sm overflow-hidden">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-bold text-gray-700">Appointment History</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader className="bg-[#E9F2F2] border-none">
                    <TableRow className="border-none hover:bg-transparent">
                      <TableHead className="py-4 px-8 font-semibold text-gray-500 text-[11px] uppercase tracking-wider">Therapist</TableHead>
                      <TableHead className="py-4 px-8 font-semibold text-gray-500 text-[11px] uppercase tracking-wider">Date & Time</TableHead>
                      <TableHead className="py-4 px-8 font-semibold text-gray-500 text-[11px] uppercase tracking-wider text-center">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {clientData.appointments.map((apt, index) => (
                      <TableRow key={index} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                        <TableCell className="py-5 px-8 font-medium text-gray-700">{apt.therapist}</TableCell>
                        <TableCell className="py-5 px-8 font-semibold text-gray-700">{apt.dateTime}</TableCell>
                        <TableCell className="py-5 px-8 text-center">
                          <Badge
                            className={cn(
                              "px-4 py-1.5 rounded-full font-bold text-[10px] border-none shadow-none",
                              apt.status === "UPCOMING"
                                ? "bg-[#E9F7F7] text-[#6BB9BA] hover:bg-[#E9F7F7]"
                                : "bg-[#F3F4F6] text-gray-400 hover:bg-[#F3F4F6]"
                            )}
                          >
                            {apt.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Recent Invoices */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="border-none shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-bold text-gray-700">Recent Invoices</CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0 space-y-6">
                {clientData.invoices.map((invoice, index) => (
                  <div key={index} className="flex items-center justify-between group cursor-pointer">
                    <span className="text-sm font-medium text-gray-500 group-hover:text-gray-700 transition-colors">
                      Invoice {invoice.id}
                    </span>
                    <span className="text-sm font-bold text-gray-800">
                      {invoice.amount}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Action Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Button
              className="w-full h-14 bg-[#FF5858] hover:bg-[#ff4545] text-white rounded-xl font-bold text-base shadow-lg shadow-red-100 transition-all active:scale-[0.98]"
            >
              Block User Profile
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}