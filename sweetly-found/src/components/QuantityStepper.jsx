import React from "react";
import { Minus, Plus } from "lucide-react";

export default function QuantityStepper({ value, onChange, min = 1, size = "md" }) {
  const dims = size === "sm" ? "w-8 h-8" : "w-10 h-10";
  const iconDims = size === "sm" ? "w-3 h-3" : "w-3.5 h-3.5";

  return (
    <div className="flex items-center border border-maroon-200 rounded-full">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        className={`${dims} flex items-center justify-center hover:text-maroon-700 disabled:opacity-30 disabled:hover:text-maroon-900`}
        aria-label="Decrease quantity"
        disabled={value <= min}
      >
        <Minus className={iconDims} />
      </button>
      <span className="w-8 text-center text-sm font-medium">{value}</span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        className={`${dims} flex items-center justify-center hover:text-maroon-700`}
        aria-label="Increase quantity"
      >
        <Plus className={iconDims} />
      </button>
    </div>
  );
}
