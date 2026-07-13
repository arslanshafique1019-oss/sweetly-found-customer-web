import React, { useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { ShoppingBag, MapPin, Clock, Users, ShieldCheck, MessageCircle, UserPlus } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PhotoPlaceholder from "../components/PhotoPlaceholder";
import StarRating from "../components/StarRating";
import { bakerProfiles } from "../data/products";
import { useCart } from "../context/CartContext";

const veganImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuOc1toVSZHPGcLs2v1aw_-Pn367mNbXi5zh7eE0TsDyU-EFKbdQorDXG9&s=10";

const TABS = ["Products", "Reviews", "About"];

export default function BakerProfile() {
  const { slug } = useParams();
  const baker = bakerProfiles[slug];
  const [activeTab, setActiveTab] = useState("Products");
  const [following, setFollowing] = useState(false);
  const { addItem, notify } = useCart();

  if (!baker) return <Navigate to="/categories" replace />;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar showSearch />

      {/* Cover */}
      <section className="relative h-36 xs:h-44 md:h-64">
        <PhotoPlaceholder
          tone={baker.tone}
          imageSrc={slug === "vegan-vibes" ? veganImage : undefined}
          className="absolute inset-0 w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-maroon-900/60 via-maroon-900/10 to-transparent" />
      </section>

      <div className="container-page">
        {/* Header */}
        <div className="relative -mt-10 xs:-mt-12 md:-mt-16 flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-5 pb-6 sm:pb-8 border-b border-maroon-100">
          <PhotoPlaceholder
            tone={baker.tone}
            imageSrc={slug === "vegan-vibes" ? veganImage : undefined}
            className="w-20 h-20 xs:w-24 xs:h-24 md:w-32 md:h-32 rounded-full ring-4 ring-blush-100 shadow-card shrink-0"
          />
          <div className="flex-1 pb-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl xs:text-2xl md:text-3xl font-semibold font-display">{baker.name}</h1>
              {baker.badges.map((b) => (
                <span key={b} className="text-[11px] bg-blush-200 text-maroon-700 px-2.5 py-1 rounded-full">
                  {b}
                </span>
              ))}
            </div>
            <p className="text-sm text-maroon-900/60 mt-1">{baker.tagline}</p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 mt-3 text-xs text-maroon-900/60">
              <StarRating rating={baker.rating} />
              <span>{baker.reviewCount} reviews</span>
              <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {baker.followers} followers</span>
              <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {baker.location}</span>
            </div>
          </div>
          <div className="flex items-center gap-2.5 sm:gap-3 pb-1 shrink-0">
            <button
              onClick={() => notify(`Messaging isn't wired up yet — reach ${baker.name} through Sweetly Found support`)}
              className="btn-outline-maroon flex-1 sm:flex-none !py-2 sm:!py-2.5 !px-3.5 sm:!px-5 text-xs sm:text-sm gap-1.5"
            >
              <MessageCircle className="w-4 h-4" /> Message
            </button>
            <button
              onClick={() => setFollowing((f) => !f)}
              className={`flex-1 sm:flex-none !py-2 sm:!py-2.5 !px-3.5 sm:!px-5 text-xs sm:text-sm gap-1.5 rounded-full font-medium inline-flex items-center justify-center transition-colors ${
                following ? "bg-maroon-100 text-maroon-700" : "btn-primary"
              }`}
            >
              <UserPlus className="w-4 h-4" /> {following ? "Following" : "Follow"}
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-5 sm:gap-8 mt-6 border-b border-maroon-100 overflow-x-auto no-scrollbar">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-sm font-medium pb-3 -mb-px border-b-2 transition-colors shrink-0 ${
                activeTab === tab ? "text-maroon-700 border-maroon-700" : "text-maroon-900/50 border-transparent hover:text-maroon-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="py-6 sm:py-10">
          {activeTab === "Products" && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {baker.products.map((item) => (
                <div key={item.id} className="bg-white rounded-xl2 overflow-hidden shadow-card hover:shadow-cardHover transition-shadow">
                  <Link to="/product/lemon-blueberry-loaf" className="block h-28 xs:h-36">
                    <PhotoPlaceholder tone={item.tone} className="w-full h-full" />
                  </Link>
                  <div className="p-2.5 xs:p-4">
                    <h3 className="font-medium text-xs xs:text-sm leading-snug">{item.name}</h3>
                    <StarRating rating={item.rating} className="mt-1.5" />
                    <div className="flex items-center justify-between mt-2.5 xs:mt-3">
                      <span className="font-display font-semibold text-sm xs:text-base text-maroon-700">
                        ${item.price.toFixed(2)}
                        {item.unit && <span className="text-xs font-sans font-normal text-maroon-900/50"> {item.unit}</span>}
                      </span>
                      <button
                        onClick={() =>
                          addItem({
                            id: `${baker.slug}-${item.id}`,
                            name: item.name,
                            price: item.price,
                            unit: item.unit,
                            tone: item.tone,
                            baker: baker.name,
                          })
                        }
                        aria-label={`Add ${item.name} to bag`}
                        className="w-7 h-7 xs:w-8 xs:h-8 rounded-full bg-maroon-700 text-white flex items-center justify-center hover:bg-maroon-800 transition-colors shrink-0"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "Reviews" && (
            <div className="max-w-2xl space-y-4 sm:space-y-6">
              {baker.reviews.map((r) => (
                <div key={r.id} className="bg-white rounded-xl2 shadow-card p-4 sm:p-5 flex gap-3 sm:gap-4">
                  <PhotoPlaceholder tone="person" className="w-10 h-10 sm:w-11 sm:h-11 rounded-full shrink-0" />
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                      <p className="font-medium text-sm">{r.name}</p>
                      <span className="text-xs text-maroon-900/40">{r.date}</span>
                    </div>
                    <StarRating rating={r.rating} showValue={false} className="mt-1" />
                    <p className="text-sm text-maroon-900/70 leading-relaxed mt-2">{r.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "About" && (
            <div className="grid md:grid-cols-[1fr_280px] gap-6 sm:gap-10 max-w-4xl">
              <div>
                <h2 className="text-lg sm:text-xl font-semibold mb-3">About {baker.name}</h2>
                <p className="text-sm text-maroon-900/70 leading-relaxed">{baker.bio}</p>
              </div>
              <div className="bg-blush-200 rounded-xl2 p-5 sm:p-6 h-fit space-y-4">
                <div className="flex items-start gap-2.5 text-sm">
                  <Clock className="w-4 h-4 text-maroon-700 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium">Hours</p>
                    <p className="text-maroon-900/60">{baker.hours}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 text-sm">
                  <Users className="w-4 h-4 text-maroon-700 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium">Response time</p>
                    <p className="text-maroon-900/60">{baker.responseTime}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 text-sm">
                  <ShieldCheck className="w-4 h-4 text-maroon-700 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium">Member since</p>
                    <p className="text-maroon-900/60">{baker.memberSince}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
