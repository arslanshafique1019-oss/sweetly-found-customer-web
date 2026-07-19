import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Package, MapPin, CreditCard, Bell, Camera, Plus, Trash2 } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PhotoPlaceholder from "../components/PhotoPlaceholder";
import AddAddressForm from "../components/AddAddressForm";
import AddCardForm from "../components/AddCardForm";
import { orderHistory } from "../data/products";
import { useAccount } from "../context/AccountContext";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const TABS = [
  { key: "profile", label: "Profile", icon: User },
  { key: "orders", label: "Orders", icon: Package },
  { key: "addresses", label: "Addresses", icon: MapPin },
  { key: "payment", label: "Payment Methods", icon: CreditCard },
  { key: "notifications", label: "Notifications", icon: Bell },
];

const statusStyles = {
  Delivered: "bg-green-100 text-green-700",
  Cancelled: "bg-maroon-100 text-maroon-700",
  Processing: "bg-blush-200 text-maroon-700",
};

export default function AccountSettings() {
  const [tab, setTab] = useState("profile");
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  if (!currentUser) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container-page flex-1 py-10 sm:py-16">
          <div className="mx-auto max-w-2xl rounded-[28px] border border-maroon-100 bg-white p-6 text-center shadow-card sm:p-10">
            <h1 className="font-display text-3xl font-semibold text-maroon-900">Please login to view your account</h1>
            <p className="mt-3 text-sm leading-7 text-maroon-900/70">
              Sign in or create an account to manage your profile, orders, delivery details, and favorite bakers.
            </p>
            <Link to="/auth" className="btn-primary mt-6">Go to login</Link>
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
        <div className="flex flex-wrap items-start justify-between gap-3 mb-5 sm:mb-8">
          <div>
            <p className="text-xs text-maroon-900/50 mb-2">
              <Link to="/" className="hover:text-maroon-700">Home</Link>
              <span className="mx-1.5">/</span>
              <span className="text-maroon-700">Account Settings</span>
            </p>
            <h1 className="text-2xl xs:text-3xl md:text-4xl font-semibold">Account Settings</h1>
          </div>
          <button
            type="button"
            onClick={() => {
              logout();
              navigate("/auth");
            }}
            className="btn-outline-maroon !px-4 !py-2 text-sm"
          >
            Logout
          </button>
        </div>

        <div className="grid md:grid-cols-[220px_1fr] gap-5 md:gap-10">
          <nav className="hidden md:block bg-white rounded-xl2 shadow-card p-2.5 sm:p-3 h-fit md:sticky md:top-24">
            <ul className="flex md:flex-col gap-1 overflow-x-auto no-scrollbar">
              {TABS.map(({ key, label, icon: Icon }) => (
                <li key={key} className="shrink-0">
                  <button
                    onClick={() => setTab(key)}
                    className={`w-full flex items-center gap-2 sm:gap-2.5 text-sm px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg transition-colors whitespace-nowrap ${
                      tab === key ? "bg-maroon-700 text-white" : "text-maroon-900/70 hover:bg-blush-100"
                    }`}
                  >
                    <Icon className="w-4 h-4" /> {label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="bg-white rounded-xl2 shadow-card p-4 sm:p-6 md:p-8 pb-24 md:pb-8">
            {/* Mobile bottom tab bar */}
            <div className="md:hidden fixed left-0 right-0 bottom-0 z-50 bg-white border-t border-maroon-100/60">
              <div className="container-page py-2">
                <nav className="flex items-center justify-between">
                  {TABS.slice(0, 5).map(({ key, label, icon: Icon }) => (
                    <button
                      key={key}
                      onClick={() => {
                        setTab(key);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className={`flex-1 flex flex-col items-center gap-0.5 py-1 text-xs transition-colors ${
                        tab === key ? "text-maroon-700" : "text-maroon-900/60"
                      }`}
                      aria-pressed={tab === key}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-[10px] mt-0.5">{label.split(" ")[0]}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>
            {tab === "profile" && <ProfileTab />}
            {tab === "orders" && <OrdersTab />}
            {tab === "addresses" && <AddressesTab />}
            {tab === "payment" && <PaymentTab />}
            {tab === "notifications" && <NotificationsTab />}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

function ProfileTab() {
  const [saved, setSaved] = useState(false);
  const { notify } = useCart();
  const { currentUser } = useAuth();

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div>
      <h2 className="font-display font-semibold text-lg mb-6">Profile Information</h2>

      <div className="flex items-center gap-5 mb-8">
        <div className="relative">
          <PhotoPlaceholder tone="person" className="w-20 h-20 rounded-full" />
          <button
            type="button"
            onClick={() => notify("Photo upload isn't wired up in this demo yet")}
            aria-label="Change photo"
            className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-maroon-700 text-white flex items-center justify-center ring-2 ring-white"
          >
            <Camera className="w-3.5 h-3.5" />
          </button>
        </div>
        <div>
          <p className="font-medium">{currentUser.name}</p>
          <p className="text-xs text-maroon-900/50 mt-0.5">Member since {new Date(currentUser.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })}</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="grid sm:grid-cols-2 gap-5 max-w-xl">
        <Field label="Full Name" defaultValue={currentUser.name} />
        <Field label="Email" type="email" defaultValue={currentUser.email} />
        <Field label="Phone" type="tel" defaultValue={currentUser.phone || ""} />
        <Field label="Date of Birth" type="date" defaultValue={currentUser.birthday || ""} />
        <div className="sm:col-span-2 flex items-center gap-3">
          <button type="submit" className="btn-primary !px-8">Save Changes</button>
          {saved && <span className="text-sm text-green-700 font-medium">✓ Saved</span>}
        </div>
      </form>
    </div>
  );
}

function Field({ label, type = "text", defaultValue }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-maroon-900/60">{label}</span>
      <input
        type={type}
        defaultValue={defaultValue}
        className="mt-1.5 w-full bg-blush-100 border border-maroon-100 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-maroon-700 transition-colors"
      />
    </label>
  );
}

function OrdersTab() {
  const { notify } = useCart();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
        <h2 className="font-display font-semibold text-lg">Order History</h2>
        <Link to="/orders" className="text-sm font-semibold text-maroon-700 hover:underline shrink-0">
          Track Live Order →
        </Link>
      </div>
      <div className="space-y-3">
        {orderHistory.map((order) => (
          <div
            key={order.id}
            className="flex flex-wrap items-center justify-between gap-3 border border-maroon-100 rounded-xl p-3 sm:p-4"
          >
            <div>
              <p className="text-sm font-medium">{order.id} · {order.baker}</p>
              <p className="text-xs text-maroon-900/50 mt-0.5">
                {order.date} · {order.items} {order.items === 1 ? "item" : "items"}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className={`text-xs font-medium px-3 py-1 rounded-full ${statusStyles[order.status] || "bg-blush-200 text-maroon-700"}`}>
                {order.status}
              </span>
              <span className="text-sm font-display font-semibold text-maroon-700">${order.total.toFixed(2)}</span>
              <button
                onClick={() => notify(`Reordering from ${order.baker} — items added to your basket`)}
                className="text-xs font-medium text-maroon-700 hover:underline shrink-0"
              >
                Reorder
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AddressesTab() {
  const { addresses, addAddress, removeAddress } = useAccount();
  const { notify } = useCart();
  const [adding, setAdding] = useState(false);

  const handleSave = (form) => {
    addAddress(form);
    setAdding(false);
    notify("Address added");
  };

  const handleRemove = (addr) => {
    removeAddress(addr.id);
    notify(`Removed "${addr.label}" address`);
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
        <h2 className="font-display font-semibold text-lg">Saved Addresses</h2>
        {!adding && (
          <button
            onClick={() => setAdding(true)}
            className="text-sm font-semibold text-maroon-700 flex items-center gap-1.5 hover:underline"
          >
            <Plus className="w-4 h-4" /> Add Address
          </button>
        )}
      </div>

      {adding && (
        <div className="mb-5">
          <AddAddressForm onSave={handleSave} onCancel={() => setAdding(false)} />
        </div>
      )}

      {addresses.length === 0 ? (
        <p className="text-sm text-maroon-900/50">No saved addresses yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {addresses.map((addr) => (
            <div key={addr.id} className="border border-maroon-100 rounded-xl p-3 sm:p-4 relative">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium">{addr.label}</p>
                {addr.isDefault && (
                  <span className="text-[10px] text-maroon-700 bg-blush-200 px-2 py-0.5 rounded-full">Default</span>
                )}
              </div>
              <p className="text-xs text-maroon-900/60 mt-2 leading-relaxed pr-6">
                {addr.name && <>{addr.name}<br /></>}
                {addr.line1}{addr.line2 ? `, ${addr.line2}` : ""}<br />
                {addr.city}, {addr.state} {addr.zip}
              </p>
              <button
                onClick={() => handleRemove(addr)}
                aria-label={`Remove ${addr.label} address`}
                className="absolute top-4 right-4 text-maroon-900/30 hover:text-maroon-700 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function PaymentTab() {
  const { paymentMethods, addPaymentMethod, removePaymentMethod } = useAccount();
  const { notify } = useCart();
  const [adding, setAdding] = useState(false);

  const handleSave = (form) => {
    addPaymentMethod(form);
    setAdding(false);
    notify("Card added");
  };

  const handleRemove = (pm) => {
    removePaymentMethod(pm.id);
    notify(`Removed card ending in ${pm.last4}`);
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
        <h2 className="font-display font-semibold text-lg">Payment Methods</h2>
        {!adding && (
          <button
            onClick={() => setAdding(true)}
            className="text-sm font-semibold text-maroon-700 flex items-center gap-1.5 hover:underline"
          >
            <Plus className="w-4 h-4" /> Add Card
          </button>
        )}
      </div>

      {adding && (
        <div className="mb-5">
          <AddCardForm onSave={handleSave} onCancel={() => setAdding(false)} />
        </div>
      )}

      {paymentMethods.length === 0 ? (
        <p className="text-sm text-maroon-900/50">No saved payment methods yet.</p>
      ) : (
        <div className="space-y-3 max-w-lg">
          {paymentMethods.map((pm) => (
            <div key={pm.id} className="flex items-center gap-2.5 sm:gap-3 border border-maroon-100 rounded-xl p-3 sm:p-4">
              <div className="w-10 h-7 rounded bg-maroon-700 text-white text-[10px] font-semibold flex items-center justify-center shrink-0">
                {pm.brand.slice(0, 4).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">•••• •••• •••• {pm.last4}</p>
                <p className="text-xs text-maroon-900/50">Expires {pm.expiry}</p>
              </div>
              {pm.isDefault && (
                <span className="text-[10px] text-maroon-700 bg-blush-200 px-2 py-0.5 rounded-full shrink-0">Default</span>
              )}
              <button
                onClick={() => handleRemove(pm)}
                aria-label={`Remove card ending in ${pm.last4}`}
                className="text-maroon-900/30 hover:text-maroon-700 shrink-0 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function NotificationsTab() {
  const options = [
    { label: "Order updates", desc: "Get notified about order status and delivery tracking.", defaultChecked: true },
    { label: "New from bakers you follow", desc: "New product drops from your favorite local bakers.", defaultChecked: true },
    { label: "Promotions & offers", desc: "Occasional discounts and seasonal offers.", defaultChecked: false },
    { label: "Newsletter", desc: "Monthly roundup of artisanal picks.", defaultChecked: false },
  ];

  return (
    <div>
      <h2 className="font-display font-semibold text-lg mb-6">Notification Preferences</h2>
      <div className="space-y-5 max-w-xl">
        {options.map((opt) => (
          <label key={opt.label} className="flex items-start justify-between gap-4 cursor-pointer">
            <div>
              <p className="text-sm font-medium">{opt.label}</p>
              <p className="text-xs text-maroon-900/50 mt-0.5">{opt.desc}</p>
            </div>
            <input
              type="checkbox"
              defaultChecked={opt.defaultChecked}
              className="accent-maroon-700 w-4 h-4 mt-1 shrink-0"
            />
          </label>
        ))}
      </div>
    </div>
  );
}
