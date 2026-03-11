"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const requests = [
  { id: "#DOC-9821", type: "Birth", user: "John Doe", status: "Pending", submitted: "10:45 AM, Oct 24", action: "Review" },
  { id: "#DOC-9821", type: "Birth", user: "John Doe", status: "Rejected", submitted: "10:45 AM, Oct 24", action: "Review" },
  { id: "#DOC-9821", type: "Birth", user: "John Doe", status: "Verified", submitted: "10:45 AM, Oct 24", action: "View" },
  { id: "#DOC-9821", type: "Birth", user: "John Doe", status: "Rejected", submitted: "10:45 AM, Oct 24", action: "Review" },
  { id: "#DOC-9821", type: "Birth", user: "John Doe", status: "Pending", submitted: "10:45 AM, Oct 24", action: "Review" },
  { id: "#DOC-9821", type: "Birth", user: "John Doe", status: "Verified", submitted: "10:45 AM, Oct 24", action: "View" },
  { id: "#DOC-9821", type: "Birth", user: "John Doe", status: "Pending", submitted: "10:45 AM, Oct 24", action: "Review" },
  { id: "#DOC-9821", type: "Birth", user: "John Doe", status: "Verified", submitted: "10:45 AM, Oct 24", action: "View" },
  { id: "#DOC-9821", type: "Birth", user: "John Doe", status: "Rejected", submitted: "10:45 AM, Oct 24", action: "Review" },
];

const statusStyles = {
  Pending: "bg-[#FFF8E7] text-[#DAA520]",
  Verified: "bg-[#E6F9F1] text-[#10B981]",
  Rejected: "bg-[#FFF1F1] text-[#FF4B4B]",
};

export default function RecentActivity() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="space-y-6"
    >
      <Card className="border-none shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] bg-white rounded-2xl overflow-hidden">
        <CardContent className="p-0">
          <div className="p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-[#213F7D]">Recent Verification Requests</h2>
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
                        <button className="text-[#3B82F6] font-semibold cursor-pointer hover:underline transition-all">
                          {request.action}
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
              <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[#1E61D5] text-white font-bold shadow-md shadow-blue-200 text-sm sm:text-base">1</button>
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
    </motion.div>
  );
}
