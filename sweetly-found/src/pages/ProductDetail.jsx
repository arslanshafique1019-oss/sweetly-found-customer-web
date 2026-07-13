import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Minus, Plus, ExternalLink, Package, BadgeCheck } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PhotoPlaceholder from "../components/PhotoPlaceholder";
import { productDetail } from "../data/products";
import { useCart } from "../context/CartContext";

const galleryTones = ["bread", "pastry", "cookie", "cake"];

export default function ProductDetail() {
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [saved, setSaved] = useState(false);
  const { addItem } = useCart();
  const product = productDetail;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar showSearch />

      <div className="container-page py-6 sm:py-8">
        <p className="text-xs text-maroon-900/50 mb-4 sm:mb-6">
          {product.breadcrumb.map((crumb, i) => (
            <span key={crumb}>
              {i === 0 ? (
                <Link to="/" className="hover:text-maroon-700">{crumb}</Link>
              ) : i === product.breadcrumb.length - 1 ? (
                <span className="text-maroon-700">{crumb}</span>
              ) : (
                <span>{crumb}</span>
              )}
              {i < product.breadcrumb.length - 1 && <span className="mx-1.5">/</span>}
            </span>
          ))}
        </p>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {/* Gallery */}
          <div>
            <PhotoPlaceholder tone={galleryTones[activeImg]} className="w-full h-56 xs:h-72 sm:h-80 md:h-96 rounded-xl2 shadow-card" />
            <div className="grid grid-cols-4 gap-2 sm:gap-3 mt-3 sm:mt-4">
              {galleryTones.map((tone, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`h-14 xs:h-16 sm:h-20 rounded-lg overflow-hidden ring-2 transition-all ${
                    activeImg === i ? "ring-maroon-700" : "ring-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <PhotoPlaceholder tone={tone} className="w-full h-full" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <h1 className="text-2xl xs:text-3xl md:text-4xl font-semibold font-display">{product.name}</h1>
            <p className="text-sm text-maroon-700 mt-2">
              ★ {product.rating}/5 ({product.reviews} Reviews)
            </p>
            <p className="font-display text-2xl sm:text-3xl font-semibold text-maroon-700 mt-3 sm:mt-4">${product.price.toFixed(2)}</p>

            <div className="flex items-center flex-wrap gap-3 mt-5 sm:mt-6 p-3.5 sm:p-4 bg-white rounded-xl2 shadow-card">
              <PhotoPlaceholder tone="person" className="w-11 h-11 rounded-full shrink-0" />
              <div className="flex-1 min-w-[8rem]">
                <p className="font-medium text-sm">Baked by {product.baker.name}</p>
                <p className="text-xs text-maroon-900/50">{product.baker.shopName}</p>
              </div>
              <Link
                to={`/baker/${product.baker.slug}`}
                className="text-xs font-medium text-maroon-700 flex items-center gap-1 hover:underline shrink-0"
              >
                View Storefront <ExternalLink className="w-3 h-3" />
              </Link>
            </div>

            <div className="flex items-center gap-3 sm:gap-4 mt-5 sm:mt-6">
              <div className="flex items-center border border-maroon-200 rounded-full shrink-0">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center hover:text-maroon-700"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-7 sm:w-8 text-center text-sm font-medium">{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center hover:text-maroon-700"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
              <button
                onClick={() =>
                  addItem(
                    { id: product.id, name: product.name, price: product.price, tone: galleryTones[activeImg], baker: product.baker.name },
                    qty
                  )
                }
                className="btn-primary flex-1"
              >
                Add to Cart
              </button>
            </div>
            <button
              onClick={() => setSaved((s) => !s)}
              className={`w-full mt-3 gap-2 inline-flex items-center justify-center rounded-full border font-medium px-6 py-2.5 sm:py-3 text-sm sm:text-base transition-colors duration-200 ${
                saved ? "bg-maroon-700 text-white border-maroon-700" : "border-maroon-700 text-maroon-700 hover:bg-maroon-700 hover:text-white"
              }`}
            >
              <Heart className="w-4 h-4" fill={saved ? "currentColor" : "none"} /> {saved ? "Saved" : "Save for Later"}
            </button>

            <div className="mt-6 sm:mt-8">
              <h3 className="font-medium text-sm mb-3">Ingredients &amp; Allergens</h3>
              <div className="flex flex-wrap gap-2">
                {product.allergens.map((a) => (
                  <span
                    key={a}
                    className={`text-xs px-3 py-1.5 rounded-full ${
                      a.toLowerCase().includes("contains")
                        ? "bg-maroon-100 text-maroon-700"
                        : "bg-blush-200 text-maroon-800"
                    }`}
                  >
                    {a}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-3 sm:gap-6 mt-5 sm:mt-6 text-xs text-maroon-900/60">
              <span className="flex items-center gap-1.5">
                <Package className="w-3.5 h-3.5" /> Next-Day Pickup
              </span>
              <span className="flex items-center gap-1.5">
                <BadgeCheck className="w-3.5 h-3.5" /> Hyperlocal Certified
              </span>
            </div>
          </div>
        </div>

        {/* The Story */}
        <div className="grid lg:grid-cols-[1fr_260px] gap-6 sm:gap-10 mt-10 sm:mt-16">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">The Story</h2>
            <blockquote className="border-l-4 border-maroon-700 pl-4 sm:pl-5 italic text-maroon-900/80 font-display text-base sm:text-lg leading-relaxed">
              "{product.story}"
            </blockquote>
            <p className="text-sm text-maroon-900/70 leading-relaxed mt-4 sm:mt-5">{product.description}</p>
          </div>
          <div className="bg-blush-200 rounded-xl2 p-5 sm:p-6 h-fit">
            <h3 className="font-medium text-sm mb-4">Storage Tips</h3>
            <ul className="space-y-3">
              {product.storageTips.map((tip, i) => (
                <li key={i} className="flex gap-2.5 text-sm text-maroon-900/70">
                  <span className="w-1.5 h-1.5 rounded-full bg-maroon-700 mt-1.5 shrink-0" />
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* More from kitchen */}
        <div className="mt-10 sm:mt-16 mb-8">
          <div className="flex items-end justify-between mb-6 sm:mb-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold">More from Clara's Kitchen</h2>
              <p className="text-sm text-maroon-900/50 mt-1">Artisanal treats you might also enjoy.</p>
            </div>
            <Link to="/categories" className="text-sm font-medium text-maroon-700 hover:underline shrink-0">
              Shop All →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {product.moreFromKitchen.map((item) => (
              <div key={item.id} className="group cursor-pointer">
                <PhotoPlaceholder
                  tone={item.tone}
                  className="w-full h-28 xs:h-36 rounded-xl2 shadow-card group-hover:shadow-cardHover transition-shadow"
                />
                <h3 className="font-medium text-sm mt-2.5 sm:mt-3">{item.name}</h3>
                <p className="text-sm text-maroon-700 mt-1">
                  ${item.price.toFixed(2)}
                  {item.unit && <span className="text-xs text-maroon-900/50"> {item.unit}</span>}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
