import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import SellOnSweetlyFound from "./pages/SellOnSweetlyFound";
import ProductDetail from "./pages/ProductDetail";
import BakerProfile from "./pages/BakerProfile";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import AccountSettings from "./pages/AccountSettings";
import Orders from "./pages/Orders";
import CartToast from "./components/CartToast";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollHandler />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/sell-on-sweetly-found" element={<SellOnSweetlyFound />} />
        <Route path="/product/:slug" element={<ProductDetail />} />
        <Route path="/baker/:slug" element={<BakerProfile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/account" element={<AccountSettings />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
      <CartToast />
    </BrowserRouter>
  );
}

function ScrollHandler() {
  const location = useLocation();

  useEffect(() => {
    // If there's a hash (fragment), try to scroll to the matching element id.
    if (location.hash) {
      const id = location.hash.slice(1);
      // Small timeout to allow route render to mount target node
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }, 50);
    } else {
      // No hash -> scroll to top of page
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location]);

  return null;
}
