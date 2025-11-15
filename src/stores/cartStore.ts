import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "@/types/cart";
import type { Product } from "@/types/product";

interface CartState {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (id: number) => void;
  increase: (id: number) => void;
  decrease: (id: number) => void;
  clear: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (product, quantity = 1) => {
        const existing = get().items.find((i) => i.id === product.id);

        if (existing) {
          return set({
            items: get().items.map((i) =>
              i.id === product.id
                ? { ...i, quantity: i.quantity + quantity }
                : i
            ),
          });
        }
        set({
          items: [...get().items, { ...product, quantity: quantity }],
        });
      },

      removeFromCart: (id) =>
        set({
          items: get().items.filter((i) => i.id !== id),
        }),

      increase: (id) =>
        set({
          items: get().items.map((i) =>
            i.id === id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        }),

      decrease: (id) =>
        set({
          items: get()
            .items.map((i) =>
              i.id === id ? { ...i, quantity: i.quantity - 1 } : i
            )
            .filter((i) => i.quantity > 0),
        }),

      clear: () => set({ items: [] }),
    }),
    { name: "cart-items-storage" }
  )
);
