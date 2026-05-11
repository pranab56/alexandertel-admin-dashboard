"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Plus, Search, Trash2, Truck, AlertCircle, Info } from "lucide-react";
import { useState } from "react";
import { useGetAllShippingQuery, useCreateShippingMutation, useDeleteShippingMutation } from "@/features/shipping/shippingApi";
import toast from "react-hot-toast";

interface ShippingMethod {
  _id: string;
  name: string;
  description?: string;
  baseCost: number;
  type: string;
  perKmCost: number;
  minOrderAmount: number;
  isActive: boolean;
}

export default function ShippingPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedShippingId, setSelectedShippingId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "paid",
    baseCost: "",
    perKmCost: "",
    minOrderAmount: "",
    isActive: true,
  });

  const { data: shippingResponse, isLoading } = useGetAllShippingQuery({});
  const [createShipping, { isLoading: isCreating }] = useCreateShippingMutation();
  const [deleteShipping, { isLoading: isDeleting }] = useDeleteShippingMutation();

  const shippingMethods = shippingResponse?.data || [];

  const handleCreate = async () => {
    if (!formData.name) {
      toast.error("Shipping zone name is required");
      return;
    }

    try {
      await createShipping({
        ...formData,
        baseCost: Number(formData.baseCost) || 0,
        perKmCost: Number(formData.perKmCost) || 0,
        minOrderAmount: Number(formData.minOrderAmount) || 0,
      }).unwrap();

      toast.success("Shipping zone created successfully");
      setIsCreateModalOpen(false);
      setFormData({
        name: "",
        description: "",
        type: "paid",
        baseCost: "",
        perKmCost: "",
        minOrderAmount: "",
        isActive: true,
      });
    } catch (error: unknown) {
      const err = error as { data?: { message?: string } };
      toast.error(err.data?.message || "Failed to create shipping zone");
    }
  };

  const handleDelete = async () => {
    if (!selectedShippingId) return;

    try {
      await deleteShipping({ id: selectedShippingId }).unwrap();
      toast.success("Shipping zone deleted successfully");
      setIsDeleteModalOpen(false);
      setSelectedShippingId(null);
    } catch (error: unknown) {
      const err = error as { data?: { message?: string } };
      toast.error(err.data?.message || "Failed to delete shipping zone");
    }
  };

  const filteredMethods = shippingMethods.filter((method: ShippingMethod) =>
    method.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-medium text-gray-900 flex items-center gap-2">
            Shipping & Logistics <Truck className="w-6 h-6 text-primary" />
          </h1>
          <p className="text-gray-500 font-medium mt-1">Manage delivery zones, rates, and coverage area specifications.</p>
        </div>

        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/95 text-white rounded-lg px-6 py-6 h-auto font-medium shadow-md transition-all active:scale-95 gap-2">
              <Plus className="w-5 h-5" /> Define Shipping Zone
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px] p-0 rounded-xl border-none shadow-2xl overflow-hidden">
            <DialogHeader className="p-8 pb-4 bg-[#F8F9FC] border-b border-gray-100">
              <DialogTitle className="text-2xl font-medium text-gray-900">New Shipping Configuration</DialogTitle>
              <DialogDescription className="font-medium text-gray-500 pt-1">
                Set up regional delivery costs and minimum order requirements.
              </DialogDescription>
            </DialogHeader>
            <div className="p-8 space-y-6 max-h-[60vh] overflow-y-auto CustomScrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3 md:col-span-2">
                  <Label className="text-sm font-medium text-gray-700 uppercase tracking-wider">Zone Name <span className="text-red-500">*</span></Label>
                  <Input
                    placeholder="e.g., Inside Dhaka"
                    className="bg-gray-50 border-none h-14 rounded-xl font-medium px-4 focus-visible:ring-1 focus-visible:ring-primary/20"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="space-y-3 md:col-span-2">
                  <Label className="text-sm font-medium text-gray-700 uppercase tracking-wider">Description</Label>
                  <Input
                    placeholder="Brief details about the zone..."
                    className="bg-gray-50 border-none h-14 rounded-xl font-medium px-4 focus-visible:ring-1 focus-visible:ring-primary/20"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-medium text-gray-700 uppercase tracking-wider">Pricing Type</Label>
                  <Select value={formData.type} onValueChange={(val) => setFormData({ ...formData, type: val })}>
                    <SelectTrigger className="bg-gray-50 border-none h-14 rounded-xl font-medium px-4 focus:ring-1 focus:ring-primary/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-gray-100 font-medium">
                      <SelectItem value="paid">Paid Delivery</SelectItem>
                      <SelectItem value="free">Free Delivery</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-medium text-gray-700 uppercase tracking-wider">Base Cost (€)</Label>
                  <Input
                    type="number"
                    placeholder="0"
                    className="bg-gray-50 border-none h-14 rounded-xl font-medium px-4 focus-visible:ring-1 focus-visible:ring-primary/20"
                    value={formData.baseCost}
                    onChange={(e) => setFormData({ ...formData, baseCost: e.target.value })}
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-medium text-gray-700 uppercase tracking-wider">Per KM Cost (€)</Label>
                  <Input
                    type="number"
                    placeholder="0"
                    className="bg-gray-50 border-none h-14 rounded-xl font-medium px-4 focus-visible:ring-1 focus-visible:ring-primary/20"
                    value={formData.perKmCost}
                    onChange={(e) => setFormData({ ...formData, perKmCost: e.target.value })}
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-medium text-gray-700 uppercase tracking-wider">Min. Order for Free (€)</Label>
                  <Input
                    type="number"
                    placeholder="0"
                    className="bg-gray-50 border-none h-14 rounded-xl font-medium px-4 focus-visible:ring-1 focus-visible:ring-primary/20"
                    value={formData.minOrderAmount}
                    onChange={(e) => setFormData({ ...formData, minOrderAmount: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <DialogFooter className="p-8 pt-0 sm:justify-start gap-3">
              <Button
                onClick={handleCreate}
                disabled={isCreating}
                className="w-full sm:w-auto px-10 h-14 rounded-xl bg-primary hover:bg-primary/95 text-white font-medium shadow-lg transition-all active:scale-95"
              >
                {isCreating ? "Saving Zone..." : "Save Configuration"}
              </Button>
              <DialogClose asChild>
                <Button variant="ghost" className="w-full sm:w-auto h-14 rounded-xl font-medium text-gray-400 hover:bg-gray-100">
                  Cancel
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Main Content Table */}
      <Card className="border border-gray-100 shadow-sm rounded-xl overflow-hidden bg-white">
        <CardHeader className="p-6 border-b border-gray-50 bg-[#F8F9FC]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 className="text-lg font-medium text-gray-900">Configured Shipping Zones</h2>
            <div className="relative w-full md:w-[320px]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search shipping zones..."
                className="pl-12 bg-white border-gray-200 h-12 rounded-xl text-gray-600 font-medium focus-visible:ring-1 focus-visible:ring-primary/20"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-gray-50/50">
              <TableRow className="hover:bg-transparent border-gray-50">
                <TableHead className="py-6 px-8 text-gray-900 font-medium text-[15px]">Zone Name</TableHead>
                <TableHead className="py-6 text-gray-900 font-medium text-[15px]">Base Rates</TableHead>
                <TableHead className="py-6 text-gray-900 font-medium text-[15px]">Variables</TableHead>
                <TableHead className="py-6 text-gray-900 font-medium text-[15px]">Free Threshold</TableHead>
                <TableHead className="py-6 text-gray-900 font-medium text-[15px]">Status</TableHead>
                <TableHead className="py-6 px-8 text-right text-gray-900 font-medium text-[15px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <TableRow key={i} className="animate-pulse">
                    <TableCell colSpan={6} className="h-20 bg-gray-50/50" />
                  </TableRow>
                ))
              ) : filteredMethods.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-64 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-400 font-medium">
                      <Truck className="w-12 h-12 mb-4 opacity-20" />
                      <p>No shipping zones found.</p>
                      <Button variant="link" onClick={() => setSearchTerm("")} className="text-primary font-medium mt-2">Clear Search</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ) : filteredMethods.map((method: ShippingMethod) => (
                <TableRow key={method._id} className="hover:bg-gray-50/50 border-gray-50 group transition-colors">
                  <TableCell className="py-6 px-8">
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-900">{method.name}</span>
                      <span className="text-[12px] text-gray-400 font-medium truncate max-w-[200px]">{method.description || "No description"}</span>
                    </div>
                  </TableCell>
                  <TableCell className="py-6">
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-900 text-lg">€{method.baseCost}</span>
                      <span className="text-[11px] text-primary font-medium uppercase tracking-wider">{method.type}</span>
                    </div>
                  </TableCell>
                  <TableCell className="py-6">
                    <span className="font-medium text-gray-700 truncate min-w-[80px] inline-block mt-3">€{method.perKmCost}<span className="text-[11px] text-gray-400 ml-1">/KM</span></span>
                  </TableCell>
                  <TableCell className="py-6">
                    <span className="font-medium text-gray-700 inline-block mt-3">Over €{method.minOrderAmount}</span>
                  </TableCell>
                  <TableCell className="py-6">
                    <Badge className={cn(
                      "rounded-full px-4 py-1.5 font-medium border-none shadow-none text-[12px]",
                      method.isActive ? "bg-[#E6F9F0] text-[#2DC766]" : "bg-gray-100 text-gray-400"
                    )}>
                      {method.isActive ? "Active Zone" : "Disabled"}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-6 px-8 text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setSelectedShippingId(method._id);
                        setIsDeleteModalOpen(true);
                      }}
                      className="text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                    >
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Footer Info */}
      <div className="bg-blue-50/50 p-6 rounded-xl border border-blue-100 flex items-start gap-4">
        <Info className="w-6 h-6 text-primary shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="text-sm font-medium text-gray-900">Logistics Policy Tip</h4>
          <p className="text-sm text-gray-600 font-medium">Zones are processed in order of creation. For free shipping within specific areas, ensure the &quot;Free Threshold&quot; amount is set correctly to encourage larger customer orders.</p>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className="sm:max-w-[400px] p-0 rounded-xl border-none shadow-2xl overflow-hidden">
          <div className="p-8 text-center bg-white">
            <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-10 h-10 text-rose-500" />
            </div>
            <h3 className="text-2xl font-medium text-gray-900 mb-2">Remove Shipping Zone?</h3>
            <p className="text-gray-500 font-medium">This will permanently delete the zone and its associated cost logic from the checkout process.</p>
          </div>
          <div className="flex border-t border-gray-100">
            <Button
              variant="ghost"
              onClick={() => setIsDeleteModalOpen(false)}
              className="flex-1 h-16 rounded-none font-medium text-gray-500 hover:bg-gray-50 border-r border-gray-100"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              disabled={isDeleting}
              className="flex-1 h-16 rounded-none font-medium text-rose-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
            >
              {isDeleting ? "Deleting..." : "Confirm Delete"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}