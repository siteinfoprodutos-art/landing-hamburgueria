import { useEffect, useState } from 'react';
import { MotionConfig } from 'motion/react';
import {
  computeCartCount,
  type AppetizerItem,
  type BurgerItem,
  type CartLineItem,
} from './data/menu';
import { Header } from './components/Header';
import { HeroScrollCanvas } from './components/HeroScrollCanvas';
import { MenuSections } from './components/MenuSections';
import { DeliveryAndContact } from './components/DeliveryAndContact';
import { CartDrawer } from './components/CartDrawer';

const STORAGE_KEY = 'raju_burguer_cart_v1';

function loadInitialCart(): CartLineItem[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is CartLineItem =>
        Boolean(item) &&
        typeof item === 'object' &&
        typeof (item as CartLineItem).id === 'string' &&
        typeof (item as CartLineItem).name === 'string' &&
        typeof (item as CartLineItem).priceCents === 'number' &&
        typeof (item as CartLineItem).quantity === 'number' &&
        (item as CartLineItem).quantity > 0
    );
  } catch {
    return [];
  }
}

export default function App() {
  const [cartItems, setCartItems] = useState<CartLineItem[]>(() => loadInitialCart());
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
    } catch {
      // Ignore storage quota errors cleanly
    }
  }, [cartItems]);

  const addItemToCart = (id: string, name: string, priceCents: number) => {
    setCartItems((prev) => {
      const existing = prev.find((it) => it.id === id);
      if (existing) {
        return prev.map((it) =>
          it.id === id ? { ...it, quantity: it.quantity + 1 } : it
        );
      }
      return [...prev, { id, name, priceCents, quantity: 1 }];
    });

    setRecentlyAddedId(id);
    setStatusMessage(`${name} adicionado à sacola.`);
    window.setTimeout(() => {
      setRecentlyAddedId((curr) => (curr === id ? null : curr));
    }, 1100);
  };

  const handleAddBurger = (burger: BurgerItem) => {
    const label = burger.isComboIncluded ? `${burger.name} (Combo)` : burger.name;
    addItemToCart(burger.id, label, burger.priceCents);
  };

  const handleAddAppetizer = (appetizer: AppetizerItem) => {
    addItemToCart(appetizer.id, appetizer.name, appetizer.priceCents);
  };

  const handleUpdateQty = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((it) =>
          it.id === id ? { ...it, quantity: it.quantity + delta } : it
        )
        .filter((it) => it.quantity > 0)
    );
  };

  const handleClearCart = () => {
    setCartItems([]);
    setStatusMessage('Sacola limpa.');
  };

  const cartCount = computeCartCount(cartItems);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-dvh bg-background text-foreground">
        {/* Accessible live feedback region */}
        <div role="status" aria-live="polite" className="sr-only">
          {statusMessage}
        </div>

        <Header cartCount={cartCount} onOpenCart={() => setIsCartOpen(true)} />

        <main>
          <HeroScrollCanvas onOpenOrder={() => setIsCartOpen(true)} />

          <MenuSections
            onAddBurger={handleAddBurger}
            onAddAppetizer={handleAddAppetizer}
            recentlyAddedId={recentlyAddedId}
          />
        </main>

        <DeliveryAndContact
          cartCount={cartCount}
          onOpenCart={() => setIsCartOpen(true)}
        />

        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cartItems}
          onUpdateQty={handleUpdateQty}
          onClearCart={handleClearCart}
        />
      </div>
    </MotionConfig>
  );
}
