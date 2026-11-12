import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Award,
  Bike,
  CheckCircle2,
  ChevronRight,
  Clock,
  ExternalLink,
  Flame,
  Instagram,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  ShoppingBag,
  Sparkles,
  Star,
  UtensilsCrossed,
  X,
  ZoomIn,
} from 'lucide-react';
import {
  GALLERY_PHOTOS,
  HIGHLIGHT_ITEMS,
  STORE_INFO,
  TESTIMONIALS,
  type GalleryPhoto,
} from '../data/menu';
import { CaieirasLocatorMapSvg, BrasaLogo } from './BurgerArtwork';

// 2. FAIXA DE CONFIANÇA (4 itens)
const TRUST_ITEMS = [
  {
    icon: Flame,
    title: 'Blend artesanal 150g',
    detail: 'Carne bovina de alta qualidade selada na brasa',
  },
  {
    icon: Sparkles,
    title: 'Pão brioche',
    detail: 'Macio, fofinho e tostado na manteiga',
  },
  {
    icon: UtensilsCrossed,
    title: 'Feito na hora',
    detail: 'Preparo artesanal e ingredientes do dia',
  },
  {
    icon: Bike,
    title: 'Delivery rápido',
    detail: 'Hambúrguer quentinho em Laranjeiras e Caieiras-SP',
  },
] as const;

// 5. COMO PEDIR (3 passos)
const ORDER_STEPS = [
  {
    step: '01',
    title: 'Escolha no cardápio',
    description: 'Navegue pelos nossos burguers artesanais, porções crocantes e bebidas geladas.',
    icon: ShoppingBag,
  },
  {
    step: '02',
    title: 'Peça no iFood ou WhatsApp',
    description: 'Faça seu pedido diretamente pelo iFood, pelo nosso site ou conversando no WhatsApp.',
    icon: MessageCircle,
  },
  {
    step: '03',
    title: 'Receba quentinho',
    description: 'Nossa equipe prepara na hora e o motoboy entrega rapidinho na sua casa em Caieiras.',
    icon: Bike,
  },
] as const;

export function BurgerSections() {
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);
  const [showWaTooltip, setShowWaTooltip] = useState(false);

  // WhatsApp Tooltip: appears after 4s, hides after 10s
  useEffect(() => {
    const showTimer = setTimeout(() => setShowWaTooltip(true), 4000);
    const hideTimer = setTimeout(() => setShowWaTooltip(false), 10000);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <>
      {/* 4. TRANSIÇÃO HERO -> HISTÓRIA: Dissolving Smoke & Ember Divider */}
      <div className="relative -mt-10 z-30 h-24 w-full bg-gradient-to-b from-transparent via-[#0A0A0A]/80 to-[#0A0A0A] pointer-events-none">
        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      </div>

      {/* 2. FAIXA DE CONFIANÇA */}
      <motion.section
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        aria-label="Diferenciais da BRASA BURGER"
        className="relative z-20 border-y border-white/10 bg-surface shadow-2xl"
      >
        <div className="mx-auto max-w-[1200px] px-5 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 divide-y divide-white/10 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
            {TRUST_ITEMS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="flex min-w-0 items-center gap-4 py-6 sm:px-4 lg:py-7"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-control bg-primary/10 text-primary ring-1 ring-primary/30 shadow-[0_0_15px_rgba(244,123,32,0.2)]">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <h2 className="font-display text-2xl tracking-wide text-foreground uppercase">
                      {item.title}
                    </h2>
                    <p className="text-xs text-muted">{item.detail}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* 3. NOSSA HISTÓRIA (Layout 2 Colunas: Foto + Texto) */}
      <section
        id="sobre"
        aria-labelledby="heading-sobre"
        className="relative scroll-mt-20 border-b border-white/10 bg-background py-20 lg:py-[120px]"
      >
        <div className="mx-auto max-w-[1200px] px-5 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Foto da Cozinha / Balcão com Máscara e Sombra */}
            <motion.div
              initial={{ opacity: 0, x: -30, scale: 0.97 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative min-w-0 lg:col-span-6"
            >
              <div className="relative overflow-hidden rounded-card border border-white/15 bg-surface shadow-[0_20px_50px_-15px_rgba(244,123,32,0.3)]">
                <img
                  src="/images/raju_story_kitchen_1794492089378.jpg"
                  alt="Chefe preparando blend artesanal na chapa da BRASA BURGER"
                  width={600}
                  height={450}
                  referrerPolicy="no-referrer"
                  className="h-auto w-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between rounded-control border border-white/15 bg-black/85 px-4 py-3 backdrop-blur-md">
                  <div className="flex items-center gap-3">
                    <BrasaLogo size={36} />
                    <div>
                      <p className="font-display text-lg leading-none tracking-wide text-foreground uppercase">
                        BRASA BURGER
                      </p>
                      <p className="text-xs font-medium text-cheese">Desde 2025 · Caieiras-SP</p>
                    </div>
                  </div>
                  <span className="font-accent text-xs italic text-primary">100% Artesanal</span>
                </div>
              </div>
            </motion.div>

            {/* Conteúdo da História com Revelação */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="min-w-0 lg:col-span-6"
            >
              <p className="font-accent text-sm italic tracking-wide text-primary">
                Conheça nossa tradição
              </p>
              <h2
                id="heading-sobre"
                className="mt-1 font-display leading-[0.95] tracking-wide text-foreground uppercase text-[clamp(2.2rem,5vw,3.8rem)]"
              >
                PAIXÃO POR <span className="text-primary">HAMBÚRGUER ARTESANAL</span>
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
                Nascida em <strong className="font-semibold text-foreground">2025 no bairro Laranjeiras, em Caieiras-SP</strong>, a BRASA BURGER foi criada para quem não abre mão de sabor de verdade e carne artesanal selada na brasa.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                Nossa receita combina carne bovina selecionada em blend de 150g selado na grelha bem quente, pão brioche fofinho tostado na manteiga, queijos derretidos e molhos artesanais preparados diariamente na nossa cozinha.
              </p>

              <div className="mt-7 grid grid-cols-2 gap-4 border-t border-white/10 pt-6 text-sm font-semibold text-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0" aria-hidden="true" />
                  <span>Carne Moída na Hora</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0" aria-hidden="true" />
                  <span>Pão Brioche Tostado</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0" aria-hidden="true" />
                  <span>Maionese Verde Caseira</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0" aria-hidden="true" />
                  <span>Entrega Rápida &amp; Quente</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Soft Bottom Transition Gradient */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-[#0D0D0D] pointer-events-none" />
      </section>

      {/* 4. DESTAQUES (3 Cards Grandes) */}
      <section
        id="destaques"
        aria-labelledby="heading-destaques"
        className="relative scroll-mt-20 border-b border-white/10 bg-[#0D0D0D] py-20 lg:py-[120px]"
      >
        <div className="mx-auto max-w-[1200px] px-5 sm:px-10 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12 text-center"
          >
            <p className="font-accent text-sm italic tracking-wide text-cheese sm:text-base">
              Os favoritos da casa
            </p>
            <h2
              id="heading-destaques"
              className="mt-1 font-display leading-[0.95] tracking-wide text-foreground uppercase text-[clamp(2.4rem,5.5vw,4.2rem)]"
            >
              DESTAQUES DA <span className="text-primary">BRASA BURGER</span>
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
              Nossos três hambúrgueres campeões de pedidos, preparados com blend bovino artesanal e pão brioche tostado.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {HIGHLIGHT_ITEMS.map((item, idx) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 35, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="group flex min-w-0 flex-col justify-between overflow-hidden rounded-card border border-primary/40 bg-surface shadow-[0_14px_36px_-10px_rgba(244,123,32,0.25)] transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-2 hover:border-primary hover:shadow-[0_24px_48px_-10px_rgba(244,123,32,0.48)]"
              >
                <div>
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/60">
                    <img
                      src={item.imageSrc}
                      alt={item.name}
                      width={400}
                      height={300}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-108"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-90" />
                    {item.tag && (
                      <span className="absolute top-3 right-3 rounded-full bg-accent px-3 py-1 font-accent text-xs italic text-accent-foreground shadow-md">
                        ★ {item.tag}
                      </span>
                    )}
                    <span className="absolute bottom-3 left-4 font-display text-xl text-cheese">
                      {item.code}
                    </span>
                  </div>

                  <div className="p-6">
                    <h3 className="font-display text-3xl tracking-wider text-foreground uppercase transition-colors group-hover:text-primary">
                      {item.name}
                    </h3>
                    <p className="mt-1 font-accent text-xs italic text-cheese">
                      {item.tagline}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-white/10 px-6 py-4">
                  <span className="font-display text-xl tracking-wide text-primary">
                    {item.startingPriceLabel}
                  </span>
                  <a
                    href={STORE_INFO.ifoodUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-foreground transition-colors hover:text-primary"
                  >
                    <span>Pedir agora</span>
                    <ChevronRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </a>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Único botão "Ver cardápio completo" */}
          <div className="mt-14 text-center">
            <a
              href={STORE_INFO.anotaAiUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2.5 whitespace-nowrap rounded-control bg-primary px-8 font-display text-xl tracking-wider text-primary-foreground shadow-[0_8px_24px_-6px_rgba(244,123,32,0.6)] transition-[transform,background-color] duration-150 ease-out hover:-translate-y-0.5 hover:bg-[#ff8930] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <span>VER CARDÁPIO COMPLETO</span>
              <ExternalLink className="h-5 w-5" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-[#0A0A0A] pointer-events-none" />
      </section>

      {/* 5. COMO PEDIR (3 passos simples) */}
      <section
        aria-labelledby="heading-como-pedir"
        className="relative border-b border-white/10 bg-background py-20 lg:py-[120px]"
      >
        <div className="mx-auto max-w-[1200px] px-5 sm:px-10 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12 text-center"
          >
            <p className="font-accent text-sm italic tracking-wide text-primary">
              Passo a passo descomplicado
            </p>
            <h2
              id="heading-como-pedir"
              className="mt-1 font-display leading-[0.95] tracking-wide text-foreground uppercase text-[clamp(2.4rem,5.5vw,4rem)]"
            >
              COMO <span className="text-primary">PEDIR SEU BURGUER</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {ORDER_STEPS.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="relative flex flex-col items-center rounded-card border border-white/12 bg-surface p-8 text-center shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-[0_12px_32px_-10px_rgba(244,123,32,0.3)]"
                >
                  <span className="absolute top-4 left-5 font-display text-4xl font-bold text-white/10">
                    {step.step}
                  </span>
                  <div className="my-3 flex h-16 w-16 items-center justify-center rounded-full bg-primary/15 text-primary ring-2 ring-primary/40 shadow-[0_0_20px_rgba(244,123,32,0.25)]">
                    <Icon className="h-8 w-8" aria-hidden="true" />
                  </div>
                  <h3 className="mt-3 font-display text-2xl tracking-wider text-foreground uppercase">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-[#0A0A0A] pointer-events-none" />
      </section>

      {/* 6. GALERIA (Grade de 6 Fotos com Modal de Zoom) */}
      <section
        id="galeria"
        aria-labelledby="heading-galeria"
        className="relative border-b border-white/10 bg-[#0A0A0A] py-20 lg:py-[120px]"
      >
        <div className="mx-auto max-w-[1200px] px-5 sm:px-10 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10 text-center"
          >
            <p className="font-accent text-sm italic tracking-wide text-cheese">
              Imagens reais da nossa chapa
            </p>
            <h2
              id="heading-galeria"
              className="mt-1 font-display leading-[0.95] tracking-wide text-foreground uppercase text-[clamp(2.4rem,5.5vw,4rem)]"
            >
              NOSSA <span className="text-primary">GALERIA</span>
            </h2>
            <p className="mt-2 text-sm text-muted">
              Toque em qualquer imagem para ver em tela cheia com detalhes.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {GALLERY_PHOTOS.map((photo, idx) => (
              <motion.button
                key={photo.id}
                type="button"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.4, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => setSelectedPhoto(photo)}
                className="group relative aspect-[4/3] overflow-hidden rounded-card border border-white/15 bg-surface text-left shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  width={400}
                  height={300}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-95" />
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <div>
                    <span className="font-accent text-[11px] italic text-cheese">
                      {photo.category}
                    </span>
                    <h3 className="font-display text-xl tracking-wide text-foreground uppercase">
                      {photo.title}
                    </h3>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md transition-transform duration-300 group-hover:scale-110">
                    <ZoomIn className="h-4 w-4" aria-hidden="true" />
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-[#0E0E0E] pointer-events-none" />
      </section>

      {/* Lightbox Modal de Zoom */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={`Visualização expandida: ${selectedPhoto.title}`}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 px-4 py-8 backdrop-blur-md"
            onClick={() => setSelectedPhoto(null)}
          >
            <div
              className="relative max-h-[90vh] max-w-4xl overflow-hidden rounded-card border border-white/20 bg-surface p-2 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedPhoto(null)}
                aria-label="Fechar foto"
                className="absolute top-4 right-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/80 text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.alt}
                className="max-h-[75vh] w-full rounded-lg object-contain"
              />
              <div className="p-4 text-center">
                <span className="font-accent text-xs italic text-cheese">
                  {selectedPhoto.category}
                </span>
                <h3 className="font-display text-2xl tracking-wide text-foreground uppercase">
                  {selectedPhoto.title}
                </h3>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 7. DEPOIMENTOS (3 cards de clientes) */}
      <section
        aria-labelledby="heading-depoimentos"
        className="relative border-b border-white/10 bg-[#0E0E0E] py-20 lg:py-[120px]"
      >
        <div className="mx-auto max-w-[1200px] px-5 sm:px-10 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <p className="font-accent text-sm italic tracking-wide text-primary">
              Avaliações reais dos nossos clientes
            </p>
            <h2
              id="heading-depoimentos"
              className="mt-1 font-display leading-[0.95] tracking-wide text-foreground uppercase text-[clamp(2.4rem,5.5vw,4rem)]"
            >
              QUEM PROVA, <span className="text-primary">RECOMENDA</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((dep, idx) => (
              <motion.div
                key={dep.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col justify-between rounded-card border border-white/12 bg-surface p-6 shadow-lg transition-transform duration-300 hover:-translate-y-1.5 hover:border-primary/40"
              >
                <div>
                  <div className="mb-3 flex items-center gap-1 text-cheese">
                    {Array.from({ length: dep.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-cheese text-cheese" aria-hidden="true" />
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed text-foreground/90 italic">
                    &ldquo;{dep.comment}&rdquo;
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-xs">
                  <div>
                    <span className="font-semibold text-foreground">{dep.author}</span>
                    <span className="block text-muted">{dep.neighborhood}</span>
                  </div>
                  <span className="text-muted/70">{dep.dateText}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-[#0A0A0A] pointer-events-none" />
      </section>

      {/* 8. ONDE ESTAMOS (Mapa incorporado + Endereço + Horários) */}
      <section
        id="contato"
        aria-labelledby="heading-contato"
        className="relative scroll-mt-20 border-b border-white/10 bg-background py-20 lg:py-[120px]"
      >
        <div className="mx-auto max-w-[1200px] px-5 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
            {/* Informações e Horários */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="min-w-0 lg:col-span-5"
            >
              <p className="font-accent text-sm italic tracking-wide text-primary">
                Localização &amp; Atendimento
              </p>
              <h2
                id="heading-contato"
                className="mt-1 font-display leading-[0.95] tracking-wide text-foreground uppercase text-[clamp(2.4rem,5vw,3.8rem)]"
              >
                ONDE <span className="text-primary">ESTAMOS</span>
              </h2>

              <dl className="mt-8 divide-y divide-white/10 border-y border-white/10">
                <div className="flex items-start gap-4 py-4">
                  <MapPin className="mt-1 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                  <div className="min-w-0">
                    <dt className="text-xs font-semibold text-muted">Endereço</dt>
                    <dd className="mt-0.5 text-base font-semibold text-foreground">
                      {STORE_INFO.address}
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-4 py-4">
                  <Clock className="mt-1 h-5 w-5 shrink-0 text-cheese" aria-hidden="true" />
                  <div className="min-w-0">
                    <dt className="text-xs font-semibold text-muted">Horário de Funcionamento</dt>
                    <dd className="mt-0.5 text-base font-semibold text-foreground">
                      {STORE_INFO.openingHours}
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-4 py-4">
                  <Phone className="mt-1 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                  <div className="min-w-0">
                    <dt className="text-xs font-semibold text-muted">Telefone &amp; Pedidos</dt>
                    <dd className="mt-0.5">
                      <a
                        href={STORE_INFO.phoneTel}
                        className="font-display text-2xl tracking-wide text-foreground hover:text-primary transition-colors"
                      >
                        {STORE_INFO.phoneDisplay}
                      </a>
                    </dd>
                  </div>
                </div>
              </dl>

              <div className="mt-8 flex flex-wrap gap-3.5">
                <a
                  href={STORE_INFO.mapsRouteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-control bg-primary px-6 font-display text-xl tracking-wider text-primary-foreground shadow-md transition-transform hover:-translate-y-0.5 hover:bg-[#ff8930]"
                >
                  <Navigation className="h-5 w-5" aria-hidden="true" />
                  COMO CHEGAR
                </a>

                <a
                  href={STORE_INFO.phoneTel}
                  className="inline-flex min-h-12 items-center justify-center gap-2.5 whitespace-nowrap rounded-control border border-white/20 bg-surface px-6 font-display text-xl tracking-wider text-foreground transition-colors hover:border-primary"
                >
                  <Phone className="h-5 w-5 text-primary" aria-hidden="true" />
                  LIGAR (11) 5362-1170
                </a>
              </div>
            </motion.div>

            {/* Mapa Vetorial Incorporado */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="min-w-0 lg:col-span-7"
            >
              <CaieirasLocatorMapSvg />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 9. CHAMADA FINAL EM FAIXA LARANJA */}
      <section
        aria-labelledby="heading-chamada-final"
        className="relative bg-primary py-16 text-primary-foreground shadow-2xl"
      >
        <div className="mx-auto max-w-[1200px] px-5 sm:px-10 lg:px-16">
          <div className="flex flex-col items-center justify-between gap-8 text-center lg:flex-row lg:text-left">
            <div className="max-w-2xl min-w-0">
              <p className="font-accent text-sm italic text-background/85 sm:text-base">
                Fome de hambúrguer artesanal?
              </p>
              <h2
                id="heading-chamada-final"
                className="mt-1 font-display leading-[0.92] tracking-wide text-background uppercase text-[clamp(2.6rem,6vw,4.8rem)]"
              >
                BATEU A FOME? CHAMA A BRASA!
              </h2>
              <p className="mt-2 text-sm font-medium text-background/85 sm:text-base">
                Faça seu pedido online no iFood ou no WhatsApp e receba rápido em Caieiras-SP.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3.5">
              <a
                href={STORE_INFO.ifoodUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-control bg-accent px-6 font-display text-xl tracking-wider text-accent-foreground shadow-lg transition-transform hover:-translate-y-0.5"
              >
                PEDIR NO IFOOD
              </a>
              <a
                href={STORE_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-control bg-whatsapp px-6 font-display text-xl tracking-wider text-primary-foreground shadow-lg transition-transform hover:-translate-y-0.5"
              >
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                WHATSAPP
              </a>
              <a
                href={STORE_INFO.anotaAiUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-control bg-background px-6 font-display text-xl tracking-wider text-foreground shadow-lg transition-transform hover:-translate-y-0.5"
              >
                VER CARDÁPIO
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 10. RODAPÉ */}
      <footer className="border-t border-white/10 bg-surface pt-12 pb-28 text-muted md:pb-12">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-10 lg:px-16">
          <div className="flex flex-col justify-between gap-8 border-b border-white/10 pb-8 md:flex-row md:items-center">
            <div className="flex items-center gap-4">
              <BrasaLogo size={52} className="ring-2 ring-primary/40" />
              <div>
                <p className="font-display text-2xl tracking-wider text-foreground uppercase">
                  BRASA <span className="text-primary">BURGER</span>
                </p>
                <p className="text-xs text-muted">
                  Hamburgueria artesanal desde 2025 · Caieiras-SP
                </p>
              </div>
            </div>

            <nav aria-label="Links do rodapé" className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-semibold">
              <a href="#inicio" className="text-foreground/90 transition-colors hover:text-primary">
                Início
              </a>
              <a href="#sobre" className="text-foreground/90 transition-colors hover:text-primary">
                Sobre
              </a>
              <a href="#destaques" className="text-foreground/90 transition-colors hover:text-primary">
                Destaques
              </a>
              <a href="#contato" className="text-foreground/90 transition-colors hover:text-primary">
                Contato
              </a>
            </nav>
          </div>

          <div className="mt-6 flex flex-col justify-between gap-3 text-xs sm:flex-row sm:items-center">
            <div className="flex flex-wrap items-center gap-4">
              <a
                href={STORE_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-semibold text-foreground transition-colors hover:text-accent"
              >
                <Instagram className="h-4 w-4 text-accent" aria-hidden="true" />
                <span>{STORE_INFO.instagramHandle}</span>
              </a>
              <span>·</span>
              <a href={STORE_INFO.phoneTel} className="hover:text-primary">
                {STORE_INFO.phoneDisplay}
              </a>
            </div>
            <p>© 2026 BRASA BURGER. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      {/* 5. BOTÃO DE WHATSAPP PISCANDO / PULSANDO + BALÃO DE CHAT */}
      <div className="fixed right-3.5 bottom-[86px] z-40 flex flex-col items-end md:right-8 md:bottom-8">
        {/* Balão de Fala "Fale com a Brasa" */}
        <AnimatePresence>
          {showWaTooltip && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 5, scale: 0.9 }}
              className="mb-2.5 flex items-center gap-2 rounded-xl border border-whatsapp/40 bg-black/90 px-3.5 py-2 text-xs font-semibold text-white shadow-xl backdrop-blur-md"
            >
              <span>Fale com a Brasa Burger 👋</span>
              <button
                type="button"
                onClick={() => setShowWaTooltip(false)}
                className="text-white/60 hover:text-white"
                aria-label="Fechar balão"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative">
          {/* Anéis de Pulso Expandindo (animate-wa-pulse) */}
          <div className="animate-wa-pulse absolute inset-0 rounded-full bg-whatsapp opacity-75" />

          {/* Botão de WhatsApp em Verde com balanço suave (animate-wa-wiggle) */}
          <a
            href={STORE_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Falar com a BRASA BURGER pelo WhatsApp"
            className="animate-wa-wiggle relative inline-flex h-12 w-12 items-center justify-center rounded-full bg-whatsapp text-primary-foreground shadow-[0_8px_25px_rgba(37,211,102,0.55)] transition-transform duration-200 hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-whatsapp md:h-14 md:w-14"
          >
            <MessageCircle className="h-6 w-6 md:h-7 md:w-7" aria-hidden="true" />
          </a>
        </div>
      </div>

      {/* BARRA FIXA INFERIOR NO CELULAR COM 2 BOTÕES: PEDIR E LIGAR */}
      <div
        role="region"
        aria-label="Ações rápidas de contato"
        className="fixed right-0 bottom-0 left-0 z-40 border-t border-white/15 bg-background/95 px-4 py-3 backdrop-blur-md md:hidden"
      >
        <div className="mx-auto flex max-w-md items-center gap-3">
          <a
            href={STORE_INFO.ifoodUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-control bg-primary px-4 font-display text-xl tracking-wider text-primary-foreground shadow-md"
          >
            <span>PEDIR</span>
          </a>

          <a
            href={STORE_INFO.phoneTel}
            className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-control border border-white/20 bg-surface px-4 font-display text-xl tracking-wider text-foreground"
          >
            <Phone className="h-4 w-4 text-primary" aria-hidden="true" />
            <span>LIGAR</span>
          </a>
        </div>
      </div>
    </>
  );
}
