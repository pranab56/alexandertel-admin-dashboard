export interface ProductOption {
  type: string;
  price: string | number;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  deviceType: string;
  battery: string;
  basePrice: number;
  display: string;
  dispalyy?: string;
  cheap: string;
  camera: string;
  catagory: { _id: string; name: string } | string;
  category?: { _id: string; name: string };
  stock: number;
  stockStatus?: string;
  storage: ProductOption[];
  ram: ProductOption[];
  colors: ProductOption[];
  image?: string;
  images?: string[];
}

export interface ProductFormData {
  name: string;
  description: string;
  deviceType: string;
  battery: string;
  basePrice: string;
  display: string;
  cheap: string;
  camera: string;
  catagory: string;
  stock: string;
}
