import { useEffect, useState } from 'react';
import { Menu, ShoppingBag, X } from 'lucide-react';
import { STORE_INFO } from '../data/menu';
import { RajuLogo } from './BurgerArtwork';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
}

const NAV_LINKS = [
  { label: 'Cardápio', href: '#cardapio' },
  { label: 'Combos', href: '#mais-vendidos' },
  { label: 'Delivery', href: '#delivery' },
  { label: 'Contato', href: '#contato' },
] as const;

export function Header({ cartCount, onOpenCart }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-40 transition-[background-color,border-color] duration-200 ease-out ${
        scrolled || mobileMenuOpen
          ? 'border-b border-white/10 bg-background/95'
          : 'border-b border-transparent bg-gradient-to-b from-black/80 to-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[90rem] items-center justify-between gap-4 px-4 sm:h-20 sm:px-8">
        {/* Circular Raju Logo + Brand Name */}
        <a
          href="#inicio"
          className="inline-flex shrink-0 items-center gap-3 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        >
          <RajuLogo size={46} className="ring-2 ring-primary/50" />
          <span className="font-display text-2xl tracking-wider text-foreground uppercase sm:text-3xl">
            RAJU <span className="text-primary">BURGUER</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav aria-label="Navegação principal" className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="whitespace-nowrap shrink-0 text-sm font-semibold text-foreground/90 transition-colors duration-150 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Actions: Order CTA + Cart + Mobile Hamburger */}
        <div className="flex shrink-0 items-center gap-2.5">
          {cartCount > 0 && (
            <button
              type="button"
              onClick={onOpenCart}
              aria-label={`Abrir sacola com ${cartCount} ${cartCount === 1 ? 'item' : 'itens'}`}
              className="inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-control border border-primary/50 bg-surface px-3.5 text-sm font-semibold text-foreground transition-[border-color,background-color] duration-150 hover:border-primary hover:bg-surface-elevated focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <ShoppingBag className="h-4 w-4 text-primary" aria-hidden="true" />
              <span className="tabular-nums text-primary">{cartCount}</span>
            </button>
          )}

          <a
            href={STORE_INFO.anotaAiUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center justify-center whitespace-nowrap rounded-control bg-primary px-5 font-display text-lg tracking-wider text-primary-foreground shadow-[0_4px_18px_-4px_rgba(244,123,32,0.6)] transition-[transform,background-color] duration-150 ease-out hover:-translate-y-0.5 hover:bg-[#ff8930] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            PEDIR
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="menu-mobile-raju"
            aria-label={mobileMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-control border border-white/15 bg-surface text-foreground transition-colors duration-150 hover:border-primary md:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Collapsible Menu */}
      {mobileMenuOpen && (
        <nav
          id="menu-mobile-raju"
          aria-label="Menu móvel"
          className="border-t border-white/10 bg-surface px-4 py-4 md:hidden"
        >
          <ul className="flex flex-col divide-y divide-white/10">
            {NAV_LINKS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex min-h-12 items-center justify-between text-base font-semibold text-foreground transition-colors duration-150 hover:text-primary"
                >
                  <span>{item.label}</span>
                  <span className="font-display text-lg text-primary" aria-hidden="true">
                    →
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-wrap gap-2.5 pt-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCart();
              }}
              className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-control border border-primary/50 bg-background px-4 text-sm font-semibold text-foreground"
            >
              <ShoppingBag className="h-4 w-4 text-primary" aria-hidden="true" />
              Minha Sacola ({cartCount})
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
