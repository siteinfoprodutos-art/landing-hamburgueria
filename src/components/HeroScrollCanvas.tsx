import { useEffect, useRef, useState } from 'react';
import { ChevronDown, MessageCircle } from 'lucide-react';
import { STORE_INFO } from '../data/menu';
import { BrasaLogo } from './BurgerArtwork';

const TOTAL_FRAMES = 95;

interface DebugInfo {
  progress: number;
  currentFrame: number;
  targetFrame: number;
  loadedCount: number;
  failedCount: number;
  rectTop: number;
  isMobile: boolean;
}

export function HeroScrollCanvas() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Cached frame images / bitmaps
  const frameImagesRef = useRef<(HTMLImageElement | ImageBitmap | null)[]>(
    new Array(TOTAL_FRAMES).fill(null)
  );

  // Loading states
  const [loadedPercent, setLoadedPercent] = useState(0);
  const [isPreloaded, setIsPreloaded] = useState(false);

  // Debug HUD mode (?debug=1)
  const [isDebug, setIsDebug] = useState(false);
  const [debugData, setDebugData] = useState<DebugInfo>({
    progress: 0,
    currentFrame: 1,
    targetFrame: 1,
    loadedCount: 0,
    failedCount: 0,
    rectTop: 0,
    isMobile: false,
  });

  // Progress Lerp refs (target index & lerp ~0.15)
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const lastDrawnFrameRef = useRef(-1);

  // Active Text Phase (1, 2, 3, 4)
  const [activePhase, setActivePhase] = useState<1 | 2 | 3 | 4>(1);

  // Check URL debug parameter ?debug=1
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      setIsDebug(params.get('debug') === '1');
    }
  }, []);

  // Preload 95 WebP Frames - Unmasks page immediately once frame 1 is ready!
  useEffect(() => {
    let cancelled = false;
    const isMobile = window.innerWidth < 640;

    let loadedCount = 0;
    let failedCount = 0;

    // Load Frame 1 immediately and release preloader
    const firstImg = new Image();
    firstImg.src = '/frames/frame_001.webp';
    firstImg.onload = () => {
      if (!cancelled) {
        frameImagesRef.current[0] = firstImg;
        setIsPreloaded(true); // Immediate unmask for instant scroll responsiveness
      }
    };
    firstImg.onerror = () => {
      if (!cancelled) setIsPreloaded(true);
    };

    // 1.5s safety timeout to release page regardless
    const safetyTimeout = setTimeout(() => {
      if (!cancelled) setIsPreloaded(true);
    }, 1500);

    // Load remaining frames in background
    const framesToLoad = Array.from({ length: TOTAL_FRAMES }, (_, i) => i).filter(
      (i) => i === 0 || !isMobile || i % 2 === 0
    );
    const totalToLoad = framesToLoad.length;

    framesToLoad.forEach((i) => {
      const frameNum = i + 1;
      const padded = String(frameNum).padStart(3, '0');
      const src = `/frames/frame_${padded}.webp`;

      const img = new Image();
      img.src = src;

      img.onload = () => {
        if (cancelled) return;
        if ('createImageBitmap' in window) {
          createImageBitmap(img)
            .then((bmp) => {
              if (!cancelled) frameImagesRef.current[i] = bmp;
            })
            .catch(() => {
              if (!cancelled) frameImagesRef.current[i] = img;
            })
            .finally(() => {
              loadedCount++;
              setLoadedPercent(Math.min(100, Math.round((loadedCount / totalToLoad) * 100)));
            });
        } else {
          frameImagesRef.current[i] = img;
          loadedCount++;
          setLoadedPercent(Math.min(100, Math.round((loadedCount / totalToLoad) * 100)));
        }
      };

      img.onerror = () => {
        // Fallback to JPG
        const jpgImg = new Image();
        jpgImg.src = `/frames/frame_${padded}.jpg`;
        jpgImg.onload = () => {
          if (cancelled) return;
          frameImagesRef.current[i] = jpgImg;
          loadedCount++;
          setLoadedPercent(Math.min(100, Math.round((loadedCount / totalToLoad) * 100)));
        };
        jpgImg.onerror = () => {
          failedCount++;
        };
      };
    });

    return () => {
      cancelled = true;
      clearTimeout(safetyTimeout);
    };
  }, []);

  // Main Canvas animation & real-time scroll evaluation loop (rAF)
  useEffect(() => {
    let rafId = 0;

    const renderLoop = () => {
      const hero = sectionRef.current;
      if (hero) {
        const rect = hero.getBoundingClientRect();
        const windowH = window.innerHeight || 800;
        const totalScrollable = Math.max(hero.offsetHeight - windowH, 1);
        const rawProgress = -rect.top / totalScrollable;
        const clampedProgress = Math.min(Math.max(rawProgress, 0), 1);

        targetProgressRef.current = clampedProgress;

        // Determine active text phase
        let phase: 1 | 2 | 3 | 4 = 1;
        if (clampedProgress < 0.25) phase = 1;
        else if (clampedProgress < 0.5) phase = 2;
        else if (clampedProgress < 0.75) phase = 3;
        else phase = 4;

        setActivePhase((prev) => (prev !== phase ? phase : prev));
      }

      // Lerp current progress smoothly (~0.15 speed)
      currentProgressRef.current +=
        (targetProgressRef.current - currentProgressRef.current) * 0.15;

      const curProg = currentProgressRef.current;
      const targetFrameIdx = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.round(curProg * (TOTAL_FRAMES - 1)))
      );

      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          const dpr = Math.min(window.devicePixelRatio || 1, 2);
          const cw = canvas.clientWidth || window.innerWidth;
          const ch = canvas.clientHeight || window.innerHeight;

          const targetW = Math.round(cw * dpr);
          const targetH = Math.round(ch * dpr);

          if (canvas.width !== targetW || canvas.height !== targetH) {
            canvas.width = targetW;
            canvas.height = targetH;
            lastDrawnFrameRef.current = -1; // Force redraw on resize
          }

          // Draw frame when frame index changes or canvas resizes
          if (lastDrawnFrameRef.current !== targetFrameIdx) {
            lastDrawnFrameRef.current = targetFrameIdx;

            ctx.save();
            ctx.scale(dpr, dpr);
            ctx.fillStyle = '#0A0A0A';
            ctx.fillRect(0, 0, cw, ch);

            // Subtle ember glow background
            const glow = ctx.createRadialGradient(
              cw * (cw > 768 ? 0.62 : 0.5),
              ch * 0.5,
              cw * 0.05,
              cw * (cw > 768 ? 0.62 : 0.5),
              ch * 0.5,
              Math.max(cw, ch) * 0.55
            );
            glow.addColorStop(0, 'rgba(244, 123, 32, 0.22)');
            glow.addColorStop(0.45, 'rgba(232, 48, 42, 0.08)');
            glow.addColorStop(1, 'rgba(10, 10, 10, 0)');
            ctx.fillStyle = glow;
            ctx.fillRect(0, 0, cw, ch);

            // Find best available frame
            let frameImg = frameImagesRef.current[targetFrameIdx];
            if (!frameImg) {
              const nearestIdx = targetFrameIdx - (targetFrameIdx % 2);
              frameImg =
                frameImagesRef.current[nearestIdx] ||
                frameImagesRef.current.find(Boolean) ||
                null;
            }

            if (frameImg) {
              const iw = frameImg.width || 1280;
              const ih = frameImg.height || 720;
              const isMobile = cw < 640;

              let scale = Math.max(cw / iw, ch / ih);
              if (isMobile) {
                scale *= 1.15; // Mobile centered zoom
              }

              const dw = iw * scale;
              const dh = ih * scale;
              const dx = (cw - dw) / 2;
              const dy = (ch - dh) / 2;

              ctx.drawImage(frameImg, dx, dy, dw, dh);
            }

            // Scrim overlay on left for high contrast text readability
            const scrimW = cw > 768 ? cw * 0.6 : cw;
            const leftScrim = ctx.createLinearGradient(0, 0, scrimW, 0);
            leftScrim.addColorStop(0, 'rgba(10, 10, 10, 0.94)');
            leftScrim.addColorStop(0.6, 'rgba(10, 10, 10, 0.76)');
            leftScrim.addColorStop(1, 'rgba(10, 10, 10, 0.1)');
            ctx.fillStyle = leftScrim;
            ctx.fillRect(0, 0, scrimW, ch);

            ctx.restore();
          }
        }
      }

      // Debug HUD update
      if (isDebug && sectionRef.current) {
        const hero = sectionRef.current;
        const rect = hero.getBoundingClientRect();
        setDebugData({
          progress: Number(curProg.toFixed(3)),
          currentFrame: targetFrameIdx + 1,
          targetFrame: Math.round(targetProgressRef.current * (TOTAL_FRAMES - 1)) + 1,
          loadedCount: frameImagesRef.current.filter(Boolean).length,
          failedCount: TOTAL_FRAMES - frameImagesRef.current.filter(Boolean).length,
          rectTop: Math.round(rect.top),
          isMobile: window.innerWidth < 640,
        });
      }

      rafId = requestAnimationFrame(renderLoop);
    };

    rafId = requestAnimationFrame(renderLoop);
    return () => cancelAnimationFrame(rafId);
  }, [isDebug]);

  const scrollRatio = targetProgressRef.current;

  return (
    <section
      id="hero"
      ref={sectionRef}
      style={{ height: '500vh', position: 'relative' }}
      aria-label="Apresentação do hambúrguer artesanal BRASA BURGER"
    >
      <div
        className="stage"
        style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', background: '#0A0A0A' }}
      >
        {/* Fullscreen Canvas */}
        <canvas
          id="heroCanvas"
          ref={canvasRef}
          style={{ width: '100%', height: '100%', display: 'block' }}
          aria-hidden="true"
        />

        {/* Debug HUD Overlay (?debug=1) */}
        {isDebug && (
          <div className="fixed top-20 left-4 z-50 rounded-lg border border-primary/50 bg-black/90 p-3 font-mono text-xs text-primary shadow-2xl backdrop-blur-md">
            <p className="font-bold text-white border-b border-primary/30 pb-1 mb-1">
              🛠️ DEBUG HERO SCROLL
            </p>
            <p>Progresso: <span className="text-white">{debugData.progress}</span></p>
            <p>Frame: <span className="text-cheese">{debugData.currentFrame} / {TOTAL_FRAMES}</span> (Alvo: {debugData.targetFrame})</p>
            <p>Carregados: <span className="text-whatsapp">{debugData.loadedCount}</span> | Falhas: <span className="text-accent">{debugData.failedCount}</span></p>
            <p>Dispositivo: <span className="text-white">{debugData.isMobile ? 'Celular (Skipped Frames)' : 'Desktop/Tablet'}</span></p>
            <p>Hero Rect Top: <span className="text-white">{debugData.rectTop}px</span></p>
          </div>
        )}

        {/* Preloader HUD Overlay */}
        {!isPreloaded && (
          <div
            role="status"
            aria-live="polite"
            className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-[#0A0A0A] px-6 text-center"
          >
            <BrasaLogo size={80} className="ring-4 ring-primary/40 animate-pulse shadow-[0_0_35px_rgba(244,123,32,0.5)]" />
            <h2 className="mt-5 font-display text-3xl tracking-wider text-foreground uppercase sm:text-4xl">
              ACENDENDO A BRASA...
            </h2>
            <p className="mt-1 font-accent text-sm italic text-cheese">
              Carregando o hambúrguer artesanal da BRASA BURGER
            </p>

            <div className="mt-6 w-full max-w-xs overflow-hidden rounded-full border border-white/20 bg-[#141414] p-1 shadow-inner">
              <div
                className="h-2 rounded-full bg-primary transition-[width] duration-150 ease-out"
                style={{ width: `${Math.max(6, loadedPercent)}%` }}
              />
            </div>
            <span className="mt-2 text-xs font-semibold tabular-nums text-primary">
              {loadedPercent}%
            </span>
          </div>
        )}

        {/* Hero Text Phase Overlays — Container Central max-w-[1200px] */}
        <div className="overlay relative z-20 mx-auto flex h-full max-w-[1200px] flex-col justify-center px-5 pt-16 pb-20 sm:px-10 lg:px-16 pointer-events-none">
          <div className="relative max-w-xl min-w-0 pointer-events-auto">
            {/* PHASE 1: 0 - 25% */}
            <div
              className={`transition-all duration-500 ease-out ${
                activePhase === 1
                  ? 'opacity-100 translate-y-0 blur-0 relative z-10'
                  : 'opacity-0 -translate-y-4 blur-[12px] absolute inset-x-0 top-0 pointer-events-none'
              }`}
            >
              <p className="mb-2 font-accent text-sm italic tracking-wide text-cheese sm:text-base">
                Desde 2025 · Caieiras-SP
              </p>
              <h1 className="font-display leading-[0.92] tracking-wide text-foreground uppercase text-[clamp(2.4rem,6.5vw,5rem)]">
                O HAMBÚRGUER QUE <span className="text-primary">VOCÊ MERECE</span>
              </h1>
              <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
                Blend bovino artesanal de 150g grelhado na brasa quente, queijo derretido e pão brioche macio tostado na manteiga.
              </p>
              <div className="mt-6">
                <a
                  href="#destaques"
                  className="inline-flex min-h-11 items-center justify-center rounded-control bg-primary px-6 font-display text-lg tracking-wider text-primary-foreground shadow-[0_8px_24px_-6px_rgba(244,123,32,0.65)] transition-transform duration-150 ease-out hover:-translate-y-0.5"
                >
                  PEDIR AGORA
                </a>
              </div>
            </div>

            {/* PHASE 2: 25 - 50% */}
            <div
              className={`transition-all duration-500 ease-out ${
                activePhase === 2
                  ? 'opacity-100 translate-y-0 blur-0 relative z-10'
                  : 'opacity-0 -translate-y-4 blur-[12px] absolute inset-x-0 top-0 pointer-events-none'
              }`}
            >
              <p className="mb-2 font-accent text-sm italic tracking-wide text-primary sm:text-base">
                Sabor autêntico na brasa
              </p>
              <h2 className="font-display leading-[0.92] tracking-wide text-foreground uppercase text-[clamp(2.4rem,6.5vw,5rem)]">
                BLEND ARTESANAL <span className="text-cheese">150G</span>
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
                150g de carne bovina selada na grelha bem quente com tempero especial da casa e suculência incomparável.
              </p>
            </div>

            {/* PHASE 3: 50 - 75% */}
            <div
              className={`transition-all duration-500 ease-out ${
                activePhase === 3
                  ? 'opacity-100 translate-y-0 blur-0 relative z-10'
                  : 'opacity-0 -translate-y-4 blur-[12px] absolute inset-x-0 top-0 pointer-events-none'
              }`}
            >
              <p className="mb-2 font-accent text-sm italic tracking-wide text-cheese sm:text-base">
                Crocância e maciez
              </p>
              <h2 className="font-display leading-[0.92] tracking-wide text-foreground uppercase text-[clamp(2.4rem,6.5vw,4.8rem)]">
                PÃO BRIOCHE TOSTADO <span className="text-primary">NA MANTEIGA</span>
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
                Pão brioche macio, fofinho e dourado na chapa com manteiga de garrafa para selar todo o sabor.
              </p>
            </div>

            {/* PHASE 4: 75 - 100% */}
            <div
              className={`transition-all duration-500 ease-out ${
                activePhase === 4
                  ? 'opacity-100 translate-y-0 blur-0 relative z-10'
                  : 'opacity-0 -translate-y-4 blur-[12px] absolute inset-x-0 top-0 pointer-events-none'
              }`}
            >
              <p className="mb-2 font-accent text-sm italic tracking-wide text-primary sm:text-base">
                Diretamente para sua casa
              </p>
              <h2 className="font-display leading-[0.92] tracking-wide text-foreground uppercase text-[clamp(2.4rem,6.5vw,5rem)]">
                FEITO NA HORA, <span className="text-cheese">ENTREGUE QUENTE</span>
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
                Entregas rápidas no bairro Laranjeiras e em toda Caieiras-SP. Peça agora pelo iFood ou WhatsApp!
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3.5">
                <a
                  href={STORE_INFO.ifoodUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-control bg-accent px-6 font-display text-xl tracking-wider text-accent-foreground shadow-[0_8px_24px_-6px_rgba(232,48,42,0.65)] transition-[transform,background-color] duration-150 ease-out hover:-translate-y-0.5 hover:bg-[#ff3b35] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  PEDIR NO IFOOD
                </a>
                <a
                  href={STORE_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center justify-center gap-2.5 whitespace-nowrap rounded-control bg-whatsapp px-6 font-display text-xl tracking-wider text-primary-foreground shadow-[0_8px_24px_-6px_rgba(37,211,102,0.45)] transition-[transform,background-color] duration-150 ease-out hover:-translate-y-0.5 hover:bg-[#20bd5a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-whatsapp"
                >
                  <MessageCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
                  FALAR NO WHATSAPP
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Cue Indicator (fades out after 5% scroll) */}
        <div
          className={`absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-1 text-xs font-semibold text-muted transition-opacity duration-300 ${
            scrollRatio > 0.05 ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <span className="font-accent italic text-primary">Role para explorar</span>
          <ChevronDown className="h-4 w-4 animate-bounce text-primary" aria-hidden="true" />
        </div>

        {/* Fine Orange Scroll Progress Bar */}
        <div className="absolute right-0 bottom-0 left-0 z-30 h-1 bg-white/10">
          <div
            className="h-full bg-gradient-to-r from-accent via-primary to-cheese transition-[width] duration-75 ease-out"
            style={{ width: `${Math.min(100, Math.max(0, scrollRatio * 100))}%` }}
          />
        </div>
      </div>
    </section>
  );
}
