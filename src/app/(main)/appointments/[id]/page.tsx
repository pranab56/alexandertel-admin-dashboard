"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function AppointmentDetails() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-gray-500">
        <Link href="/appointments" className="hover:text-[#6BB9BA] transition-colors">
          Appointments
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span className="hover:text-[#6BB9BA] transition-colors cursor-pointer">
          Upcoming
        </span>
        <ChevronRight className="w-4 h-4" />
        <span className="text-[#6BB9BA] font-medium">#APT-10245</span>
      </nav>

      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-gray-900">
          Manage Schedule & Availability
        </h1>
        <p className="text-gray-500">
          Set your weekly availability and session preferences for clients to book.
        </p>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Client Information */}
        <InfoCard title="Client Information" >
          <InfoItem label="FULL NAME" value="Sarah Jenkins, Ph.D." />
          <InfoItem label="CLIENT ID" value="C-88291" />
          <InfoItem
            label="EMAIL ADDRESS"
            value="s.jenkins.therapy@provider.com"
          />
        </InfoCard>

        {/* Provider Information */}
        <InfoCard title="Provider Information">
          <InfoItem label="FULL NAME" value="Dr. Aris Thorne" />
          <InfoItem label="CREDENTIALS" value="Psy.D, Clinical Psychologist" />
          <InfoItem label="PHONE NUMBER" value="+1 (555) 234-5678" />
        </InfoCard>

        {/* Session Schedule */}
        <InfoCard title="Session Schedule">
          <InfoItem label="DATE & TIME" value="May 24, 2024 . 10:00 AM" />
          <InfoItem label="TIMEZONE" value="Eastern Standard Time (EST)" />
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold text-gray-400 tracking-wider uppercase">
              SESSION ACCESS
            </span>
            <div>
              <Link
                href="#"
                className="text-[#6BB9BA] hover:text-[#5aa8a9] font-medium transition-colors"
              >
                Join Video consultation
              </Link>
            </div>
          </div>
        </InfoCard>

        {/* Financial Information */}
        <InfoCard title="Financial Information">
          <InfoItem label="CONSULTATION FEE" value="$150.00 USD" />
          <InfoItem
            label="PAYMENT STATUS"
            value="Paid (Credit Card ending in 4242)"
          />
          <InfoItem label="SESSION TYPE" value="Individual Therapy (60 min)" />
        </InfoCard>
      </div>
    </div>
  );
}

function InfoCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Card className="h-full border-none shadow-sm hover:shadow-md transition-shadow bg-white rounded-2xl overflow-hidden">
        <CardHeader className=" px-6">
          <CardTitle className="text-lg font-bold text-gray-800">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 px-6">
          {children}
        </CardContent>
      </Card>
    </motion.div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1.5">
      <h3 className="text-[11px] font-bold text-gray-400 tracking-wider uppercase">
        {label}
      </h3>
      <p className="text-[15px] font-medium text-gray-700 leading-relaxed">
        {value}
      </p>
    </div>
  );
}
