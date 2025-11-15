import { create } from "zustand";
import type { Product } from "@/types/product";

interface ProductState {
  products: Product[];
  page: number;
  limit: number;
  total: number;
  loading: boolean;
  error: string | null;
  minPrice: number;
  maxPrice: number;

  search: string;
  category: string;

  fetchProducts: () => Promise<void>;
  fetchProductById: (id: number) => Promise<Product | undefined>;
  setPage: (page: number) => void;
  setSearch: (search: string) => void;
  setCategory: (category: string) => void;
  setPriceRange: (min: number, max: number) => void;

  getProductById: (id: number) => Product | undefined;
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  page: 1,
  limit: 4,
  total: 0,
  loading: false,
  error: null,
  search: "",
  category: "",
  minPrice: 0,
  maxPrice: 999999,

  fetchProducts: async () => {
    const { page, limit, search, category } = get();
    const { minPrice, maxPrice } = get();
    set({ loading: true, error: null });

    try {
      const res = await fetch("https://fakestoreapi.com/products");
      const data: Product[] = await res.json();

      let filtered = data;

      if (search.trim() !== "") {
        filtered = filtered.filter((p) =>
          p.title.toLowerCase().includes(search.toLowerCase())
        );
      }

      if (category.trim() !== "") {
        filtered = filtered.filter((p) =>
          p.category.toLowerCase().includes(category.toLowerCase())
        );
      }

      filtered = filtered.filter(
        (p) => p.price >= minPrice && p.price <= maxPrice
      );

      const total = filtered.length;

      const start = (page - 1) * limit;
      const end = start + limit;
      const paginated = filtered.slice(start, end);

      set({
        products: paginated,
        total,
        loading: false,
      });
    } catch (error) {
      set({
        loading: false,
        error: "Error fetching products!",
      });
    }
  },

  fetchProductById: async (id: number) => {
    set({ loading: true, error: null });

    try {
      const res = await fetch(`https://fakestoreapi.com/products/${id}`);
      if (!res.ok) throw new Error("Product not found");

      const product: Product = await res.json();

      set({ loading: false });
      return product;
    } catch (error) {
      set({
        loading: false,
        error: "There was an error fetching this product.",
      });
      return undefined;
    }
  },

  setPage: (page) => set({ page }),
  setSearch: (search) => set({ search, page: 1 }),
  setCategory: (category) => set({ category, page: 1 }),
  setPriceRange: (min: number, max: number) =>
    set({ minPrice: min, maxPrice: max }),

  getProductById: (id) => {
    return get().products.find((p) => p.id === id);
  },
}));
