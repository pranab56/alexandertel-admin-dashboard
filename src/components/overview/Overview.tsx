"use client";

import { cn } from "@/lib/utils";
import {
  ClipboardList,
  ShoppingBag,
  Wallet,
  TrendingUp,
  Loader2
} from "lucide-react";
import { useState } from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts";
import { useOverviewAnalyticsQuery, useOverviewSalesQuery } from "@/features/overview/overviewApi";

export default function Overview() {
  const [viewType, setViewType] = useState<"weekly" | "yearly">("weekly");

  const { data: analyticsResponse, isLoading: isAnalyticsLoading } = useOverviewAnalyticsQuery({});
  const { data: salesResponse, isLoading: isSalesLoading } = useOverviewSalesQuery({ type: viewType });

  const stats = analyticsResponse?.data || { totalOrders: 0, totalSales: 0, totalActiveRepair: 0 };
  const chartData = (salesResponse?.data || []).map((item: { label: string; totalSales: number; totalOrders: number }) => ({
    name: item.label,
    value: item.totalSales,
    orders: item.totalOrders
  }));

  const statsData = [
    { label: "Total Sales", value: `€${stats.totalSales.toLocaleString()}`, icon: Wallet, color: "bg-blue-50 text-blue-500" },
    { label: "Total Orders", value: stats.totalOrders.toString(), icon: ShoppingBag, color: "bg-emerald-50 text-emerald-500" },
    { label: "Active Repairs", value: stats.totalActiveRepair.toString(), icon: ClipboardList, color: "bg-amber-50 text-amber-500" },
  ];

  interface TooltipProps {
    active?: boolean;
    payload?: Array<{ value: number; payload: { orders: number } }>;
    label?: string;
  }

  const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-xl shadow-xl border border-gray-100">
          <p className="text-sm font-medium text-gray-900 mb-1">{label}</p>
          <div className="space-y-1">
            <p className="text-xs font-medium text-primary flex items-center gap-2">
              Sales: <span className="text-gray-700">€{payload[0].value.toLocaleString()}</span>
            </p>
            <p className="text-xs font-medium text-emerald-500 flex items-center gap-2">
              Orders: <span className="text-gray-700">{payload[0].payload.orders}</span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-medium text-gray-900 tracking-tight flex items-center gap-2">
            Dashboard Overview <TrendingUp className="w-6 h-6 text-emerald-500" />
          </h1>
          <p className="text-gray-500 font-medium mt-1">Monitoring real-time performance and operations.</p>
        </div>
      </div>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {statsData.map((stat, idx) => (
          <div key={idx} className="bg-white p-8 rounded-xl border border-gray-100 flex items-center gap-6 transition-all hover:shadow-md hover:-translate-y-1">
            <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center shrink-0", stat.color)}>
              <stat.icon className="w-8 h-8" />
            </div>
            <div>
              <p className="text-sm text-gray-400 font-medium uppercase tracking-wider">{stat.label}</p>
              {isAnalyticsLoading ? (
                <div className="h-8 w-24 bg-gray-100 animate-pulse rounded-md mt-1" />
              ) : (
                <h3 className="text-2xl font-medium text-gray-900 mt-0.5">{stat.value}</h3>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid Content */}
      <div className="space-y-8">
        {/* Sales Analytic Chart */}
        <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div>
              <h2 className="text-xl font-medium text-gray-900">{viewType === "weekly" ? "Weekly" : "Yearly"} Revenue</h2>
              <p className="text-sm text-gray-400 font-medium mt-1">Business performance analytics for the selected period</p>
            </div>

            <div className="flex items-center bg-gray-50 p-1.5 rounded-xl border border-gray-100">
              <button
                onClick={() => setViewType("weekly")}
                className={cn(
                  "px-6 py-2.5 rounded-lg text-sm cursor-pointer font-medium transition-all",
                  viewType === "weekly"
                    ? "bg-white text-primary shadow-md"
                    : "text-gray-400 hover:text-gray-600"
                )}
              >
                Weekly
              </button>
              <button
                onClick={() => setViewType("yearly")}
                className={cn(
                  "px-6 py-2.5 rounded-lg text-sm cursor-pointer font-medium transition-all",
                  viewType === "yearly"
                    ? "bg-white text-primary shadow-md"
                    : "text-gray-400 hover:text-gray-600"
                )}
              >
                Yearly
              </button>
            </div>
          </div>

          <div className="h-[360px] w-full relative">
            {isSalesLoading && (
              <div className="absolute inset-0 z-10 bg-white/50 backdrop-blur-sm flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-primary animate-spin" />
              </div>
            )}
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6C63FF" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#6C63FF" stopOpacity={0.01} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#9CA3AF', fontSize: 13, fontWeight: 600 }}
                  dy={15}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#9CA3AF', fontSize: 13, fontWeight: 600 }}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#6C63FF', strokeWidth: 1 }} />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#6C63FF"
                  strokeWidth={4}
                  fillOpacity={1}
                  fill="url(#colorSales)"
                  animationDuration={1500}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
