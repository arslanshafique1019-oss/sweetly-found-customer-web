import React from "react";
import { CheckCircle2 } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function CartToast() {
  const { toast } = useCart();

  return (
    <div
      className={`fixed left-1/2 -translate-x-1/2 bottom-4 sm:bottom-6 z-50 transition-all duration-300 w-[calc(100vw-2rem)] max-w-sm px-2 ${
        toast ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"
      }`}
      role="status"
      aria-live="polite"
    >
      <div className="flex items-center gap-2.5 bg-maroon-900 text-white text-xs sm:text-sm font-medium px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl sm:rounded-full shadow-cardHover">
        <CheckCircle2 className="w-4 h-4 text-blush-200 shrink-0" />
        {toast}
      </div>
    </div>
  );
}
