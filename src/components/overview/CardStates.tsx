"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const stats = [
  { title: "TOTAL DOCUMENTS", value: "2,340", color: "text-[#213F7D]" },
  { title: "TOTAL PENDING", value: "780", color: "text-[#213F7D]" },
  { title: "VERIFIED TODAY", value: "56", color: "text-[#213F7D]" },
  { title: "REJECTED", value: "12", color: "text-[#FF4B4B]" },
];

export default function CardStates() {
  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="border-none shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] bg-white rounded-2xl h-full flex flex-col justify-center p-0">
            <CardContent className="p-5 sm:p-8">
              <p className="text-[10px] sm:text-xs text-[#718096] font-semibold mb-2 sm:mb-3 tracking-wider">{stat.title}</p>
              <h3 className={cn("text-2xl sm:text-3xl font-medium tracking-tight", stat.color)}>
                {stat.value}
              </h3>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
