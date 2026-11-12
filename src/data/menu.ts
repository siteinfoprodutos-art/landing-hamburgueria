export interface BestsellerItem {
  id: string;
  code: string;
  name: string;
  tagline: string;
  description: string;
  startingPriceLabel: string;
  imageSrc: string;
  tag?: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: string;
  src: string;
  alt: string;
}

export interface TestimonialItem {
  id: string;
  author: string;
  neighborhood: string;
  rating: number;
  dateText: string;
  comment: string;
}

export const STORE_INFO = {
  name: 'BRASA BURGER',
  since: 2025,
  neighborhood: 'Laranjeiras',
  cityState: 'Caieiras-SP',
  address: 'Av. Pauliceia, Laranjeiras, Caieiras-SP',
  phoneDisplay: '(11) 5362-1170',
  phoneTel: 'tel:+551153621170',
  whatsappNumber: '551153621170',
  whatsappUrl:
    'https://wa.me/551153621170?text=Ol%C3%A1%20BRASA%20BURGER!%20Vim%20pelo%20site%20e%20quero%20fazer%20um%20pedido.',
  anotaAiUrl: 'https://pedido.anota.ai/loja/hamburgueria-brasa',
  ifoodUrl: 'https://www.ifood.com.br/busca?q=Hamburgueria%20Brasa%20Caieiras',
  instagramHandle: '@brasaburger.caieiras',
  instagramUrl: 'https://www.instagram.com/brasaburger.caieiras/',
  mapsRouteUrl:
    'https://www.google.com/maps/search/?api=1&query=Av.+Pauliceia,+Laranjeiras,+Caieiras+-+SP',
  openingHours: 'Terça a Domingo: 18h às 23h30',
} as const;

export const HIGHLIGHT_ITEMS: BestsellerItem[] = [
  {
    id: 'brasa-classic-1',
    code: '#01',
    name: 'Brasa Classic 150g',
    tagline: 'Maionese verde de alho artesanal',
    description:
      'Hambúrguer artesanal 150g no pão brioche tostado na manteiga, alface, tomate, queijo derretido, picles crocantes, cebola roxa, bacon e molho especial de maionese com alho.',
    startingPriceLabel: 'a partir de R$ 48',
    imageSrc: '/images/raju_gallery_burger_1_1794492089881.jpg',
    tag: 'O Mais Pedido',
  },
  {
    id: 'brasa-chicken-crispy',
    code: '#02',
    name: 'Brasa Chicken Crispy',
    tagline: 'Crocância dourada com mostarda e mel',
    description:
      'Tiras selecionadas de frango empanado super crocante no pão brioche, cebola roxa, alface americana fresca, tomate suculento e molho artesanal de mostarda e mel.',
    startingPriceLabel: 'a partir de R$ 46',
    imageSrc: '/images/raju_gallery_chicken_1794492091346.jpg',
    tag: 'Crocante Supremo',
  },
  {
    id: 'brasa-double-smash',
    code: '#03',
    name: 'Brasa Double Smash 200g',
    tagline: 'Duplo smash 200g & barbecue defumado',
    description:
      '2 hambúrgueres artesanais de 100g grelhados na chapa bem quente, camada dupla de queijo derretido, fatias generosas de bacon e molho barbecue defumado.',
    startingPriceLabel: 'a partir de R$ 55',
    imageSrc: '/images/raju_gallery_burger_2_1794492091634.jpg',
    tag: 'Carne em Dobro',
  },
];

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'gal-1',
    title: 'Brasa Classic na Brasa',
    category: 'Burguer Artesanal',
    src: '/images/raju_gallery_burger_1_1794492089881.jpg',
    alt: 'Hambúrguer artesanal Brasa Classic com queijo derretido, bacon e maionese de alho',
  },
  {
    id: 'gal-2',
    title: 'Chapa Quente em Ação',
    category: 'Cozinha & Preparo',
    src: '/images/raju_story_kitchen_1794492089378.jpg',
    alt: 'Chefe selando blend artesanal 150g na chapa quente da Brasa Burger',
  },
  {
    id: 'gal-3',
    title: 'Brasa Double Smash 200g',
    category: 'Burguer Artesanal',
    src: '/images/raju_gallery_burger_2_1794492091634.jpg',
    alt: 'Hambúrguer duplo smash 200g com molho barbecue e bacon',
  },
  {
    id: 'gal-4',
    title: 'Chicken Crispy Strips',
    category: 'Especialidades',
    src: '/images/raju_gallery_chicken_1794492091346.jpg',
    alt: 'Sanduíche de frango empanado crocante no pão brioche',
  },
  {
    id: 'gal-5',
    title: 'Fritas com Queijo e Bacon',
    category: 'Porção Crocante',
    src: '/images/raju_gallery_fries_1794492090855.jpg',
    alt: 'Porção de batatas fritas cobertas com queijo e cubos de bacon',
  },
  {
    id: 'gal-6',
    title: 'Ambiente Brasa Burger',
    category: 'Nosso Espaço',
    src: '/images/raju_gallery_ambiance_1794492091850.jpg',
    alt: 'Ambiente aconchegante e iluminação quente da Brasa Burger em Caieiras-SP',
  },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'dep-1',
    author: 'Lucas Mendes',
    neighborhood: 'Laranjeiras, Caieiras-SP',
    rating: 5,
    dateText: 'Há 2 semanas',
    comment:
      'Sem dúvidas o melhor hambúrguer da região! O pão brioche vem tostadinho na manteiga e a maionese de alho é de outro mundo. O atendimento via WhatsApp e a entrega no iFood foram super rápidos.',
  },
  {
    id: 'dep-2',
    author: 'Camila & Fernando',
    neighborhood: 'Centro, Caieiras-SP',
    rating: 5,
    dateText: 'Há 1 mês',
    comment:
      'Pedimos o Brasa Classic e o Brasa Double Smash no fim de semana. Chegou trincando de quente, batata super crocante e a carne suculenta no ponto perfeito. Viramos clientes fiéis!',
  },
  {
    id: 'dep-3',
    author: 'Rodrigo Alves',
    neighborhood: 'Portal das Laranjeiras, Caieiras-SP',
    rating: 5,
    dateText: 'Há 3 semanas',
    comment:
      'Blend artesanal de verdade, 150g bem servido que mata a fome com sabor incomparável. Recomendo demais o Chicken Crispy com molho de mostarda e mel!',
  },
];
