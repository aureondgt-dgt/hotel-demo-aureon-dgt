import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Car, ChevronDown, Clock3, Leaf, MapPin, Plane, Quote, Sun, Waves, X } from 'lucide-react';
import { faqs, gallery, journal, menus, testimonials } from '../data';
import { ImageReveal, Logo, Reveal, SectionHeader, TextLink, useModalLifecycle } from './UI';

export function GastronomySection() {
  const tabs = Object.keys(menus) as Array<keyof typeof menus>;
  const [tab, setTab] = useState<keyof typeof menus>('Do mar');
  return (
    <section id="gastronomia" className="section-space overflow-hidden bg-forest text-white">
      <div className="page-shell">
        <SectionHeader light eyebrow="À mesa" title={<>Da terra ao fogo.<br /><em>Do mar à mesa.</em></>} text="O restaurante ORA segue a pesca de linha, a horta e a estação. Um cardápio curto, brasileiro e vivo — nunca exatamente igual ao de ontem." />
        <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7" direction="left">
            <div className="relative">
              <ImageReveal src="https://images.pexels.com/photos/33033815/pexels-photo-33033815.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=1500" alt="Mesa do restaurante ORA com pratos autorais" className="aspect-[4/5] sm:aspect-[5/4]" />
              <div className="absolute -bottom-6 -right-2 max-w-[230px] bg-lime p-6 text-forest sm:-right-7 sm:p-7">
                <p className="font-serif text-3xl leading-none">ORA</p><p className="mt-3 text-xs leading-relaxed text-forest/70">cozinha de origem<br />terça a domingo<br />12h—22h30</p>
              </div>
            </div>
          </Reveal>
          <Reveal className="lg:col-span-5" direction="right">
            <div className="lg:pt-6">
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/45">Uma amostra do menu</p>
              <div className="mt-5 flex gap-2 border-b border-white/15 pb-5">
                {tabs.map((item) => <button key={item} onClick={() => setTab(item)} className={`rounded-full px-4 py-2 text-[11px] transition-all ${tab === item ? 'bg-lime text-forest' : 'border border-white/20 text-white/60 hover:border-white/60 hover:text-white'}`}>{item}</button>)}
              </div>
              <AnimatePresence mode="wait">
                <motion.div key={tab} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35 }}>
                  {menus[tab].map((dish, index) => <motion.div key={dish.name} initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.07 }} className="border-b border-white/15 py-6"><div className="flex items-start justify-between gap-4"><h3 className="max-w-sm font-serif text-[1.55rem] leading-[1.15]">{dish.name}</h3><span className="pt-1 text-xs text-lime">R$ {dish.price}</span></div><p className="mt-2 text-[10px] uppercase tracking-[0.14em] text-white/40">{dish.note}</p></motion.div>)}
                </motion.div>
              </AnimatePresence>
              <p className="mt-5 text-xs leading-relaxed text-white/45">Menu ilustrativo, sujeito à pesca e à colheita. Opções vegetarianas, veganas e adaptações para restrições alimentares.</p>
              <div className="mt-8"><TextLink light href="mailto:ora@aurahouse.com.br?subject=Reserva%20de%20mesa%20no%20ORA">Reservar uma mesa</TextLink></div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const principles = [
  { icon: Sun, title: 'Sombra antes de máquina', text: 'Pavilhões orientados para ventilação cruzada, beirais profundos e brises que filtram o sol da tarde.' },
  { icon: Waves, title: 'Água em ciclo', text: 'Chuva captada para os jardins, água de reuso na irrigação e piscinas tratadas com baixo teor de cloro.' },
  { icon: Leaf, title: 'Paisagem que pertence', text: 'Revegetação com espécies de restinga, horta produtiva e compras diretas de produtores e pescadores locais.' },
];

export function ArchitectureSection() {
  return (
    <section id="arquitetura" className="section-space bg-bone">
      <div className="page-shell">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal><p className="section-kicker">Arquitetura & território</p><h2 className="mt-6 font-serif text-[clamp(3rem,5.4vw,5.8rem)] leading-[0.95] tracking-[-0.035em]">Menos gesto.<br /><em>Mais lugar.</em></h2></Reveal>
            <Reveal delay={0.12}><p className="mt-8 max-w-md text-[15px] leading-[1.85] text-ink/65">Assinado pelo Studio Noma, o AURA se apoia suavemente na restinga. Concreto, madeira certificada e pedra da região envelhecem com a maresia, em vez de tentar escondê-la.</p></Reveal>
            <div className="mt-10 space-y-7">
              {principles.map((principle, index) => <Reveal key={principle.title} delay={index * 0.08}><div className="grid grid-cols-[38px_1fr] gap-4 border-t border-ink/15 pt-5"><principle.icon size={20} strokeWidth={1.4} className="text-terracotta" /><div><h3 className="font-serif text-2xl">{principle.title}</h3><p className="mt-2 text-xs leading-[1.75] text-ink/55">{principle.text}</p></div></div></Reveal>)}
            </div>
          </div>
          <div className="lg:col-span-7">
            <ImageReveal src="https://images.pexels.com/photos/297985/pexels-photo-297985.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=1300" alt="Arquitetura de concreto e piscina integrada à paisagem" className="aspect-[4/5] lg:sticky lg:top-8" />
            <p className="mt-3 text-[10px] uppercase tracking-[0.15em] text-ink/40">Lajes profundas · brises de madeira · concreto aparente</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function GallerySection() {
  const [active, setActive] = useState<number | null>(null);
  useEffect(() => {
    if (active === null) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const keydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActive(null);
      if (event.key === 'ArrowRight') setActive((value) => value === null ? 0 : (value + 1) % gallery.length);
      if (event.key === 'ArrowLeft') setActive((value) => value === null ? 0 : (value - 1 + gallery.length) % gallery.length);
    };
    window.addEventListener('keydown', keydown);
    return () => { document.body.style.overflow = previous; window.removeEventListener('keydown', keydown); };
  }, [active]);
  return (
    <section id="galeria" className="section-space bg-[#e6e6dc]">
      <div className="page-shell">
        <SectionHeader eyebrow="Fragmentos" title={<>Veja de perto.<br /><em>Imagine-se aqui.</em></>} text="Uma coleção de luz, matéria e pequenos rituais. Selecione uma imagem para abrir a galeria em tela cheia." />
        <div className="mt-14 grid auto-rows-[250px] grid-cols-2 gap-3 sm:auto-rows-[320px] lg:mt-20 lg:grid-cols-4 lg:gap-4">
          {gallery.map((image, index) => <motion.button key={image.src} onClick={() => setActive(index)} className={`group relative overflow-hidden bg-sage/20 text-left ${index === 0 || index === 5 ? 'col-span-2' : ''} ${index === 1 || index === 3 ? 'row-span-2' : ''}`} initial={{ opacity: 0, clipPath: 'inset(10% 0 10% 0)' }} whileInView={{ opacity: 1, clipPath: 'inset(0% 0 0% 0)' }} viewport={{ once: true }} transition={{ duration: 0.8, delay: index * 0.06 }}>
            <img src={image.src} alt={image.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent opacity-70 transition-opacity group-hover:opacity-100" />
            <div className="absolute inset-x-4 bottom-4 flex items-end justify-between text-white sm:inset-x-5 sm:bottom-5"><div><p className="text-[9px] uppercase tracking-[0.18em] text-white/60">{image.tag}</p><p className="mt-1 font-serif text-xl sm:text-2xl">{image.title}</p></div><ArrowUpRight size={18} className="mb-1 transition-transform duration-500 group-hover:rotate-45" /></div>
          </motion.button>)}
        </div>
      </div>
      <AnimatePresence>
        {active !== null && <motion.div className="fixed inset-0 z-[95] flex flex-col bg-[#0b1712] p-4 text-white sm:p-7" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="dialog" aria-modal="true" aria-label="Galeria de imagens">
          <div className="flex items-center justify-between"><Logo light /><button onClick={() => setActive(null)} className="grid h-11 w-11 place-items-center rounded-full border border-white/20 transition hover:bg-white hover:text-ink" aria-label="Fechar galeria"><X size={18} /></button></div>
          <div className="relative flex min-h-0 flex-1 items-center justify-center py-5"><AnimatePresence mode="wait"><motion.img key={active} src={gallery[active].src} alt={gallery[active].title} className="max-h-full max-w-full object-contain" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.02 }} transition={{ duration: 0.4 }} /></AnimatePresence></div>
          <div className="flex items-center justify-between border-t border-white/15 pt-5"><div><p className="font-serif text-2xl">{gallery[active].title}</p><p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-white/40">{gallery[active].tag} · 0{active + 1} / 0{gallery.length}</p></div><div className="flex gap-2"><button onClick={() => setActive((active - 1 + gallery.length) % gallery.length)} className="gallery-arrow" aria-label="Imagem anterior"><ArrowLeft size={18} /></button><button onClick={() => setActive((active + 1) % gallery.length)} className="gallery-arrow" aria-label="Próxima imagem"><ArrowRight size={18} /></button></div></div>
        </motion.div>}
      </AnimatePresence>
    </section>
  );
}

export function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const previous = () => setActive((active - 1 + testimonials.length) % testimonials.length);
  const next = () => setActive((active + 1) % testimonials.length);
  return (
    <section className="bg-lime py-24 text-forest sm:py-32">
      <div className="page-shell">
        <Reveal><div className="flex items-center justify-between"><p className="section-kicker !text-forest/55">Palavras de quem ficou</p><Quote size={34} strokeWidth={1} className="text-forest/35" /></div></Reveal>
        <div className="mt-10 min-h-[260px] sm:min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.blockquote key={active} initial={{ opacity: 0, y: 45, clipPath: 'inset(0 0 20% 0)' }} animate={{ opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' }} exit={{ opacity: 0, y: -25 }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>
              <p className="max-w-6xl text-balance font-serif text-[clamp(2.5rem,5.6vw,6rem)] leading-[1.02] tracking-[-0.035em]">“{testimonials[active].quote}”</p>
              <footer className="mt-8 flex items-center gap-4 text-xs"><span className="h-px w-8 bg-forest/40" /><strong className="font-medium">{testimonials[active].author}</strong><span className="text-forest/50">{testimonials[active].origin}</span></footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>
        <div className="mt-8 flex items-center justify-between border-t border-forest/20 pt-6"><span className="text-[10px] tabular-nums">0{active + 1} / 0{testimonials.length}</span><div className="flex gap-2"><button onClick={previous} className="gallery-arrow !border-forest/25 !bg-transparent !text-forest hover:!bg-forest hover:!text-lime" aria-label="Depoimento anterior"><ArrowLeft size={17} /></button><button onClick={next} className="gallery-arrow !border-forest/25 !bg-transparent !text-forest hover:!bg-forest hover:!text-lime" aria-label="Próximo depoimento"><ArrowRight size={17} /></button></div></div>
      </div>
    </section>
  );
}

export function JournalSection() {
  const [active, setActive] = useState<number | null>(null);
  useModalLifecycle(active !== null, () => setActive(null));
  return (
    <section id="caderno" className="section-space bg-bone">
      <div className="page-shell">
        <SectionHeader eyebrow="Caderno AURA" title={<>Histórias para<br /><em>ler sem pressa.</em></>} text="Notas sobre arquitetura, território e as pessoas que fazem este lugar acontecer." />
        <div className="mt-14 grid gap-10 md:grid-cols-3 lg:mt-20">
          {journal.map((article, index) => <Reveal key={article.slug} delay={index * 0.1}><article className="group"><button onClick={() => setActive(index)} className="block w-full text-left"><div className="aspect-[4/3] overflow-hidden bg-sage/20"><img src={article.image} alt={article.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1100ms] group-hover:scale-105" /></div><div className="mt-5 flex gap-3 text-[9px] uppercase tracking-[0.18em] text-ink/45"><span>{article.category}</span><span>·</span><span>{article.readTime} de leitura</span></div><h3 className="mt-3 font-serif text-[2rem] leading-[1.08]">{article.title}</h3><p className="mt-4 text-sm leading-relaxed text-ink/55">{article.excerpt}</p><span className="mt-5 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.17em]">Ler história <ArrowUpRight size={14} className="transition-transform duration-500 group-hover:rotate-45" /></span></button></article></Reveal>)}
        </div>
      </div>
      <AnimatePresence>
        {active !== null && <motion.div className="fixed inset-0 z-[95] overflow-y-auto bg-forest/80 p-0 backdrop-blur-md sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => event.target === event.currentTarget && setActive(null)}>
          <motion.article role="dialog" aria-modal="true" aria-label={journal[active].title} className="relative mx-auto min-h-full max-w-4xl bg-bone sm:min-h-0 sm:rounded-2xl" initial={{ y: 50 }} animate={{ y: 0 }} exit={{ y: 50, opacity: 0 }} transition={{ type: 'spring', stiffness: 230, damping: 28 }}>
            <button onClick={() => setActive(null)} className="fixed right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full bg-bone text-ink shadow-lg sm:absolute" aria-label="Fechar artigo"><X size={18} /></button>
            <img src={journal[active].image} alt={journal[active].title} className="h-[42vh] w-full object-cover sm:rounded-t-2xl" />
            <div className="mx-auto max-w-2xl px-6 py-10 sm:px-8 sm:py-14"><div className="flex gap-3 text-[10px] uppercase tracking-[0.18em] text-ink/45"><span>{journal[active].category}</span><span>·</span><span>{journal[active].readTime}</span></div><h2 className="mt-5 font-serif text-5xl leading-[1.02] sm:text-6xl">{journal[active].title}</h2><p className="mt-6 border-l-2 border-terracotta pl-5 font-serif text-2xl italic leading-snug text-ink/65">{journal[active].excerpt}</p><div className="mt-8 space-y-6">{journal[active].body.map((paragraph) => <p key={paragraph} className="text-[15px] leading-[1.95] text-ink/70">{paragraph}</p>)}</div><p className="mt-10 border-t border-ink/10 pt-5 text-[10px] uppercase tracking-[0.17em] text-ink/40">Caderno AURA · Escrito na beira do mar</p></div>
          </motion.article>
        </motion.div>}
      </AnimatePresence>
    </section>
  );
}

export function LocationSection() {
  return (
    <section id="chegada" className="section-space overflow-hidden bg-[#d8ddd2]">
      <div className="page-shell">
        <SectionHeader eyebrow="Chegar faz parte" title={<>Perto do mundo.<br /><em>Longe do ruído.</em></>} text="Na costa entre Maceió e Recife, uma estrada de coqueiros conduz à nossa enseada. O concierge organiza cada trecho da chegada." />
        <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-12">
          <Reveal className="lg:col-span-7" direction="left">
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-[#c5d1c4]">
              <svg viewBox="0 0 800 600" className="h-full w-full" role="img" aria-label="Mapa ilustrado da chegada ao AURA no litoral de Alagoas">
                <rect width="800" height="600" fill="#c5d1c4" />
                <path d="M560 -30C500 80 620 150 550 245C485 334 550 400 490 480C455 528 460 570 430 640" fill="none" stroke="#edf0e8" strokeWidth="180" />
                <path d="M620 -30C560 80 680 150 610 245C545 334 610 400 550 480C515 528 520 570 490 640" fill="none" stroke="#7ca6a0" strokeWidth="140" />
                <path d="M70 490C190 430 235 330 350 330C420 330 460 300 530 235" fill="none" stroke="#7f8f7e" strokeWidth="3" strokeDasharray="8 8" />
                <path d="M140 110C240 180 280 250 350 330" fill="none" stroke="#7f8f7e" strokeWidth="3" strokeDasharray="8 8" />
                {Array.from({ length: 28 }).map((_, index) => <circle key={index} cx={70 + (index * 83) % 430} cy={60 + (index * 117) % 470} r={5 + (index % 3) * 3} fill="#9cad95" opacity="0.55" />)}
                <circle cx="140" cy="110" r="10" fill="#f4f1e8" stroke="#294438" strokeWidth="2" /><text x="160" y="103" fill="#294438" fontSize="15" fontFamily="sans-serif">RECIFE</text><text x="160" y="125" fill="#52675b" fontSize="11" fontFamily="sans-serif">Aeroporto · 168 km</text>
                <circle cx="70" cy="490" r="10" fill="#f4f1e8" stroke="#294438" strokeWidth="2" /><text x="90" y="482" fill="#294438" fontSize="15" fontFamily="sans-serif">MACEIÓ</text><text x="90" y="504" fill="#52675b" fontSize="11" fontFamily="sans-serif">Aeroporto · 92 km</text>
                <circle cx="530" cy="235" r="28" fill="#dfff80" /><circle cx="530" cy="235" r="9" fill="#294438" /><path d="M530 220L530 190" stroke="#294438" strokeWidth="2" /><text x="380" y="180" fill="#294438" fontSize="24" fontFamily="serif">AURA House</text><text x="380" y="202" fill="#52675b" fontSize="11" fontFamily="sans-serif">São Miguel dos Milagres · AL</text>
                <text x="680" y="370" fill="#e7f0e8" fontSize="13" fontFamily="sans-serif" transform="rotate(75 680 370)" letterSpacing="4">OCEANO ATLÂNTICO</text>
              </svg>
              <a href="https://www.google.com/maps/search/?api=1&query=S%C3%A3o+Miguel+dos+Milagres+Alagoas" target="_blank" rel="noreferrer" className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-bone px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink shadow-lg transition hover:bg-lime"><MapPin size={14} />Abrir no mapa <ArrowUpRight size={13} /></a>
            </div>
          </Reveal>
          <div className="lg:col-span-5 lg:pl-6">
            <Reveal><div className="border-t border-ink/15 pt-6"><Plane size={22} strokeWidth={1.4} className="text-terracotta" /><h3 className="mt-4 font-serif text-3xl">Via Maceió · MCZ</h3><p className="mt-3 text-sm leading-[1.8] text-ink/60">Voos diretos das principais capitais brasileiras. Transfer privativo de 92 km, com duração aproximada de 1h40.</p></div></Reveal>
            <Reveal delay={0.08}><div className="mt-7 border-t border-ink/15 pt-6"><Car size={22} strokeWidth={1.4} className="text-terracotta" /><h3 className="mt-4 font-serif text-3xl">Transfer com anfitrião</h3><p className="mt-3 text-sm leading-[1.8] text-ink/60">Recepção no desembarque, água e lanche a bordo. Enviamos a cotação conforme o número de hóspedes e o voo.</p><a className="mt-4 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.15em] underline decoration-ink/30 underline-offset-4" href="mailto:concierge@aurahouse.com.br?subject=Transfer%20para%20o%20AURA">Organizar meu transfer <ArrowUpRight size={13} /></a></div></Reveal>
            <Reveal delay={0.16}><div className="mt-7 border-t border-ink/15 pt-6"><Clock3 size={22} strokeWidth={1.4} className="text-terracotta" /><h3 className="mt-4 font-serif text-3xl">Sem pressa na chegada</h3><p className="mt-3 text-sm leading-[1.8] text-ink/60">Check-in a partir das 15h. Se chegar antes, deixe as malas conosco: o almoço, a piscina e o mar já estarão esperando.</p></div></Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FAQSection() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="section-space bg-bone">
      <div className="page-shell grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4"><Reveal><p className="section-kicker">Antes de fazer as malas</p><h2 className="mt-6 font-serif text-[clamp(3rem,5vw,5.5rem)] leading-[0.96]">Perguntas,<br /><em>respostas.</em></h2><p className="mt-7 max-w-sm text-sm leading-[1.8] text-ink/55">Se a sua dúvida não estiver aqui, nosso concierge responde pessoalmente.</p><div className="mt-7"><TextLink href="mailto:concierge@aurahouse.com.br">Falar com o concierge</TextLink></div></Reveal></div>
        <div className="lg:col-span-7 lg:col-start-6">
          {faqs.map((faq, index) => <Reveal key={faq.q} delay={index * 0.04}><div className="border-t border-ink/15 last:border-b"><button onClick={() => setOpen(open === index ? -1 : index)} aria-expanded={open === index} className="flex w-full items-center justify-between gap-6 py-6 text-left"><span className="font-serif text-2xl sm:text-[1.7rem]">{faq.q}</span><span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border border-ink/20 transition-transform duration-500 ${open === index ? 'rotate-180 bg-ink text-bone' : ''}`}><ChevronDown size={15} /></span></button><AnimatePresence initial={false}>{open === index && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden"><p className="max-w-2xl pb-7 pr-10 text-sm leading-[1.85] text-ink/60">{faq.a}</p></motion.div>}</AnimatePresence></div></Reveal>)}
        </div>
      </div>
    </section>
  );
}

export function Footer({ onBook }: { onBook: () => void }) {
  return (
    <footer className="overflow-hidden bg-forest text-white">
      <div className="page-shell pb-8 pt-24 sm:pt-32">
        <Reveal><div className="flex flex-col items-start justify-between gap-8 border-b border-white/15 pb-16 sm:flex-row sm:items-end"><div><p className="text-[10px] uppercase tracking-[0.22em] text-white/45">Quando for a hora</p><h2 className="mt-5 font-serif text-[clamp(3.8rem,8vw,8.5rem)] leading-[0.85] tracking-[-0.045em]">O mar está<br /><em className="text-lime">esperando.</em></h2></div><button onClick={onBook} className="group grid h-36 w-36 shrink-0 place-items-center rounded-full bg-lime text-forest transition-transform duration-500 hover:scale-105 sm:h-44 sm:w-44"><span className="flex flex-col items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.16em]">Solicitar reserva<ArrowUpRight size={24} className="transition-transform duration-500 group-hover:rotate-45" /></span></button></div></Reveal>
        <div className="grid gap-10 border-b border-white/15 py-12 sm:grid-cols-2 lg:grid-cols-4">
          <div><Logo light /><p className="mt-5 max-w-[220px] text-xs leading-[1.8] text-white/45">Um refúgio entre a restinga e o Atlântico no litoral norte de Alagoas.</p></div>
          <div><p className="footer-label">Explore</p><div className="mt-4 flex flex-col items-start gap-3 text-sm text-white/65"><a className="footer-link" href="#suites">Suítes</a><a className="footer-link" href="#experiencias">Experiências</a><a className="footer-link" href="#gastronomia">Restaurante ORA</a><a className="footer-link" href="#caderno">Caderno AURA</a></div></div>
          <div><p className="footer-label">Converse</p><div className="mt-4 flex flex-col items-start gap-3 text-sm text-white/65"><a className="footer-link" href="mailto:concierge@aurahouse.com.br">concierge@aurahouse.com.br</a><a className="footer-link" href="tel:+558233330180">+55 82 3333 0180</a><span>Seg—Dom · 8h às 20h</span></div></div>
          <div><p className="footer-label">Encontre</p><address className="mt-4 text-sm not-italic leading-[1.9] text-white/65">Litoral norte de Alagoas<br />São Miguel dos Milagres, AL<br />Brasil</address><a href="https://www.google.com/maps/search/?api=1&query=S%C3%A3o+Miguel+dos+Milagres+Alagoas" target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.15em] text-lime">Abrir localização <ArrowUpRight size={13} /></a></div>
        </div>
        <div className="flex flex-col gap-3 pt-7 text-[9px] uppercase tracking-[0.14em] text-white/35 sm:flex-row sm:items-center sm:justify-between"><p>© {new Date().getFullYear()} AURA House · Hospitalidade brasileira</p><p>Feito para respirar devagar</p></div>
      </div>
    </footer>
  );
}
