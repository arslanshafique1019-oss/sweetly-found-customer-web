import React, { createContext, useContext, useMemo, useState, useCallback } from "react";

const CartContext = createContext(null);

const DELIVERY_FEE = 4.99;
const TAX_RATE = 0.07;

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message) => {
    setToast(message);
    window.clearTimeout(showToast._t);
    showToast._t = window.setTimeout(() => setToast(null), 2200);
  }, []);

  const addItem = useCallback(
    (product, qty = 1) => {
      setItems((prev) => {
        const existing = prev.find((i) => i.id === product.id);
        if (existing) {
          return prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + qty } : i));
        }
        return [...prev, { ...product, qty }];
      });
      showToast(`Added ${product.name} to your basket`);
    },
    [showToast]
  );

  const removeItem = useCallback((id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const updateQty = useCallback((id, qty) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty: Math.max(1, qty) } : i)).filter((i) => i.qty > 0)
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const { itemCount, subtotal } = useMemo(() => {
    return items.reduce(
      (acc, i) => ({
        itemCount: acc.itemCount + i.qty,
        subtotal: acc.subtotal + i.price * i.qty,
      }),
      { itemCount: 0, subtotal: 0 }
    );
  }, [items]);

  const deliveryFee = items.length === 0 ? 0 : DELIVERY_FEE;
  const tax = subtotal * TAX_RATE;
  const total = subtotal + deliveryFee + tax;

  const value = {
    items,
    addItem,
    removeItem,
    updateQty,
    clearCart,
    itemCount,
    subtotal,
    deliveryFee,
    tax,
    total,
    toast,
    notify: showToast,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
