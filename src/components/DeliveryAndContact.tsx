import { ExternalLink, Instagram, MapPin, MessageCircle, Navigation, Phone, ShoppingBag } from 'lucide-react';
import { STORE_INFO } from '../data/menu';
import { CaieirasLocatorMapSvg, DeliveryScooterSvg, RajuLogo } from './BurgerArtwork';

interface DeliveryAndContactProps {
  cartCount: number;
  onOpenCart: () => void;
}

export function DeliveryAndContact({ cartCount, onOpenCart }: DeliveryAndContactProps) {
  return (
    <>
      {/* 7. FAIXA DE DELIVERY EM LARANJA COM MOTO */}
      <section
        id="delivery"
        aria-labelledby="heading-delivery"
        className="scroll-mt-20 bg-primary py-12 text-primary-foreground sm:py-16"
      >
        <div className="mx-auto flex max-w-[90rem] flex-col items-center justify-between gap-8 px-4 sm:px-8 lg:flex-row">
          <div className="min-w-0 max-w-2xl text-center lg:text-left">
            <p className="font-accent text-sm italic text-background/85 sm:text-base">
              Entrega expressa em Laranjeiras e Caieiras-SP
            </p>
            <h2
              id="heading-delivery"
              className="mt-1 font-display text-5xl leading-[0.95] tracking-wide text-background uppercase sm:text-6xl lg:text-7xl"
            >
              FAMINTO? A GENTE ENTREGA!
            </h2>
            <p className="mt-3 max-w-[36em] text-sm font-medium text-background/85 sm:text-base">
              Seu hambúrguer sai da chapa direto para a bag térmica. Peça pelo nosso site oficial ou pelo iFood com poucos toques.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <a
                href={STORE_INFO.anotaAiUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-control bg-background px-6 font-display text-xl tracking-wider text-foreground transition-[transform,background-color] duration-150 ease-out hover:-translate-y-0.5 hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-background"
              >
                <span>PEDIR NO SITE</span>
                <ExternalLink className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              </a>

              <a
                href={STORE_INFO.ifoodUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-control bg-accent px-6 font-display text-xl tracking-wider text-accent-foreground shadow-md transition-[transform,opacity] duration-150 ease-out hover:-translate-y-0.5 hover:opacity-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-background"
              >
                <span>PEDIR NO IFOOD</span>
                <ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="flex shrink-0 items-center justify-center">
            <DeliveryScooterSvg />
          </div>
        </div>
      </section>

      {/* 8. CONTATO E LOCALIZAÇÃO */}
      <section
        id="contato"
        aria-labelledby="heading-contato"
        className="scroll-mt-20 border-t border-white/10 bg-background py-16 sm:py-24"
      >
        <div className="mx-auto max-w-[90rem] px-4 sm:px-8">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Coluna de Informações */}
            <div className="min-w-0 lg:col-span-5">
              <p className="font-accent text-sm italic text-primary">
                Venha conhecer ou peça de casa
              </p>
              <h2
                id="heading-contato"
                className="mt-1 font-display text-4xl tracking-wide text-foreground uppercase sm:text-6xl"
              >
                CONTATO &amp; <span className="text-primary">ENDEREÇO</span>
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                Estamos no coração das Laranjeiras, em Caieiras-SP, preparando hambúrgueres artesanais desde 2025.
              </p>

              <dl className="mt-7 divide-y divide-white/10 border-y border-white/10">
                <div className="flex items-start gap-4 py-4">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                  <div className="min-w-0">
                    <dt className="text-xs font-semibold text-muted">Telefone &amp; WhatsApp</dt>
                    <dd className="mt-0.5">
                      <a
                        href={STORE_INFO.phoneTel}
                        className="font-display text-2xl tracking-wide text-foreground transition-colors hover:text-primary"
                      >
                        {STORE_INFO.phoneDisplay}
                      </a>
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-4 py-4">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                  <div className="min-w-0">
                    <dt className="text-xs font-semibold text-muted">Endereço</dt>
                    <dd className="mt-0.5 text-base font-semibold text-foreground">
                      {STORE_INFO.address}
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-4 py-4">
                  <Instagram className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                  <div className="min-w-0">
                    <dt className="text-xs font-semibold text-muted">Instagram oficial</dt>
                    <dd className="mt-0.5">
                      <a
                        href={STORE_INFO.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-base font-semibold text-foreground transition-colors hover:text-primary"
                      >
                        {STORE_INFO.instagramHandle}
                      </a>
                    </dd>
                  </div>
                </div>
              </dl>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={STORE_INFO.mapsRouteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-control bg-primary px-6 font-display text-xl tracking-wider text-primary-foreground transition-[transform,background-color] duration-150 ease-out hover:-translate-y-0.5 hover:bg-[#ff8930] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  <Navigation className="h-4 w-4 shrink-0" aria-hidden="true" />
                  TRAÇAR ROTA NO MAPA
                </a>

                <a
                  href={STORE_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-control border border-white/20 bg-surface px-5 text-sm font-semibold text-foreground transition-[border-color,color] duration-150 hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  <Instagram className="h-4 w-4 shrink-0" aria-hidden="true" />
                  Seguir {STORE_INFO.instagramHandle}
                </a>
              </div>
            </div>

            {/* Mapa Cartográfico Vetorial */}
            <div className="min-w-0 lg:col-span-7">
              <CaieirasLocatorMapSvg />
              <p className="mt-2.5 text-xs text-muted">
                Localização ilustrativa de acesso pela Rod. Pres. Tancredo Neves (SP-332) até a Av. Pauliceia, Laranjeiras — Caieiras-SP.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. RODAPÉ */}
      <footer className="border-t border-white/10 bg-surface pt-12 pb-28 text-muted md:pb-12">
        <div className="mx-auto max-w-[90rem] px-4 sm:px-8">
          <div className="flex flex-col justify-between gap-8 border-b border-white/10 pb-8 md:flex-row md:items-center">
            <div className="flex items-center gap-3.5">
              <RajuLogo size={52} className="ring-2 ring-primary/40" />
              <div>
                <p className="font-display text-2xl tracking-wider text-foreground uppercase">
                  RAJU <span className="text-primary">BURGUER</span>
                </p>
                <p className="text-xs text-muted">
                  Hamburgueria artesanal desde 2025 · Laranjeiras, Caieiras-SP
                </p>
              </div>
            </div>

            <nav aria-label="Links do rodapé" className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium">
              <a href="#inicio" className="whitespace-nowrap text-foreground/90 transition-colors hover:text-primary">
                Início
              </a>
              <a href="#cardapio" className="whitespace-nowrap text-foreground/90 transition-colors hover:text-primary">
                Cardápio
              </a>
              <a href="#mais-vendidos" className="whitespace-nowrap text-foreground/90 transition-colors hover:text-primary">
                Combos
              </a>
              <a href="#kids" className="whitespace-nowrap text-foreground/90 transition-colors hover:text-primary">
                Kids
              </a>
              <a href="#aperitivos" className="whitespace-nowrap text-foreground/90 transition-colors hover:text-primary">
                Aperitivos
              </a>
              <a href="#delivery" className="whitespace-nowrap text-foreground/90 transition-colors hover:text-primary">
                Delivery
              </a>
              <a href="#contato" className="whitespace-nowrap text-foreground/90 transition-colors hover:text-primary">
                Contato
              </a>
            </nav>
          </div>

          <div className="mt-6 flex flex-col justify-between gap-2 text-xs sm:flex-row sm:items-center">
            <p>© 2026 Raju Burguer. Todos os direitos reservados.</p>
            <p>
              Av. Pauliceia, Laranjeiras, Caieiras-SP · Tel: {STORE_INFO.phoneDisplay}
            </p>
          </div>
        </div>
      </footer>

      {/* EXTRA 1: BOTÃO FLUTUANTE DE WHATSAPP (VERDE) */}
      <a
        href={STORE_INFO.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar com a Raju Burguer pelo WhatsApp"
        className="fixed right-4 bottom-21 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-primary-foreground shadow-[0_8px_24px_rgba(37,211,102,0.45)] transition-transform duration-150 ease-out hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-whatsapp md:right-6 md:bottom-6"
      >
        <MessageCircle className="h-7 w-7" aria-hidden="true" />
      </a>

      {/* EXTRA 2: BARRA FIXA INFERIOR NO CELULAR COM PEDIR AGORA E LIGAR */}
      <div
        role="region"
        aria-label="Ações rápidas de pedido"
        className="fixed right-0 bottom-0 left-0 z-40 border-t border-white/15 bg-background/95 px-3 py-2.5 md:hidden"
      >
        <div className="mx-auto flex max-w-lg items-center gap-2.5">
          {cartCount > 0 ? (
            <button
              type="button"
              onClick={onOpenCart}
              className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-control bg-primary px-4 font-display text-xl tracking-wider text-primary-foreground shadow-[0_4px_16px_rgba(244,123,32,0.5)]"
            >
              <ShoppingBag className="h-5 w-5 shrink-0" aria-hidden="true" />
              <span>PEDIR AGORA ({cartCount})</span>
            </button>
          ) : (
            <a
              href={STORE_INFO.anotaAiUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-control bg-primary px-4 font-display text-xl tracking-wider text-primary-foreground shadow-[0_4px_16px_rgba(244,123,32,0.5)]"
            >
              <span>PEDIR AGORA</span>
            </a>
          )}

          <a
            href={STORE_INFO.phoneTel}
            className="inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-control border border-white/20 bg-surface px-4 font-display text-xl tracking-wider text-foreground"
          >
            <Phone className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
            <span>LIGAR</span>
          </a>
        </div>
      </div>
    </>
  );
}
