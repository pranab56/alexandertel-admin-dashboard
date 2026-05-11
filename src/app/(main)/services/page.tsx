"use client";

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
import { Textarea } from "@/components/ui/textarea";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Plus, Search, Trash2, Wrench, AlertCircle } from "lucide-react";
import { useState } from "react";
import { useGetAllServicesQuery, useCreateServicesMutation, useDeleteServicesMutation } from "@/features/services/servicesApi";
import toast from "react-hot-toast";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";

interface Service {
    _id: string;
    name: string;
    description?: string;
    price: number;
}

export default function ServicesPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
    });

    const { data: servicesResponse, isLoading } = useGetAllServicesQuery({});
    const [createService, { isLoading: isCreating }] = useCreateServicesMutation();
    const [deleteService, { isLoading: isDeleting }] = useDeleteServicesMutation();

    const services = servicesResponse?.data || [];

    const handleCreate = async () => {
        if (!formData.name || !formData.price) {
            toast.error("Please fill in all required fields");
            return;
        }

        try {
            await createService({
                name: formData.name,
                description: formData.description,
                price: Number(formData.price),
            }).unwrap();

            toast.success("Service created successfully");
            setIsCreateModalOpen(false);
            setFormData({ name: "", description: "", price: "" });
        } catch (error: unknown) {
            const err = error as { data?: { message?: string } };
            toast.error(err.data?.message || "Failed to create service");
        }
    };

    const handleDelete = async () => {
        if (!selectedServiceId) return;

        try {
            await deleteService({ id: selectedServiceId }).unwrap();
            toast.success("Service deleted successfully");
            setIsDeleteModalOpen(false);
            setSelectedServiceId(null);
        } catch (error: unknown) {
            const err = error as { data?: { message?: string } };
            toast.error(err.data?.message || "Failed to delete service");
        }
    };

    const filteredServices = services.filter((service: Service) =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8 pb-10">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-medium text-gray-900 flex items-center gap-2">
                        Services Management <span className="text-primary"><Wrench className="w-6 h-6" /></span>
                    </h1>
                    <p className="text-gray-500 font-medium mt-1">Configure and manage your available repair and support services.</p>
                </div>

                <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-primary hover:bg-primary/95 text-white rounded-lg px-6 py-4 h-auto font-medium shadow-md transition-all active:scale-95 gap-2">
                            <Plus className="w-5 h-5" /> Add New Service
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px] p-0 rounded-xl border-none shadow-2xl overflow-hidden">
                        <DialogHeader className="p-4 pb-4 bg-[#F8F9FC] border-b border-gray-100">
                            <DialogTitle className="text-2xl font-medium text-gray-900">Create Service</DialogTitle>
                            <DialogDescription className="font-medium text-gray-500 pt-1">
                                Define a new service for your customers.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="p-4 space-y-6">
                            <div className="space-y-3">
                                <Label htmlFor="name" className="text-sm font-medium text-gray-700 uppercase tracking-wider">Service Name <span className="text-red-500">*</span></Label>
                                <Input
                                    id="name"
                                    placeholder="e.g., Screen Replacement"
                                    className="bg-gray-50 border-none h-14 rounded-xl font-medium px-4 focus-visible:ring-1 focus-visible:ring-primary/20"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div className="space-y-3">
                                <Label htmlFor="price" className="text-sm font-medium text-gray-700 uppercase tracking-wider">Base Price (€) <span className="text-red-500">*</span></Label>
                                <Input
                                    id="price"
                                    type="number"
                                    placeholder="e.g., 50"
                                    className="bg-gray-50 border-none h-14 rounded-xl font-medium px-4 focus-visible:ring-1 focus-visible:ring-primary/20"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                />
                            </div>
                            <div className="space-y-3">
                                <Label htmlFor="description" className="text-sm font-medium text-gray-700 uppercase tracking-wider">Description</Label>
                                <Textarea
                                    id="description"
                                    placeholder="Describe what this service covers..."
                                    className="bg-gray-50 border-none rounded-xl font-medium p-4 min-h-[120px] focus-visible:ring-1 focus-visible:ring-primary/20 resize-none"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>
                        </div>
                        <DialogFooter className="p-8 pt-0 sm:justify-center gap-3">
                            <Button
                                onClick={handleCreate}
                                disabled={isCreating}
                                className="w-full sm:w-auto px-10 h-12 rounded-xl bg-primary hover:bg-primary/95 text-white font-medium transition-all active:scale-95"
                            >
                                {isCreating ? "Creating..." : "Save Service"}
                            </Button>
                            <DialogClose asChild>
                                <Button variant="ghost" className="w-full sm:w-auto h-14 rounded-xl font-medium text-gray-500 hover:bg-gray-100">
                                    Cancel
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Filter and Content Area */}
            <Card className="border border-gray-100 shadow-sm rounded-xl overflow-hidden bg-white p-0">
                <CardHeader className="p-3 border-b border-gray-50 bg-[#F8F9FC]">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <h2 className="text-lg font-medium text-gray-900">Active Services List</h2>
                        <div className="relative w-full md:w-[320px]">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <Input
                                placeholder="Search services..."
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
                                <TableHead className="py-6 px-8 text-gray-900 font-medium text-[15px]">Service Name</TableHead>
                                <TableHead className="py-6 text-gray-900 font-medium text-[15px]">Description</TableHead>
                                <TableHead className="py-6 text-gray-900 font-medium text-[15px]">Price</TableHead>

                                <TableHead className="py-6 px-8 text-right text-gray-900 font-medium text-[15px]">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                Array.from({ length: 3 }).map((_, i) => (
                                    <TableRow key={i} className="hover:bg-transparent border-gray-50">
                                        <TableCell className="py-6 px-8">
                                            <div className="flex flex-col gap-2">
                                                <div className="h-5 w-24 bg-gray-100 rounded-lg animate-pulse" />
                                            </div>
                                        </TableCell>
                                        <TableCell className="py-6">
                                            <div className="h-5 w-32 bg-gray-100 rounded-lg animate-pulse" />
                                        </TableCell>
                                        <TableCell className="py-6">
                                            <div className="flex flex-col gap-2">
                                                <div className="h-6 w-20 bg-gray-100 rounded-lg animate-pulse" />
                                            </div>
                                        </TableCell>

                                        <TableCell className="py-6 px-8 text-right">
                                            <div className="flex justify-end">
                                                <div className="h-10 w-10 bg-gray-100 rounded-xl animate-pulse" />
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : filteredServices.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-64 text-center">
                                        <div className="flex flex-col items-center justify-center text-gray-400 font-medium">
                                            <Wrench className="w-12 h-12 mb-4 opacity-20" />
                                            <p>No services found matching your criteria.</p>
                                            <Button variant="link" onClick={() => setSearchTerm("")} className="text-primary font-medium mt-2">Clear Search</Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : filteredServices.reverse().map((service: Service) => (
                                <TableRow key={service._id} className="hover:bg-gray-50/50 border-gray-50 group transition-colors">
                                    <TableCell className="py-6 px-8">
                                        <span className="font-medium text-gray-900">{service.name}</span>
                                    </TableCell>
                                    <TableCell className="py-6">
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <p className="text-gray-500 font-medium text-sm cursor-help">
                                                        {service.description && service.description.length > 25
                                                            ? `${service.description.substring(0, 25)}...`
                                                            : service.description || "No description provided."}
                                                    </p>
                                                </TooltipTrigger>
                                                <TooltipContent className="bg-slate-900 text-white p-3 rounded-lg max-w-xs">
                                                    <p>{service.description || "No description provided."}</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </TableCell>
                                    <TableCell className="py-6">
                                        <span className="font-medium text-gray-900 text-lg">€{service.price}</span>
                                    </TableCell>
                                    <TableCell className="py-6 px-8 text-right">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => {
                                                setSelectedServiceId(service._id);
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

            {/* Delete Confirmation Modal */}
            <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
                <DialogContent className="sm:max-w-[400px] p-0 rounded-xl border-none shadow-2xl overflow-hidden">
                    <div className="p-8 text-center">
                        <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <AlertCircle className="w-10 h-10 text-rose-500" />
                        </div>
                        <h3 className="text-2xl font-medium text-gray-900 mb-2">Delete Service?</h3>
                        <p className="text-gray-500 font-medium">This action cannot be undone. This service will be removed from your public listings.</p>
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
                            className="flex-1 h-16 bg-primary rounded-none font-medium text-white hover:text-white hover:bg-red-500 transition-colors"
                        >
                            {isDeleting ? "Deleting..." : "Confirm Delete"}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}