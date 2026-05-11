"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog";
import { Search, Plus, Edit, Trash2, AlertCircle } from "lucide-react";
import { useState } from "react";
import {
    useGetAllCategoryQuery,
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation
} from "@/features/category/category";
import toast from "react-hot-toast";

interface Category {
    _id: string;
    name: string;
}

export default function CategoriesPage() {
    const { data: categoriesResponse, isLoading } = useGetAllCategoryQuery(undefined);
    const [createCategory, { isLoading: isCreating }] = useCreateCategoryMutation();
    const [updateCategory, { isLoading: isUpdating }] = useUpdateCategoryMutation();
    const [deleteCategory] = useDeleteCategoryMutation();

    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [categoryName, setCategoryName] = useState("");
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [categoryIdToDelete, setCategoryIdToDelete] = useState<string | null>(null);
    const [isDeletingCategory, setIsDeletingCategory] = useState(false);

    const categories: Category[] = categoriesResponse?.data || [];

    const filteredCategories = categories.filter((category) =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleOpenModal = (category?: Category) => {
        if (category) {
            setEditingId(category._id);
            setCategoryName(category.name);
        } else {
            setEditingId(null);
            setCategoryName("");
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async () => {
        if (!categoryName) {
            toast.error("Please enter category name");
            return;
        }

        const formData = new FormData();
        formData.append("name", categoryName);

        try {
            if (editingId) {
                await updateCategory({ id: editingId, data: formData }).unwrap();
                toast.success("Category updated successfully");
            } else {
                await createCategory(formData).unwrap();
                toast.success("Category created successfully");
            }
            setIsModalOpen(false);
            setCategoryName("");
            setEditingId(null);
        } catch (error: unknown) {
            const err = error as { data?: { message?: string } };
            toast.error(err.data?.message || "Failed to save category");
        }
    };

    const handleDelete = async () => {
        if (!categoryIdToDelete) return;

        setIsDeletingCategory(true);
        try {
            await deleteCategory(categoryIdToDelete).unwrap();
            toast.success("Category deleted successfully");
            setIsDeleteModalOpen(false);
            setCategoryIdToDelete(null);
        } catch (error: unknown) {
            const err = error as { data?: { message?: string } };
            toast.error(err.data?.message || "Failed to delete category");
        } finally {
            setIsDeletingCategory(false);
        }
    };

    return (
        <div className="space-y-6 pb-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-medium text-gray-900">Categories</h1>
                    <p className="text-gray-500 mt-1">Manage your product categories and subcategories</p>
                </div>
                <Button
                    onClick={() => handleOpenModal()}
                    className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-sm shadow-sm h-11 font-medium transition-all active:scale-95"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Category
                </Button>
            </div>

            {/* Filters & Search */}
            <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                        type="text"
                        placeholder="Search categories by name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-12 bg-gray-50 border-none h-12 rounded-lg text-gray-600 font-medium focus-visible:ring-1 focus-visible:ring-primary/20"
                    />
                </div>
            </div>

            {/* Categories Table */}
            <Card className="rounded-lg shadow-sm border border-gray-100 overflow-hidden p-0">
                <CardContent className="p-0">
                    <Table>
                        <TableHeader className="bg-[#F8F9FC]">
                            <TableRow className="hover:bg-[#F8F9FC] border-gray-50">
                                <TableHead className="py-5 px-8 text-gray-900 font-medium h-14 text-[15px]">Category Name</TableHead>
                                <TableHead className="py-5 px-8 text-right text-gray-900 font-medium h-14 text-[15px]">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                Array.from({ length: 5 }).map((_, i) => (
                                    <TableRow key={i} className="hover:bg-transparent border-gray-50">
                                        <TableCell className="py-6 px-8">

                                            <div className="h-5 w-24 bg-gray-100 rounded-lg animate-pulse" />


                                        </TableCell>


                                        <TableCell className="py-6 px-8 text-right">
                                            <div className="flex justify-end">
                                                <div className="h-10 w-10 bg-gray-100 rounded-xl animate-pulse" />
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : filteredCategories.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={2} className="h-40 text-center text-gray-500 font-medium">
                                        No categories found. Start by adding one!
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredCategories.slice().reverse().map((category) => (
                                    <TableRow
                                        key={category._id}
                                        className="hover:bg-gray-50/50 border-gray-50 transition-colors"
                                    >
                                        <TableCell className="font-medium py-4 px-8 text-gray-900">{category.name}</TableCell>
                                        <TableCell className="text-right py-4 px-8">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => handleOpenModal(category)}
                                                    className="h-9 w-9 text-gray-400 hover:text-primary hover:bg-primary/5 transition-colors"
                                                    title="Edit"
                                                >
                                                    <Edit className="w-5 h-5" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => {
                                                        setCategoryIdToDelete(category._id);
                                                        setIsDeleteModalOpen(true);
                                                    }}
                                                    className="h-9 w-9 text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Add/Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 backdrop-blur-[2px] transition-all">
                    <Card className="w-full max-w-lg rounded-xl shadow-2xl border-none animate-in fade-in zoom-in-95 duration-200 p-0">
                        <CardHeader className="border-b border-gray-100 p-6">
                            <CardTitle className="text-xl font-medium text-gray-900">
                                {editingId ? "Edit Category" : "Add New Category"}
                            </CardTitle>
                            <CardDescription className="text-gray-500">
                                {editingId ? "Update your product category name" : "Create a new product category for your inventory"}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="category-name" className="text-sm font-medium text-gray-700">
                                        Category Name
                                    </Label>
                                    <Input
                                        id="category-name"
                                        placeholder="e.g. iPhone"
                                        value={categoryName}
                                        onChange={(e) => setCategoryName(e.target.value)}
                                        className="rounded-sm border-none bg-[#F8F9FC] h-12 focus-visible:ring-1 focus-visible:ring-primary/20"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-center gap-3 mt-8">
                                <Button
                                    variant="outline"
                                    onClick={() => setIsModalOpen(false)}
                                    className="rounded-sm px-8 py-5 h-12 text-gray-600 border-none bg-[#F2F2F2] hover:bg-[#E5E5E5] transition-colors"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleSubmit}
                                    disabled={isCreating || isUpdating}
                                    className="bg-primary hover:bg-primary/90 text-white rounded-sm px-8 py-5 h-12 shadow-md transition-all active:scale-95"
                                >
                                    {isCreating || isUpdating ? "Saving..." : (editingId ? "Save Changes" : "Create Category")}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
                <DialogContent className="sm:max-w-[400px] p-0 rounded-xl border-none shadow-2xl overflow-hidden">
                    <div className="p-8 text-center bg-white">
                        <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <AlertCircle className="w-10 h-10 text-rose-500" />
                        </div>
                        <h3 className="text-2xl font-medium text-gray-900 mb-2">Remove Category?</h3>
                        <p className="text-gray-500 font-medium whitespace-pre-line">This will permanently delete the category and all its associations from the system.</p>
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
                            disabled={isDeletingCategory}
                            className="flex-1 h-16 bg-primary rounded-none font-medium text-white hover:text-white hover:bg-red-500 transition-colors"
                        >
                            {isDeletingCategory ? "Deleting..." : "Confirm Delete"}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}