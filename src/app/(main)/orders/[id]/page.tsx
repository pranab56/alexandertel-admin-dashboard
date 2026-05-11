"use client";

import { useSingleOrdersQuery } from "@/features/orders/ordersApi";
import { useParams, useRouter } from "next/navigation";
import {
  ChevronLeft,
  User,
  MapPin,
  CreditCard,
  Truck,
  Calendar,
  Mail,
  ShieldCheck,
  Package,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function OrderDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: orderResponse, isLoading } = useSingleOrdersQuery(id);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <Clock className="w-12 h-12 text-primary animate-spin" />
        <p className="text-gray-500 font-medium uppercase tracking-widest text-xs">Loading Order Dossier...</p>
      </div>
    );
  }

  const orderData = orderResponse?.data;
  if (!orderData) return <div className="text-center p-10 font-medium text-gray-400">Order record not found.</div>;

  const { user, billingInfo, shipping } = orderData;

  const getStatusStyles = (status: string) => {
    switch (status?.toLowerCase()) {
      case "paid":
      case "completed":
        return "bg-emerald-50 text-emerald-600 border-emerald-100";
      case "pending":
        return "bg-amber-50 text-amber-600 border-amber-100";
      default:
        return "bg-gray-50 text-gray-600 border-gray-100";
    }
  };

  return (
    <div className="space-y-8">
      {/* Navigation & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="w-fit p-0 hover:bg-transparent text-gray-500 hover:text-primary transition-colors font-medium group"
        >
          <ChevronLeft className="w-5 h-5 mr-1 group-hover:-translate-x-1 transition-transform" />
          Back to Audit Listing
        </Button>

      </div>

      {/* Header Info */}
      <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <p className="text-[11px] text-primary font-medium uppercase tracking-[0.2em]">Transaction Registry</p>
          <h1 className="text-3xl font-medium text-gray-900 flex items-center gap-4">
            {billingInfo?.orderId || "Audit No Entry"}
            <Badge className={cn("px-4 py-1.5 rounded-full border shadow-none text-[12px] uppercase tracking-wider font-medium", getStatusStyles(billingInfo?.paymentStatus))}>
              {billingInfo?.paymentStatus}
            </Badge>
          </h1>
          <div className="flex items-center gap-6 text-gray-400 font-medium">
            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {new Date(billingInfo?.createdAt).toLocaleString()}</span>
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4" /> Verified Transaction</span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-400 font-medium uppercase mb-1">Total Settlement</p>
          <p className="text-4xl font-medium text-gray-900">€{billingInfo?.amount.toLocaleString()}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Customer Information */}
        <Card className="border border-gray-100 shadow-sm rounded-xl overflow-hidden p-0">
          <CardHeader className="bg-[#F8F9FC] border-b border-gray-100 p-6">
            <CardTitle className="text-[13px] font-medium text-gray-400 uppercase tracking-widest flex items-center gap-2">
              <User className="w-4 h-4 text-primary" /> Customer Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-primary font-medium text-xl">
                {user?.userName.charAt(0)}
              </div>
              <div>
                <p className="text-lg font-medium text-gray-900">{user?.userName}</p>
                <p className="text-sm font-medium text-gray-400 truncate max-w-[180px]">{user?.email}</p>
              </div>
            </div>
            <div className="pt-6 border-t border-gray-50 space-y-4">
              <div className="flex items-start gap-4">
                <Mail className="w-5 h-5 text-gray-300 mt-0.5" />
                <div>
                  <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wider">Audit Email</p>
                  <p className="font-medium text-gray-700 text-sm">{user?.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-gray-300 mt-0.5" />
                <div>
                  <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wider">Base Location</p>
                  <p className="font-medium text-gray-700 text-sm">{user?.location || "Not Registered"}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Billing Information */}
        <Card className="border border-gray-100 shadow-sm rounded-2xl overflow-hidden p-0">
          <CardHeader className="bg-[#F8F9FC] border-b border-gray-100 p-6">
            <CardTitle className="text-[13px] font-medium text-gray-400 uppercase tracking-widest flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-primary" /> Financial Clearings
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-50">
                <span className="text-sm text-gray-400 font-medium">Gateway</span>
                <span className="font-medium text-gray-900 uppercase">{billingInfo?.paymentMethod}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-50">
                <span className="text-sm text-gray-400 font-medium">Currency</span>
                <span className="font-medium text-gray-900 uppercase">{billingInfo?.currency}</span>
              </div>
              <div className="flex flex-col gap-2 py-3">
                <span className="text-[11px] text-gray-400 font-medium uppercase tracking-wider">Transaction Identification</span>
                <code className="bg-gray-50 p-3 rounded-xl border border-gray-100 text-xs text-primary font-medium break-all">
                  {billingInfo?.transactionId}
                </code>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Logistics Information */}
        <Card className="border border-gray-100 shadow-sm rounded-2xl overflow-hidden p-0">
          <CardHeader className="bg-[#F8F9FC] border-b border-gray-100 p-6">
            <CardTitle className="text-[13px] font-medium text-gray-400 uppercase tracking-widest flex items-center gap-2">
              <Truck className="w-4 h-4 text-primary" /> Logistics Workflow
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            <div className="bg-primary/[0.03] p-5 rounded-2xl border border-primary/10">
              <p className="text-[11px] text-primary font-medium uppercase tracking-wider mb-2">Zone Allocation</p>
              <p className="text-xl font-medium text-gray-900">{shipping?.shippingId?.name || "Global Delivery"}</p>
              <p className="text-sm text-gray-500 font-medium mt-1">{shipping?.shippingId?.description}</p>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-50">
                <span className="text-sm text-gray-400 font-medium">Logistics Class</span>
                <span className="font-medium text-gray-900 uppercase tracking-wider text-xs bg-gray-100 px-3 py-1 rounded-full">{shipping?.type}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-50">
                <span className="text-sm text-gray-400 font-medium">Surcharge Settlement</span>
                <span className="font-medium text-gray-900">€{shipping?.cost.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Audit Footnote */}
      <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100 flex items-start gap-4">
        <Package className="w-6 h-6 text-primary shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="text-sm font-medium text-gray-900">Audit Footnote</h4>
          <p className="text-sm text-gray-600 font-medium">This transaction is logged in the administrative audit registry. All logistics surcharges were calculated based on the regional zone pricing at the time of settlement.</p>
        </div>
      </div>
    </div>
  );
}
