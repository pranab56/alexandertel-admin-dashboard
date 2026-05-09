"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  useGetAllProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation
} from "@/features/product/productApi";
import toast from "react-hot-toast";
import { baseURL } from "@/utils/BaseURL";
import ProductModal from "@/components/product/ProductModal";
import ProductTable from "@/components/product/ProductTable";
import ProductFilter from "@/components/product/ProductFilter";

const imageUrl = (path: string) => {
  if (!path) return "/placeholder-image.jpg";
  if (path.startsWith("http")) return path;
  return `${baseURL}${path}`;
};

export default function Products() {
  const [page, setPage] = useState(1);
  const { data: productsResponse, isLoading } = useGetAllProductQuery({ page, limit: 10 });
  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    deviceType: "new",
    battery: "",
    basePrice: "",
    dispalyy: "",
    cheap: "",
    camera: "",
    catagory: "mobile",
    stock: "",
  });

  const [storage, setStorage] = useState([{ type: "", price: 0 }]);
  const [ram, setRam] = useState([{ type: "", price: 0 }]);
  const [colors, setColors] = useState([{ type: "", price: 0 }]);

  const products = productsResponse?.data || [];
  const meta = productsResponse?.meta || { total: 0, limit: 10, page: 1, totalPage: 1 };

  const handleOpenModal = (product?: any) => {
    if (product) {
      setEditingId(product._id);
      setFormData({
        name: product.name || "",
        description: product.description || "",
        deviceType: product.deviceType || "new",
        battery: product.battery || "",
        basePrice: product.basePrice?.toString() || "",
        dispalyy: product.dispalyy || "",
        cheap: product.cheap || "",
        camera: product.camera || "",
        catagory: product.catagory || "mobile",
        stock: product.stock?.toString() || "",
      });
      setStorage(product.storage?.length ? product.storage : [{ type: "", price: 0 }]);
      setRam(product.ram?.length ? product.ram : [{ type: "", price: 0 }]);
      setColors(product.colors?.length ? product.colors : [{ type: "", price: 0 }]);
      setImagePreview(product.image ? imageUrl(product.image) : null);
    } else {
      setEditingId(null);
      setFormData({
        name: "",
        description: "",
        deviceType: "new",
        battery: "",
        basePrice: "",
        dispalyy: "",
        cheap: "",
        camera: "",
        catagory: "mobile",
        stock: "",
      });
      setStorage([{ type: "", price: 0 }]);
      setRam([{ type: "", price: 0 }]);
      setColors([{ type: "", price: 0 }]);
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
      basePrice: Number(formData.basePrice),
      stock: Number(formData.stock),
      storage: storage.filter(s => s.type),
      ram: ram.filter(r => r.type),
      colors: colors.filter(c => c.type),
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
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id).unwrap();
        toast.success("Product deleted successfully");
      } catch (error: any) {
        toast.error(error?.data?.message || "Failed to delete");
      }
    }
  };

  const filteredProducts = products.filter((p: any) =>
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
        onDelete={handleDelete}
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
    </div>
  );
}