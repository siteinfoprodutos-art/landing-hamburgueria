import { useEffect, useRef, useState } from 'react';
import { Flame, MessageCircle, ShoppingBag, ChevronDown } from 'lucide-react';
import { STORE_INFO } from '../data/menu';
import { RajuLogo } from './BurgerArtwork';

const TOTAL_FRAMES = 90;

interface EmberParticle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  driftX: number;
  alpha: number;
}

function createEmbers(count: number): EmberParticle[] {
  const list: EmberParticle[] = [];
  for (let i = 0; i < count; i++) {
    list.push({
      x: ((i * 73) % 100) / 100,
      y: ((i * 41) % 100) / 100,
      size: 1.2 + (i % 3) * 0.9,
      speedY: 0.0008 + (i % 4) * 0.0004,
      driftX: ((i % 5) - 2) * 0.0003,
      alpha: 0.22 + (i % 4) * 0.12,
    });
  }
  return list;
}

export function HeroScrollCanvas({
  onOpenOrder,
}: {
  onOpenOrder: () => void;
}) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const framesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const fallbackClosedRef = useRef<HTMLImageElement | null>(null);
  const fallbackOpenRef = useRef<HTMLImageElement | null>(null);
  const embersRef = useRef<EmberParticle[]>(createEmbers(22));

  const [loadedCount, setLoadedCount] = useState(0);
  const [isPreloadDone, setIsPreloadDone] = useState(false);
  const [useFallbackMode, setUseFallbackMode] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Preload /frames/frame_001.jpg .. frame_090.jpg with fallback to hamburguer-fechado.jpg & hamburguer-aberto.jpg
  useEffect(() => {
    let cancelled = false;
    let loaded = 0;
    let failed = 0;

    // Load fallback pair immediately as safety net & instant first frame
    const closedImg = new Image();
    closedImg.src = '/hamburguer-fechado.jpg';
    closedImg.onload = () => {
      if (!cancelled) fallbackClosedRef.current = closedImg;
    };

    const openImg = new Image();
    openImg.src = '/hamburguer-aberto.jpg';
    openImg.onload = () => {
      if (!cancelled) fallbackOpenRef.current = openImg;
    };

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const padded = String(i).padStart(3, '0');
      const img = new Image();
      img.decoding = 'async';
      img.src = `/frames/frame_${padded}.jpg`;

      img.onload = () => {
        if (cancelled) return;
        framesRef.current[i - 1] = img;
        loaded += 1;
        setLoadedCount(loaded);
        if (loaded + failed >= TOTAL_FRAMES) {
          setIsPreloadDone(true);
        }
      };

      img.onerror = () => {
        if (cancelled) return;
        failed += 1;
        if (failed >= 5 && loaded === 0) {
          setUseFallbackMode(true);
          setLoadedCount(TOTAL_FRAMES);
          setIsPreloadDone(true);
          return;
        }
        if (loaded + failed >= TOTAL_FRAMES) {
          if (loaded === 0) setUseFallbackMode(true);
          setIsPreloadDone(true);
        }
      };
    }

    return () => {
      cancelled = true;
    };
  }, []);

  // Track scroll progress through the ~300vh sticky hero section
  useEffect(() => {
    const updateScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const scrollable = Math.max(section.offsetHeight - window.innerHeight, 1);
      const scrolled = Math.min(Math.max(-rect.top, 0), scrollable);
      setScrollProgress(scrolled / scrollable);
    };

    updateScroll();
    window.addEventListener('scroll', updateScroll, { passive: true });
    window.addEventListener('resize', updateScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', updateScroll);
      window.removeEventListener('resize', updateScroll);
    };
  }, []);

  // Render active frame (or smooth crossfade + zoom fallback) + subtle embers onto fullscreen <canvas>
  useEffect(() => {
    let rafId = 0;

    const drawImageSmartCover = (
      ctx: CanvasRenderingContext2D,
      img: HTMLImageElement,
      cw: number,
      ch: number,
      extraZoom = 1
    ) => {
      const iw = img.naturalWidth || 1280;
      const ih = img.naturalHeight || 720;
      // On narrow portrait screens, blend between contain and cover so the burger never clips horizontally
      const coverScale = Math.max(cw / iw, ch / ih);
      const containScale = Math.min(cw / iw, ch / ih);
      const isPortrait = ch > cw * 1.1;
      const baseScale = isPortrait ? containScale * 1.28 : coverScale;
      const scale = baseScale * extraZoom;

      const dw = iw * scale;
      const dh = ih * scale;
      const dx = (cw - dw) / 2;
      const dy = isPortrait ? (ch - dh) * 0.44 : (ch - dh) / 2;
      ctx.drawImage(img, dx, dy, dw, dh);
    };

    const render = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const cw = canvas.clientWidth || window.innerWidth;
      const ch = canvas.clientHeight || window.innerHeight;

      if (canvas.width !== Math.round(cw * dpr) || canvas.height !== Math.round(ch * dpr)) {
        canvas.width = Math.round(cw * dpr);
        canvas.height = Math.round(ch * dpr);
      }

      ctx.save();
      ctx.scale(dpr, dpr);

      // Deep dark base (#0A0A0A)
      ctx.fillStyle = '#0A0A0A';
      ctx.fillRect(0, 0, cw, ch);

      // Warm radial orange fire glow behind burger
      const glow = ctx.createRadialGradient(
        cw * 0.5,
        ch * 0.48,
        cw * 0.04,
        cw * 0.5,
        ch * 0.48,
        Math.max(cw, ch) * 0.55
      );
      glow.addColorStop(0, 'rgba(244, 123, 32, 0.26)');
      glow.addColorStop(0.45, 'rgba(232, 48, 42, 0.09)');
      glow.addColorStop(1, 'rgba(10, 10, 10, 0)');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, cw, ch);

      const frameIdx = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.round(scrollProgress * (TOTAL_FRAMES - 1)))
      );

      // Find nearest loaded frame if exact frame hasn't arrived yet
      let targetFrame = framesRef.current[frameIdx];
      if (!targetFrame && !useFallbackMode) {
        for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
          if (frameIdx - offset >= 0 && framesRef.current[frameIdx - offset]) {
            targetFrame = framesRef.current[frameIdx - offset];
            break;
          }
          if (frameIdx + offset < TOTAL_FRAMES && framesRef.current[frameIdx + offset]) {
            targetFrame = framesRef.current[frameIdx + offset];
            break;
          }
        }
      }

      if (!useFallbackMode && targetFrame) {
        drawImageSmartCover(ctx, targetFrame, cw, ch, 1);
      } else if (fallbackClosedRef.current || fallbackOpenRef.current) {
        // Fallback: 2 images (hamburguer-fechado.jpg & hamburguer-aberto.jpg) with crossfade + subtle zoom
        const zoom = 1 + scrollProgress * 0.08;
        if (fallbackClosedRef.current) {
          ctx.globalAlpha = 1 - scrollProgress * 0.85;
          drawImageSmartCover(ctx, fallbackClosedRef.current, cw, ch, zoom);
        }
        if (fallbackOpenRef.current && scrollProgress > 0.02) {
          ctx.globalAlpha = Math.min(1, scrollProgress * 1.15);
          drawImageSmartCover(ctx, fallbackOpenRef.current, cw, ch, zoom);
        }
        ctx.globalAlpha = 1;
      }

      // Subtle rising embers ("brasas sutis")
      for (const p of embersRef.current) {
        p.y -= p.speedY;
        p.x += p.driftX;
        if (p.y < 0.05) p.y = 0.95;
        if (p.x < 0.05) p.x = 0.95;
        if (p.x > 0.95) p.x = 0.05;

        ctx.beginPath();
        ctx.arc(p.x * cw, p.y * ch, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(244, 123, 32, ${p.alpha})`;
        ctx.fill();
      }

      // Local top & bottom readability scrims (leaving middle burger bright and dramatic)
      const topScrim = ctx.createLinearGradient(0, 0, 0, ch * 0.24);
      topScrim.addColorStop(0, 'rgba(10, 10, 10, 0.82)');
      topScrim.addColorStop(1, 'rgba(10, 10, 10, 0)');
      ctx.fillStyle = topScrim;
      ctx.fillRect(0, 0, cw, ch * 0.24);

      const bottomScrim = ctx.createLinearGradient(0, ch * 0.48, 0, ch);
      bottomScrim.addColorStop(0, 'rgba(10, 10, 10, 0)');
      bottomScrim.addColorStop(0.55, 'rgba(10, 10, 10, 0.76)');
      bottomScrim.addColorStop(1, 'rgba(10, 10, 10, 0.96)');
      ctx.fillStyle = bottomScrim;
      ctx.fillRect(0, ch * 0.48, cw, ch * 0.52);

      ctx.restore();
    };

    rafId = window.requestAnimationFrame(render);
    return () => window.cancelAnimationFrame(rafId);
  }, [scrollProgress, loadedCount, useFallbackMode]);

  const preloadPercent = Math.min(100, Math.round((loadedCount / TOTAL_FRAMES) * 100));

  // Determine active text phase (1, 2, or 3)
  const activePhase = scrollProgress < 0.34 ? 1 : scrollProgress < 0.68 ? 2 : 3;

  const scrollToPhase = (targetRatio: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const sectionTop = section.offsetTop;
    const scrollable = Math.max(section.offsetHeight - window.innerHeight, 1);
    window.scrollTo({
      top: sectionTop + scrollable * targetRatio,
      behavior: 'smooth',
    });
  };

  return (
    <section
      ref={sectionRef}
      id="inicio"
      aria-label="Destaque cinematográfico Raju Burguer"
      className="relative h-[300vh] w-full bg-background"
    >
      <div className="sticky top-0 h-dvh w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full block"
          aria-hidden="true"
        />

        {/* Preloader HUD bar with Raju Logo + Orange Progress Bar */}
        {!isPreloadDone && (
          <div
            role="status"
            aria-live="polite"
            className="pointer-events-none absolute top-20 left-1/2 z-30 flex -translate-x-1/2 items-center gap-3 rounded-full border border-primary/40 bg-surface/95 px-4 py-2 shadow-lg"
          >
            <RajuLogo size={28} />
            <div className="min-w-[140px] sm:min-w-[180px]">
              <div className="mb-1 flex items-center justify-between text-xs font-medium text-foreground">
                <span>Preparando chapa</span>
                <span className="tabular-nums text-primary">{preloadPercent}%</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/15">
                <div
                  className="h-full rounded-full bg-primary transition-[width] duration-150 ease-out"
                  style={{ width: `${Math.max(8, preloadPercent)}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Phase-synchronized Foreground Copy */}
        <div className="relative z-20 mx-auto flex h-full max-w-[90rem] flex-col justify-end px-4 pt-20 pb-24 sm:px-8 md:pb-14">
          <div className="max-w-2xl min-w-0">
            {/* PHASE 1: 0.00 - 0.34 */}
            {activePhase === 1 && (
              <div className="transition-[opacity,transform] duration-200 ease-out">
                <p className="mb-2 font-accent text-sm italic tracking-wide text-cheese sm:text-base">
                  Desde 2025 · Laranjeiras, Caieiras-SP
                </p>
                <h1 className="font-display text-5xl leading-[0.94] tracking-wide text-foreground uppercase sm:text-7xl lg:text-8xl">
                  O HAMBÚRGUER QUE{' '}
                  <span className="text-primary">VOCÊ MERECE</span>
                </h1>
                <p className="mt-3 max-w-[34em] text-sm leading-relaxed text-muted sm:text-base">
                  Blend bovino artesanal grelhado na hora, queijo derretendo e pão brioche tostado na manteiga.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <a
                    href={STORE_INFO.anotaAiUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-control bg-primary px-6 font-display text-xl tracking-wider text-primary-foreground shadow-[0_8px_24px_-6px_rgba(244,123,32,0.65)] transition-[transform,background-color,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:bg-[#ff8930] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    <Flame className="h-5 w-5 shrink-0" aria-hidden="true" />
                    PEDIR AGORA
                  </a>
                  <button
                    type="button"
                    onClick={onOpenOrder}
                    className="inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-control border border-white/20 bg-surface/90 px-5 text-sm font-semibold text-foreground transition-[border-color,background-color,transform] duration-200 ease-out hover:-translate-y-0.5 hover:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    <ShoppingBag className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                    Montar Pedido
                  </button>
                </div>
              </div>
            )}

            {/* PHASE 2: 0.34 - 0.68 */}
            {activePhase === 2 && (
              <div className="transition-[opacity,transform] duration-200 ease-out">
                <p className="mb-2 font-accent text-sm italic tracking-wide text-primary sm:text-base">
                  Camada por camada, zero atalho
                </p>
                <h2 className="font-display text-5xl leading-[0.94] tracking-wide text-foreground uppercase sm:text-7xl lg:text-8xl">
                  BLEND ARTESANAL 150G ·{' '}
                  <span className="text-cheese">PÃO BRIOCHE</span>
                </h2>
                <p className="mt-3 max-w-[34em] text-sm leading-relaxed text-muted sm:text-base">
                  Carne suculenta selada na chapa quente, bacon crocante, vegetais frescos do dia e nossos molhos da casa.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <a
                    href="#mais-vendidos"
                    className="inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-control bg-primary px-6 font-display text-xl tracking-wider text-primary-foreground transition-[transform,background-color] duration-200 ease-out hover:-translate-y-0.5 hover:bg-[#ff8930] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    VER MAIS VENDIDOS
                  </a>
                </div>
              </div>
            )}

            {/* PHASE 3: 0.68 - 1.00 */}
            {activePhase === 3 && (
              <div className="transition-[opacity,transform] duration-200 ease-out">
                <p className="mb-2 font-accent text-sm italic tracking-wide text-cheese sm:text-base">
                  Delivery rápido em Laranjeiras e Caieiras
                </p>
                <h2 className="font-display text-5xl leading-[0.94] tracking-wide text-foreground uppercase sm:text-7xl lg:text-8xl">
                  FEITO NA HORA,{' '}
                  <span className="text-primary">ENTREGUE QUENTE</span>
                </h2>
                <p className="mt-3 max-w-[34em] text-sm leading-relaxed text-muted sm:text-base">
                  Escolha onde pedir: direto pelo iFood, pelo WhatsApp da Raju ou pelo nosso cardápio digital.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <a
                    href={STORE_INFO.ifoodUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-control bg-accent px-6 font-display text-xl tracking-wider text-accent-foreground shadow-[0_8px_24px_-6px_rgba(232,48,42,0.55)] transition-[transform,opacity] duration-200 ease-out hover:-translate-y-0.5 hover:opacity-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    PEDIR NO IFOOD
                  </a>
                  <a
                    href={STORE_INFO.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-control bg-whatsapp px-6 font-display text-xl tracking-wider text-primary-foreground transition-[transform,opacity] duration-200 ease-out hover:-translate-y-0.5 hover:opacity-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-whatsapp"
                  >
                    <MessageCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
                    WHATSAPP
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Scroll Phase Controls & Progress Bar */}
          <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-4">
            <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Fases da apresentação">
              {[
                { id: 1, label: '1 · O Burguer', ratio: 0.04 },
                { id: 2, label: '2 · Camadas 150g', ratio: 0.5 },
                { id: 3, label: '3 · Delivery Quente', ratio: 0.88 },
              ].map((step) => {
                const active = activePhase === step.id;
                return (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => scrollToPhase(step.ratio)}
                    aria-pressed={active}
                    className={`inline-flex min-h-9 items-center whitespace-nowrap rounded-full px-3.5 text-xs font-semibold transition-[background-color,color,border-color] duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                      active
                        ? 'bg-primary text-primary-foreground'
                        : 'border border-white/15 bg-surface/80 text-muted hover:border-primary/60 hover:text-foreground'
                    }`}
                  >
                    {step.label}
                  </button>
                );
              })}
            </div>

            <a
              href="#cardapio"
              className="hidden items-center gap-1.5 whitespace-nowrap text-xs font-medium text-muted transition-colors duration-150 hover:text-primary sm:inline-flex"
            >
              <span>Role para explorar as camadas</span>
              <ChevronDown className="h-4 w-4 text-primary" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
