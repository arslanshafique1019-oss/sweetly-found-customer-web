import React from "react";
import { Link } from "react-router-dom";

// Lightweight inline social icons (lucide-react no longer ships brand marks).
const Instagram = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
  </svg>
);
const Facebook = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
    <path d="M14 9h2V6h-2c-1.7 0-3 1.3-3 3v2H9v3h2v6h3v-6h2.2l.8-3H14V9z" />
  </svg>
);
const Twitter = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
    <path d="M4 4l7.5 9.5L4.5 20H7l5-5.5L16 20h4l-8-10 6.8-6h-2.5l-4.5 5L8 4H4z" />
  </svg>
);

export default function Footer({ variant = "light" }) {
  const isDark = variant === "dark";

  // Map footer labels to internal routes where appropriate
  const ROUTES_MAP = {
    "About Us": "/#home-top",
    "Trending Now": "/#trending",
    Categories: "/categories",
    "Sell on Sweetly Found": "/sell-on-sweetly-found",
  };
  return (
    <footer className={isDark ? "bg-maroon-900 text-blush-100" : "bg-blush-200 text-maroon-900"}>
      <div className="container-page py-10 sm:py-14 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 text-center xs:text-left">
        <div className="xs:col-span-2 md:col-span-1">
          <h3 className="font-display text-lg font-semibold mb-3">Sweetly Found</h3>
          <p className={`text-sm leading-relaxed ${isDark ? "text-blush-100/70" : "text-maroon-900/70"}`}>
            Supporting local bakers and connecting them with dessert enthusiasts in every neighborhood.
          </p>
          <div className="flex gap-3 mt-5 justify-center xs:justify-start">
            {[Instagram, Facebook, Twitter].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className={`w-8 h-8 rounded-full flex items-center justify-center border transition-colors ${
                  isDark
                    ? "border-blush-100/30 hover:bg-blush-100/10"
                    : "border-maroon-900/20 hover:bg-maroon-900/10"
                }`}
                aria-label="Social link"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        <FooterColumn
          title="Explore"
          isDark={isDark}
          links={["About Us", "Trending Now", "Categories", "Sell on Sweetly Found"]}
          routesMap={ROUTES_MAP}
        />
        <FooterColumn
          title="Support"
          isDark={isDark}
          links={["Help Center", "Terms of Service", "Privacy Policy", "Contact Us"]}
        />
        <div>
          <h4 className="font-semibold text-sm mb-4 uppercase tracking-wide">Sweet Updates</h4>
          <p className={`text-sm mb-3 ${isDark ? "text-blush-100/70" : "text-maroon-900/70"}`}>
            Subscribe to get artisanal picks delivered to your inbox.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className={`flex items-center rounded-full overflow-hidden border max-w-xs mx-auto xs:mx-0 ${
              isDark ? "border-blush-100/30 bg-white/5" : "border-maroon-900/20 bg-white"
            }`}
          >
            <input
              type="email"
              placeholder="email@address.com"
              className="flex-1 min-w-0 bg-transparent px-4 py-2 text-sm outline-none placeholder:opacity-50"
            />
            <button
              type="submit"
              aria-label="Subscribe"
              className="bg-maroon-700 text-white w-9 h-9 flex items-center justify-center shrink-0 m-1 rounded-full hover:bg-maroon-800 transition-colors"
            >
              →
            </button>
          </form>
        </div>
      </div>

      <div
        className={`border-t ${
          isDark ? "border-blush-100/10" : "border-maroon-900/10"
        } py-5 text-xs`}
      >
        <div className="container-page flex flex-col sm:flex-row items-center text-center sm:text-left justify-between gap-2 opacity-70">
          <p>© 2026 Sweetly Found. Artisanal &amp; Hyperlocal.</p>
          <p>Made with love in Pakistan.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links, isDark, routesMap = {} }) {
  return (
    <div>
      <h4 className="font-semibold text-sm mb-4 uppercase tracking-wide">{title}</h4>
      <ul className="space-y-2.5 text-sm">
        {links.map((link) => {
          const to = routesMap[link];
          const className = `transition-colors ${
            isDark ? "text-blush-100/70 hover:text-blush-100" : "text-maroon-900/70 hover:text-maroon-900"
          }`;

          return (
            <li key={link}>
              {to ? (
                <Link to={to} className={className}>
                  {link}
                </Link>
              ) : (
                <a href="#" className={className}>
                  {link}
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
