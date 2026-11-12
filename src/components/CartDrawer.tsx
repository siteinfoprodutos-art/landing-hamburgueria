import { useEffect, useState } from 'react';
import { ExternalLink, MessageCircle, Minus, Plus, Trash2, X } from 'lucide-react';
import {
  STORE_INFO,
  computeCartTotalCents,
  formatBRLFromCents,
  type CartLineItem,
} from '../data/menu';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartLineItem[];
  onUpdateQty: (id: string, delta: number) => void;
  onClearCart: () => void;
}

export function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQty,
  onClearCart,
}: CartDrawerProps) {
  const [fulfillment, setFulfillment] = useState<'entrega' | 'retirada'>('entrega');
  const [customerAddress, setCustomerAddress] = useState('');
  const [drinkNotes, setDrinkNotes] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const totalCents = computeCartTotalCents(items);

  const buildWhatsAppCheckoutUrl = () => {
    const lines: string[] = [
      '🍔 *NOVO PEDIDO — RAJU BURGUER*',
      '',
      ...items.map(
        (it) =>
          `• ${it.quantity}x ${it.name} — ${formatBRLFromCents(
            it.priceCents * it.quantity
          )}`
      ),
      '',
      `*Subtotal dos itens:* ${formatBRLFromCents(totalCents)}`,
      `*Modalidade:* ${fulfillment === 'entrega' ? 'Delivery' : 'Retirada no balcão'}`,
    ];

    if (fulfillment === 'entrega' && customerAddress.trim()) {
      lines.push(`*Endereço:* ${customerAddress.trim()}`);
    }
    if (drinkNotes.trim()) {
      lines.push(`*Bebida 350ml / Observações:* ${drinkNotes.trim()}`);
    }

    const encoded = encodeURIComponent(lines.join('\n'));
    return `https://wa.me/${STORE_INFO.whatsappNumber}?text=${encoded}`;
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="titulo-sacola-raju"
      className="fixed inset-0 z-50 flex justify-end bg-black/75"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="flex h-dvh w-full max-w-md flex-col border-l border-white/15 bg-surface text-foreground shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div>
            <h2
              id="titulo-sacola-raju"
              className="font-display text-3xl tracking-wider text-foreground uppercase"
            >
              SUA <span className="text-primary">SACOLA</span>
            </h2>
            <p className="text-xs text-muted">
              Monte seu pedido para enviar no WhatsApp ou peça pelo Anota AI
            </p>
          </div>
          <button
            type="button"
            autoFocus
            onClick={onClose}
            aria-label="Fechar sacola"
            className="inline-flex h-11 w-11 items-center justify-center rounded-control border border-white/15 bg-background text-foreground transition-colors hover:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {/* Body */}
        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="py-12 text-center">
              <p className="font-display text-3xl tracking-wide text-foreground uppercase">
                Sua sacola está vazia
              </p>
              <p className="mt-2 text-sm text-muted">
                Escolha um combo artesanal nos Mais Vendidos ou adicione uma porção para começar seu pedido.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <a
                  href="#mais-vendidos"
                  onClick={onClose}
                  className="inline-flex min-h-11 items-center justify-center whitespace-nowrap rounded-control bg-primary px-5 font-display text-lg tracking-wider text-primary-foreground"
                >
                  VER MAIS VENDIDOS
                </a>
                <a
                  href={STORE_INFO.anotaAiUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-control border border-white/20 bg-background px-5 text-sm font-semibold text-foreground"
                >
                  <span>Abrir Cardápio Digital (Anota AI)</span>
                  <ExternalLink className="h-4 w-4 text-primary" aria-hidden="true" />
                </a>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-muted">
                  Itens selecionados ({items.length})
                </span>
                <button
                  type="button"
                  onClick={onClearCart}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-accent hover:underline"
                >
                  <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                  Limpar sacola
                </button>
              </div>

              <ul className="divide-y divide-white/10 border-y border-white/10">
                {items.map((item) => (
                  <li key={item.id} className="flex items-center justify-between gap-3 py-3.5">
                    <div className="min-w-0 flex-1">
                      <p className="font-display text-xl tracking-wide text-foreground uppercase">
                        {item.name}
                      </p>
                      <p className="text-xs tabular-nums text-primary font-semibold">
                        {formatBRLFromCents(item.priceCents)} cada
                      </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onUpdateQty(item.id, -1)}
                        aria-label={`Diminuir quantidade de ${item.name}`}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-control border border-white/15 bg-background text-foreground hover:border-primary"
                      >
                        <Minus className="h-4 w-4" aria-hidden="true" />
                      </button>
                      <span className="w-6 text-center text-sm font-bold tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => onUpdateQty(item.id, 1)}
                        aria-label={`Aumentar quantidade de ${item.name}`}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-control border border-white/15 bg-background text-foreground hover:border-primary"
                      >
                        <Plus className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Delivery / Pickup Segment */}
              <div>
                <span className="block text-xs font-semibold text-muted">
                  Como prefere receber?
                </span>
                <div className="mt-2 grid grid-cols-2 gap-2" role="group" aria-label="Modalidade do pedido">
                  <button
                    type="button"
                    aria-pressed={fulfillment === 'entrega'}
                    onClick={() => setFulfillment('entrega')}
                    className={`min-h-11 whitespace-nowrap rounded-control border text-sm font-semibold transition-colors ${
                      fulfillment === 'entrega'
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-white/15 bg-background text-foreground'
                    }`}
                  >
                    Delivery
                  </button>
                  <button
                    type="button"
                    aria-pressed={fulfillment === 'retirada'}
                    onClick={() => setFulfillment('retirada')}
                    className={`min-h-11 whitespace-nowrap rounded-control border text-sm font-semibold transition-colors ${
                      fulfillment === 'retirada'
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-white/15 bg-background text-foreground'
                    }`}
                  >
                    Retirada
                  </button>
                </div>
              </div>

              {fulfillment === 'entrega' && (
                <div>
                  <label htmlFor="campo-endereco-raju" className="block text-xs font-semibold text-muted">
                    Rua, número e bairro (opcional)
                  </label>
                  <input
                    id="campo-endereco-raju"
                    type="text"
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    placeholder="Ex: Rua das Rosas, 120 — Laranjeiras"
                    className="mt-1.5 min-h-11 w-full rounded-control border border-white/15 bg-background px-3.5 text-sm text-foreground placeholder:text-muted/60 focus:border-primary focus:outline-none"
                  />
                </div>
              )}

              <div>
                <label htmlFor="campo-obs-raju" className="block text-xs font-semibold text-muted">
                  Bebida 350ml do combo ou observações
                </label>
                <input
                  id="campo-obs-raju"
                  type="text"
                  value={drinkNotes}
                  onChange={(e) => setDrinkNotes(e.target.value)}
                  placeholder="Ex: Coca-Cola 350ml, sem cebola..."
                  className="mt-1.5 min-h-11 w-full rounded-control border border-white/15 bg-background px-3.5 text-sm text-foreground placeholder:text-muted/60 focus:border-primary focus:outline-none"
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer Checkout */}
        {items.length > 0 && (
          <div className="border-t border-white/10 bg-background px-5 py-4">
            <div className="mb-3 flex items-baseline justify-between">
              <span className="text-sm text-muted">Subtotal estimado</span>
              <span className="font-display text-3xl tracking-wide tabular-nums text-primary">
                {formatBRLFromCents(totalCents)}
              </span>
            </div>

            <div className="flex flex-col gap-2.5">
              <a
                href={buildWhatsAppCheckoutUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 whitespace-nowrap rounded-control bg-whatsapp px-5 font-display text-xl tracking-wider text-primary-foreground transition-opacity hover:opacity-95"
              >
                <MessageCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
                ENVIAR PEDIDO NO WHATSAPP
              </a>

              <a
                href={STORE_INFO.anotaAiUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 w-full items-center justify-center gap-2 whitespace-nowrap rounded-control border border-primary/50 bg-surface px-4 text-xs font-semibold text-foreground hover:border-primary"
              >
                <span>Ou finalizar direto no site Anota AI</span>
                <ExternalLink className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
