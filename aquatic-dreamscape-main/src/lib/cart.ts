import { create } from "zustand";


type Product = {
  name: string;
  price: number;
  img: string;
};

type CartItem = Product & {
  quantity: number;
};

type CartState = {
  items: CartItem[];
  addToCart: (product: Product) => void;
  increase: (name: string) => void;
  decrease: (name: string) => void;
};

export const useCart = create<CartState>((set) => ({
  items: [],

  addToCart: (product) =>
    set((state) => {
      const existing = state.items.find((i) => i.name === product.name);

      if (existing) {
        return {
          items: state.items.map((item) =>
            item.name === product.name
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      return {
        items: [...state.items, { ...product, quantity: 1 }],
      };
    }),

  increase: (name) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.name === name
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ),
    })),

  decrease: (name) =>
    set((state) => ({
      items: state.items
        .map((item) =>
          item.name === name
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0),
    })),
}));