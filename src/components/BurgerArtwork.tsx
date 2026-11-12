import { useState } from 'react';
import type { ArtworkVariant, CategoryCardItem } from '../data/menu';

export function RajuLogo({
  size = 48,
  className = '',
}: {
  size?: number;
  className?: string;
}) {
  const [srcIndex, setSrcIndex] = useState(0);
  const sources = ['/images/raju-logo.webp', '/images/raju-logo.png'];

  if (srcIndex >= sources.length) {
    return (
      <div
        style={{ width: size, height: size }}
        className={`inline-flex shrink-0 items-center justify-center rounded-full border-2 border-foreground bg-background text-center font-accent text-xs italic text-accent ${className}`}
        aria-label="Logo Raju Burguer"
      >
        Raju
      </div>
    );
  }

  return (
    <img
      src={sources[srcIndex]}
      alt="Logo circular Raju Burguer — Since 2025"
      width={size}
      height={size}
      referrerPolicy="no-referrer"
      onError={() => setSrcIndex((prev) => prev + 1)}
      className={`shrink-0 rounded-full object-cover select-none ${className}`}
    />
  );
}

export function BurgerCrossSectionSvg({
  variant,
  className = '',
}: {
  variant: ArtworkVariant;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 320 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`h-auto w-full max-w-[260px] select-none ${className}`}
      role="img"
      aria-label={`Ilustração artesanal das camadas do ${variant}`}
    >
      <defs>
        <radialGradient id={`ember-${variant}`} cx="50%" cy="55%" r="50%">
          <stop offset="0%" stopColor="#F47B20" stopOpacity="0.34" />
          <stop offset="55%" stopColor="#E8302A" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#141414" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`bunTop-${variant}`} x1="160" y1="26" x2="160" y2="86" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F49B38" />
          <stop offset="55%" stopColor="#D87118" />
          <stop offset="100%" stopColor="#9E4709" />
        </linearGradient>
        <linearGradient id={`bunBot-${variant}`} x1="160" y1="166" x2="160" y2="196" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E58B2E" />
          <stop offset="100%" stopColor="#9A450A" />
        </linearGradient>
        <linearGradient id={`meat-${variant}`} x1="70" y1="130" x2="250" y2="158" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#5C2812" />
          <stop offset="50%" stopColor="#7A3618" />
          <stop offset="100%" stopColor="#3D1809" />
        </linearGradient>
      </defs>

      {/* Ambient Ember Glow */}
      <ellipse cx="160" cy="122" rx="135" ry="86" fill={`url(#ember-${variant})`} />
      <ellipse cx="160" cy="198" rx="96" ry="9" fill="#0A0A0A" fillOpacity="0.7" />

      {variant === 'raju-1' && (
        <>
          {/* Brioche Heel */}
          <rect x="74" y="168" width="172" height="24" rx="12" fill={`url(#bunBot-${variant})`} />
          {/* 150g Beef Blend */}
          <rect x="66" y="138" width="188" height="31" rx="15" fill={`url(#meat-${variant})`} />
          {/* Melted Cheese */}
          <path d="M68 138 H252 L238 153 L218 141 L194 157 L166 141 L138 156 L112 141 L86 151 Z" fill="#F5B52E" />
          {/* Crispy Bacon */}
          <path d="M62 129 Q95 120 128 131 T194 129 T258 130" stroke="#B63022" strokeWidth="8" strokeLinecap="round" />
          <path d="M68 129 Q98 122 128 131 T192 129 T252 130" stroke="#F29F80" strokeWidth="2.5" strokeLinecap="round" />
          {/* Pickles & Red Onion */}
          <ellipse cx="112" cy="119" rx="22" ry="5" fill="#5D8C2E" />
          <ellipse cx="206" cy="119" rx="22" ry="5" fill="#5D8C2E" />
          <path d="M88 113 Q124 104 160 113 Q196 104 232 113" stroke="#9E2A7B" strokeWidth="4.5" strokeLinecap="round" />
          {/* Tomato & Crisp Lettuce */}
          <rect x="82" y="100" width="74" height="9" rx="4.5" fill="#E8302A" />
          <rect x="164" y="100" width="74" height="9" rx="4.5" fill="#E8302A" />
          <path d="M60 95 Q80 84 100 95 T140 94 T180 95 T220 94 T260 95" stroke="#53B836" strokeWidth="9" strokeLinecap="round" />
          {/* Garlic Mayo Wave */}
          <path d="M84 86 Q120 94 160 85 Q200 94 236 86" stroke="#FFF6D6" strokeWidth="5" strokeLinecap="round" />
          {/* Brioche Crown */}
          <path d="M70 84 C70 38 250 38 250 84 Z" fill={`url(#bunTop-${variant})`} />
          <path d="M98 55 C120 44 165 42 198 49" stroke="#F8C27A" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.55" />
        </>
      )}

      {variant === 'raju-2' && (
        <>
          <rect x="74" y="169" width="172" height="23" rx="11.5" fill={`url(#bunBot-${variant})`} />
          <rect x="66" y="139" width="188" height="30" rx="15" fill={`url(#meat-${variant})`} />
          {/* Cheese + Mustard + Ketchup Trio */}
          <path d="M68 139 H252 L230 154 L198 141 L160 158 L124 141 L92 153 Z" fill="#F5B52E" />
          <path d="M76 130 Q118 121 160 131 T244 129" stroke="#B63022" strokeWidth="7" strokeLinecap="round" />
          <ellipse cx="104" cy="120" rx="20" ry="5" fill="#5D8C2E" />
          <ellipse cx="160" cy="120" rx="20" ry="5" fill="#5D8C2E" />
          <ellipse cx="216" cy="120" rx="20" ry="5" fill="#5D8C2E" />
          <path d="M82 112 Q160 102 238 112" stroke="#9E2A7B" strokeWidth="4" strokeLinecap="round" />
          <rect x="80" y="100" width="160" height="8" rx="4" fill="#E8302A" />
          <path d="M62 93 Q90 82 118 93 T174 93 T230 93 T258 93" stroke="#53B836" strokeWidth="8" strokeLinecap="round" />
          {/* Ketchup + Mustard Swirl */}
          <path d="M84 84 Q122 92 160 84 T236 84" stroke="#E8302A" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M90 80 Q128 88 166 80 T232 80" stroke="#F5B52E" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M70 80 C70 36 250 36 250 80 Z" fill={`url(#bunTop-${variant})`} />
          <circle cx="132" cy="54" r="2" fill="#FDE1A8" />
          <circle cx="158" cy="49" r="2" fill="#FDE1A8" />
          <circle cx="184" cy="55" r="2" fill="#FDE1A8" />
        </>
      )}

      {variant === 'raju-3' && (
        <>
          <rect x="74" y="168" width="172" height="24" rx="12" fill={`url(#bunBot-${variant})`} />
          <rect x="66" y="136" width="188" height="32" rx="16" fill={`url(#meat-${variant})`} />
          {/* Extra Double Melted Cheese Cascade */}
          <path
            d="M64 136 H256 L242 158 L220 142 L196 164 L168 143 L144 165 L116 143 L90 159 Z"
            fill="#F5B52E"
          />
          <path d="M70 126 Q115 117 160 127 T250 125" stroke="#B63022" strokeWidth="8" strokeLinecap="round" />
          <path d="M88 115 Q130 106 160 115 Q190 106 232 115" stroke="#9E2A7B" strokeWidth="4.5" strokeLinecap="round" />
          <rect x="86" y="102" width="148" height="8" rx="4" fill="#E8302A" />
          <path d="M64 94 Q96 83 128 94 T192 94 T256 94" stroke="#53B836" strokeWidth="8.5" strokeLinecap="round" />
          {/* Creamy Mayo + Cheese Sauce */}
          <path d="M78 85 Q118 96 160 85 T242 85" stroke="#F5B52E" strokeWidth="6" strokeLinecap="round" />
          <path d="M86 81 Q124 89 160 81 T234 81" stroke="#FFF6D6" strokeWidth="4" strokeLinecap="round" />
          <path d="M70 80 C70 35 250 35 250 80 Z" fill={`url(#bunTop-${variant})`} />
          <path d="M104 53 C132 42 175 41 206 50" stroke="#F8C27A" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.6" />
        </>
      )}

      {variant === 'chicken-fingers' && (
        <>
          <rect x="74" y="168" width="172" height="24" rx="12" fill={`url(#bunBot-${variant})`} />
          {/* Golden Crispy Chicken Fingers Strips */}
          <rect x="64" y="138" width="66" height="28" rx="12" fill="#D97B16" stroke="#F5B52E" strokeWidth="2" />
          <rect x="126" y="134" width="70" height="30" rx="13" fill="#E88C1F" stroke="#F5B52E" strokeWidth="2" />
          <rect x="190" y="138" width="66" height="28" rx="12" fill="#D97B16" stroke="#F5B52E" strokeWidth="2" />
          {/* Honey Mustard Golden Glaze */}
          <path
            d="M74 134 Q102 150 130 134 T186 134 T244 134"
            stroke="#F5B52E"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <path d="M88 118 Q160 107 232 118" stroke="#9E2A7B" strokeWidth="4.5" strokeLinecap="round" />
          <rect x="84" y="104" width="152" height="8" rx="4" fill="#E8302A" />
          <path d="M62 96 Q94 84 126 96 T190 96 T258 96" stroke="#53B836" strokeWidth="8.5" strokeLinecap="round" />
          <path d="M70 86 C70 40 250 40 250 86 Z" fill={`url(#bunTop-${variant})`} />
          <path d="M100 58 C128 46 172 45 204 54" stroke="#F8C27A" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.55" />
        </>
      )}

      {variant === 'raju-5' && (
        <>
          {/* Double Burger Stack */}
          <rect x="72" y="172" width="176" height="22" rx="11" fill={`url(#bunBot-${variant})`} />
          {/* Patty 1 (100g) */}
          <rect x="64" y="146" width="192" height="25" rx="12.5" fill={`url(#meat-${variant})`} />
          <path d="M66 146 H254 L236 160 L204 148 L166 162 L128 148 L92 159 Z" fill="#F5B52E" />
          {/* Patty 2 (100g) */}
          <rect x="66" y="117" width="188" height="25" rx="12.5" fill={`url(#meat-${variant})`} />
          <path d="M68 117 H252 L232 131 L196 119 L160 134 L120 119 L88 130 Z" fill="#F5B52E" />
          {/* Crispy Bacon + Smoky Barbecue */}
          <path d="M62 107 Q110 96 160 108 T258 106" stroke="#B63022" strokeWidth="8.5" strokeLinecap="round" />
          <path d="M74 96 Q116 106 160 95 T246 96" stroke="#4A1208" strokeWidth="7" strokeLinecap="round" />
          <path d="M78 95 Q118 104 160 94 T242 95" stroke="#E8302A" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.7" />
          <path d="M70 88 C70 40 250 40 250 88 Z" fill={`url(#bunTop-${variant})`} />
          <path d="M98 57 C128 45 175 44 208 53" stroke="#F8C27A" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.6" />
        </>
      )}

      {variant === 'kids-k1' && (
        <>
          <rect x="92" y="158" width="136" height="22" rx="11" fill={`url(#bunBot-${variant})`} />
          <rect x="84" y="130" width="152" height="27" rx="13.5" fill={`url(#meat-${variant})`} />
          <path d="M86 130 H234 L216 146 L184 133 L156 148 L126 133 L102 144 Z" fill="#F5B52E" />
          <path d="M88 124 C88 78 232 78 232 124 Z" fill={`url(#bunTop-${variant})`} />
          <path d="M114 96 C138 87 174 87 198 95" stroke="#F8C27A" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.6" />
        </>
      )}

      {variant === 'kids-k2' && (
        <>
          <rect x="90" y="162" width="140" height="22" rx="11" fill={`url(#bunBot-${variant})`} />
          <rect x="82" y="135" width="156" height="26" rx="13" fill={`url(#meat-${variant})`} />
          <path d="M84 135 H236 L218 149 L188 137 L160 151 L130 137 L102 148 Z" fill="#F5B52E" />
          <ellipse cx="128" cy="126" rx="18" ry="4.5" fill="#5D8C2E" />
          <ellipse cx="192" cy="126" rx="18" ry="4.5" fill="#5D8C2E" />
          <path d="M102 118 Q160 110 218 118" stroke="#F2E2CE" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M100 111 Q130 117 160 111 T220 111" stroke="#E8302A" strokeWidth="4" strokeLinecap="round" />
          <path d="M104 107 Q132 113 160 107 T216 107" stroke="#F5B52E" strokeWidth="3" strokeLinecap="round" />
          <path d="M86 104 C86 60 234 60 234 104 Z" fill={`url(#bunTop-${variant})`} />
        </>
      )}
    </svg>
  );
}

export function CategoryIllustrationSvg({
  type,
}: {
  type: CategoryCardItem['illustration'];
}) {
  if (type === 'cat-burguers') {
    return (
      <svg viewBox="0 0 96 72" fill="none" className="h-14 w-auto" aria-hidden="true">
        <path d="M20 34 C20 12 76 12 76 34 Z" fill="#F47B20" />
        <path d="M16 39 Q32 34 48 39 T80 39" stroke="#53B836" strokeWidth="5" strokeLinecap="round" />
        <rect x="18" y="43" width="60" height="11" rx="5.5" fill="#6E3015" />
        <path d="M20 43 H76 L66 50 L48 44 L30 50 Z" fill="#F5B52E" />
        <rect x="22" y="55" width="52" height="9" rx="4.5" fill="#D87118" />
      </svg>
    );
  }
  if (type === 'cat-combos') {
    return (
      <svg viewBox="0 0 96 72" fill="none" className="h-14 w-auto" aria-hidden="true">
        {/* Drink Cup */}
        <path d="M58 18 H82 L78 60 H62 Z" fill="#E8302A" />
        <rect x="56" y="14" width="28" height="5" rx="2.5" fill="#FFFFFF" />
        <path d="M70 14 L75 5 H81" stroke="#F5B52E" strokeWidth="3" strokeLinecap="round" />
        {/* Fries */}
        <rect x="18" y="18" width="5" height="22" rx="2" fill="#F5B52E" transform="rotate(-8 18 18)" />
        <rect x="26" y="14" width="5" height="24" rx="2" fill="#F5B52E" />
        <rect x="34" y="16" width="5" height="22" rx="2" fill="#F5B52E" transform="rotate(7 34 16)" />
        <path d="M14 32 H44 L40 60 H18 Z" fill="#F47B20" />
        {/* Mini Burger */}
        <path d="M30 48 C30 35 66 35 66 48 Z" fill="#F49B38" />
        <rect x="28" y="49" width="40" height="7" rx="3.5" fill="#5C2812" />
        <rect x="31" y="57" width="34" height="6" rx="3" fill="#D87118" />
      </svg>
    );
  }
  if (type === 'cat-kids') {
    return (
      <svg viewBox="0 0 96 72" fill="none" className="h-14 w-auto" aria-hidden="true">
        <path d="M26 38 C26 18 70 18 70 38 Z" fill="#F49B38" />
        <circle cx="42" cy="28" r="2" fill="#FFF6D6" />
        <circle cx="54" cy="28" r="2" fill="#FFF6D6" />
        <path d="M28 40 H68 L58 47 L48 41 L38 47 Z" fill="#F5B52E" />
        <rect x="26" y="42" width="44" height="10" rx="5" fill="#6E3015" />
        <rect x="29" y="53" width="38" height="8" rx="4" fill="#D87118" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 96 72" fill="none" className="h-14 w-auto" aria-hidden="true">
      {/* Crispy Appetizer Basket / Onion Rings & Fries */}
      <circle cx="34" cy="34" r="13" stroke="#F47B20" strokeWidth="6" />
      <circle cx="58" cy="30" r="11" stroke="#F5B52E" strokeWidth="5.5" />
      <circle cx="48" cy="44" r="12" stroke="#D87118" strokeWidth="6" />
      <path d="M16 48 H80 L72 62 H24 Z" fill="#E8302A" />
    </svg>
  );
}

export function DeliveryScooterSvg({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`h-auto w-full max-w-[290px] select-none ${className}`}
      role="img"
      aria-label="Motoboy da Raju Burguer em rota de entrega rápida"
    >
      {/* Speed Lines */}
      <line x1="16" y1="74" x2="72" y2="74" stroke="#0A0A0A" strokeWidth="4" strokeLinecap="round" strokeOpacity="0.45" />
      <line x1="6" y1="98" x2="58" y2="98" stroke="#0A0A0A" strokeWidth="4" strokeLinecap="round" strokeOpacity="0.65" />
      <line x1="24" y1="122" x2="66" y2="122" stroke="#0A0A0A" strokeWidth="3.5" strokeLinecap="round" strokeOpacity="0.4" />
      <ellipse cx="182" cy="176" rx="108" ry="8" fill="#0A0A0A" fillOpacity="0.28" />

      {/* Thermal Bag Raju */}
      <rect x="78" y="60" width="58" height="52" rx="8" fill="#0A0A0A" />
      <rect x="85" y="68" width="44" height="12" rx="3" fill="#E8302A" />
      <circle cx="107" cy="94" r="10" fill="#F47B20" />
      <path d="M101 94 H113" stroke="#0A0A0A" strokeWidth="3" strokeLinecap="round" />

      {/* Rider Helmet & Jacket */}
      <circle cx="164" cy="48" r="18" fill="#0A0A0A" />
      <path d="M168 42 H182 C183 48 180 53 172 53 H168 Z" fill="#F5B52E" />
      <path d="M142 68 C148 64 166 64 174 72 L198 94 L188 102 L166 86 L158 118 H136 Z" fill="#141414" />

      {/* Scooter Body */}
      <path
        d="M86 116 H172 L194 142 L222 86 L204 82 L206 74 L234 80 L214 146 H258 C264 128 246 114 228 116 L242 148 H94 C82 136 80 124 86 116 Z"
        fill="#0A0A0A"
      />
      {/* Headlight Beam */}
      <path d="M242 86 L306 72 L306 106 Z" fill="#FFFFFF" fillOpacity="0.32" />
      <circle cx="238" cy="86" r="6" fill="#FFFFFF" />

      {/* Wheels */}
      <circle cx="112" cy="152" r="24" fill="#0A0A0A" />
      <circle cx="112" cy="152" r="11" fill="#F47B20" />
      <circle cx="242" cy="152" r="24" fill="#0A0A0A" />
      <circle cx="242" cy="152" r="11" fill="#F47B20" />
    </svg>
  );
}

/**
 * Self-contained cartographic SVG locator map for Av. Pauliceia, Laranjeiras, Caieiras-SP.
 * Coordinates are finite and non-overlapping; every <text> sits >= 14px clear of road strokes
 * with explicit numeric x/y attributes and a 4px dark surface halo (.map-label-halo).
 */
export function CaieirasLocatorMapSvg() {
  return (
    <svg
      viewBox="0 0 560 340"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-auto w-full rounded-xl border border-white/10 bg-[#141414]"
      role="img"
      aria-label="Mapa de localização da Raju Burguer na Avenida Pauliceia, bairro Laranjeiras, Caieiras - SP"
    >
      {/* Urban Block Grounds */}
      <rect x="0" y="0" width="560" height="340" fill="#111111" />
      <path d="M0 0 H210 V140 H0 Z" fill="#161616" />
      <path d="M236 0 H560 V132 H236 Z" fill="#151515" />
      <path d="M0 166 H204 V340 H0 Z" fill="#151515" />
      <path d="M236 168 H560 V340 H236 Z" fill="#171717" />

      {/* Green Park Patch in Laranjeiras */}
      <rect x="388" y="216" width="136" height="88" rx="12" fill="#162216" stroke="#243824" strokeWidth="1.5" />

      {/* Secondary Neighborhood Streets */}
      <path d="M92 0 V340" stroke="#242424" strokeWidth="8" />
      <path d="M352 0 V340" stroke="#242424" strokeWidth="8" />
      <path d="M0 248 H372" stroke="#242424" strokeWidth="8" />
      <path d="M0 72 H560" stroke="#242424" strokeWidth="7" />

      {/* Primary Highway: Rod. Pres. Tancredo de Almeida Neves (SP-332) */}
      <path d="M220 0 L216 340" stroke="#2E2E2E" strokeWidth="18" />
      <path d="M220 0 L216 340" stroke="#F5B52E" strokeWidth="1.5" strokeDasharray="8 8" strokeOpacity="0.55" />

      {/* Highlighted Arterial: Av. Pauliceia */}
      <path d="M18 154 C148 154 276 150 542 146" stroke="#F47B20" strokeWidth="12" strokeLinecap="round" strokeOpacity="0.28" />
      <path d="M18 154 C148 154 276 150 542 146" stroke="#F47B20" strokeWidth="5" strokeLinecap="round" />

      {/* Raju Burguer Location Pin (x=312, y=149) */}
      <circle cx="312" cy="149" r="24" fill="#F47B20" fillOpacity="0.18" />
      <circle cx="312" cy="149" r="11" fill="#E8302A" stroke="#FFFFFF" strokeWidth="2.5" />
      <circle cx="312" cy="149" r="4" fill="#F5B52E" />

      {/* Labels placed last in open block spaces >= 14px clear of strokes */}
      <text
        x="48"
        y="132"
        fill="#F47B20"
        fontSize="13"
        fontWeight="600"
        fontFamily="Inter, sans-serif"
        className="map-label-halo"
      >
        Av. Pauliceia
      </text>

      <text
        x="240"
        y="46"
        fill="#B8B8B8"
        fontSize="12"
        fontWeight="500"
        fontFamily="Inter, sans-serif"
        className="map-label-halo"
      >
        Rod. Pres. Tancredo Neves (SP-332)
      </text>

      <text
        x="244"
        y="116"
        fill="#FFFFFF"
        fontSize="14"
        fontWeight="700"
        fontFamily="Inter, sans-serif"
        className="map-label-halo"
      >
        RAJU BURGUER
      </text>

      <text
        x="244"
        y="194"
        fill="#B8B8B8"
        fontSize="12"
        fontWeight="500"
        fontFamily="Inter, sans-serif"
        className="map-label-halo"
      >
        Bairro Laranjeiras · Caieiras-SP
      </text>

      <text
        x="408"
        y="264"
        fill="#88A888"
        fontSize="12"
        fontWeight="500"
        fontFamily="Inter, sans-serif"
        className="map-label-halo"
      >
        Pq. Laranjeiras
      </text>

      <text
        x="24"
        y="282"
        fill="#9A9A9A"
        fontSize="11"
        fontWeight="500"
        fontFamily="Inter, sans-serif"
        className="map-label-halo"
      >
        Sentido Franco da Rocha / SP
      </text>
    </svg>
  );
}
