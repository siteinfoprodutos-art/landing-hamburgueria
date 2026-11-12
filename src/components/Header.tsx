import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { STORE_INFO } from '../data/menu';
import { BrasaLogo } from './BurgerArtwork';

const NAV_LINKS = [
  { label: 'Início', href: '#inicio' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Destaques', href: '#destaques' },
  { label: 'Contato', href: '#contato' },
] as const;

export function Header() {
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
      className={`fixed top-0 right-0 left-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-200 ease-out ${
        scrolled || mobileMenuOpen
          ? 'border-b border-white/10 bg-background/95 backdrop-blur-md shadow-lg'
          : 'border-b border-transparent bg-gradient-to-b from-black/90 via-black/60 to-transparent'
      }`}
    >
      {/* Container Central com max-width 1200px, padding 20px (cell), 40px (tablet), 64px (desktop) */}
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-4 px-5 sm:h-20 sm:px-10 lg:px-16">
        {/* Circular Brasa Logo + Brand Name */}
        <a
          href="#inicio"
          className="inline-flex shrink-0 items-center gap-3 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        >
          <BrasaLogo size={44} className="ring-2 ring-primary/60 shadow-[0_0_12px_rgba(244,123,32,0.3)]" />
          <span className="font-display text-2xl tracking-wider text-foreground uppercase sm:text-3xl">
            BRASA <span className="text-primary">BURGER</span>
          </span>
        </a>

        {/* Desktop Navigation (Início, Sobre, Destaques, Contato) */}
        <nav aria-label="Navegação principal" className="hidden items-center gap-8 md:flex">
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

        {/* Actions: Primary CTA Button "PEDIR" + Mobile Hamburger */}
        <div className="flex shrink-0 items-center gap-3">
          <a
            href={STORE_INFO.anotaAiUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center justify-center whitespace-nowrap rounded-control bg-primary px-5 font-display text-lg tracking-wider text-primary-foreground shadow-[0_4px_18px_-4px_rgba(244,123,32,0.6)] transition-[transform,background-color,box-shadow] duration-150 ease-out hover:-translate-y-0.5 hover:bg-[#ff8930] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            PEDIR
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="menu-mobile-brasa"
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
          id="menu-mobile-brasa"
          aria-label="Menu móvel"
          className="border-t border-white/10 bg-surface/98 px-5 py-4 md:hidden"
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
        </nav>
      )}
    </header>
  );
}
