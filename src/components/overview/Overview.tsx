"use client";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  Calendar as CalendarIcon,
  ClipboardList,
  Package,
  ShoppingBag,
  Wallet
} from "lucide-react";
import { useState } from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

const statsData = [
  { label: "Today's Sales", value: "€4,250.00", icon: Wallet, color: "bg-blue-50 text-blue-500" },
  { label: "Total Orders", value: "48", icon: ShoppingBag, color: "bg-blue-50 text-blue-500" },
  { label: "Active Repairs", value: "12", icon: ClipboardList, color: "bg-blue-50 text-blue-500" },
  { label: "Wallet Top-ups", value: "8 Pending", icon: Wallet, color: "bg-blue-50 text-blue-500" },
];

const revenueData = [
  { name: "Mon", value: 3000 },
  { name: "Tue", value: 2500 },
  { name: "Wed", value: 2000 },
  { name: "Thu", value: 4500 },
  { name: "Fri", value: 4800 },
  { name: "Sat", value: 2000 },
  { name: "Sun", value: 3800 },
];

const repairCategories = [
  { name: "Screen Replacement", percentage: 65, color: "bg-secondary" },
  { name: "Battery Service", percentage: 25, color: "bg-primary" },
  { name: "Water Damage", percentage: 10, color: "bg-red-500" },
];

export default function Overview() {
  const [date, setDate] = useState<Date | undefined>(new Date("2025-10-24"));

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-500 mt-1">Monitoring real-time performance and operations.</p>
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors">
              <CalendarIcon className="w-5 h-5 text-gray-400" />
              <span className="text-gray-600 font-medium">{date ? format(date, "MMMM d, yyyy") : "Pick a date"}</span>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 rounded-2xl border-gray-100 shadow-lg" align="end">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl border border-gray-100 flex items-center gap-4 transition-transform hover:scale-[1.02]">
            <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", stat.color)}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
              <h3 className="text-xl font-bold text-gray-900 mt-0.5">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left/Middle: Revenue & Schedule */}
        <div className="lg:col-span-2 space-y-8">

          {/* Weekly Revenue Chart */}
          <div className="bg-white p-8 rounded-xl">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900">Weekly Revenue</h2>
              <p className="text-sm text-gray-500 mt-1">Historical performance for current year</p>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData} margin={{ top: 10, right: 20, left: 20, bottom: 10 }}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6C63FF" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#6C63FF" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#9CA3AF', fontSize: 13 }}
                    dy={10}
                    interval={0}
                  />
                  <YAxis hide />
                  <Tooltip
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#6C63FF"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorValue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pickup & Delivery Schedule */}
          <div className="space-y-6">
            <h2 className="text-xl font-medium text-gray-900">Pickup & Delivery Schedule (Today)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#70C8FF] p-6 rounded-xl flex items-center gap-6 text-white overflow-hidden relative group cursor-pointer transition-all hover:brightness-105">
                <div className="w-14 h-14 bg-secondary rounded-full flex items-center justify-center shrink-0 shadow-lg">
                  <span className="text-2xl font-bold">3</span>
                </div>
                <div>
                  <h4 className="text-lg font-medium">Pickups Pending</h4>
                  <p className="text-white/80 text-sm">Scheduled for store walk- in</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-100 flex items-center gap-6 overflow-hidden relative group cursor-pointer transition-all hover:bg-gray-50">
                <div className="w-14 h-14 bg-secondary rounded-full flex items-center justify-center shrink-0 shadow-lg">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-gray-900">Deliveries Out</h4>
                  <p className="text-gray-500 text-sm">Currently in courier transit</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Alerts & Categories */}
        <div className="space-y-8">

          {/* Priority Alerts */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-medium text-gray-900">Priority Alerts</h2>
              <span className="bg-red-50 text-red-500 text-[10px] font-bold px-2 py-1 rounded-md tracking-wider uppercase">2 CRITICAL</span>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-100 space-y-4 transition-all hover:shadow-md">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center shrink-0">
                  <Package className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Low stock: iPhone 14</h4>
                  <p className="text-sm text-gray-500 mt-1 leading-relaxed">Only 2 units remaining in Main Hub.</p>
                </div>
              </div>
              <button className="w-full bg-secondary cursor-pointer text-white py-3 rounded-xl font-bold text-sm transition-all active:scale-[0.98] hover:bg-secondary/90">
                Restock Now
              </button>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-100 space-y-4 transition-all hover:shadow-md">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                  <Wallet className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Pending bank transfer top-ups:4</h4>
                  <p className="text-sm text-gray-500 mt-1 leading-relaxed">Verification required for $1,240.00 total.</p>
                </div>
              </div>
              <button className="w-full bg-primary cursor-pointer text-white py-3 rounded-xl font-bold text-sm transition-all active:scale-[0.98] hover:bg-primary/90">
                Verify Transfers
              </button>
            </div>
          </div>

          {/* Top Repair Categories */}
          <div className="bg-white p-8 rounded-xl border border-gray-100">
            <h2 className="text-xl font-medium text-gray-900 mb-6">Top Repair Categories</h2>
            <div className="space-y-8">
              {repairCategories.map((item, idx) => (
                <div key={idx} className="space-y-3">
                  <div className="flex justify-between items-center text-sm font-medium text-gray-900">
                    <span>{item.name}</span>
                    <span>{item.percentage}%</span>
                  </div>
                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={cn("h-full rounded-full transition-all duration-1000", item.color)}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
