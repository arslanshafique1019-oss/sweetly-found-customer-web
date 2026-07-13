import React from "react";

export default function OrderSummary({
  subtotal,
  deliveryFee,
  tax,
  total,
  itemCount,
  children,
  cta,
  note,
}) {
  return (
    <aside className="bg-white rounded-xl2 shadow-card p-5 sm:p-6 h-fit lg:sticky lg:top-24">
      <h3 className="font-display font-semibold text-base sm:text-lg mb-4 sm:mb-5">Order Summary</h3>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between text-maroon-900/70">
          <span>Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"})</span>
          <span className="font-medium text-maroon-900">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-maroon-900/70">
          <span>Delivery fee</span>
          <span className="font-medium text-maroon-900">
            {deliveryFee === 0 ? "\u2014" : `$${deliveryFee.toFixed(2)}`}
          </span>
        </div>
        <div className="flex justify-between text-maroon-900/70">
          <span>Estimated tax</span>
          <span className="font-medium text-maroon-900">${tax.toFixed(2)}</span>
        </div>
      </div>

      {children}

      <div className="flex justify-between items-center border-t border-maroon-100 mt-5 pt-5">
        <span className="font-display font-semibold">Total</span>
        <span className="font-display font-semibold text-xl text-maroon-700">${total.toFixed(2)}</span>
      </div>

      {cta}

      {note && <p className="text-xs text-maroon-900/45 text-center mt-3 leading-relaxed">{note}</p>}
    </aside>
  );
}
