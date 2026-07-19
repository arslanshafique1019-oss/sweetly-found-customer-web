import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, ShoppingBag, SlidersHorizontal, X } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PhotoPlaceholder from "../components/PhotoPlaceholder";
import { artisanalCakes, categories as productCategories } from "../data/products";
import { useCart } from "../context/CartContext";

// Use canonical categories from product data
const filterCategories = productCategories;
const distanceOptions = ["Within 5 miles", "Within 15 miles", "City-wide"];
const ratingOptions = ["4+ ★", "3+ ★"];

export default function Categories() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [distance, setDistance] = useState("Within 5 miles");
  const [rating, setRating] = useState(null);
  const [page, setPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { addItem } = useCart();

  const location = useLocation();

  // Price range defaults based on available products
  const prices = artisanalCakes.map((p) => p.price || 0);
  const absoluteMin = Math.min(...prices);
  const absoluteMax = Math.max(...prices);
  const [priceMax, setPriceMax] = useState(absoluteMax);
  const pageSize = 6;

  const handleSearchChange = (value) => {
    setPage(1);
    setSearchTerm(value);
  };

  // Initialize search term from the `q` query param when arriving from links
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get("q") || "";
    if (q !== searchTerm) setSearchTerm(q);
  }, [location.search, searchTerm]);

  const filterProducts = (items) => {
    const normalizedSearch = searchTerm.trim().toLowerCase();
    const selectedTones = selectedCategories
      .map((name) => productCategories.find((c) => c.name === name))
      .filter(Boolean)
      .map((c) => c.tone);

    return items.filter((item) => {
      const categoryName = productCategories.find((c) => c.tone === item.tone)?.name ?? "";
      const searchMatches =
        !normalizedSearch ||
        item.name.toLowerCase().includes(normalizedSearch) ||
        item.baker.toLowerCase().includes(normalizedSearch) ||
        categoryName.toLowerCase().includes(normalizedSearch) ||
        item.tone.toLowerCase().includes(normalizedSearch);

      if (!searchMatches) return false;
      if (selectedTones.length && !selectedTones.includes(item.tone)) return false;
      if (item.price > priceMax) return false;
      if (rating && Number(item.rating) < rating) return false;
      return true;
    });
  };

  const filteredProducts = filterProducts(artisanalCakes);
  const totalResults = filteredProducts.length;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar showSearch searchValue={searchTerm} onSearchChange={handleSearchChange} />

      <div className="container-page py-6 sm:py-8">
        <p className="text-xs text-maroon-900/50 mb-2">
          <Link to="/" className="hover:text-maroon-700">Home</Link>
          <span className="mx-1.5">/</span>
          <span className="text-maroon-700">Cakes</span>
        </p>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-6 sm:mb-8">
          <h1 className="text-2xl xs:text-3xl md:text-4xl font-semibold">Artisanal Cakes</h1>
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-maroon-900/50">
              Showing {totalResults} result{totalResults === 1 ? "" : "s"}
              {searchTerm.trim() ? ` for “${searchTerm.trim()}”` : " for Cakes"}
            </p>
            <button
              onClick={() => setFiltersOpen((v) => !v)}
              className="md:hidden inline-flex items-center gap-1.5 text-sm font-medium text-maroon-700 border border-maroon-200 rounded-full px-4 py-2 shrink-0"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" /> Filters
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-[240px_1fr] gap-6 md:gap-10">
          {/* Filters sidebar (collapsible on mobile) */}
          <aside
            className={`bg-white rounded-xl2 shadow-card p-5 sm:p-6 h-fit md:block ${filtersOpen ? "block" : "hidden"}`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-semibold">Filters</h3>
              <button onClick={() => setFiltersOpen(false)} aria-label="Close filters" className="md:hidden text-maroon-900/40">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mb-6">
              <h4 className="text-sm font-medium mb-3">Category</h4>
              <ul className="space-y-2.5">
                {filterCategories.map((cat) => (
                  <li key={cat.id}>
                    <label className="flex items-center gap-2.5 text-sm cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat.name)}
                        onChange={() => {
                          setPage(1);
                          setSelectedCategories((prev) =>
                            prev.includes(cat.name) ? prev.filter((c) => c !== cat.name) : [...prev, cat.name]
                          );
                        }}
                        className="accent-maroon-700 w-4 h-4 rounded"
                      />
                      <span className={selectedCategories.includes(cat.name) ? "text-maroon-900" : "text-maroon-900/70"}>
                        {cat.name}
                      </span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-medium">Price Range</h4>
                <span className="text-sm text-maroon-700 font-medium">${priceMax}</span>
              </div>
              <input
                type="range"
                min={absoluteMin}
                max={absoluteMax}
                value={priceMax}
                onChange={(e) => {
                  setPage(1);
                  setPriceMax(Number(e.target.value));
                }}
                className="w-full accent-maroon-700"
              />
              <div className="flex justify-between text-xs text-maroon-900/40 mt-1">
                <span>${absoluteMin}</span>
                <span>${absoluteMax}</span>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-sm font-medium mb-3">Distance</h4>
              <ul className="space-y-2.5">
                {distanceOptions.map((opt) => (
                  <li key={opt}>
                    <label className="flex items-center gap-2.5 text-sm cursor-pointer">
                      <input
                        type="radio"
                        name="distance"
                        checked={distance === opt}
                        onChange={() => setDistance(opt)}
                        className="accent-maroon-700 w-4 h-4"
                      />
                      <span className={distance === opt ? "text-maroon-900" : "text-maroon-900/70"}>{opt}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-3">Minimum Rating</h4>
              <div className="flex gap-2">
                {ratingOptions.map((opt) => {
                  const numeric = Number(opt.replace(/\+|\s|★/g, "").trim()) || null;
                  return (
                    <button
                      key={opt}
                      onClick={() => {
                        setPage(1);
                        setRating(rating === numeric ? null : numeric);
                      }}
                      className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                        rating === numeric
                          ? "bg-maroon-700 text-white border-maroon-700"
                          : "border-maroon-200 text-maroon-900/70 hover:border-maroon-700"
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* Product grid */}
          <div>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 xs:gap-4 sm:gap-6">
              {(() => {
                const filtered = filterProducts(artisanalCakes);
                const totalResults = filtered.length;
                const totalPages = Math.max(1, Math.ceil(totalResults / pageSize));
                if (page > totalPages) setPage(1);

                const start = (page - 1) * pageSize;
                const paginated = filtered.slice(start, start + pageSize);

                return (
                  <>
                    {paginated.length === 0 ? (
                      <div className="col-span-full text-center py-10 text-maroon-900/60">No results for selected filters.</div>
                    ) : (
                      paginated.map((item) => {
                        const slug = item.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
                        return (
                          <Link
                            to={`/product/${slug}`}
                            key={item.id}
                            className="bg-white rounded-xl2 overflow-hidden shadow-card hover:shadow-cardHover transition-shadow block"
                          >
                            <div className="relative h-28 xs:h-36 sm:h-44">
                              <PhotoPlaceholder tone={item.tone} className="w-full h-full" />
                              <span className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-white text-maroon-700 text-[10px] sm:text-xs font-semibold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full shadow-sm">
                                ${item.price.toFixed(2)}
                              </span>
                            </div>
                            <div className="p-2.5 xs:p-3 sm:p-4">
                              <div className="flex items-start justify-between gap-2">
                                <h3 className="font-display font-medium text-sm sm:text-base leading-snug">{item.name}</h3>
                              </div>
                              <p className="text-[11px] sm:text-xs text-maroon-900/50 mt-1">By {item.baker}</p>
                              <p className="text-[11px] sm:text-xs text-maroon-700 mt-1">★ {Number(item.rating).toFixed(1)}</p>
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  addItem({ id: `cakes-${item.id}`, name: item.name, price: item.price, tone: item.tone, baker: item.baker });
                                }}
                                className="btn-primary w-full mt-2.5 sm:mt-3 !py-1.5 sm:!py-2 !px-2 text-[11px] sm:text-xs gap-1 sm:gap-1.5"
                              >
                                <ShoppingBag className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Add to Box
                              </button>
                            </div>
                          </Link>
                        );
                      })
                    )}
                  </>
                );
              })()}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-8 sm:mt-12">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-maroon-200 flex items-center justify-center hover:bg-maroon-700 hover:text-white hover:border-maroon-700 transition-colors shrink-0"
                aria-label="Previous page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {(() => {
                const filteredCount = filterProducts(artisanalCakes).length;
                const pages = Math.max(1, Math.ceil(filteredCount / pageSize));
                return Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
                  <button
                    key={n}
                    onClick={() => setPage(n)}
                    className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full text-sm font-medium transition-colors shrink-0 ${
                      page === n ? "bg-maroon-700 text-white" : "border border-maroon-200 hover:bg-maroon-50"
                    }`}
                  >
                    {n}
                  </button>
                ));
              })()}
              <button
                onClick={() => setPage((p) => p + 1)}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-maroon-200 flex items-center justify-center hover:bg-maroon-700 hover:text-white hover:border-maroon-700 transition-colors shrink-0"
                aria-label="Next page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
