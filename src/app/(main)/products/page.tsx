"use client";

import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { AlertCircle } from "lucide-react";
import {
  useGetAllProductQuery,
  useGetSingleProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation
} from "@/features/product/productApi";
import toast from "react-hot-toast";
import { baseURL } from "@/utils/BaseURL";
import ProductModal from "@/components/product/ProductModal";
import ProductTable from "@/components/product/ProductTable";
import ProductFilter from "@/components/product/ProductFilter";
import { Product, ProductOption } from "@/components/product/types";

const imageUrl = (path: string) => {
  if (!path) return "/placeholder-image.jpg";
  if (path.startsWith("http")) return path;
  return `${baseURL}${path}`;
};

export default function Products() {
  const [page, setPage] = useState(1);
  const { data: productsResponse, isLoading } = useGetAllProductQuery({ page, limit: 10 });
  const [editingId, setEditingId] = useState<string | null>(null);
  const { data: singleProductResponse } = useGetSingleProductQuery(editingId, { skip: !editingId });
  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState<string | null>(null);
  const [isDeletingProduct, setIsDeletingProduct] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    deviceType: "new",
    battery: "",
    basePrice: "",
    display: "",
    cheap: "",
    camera: "",
    catagory: "",
    stock: "",
  });

  const [storage, setStorage] = useState<ProductOption[]>([{ type: "", price: "" }]);
  const [ram, setRam] = useState<ProductOption[]>([{ type: "", price: "" }]);
  const [colors, setColors] = useState<ProductOption[]>([{ type: "", price: "" }]);

  useEffect(() => {
    if (editingId && singleProductResponse?.data) {
      const product = singleProductResponse.data;
      setFormData({
        name: product.name || "",
        description: product.description || "",
        deviceType: product.deviceType || "new",
        battery: product.battery || "",
        basePrice: product.basePrice?.toString() || "",
        display: product.display || "",
        cheap: product.cheap || "",
        camera: product.camera || "",
        catagory: product.catagory?._id || product.category?._id || "",
        stock: product.stock?.toString() || "",
      });
      setStorage(product.storage?.length ? product.storage : [{ type: "", price: "" }]);
      setRam(product.ram?.length ? product.ram : [{ type: "", price: "" }]);
      setColors(product.colors?.length ? product.colors : [{ type: "", price: "" }]);
      setImagePreview(product.images?.[0] ? imageUrl(product.images[0]) : (product.image ? imageUrl(product.image) : null));
    }
  }, [singleProductResponse, editingId]);

  const products = productsResponse?.data || [];
  const meta = productsResponse?.meta || { total: 0, limit: 10, page: 1, totalPage: 1 };

  const handleOpenModal = (product?: Product) => {
    if (product) {
      setEditingId(product._id);
      setFormData((prev) => ({
        ...prev,
        name: product.name || "",
        catagory: (typeof product.catagory === 'object' ? product.catagory?._id : product.catagory) || product.category?._id || "",
      }));
    } else {
      setEditingId(null);
      setFormData({
        name: "",
        description: "",
        deviceType: "new",
        battery: "",
        basePrice: "",
        display: "",
        cheap: "",
        camera: "",
        catagory: "",
        stock: "",
      });
      setStorage([{ type: "", price: "" }]);
      setRam([{ type: "", price: "" }]);
      setColors([{ type: "", price: "" }]);
      setImagePreview(null);
    }
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    const finalData = {
      ...formData,
      basePrice: Number(formData.basePrice) || 0,
      stock: Number(formData.stock) || 0,
      storage: storage.filter(s => s.type).map(s => ({ ...s, price: Number(s.price) || 0 })),
      ram: ram.filter(r => r.type).map(r => ({ ...r, price: Number(r.price) || 0 })),
      colors: colors.filter(c => c.type).map(c => ({ ...c, price: Number(c.price) || 0 })),
    };

    const submitFormData = new FormData();
    submitFormData.append("data", JSON.stringify(finalData));
    if (imageFile) {
      submitFormData.append("images", imageFile);
    }

    try {
      if (editingId) {
        await updateProduct({ id: editingId, formData: submitFormData }).unwrap();
        toast.success("Product updated successfully");
      } else {
        await createProduct(submitFormData).unwrap();
        toast.success("Product created successfully");
      }
      setIsModalOpen(false);
    } catch (error: unknown) {
      const err = error as { data?: { message?: string } };
      toast.error(err.data?.message || "Something went wrong");
    }
  };

  const handleDelete = async () => {
    if (!productIdToDelete) return;

    setIsDeletingProduct(true);
    try {
      await deleteProduct(productIdToDelete).unwrap();
      toast.success("Product deleted successfully");
      setIsDeleteModalOpen(false);
      setProductIdToDelete(null);
    } catch (error: unknown) {
      const err = error as { data?: { message?: string } };
      toast.error(err.data?.message || "Failed to delete product");
    } finally {
      setIsDeletingProduct(false);
    }
  };

  const filteredProducts = products.filter((p: Product) =>
    p.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-medium text-gray-900">Product Management</h1>
          <p className="text-gray-500 max-w-sm">Manage your telecommunications product catalog, stock levels, and pricing.</p>
        </div>

        <Button
          onClick={() => handleOpenModal()}
          className="bg-primary hover:bg-primary/90 text-white rounded-sm px-6 py-4 h-auto font-medium shadow-sm transition-all active:scale-95"
        >
          Add New Product
        </Button>
      </div>

      <ProductFilter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <ProductTable
        products={filteredProducts}
        isLoading={isLoading}
        onEdit={handleOpenModal}
        onDelete={(id) => {
          setProductIdToDelete(id);
          setIsDeleteModalOpen(true);
        }}
        meta={meta}
        onPageChange={setPage}
      />

      <ProductModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        editingId={editingId}
        formData={formData}
        setFormData={setFormData}
        storage={storage}
        setStorage={setStorage}
        ram={ram}
        setRam={setRam}
        colors={colors}
        setColors={setColors}
        imagePreview={imagePreview}
        onImageChange={handleImageChange}
        onSubmit={handleSubmit}
        isSaving={isCreating || isUpdating}
      />

      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className="sm:max-w-[400px] p-0 rounded-xl border-none shadow-2xl overflow-hidden">
          <div className="p-8 text-center bg-white">
            <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-10 h-10 text-rose-500" />
            </div>
            <h3 className="text-2xl font-medium text-gray-900 mb-2">Remove Product?</h3>
            <p className="text-gray-500 font-medium">This will permanently delete the product from your catalog and all associated stock information.</p>
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
              disabled={isDeletingProduct}
              className="flex-1 h-16 bg-primary rounded-none font-medium text-white hover:text-white hover:bg-red-500 transition-colors"
            >
              {isDeletingProduct ? "Deleting..." : "Confirm Delete"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}