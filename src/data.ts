export type Suite = {
  id: string;
  name: string;
  shortName: string;
  image: string;
  gallery: string[];
  size: number;
  guests: number;
  price: number;
  view: string;
  description: string;
  details: string;
  amenities: string[];
};

export type Experience = {
  id: string;
  number: string;
  title: string;
  category: string;
  image: string;
  duration: string;
  time: string;
  price: number;
  description: string;
  includes: string;
};

export const suites: Suite[] = [
  {
    id: 'mata',
    name: 'Suíte Mata',
    shortName: 'Mata',
    image: 'https://images.pexels.com/photos/7031731/pexels-photo-7031731.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=1600',
    gallery: [
      'https://images.pexels.com/photos/7031731/pexels-photo-7031731.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=1600',
      'https://images.pexels.com/photos/26886816/pexels-photo-26886816.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=1600',
      'https://images.pexels.com/photos/40411959/pexels-photo-40411959.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=1600',
    ],
    size: 48,
    guests: 2,
    price: 1890,
    view: 'Jardim de restinga',
    description: 'Silêncio, sombra e o verde entrando por uma janela de sete metros.',
    details: 'No nível do jardim, a Suíte Mata é um convite ao recolhimento. O banheiro abre para um pátio privativo e a varanda fica a poucos passos da piscina de água morna.',
    amenities: ['Cama king com linho lavado', 'Banheira de imersão', 'Varanda privativa', 'Ducha no jardim', 'Café da manhã incluído'],
  },
  {
    id: 'mar',
    name: 'Suíte Mar',
    shortName: 'Mar',
    image: 'https://images.pexels.com/photos/40624417/pexels-photo-40624417.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=1600',
    gallery: [
      'https://images.pexels.com/photos/40624417/pexels-photo-40624417.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=1600',
      'https://images.pexels.com/photos/37098141/pexels-photo-37098141.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=1600',
      'https://images.pexels.com/photos/26886816/pexels-photo-26886816.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=1600',
    ],
    size: 64,
    guests: 2,
    price: 2640,
    view: 'Oceano frontal',
    description: 'Acordar com o horizonte inteiro e dormir no ritmo das ondas.',
    details: 'Voltada integralmente para o Atlântico, a Suíte Mar tem living independente, varanda com rede de linho e uma parede de vidro que desaparece por completo.',
    amenities: ['Cama king vista mar', 'Living independente', 'Rede de linho na varanda', 'Banheira com vista', 'Café da manhã incluído'],
  },
  {
    id: 'horizonte',
    name: 'Pavilhão Horizonte',
    shortName: 'Horizonte',
    image: 'https://images.pexels.com/photos/37098141/pexels-photo-37098141.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=1600',
    gallery: [
      'https://images.pexels.com/photos/37098141/pexels-photo-37098141.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=1600',
      'https://images.pexels.com/photos/39725929/pexels-photo-39725929.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=1600',
      'https://images.pexels.com/photos/297985/pexels-photo-297985.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=1600',
    ],
    size: 92,
    guests: 3,
    price: 3980,
    view: 'Pôr do sol e oceano',
    description: 'Um pavilhão só seu, entre a piscina privativa e o fim da tarde.',
    details: 'No ponto mais alto do hotel, o Horizonte combina arquitetura de concreto aparente, piscina de borda infinita e serviço de anfitrião dedicado do café ao último drinque.',
    amenities: ['Piscina privativa aquecida', 'Anfitrião dedicado', 'Sala de estar e jantar', 'Adega com curadoria', 'Transfer de chegada incluído'],
  },
  {
    id: 'casa',
    name: 'Casa AURA',
    shortName: 'Casa AURA',
    image: 'https://images.pexels.com/photos/39725929/pexels-photo-39725929.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=1600',
    gallery: [
      'https://images.pexels.com/photos/39725929/pexels-photo-39725929.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=1600',
      'https://images.pexels.com/photos/32334227/pexels-photo-32334227.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=1600',
      'https://images.pexels.com/photos/12387909/pexels-photo-12387909.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=1600',
    ],
    size: 180,
    guests: 6,
    price: 7200,
    view: 'Mata, mar e praia privativa',
    description: 'Três suítes, nenhum vizinho e a sensação rara de ter o lugar inteiro.',
    details: 'Uma casa independente para encontros que pedem tempo. São três quartos, cozinha com chef sob consulta, estar duplo e um caminho exclusivo até uma enseada reservada.',
    amenities: ['Três suítes independentes', 'Piscina de 18 metros', 'Acesso privativo à praia', 'Cozinha com chef sob consulta', 'Transfers de ida e volta incluídos'],
  },
];

export const experiences: Experience[] = [
  {
    id: 'aurora', number: '01', title: 'Remada da aurora', category: 'Mar',
    image: 'https://images.pexels.com/photos/30165023/pexels-photo-30165023.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400',
    duration: '2h30', time: '05:30', price: 380,
    description: 'Saída de canoa polinésia antes do sol, café na areia e retorno pela enseada.',
    includes: 'Guia local, equipamentos e café na praia',
  },
  {
    id: 'mata-alta', number: '02', title: 'Caminho da mata alta', category: 'Terra',
    image: 'https://images.pexels.com/photos/38188721/pexels-photo-38188721.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400',
    duration: '3h', time: '08:00', price: 290,
    description: 'Uma trilha pouco conhecida entre jequitibás, bromélias e uma queda d’água escondida.',
    includes: 'Biólogo, lanche de trilha e transporte',
  },
  {
    id: 'ritual', number: '03', title: 'Ritual de brisa e sal', category: 'Bem-estar',
    image: 'https://images.pexels.com/photos/31234756/pexels-photo-31234756.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400',
    duration: '1h40', time: 'A combinar', price: 640,
    description: 'Esfoliação com sal e capim-santo, massagem profunda e pausa no jardim do spa.',
    includes: 'Ritual completo, chá e acesso ao circuito de águas',
  },
  {
    id: 'fogo', number: '04', title: 'Jantar ao redor do fogo', category: 'Mesa',
    image: 'https://images.pexels.com/photos/34104580/pexels-photo-34104580.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400',
    duration: '3h', time: '19:30', price: 780,
    description: 'Peixe do dia, legumes da horta e fermentados da casa em seis tempos à beira-mar.',
    includes: 'Menu de seis tempos e harmonização sem álcool',
  },
  {
    id: 'vela', number: '05', title: 'Vela no fim da tarde', category: 'Mar',
    image: 'https://images.pexels.com/photos/15283660/pexels-photo-15283660.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400',
    duration: '2h', time: '16:30', price: 920,
    description: 'Veleiro privativo pela costa, parada para mergulho e espumante ao pôr do sol.',
    includes: 'Barco privativo para até 4 pessoas e open bar',
  },
  {
    id: 'respira', number: '06', title: 'Respira, alonga, silencia', category: 'Bem-estar',
    image: 'https://images.pexels.com/photos/5978345/pexels-photo-5978345.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400',
    duration: '1h15', time: '07:00', price: 0,
    description: 'Prática guiada no deck de madeira, seguida de imersão fria e sauna seca.',
    includes: 'Cortesia para hóspedes, mediante agendamento',
  },
];

export const dayChapters = [
  {
    time: '06:12', kicker: 'Antes do mundo acordar', title: 'A luz chega primeiro.',
    text: 'Uma caminhada descalça até a areia. O café passa devagar. Não há programação antes do primeiro mergulho.',
    image: 'https://images.pexels.com/photos/30165023/pexels-photo-30165023.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=1900', tone: '#c6b8a0',
  },
  {
    time: '12:48', kicker: 'O meio do dia, sem pressa', title: 'O tempo cabe inteiro aqui.',
    text: 'Peixe fresco, limão e uma mesa comprida à sombra. Depois, a piscina ou a rede. Talvez nenhum dos dois.',
    image: 'https://images.pexels.com/photos/12387909/pexels-photo-12387909.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=1900', tone: '#698d86',
  },
  {
    time: '17:36', kicker: 'Quando tudo fica dourado', title: 'O sol ensaia sua despedida.',
    text: 'Do alto do pavilhão, a mata muda de cor e o mar fica cobre. Um drinque gelado marca a única hora que importa.',
    image: 'https://images.pexels.com/photos/297985/pexels-photo-297985.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=1900', tone: '#bc7354',
  },
  {
    time: '21:08', kicker: 'A noite tem outro volume', title: 'Só resta o essencial.',
    text: 'Fogo baixo, estrelas altas e o Atlântico ao fundo. O jantar termina quando a conversa terminar.',
    image: 'https://images.pexels.com/photos/17057025/pexels-photo-17057025.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=1900', tone: '#1d342e',
  },
];

export const menus = {
  'Da horta': [
    { name: 'Tomates, leite de castanha e manjericão-roxo', note: 'da nossa horta · frio', price: 68 },
    { name: 'Abóbora na brasa, coalhada seca e mel de engenho', note: 'vegetariano', price: 74 },
    { name: 'Folhas novas, manga verde e castanha de caju', note: 'vegano', price: 62 },
  ],
  'Do mar': [
    { name: 'Peixe cru, tucupi cítrico e óleo de coentro', note: 'pesca de linha', price: 96 },
    { name: 'Polvo, feijão-fradinho e pimenta-de-cheiro', note: 'receita da casa', price: 118 },
    { name: 'Camarão, arroz de coco e dendê fresco', note: 'para compartilhar', price: 164 },
  ],
  'Do fogo': [
    { name: 'Pescada amarela inteira, ervas e limão-cravo', note: 'para duas pessoas', price: 248 },
    { name: 'Costela curada, purê de baroa e agrião', note: '12 horas de cocção', price: 142 },
    { name: 'Couve-flor na brasa, tahine e sementes tostadas', note: 'vegano', price: 88 },
  ],
};

export const gallery = [
  { src: 'https://images.pexels.com/photos/35113998/pexels-photo-35113998.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=1500', title: 'Casa sobre o Atlântico', tag: 'Arquitetura', orientation: 'wide' },
  { src: 'https://images.pexels.com/photos/12387908/pexels-photo-12387908.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=1000', title: 'Piscina de água morna', tag: 'Corpo', orientation: 'tall' },
  { src: 'https://images.pexels.com/photos/33033786/pexels-photo-33033786.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=1200', title: 'O que a terra oferece', tag: 'Mesa', orientation: 'square' },
  { src: 'https://images.pexels.com/photos/37098141/pexels-photo-37098141.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=1000', title: 'Luz de fim de tarde', tag: 'Suítes', orientation: 'tall' },
  { src: 'https://images.pexels.com/photos/17057034/pexels-photo-17057034.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=1500', title: 'Mesa posta, noite aberta', tag: 'Restaurante', orientation: 'wide' },
  { src: 'https://images.pexels.com/photos/37526152/pexels-photo-37526152.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=1500', title: 'Entre o jardim e o mar', tag: 'Hotel', orientation: 'wide' },
];

export const journal = [
  {
    slug: 'concreto-vento', category: 'Arquitetura', readTime: '4 min',
    title: 'Construir com o vento, não contra ele',
    excerpt: 'Como brises, pátios e sombra reduzem o uso de ar-condicionado sem fechar a paisagem.',
    image: 'https://images.pexels.com/photos/297985/pexels-photo-297985.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1300',
    body: ['Antes do primeiro desenho, passamos quatro estações observando o terreno. O vento dominante vinha do leste; a sombra das árvores antigas desenhava caminhos diferentes a cada mês. A arquitetura nasceu dessas duas linhas invisíveis.', 'Os pavilhões foram posicionados para criar ventilação cruzada em todos os quartos. Brises de madeira filtram o sol da tarde, enquanto lajes profundas protegem as varandas. O concreto aparente guarda o frescor da noite e devolve estabilidade térmica durante o dia.', 'O resultado não é apenas uma casa mais eficiente. É uma casa em que a brisa, o cheiro de chuva e o som das folhas continuam fazendo parte da experiência de habitar.'],
  },
  {
    slug: 'pesca-linha', category: 'Origem', readTime: '3 min',
    title: 'O peixe tem nome, maré e pescador',
    excerpt: 'Uma manhã com Seu Dudu e a cadeia curta que abastece a cozinha do AURA.',
    image: 'https://images.pexels.com/photos/34104580/pexels-photo-34104580.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1300',
    body: ['Seu Dudu conhece a costa pelo nome das pedras. Sai antes do amanhecer em uma embarcação pequena e volta apenas com o que a maré permite. É essa pesca de linha, feita por famílias da região, que define o que chega à nossa cozinha.', 'Não existe um cardápio de peixe fixo. Existe uma conversa diária. O chef recebe a pesca, escolhe o preparo mais simples possível e escreve a origem no menu: quem pescou, onde e como.', 'Comprar perto não é um selo. É uma relação continuada, com preço justo combinado antes da temporada e respeito aos períodos de reprodução de cada espécie.'],
  },
  {
    slug: 'arte-nao-fazer', category: 'Bem-estar', readTime: '5 min',
    title: 'A arte quase esquecida de não fazer nada',
    excerpt: 'Um pequeno manual para desprogramar a agenda e recuperar a duração real de um dia.',
    image: 'https://images.pexels.com/photos/31234756/pexels-photo-31234756.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1300',
    body: ['Chegar de férias com uma lista de tarefas é mais comum do que parece. Restaurantes, trilhas, horários e fotos ocupam rapidamente o espaço que deveria estar vazio. No AURA, sugerimos começar por um compromisso diferente: não agendar as primeiras três horas.', 'Deixe o telefone no quarto. Escolha um lugar com sombra e observe quanto tempo leva até a vontade de checar a hora desaparecer. Caminhe sem destino pela areia. Se quiser companhia, nosso anfitrião saberá propor algo; se não quiser, saberá desaparecer.', 'Descanso não é ausência de experiência. É o estado em que finalmente conseguimos perceber a experiência que já está acontecendo.'],
  },
];

export const testimonials = [
  { quote: 'O tipo de lugar que devolve uma coisa rara: a sensação de que o dia não precisa ser preenchido.', author: 'Marina & Theo', origin: 'São Paulo · Casa AURA' },
  { quote: 'Arquitetura precisa, serviço gentil e nenhuma ostentação. O pôr do sol do Horizonte fica na memória.', author: 'Clara M.', origin: 'Lisboa · Pavilhão Horizonte' },
  { quote: 'Chegamos por três noites e mudamos o voo. A comida, o mar e o silêncio fizeram a decisão por nós.', author: 'Rafael & Ana', origin: 'Buenos Aires · Suíte Mar' },
];

export const faqs = [
  { q: 'Onde o AURA fica e como chego?', a: 'Estamos em uma enseada preservada no litoral norte de Alagoas, a 92 km do Aeroporto de Maceió (MCZ). O transfer privativo dura cerca de 1h40. Após a confirmação, nosso concierge organiza o horário conforme seu voo.' },
  { q: 'Qual é o horário de check-in e check-out?', a: 'O check-in começa às 15h e o check-out vai até 12h. Chegadas antecipadas e saídas tardias podem ser organizadas conforme disponibilidade. O living, a piscina e o restaurante estão abertos mesmo antes do quarto ficar pronto.' },
  { q: 'O café da manhã está incluído?', a: 'Sim. Todas as diárias incluem café da manhã à la carte das 7h às 11h, servido no restaurante ou na sua varanda sem custo adicional. Também incluem água filtrada, frutas, minibar não alcoólico e atividades coletivas de movimento.' },
  { q: 'O hotel recebe crianças?', a: 'A Casa AURA e o Pavilhão Horizonte recebem crianças de todas as idades. Nas demais suítes, recebemos hóspedes a partir de 12 anos para preservar a atmosfera de silêncio dos pavilhões. Berço e menu infantil são cortesia.' },
  { q: 'Qual é a política de cancelamento?', a: 'Cancelamentos até 14 dias antes da chegada são gratuitos. Entre 13 e 7 dias, cobramos o equivalente a uma diária. Com menos de 7 dias, o valor integral é retido. Datas especiais podem ter condições próprias, sempre informadas antes da confirmação.' },
  { q: 'Posso reservar experiências antes da estadia?', a: 'Sim. Você pode pré-selecionar experiências neste site; elas entram na sua solicitação de reserva sem cobrança. O concierge confirma horários e condições de maré ou clima por contato direto. Atividades só são cobradas após confirmação.' },
];

export const formatBRL = (value: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(value);
