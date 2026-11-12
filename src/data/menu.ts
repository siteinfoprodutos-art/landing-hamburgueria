export type ArtworkVariant =
  | 'raju-1'
  | 'raju-2'
  | 'raju-3'
  | 'chicken-fingers'
  | 'raju-5'
  | 'kids-k1'
  | 'kids-k2';

export interface BurgerItem {
  id: string;
  code: string;
  name: string;
  subtitle: string;
  description: string;
  priceCents: number;
  weightLabel: string;
  isComboIncluded: boolean;
  highlightTag?: string;
  artwork: ArtworkVariant;
}

export interface AppetizerItem {
  id: string;
  name: string;
  portionNote?: string;
  priceCents: number;
  priceInteger: number;
}

export interface CategoryCardItem {
  id: string;
  title: string;
  accentNote: string;
  description: string;
  startingFrom: string;
  targetHref: string;
  illustration: 'cat-burguers' | 'cat-combos' | 'cat-kids' | 'cat-aperitivos';
}

export const STORE_INFO = {
  name: 'Raju Burguer',
  since: 2025,
  neighborhood: 'Laranjeiras',
  cityState: 'Caieiras-SP',
  address: 'Av. Pauliceia, Laranjeiras, Caieiras-SP',
  phoneDisplay: '(11) 5362-1170',
  phoneTel: 'tel:+551153621170',
  whatsappNumber: '551153621170',
  whatsappUrl:
    'https://wa.me/551153621170?text=Ol%C3%A1%20Raju%20Burguer!%20Quero%20fazer%20um%20pedido.',
  anotaAiUrl: 'https://pedido.anota.ai/loja/hamburgueria-raju',
  ifoodUrl: 'https://www.ifood.com.br/busca?q=Hamburgueria%20Raju%20Caieiras',
  instagramHandle: '@rajuburgue',
  instagramUrl: 'https://www.instagram.com/rajuburgue/',
  mapsRouteUrl:
    'https://www.google.com/maps/search/?api=1&query=Av.+Pauliceia,+Laranjeiras,+Caieiras+-+SP',
} as const;

export const CATEGORIES: CategoryCardItem[] = [
  {
    id: 'burguers',
    title: 'Burguers',
    accentNote: 'Blend 150g na brasa',
    description: 'Pão brioche dourado na manteiga, carne fresca e ingredientes selecionados.',
    startingFrom: 'Combos R$ 46',
    targetHref: '#mais-vendidos',
    illustration: 'cat-burguers',
  },
  {
    id: 'combos',
    title: 'Combos',
    accentNote: 'Batata + Bebida 350ml',
    description: 'Todos os nossos burguers principais já acompanham fritas crocantes e bebida gelada.',
    startingFrom: 'Completos R$ 46',
    targetHref: '#mais-vendidos',
    illustration: 'cat-combos',
  },
  {
    id: 'kids',
    title: 'Kids',
    accentNote: 'Blend 100g sob medida',
    description: 'Sabores pensados para os pequenos, com carne suculenta 100g e queijo derretido.',
    startingFrom: 'A partir de R$ 29',
    targetHref: '#kids',
    illustration: 'cat-kids',
  },
  {
    id: 'aperitivos',
    title: 'Aperitivos',
    accentNote: '12 porções para dividir',
    description: 'Fritas com bacon, croquetas, dadinho de tapioca, hot wings, picanha e mais.',
    startingFrom: 'A partir de R$ 15',
    targetHref: '#aperitivos',
    illustration: 'cat-aperitivos',
  },
];

export const BESTSELLERS: BurgerItem[] = [
  {
    id: 'raju-burguer-1',
    code: '#01',
    name: 'Raju Burguer 1',
    subtitle: 'Maionese de alho artesanal',
    description:
      'Hambúrguer artesanal 150g, pão brioche, alface, tomate, queijo, picles, cebola roxa, bacon e molho de maionese e alho.',
    priceCents: 4800,
    weightLabel: '150G BLEND',
    isComboIncluded: true,
    highlightTag: 'Campeão da Casa',
    artwork: 'raju-1',
  },
  {
    id: 'raju-burguer-2',
    code: '#02',
    name: 'Raju Burguer 2',
    subtitle: 'Clássico americano completo',
    description:
      'Hambúrguer artesanal 150g, pão brioche, queijo, ketchup, mostarda, maionese, picles, cebola roxa, alface, tomate e bacon.',
    priceCents: 4800,
    weightLabel: '150G BLEND',
    isComboIncluded: true,
    artwork: 'raju-2',
  },
  {
    id: 'raju-burguer-3',
    code: '#03',
    name: 'Raju Burguer 3',
    subtitle: 'Cremosidade extra de queijo',
    description:
      'Hambúrguer artesanal 150g, pão brioche, queijo, cebola roxa, alface, tomate, bacon, molho de maionese e queijo.',
    priceCents: 4900,
    weightLabel: '150G BLEND',
    isComboIncluded: true,
    highlightTag: 'Mais Cremoso',
    artwork: 'raju-3',
  },
  {
    id: 'raju-chikens-fingers',
    code: '#04',
    name: 'Raju Chikens Fingers',
    subtitle: 'Crocância dourada & mostarda e mel',
    description:
      'Frango empanado crocante no pão brioche, cebola roxa, alface, tomate e molho especial de mostarda e mel.',
    priceCents: 4600,
    weightLabel: 'FRANGO EMPANADO',
    isComboIncluded: true,
    artwork: 'chicken-fingers',
  },
  {
    id: 'raju-burguer-5',
    code: '#05',
    name: 'Raju Burguer 5',
    subtitle: 'Duplo smash 200g & barbecue defumado',
    description:
      '2 hambúrgueres artesanais de 100g no pão brioche, queijo derretido, fatias de bacon crocante e molho barbecue.',
    priceCents: 5500,
    weightLabel: '2X 100G DUPLO',
    isComboIncluded: true,
    highlightTag: 'Duplo Brutal',
    artwork: 'raju-5',
  },
];

export const KIDS_ITEMS: BurgerItem[] = [
  {
    id: 'raju-k1',
    code: 'K1',
    name: 'Raju K1',
    subtitle: 'Simples, macio e suculento',
    description: 'Pão brioche macio, hambúrguer artesanal 100g grelhado na hora e queijo derretido.',
    priceCents: 2900,
    weightLabel: '100G KIDS',
    isComboIncluded: false,
    artwork: 'kids-k1',
  },
  {
    id: 'raju-k2',
    code: 'K2',
    name: 'Raju K2',
    subtitle: 'O mini clássico com picles',
    description:
      'Pão brioche, hambúrguer artesanal 100g, ketchup, mostarda, cebola, picles e queijo derretido.',
    priceCents: 3100,
    weightLabel: '100G KIDS',
    isComboIncluded: false,
    artwork: 'kids-k2',
  },
];

export const APPETIZERS: AppetizerItem[] = [
  { id: 'ap-batata-frita', name: 'Batata frita', portionNote: 'Porção crocante tradicional', priceCents: 1500, priceInteger: 15 },
  { id: 'ap-batata-queijo-bacon', name: 'Batata com queijo e bacon', portionNote: 'Coberta com queijo cremoso e cubos de bacon', priceCents: 2700, priceInteger: 27 },
  { id: 'ap-croqueta-carne', name: 'Croqueta de carne (10 un)', portionNote: '10 unidades empanadas e recheadas', priceCents: 2900, priceInteger: 29 },
  { id: 'ap-dadinho-tapioca', name: 'Dadinho de tapioca', portionNote: 'Dourados por fora, queijo coalho macio', priceCents: 1700, priceInteger: 17 },
  { id: 'ap-bolinho-bacalhau', name: 'Bolinho de bacalhau (10 un)', portionNote: '10 unidades tradicionais sequinhas', priceCents: 4100, priceInteger: 41 },
  { id: 'ap-bolinho-queijo', name: 'Bolinho de queijo (10 un)', portionNote: '10 unidades com recheio elástico', priceCents: 2700, priceInteger: 27 },
  { id: 'ap-palito-mussarela', name: 'Palito de mussarela (10 un)', portionNote: '10 unidades empanadas crocantes', priceCents: 2500, priceInteger: 25 },
  { id: 'ap-aneis-cebola', name: 'Anéis de cebola', portionNote: 'Onion rings dourados e crocantes', priceCents: 1500, priceInteger: 15 },
  { id: 'ap-calabresa-acebolada', name: 'Calabresa acebolada', portionNote: 'Fatiada na chapa com cebola caramelizada', priceCents: 3500, priceInteger: 35 },
  { id: 'ap-contra-file', name: 'Contra filé 400g', portionNote: '400g em tiras suculentas na chapa', priceCents: 7000, priceInteger: 70 },
  { id: 'ap-picanha', name: 'Picanha 3 fatias', portionNote: '3 fatias nobres seladas na hora', priceCents: 8900, priceInteger: 89 },
  { id: 'ap-hot-wings', name: 'Hot wings (10 un)', portionNote: '10 tulipas/asinhas levemente picantes', priceCents: 3900, priceInteger: 39 },
];

export interface CartLineItem {
  id: string;
  name: string;
  priceCents: number;
  quantity: number;
  note?: string;
}

const brlFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

export function formatBRLFromCents(cents: number): string {
  if (!Number.isFinite(cents) || cents < 0) return 'R$ 0';
  return brlFormatter.format(cents / 100);
}

/**
 * Computes exact order total in minor integer units (centavos).
 * Verified case: 2x Raju Burguer 1 (4800) + 1x Batata frita (1500) = 11100 centavos (R$ 111).
 * Invariant: returns non-negative integer >= 0 for any array of cart items.
 */
export function computeCartTotalCents(items: CartLineItem[]): number {
  return items.reduce((acc, item) => {
    const qty = Number.isFinite(item.quantity) && item.quantity > 0 ? Math.floor(item.quantity) : 0;
    const price = Number.isFinite(item.priceCents) && item.priceCents > 0 ? Math.round(item.priceCents) : 0;
    return acc + qty * price;
  }, 0);
}

export function computeCartCount(items: CartLineItem[]): number {
  return items.reduce(
    (acc, item) => acc + (Number.isFinite(item.quantity) && item.quantity > 0 ? Math.floor(item.quantity) : 0),
    0
  );
}
