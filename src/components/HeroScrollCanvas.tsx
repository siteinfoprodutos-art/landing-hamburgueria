import { type CSSProperties, useEffect, useRef, useState } from 'react';
import { ChevronDown, Clock, Flame, MessageCircle, Phone, ShieldCheck, Sparkles } from 'lucide-react';
import { STORE_INFO } from '../data/menu';
import { BrasaLogo } from './BurgerArtwork';

const CFG = {
  desktop: {
    key: 'desktop' as const,
    dir: '/frames/',
    total: 95,
    mode: 'cover' as const,
    scale: 1,
  },
  mobile: {
    key: 'mobile' as const,
    dir: '/frames_mobile/',
    total: 72,
    mode: 'fit' as const,
    scale: 1.4,
  },
} as const;

type HeroCfg = (typeof CFG)[keyof typeof CFG];
type PhaseId = 1 | 2 | 3 | 4;

interface DebugSnapshot {
  modeKey: HeroCfg['key'];
  drawMode: HeroCfg['mode'];
  scale: number;
  dir: string;
  total: number;
  currentFrame: number;
  progress: number;
  loaded: number;
  errors: number;
}

const EMBER_PARTICLES = [
  { left: '14%', bottom: '18%', size: 4, duration: '5.5s', delay: '0s' },
  { left: '26%', bottom: '24%', size: 3, duration: '7.2s', delay: '1.1s' },
  { left: '38%', bottom: '12%', size: 5, duration: '6.1s', delay: '0.4s' },
  { left: '49%', bottom: '20%', size: 3, duration: '5.8s', delay: '2.2s' },
  { left: '61%', bottom: '15%', size: 4, duration: '6.8s', delay: '0.8s' },
  { left: '72%', bottom: '26%', size: 3, duration: '5.2s', delay: '1.7s' },
  { left: '84%', bottom: '19%', size: 4, duration: '6.4s', delay: '2.9s' },
  { left: '20%', bottom: '36%', size: 3, duration: '7.0s', delay: '3.4s' },
  { left: '55%', bottom: '34%', size: 4, duration: '5.9s', delay: '1.5s' },
  { left: '79%', bottom: '38%', size: 3, duration: '6.6s', delay: '0.6s' },
] as const;

const PHASE_COPY: Record<
  PhaseId,
  {
    desktopBadge: string;
    titleStart: string;
    titleHighlight: string;
    highlightTone: 'primary' | 'cheese';
    subtitle: string;
  }
> = {
  1: {
    desktopBadge: 'Desde 2025 · Caieiras-SP',
    titleStart: 'O HAMBÚRGUER QUE ',
    titleHighlight: 'VOCÊ MERECE',
    highlightTone: 'primary',
    subtitle:
      'Blend bovino artesanal de 150g grelhado na brasa quente, queijo derretido e pão brioche tostado na manteiga.',
  },
  2: {
    desktopBadge: 'Sabor autêntico na brasa',
    titleStart: 'BLEND ARTESANAL ',
    titleHighlight: '150G',
    highlightTone: 'cheese',
    subtitle:
      '150g de carne bovina selada na grelha bem quente com tempero especial da casa e suculência incomparável.',
  },
  3: {
    desktopBadge: 'Crocância e maciez incomparáveis',
    titleStart: 'PÃO BRIOCHE TOSTADO ',
    titleHighlight: 'NA MANTEIGA',
    highlightTone: 'primary',
    subtitle:
      'Pão brioche macio, fofinho e dourado na chapa com manteiga de garrafa para selar todo o sabor.',
  },
  4: {
    desktopBadge: 'Diretamente para sua casa',
    titleStart: 'FEITO NA HORA, ',
    titleHighlight: 'ENTREGUE QUENTE',
    highlightTone: 'cheese',
    subtitle:
      'Entregas rápidas no bairro Laranjeiras e em toda Caieiras-SP. Peça agora pelo iFood, WhatsApp ou telefone!',
  },
};

const pad = (n: number) => String(n).padStart(3, '0');

export function HeroScrollCanvas() {
  const heroRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [modeKey, setModeKey] = useState<HeroCfg['key']>(() => {
    if (typeof window === 'undefined') return 'desktop';
    return window.matchMedia('(max-width: 768px)').matches ? 'mobile' : 'desktop';
  });
  const [activePhase, setActivePhase] = useState<PhaseId>(1);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [loadedPercent, setLoadedPercent] = useState(0);
  const [isPreloaded, setIsPreloaded] = useState(false);

  const [isDebug] = useState(() => {
    if (typeof window === 'undefined') return false;
    return new URLSearchParams(window.location.search).get('debug') === '1';
  });

  const [debugInfo, setDebugInfo] = useState<DebugSnapshot>(() => {
    const initialCfg =
      typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches
        ? CFG.mobile
        : CFG.desktop;
    return {
      modeKey: initialCfg.key,
      drawMode: initialCfg.mode,
      scale: initialCfg.scale,
      dir: initialCfg.dir,
      total: initialCfg.total,
      currentFrame: 1,
      progress: 0,
      loaded: 0,
      errors: 0,
    };
  });

  useEffect(() => {
    const heroNode = heroRef.current;
    const canvasNode = canvasRef.current;
    if (!heroNode || !canvasNode) return;

    const context = canvasNode.getContext('2d');
    if (!context) return;

    const hero: HTMLElement = heroNode;
    const canvas: HTMLCanvasElement = canvasNode;
    const ctx: CanvasRenderingContext2D = context;

    const mq = window.matchMedia('(max-width: 768px)');
    let cfg: HeroCfg = mq.matches ? CFG.mobile : CFG.desktop;
    let frames: (HTMLImageElement | null)[] = [];
    let current = 0;
    let target = 0;
    let lastIdx = -1;

    let loadVersion = 0;
    let loadedCount = 0;
    let errorCount = 0;
    let settledCount = 0;
    let safetyTimer: ReturnType<typeof setTimeout> | null = null;
    let rafId = 0;
    let disposed = false;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function getProgress(): number {
      const r = hero.getBoundingClientRect();
      const max = hero.offsetHeight - window.innerHeight;
      if (max <= 0) return 0;
      return Math.min(1, Math.max(0, -r.top / max));
    }

    function draw(i: number) {
      const cw = canvas.width;
      const ch = canvas.height;
      if (cw <= 0 || ch <= 0) return;

      ctx.fillStyle = '#0A0A0A';
      ctx.fillRect(0, 0, cw, ch);

      // Find exact frame or nearest loaded frame during initial streaming
      let img = frames[i];
      if (!img || !img.complete || img.naturalWidth === 0) {
        for (let offset = 1; offset < cfg.total; offset++) {
          const prev = frames[i - offset];
          if (prev && prev.complete && prev.naturalWidth > 0) {
            img = prev;
            break;
          }
          const next = frames[i + offset];
          if (next && next.complete && next.naturalWidth > 0) {
            img = next;
            break;
          }
        }
      }
      if (!img || !img.complete || img.naturalWidth === 0) return;

      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      const s =
        cfg.mode === 'cover'
          ? Math.max(cw / iw, ch / ih)
          : (cw / iw) * cfg.scale;
      const w = iw * s;
      const h = ih * s;
      const x = (cw - w) / 2;
      const y = cfg.mode === 'cover' ? (ch - h) / 2 : ch * 0.5 - h / 2;

      ctx.drawImage(img, x, y, w, h);

      // Soft top/bottom edge melt in fit mode so the 16:9 frame blends smoothly into #0A0A0A
      if (cfg.mode === 'fit') {
        const fade = Math.max(20, Math.round(h * 0.14));
        const topFade = ctx.createLinearGradient(0, y, 0, y + fade);
        topFade.addColorStop(0, 'rgba(10, 10, 10, 1)');
        topFade.addColorStop(1, 'rgba(10, 10, 10, 0)');
        ctx.fillStyle = topFade;
        ctx.fillRect(0, y - 2, cw, fade + 2);

        const botFade = ctx.createLinearGradient(0, y + h - fade, 0, y + h);
        botFade.addColorStop(0, 'rgba(10, 10, 10, 0)');
        botFade.addColorStop(1, 'rgba(10, 10, 10, 1)');
        ctx.fillStyle = botFade;
        ctx.fillRect(0, y + h - fade, cw, fade + 2);
      }
    }

    function resizeCanvas() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      const targetW = Math.max(1, Math.round(rect.width * dpr));
      const targetH = Math.max(1, Math.round(rect.height * dpr));
      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW;
        canvas.height = targetH;
      }
      const idx = Math.min(cfg.total - 1, Math.max(0, Math.round(current)));
      draw(idx);
      lastIdx = idx;
    }

    function updateTexts(progress: number) {
      const nextPhase: PhaseId =
        progress < 0.25 ? 1 : progress < 0.5 ? 2 : progress < 0.75 ? 3 : 4;
      setActivePhase((prev) => (prev !== nextPhase ? nextPhase : prev));
      setScrollProgress((prev) => (Math.abs(prev - progress) > 0.004 ? progress : prev));
    }

    function loadSequence(nextCfg: HeroCfg) {
      if (safetyTimer) {
        clearTimeout(safetyTimer);
        safetyTimer = null;
      }

      loadVersion += 1;
      const myVersion = loadVersion;

      cfg = nextCfg;
      setModeKey(cfg.key);

      // Isolated array per active sequence — never shared between desktop and mobile
      frames = new Array<HTMLImageElement | null>(cfg.total).fill(null);
      current = 0;
      target = getProgress() * (cfg.total - 1);
      lastIdx = -1;
      loadedCount = 0;
      errorCount = 0;
      settledCount = 0;

      setLoadedPercent(0);
      setIsPreloaded(false);

      const threshold90 = Math.ceil(cfg.total * 0.9);

      safetyTimer = setTimeout(() => {
        if (disposed || myVersion !== loadVersion) return;
        setIsPreloaded(true);
        resizeCanvas();
      }, 8000);

      const loadPromises = Array.from({ length: cfg.total }, (_, idx) => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          const frameNumber = idx + 1;
          img.src = `${cfg.dir}frame_${pad(frameNumber)}.webp`;

          const onDone = (ok: boolean) => {
            if (disposed || myVersion !== loadVersion) {
              resolve();
              return;
            }
            settledCount += 1;
            if (ok) {
              loadedCount += 1;
              frames[idx] = img;
              const wantedIdx = Math.min(cfg.total - 1, Math.max(0, Math.round(current)));
              if (idx === wantedIdx || lastIdx === -1) {
                draw(wantedIdx);
                lastIdx = wantedIdx;
              }
            } else {
              errorCount += 1;
            }

            const pct = Math.min(100, Math.round((settledCount / cfg.total) * 100));
            setLoadedPercent(pct);

            if (settledCount >= threshold90) {
              setIsPreloaded(true);
            }
            resolve();
          };

          img.onload = () => onDone(true);
          img.onerror = () => onDone(false);
        });
      });

      void Promise.allSettled(loadPromises).then(() => {
        if (disposed || myVersion !== loadVersion) return;
        if (safetyTimer) {
          clearTimeout(safetyTimer);
          safetyTimer = null;
        }
        setIsPreloaded(true);
        const wantedIdx = Math.min(cfg.total - 1, Math.max(0, Math.round(current)));
        draw(wantedIdx);
        lastIdx = wantedIdx;
      });
    }

    function tick() {
      if (disposed) return;

      const p = getProgress();
      target = p * (cfg.total - 1);
      if (prefersReducedMotion) {
        current = target;
      } else {
        current += (target - current) * 0.12;
      }

      const idx = Math.min(cfg.total - 1, Math.max(0, Math.round(current)));
      if (idx !== lastIdx) {
        draw(idx);
        lastIdx = idx;
      }

      updateTexts(p);

      if (isDebug) {
        setDebugInfo({
          modeKey: cfg.key,
          drawMode: cfg.mode,
          scale: cfg.scale,
          dir: cfg.dir,
          total: cfg.total,
          currentFrame: idx + 1,
          progress: Number(p.toFixed(3)),
          loaded: loadedCount,
          errors: errorCount,
        });
      }

      rafId = requestAnimationFrame(tick);
    }

    const handleMediaChange = (e: MediaQueryListEvent) => {
      const nextCfg = e.matches ? CFG.mobile : CFG.desktop;
      loadSequence(nextCfg);
      resizeCanvas();
    };

    const handleResize = () => {
      resizeCanvas();
    };

    resizeCanvas();
    loadSequence(cfg);
    updateTexts(getProgress());
    rafId = requestAnimationFrame(tick);

    mq.addEventListener('change', handleMediaChange);
    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('orientationchange', handleResize, { passive: true });

    return () => {
      disposed = true;
      cancelAnimationFrame(rafId);
      if (safetyTimer) clearTimeout(safetyTimer);
      mq.removeEventListener('change', handleMediaChange);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, [isDebug]);

  const isMobile = modeKey === 'mobile';
  const phaseIds: PhaseId[] = [1, 2, 3, 4];

  return (
    <section
      id="hero"
      ref={heroRef}
      style={{ height: '500vh', position: 'relative' }}
      aria-label="Apresentação do hambúrguer artesanal BRASA BURGER"
    >
      <span id="inicio" className="absolute top-0 left-0" aria-hidden="true" />

      <div
        className="stage"
        style={{
          position: 'sticky',
          top: 0,
          height: '100svh',
          overflow: 'hidden',
          background: '#0A0A0A',
        }}
      >
        {/* Scroll Canvas */}
        <canvas
          id="heroCanvas"
          ref={canvasRef}
          style={{ width: '100%', height: '100%', display: 'block' }}
          aria-hidden="true"
        />

        {/* Soft Orange Radial Glow Behind/Around Burger (rgba(244,123,32,.25)) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            background:
              'radial-gradient(circle at 50% 50%, rgba(244, 123, 32, 0.25) 0%, rgba(232, 48, 42, 0.08) 42%, rgba(10, 10, 10, 0) 72%)',
            mixBlendMode: 'screen',
          }}
        />

        {/* Lightweight Floating Ember Particles */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
          {EMBER_PARTICLES.map((ember, idx) => (
            <span
              key={idx}
              className="animate-ember-float absolute rounded-full bg-primary shadow-[0_0_8px_rgba(244,123,32,0.9)]"
              style={
                {
                  left: ember.left,
                  bottom: ember.bottom,
                  width: `${ember.size}px`,
                  height: `${ember.size}px`,
                  opacity: 0,
                  '--ember-duration': ember.duration,
                  '--ember-delay': ember.delay,
                } as CSSProperties
              }
            />
          ))}
        </div>

        {/* Desktop Left Text Contrast Scrim */}
        {!isMobile && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[56%]"
            style={{
              background:
                'linear-gradient(90deg, rgba(10,10,10,0.88) 0%, rgba(10,10,10,0.56) 62%, rgba(10,10,10,0) 100%)',
            }}
          />
        )}

        {/* Debug HUD (?debug=1) */}
        {isDebug && (
          <div className="fixed top-20 left-3 z-50 rounded-lg border border-primary/50 bg-black/90 p-3 font-mono text-xs text-primary shadow-2xl backdrop-blur-md">
            <p className="mb-1 border-b border-primary/30 pb-1 font-bold text-white">
              DEBUG HERO SCROLL
            </p>
            <p>
              Modo:{' '}
              <span className="font-bold uppercase text-cheese">
                {debugInfo.modeKey}
              </span>{' '}
              <span className="text-muted">
                ({debugInfo.drawMode}, x{debugInfo.scale})
              </span>
            </p>
            <p>
              Pasta: <span className="text-white">{debugInfo.dir}</span>
            </p>
            <p>
              Total: <span className="text-white">{debugInfo.total}</span>
            </p>
            <p>
              Frame atual:{' '}
              <span className="text-cheese">
                {debugInfo.currentFrame} / {debugInfo.total}
              </span>
            </p>
            <p>
              Progresso: <span className="text-white">{debugInfo.progress}</span>
            </p>
            <p>
              Carregados: <span className="text-whatsapp">{debugInfo.loaded}</span> | Erros:{' '}
              <span className="text-accent">{debugInfo.errors}</span>
            </p>
          </div>
        )}

        {/* Preloader Overlay */}
        {!isPreloaded && (
          <div
            role="status"
            aria-live="polite"
            className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-[#0A0A0A] px-6 pt-16 text-center sm:pt-20"
          >
            <BrasaLogo
              size={80}
              className="animate-pulse ring-4 ring-primary/40 shadow-[0_0_35px_rgba(244,123,32,0.5)]"
            />
            <h2 className="mt-5 font-display text-3xl tracking-wider text-foreground uppercase sm:text-4xl">
              ACENDENDO A BRASA...
            </h2>
            <p className="mt-1 font-accent text-sm italic text-cheese">
              Carregando experiência BRASA BURGER
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

        {/* Text Phases Overlay */}
        {isMobile ? (
          /* MOBILE OVERLAY: Top zone right below fixed header + Bottom zone above fixed bar */
          <div className="pointer-events-none relative z-20 mx-auto flex h-full max-w-[1200px] flex-col justify-between px-4 pt-[74px] pb-[92px]">
            {/* TOP ZONE: Badge + Phase Title */}
            <div className="pointer-events-auto relative w-full text-center">
              <div className="mb-1.5 inline-flex items-center gap-1.5 rounded-full border border-cheese/40 bg-black/75 px-3 py-1 text-[11px] font-semibold text-cheese backdrop-blur-md">
                <Flame className="h-3 w-3 text-primary" aria-hidden="true" />
                <span>Caieiras-SP · Hamburgueria artesanal</span>
              </div>

              <div className="relative min-h-[5.5rem]">
                {phaseIds.map((id) => {
                  const phase = PHASE_COPY[id];
                  const isActive = activePhase === id;
                  const HeadingTag = id === 1 ? 'h1' : 'h2';
                  return (
                    <div
                      key={id}
                      className={`transition-all duration-500 ease-out ${
                        isActive
                          ? 'relative z-10 translate-y-0 opacity-100 blur-0'
                          : 'pointer-events-none absolute inset-x-0 top-0 -translate-y-3 opacity-0 blur-[10px]'
                      }`}
                    >
                      <HeadingTag className="font-display text-[clamp(30px,9vw,44px)] leading-[0.94] tracking-wide text-foreground uppercase drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
                        {phase.titleStart}
                        <span className={phase.highlightTone === 'primary' ? 'text-primary' : 'text-cheese'}>
                          {phase.titleHighlight}
                        </span>
                      </HeadingTag>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* BOTTOM ZONE: Phase Subtitle + 2 Buttons (Pedir & Ligar) cleared from bottom bar and WhatsApp FAB */}
            <div className="pointer-events-auto relative mx-auto w-full max-w-[260px] text-center">
              <div className="relative mb-3 min-h-[3.25rem]">
                {phaseIds.map((id) => {
                  const phase = PHASE_COPY[id];
                  const isActive = activePhase === id;
                  return (
                    <p
                      key={id}
                      className={`text-xs leading-relaxed text-muted transition-all duration-500 ease-out ${
                        isActive
                          ? 'relative z-10 translate-y-0 opacity-100 blur-0'
                          : 'pointer-events-none absolute inset-x-0 bottom-0 translate-y-3 opacity-0 blur-[8px]'
                      }`}
                    >
                      {phase.subtitle}
                    </p>
                  );
                })}
              </div>

              <div className="flex items-center justify-center gap-2.5">
                <a
                  href={activePhase === 4 ? STORE_INFO.ifoodUrl : STORE_INFO.anotaAiUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 flex-1 items-center justify-center whitespace-nowrap rounded-control bg-primary px-4 font-display text-lg tracking-wider text-primary-foreground shadow-[0_8px_22px_-6px_rgba(244,123,32,0.65)] transition-transform duration-150 hover:-translate-y-0.5"
                >
                  PEDIR
                </a>
                <a
                  href={STORE_INFO.phoneTel}
                  className="inline-flex min-h-11 flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-control border border-white/25 bg-surface/95 px-4 font-display text-lg tracking-wider text-foreground backdrop-blur-md transition-colors hover:border-primary"
                >
                  <Phone className="h-4 w-4 text-primary" aria-hidden="true" />
                  <span>LIGAR</span>
                </a>
              </div>
            </div>
          </div>
        ) : (
          /* DESKTOP / TABLET OVERLAY (> 768px): Left Text Column + Right Floating Ingredient Cards */
          <div className="pointer-events-none relative z-20 mx-auto flex h-full max-w-[1200px] items-center justify-between px-10 pt-20 pb-20 lg:px-16">
            <div className="pointer-events-auto relative max-w-xl min-w-0">
              {phaseIds.map((id) => {
                const phase = PHASE_COPY[id];
                const isActive = activePhase === id;
                const HeadingTag = id === 1 ? 'h1' : 'h2';
                const BadgeIcon =
                  id === 1 ? Flame : id === 2 ? Sparkles : id === 3 ? ShieldCheck : Clock;
                const badgeColor =
                  id === 2
                    ? 'border-primary/40 text-primary'
                    : id === 4
                      ? 'border-whatsapp/40 text-whatsapp'
                      : 'border-cheese/40 text-cheese';

                return (
                  <div
                    key={id}
                    className={`transition-all duration-500 ease-out ${
                      isActive
                        ? 'relative z-10 translate-y-0 opacity-100 blur-0'
                        : 'pointer-events-none absolute inset-x-0 top-0 -translate-y-4 opacity-0 blur-[12px]'
                    }`}
                  >
                    <div
                      className={`mb-3 inline-flex items-center gap-2 rounded-full border bg-black/65 px-3.5 py-1 text-xs font-semibold backdrop-blur-md ${badgeColor}`}
                    >
                      <BadgeIcon className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>{phase.desktopBadge}</span>
                    </div>

                    <HeadingTag className="font-display text-[clamp(2.8rem,5.6vw,4.8rem)] leading-[0.92] tracking-wide text-foreground uppercase">
                      {phase.titleStart}
                      <span className={phase.highlightTone === 'primary' ? 'text-primary' : 'text-cheese'}>
                        {phase.titleHighlight}
                      </span>
                    </HeadingTag>

                    <p className="mt-4 text-base leading-relaxed text-muted">{phase.subtitle}</p>

                    {id === 1 && (
                      <div className="mt-6 flex items-center gap-3">
                        <a
                          href="#destaques"
                          className="inline-flex min-h-11 items-center justify-center rounded-control bg-primary px-6 font-display text-lg tracking-wider text-primary-foreground shadow-[0_8px_24px_-6px_rgba(244,123,32,0.65)] transition-transform duration-150 ease-out hover:-translate-y-0.5"
                        >
                          PEDIR AGORA
                        </a>
                        <span className="text-xs font-medium text-muted/85">
                          Role para explorar o lanche ↓
                        </span>
                      </div>
                    )}

                    {id === 4 && (
                      <div className="mt-7 flex flex-wrap items-center gap-3.5">
                        <a
                          href={STORE_INFO.ifoodUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-control bg-accent px-6 font-display text-xl tracking-wider text-accent-foreground shadow-[0_8px_24px_-6px_rgba(232,48,42,0.65)] transition-[transform,background-color] duration-150 ease-out hover:-translate-y-0.5 hover:bg-[#ff3b35]"
                        >
                          PEDIR NO IFOOD
                        </a>
                        <a
                          href={STORE_INFO.whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex min-h-12 items-center justify-center gap-2.5 whitespace-nowrap rounded-control bg-whatsapp px-6 font-display text-xl tracking-wider text-primary-foreground shadow-[0_8px_24px_-6px_rgba(37,211,102,0.45)] transition-[transform,background-color] duration-150 ease-out hover:-translate-y-0.5 hover:bg-[#20bd5a]"
                        >
                          <MessageCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
                          FALAR NO WHATSAPP
                        </a>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Right Floating Ingredient Cards (Desktop) */}
            <div className="pointer-events-auto hidden max-w-xs flex-col gap-3.5 lg:flex">
              <div
                className={`transform rounded-card border border-primary/40 bg-black/85 p-4 shadow-[0_8px_24px_rgba(244,123,32,0.25)] backdrop-blur-md transition-all duration-500 ease-out ${
                  activePhase >= 2
                    ? 'translate-x-0 scale-100 opacity-100'
                    : 'pointer-events-none translate-x-8 scale-90 opacity-0'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                    🥩
                  </span>
                  <div>
                    <h4 className="font-display text-lg leading-tight text-white uppercase">
                      Blend 150g na Brasa
                    </h4>
                    <p className="text-[11px] text-muted">Carne bovina com crosta selada e suculência</p>
                  </div>
                </div>
              </div>

              <div
                className={`transform rounded-card border border-cheese/40 bg-black/85 p-4 shadow-[0_8px_24px_rgba(245,181,46,0.25)] backdrop-blur-md transition-all duration-500 delay-100 ease-out ${
                  activePhase >= 2
                    ? 'translate-x-0 scale-100 opacity-100'
                    : 'pointer-events-none translate-x-8 scale-90 opacity-0'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cheese/20 text-cheese">
                    🧀
                  </span>
                  <div>
                    <h4 className="font-display text-lg leading-tight text-white uppercase">
                      Queijo Prato Derretido
                    </h4>
                    <p className="text-[11px] text-muted">Massa cremosa cobrindo o hambúrguer</p>
                  </div>
                </div>
              </div>

              <div
                className={`transform rounded-card border border-accent/40 bg-black/85 p-4 shadow-[0_8px_24px_rgba(232,48,42,0.25)] backdrop-blur-md transition-all duration-500 delay-150 ease-out ${
                  activePhase >= 3
                    ? 'translate-x-0 scale-100 opacity-100'
                    : 'pointer-events-none translate-x-8 scale-90 opacity-0'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent">
                    🍞
                  </span>
                  <div>
                    <h4 className="font-display text-lg leading-tight text-white uppercase">
                      Brioche Tostado
                    </h4>
                    <p className="text-[11px] text-muted">Dourado na manteiga de garrafa</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Scroll Cue Indicator (desktop/tablet, fades out after 5%) */}
        {!isMobile && (
          <div
            className={`absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-1 text-xs font-semibold text-muted transition-opacity duration-300 ${
              scrollProgress > 0.05 ? 'pointer-events-none opacity-0' : 'opacity-100'
            }`}
          >
            <span className="font-accent italic text-primary">Role para explorar</span>
            <ChevronDown className="h-4 w-4 animate-bounce text-primary" aria-hidden="true" />
          </div>
        )}

        {/* Fine Orange Scroll Progress Bar */}
        <div className="absolute right-0 bottom-0 left-0 z-30 h-1 bg-white/10">
          <div
            className="h-full bg-gradient-to-r from-accent via-primary to-cheese transition-[width] duration-75 ease-out"
            style={{ width: `${Math.min(100, Math.max(0, scrollProgress * 100))}%` }}
          />
        </div>
      </div>
    </section>
  );
}
