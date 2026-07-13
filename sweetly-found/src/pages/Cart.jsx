import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Trash2, ShoppingBag, Tag } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PhotoPlaceholder from "../components/PhotoPlaceholder";
import QuantityStepper from "../components/QuantityStepper";
import OrderSummary from "../components/OrderSummary";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { items, updateQty, removeItem, itemCount, subtotal, deliveryFee, tax, total } = useCart();
  const [promo, setPromo] = useState("");
  const [promoStatus, setPromoStatus] = useState(null); // null | "valid" | "invalid"
  const navigate = useNavigate();

  const applyPromo = () => {
    const code = promo.trim().toUpperCase();
    if (!code) return;
    setPromoStatus(code === "SWEET10" ? "valid" : "invalid");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="container-page py-6 sm:py-8 md:py-10 flex-1">
        <p className="text-xs text-maroon-900/50 mb-2">
          <Link to="/" className="hover:text-maroon-700">Home</Link>
          <span className="mx-1.5">/</span>
          <span className="text-maroon-700">Your Basket</span>
        </p>
        <h1 className="text-2xl xs:text-3xl md:text-4xl font-semibold mb-6 sm:mb-8">Your Basket</h1>

        {items.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="grid lg:grid-cols-[1fr_340px] gap-6 lg:gap-10 items-start">
            <div className="space-y-3 sm:space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl2 shadow-card p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4"
                >
                  <PhotoPlaceholder
                    tone={item.tone}
                    className="w-16 h-16 xs:w-20 xs:h-20 rounded-lg shrink-0 mb-2 sm:mb-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm truncate">{item.name}</h3>
                    {item.baker && <p className="text-[12px] text-maroon-900/50 mt-0.5 truncate">By {item.baker}</p>}
                    <p className="font-display font-semibold text-maroon-700 text-sm mt-1">
                      ${item.price.toFixed(2)}
                      {item.unit && <span className="text-xs font-sans font-normal text-maroon-900/50"> {item.unit}</span>}
                    </p>
                  </div>
                  <div className="flex items-center sm:flex-col sm:items-end gap-2 xs:gap-3 shrink-0 w-full sm:w-auto">
                    <QuantityStepper value={item.qty} onChange={(q) => updateQty(item.id, q)} size="sm" />
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-[11px] xs:text-xs text-maroon-900/40 hover:text-maroon-700 flex items-center gap-1 transition-colors"
                      aria-label={`Remove ${item.name} from basket`}
                    >
                      <Trash2 className="w-3.5 h-3.5" /> <span className="hidden xs:inline">Remove</span>
                    </button>
                  </div>
                </div>
              ))}

              <Link
                to="/categories"
                className="inline-block text-sm font-medium text-maroon-700 hover:underline pt-2"
              >
                ← Continue Shopping
              </Link>
            </div>

            <OrderSummary
              subtotal={subtotal}
              deliveryFee={deliveryFee}
              tax={tax}
              total={total}
              itemCount={itemCount}
              note="Taxes and delivery fee are estimated and may change at checkout."
              cta={
                <button onClick={() => navigate("/checkout")} className="btn-primary w-full mt-5">
                  Proceed to Checkout
                </button>
              }
            >
              <div className="flex items-center gap-2 mt-4 bg-blush-100 border border-maroon-100 rounded-full px-4 py-2.5">
                <Tag className="w-4 h-4 text-maroon-700/60 shrink-0" />
                <input
                  type="text"
                  value={promo}
                  onChange={(e) => {
                    setPromo(e.target.value);
                    setPromoStatus(null);
                  }}
                  onKeyDown={(e) => e.key === "Enter" && applyPromo()}
                  placeholder="Promo code"
                  className="bg-transparent outline-none text-sm flex-1 placeholder:text-maroon-900/40"
                />
                <button onClick={applyPromo} className="text-xs font-semibold text-maroon-700 hover:underline shrink-0">
                  Apply
                </button>
              </div>
              {promoStatus === "valid" && (
                <p className="text-xs text-green-700 mt-2 px-1">✓ SWEET10 applied — 10% off will be reflected at checkout.</p>
              )}
              {promoStatus === "invalid" && (
                <p className="text-xs text-maroon-700 mt-2 px-1">That code isn't valid. Try "SWEET10".</p>
              )}
            </OrderSummary>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 bg-white rounded-xl2 shadow-card">
      <div className="w-16 h-16 rounded-full bg-blush-200 flex items-center justify-center mb-5">
        <ShoppingBag className="w-7 h-7 text-maroon-700" strokeWidth={1.5} />
      </div>
      <h2 className="text-xl font-semibold font-display">Your basket is empty</h2>
      <p className="text-sm text-maroon-900/60 mt-2 max-w-xs">
        Looks like you haven't added any treats yet. Explore local bakers and find something sweet.
      </p>
      <Link to="/categories" className="btn-primary mt-6">
        Browse Categories
      </Link>
    </div>
  );
}
