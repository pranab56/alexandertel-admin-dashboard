"use client";

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
import { Bell, Info, Calendar } from "lucide-react";
import { useState } from "react";
import { useAllNotificationQuery } from "@/features/notification/notificationApi";

interface Notification {
  _id: string;
  text: string;
  type: string;
  createdAt: string;
  read: boolean;
}

export default function NotificationPage() {
  const [page, setPage] = useState(1);
  const { data: notificationResponse, isLoading } = useAllNotificationQuery({ page, limit: 10 });

  const notifications = notificationResponse?.data?.result || [];
  const meta = notificationResponse?.data?.meta || { total: 0, limit: 10, page: 1, totalPage: 1 };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTimeAgo = (dateString: string) => {
    const seconds = Math.floor((new Date().getTime() - new Date(dateString).getTime()) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    return Math.floor(seconds) + " seconds ago";
  };

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-medium text-gray-900 tracking-tight">Notifications</h1>
          <p className="text-gray-500 font-medium">Keep track of yours and your customer activity.</p>
        </div>
      </div>

      <Card className="border border-gray-100 shadow-sm bg-white rounded-lg overflow-hidden p-0">
        <CardHeader className="bg-[#F8F9FC] border-b border-gray-100 p-6">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <Bell className="w-5 h-5 text-primary" />
            Recent Activity
            <Badge variant="secondary" className="ml-2 bg-primary text-white rounded-full px-3 py-0.5 border-none font-medium">
              {meta.total} Total
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-gray-50/50">
                <TableRow className="hover:bg-transparent border-gray-100">
                  <TableHead className="w-[80px] text-center font-medium text-gray-900">Icon</TableHead>
                  <TableHead className="py-4 font-medium text-gray-900">Message</TableHead>
                  <TableHead className="font-medium text-gray-900">Date & Time</TableHead>
                  <TableHead className="text-right pr-8 font-medium text-gray-900">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i} className="animate-pulse">
                      <TableCell colSpan={4} className="h-20 bg-gray-50/50" />
                    </TableRow>
                  ))
                ) : notifications.length > 0 ? (
                  notifications.map((notification: Notification) => (
                    <TableRow
                      key={notification._id}
                      className={cn(
                        "group transition-colors border-gray-50",
                        !notification.read ? "bg-primary/[0.02]" : "bg-transparent"
                      )}
                    >
                      <TableCell className="text-center py-5">
                        <div className="flex justify-center">
                          <div className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center",
                            notification.type === "ADMIN" ? "bg-blue-50" : "bg-orange-50"
                          )}>
                            {notification.type === "ADMIN" ? (
                              <Bell className="w-5 h-5 text-blue-500" />
                            ) : (
                              <Info className="w-5 h-5 text-orange-500" />
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="py-5">
                        <div className="flex flex-col gap-1">
                          <span className="text-[15px] font-medium text-gray-900 leading-snug">{notification.text}</span>
                          <span className="text-[12px] text-gray-400 font-medium uppercase tracking-wider">{getTimeAgo(notification.createdAt)}</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-5">
                        <div className="flex items-center gap-2 text-gray-600 font-medium text-sm">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          {formatDate(notification.createdAt)}
                        </div>
                      </TableCell>
                      <TableCell className="text-right pr-8 py-5">
                        <Badge className={cn(
                          "rounded-full px-4 py-1.5 font-medium border-none shadow-none text-[12px]",
                          notification.read
                            ? "bg-gray-100 text-gray-400"
                            : "bg-[#E6F9F0] text-[#2DC766]"
                        )}>
                          {notification.read ? "Viewed" : "New"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="h-64 text-center">
                      <div className="flex flex-col items-center justify-center text-muted-foreground">
                        <div className="p-4 rounded-full bg-gray-50 mb-3">
                          <Bell className="w-12 h-12 text-gray-200" />
                        </div>
                        <p className="text-lg font-medium text-gray-400">No notifications found</p>
                        <p className="text-sm font-medium">You&apos;re all caught up with the updates!</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="p-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4 bg-white">
            <p className="text-gray-500 font-medium text-sm">Showing {notifications.length} of {meta.total} Notifications</p>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                className="text-gray-400 font-medium hover:bg-transparent text-[15px]"
                disabled={meta.page === 1}
                onClick={() => setPage(page - 1)}
              >
                Prev
              </Button>
              <div className="flex items-center gap-2 px-2">
                {Array.from({ length: meta.totalPage }, (_, i) => i + 1).map((pageNum) => (
                  <Button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={cn(
                      "w-10 h-10 p-0 rounded-lg font-medium transition-all",
                      meta.page === pageNum
                        ? "bg-primary text-white hover:bg-primary/90 shadow-md"
                        : "bg-white border border-gray-100 text-gray-600 hover:bg-gray-50"
                    )}
                  >
                    {pageNum}
                  </Button>
                ))}
              </div>
              <Button
                variant="ghost"
                className="text-gray-400 font-medium hover:bg-transparent text-[15px]"
                disabled={meta.page === meta.totalPage}
                onClick={() => setPage(page + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}