import React from "react";
import { Star } from "lucide-react";

export default function StarRating({ rating, size = "w-3.5 h-3.5", showValue = true, className = "" }) {
  const rounded = Math.round(rating);
  return (
    <span className={`inline-flex items-center gap-1 ${className}`}>
      <span className="inline-flex items-center gap-0.5 text-maroon-700">
        {Array.from({ length: 5 }, (_, i) => (
          <Star key={i} className={size} fill={i < rounded ? "currentColor" : "none"} strokeWidth={1.5} />
        ))}
      </span>
      {showValue && <span className="text-xs text-maroon-900/60">{rating.toFixed(1)}</span>}
    </span>
  );
}
