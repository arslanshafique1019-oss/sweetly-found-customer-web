import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  MessageCircle,
  LifeBuoy,
  Check,
  MapPin,
  Home as HomeIcon,
  Store,
  X,
  Mail,
  Phone,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PhotoPlaceholder from "../components/PhotoPlaceholder";
import { activeOrder, pastOrders } from "../data/products";

const statusBadgeStyles = {
  Delivered: "bg-green-100 text-green-700",
  Cancelled: "bg-maroon-100 text-maroon-700",
  Processing: "bg-blush-200 text-maroon-700",
};

export default function Orders() {
  const order = activeOrder;
  const [helpOpen, setHelpOpen] = useState(false);
  const stepIndex = order.statusSteps.findIndex((s) => s.key === order.currentStep);

  const itemsSubtotal = order.items.reduce((sum, i) => sum + i.qty * i.price, 0);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="container-page py-6 sm:py-8 md:py-10 flex-1">
        <Link
          to="/account"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-maroon-700 hover:underline mb-4"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Return to Dashboard
        </Link>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl xs:text-3xl md:text-4xl font-semibold">Order #{order.id}</h1>
            <p className="text-sm text-maroon-900/60 mt-1.5">Estimated Arrival: {order.eta}</p>
          </div>
          <div className="relative flex flex-col xs:flex-row items-stretch xs:items-center gap-2.5 xs:gap-3 shrink-0">
            <Link
              to={`/baker/${order.bakerSlug}`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-blush-200 text-maroon-700 font-medium px-5 py-2.5 text-sm hover:bg-blush-300 transition-colors w-full xs:w-auto"
            >
              <MessageCircle className="w-4 h-4" /> Message Baker
            </Link>
            <button
              onClick={() => setHelpOpen((v) => !v)}
              className="btn-primary !py-2.5 !px-5 text-sm gap-2 w-full xs:w-auto"
            >
              <LifeBuoy className="w-4 h-4" /> Help Center
            </button>

            {helpOpen && (
              <div className="absolute left-0 right-0 xs:left-auto xs:right-0 top-full mt-2 w-full xs:w-72 max-w-[85vw] bg-white rounded-xl2 shadow-cardHover p-5 z-20 text-left">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-display font-semibold text-sm">Need a hand?</h3>
                  <button onClick={() => setHelpOpen(false)} aria-label="Close help panel" className="text-maroon-900/40 hover:text-maroon-700">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-maroon-900/60 leading-relaxed mb-4">
                  Questions about this order, a missing item, or a late delivery? Our support team is here to help.
                </p>
                <div className="space-y-2.5 text-xs">
                  <a href="mailto:support@sweetlyfound.example" className="flex items-center gap-2 text-maroon-700 hover:underline">
                    <Mail className="w-3.5 h-3.5" /> support@sweetlyfound.example
                  </a>
                  <a href="tel:+18005550142" className="flex items-center gap-2 text-maroon-700 hover:underline">
                    <Phone className="w-3.5 h-3.5" /> +1 (800) 555-0142
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_340px] gap-5 sm:gap-8 items-start">
          <div className="space-y-5 sm:space-y-6">
            {/* Status stepper */}
            <div className="bg-white rounded-xl2 shadow-card p-4 sm:p-6 overflow-x-auto no-scrollbar">
              <div className="flex items-start min-w-[320px]">
                {order.statusSteps.map((step, i) => {
                  const done = i < stepIndex;
                  const active = i === stepIndex;
                  return (
                    <React.Fragment key={step.key}>
                      <div className="flex flex-col items-center text-center w-16 sm:w-20 md:w-24 shrink-0">
                        <div
                          className={`w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-[11px] sm:text-xs font-semibold shrink-0 ${
                            done || active
                              ? "bg-maroon-700 text-white"
                              : "bg-blush-200 text-maroon-900/30"
                          }`}
                        >
                          {done ? <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : i + 1}
                        </div>
                        <p className={`text-[10px] sm:text-xs font-medium mt-1.5 sm:mt-2 ${active ? "text-maroon-700" : "text-maroon-900/70"}`}>
                          {step.label}
                        </p>
                        <p className={`text-[9px] sm:text-[10px] mt-0.5 ${active ? "text-maroon-700 font-medium" : "text-maroon-900/40"}`}>
                          {step.time}
                        </p>
                      </div>
                      {i < order.statusSteps.length - 1 && (
                        <div className={`flex-1 h-0.5 mt-3.5 sm:mt-4 min-w-[16px] ${i < stepIndex ? "bg-maroon-700" : "bg-blush-200"}`} />
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>

            {/* Stylized delivery map */}
            <div className="bg-white rounded-xl2 shadow-card overflow-hidden">
              <DeliveryMap courierName={order.courier.name} distanceAway={order.courier.distanceAway} />
            </div>
          </div>

          {/* Order items + summary */}
          <aside className="bg-white rounded-xl2 shadow-card p-5 sm:p-6 lg:sticky lg:top-24 space-y-6">
            <div>
              <h2 className="font-display font-semibold mb-4">Order Items</h2>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <PhotoPlaceholder tone={item.tone} className="w-12 h-12 rounded-lg shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {item.name} {item.qty > 1 && <span className="text-maroon-900/50">(x{item.qty})</span>}
                      </p>
                      <p className="text-xs text-maroon-900/50">{item.variant}</p>
                    </div>
                    <p className="text-sm font-semibold text-maroon-700 shrink-0">
                      ${(item.qty * item.price).toFixed(2)}
                    </p>
                  </div>
                ))}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-blush-200 flex items-center justify-center shrink-0">
                    <Store className="w-5 h-5 text-maroon-700" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Delivery Fee</p>
                    <p className="text-xs text-maroon-900/50">Standard artisanal delivery</p>
                  </div>
                  <p className="text-sm font-semibold text-maroon-700 shrink-0">${order.deliveryFee.toFixed(2)}</p>
                </div>
              </div>

              <div className="border-t border-maroon-100 mt-5 pt-4 space-y-2 text-sm">
                <div className="flex justify-between text-maroon-900/70">
                  <span>Subtotal</span>
                  <span className="font-medium text-maroon-900">${itemsSubtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-maroon-900/70">
                  <span>Tax</span>
                  <span className="font-medium text-maroon-900">${order.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-baseline pt-2 border-t border-maroon-100 mt-2">
                  <span className="font-display font-semibold">Total</span>
                  <span className="font-display font-semibold text-xl text-maroon-700">${order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="bg-blush-100 rounded-xl p-4">
              <p className="flex items-center gap-1.5 text-sm font-medium mb-2">
                <MapPin className="w-4 h-4 text-maroon-700" /> Shipping Address
              </p>
              <p className="text-xs text-maroon-900/60 leading-relaxed">
                {order.shippingAddress.line1}, {order.shippingAddress.line2}
                <br />
                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}
              </p>
            </div>
          </aside>
        </div>

        {/* Past Orders */}
        <div className="mt-10 sm:mt-14">
          <div className="flex items-end justify-between mb-5 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-semibold">Past Orders</h2>
            <Link to="/account" className="text-sm font-medium text-maroon-700 hover:underline shrink-0">
              View All History
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {pastOrders.map((po) => (
              <div key={po.id} className="bg-white rounded-xl2 shadow-card p-4 sm:p-5">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <p className="text-xs text-maroon-900/50 min-w-0 truncate">
                    {po.date} · Order #{po.id}
                  </p>
                  <span className={`text-[10px] font-medium px-2.5 py-1 rounded-full shrink-0 ${statusBadgeStyles[po.status] || "bg-blush-200 text-maroon-700"}`}>
                    {po.status}
                  </span>
                </div>
                <h3 className="font-display font-semibold mb-3">{po.baker}</h3>
                <div className="flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {po.thumbnails.map((tone, i) => (
                      <PhotoPlaceholder
                        key={i}
                        tone={tone}
                        className="w-9 h-9 rounded-full ring-2 ring-white"
                      />
                    ))}
                  </div>
                  <p className="font-display font-semibold text-maroon-700">${po.total.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

function DeliveryMap({ courierName, distanceAway }) {
  return (
    <div className="relative h-48 xs:h-56 sm:h-64 md:h-72 bg-blush-100">
      {/* Abstract stylized map illustration (original artwork, not real map tiles) */}
      <svg viewBox="0 0 600 300" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
        <rect width="600" height="300" fill="#fdf1f3" />
        {/* city blocks */}
        {[
          [20, 20, 90, 60], [140, 20, 70, 40], [240, 30, 100, 50], [380, 15, 80, 45], [500, 25, 70, 55],
          [30, 110, 60, 70], [130, 130, 90, 50], [260, 120, 70, 60], [370, 110, 90, 70], [500, 120, 70, 60],
          [20, 220, 80, 50], [150, 210, 70, 60], [270, 220, 90, 45], [400, 210, 80, 60], [520, 220, 60, 50],
        ].map(([x, y, w, h], i) => (
          <rect key={i} x={x} y={y} width={w} height={h} rx="6" fill="#fbe3e8" />
        ))}
        {/* roads */}
        <path d="M0 100 H600" stroke="#f6d0d8" strokeWidth="10" />
        <path d="M0 200 H600" stroke="#f6d0d8" strokeWidth="10" />
        <path d="M180 0 V300" stroke="#f6d0d8" strokeWidth="10" />
        <path d="M420 0 V300" stroke="#f6d0d8" strokeWidth="10" />
        {/* delivery route */}
        <path
          d="M120 230 C 220 230, 200 150, 300 150 S 420 90, 470 70"
          fill="none"
          stroke="#6b1f38"
          strokeWidth="3"
          strokeDasharray="8 8"
        />
        {/* baker pin */}
        <g transform="translate(470,70)">
          <circle r="10" fill="#6b1f38" />
          <circle r="4" fill="#fdf1f3" />
        </g>
        {/* home pin */}
        <g transform="translate(120,230)">
          <circle r="12" fill="#822643" />
          <circle r="5" fill="#fdf1f3" />
        </g>
        {/* courier position (mid-route) */}
        <g transform="translate(300,150)">
          <circle r="16" fill="#6b1f38" opacity="0.15" />
        </g>
      </svg>

      {/* Home marker label */}
      <div className="absolute left-[16%] top-[74%] -translate-x-1/2 -translate-y-full flex flex-col items-center">
        <span className="bg-maroon-700 text-white text-[10px] font-semibold px-2.5 py-1 rounded-full shadow-sm whitespace-nowrap flex items-center gap-1">
          <HomeIcon className="w-3 h-3" /> Your Home
        </span>
      </div>

      {/* Courier marker with avatar */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex items-center gap-2 bg-white rounded-full shadow-cardHover pl-1 pr-3 py-1">
          <PhotoPlaceholder tone="courier" className="w-8 h-8 rounded-full shrink-0" />
          <div className="leading-tight">
            <p className="text-[11px] font-semibold">{courierName} is on his way</p>
            <p className="text-[10px] text-maroon-900/50">{distanceAway}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
