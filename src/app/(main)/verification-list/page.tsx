"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  X
} from "lucide-react";
import { useState } from "react";

interface VerificationRequest {
  id: string;
  type: string;
  user: string;
  status: string;
  submitted: string;
  action: string;
}

interface VerificationDetail {
  id: string;
  type: string;
  authority: string;
  dateSubmitted: string;
  user: string;
  userId: string;
}

const requests: VerificationRequest[] = [
  { id: "#DOC-9821", type: "Birth", user: "John Doe", status: "Pending", submitted: "10:45 AM, Oct 24", action: "Review" },
  { id: "#DOC-9821", type: "Birth", user: "John Doe", status: "Rejected", submitted: "10:45 AM, Oct 24", action: "Review" },
  { id: "#DOC-9821", type: "Birth", user: "John Doe", status: "Verified", submitted: "10:45 AM, Oct 24", action: "Done" },
  { id: "#DOC-9821", type: "Birth", user: "John Doe", status: "Rejected", submitted: "10:45 AM, Oct 24", action: "Review" },
  { id: "#DOC-9821", type: "Birth", user: "John Doe", status: "Pending", submitted: "10:45 AM, Oct 24", action: "Review" },
  { id: "#DOC-9821", type: "Birth", user: "John Doe", status: "Verified", submitted: "10:45 AM, Oct 24", action: "Done" },
  { id: "#DOC-9821", type: "Birth", user: "John Doe", status: "Pending", submitted: "10:45 AM, Oct 24", action: "Review" },
  { id: "#DOC-9821", type: "Birth", user: "John Doe", status: "Verified", submitted: "10:45 AM, Oct 24", action: "Done" },
  { id: "#DOC-9821", type: "Birth", user: "John Doe", status: "Rejected", submitted: "10:45 AM, Oct 24", action: "Review" },
];

const statusStyles = {
  Pending: "bg-[#FFF8E7] text-[#DAA520]",
  Verified: "bg-[#E6F9F1] text-[#10B981]",
  Rejected: "bg-[#FFF1F1] text-[#FF4B4B]",
};

export default function VerificationList() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<VerificationDetail | null>(null);

  const handleReview = (doc: VerificationRequest) => {
    setSelectedDoc({
      id: doc.id,
      type: doc.type,
      authority: "United States Dept of State",
      dateSubmitted: doc.submitted,
      user: doc.user,
      userId: "8829"
    });
    setIsSheetOpen(true);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      {/* Header Filters */}
      <Card className="border-none shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] bg-white rounded-2xl p-0">
        <CardContent className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
          <div className="relative flex-1 min-w-0 sm:min-w-[300px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Select you subject here..."
              className="pl-10 h-12 bg-gray-50/50 border-gray-100 rounded-xl focus-visible:ring-0 w-full"
            />
          </div>
          <Select defaultValue="status">
            <SelectTrigger className="w-full sm:w-[180px] h-12 bg-gray-50/50 p-6 border-gray-100 rounded-xl">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="status">Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="verified">Verified</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Main Table */}
      <Card className="border-none shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] bg-white rounded-2xl overflow-hidden">
        <CardContent className="p-0">
          <div className="p-6 sm:p-8">
            <h1 className="text-xl sm:text-2xl font-medium text-[#213F7D]">Verification List</h1>
          </div>

          <div className="overflow-x-auto w-full">
            <div className="inline-block min-w-full align-middle">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#E9F0FD] text-[#4A5568] text-xs sm:text-sm font-medium">
                    <th className="px-4 sm:px-8 py-4 whitespace-nowrap">Document ID</th>
                    <th className="px-4 sm:px-6 py-4 whitespace-nowrap">Type</th>
                    <th className="px-4 sm:px-6 py-4 whitespace-nowrap">User</th>
                    <th className="px-4 sm:px-6 py-4 whitespace-nowrap">Status</th>
                    <th className="px-4 sm:px-6 py-4 whitespace-nowrap">Submitted</th>
                    <th className="px-4 sm:px-8 py-4 whitespace-nowrap text-right sm:text-left">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {requests.map((request, index) => (
                    <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-4 sm:px-8 py-5 text-xs sm:text-sm font-medium text-[#2D3748] whitespace-nowrap">{request.id}</td>
                      <td className="px-4 sm:px-6 py-5 text-xs sm:text-sm text-[#4A5568] whitespace-nowrap">{request.type}</td>
                      <td className="px-4 sm:px-6 py-5 text-xs sm:text-sm text-[#4A5568] whitespace-nowrap">{request.user}</td>
                      <td className="px-4 sm:px-6 py-5">
                        <span className={cn(
                          "px-2 sm:px-3 py-1 rounded-lg text-[10px] sm:text-xs font-semibold inline-block",
                          statusStyles[request.status as keyof typeof statusStyles]
                        )}>
                          {request.status}
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-5 text-xs sm:text-sm text-[#4A5568] whitespace-nowrap">{request.submitted}</td>
                      <td className="px-4 sm:px-8 py-5 text-xs sm:text-sm text-right sm:text-left">
                        {request.action === "Review" ? (
                          <button
                            onClick={() => handleReview(request)}
                            className="text-[#3B82F6] font-semibold cursor-pointer hover:underline transition-all"
                          >
                            Review
                          </button>
                        ) : (
                          <span className="text-gray-400 font-medium">Done</span>
                        )}
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

      {/* Review Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="w-full sm:max-w-[500px] p-0 border-none">
          <div className="h-full flex flex-col overflow-hidden">
            <SheetHeader className="p-6 sm:p-8 border-b border-gray-50 flex-row items-center justify-between space-y-0">
              <SheetTitle className="text-xl sm:text-2xl font-medium text-[#213F7D]">Document Info</SheetTitle>
              <SheetClose className="rounded-full p-2 hover:bg-gray-100 transition-colors">
                <X className="w-5 h-5 sm:w-6 sm:h-6 text-[#213F7D]" />
              </SheetClose>
            </SheetHeader>

            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 sm:space-y-10">
              {/* Info Grid */}
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-x-6 gap-y-8 sm:gap-x-8 sm:gap-y-10">
                <div className="space-y-1">
                  <p className="text-lg sm:text-xl font-medium text-[#213F7D]">Document ID</p>
                  <p className="text-sm sm:text-base text-gray-500">{selectedDoc?.id}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-lg sm:text-xl font-medium text-[#213F7D]">Document Type</p>
                  <p className="text-sm sm:text-base text-gray-500">{selectedDoc?.type}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-lg sm:text-xl font-medium text-[#213F7D]">Issuing Authority</p>
                  <p className="text-sm sm:text-base text-gray-500">{selectedDoc?.authority}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-lg sm:text-xl font-medium text-[#213F7D]">Date Submitted</p>
                  <p className="text-sm sm:text-base text-gray-500">{selectedDoc?.dateSubmitted}</p>
                </div>
                <div className="xs:col-span-2 space-y-1">
                  <p className="text-lg sm:text-xl font-medium text-[#213F7D]">Submitted</p>
                  <p className="text-sm sm:text-base text-gray-500">{selectedDoc?.user} (ID: {selectedDoc?.userId})</p>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-8 sm:pt-10">
                <h3 className="text-xl sm:text-2xl font-medium text-[#213F7D] mb-6 sm:mb-8">Verification Checklist</h3>

                <div className="space-y-3 sm:space-y-4">
                  {[
                    "Document readable",
                    "Authority Matches",
                    "Signature/Seal valid",
                    "No tampering detected"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-gray-100 hover:bg-gray-50/50 transition-all cursor-pointer group">
                      <Checkbox id={`check-${idx}`} className="w-5 h-5 sm:w-6 sm:h-6 rounded-md border-2 border-gray-300 data-[state=checked]:bg-[#1E61D5] data-[state=checked]:border-[#1E61D5]" />
                      <label
                        htmlFor={`check-${idx}`}
                        className="text-sm sm:text-base font-medium text-[#213F7D] cursor-pointer"
                      >
                        {item}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8 border-t border-gray-50 flex flex-col xs:flex-row gap-3 sm:gap-4 mt-auto">
              <Button
                variant="outline"
                className="w-full xs:flex-1 h-12 sm:h-14 rounded-xl border-[#FF4B4B] text-[#FF4B4B] hover:bg-[#FF4B4B] hover:text-white transition-all text-sm sm:text-base font-medium"
                onClick={() => setIsSheetOpen(false)}
              >
                Reject
              </Button>
              <Button
                className="w-full xs:flex-[1.5] h-12 sm:h-14 rounded-xl bg-[#1E61D5] hover:bg-[#164bbd] text-white transition-all text-sm sm:text-base font-medium px-4 sm:px-8"
                onClick={() => setIsSheetOpen(false)}
              >
                Approve Document
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}