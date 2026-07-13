import React from "react";
import { Link } from "react-router-dom";
import { Clock, MapPin, Wrench, Users } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PhotoPlaceholder from "../components/PhotoPlaceholder";

const benefits = [
  {
    icon: Clock,
    title: "Earn on Your Own Schedule",
    desc: "You decide when to bake and what to sell. Whether it's a weekends hobby or a full-time passion, Sweetly Found adapts to your lifestyle.",
  },
  {
    icon: MapPin,
    title: "Reach an Excess of Locals",
    desc: "Skip the marketing engine. We place your storefront in front of neighbors actively looking for quality treats.",
  },
  {
    icon: Wrench,
    title: "Simple Management Tools",
    desc: "Track orders, manage inventory, and dispatch payments all from beautiful, intuitive dashboard.",
  },
  {
    icon: Users,
    title: "Community First",
    desc: "Join a network of bakers who share tips, recipes, and mutual support so you're never baking alone.",
  },
];

const steps = [
  { number: "01", title: "Apply", desc: "Tell us about your craft. We'll get in touch quickly to walk you into the value of a fully-vetted artisan platform." },
  { number: "02", title: "Set Up Shop", desc: "Customize your digital storefront, add photos, pricing, and delivery preferences alongside categories and tools." },
  { number: "03", title: "Start Baking", desc: "Receive orders directly to your dashboard. Bake fresh, package with care, and delight your neighbors." },
];

export default function SellOnSweetlyFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="relative">
        <div className="relative h-[380px] xs:h-[420px] sm:h-[460px] md:h-[520px] overflow-hidden">

          {/* Background Image */}
          <img
            src="https://images.unsplash.com/photo-1774758935123-7d3bb69df565?w=1200&q=80&auto=format&fit=crop"
            alt="Sweetly Found Bakers"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-maroon-900/80 via-maroon-900/50 to-transparent"></div>

          {/* Content */}
          <div className="relative z-20 container-page h-full flex flex-col justify-center max-w-xl">
            <h1 className="font-display text-3xl xs:text-4xl md:text-5xl font-semibold text-white leading-tight">
              Share Your Passion, Feed Your Community.
            </h1>

            <p className="text-white/90 mt-3 sm:mt-4 text-sm sm:text-base md:text-lg max-w-md">
              Sweetly Found connects local artisanal bakers with neighbors who crave
              the warmth of homemade goodness. Turn your kitchen into a flourishing
              business.
            </p>

            <div className="flex flex-wrap gap-3 sm:gap-4 mt-6 sm:mt-8">
              <Link to="/account" className="btn-primary">
                Start Selling Today
              </Link>

              <a href="#how-it-works-bakers" className="btn-outline">
                Learn How It Works
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* Why bake with us */}
      <section id="why-bake-with-us" className="container-page py-10 sm:py-16 md:py-20">
        <h2 className="text-xl xs:text-2xl md:text-3xl font-semibold text-center mb-8 sm:mb-12">Why Bake With Us?</h2>
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
          {benefits.map((b) => (
            <div key={b.title} className="bg-white rounded-xl2 shadow-card p-5 sm:p-7 flex gap-4 sm:gap-5">
              <div className="w-12 h-12 rounded-full bg-maroon-700 text-white flex items-center justify-center shrink-0">
                <b.icon className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-display font-semibold text-lg mb-1.5">{b.title}</h3>
                <p className="text-sm text-maroon-900/60 leading-relaxed">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works for bakers */}
      <section id="how-it-works-bakers" className="bg-maroon-900 text-blush-100 py-10 sm:py-16 md:py-20">
        <div className="container-page">
          <div className="flex items-end justify-between mb-8 sm:mb-12">
            <h2 className="text-xl xs:text-2xl md:text-3xl font-semibold">How It Works for Bakers</h2>
            <a href="#how-it-works-bakers" className="hidden sm:inline text-sm text-blush-100/70 hover:text-blush-100 underline underline-offset-4">
              View Bakeable Guide →
            </a>
          </div>
          <div className="grid sm:grid-cols-3 gap-6 sm:gap-10">
            {steps.map((step) => (
              <div key={step.number}>
                <span className="font-display text-4xl sm:text-5xl font-semibold text-blush-100/20">{step.number}</span>
                <h3 className="font-display font-semibold text-xl mt-3 mb-2">{step.title}</h3>
                <p className="text-sm text-blush-100/60 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="container-page py-10 sm:py-16 md:py-20">
        <h2 className="text-xl xs:text-2xl md:text-3xl font-semibold text-center mb-8 sm:mb-10">Voices from the Kitchen</h2>
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-16 h-16 rounded-full mx-auto mb-5">
            <PhotoPlaceholder tone="person" className="w-full h-full rounded-full" />
          </div>
          <p className="font-display text-base xs:text-lg md:text-xl leading-relaxed text-maroon-900/90">
            "Sweetly Found gave me the confidence to share my family's recipes. What started as a hobby for my
            neighbors is now a thriving weekend business."
          </p>
          <p className="text-sm font-medium mt-5">Maria Rodriguez</p>
          <p className="text-xs text-maroon-900/50">Owner, Maria's Empanadas</p>
          <div className="flex justify-center gap-2 mt-6">
            <span className="w-2 h-2 rounded-full bg-maroon-700" />
            <span className="w-2 h-2 rounded-full bg-maroon-200" />
            <span className="w-2 h-2 rounded-full bg-maroon-200" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-page pb-10 sm:pb-16 md:pb-24">
        <div className="bg-maroon-700 rounded-xl2 text-center py-10 sm:py-14 px-5 sm:px-6">
          <h2 className="font-display text-xl xs:text-2xl md:text-3xl font-semibold text-white">
            Ready to turn flour into favor?
          </h2>
          <p className="text-blush-100/80 text-sm mt-3 max-w-md mx-auto">
            Your community is hungry for what only you can create. Start your shop in minutes.
          </p>
          <Link to="/account" className="btn-outline mt-8 !border-white !text-white hover:!bg-white hover:!text-maroon-700">
            Start Selling Today
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
