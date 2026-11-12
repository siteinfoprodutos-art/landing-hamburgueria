import { motion } from 'motion/react';
import { Award, Bike, Flame, Plus, Sparkles, UtensilsCrossed } from 'lucide-react';
import {
  APPETIZERS,
  BESTSELLERS,
  CATEGORIES,
  KIDS_ITEMS,
  formatBRLFromCents,
  type AppetizerItem,
  type BurgerItem,
} from '../data/menu';
import { BurgerCrossSectionSvg, CategoryIllustrationSvg } from './BurgerArtwork';

interface MenuSectionsProps {
  onAddBurger: (item: BurgerItem) => void;
  onAddAppetizer: (item: AppetizerItem) => void;
  recentlyAddedId: string | null;
}

const DIFFERENTIALS = [
  {
    icon: Flame,
    title: 'Blend artesanal',
    detail: '150g selado na chapa quente',
  },
  {
    icon: Sparkles,
    title: 'Pão brioche',
    detail: 'Macio e dourado na manteiga',
  },
  {
    icon: Bike,
    title: 'Delivery rápido',
    detail: 'Quentinho em Laranjeiras e região',
  },
  {
    icon: Award,
    title: 'Desde 2025',
    detail: 'Sabor autêntico em Caieiras-SP',
  },
] as const;

export function MenuSections({
  onAddBurger,
  onAddAppetizer,
  recentlyAddedId,
}: MenuSectionsProps) {
  return (
    <>
      {/* 2. FAIXA DE DIFERENCIAIS COM ÍCONES */}
      <section
        aria-label="Diferenciais Raju Burguer"
        className="border-y border-white/10 bg-surface"
      >
        <div className="mx-auto max-w-[90rem] px-4 sm:px-8">
          <div className="grid grid-cols-1 divide-y divide-white/10 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
            {DIFFERENTIALS.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="flex min-w-0 items-center gap-4 py-5 sm:px-5 lg:py-6"
                >
                  <Icon className="h-7 w-7 shrink-0 text-primary" aria-hidden="true" />
                  <div className="min-w-0">
                    <h2 className="font-display text-2xl tracking-wide text-foreground uppercase">
                      {item.title}
                    </h2>
                    <p className="text-sm text-muted">{item.detail}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. CATEGORIAS EM CARDS */}
      <section
        id="cardapio"
        aria-labelledby="heading-categorias"
        className="scroll-mt-20 bg-background py-14 sm:py-20"
      >
        <div className="mx-auto max-w-[90rem] px-4 sm:px-8">
          <div className="mb-8 flex flex-col justify-between gap-3 sm:mb-10 sm:flex-row sm:items-end">
            <div className="min-w-0">
              <p className="font-accent text-sm italic text-primary">
                Explore nosso cardápio
              </p>
              <h2
                id="heading-categorias"
                className="mt-1 font-display text-4xl tracking-wide text-foreground uppercase sm:text-5xl"
              >
                ESCOLHA SUA FOME DE HOJE
              </h2>
            </div>
            <p className="max-w-md text-sm text-muted">
              Dos nossos combos artesanais de 150g às porções caprichadas para compartilhar com a galera.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CATEGORIES.map((cat) => (
              <motion.a
                key={cat.id}
                href={cat.targetHref}
                initial={{ opacity: 0.95, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                className="group relative flex min-w-0 flex-col justify-between rounded-card border border-white/12 bg-surface p-6 transition-[transform,border-color,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:border-primary hover:shadow-[0_14px_34px_-10px_rgba(244,123,32,0.35)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="font-display text-3xl tracking-wider text-foreground uppercase transition-colors duration-150 group-hover:text-primary">
                      {cat.title}
                    </h3>
                    <p className="font-accent text-xs italic text-cheese">
                      {cat.accentNote}
                    </p>
                  </div>
                  <CategoryIllustrationSvg type={cat.illustration} />
                </div>

                <p className="mt-4 text-sm leading-relaxed text-muted">
                  {cat.description}
                </p>

                <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-xs font-semibold">
                  <span className="text-primary">{cat.startingFrom}</span>
                  <span className="text-foreground transition-transform duration-150 group-hover:translate-x-1">
                    Ver itens →
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* 4. MAIS VENDIDOS (CARDS ESCUROS COM BORDA LARANJA) */}
      <section
        id="mais-vendidos"
        aria-labelledby="heading-mais-vendidos"
        className="scroll-mt-20 border-t border-white/10 bg-[#0D0D0D] py-16 sm:py-24"
      >
        <div className="mx-auto max-w-[90rem] px-4 sm:px-8">
          <div className="mb-8 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <div className="min-w-0">
              <p className="font-accent text-sm italic text-accent sm:text-base">
                Os favoritos de Laranjeiras
              </p>
              <h2
                id="heading-mais-vendidos"
                className="mt-1 font-display text-4xl tracking-wide text-foreground uppercase sm:text-6xl"
              >
                MAIS VENDIDOS &amp; <span className="text-primary">COMBOS</span>
              </h2>
            </div>

            {/* Aviso obrigatório de combos */}
            <div className="flex items-center gap-3 border-b-2 border-primary pb-2 text-sm text-foreground sm:text-base">
              <UtensilsCrossed className="h-5 w-5 shrink-0 text-cheese" aria-hidden="true" />
              <p>
                <strong className="font-semibold text-primary">Aviso importante:</strong>{' '}
                todos os combos acompanham batata e bebida de 350 ml.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {BESTSELLERS.map((burger) => {
              const isAdded = recentlyAddedId === burger.id;
              return (
                <motion.article
                  key={burger.id}
                  initial={{ opacity: 0.95, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                  className="group flex min-w-0 flex-col justify-between rounded-card border border-primary/45 bg-surface p-6 transition-[transform,border-color,box-shadow] duration-200 ease-out hover:-translate-y-1.5 hover:border-primary hover:shadow-[0_16px_38px_-10px_rgba(244,123,32,0.4)]"
                >
                  <div>
                    {/* Top Row: Code + Optional Red Seal */}
                    <div className="flex items-center justify-between gap-2 text-xs font-semibold">
                      <span className="text-muted">
                        {burger.code} · {burger.weightLabel}
                      </span>
                      {burger.highlightTag ? (
                        <span className="font-accent italic text-accent">
                          ★ {burger.highlightTag}
                        </span>
                      ) : (
                        <span className="text-cheese">+ Batata &amp; Bebida 350ml</span>
                      )}
                    </div>

                    {/* Burger Layered Visual with Soft Orange Ember Glow */}
                    <div className="burger-ember-glow my-3 flex items-center justify-center py-2">
                      <BurgerCrossSectionSvg
                        variant={burger.artwork}
                        className="transition-transform duration-200 ease-out group-hover:scale-105"
                      />
                    </div>

                    {/* Title & Subtitle */}
                    <h3 className="font-display text-3xl tracking-wider text-foreground uppercase sm:text-4xl">
                      {burger.name}
                    </h3>
                    <p className="mt-0.5 font-accent text-xs italic text-cheese">
                      {burger.subtitle}
                    </p>

                    {/* Full Ingredient List */}
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      {burger.description}
                    </p>
                  </div>

                  {/* Footer Price + Action separated by 1px hairline */}
                  <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
                    <div>
                      <span className="block text-xs text-muted">
                        Combo com fritas + 350ml
                      </span>
                      <span className="font-display text-4xl tracking-wide tabular-nums text-primary">
                        {formatBRLFromCents(burger.priceCents)}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => onAddBurger(burger)}
                      className={`inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-control px-4 font-display text-lg tracking-wider transition-[transform,background-color,color] duration-150 ease-out active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                        isAdded
                          ? 'bg-cheese text-primary-foreground'
                          : 'bg-primary text-primary-foreground hover:-translate-y-0.5 hover:bg-[#ff8930]'
                      }`}
                    >
                      <Plus className="h-4 w-4 shrink-0" aria-hidden="true" />
                      {isAdded ? 'ADICIONADO' : 'PEDIR COMBO'}
                    </button>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. LINHA KIDS */}
      <section
        id="kids"
        aria-labelledby="heading-kids"
        className="scroll-mt-20 border-t border-white/10 bg-background py-16 sm:py-20"
      >
        <div className="mx-auto max-w-[90rem] px-4 sm:px-8">
          <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div className="min-w-0">
              <p className="font-accent text-sm italic text-cheese">
                Na medida certa para os pequenos
              </p>
              <h2
                id="heading-kids"
                className="mt-1 font-display text-4xl tracking-wide text-foreground uppercase sm:text-5xl"
              >
                MENU <span className="text-primary">KIDS</span>
              </h2>
            </div>
            <p className="max-w-md text-sm text-muted">
              Hambúrguer artesanal de 100g grelhado na hora, pão macio e queijo derretido.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {KIDS_ITEMS.map((kid) => {
              const isAdded = recentlyAddedId === kid.id;
              return (
                <article
                  key={kid.id}
                  className="group flex min-w-0 flex-col justify-between rounded-card border border-primary/35 bg-surface p-6 transition-[transform,border-color,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:border-primary hover:shadow-[0_14px_32px_-10px_rgba(244,123,32,0.32)] sm:flex-row sm:items-center sm:gap-6"
                >
                  <div className="burger-ember-glow mx-auto w-44 shrink-0 sm:mx-0">
                    <BurgerCrossSectionSvg
                      variant={kid.artwork}
                      className="transition-transform duration-200 ease-out group-hover:scale-105"
                    />
                  </div>

                  <div className="mt-4 flex min-w-0 flex-1 flex-col justify-between sm:mt-0">
                    <div>
                      <span className="text-xs font-semibold text-cheese">
                        {kid.code} · {kid.weightLabel}
                      </span>
                      <h3 className="mt-1 font-display text-3xl tracking-wider text-foreground uppercase sm:text-4xl">
                        {kid.name}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">
                        {kid.description}
                      </p>
                    </div>

                    <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
                      <span className="font-display text-4xl tracking-wide tabular-nums text-primary">
                        {formatBRLFromCents(kid.priceCents)}
                      </span>
                      <button
                        type="button"
                        onClick={() => onAddBurger(kid)}
                        className={`inline-flex min-h-11 items-center justify-center gap-1.5 whitespace-nowrap rounded-control px-4 font-display text-lg tracking-wider transition-[transform,background-color] duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                          isAdded
                            ? 'bg-cheese text-primary-foreground'
                            : 'bg-primary text-primary-foreground hover:-translate-y-0.5 hover:bg-[#ff8930]'
                        }`}
                      >
                        <Plus className="h-4 w-4 shrink-0" aria-hidden="true" />
                        {isAdded ? 'ADICIONADO' : 'ADICIONAR'}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. APERITIVOS EM LISTA COM PREÇOS EM CÍRCULOS LARANJA */}
      <section
        id="aperitivos"
        aria-labelledby="heading-aperitivos"
        className="scroll-mt-20 border-t border-white/10 bg-[#0E0E0E] py-16 sm:py-24"
      >
        <div className="mx-auto max-w-[90rem] px-4 sm:px-8">
          <div className="mb-10 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div className="min-w-0">
              <p className="font-accent text-sm italic text-primary">
                Para abrir o apetite ou dividir na mesa
              </p>
              <h2
                id="heading-aperitivos"
                className="mt-1 font-display text-4xl tracking-wide text-foreground uppercase sm:text-6xl"
              >
                PORÇÕES &amp; <span className="text-primary">APERITIVOS</span>
              </h2>
            </div>
            <p className="max-w-md text-sm text-muted">
              Fritas na hora, crocantes por fora e bem servidas. Toque em + para incluir na sua sacola.
            </p>
          </div>

          <div className="rounded-card border border-white/12 bg-surface px-4 py-2 sm:px-8 sm:py-4">
            <ul className="grid grid-cols-1 divide-y divide-white/10 lg:grid-cols-2 lg:gap-x-12">
              {APPETIZERS.map((item) => {
                const isAdded = recentlyAddedId === item.id;
                return (
                  <li
                    key={item.id}
                    className="flex min-w-0 items-center justify-between gap-3 py-4 transition-colors duration-150 hover:text-primary"
                  >
                    <div className="min-w-0 flex-1">
                      <h3 className="font-display text-2xl tracking-wide text-foreground uppercase sm:text-[1.65rem]">
                        {item.name}
                      </h3>
                      {item.portionNote && (
                        <p className="text-xs text-muted sm:text-sm">
                          {item.portionNote}
                        </p>
                      )}
                    </div>

                    <div className="flex shrink-0 items-center gap-2.5">
                      {/* Preço em círculo laranja obrigatório */}
                      <div
                        className="flex h-13 w-13 shrink-0 flex-col items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_4px_14px_-4px_rgba(244,123,32,0.55)]"
                        aria-label={`Preço ${formatBRLFromCents(item.priceCents)}`}
                      >
                        <span className="text-[10px] leading-none font-bold uppercase">
                          R$
                        </span>
                        <span className="font-display text-2xl leading-none tabular-nums">
                          {item.priceInteger}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => onAddAppetizer(item)}
                        aria-label={`Adicionar ${item.name} por R$ ${item.priceInteger} ao pedido`}
                        className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-[background-color,border-color,color,transform] duration-150 ease-out active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                          isAdded
                            ? 'border-cheese bg-cheese text-primary-foreground'
                            : 'border-white/20 bg-background text-foreground hover:border-primary hover:bg-primary hover:text-primary-foreground'
                        }`}
                      >
                        <Plus className="h-5 w-5" aria-hidden="true" />
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
