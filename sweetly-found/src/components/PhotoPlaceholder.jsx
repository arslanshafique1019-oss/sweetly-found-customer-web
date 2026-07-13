import React, { useState } from "react";

/**
 * PhotoPlaceholder
 * -----------------
 * Renders real product/lifestyle photography (free-to-use Unsplash images)
 * for each "tone", with a graceful gradient fallback if an image fails to
 * load (offline, blocked domain, etc). Swap PHOTOS[tone] for your own CDN
 * URLs whenever real brand photography is ready.
 */
const GRADIENTS = {
  bread: "from-[#c99a63] via-[#a9713f] to-[#6b1f38]",
  pastry: "from-[#e9aebd] via-[#c14f70] to-[#6b1f38]",
  cake: "from-[#f6d0d8] via-[#e9aebd] to-[#a13253]",
  hero: "from-[#3f1421] via-[#6b1f38] to-[#a13253]",
  cookie: "from-[#8a5a2b] via-[#6b1f38] to-[#3f1421]",
  vegan: "from-[#7c9473] via-[#4f6b46] to-[#3f1421]",
  person: "from-[#e9aebd] to-[#822643]",
  courier: "from-[#c99a63] to-[#3f1421]",
};

// Free-to-use (Unsplash License) images, one representative photo per tone.
// Requested at a fixed width/quality via Unsplash's imgix params (?w=&q=&auto=format).
const PHOTOS = {
  bread: "https://images.unsplash.com/photo-1509440159596-0249088772ff",
  pastry: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0",
  cake: "https://images.unsplash.com/photo-1578985545062-69928b1d9587",
  cookie: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e",

  // Home Hero Image
  hero: "https://images.unsplash.com/photo-1509440159596-0249088772ff",

  person: "https://i.pinimg.com/236x/a6/dc/09/a6dc09bbeeeca1fa6b38c92b81459698.jpg?nii=t",
  courier: "https://images.unsplash.com/photo-1551825687-f9de1603ed8b",
};

function buildSrc(tone, w) {
  const base = PHOTOS[tone];
  if (!base) return null;
  return `${base}?w=${w}&q=80&auto=format&fit=crop`;
}

export default function PhotoPlaceholder({
  tone = "pastry",
  icon: Icon,
  imageSrc,
  className = "",
  iconClassName = "w-8 h-8",
  width = 640,
}) {
  const [errored, setErrored] = useState(false);
  const gradient = GRADIENTS[tone] || GRADIENTS.pastry;
  const src = imageSrc || buildSrc(tone, width);

  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br ${gradient} ${className}`}
    >
      {src && !errored && (
        <img
          src={src}
          alt=""
          loading="lazy"
          onError={() => setErrored(true)}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      {(!src || errored) && (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_60%)]" />
      )}
      {Icon && (!src || errored) && <Icon className={`${iconClassName} text-white/90 relative`} strokeWidth={1.5} />}
    </div>
  );
}
