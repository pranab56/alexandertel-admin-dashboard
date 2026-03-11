"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ChevronRight, MapPin } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

const providerData = {
  name: "Dr. Sarah Jenkins, PsyD",
  npi: "1234567890",
  submittedDate: "Oct 24, 2023",
  location: "Dubai, UAE",
  personalInfo: {
    fullName: "Sarah Jenkins, Ph.D.",
    email: "s.jenkins.therapy@provider.com",
    phone: "+1 (555) 234-5678",
    practiceAddress: "123 Healing Way, Suite 400, Austin, TX 78701",
  },
  credentials: {
    type: "Licensed Clinical Psychologist",
    licenseNumber: "TX-PY-98765 (Exp. 12/2025)",
    bio: "Dedicated clinical psychologist with over 12 years of experience specializing in evidence-based treatments for complex trauma and anxiety disorders. Former lead researcher at the Austin Behavioral Health Center.",
  },
  documents: [
    { name: "State_License_TX.pdf", type: "pdf" },
    { name: "Ph.D_Diploma_UT.jpg", type: "jpg" },
  ],
};

const InfoItem = ({ label, value, isEmail }: { label: string; value: string; isEmail?: boolean }) => (
  <div className="space-y-1.5">
    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-tight">{label}</p>
    <p className={cn("text-[15px] font-medium leading-relaxed", isEmail ? "text-[#9B85C4]" : "text-gray-800")}>
      {value}
    </p>
  </div>
);

export default function ProviderDetailsPage() {
  const params = useParams();
  console.log(params);

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* Breadcrumbs */}
      <nav className="flex flex-wrap items-center gap-2 text-sm text-gray-400 font-medium">
        <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <Link href="/user-management/providers" className="hover:text-gray-600 transition-colors">Providers</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-[#9B85C4] truncate max-w-[200px] sm:max-w-none">Dr. Sarah Jenkins</span>
      </nav>

      {/* Profile Header Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="border-none shadow-sm overflow-hidden bg-white">
          <CardContent className="p-4 sm:p-8 flex flex-col sm:flex-row items-center  gap-6">
            <div className="relative">
              <Avatar className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl overflow-hidden border-none shadow-md">
                <AvatarImage src="https://images.unsplash.com/photo-1559839734-2b71f1536783?q=80&w=2670&auto=format&fit=crop" className="object-cover" />
                <AvatarFallback>SJ</AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-4 border-white rounded-full shadow-sm" />
            </div>
            <div className="space-y-2 text-center sm:text-left">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800 tracking-tight">{providerData.name}</h1>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-3 gap-y-1 text-sm font-medium text-gray-500">
                <span>NPI: {providerData.npi}</span>
                <span className="hidden sm:inline text-gray-300">•</span>
                <span>Submitted {providerData.submittedDate}</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-1 text-sm font-medium text-[#6BB9BA]">
                <MapPin className="w-4 h-4" />
                <span>{providerData.location}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-24 sm:pb-32">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="border-none shadow-sm bg-white h-fit">
              <CardHeader className="pb-4 pt-8 px-6 sm:px-8">
                <CardTitle className="text-lg font-bold text-gray-700 tracking-tight">Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="p-6 sm:p-8 pt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                  <InfoItem label="Full Name" value={providerData.personalInfo.fullName} />
                  <InfoItem label="Email Address" value={providerData.personalInfo.email} isEmail />
                  <InfoItem label="Phone Number" value={providerData.personalInfo.phone} />
                  <InfoItem label="Practice Address" value={providerData.personalInfo.practiceAddress} />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Professional Credentials */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="border-none shadow-sm bg-white">
              <CardHeader className="pb-4 pt-8 px-6 sm:px-8">
                <CardTitle className="text-lg font-bold text-gray-700 tracking-tight">Professional Credentials</CardTitle>
              </CardHeader>
              <CardContent className="p-6 sm:p-8 pt-0 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12 pb-6 border-b border-gray-50">
                  <InfoItem label="License Type" value={providerData.credentials.type} />
                  <InfoItem label="License Number" value={providerData.credentials.licenseNumber} />
                </div>
                <div className="space-y-3">
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-tight">Bio Statement</p>
                  <p className="text-sm text-gray-600 leading-relaxed font-normal">
                    {providerData.credentials.bio}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Right Column - Verification Documents */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="border-none shadow-sm bg-white h-full">
            <CardHeader className="pb-4 pt-8 px-6 sm:px-8">
              <CardTitle className="text-lg font-bold text-gray-700 tracking-tight">Verification Documents</CardTitle>
            </CardHeader>
            <CardContent className="p-6 sm:p-8 pt-0 space-y-8">
              {providerData.documents.map((doc, index) => (
                <div key={index} className="space-y-3">
                  <p className="text-sm font-medium text-gray-600">{doc.name}</p>
                  <div className="w-full aspect-[16/9] bg-[#F8F9FA] rounded-2xl border-2 border-dashed border-gray-100 flex items-center justify-center p-2 relative overflow-hidden group transition-all hover:border-[#6BB9BA]/30">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/graphy.png')] opacity-10" />
                    <div className="z-10 bg-white/50 backdrop-blur-[1px] px-4 py-2 rounded-lg text-gray-400 text-xs font-semibold group-hover:bg-[#6BB9BA]/10 group-hover:text-[#6BB9BA] transition-colors">
                      CLICK TO VIEW
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Footer Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="fixed bottom-0 left-0 right-0 min-h-[96px] py-4 bg-white/80 backdrop-blur-md border-t border-gray-100 flex flex-col sm:flex-row items-center justify-center sm:justify-end px-6 sm:px-12 gap-3 sm:gap-6 z-50 shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.1)]"
      >
        <Button
          variant="outline"
          className="w-full sm:w-auto h-12 px-10 rounded-xl border-[#FF5858] text-[#FF5858] font-bold hover:bg-[#FF5858] hover:text-white transition-all active:scale-[0.98]"
        >
          Reject Application
        </Button>
        <Button
          className="w-full sm:w-auto h-12 px-10 rounded-xl bg-[#9B85C4] hover:bg-[#826AB4] text-white font-bold transition-all active:scale-[0.98] shadow-lg shadow-purple-100"
        >
          Approve Provider
        </Button>
      </motion.div>
    </div>
  );
}