import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Truck, Store, MapPin, CreditCard, Plus, CheckCircle2 } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PhotoPlaceholder from "../components/PhotoPlaceholder";
import OrderSummary from "../components/OrderSummary";
import AddAddressForm from "../components/AddAddressForm";
import AddCardForm from "../components/AddCardForm";
import { useCart } from "../context/CartContext";
import { useAccount } from "../context/AccountContext";

const timeSlots = ["Today, 4:00 \u2013 5:00 PM", "Today, 6:00 \u2013 7:00 PM", "Tomorrow, 10:00 \u2013 11:00 AM"];

export default function Checkout() {
  const { items, itemCount, subtotal, deliveryFee, tax, total, clearCart } = useCart();
  const { addresses, addAddress, paymentMethods, addPaymentMethod } = useAccount();

  const [method, setMethod] = useState("delivery");
  const [addressId, setAddressId] = useState(() => addresses.find((a) => a.isDefault)?.id ?? addresses[0]?.id);
  const [slot, setSlot] = useState(timeSlots[0]);
  const [paymentId, setPaymentId] = useState(() => paymentMethods.find((p) => p.isDefault)?.id ?? paymentMethods[0]?.id);
  const [placing, setPlacing] = useState(false);
  const [placed, setPlaced] = useState(false);
  const [addingAddress, setAddingAddress] = useState(false);
  const [addingCard, setAddingCard] = useState(false);

  const handleSaveAddress = (form) => {
    const newAddr = addAddress(form);
    setAddressId(newAddr.id);
    setAddingAddress(false);
  };

  const handleSaveCard = (form) => {
    const newPm = addPaymentMethod(form);
    setPaymentId(newPm.id);
    setAddingCard(false);
  };

  if (items.length === 0 && !placed) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container-page py-16 sm:py-24 flex-1 flex flex-col items-center text-center">
          <h1 className="text-2xl font-semibold">Your basket is empty</h1>
          <p className="text-sm text-maroon-900/60 mt-2">Add something sweet before checking out.</p>
          <Link to="/categories" className="btn-primary mt-6">Browse Categories</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handlePlaceOrder = () => {
    setPlacing(true);
    window.setTimeout(() => {
      setPlacing(false);
      setPlaced(true);
      clearCart();
    }, 900);
  };

  if (placed) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container-page py-16 sm:py-24 flex-1 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-blush-200 flex items-center justify-center mb-5">
            <CheckCircle2 className="w-8 h-8 text-maroon-700" strokeWidth={1.5} />
          </div>
          <h1 className="text-xl xs:text-2xl md:text-3xl font-semibold font-display">Order placed!</h1>
          <p className="text-sm text-maroon-900/60 mt-2 max-w-sm">
            Your order confirmation and {method === "delivery" ? "delivery" : "pickup"} details have been sent to your email.
          </p>
          <div className="flex flex-col xs:flex-row items-stretch xs:items-center gap-3 mt-8 w-full max-w-xs xs:max-w-none">
            <Link to="/orders" className="btn-outline-maroon">View Orders</Link>
            <Link to="/" className="btn-primary">Back to Home</Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="container-page py-6 sm:py-8 md:py-10 flex-1">
        <p className="text-xs text-maroon-900/50 mb-2">
          <Link to="/" className="hover:text-maroon-700">Home</Link>
          <span className="mx-1.5">/</span>
          <Link to="/cart" className="hover:text-maroon-700">Basket</Link>
          <span className="mx-1.5">/</span>
          <span className="text-maroon-700">Checkout</span>
        </p>
        <h1 className="text-2xl xs:text-3xl md:text-4xl font-semibold mb-6 sm:mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-[1fr_340px] gap-6 lg:gap-10 items-start">
          <div className="space-y-4 sm:space-y-6">
            {/* Delivery method */}
            <section className="bg-white rounded-xl2 shadow-card p-4 sm:p-6">
              <h2 className="font-display font-semibold mb-4">Delivery Method</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <MethodCard
                  icon={Truck}
                  title="Delivery"
                  desc="Brought to your door"
                  active={method === "delivery"}
                  onClick={() => setMethod("delivery")}
                />
                <MethodCard
                  icon={Store}
                  title="Pickup"
                  desc="Collect from the baker"
                  active={method === "pickup"}
                  onClick={() => setMethod("pickup")}
                />
              </div>
            </section>

            {/* Address */}
            {method === "delivery" && (
              <section className="bg-white rounded-xl2 shadow-card p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-display font-semibold">Delivery Address</h2>
                  {!addingAddress && (
                    <button
                      onClick={() => setAddingAddress(true)}
                      className="text-xs font-semibold text-maroon-700 flex items-center gap-1 hover:underline"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add New
                    </button>
                  )}
                </div>

                {addingAddress && (
                  <div className="mb-4">
                    <AddAddressForm onSave={handleSaveAddress} onCancel={() => setAddingAddress(false)} />
                  </div>
                )}

                <div className="space-y-3">
                  {addresses.length === 0 && (
                    <p className="text-sm text-maroon-900/50">No saved addresses yet — add one above.</p>
                  )}
                  {addresses.map((addr) => (
                    <label
                      key={addr.id}
                      className={`flex items-start gap-2.5 sm:gap-3 p-3 sm:p-4 rounded-xl border cursor-pointer transition-colors ${
                        addressId === addr.id ? "border-maroon-700 bg-blush-100" : "border-maroon-100 hover:border-maroon-200"
                      }`}
                    >
                      <input
                        type="radio"
                        name="address"
                        checked={addressId === addr.id}
                        onChange={() => setAddressId(addr.id)}
                        className="accent-maroon-700 w-4 h-4 mt-0.5"
                      />
                      <MapPin className="w-4 h-4 text-maroon-700 mt-0.5 shrink-0" />
                      <div className="text-sm">
                        <p className="font-medium">
                          {addr.label} {addr.isDefault && <span className="text-[10px] text-maroon-700 bg-blush-200 px-2 py-0.5 rounded-full ml-1">Default</span>}
                        </p>
                        <p className="text-maroon-900/60 mt-0.5">
                          {addr.line1}{addr.line2 ? `, ${addr.line2}` : ""}, {addr.city}, {addr.state} {addr.zip}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              </section>
            )}

            {/* Time slot */}
            <section className="bg-white rounded-xl2 shadow-card p-4 sm:p-6">
              <h2 className="font-display font-semibold mb-4">
                {method === "delivery" ? "Delivery Window" : "Pickup Window"}
              </h2>
              <div className="flex flex-wrap gap-2.5">
                {timeSlots.map((t) => (
                  <button
                    key={t}
                    onClick={() => setSlot(t)}
                    className={`text-[11px] sm:text-xs px-3 sm:px-4 py-2 sm:py-2.5 rounded-full border transition-colors ${
                      slot === t
                        ? "bg-maroon-700 text-white border-maroon-700"
                        : "border-maroon-200 text-maroon-900/70 hover:border-maroon-700"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </section>

            {/* Payment */}
            <section className="bg-white rounded-xl2 shadow-card p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display font-semibold">Payment Method</h2>
                {!addingCard && (
                  <button
                    onClick={() => setAddingCard(true)}
                    className="text-xs font-semibold text-maroon-700 flex items-center gap-1 hover:underline"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Card
                  </button>
                )}
              </div>

              {addingCard && (
                <div className="mb-4">
                  <AddCardForm onSave={handleSaveCard} onCancel={() => setAddingCard(false)} />
                </div>
              )}

              <div className="space-y-3">
                {paymentMethods.length === 0 && (
                  <p className="text-sm text-maroon-900/50">No saved cards yet — add one above.</p>
                )}
                {paymentMethods.map((pm) => (
                  <label
                    key={pm.id}
                    className={`flex items-center gap-2.5 sm:gap-3 p-3 sm:p-4 rounded-xl border cursor-pointer transition-colors ${
                      paymentId === pm.id ? "border-maroon-700 bg-blush-100" : "border-maroon-100 hover:border-maroon-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentId === pm.id}
                      onChange={() => setPaymentId(pm.id)}
                      className="accent-maroon-700 w-4 h-4"
                    />
                    <CreditCard className="w-4 h-4 text-maroon-700 shrink-0" />
                    <p className="text-sm">
                      {pm.brand} •••• {pm.last4} <span className="text-maroon-900/50">exp {pm.expiry}</span>
                    </p>
                  </label>
                ))}
              </div>
            </section>
          </div>

          <OrderSummary
            subtotal={subtotal}
            deliveryFee={method === "pickup" ? 0 : deliveryFee}
            tax={tax}
            total={method === "pickup" ? subtotal + tax : total}
            itemCount={itemCount}
            cta={
              <button onClick={handlePlaceOrder} disabled={placing} className="btn-primary w-full mt-5 disabled:opacity-60">
                {placing ? "Placing Order…" : "Place Order"}
              </button>
            }
            note="By placing your order you agree to Sweetly Found's Terms of Service."
          >
            <div className="border-t border-maroon-100 mt-4 pt-4 space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <PhotoPlaceholder tone={item.tone} className="w-10 h-10 rounded-lg shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate">{item.name}</p>
                    <p className="text-[11px] text-maroon-900/50">Qty {item.qty}</p>
                  </div>
                  <p className="text-xs font-semibold text-maroon-700 shrink-0">${(item.price * item.qty).toFixed(2)}</p>
                </div>
              ))}
            </div>
          </OrderSummary>
        </div>
      </div>

      <Footer />
    </div>
  );
}

function MethodCard({ icon: Icon, title, desc, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2.5 sm:gap-3 p-3 sm:p-4 rounded-xl border text-left transition-colors ${
        active ? "border-maroon-700 bg-blush-100" : "border-maroon-100 hover:border-maroon-200"
      }`}
    >
      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${active ? "bg-maroon-700 text-white" : "bg-blush-200 text-maroon-700"}`}>
        <Icon className="w-4 h-4" strokeWidth={1.5} />
      </div>
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-maroon-900/50">{desc}</p>
      </div>
    </button>
  );
}
