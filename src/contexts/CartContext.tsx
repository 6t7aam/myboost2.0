import { createContext, useContext, useState, ReactNode } from "react";

export type SpeedOption = "normal" | "express" | "super-express";

export interface AppliedPromo {
  code: string;
  discount_percent: number;
}

export interface CartItem {
  id: string;
  game: string;
  gameSlug: string;
  service: string;
  options: Record<string, string>;
  currency?: string;
  boostMethod?: string;
  additionalFeatures?: Record<string, boolean>;
  modifiers?: Record<string, number>;
  speed: SpeedOption;
  basePrice: number;
  price: number;
  oldPrice?: number;
  estimatedTime: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  totalPrice: number;
  totalOldPrice: number;
  itemCount: number;
  appliedPromo: AppliedPromo | null;
  setAppliedPromo: (promo: AppliedPromo | null) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [appliedPromo, setAppliedPromo] = useState<AppliedPromo | null>(null);

  const addItem = (item: CartItem) => {
    setItems((prev) => [...prev, { ...item, id: crypto.randomUUID(), currency: item.currency ?? "USD" }]);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const clearCart = () => {
    setItems([]);
    setAppliedPromo(null);
  };

  const totalPrice = items.reduce((sum, i) => sum + i.price, 0);
  const totalOldPrice = items.reduce(
    (sum, i) => sum + (i.oldPrice && i.oldPrice > i.price ? i.oldPrice : i.price),
    0,
  );
  const itemCount = items.length;

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clearCart, totalPrice, totalOldPrice, itemCount, appliedPromo, setAppliedPromo }}>
      {children}
    </CartContext.Provider>
  );
};
