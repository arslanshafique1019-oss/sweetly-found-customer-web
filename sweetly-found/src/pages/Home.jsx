import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Search, ChevronLeft, ChevronRight, Heart, ShoppingBag, Croissant, Cake, Wheat, Cookie } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PhotoPlaceholder from "../components/PhotoPlaceholder";
import { featuredBakers, trendingProducts, categories } from "../data/products";
import { useCart } from "../context/CartContext";

const veganImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuOc1toVSZHPGcLs2v1aw_-Pn367mNbXi5zh7eE0TsDyU-EFKbdQorDXG9&s=10";
const categoryIcons = {
  Cakes: Cake,
  Cookies: Cookie,
  Breads: Wheat,
  Pastries: Croissant,
  Vegan: veganImage,
};
const bakerImages = {
  "vegan-vibes": veganImage,
};

export default function Home() {
  const { addItem } = useCart();
  const navigate = useNavigate();
  const bakersRowRef = useRef(null);
  const [savedIds, setSavedIds] = useState(() => new Set());
  const [heroSearch, setHeroSearch] = useState("");

  const toggleSaved = (id) => {
    setSavedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const scrollBakers = (dir) => {
    const el = bakersRowRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "left" ? -240 : 240, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="relative">
        <div className="relative h-[440px] xs:h-[480px] sm:h-[520px] md:h-[560px] overflow-hidden">

          {/* Background Image */}
          <img
            src="https://images.unsplash.com/photo-1509440159596-0249088772ff"
            alt="Sweetly Found Hero"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/55"></div>

          {/* Content */}
          <div className="relative z-20 h-full flex items-center">
            <div className="container-page w-full flex justify-center md:justify-start">
              <div className="max-w-2xl text-center md:text-left">

                <h1 className="font-display text-3xl xs:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                  Handcrafted Treats,
                  <br className="hidden xs:block" />
                  <span className="xs:hidden"> </span>
                  Delivered from Your Neighborhood
                </h1>

                <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-white/90 leading-relaxed sm:leading-8 max-w-xl">
                  Discover the best local home bakers near you.
                  Freshly baked with love and delivered straight to your door.
                </p>

                {/* Search Bar */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const q = heroSearch.trim();
                    if (!q) return navigate('/categories');
                    navigate(`/categories?q=${encodeURIComponent(q)}`);
                  }}
                  className="mt-6 sm:mt-10 flex flex-col xs:flex-row items-stretch xs:items-center gap-2 bg-white rounded-2xl xs:rounded-full shadow-2xl p-2 max-w-xl"
                >
                  <div className="flex items-center flex-1 min-w-0 px-2 xs:px-2">
                    <Search className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 ml-2 shrink-0" />
                    <input
                      type="text"
                      placeholder="Search cakes, cookies, cupcakes..."
                      value={heroSearch}
                      onChange={(e) => setHeroSearch(e.target.value)}
                      className="flex-1 min-w-0 px-3 py-2.5 sm:py-3 outline-none text-sm sm:text-base text-gray-700 placeholder:text-gray-400"
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-[#6B1838] hover:bg-[#57112d] text-white font-medium px-6 sm:px-7 py-2.5 sm:py-3 rounded-full transition duration-300 text-sm sm:text-base shrink-0"
                  >
                    Find Treats
                  </button>
                </form>

              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Featured Bakers */}
      <section className="container-page py-10 sm:py-16 md:py-20">
        <div className="flex items-end justify-between mb-5 sm:mb-8">
          <div>
            <h2 className="text-xl xs:text-2xl md:text-3xl font-semibold">Featured Bakers</h2>
            <p className="text-maroon-900/60 text-sm mt-1">The most loved artisans in your area this week.</p>
          </div>
          <div className="hidden sm:flex gap-2">
            <CarouselButton dir="left" onClick={() => scrollBakers("left")} />
            <CarouselButton dir="right" onClick={() => scrollBakers("right")} />
          </div>
        </div>
        <div
          ref={bakersRowRef}
          className="grid grid-cols-2 md:flex md:overflow-x-auto md:snap-x md:snap-mandatory gap-6 md:pb-2 scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {featuredBakers.map((baker) => (
            <Link
              to={`/baker/${baker.slug}`}
              key={baker.id}
              className="text-center group cursor-pointer md:shrink-0 md:w-40 md:snap-start"
            >
              <div className="relative w-24 h-24 md:w-28 md:h-28 mx-auto mb-4">
                <PhotoPlaceholder
                  tone={baker.tone}
                  imageSrc={bakerImages[baker.slug]}
                  icon={Cake}
                  iconClassName="w-7 h-7"
                  className="w-full h-full rounded-full shadow-card group-hover:shadow-cardHover transition-shadow"
                />
              </div>
              <h3 className="font-display font-medium">{baker.name}</h3>
              <p className="text-xs text-maroon-700 mt-1">★ {baker.rating.toFixed(1)}</p>
              <span className="inline-block mt-2 text-[11px] bg-blush-200 text-maroon-700 px-3 py-1 rounded-full">
                {baker.tag}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending Now */}
      <section id="trending" className="bg-blush-200/70 py-10 sm:py-16 md:py-20">
        <div className="container-page">
          <h2 className="text-xl xs:text-2xl md:text-3xl font-semibold text-center mb-6 sm:mb-10">Trending Now</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trendingProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl2 overflow-hidden shadow-card hover:shadow-cardHover transition-shadow"
              >
                <div className="relative h-36 md:h-40">
                  <PhotoPlaceholder tone={product.tone} className="w-full h-full" />
                  <button
                    onClick={() => toggleSaved(product.id)}
                    aria-label={savedIds.has(product.id) ? "Remove from saved" : "Save for later"}
                    aria-pressed={savedIds.has(product.id)}
                    className="absolute top-2.5 left-2.5 w-7 h-7 rounded-full bg-white/90 flex items-center justify-center"
                  >
                    <Heart
                      className="w-3.5 h-3.5 text-maroon-700"
                      fill={savedIds.has(product.id) ? "currentColor" : "none"}
                    />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-sm leading-snug">{product.name}</h3>
                  <div className="flex items-center justify-between mt-3">
                    <span className="font-display font-semibold text-maroon-700">
                      ${product.price.toFixed(2)}
                      {product.unit && <span className="text-xs font-sans font-normal text-maroon-900/50"> {product.unit}</span>}
                    </span>
                    <button
                      onClick={() =>
                        addItem({ id: `trending-${product.id}`, name: product.name, price: product.price, unit: product.unit, tone: product.tone, baker: product.baker })
                      }
                      aria-label="Add to bag"
                      className="w-8 h-8 rounded-full bg-maroon-700 text-white flex items-center justify-center hover:bg-maroon-800 transition-colors"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="container-page py-10 sm:py-16 md:py-20 text-center">
        <h2 className="text-xl xs:text-2xl md:text-3xl font-semibold mb-6 sm:mb-10">Shop by Category</h2>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-8 sm:gap-8 md:gap-12">
          {categories.map((cat) => {
            const iconConfig = categoryIcons[cat.name];
            const isImageIcon = typeof iconConfig === "string";
            const iconProps = isImageIcon ? { imageSrc: iconConfig } : { icon: iconConfig || Cake };

            return (
              <Link to="/categories" key={cat.id} className="flex flex-col items-center gap-3 group">
                <PhotoPlaceholder
                  tone={cat.tone}
                  {...iconProps}
                  iconClassName="w-6 h-6"
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full shadow-card group-hover:shadow-cardHover group-hover:scale-105 transition-all"
                />
                <span className="text-sm font-medium">{cat.name}</span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* How it Works */}
      <section className="bg-blush-200/70 py-10 sm:py-16 md:py-20">
        <div className="container-page text-center">
          <h2 className="text-xl xs:text-2xl md:text-3xl font-semibold">How it Works</h2>
          <p className="text-maroon-900/60 text-sm mt-2 max-w-md mx-auto">
            Getting fresh, local treats delivered to your doorstep is easy as pie.
          </p>
          <div className="grid sm:grid-cols-3 gap-8 sm:gap-10 mt-8 sm:mt-12 max-w-4xl mx-auto">
            {[
              { title: "Browse", desc: "Discover unique bakers from talented artisans in your own neighborhood." },
              { title: "Order", desc: "Place your order securely and choose your preferred delivery or pickup time." },
              { title: "Enjoy", desc: "Savor the fresh, handcrafted goodness and support your local community." },
            ].map((step) => (
              <div key={step.title} className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-maroon-700 text-white flex items-center justify-center mb-4">
                  <Cake className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <h3 className="font-display font-semibold text-lg">{step.title}</h3>
                <p className="text-sm text-maroon-900/60 mt-2 max-w-xs">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function CarouselButton({ dir, onClick }) {
  const Icon = dir === "left" ? ChevronLeft : ChevronRight;
  return (
    <button
      onClick={onClick}
      aria-label={dir === "left" ? "Previous" : "Next"}
      className="w-9 h-9 rounded-full border border-maroon-200 flex items-center justify-center hover:bg-maroon-700 hover:text-white hover:border-maroon-700 transition-colors"
    >
      <Icon className="w-4 h-4" />
    </button>
  );
}
