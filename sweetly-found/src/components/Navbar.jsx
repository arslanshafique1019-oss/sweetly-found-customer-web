import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { NavLink, useLocation } from "react-router-dom";
import { Search, ShoppingBag, User, MoreVertical, X } from "lucide-react";
import { useCart } from "../context/CartContext";

const navLinkClass = ({ isActive }) =>
  `text-sm font-medium transition-colors ${
    isActive ? "text-maroon-700 border-b-2 border-maroon-700 pb-1" : "text-maroon-900/70 hover:text-maroon-700"
  }`;

// Matches the reference design: active item gets a soft blush pill behind
// maroon text; inactive items are plain text that lightly highlights on hover.
const drawerLinkClass = ({ isActive }) =>
  `block w-full text-left px-4 py-3 rounded-full text-[15px] transition-colors ${
    isActive ? "bg-blush-200 text-maroon-700 font-semibold" : "text-maroon-900/80 font-medium hover:bg-blush-100"
  }`;

const NAV_ITEMS = [
  { to: "/", label: "Home", end: true },
  { to: "/categories", label: "Categories" },
  { to: "/sell-on-sweetly-found", label: "Sell on Sweetly Found" },
  { to: "/orders", label: "Orders" },
];

export default function Navbar({ showSearch = false, transparent = false, searchValue = "", onSearchChange }) {
  const { itemCount } = useCart();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const drawerRef = useRef(null);
  const location = useLocation();

  // Close the drawer whenever the route changes (selecting a nav item).
  useEffect(() => {
    setDrawerOpen(false);
    setMobileSearchOpen(false);
  }, [location.pathname]);

  // Close on outside click (click on the backdrop).
  useEffect(() => {
    if (!drawerOpen) return;
    const handleClick = (e) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target)) setDrawerOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [drawerOpen]);

  // Close on Escape key.
  useEffect(() => {
    if (!drawerOpen) return;
    const handleKey = (e) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [drawerOpen]);

  // Lock background scroll while the drawer is open.
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 w-full ${
          transparent ? "bg-cream/95" : "bg-cream"
        } backdrop-blur border-b border-maroon-100/60`}
      >
        <div className="container-page flex items-center justify-between h-14 sm:h-16 md:h-20 gap-2">
        {/* Left: three-dot menu trigger (mobile/tablet only) + logo */}
        <div className="flex items-center gap-1 sm:gap-3 min-w-0">
          <button
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
            aria-expanded={drawerOpen}
            aria-haspopup="dialog"
            className="md:hidden -ml-1.5 p-1.5 sm:p-2 rounded-full text-maroon-800 hover:bg-blush-100 hover:text-maroon-700 transition-colors shrink-0"
          >
            <MoreVertical className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <NavLink
            to="/"
            className="font-display text-lg sm:text-xl md:text-2xl font-semibold text-maroon-700 tracking-tight truncate min-w-0"
          >
            Sweetly Found
          </NavLink>
        </div>

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} className={navLinkClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Right: search, cart, account, login */}
        <div className="flex items-center gap-1 xs:gap-1.5 sm:gap-3 md:gap-4 shrink-0">
          {showSearch && (
            <div className="hidden sm:flex items-center gap-2 bg-blush-100 border border-maroon-100 rounded-full px-4 py-2 w-40 md:w-56 lg:w-72">
              <Search className="w-4 h-4 text-maroon-700/60 shrink-0" />
              <input
                type="text"
                value={searchValue}
                onChange={(e) => onSearchChange?.(e.target.value)}
                placeholder="Search artisanal cakes..."
                className="bg-transparent outline-none text-sm w-full min-w-0 placeholder:text-maroon-900/40"
              />
            </div>
          )}
          {showSearch && (
            <button
              onClick={() => setMobileSearchOpen((v) => !v)}
              aria-label="Toggle search"
              aria-expanded={mobileSearchOpen}
              className="sm:hidden p-1.5 xs:p-2 text-maroon-800 hover:text-maroon-700 transition-colors"
            >
              <Search className="w-[18px] h-[18px] xs:w-5 xs:h-5" />
            </button>
          )}

          <NavLink
            to="/cart"
            aria-label="View cart"
            className="relative p-1.5 xs:p-2 text-maroon-800 hover:text-maroon-700 transition-colors"
          >
            <ShoppingBag className="w-[18px] h-[18px] xs:w-5 xs:h-5" />
            {itemCount > 0 && (
              <span className="absolute top-0 right-0 xs:-top-0.5 xs:-right-0.5 bg-maroon-700 text-white text-[9px] xs:text-[10px] leading-none rounded-full min-w-[16px] h-4 px-0.5 flex items-center justify-center">
                {itemCount > 9 ? "9+" : itemCount}
              </span>
            )}
          </NavLink>

          <NavLink
            to="/account"
            aria-label="Account settings"
            className="hidden sm:flex p-2 text-maroon-800 hover:text-maroon-700 transition-colors"
          >
            <User className="w-5 h-5" />
          </NavLink>

          <div className="hidden md:block">
            <NavLink to="/account" className="btn-primary !py-2.5 !px-5 text-sm">
              Login/Signup
            </NavLink>
          </div>
        </div>
      </div>

      {/* Mobile inline search row (overlay, doesn't affect header height) */}
      {showSearch && mobileSearchOpen && (
        <div className="sm:hidden absolute top-full inset-x-0 border-t border-maroon-100/60 px-4 py-3 bg-cream shadow-card z-40">
          <div className="flex items-center gap-2 bg-blush-100 border border-maroon-100 rounded-full px-4 py-2.5">
            <Search className="w-4 h-4 text-maroon-700/60 shrink-0" />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => onSearchChange?.(e.target.value)}
              autoFocus
              placeholder="Search artisanal cakes..."
              className="bg-transparent outline-none text-sm w-full min-w-0 placeholder:text-maroon-900/40"
            />
          </div>
        </div>
      )}

      {/*
        The drawer + backdrop are rendered through a portal directly into
        document.body. This is deliberate: an ancestor with `backdrop-filter`
        (our `backdrop-blur` on <header>) creates a new containing block for
        `position: fixed` descendants in WebKit/Safari, which silently
        confines "fixed, full-height" elements to the header's own small box
        instead of the viewport. Portaling sidesteps that entirely so the
        drawer reliably covers the full screen on every mobile browser.
      */}
      {createPortal(
        <MobileDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          drawerRef={drawerRef}
          itemCount={itemCount}
        />,
        document.body
      )}
      </header>
      <div className="h-14 sm:h-16 md:h-20" aria-hidden="true" />
    </>
  );
}

function MobileDrawer({ open, onClose, drawerRef, itemCount }) {
  return (
    <div className="md:hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-maroon-900/40 z-40 transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      />

      {/* Sliding sidebar drawer (left) */}
      <aside
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        className={`fixed inset-y-0 left-0 z-50 w-[82%] max-w-xs bg-white shadow-cardHover flex flex-col transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header row */}
        <div className="flex items-center justify-between h-14 xs:h-16 px-4 sm:px-5 border-b border-maroon-100/60 shrink-0">
          <span className="font-display text-lg sm:text-xl font-semibold text-maroon-700">Sweetly Found</span>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="p-1.5 -mr-1.5 text-maroon-900 hover:text-maroon-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav list */}
        <nav className="px-3 sm:px-4 pt-3 pb-4 border-b border-maroon-100/60 shrink-0">
          <ul className="space-y-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} end={item.end} className={drawerLinkClass}>
                  {item.label}
                </NavLink>
              </li>
            ))}
            <li>
              <NavLink to="/cart" className={drawerLinkClass}>
                Cart {itemCount > 0 && `(${itemCount})`}
              </NavLink>
            </li>
            <li>
              <NavLink to="/account" className={drawerLinkClass}>
                Account
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Flexible spacer keeps the promo/login panel pinned to the bottom */}
        <div className="flex-1" />

        {/* Bottom promo + login panel */}
        <div className="bg-blush-100 px-5 py-6 shrink-0">
          <p className="text-sm text-maroon-900/70 leading-snug mb-4">
            Passionate about baking? Share your craft with our community.
          </p>
          <NavLink to="/account" className="btn-primary w-full">
            Login / Sign up
          </NavLink>
        </div>
      </aside>
    </div>
  );
}
