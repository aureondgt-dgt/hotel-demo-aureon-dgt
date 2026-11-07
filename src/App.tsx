import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { ArrowDown, ArrowRight, ArrowUpRight, BedDouble, CalendarDays, Check, ChevronDown, Compass, Menu, Moon, Move3d, Sun, Users, X } from 'lucide-react';
import HotelScene, { type SceneMood, type SceneView } from './components/HotelScene';
import BookingModal from './components/BookingModal';
import { DayStory, ExperiencesSection, SuitesSection } from './components/StorySections';
import { ArchitectureSection, FAQSection, Footer, GallerySection, GastronomySection, JournalSection, LocationSection, TestimonialsSection } from './components/ContentSections';
import { ImageReveal, Logo, Reveal, SplitWords, useModalLifecycle } from './components/UI';
import { experiences, suites } from './data';

function isoDateFromToday(days: number) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return local.toISOString().split('T')[0];
}

const navigation = [
  { label: 'Suítes', href: '#suites' },
  { label: 'Experiências', href: '#experiencias' },
  { label: 'Gastronomia', href: '#gastronomia' },
  { label: 'Caderno', href: '#caderno' },
  { label: 'Chegada', href: '#chegada' },
];

function Header({ onBook }: { onBook: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (value) => setScrolled(value > window.innerHeight * 0.82));
  useModalLifecycle(menuOpen, () => setMenuOpen(false));

  return (
    <>
      <motion.header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${scrolled ? 'border-b border-ink/10 bg-bone/90 text-ink shadow-[0_8px_30px_rgba(20,40,30,0.04)] backdrop-blur-xl' : 'text-white'}`} initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}>
        <div className="page-shell flex h-[78px] items-center justify-between">
          <Logo light={!scrolled} />
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Navegação principal">
            {navigation.map((item) => <a key={item.href} href={item.href} className="group relative py-2 text-[10px] font-medium uppercase tracking-[0.15em] opacity-70 transition-opacity hover:opacity-100">{item.label}<span className="absolute bottom-0 left-0 h-px w-full origin-right scale-x-0 bg-current transition-transform duration-500 group-hover:origin-left group-hover:scale-x-100" /></a>)}
          </nav>
          <div className="flex items-center gap-3">
            <button onClick={onBook} className={`hidden rounded-full px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.15em] transition-all sm:flex sm:items-center sm:gap-3 ${scrolled ? 'bg-forest text-lime hover:bg-terracotta hover:text-white' : 'bg-lime text-forest hover:bg-white'}`}>Reservar <ArrowUpRight size={14} /></button>
            <button onClick={() => setMenuOpen(true)} className={`grid h-11 w-11 place-items-center rounded-full border lg:hidden ${scrolled ? 'border-ink/20' : 'border-white/30'}`} aria-label="Abrir menu"><Menu size={19} /></button>
          </div>
        </div>
      </motion.header>
      <AnimatePresence>
        {menuOpen && <motion.div className="fixed inset-0 z-[80] flex flex-col bg-forest p-5 text-white" initial={{ clipPath: 'inset(0 0 100% 0)' }} animate={{ clipPath: 'inset(0 0 0% 0)' }} exit={{ clipPath: 'inset(0 0 100% 0)' }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>
          <div className="flex h-[58px] items-center justify-between"><Logo light /><button onClick={() => setMenuOpen(false)} className="grid h-11 w-11 place-items-center rounded-full border border-white/25" aria-label="Fechar menu"><X size={19} /></button></div>
          <nav className="flex flex-1 flex-col justify-center" aria-label="Navegação móvel">
            {navigation.map((item, index) => <motion.a key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className="flex items-center justify-between border-b border-white/15 py-4 font-serif text-[clamp(2.5rem,11vw,4.5rem)] leading-none" initial={{ opacity: 0, x: -35 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.18 + index * 0.07 }}><span>{item.label}</span><span className="font-sans text-[10px] text-white/35">0{index + 1}</span></motion.a>)}
          </nav>
          <motion.button onClick={() => { setMenuOpen(false); onBook(); }} className="flex items-center justify-between rounded-full bg-lime px-6 py-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-forest" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}>Solicitar reserva <ArrowUpRight size={18} /></motion.button>
          <p className="mt-5 text-center text-[9px] uppercase tracking-[0.16em] text-white/35">São Miguel dos Milagres · Alagoas</p>
        </motion.div>}
      </AnimatePresence>
    </>
  );
}

type HeroProps = {
  onBook: () => void;
  checkIn: string;
  checkOut: string;
  guests: number;
  onDatesChange: (checkIn: string, checkOut: string) => void;
  onGuestsChange: (guests: number) => void;
};

function Hero({ onBook, checkIn, checkOut, guests, onDatesChange, onGuestsChange }: HeroProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion() ?? false;
  const [mood, setMood] = useState<SceneMood>('day');
  const [view, setView] = useState<SceneView>('overview');
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, reduced ? 1 : 0.82]);
  const sceneY = useTransform(scrollYProgress, [0, 1], ['0%', reduced ? '0%' : '16%']);
  const sceneRadius = useTransform(scrollYProgress, [0, 0.7], [0, reduced ? 0 : 40]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -130]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const bookingY = useTransform(scrollYProgress, [0, 0.55], [0, reduced ? 0 : 80]);

  return (
    <section id="inicio" ref={ref} className={`relative h-[112svh] min-h-[780px] overflow-hidden ${mood === 'night' ? 'bg-[#142623]' : 'bg-[#aebfb2]'}`}>
      <motion.div className="absolute inset-0 origin-center overflow-hidden" style={{ scale: sceneScale, y: sceneY, borderRadius: sceneRadius }}>
        <HotelScene mood={mood} view={view} reducedMotion={reduced} />
        <div className={`pointer-events-none absolute inset-0 transition-colors duration-1000 ${mood === 'night' ? 'bg-gradient-to-r from-[#07140f]/85 via-[#07140f]/20 to-transparent' : 'bg-gradient-to-r from-[#10231b]/70 via-[#10231b]/10 to-transparent'}`} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0c1b15]/55 via-transparent to-[#0c1b15]/20" />
      </motion.div>

      <motion.div className="pointer-events-none absolute inset-x-0 top-0 h-[calc(100%-110px)]" style={{ y: copyY, opacity: copyOpacity }}>
        <div className="page-shell flex h-full flex-col justify-center pb-16 pt-24 text-white sm:pb-24">
          <motion.div className="mb-5 flex items-center gap-3 text-[9px] font-semibold uppercase tracking-[0.24em] text-white/65 sm:mb-7 sm:text-[10px]" initial={{ opacity: 0, x: -25 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.75, duration: 0.8 }}><span className="h-px w-8 bg-lime" />São Miguel dos Milagres · Alagoas</motion.div>
          <h1 className="max-w-5xl font-serif text-[clamp(4.1rem,9.2vw,10rem)] leading-[0.78] tracking-[-0.045em]">
            <SplitWords text="O luxo de" delay={0.3} />
            <span className="block italic text-lime"><SplitWords text="desacelerar." delay={0.52} /></span>
          </h1>
          <div className="mt-7 flex flex-col gap-6 sm:mt-9 sm:flex-row sm:items-end sm:gap-12">
            <motion.p className="max-w-[340px] text-sm leading-[1.75] text-white/70" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.05, duration: 0.8 }}>Um refúgio de arquitetura serena entre a mata e o Atlântico. Vinte e oito suítes. Todo o tempo do mundo.</motion.p>
            <motion.a href="#manifesto" className="pointer-events-auto group flex w-fit items-center gap-4 text-[10px] font-semibold uppercase tracking-[0.18em]" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.18, duration: 0.8 }}><span className="grid h-12 w-12 place-items-center rounded-full border border-white/35 transition-all duration-500 group-hover:bg-lime group-hover:text-forest"><ArrowDown size={17} className="transition-transform group-hover:translate-y-1" /></span>Descobrir o AURA</motion.a>
          </div>
        </div>
      </motion.div>

      <motion.div className="absolute right-5 top-[105px] z-10 flex flex-col items-end gap-3 sm:right-8 sm:top-[110px] lg:right-12" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.1, duration: 0.8 }}>
        <div className="flex rounded-full border border-white/25 bg-black/10 p-1 backdrop-blur-md">
          <button onClick={() => setMood('day')} aria-label="Ver hotel durante o dia" aria-pressed={mood === 'day'} className={`grid h-9 w-9 place-items-center rounded-full transition-all ${mood === 'day' ? 'bg-lime text-forest' : 'text-white/65 hover:text-white'}`}><Sun size={15} /></button>
          <button onClick={() => setMood('night')} aria-label="Ver hotel durante a noite" aria-pressed={mood === 'night'} className={`grid h-9 w-9 place-items-center rounded-full transition-all ${mood === 'night' ? 'bg-lime text-forest' : 'text-white/65 hover:text-white'}`}><Moon size={15} /></button>
        </div>
        <div className="hidden overflow-hidden rounded-2xl border border-white/20 bg-black/10 p-1.5 backdrop-blur-md sm:block">
          {([['overview', 'Vista geral'], ['pool', 'Piscina'], ['suites', 'Suítes']] as Array<[SceneView, string]>).map(([id, label]) => <button key={id} onClick={() => setView(id)} className={`block w-28 rounded-xl px-3 py-2.5 text-left text-[9px] uppercase tracking-[0.14em] transition-all ${view === id ? 'bg-white/90 text-forest' : 'text-white/60 hover:bg-white/10 hover:text-white'}`}>{label}</button>)}
        </div>
      </motion.div>

      <div className="pointer-events-none absolute bottom-[130px] right-8 hidden items-center gap-2 text-[9px] uppercase tracking-[0.15em] text-white/55 md:flex"><Move3d size={14} />Arraste a arquitetura para explorar</div>

      <motion.div className="absolute inset-x-0 bottom-0 z-20 p-3 sm:p-5" style={{ y: bookingY }} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.25, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
        <div className="mx-auto grid max-w-[1500px] grid-cols-2 overflow-hidden rounded-2xl border border-white/20 bg-[#10241c]/75 text-white shadow-2xl backdrop-blur-xl md:grid-cols-[1.25fr_1fr_1fr_0.8fr_auto] md:rounded-full">
          <div className="hidden items-center gap-3 border-b border-white/15 px-6 py-4 md:flex md:border-b-0 md:border-r"><BedDouble size={18} className="text-lime" /><div><p className="text-[9px] uppercase tracking-[0.17em] text-white/45">Sua estadia</p><p className="mt-1 text-xs">Reserve direto, sem intermediários</p></div></div>
          <label className="flex items-center gap-3 border-b border-r border-white/15 px-5 py-3 md:border-b-0 md:px-6 md:py-4"><CalendarDays size={16} className="shrink-0 text-lime" /><span className="w-full"><span className="block text-[8px] uppercase tracking-[0.17em] text-white/45">Chegada</span><input aria-label="Data de chegada" type="date" min={isoDateFromToday(0)} value={checkIn} onChange={(event) => onDatesChange(event.target.value, checkOut)} className="mt-1 w-full bg-transparent text-xs text-white outline-none [color-scheme:dark]" /></span></label>
          <label className="flex items-center gap-3 border-b border-white/15 px-5 py-3 md:border-b-0 md:border-r md:px-6 md:py-4"><CalendarDays size={16} className="shrink-0 text-lime" /><span className="w-full"><span className="block text-[8px] uppercase tracking-[0.17em] text-white/45">Saída</span><input aria-label="Data de saída" type="date" min={checkIn} value={checkOut} onChange={(event) => onDatesChange(checkIn, event.target.value)} className="mt-1 w-full bg-transparent text-xs text-white outline-none [color-scheme:dark]" /></span></label>
          <label className="relative flex items-center gap-3 px-5 py-3 md:px-6 md:py-4"><Users size={16} className="shrink-0 text-lime" /><span className="w-full"><span className="block text-[8px] uppercase tracking-[0.17em] text-white/45">Hóspedes</span><select aria-label="Número de hóspedes" value={guests} onChange={(event) => onGuestsChange(Number(event.target.value))} className="mt-1 w-full appearance-none bg-transparent text-xs outline-none">{[1, 2, 3, 4, 5, 6].map((number) => <option key={number} value={number} className="bg-forest">{number} {number === 1 ? 'hóspede' : 'hóspedes'}</option>)}</select></span><ChevronDown size={12} className="pointer-events-none absolute right-4 text-white/50" /></label>
          <button onClick={onBook} className="group m-2 flex items-center justify-between gap-5 rounded-xl bg-lime px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.14em] text-forest transition-colors hover:bg-white md:m-1.5 md:rounded-full">Solicitar reserva <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" /></button>
        </div>
      </motion.div>
    </section>
  );
}

function Manifesto() {
  return (
    <section id="manifesto" className="relative z-10 bg-bone pt-24 sm:pt-32">
      <div className="page-shell">
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-3"><p className="section-kicker">O essencial, elevado</p></Reveal>
          <Reveal className="lg:col-span-9" delay={0.1}><h2 className="max-w-6xl text-balance font-serif text-[clamp(3rem,6vw,6.8rem)] leading-[1.01] tracking-[-0.035em]">Entre a mata e o mar, um hotel que entende o valor de <em className="text-terracotta">não ter pressa.</em></h2></Reveal>
        </div>
        <div className="mt-14 grid gap-10 border-t border-ink/15 pt-8 sm:mt-20 lg:grid-cols-12">
          <Reveal className="lg:col-span-4 lg:col-start-4"><p className="max-w-md text-[15px] leading-[1.9] text-ink/60">Aqui, o serviço aparece antes da necessidade e desaparece antes de virar interrupção. A natureza dita a programação. A arquitetura abre passagem para a brisa. E cada escolha, do prato ao travesseiro, tem origem e propósito.</p></Reveal>
          <div className="grid grid-cols-3 gap-4 lg:col-span-5">
            {[['28', 'suítes e pavilhões'], ['12 ha', 'de restinga preservada'], ['01', 'enseada quase só sua']].map(([value, label], index) => <Reveal key={label} delay={index * 0.08}><div><strong className="block font-serif text-4xl font-normal sm:text-5xl">{value}</strong><span className="mt-2 block max-w-[100px] text-[10px] uppercase leading-relaxed tracking-[0.12em] text-ink/45">{label}</span></div></Reveal>)}
          </div>
        </div>
        <div className="relative mt-16 sm:mt-24">
          <ImageReveal src="https://images.pexels.com/photos/35113998/pexels-photo-35113998.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1100&w=1900" alt="Pavilhões do AURA entre vegetação e oceano" className="aspect-[4/3] sm:aspect-[16/8]" />
          <Reveal className="absolute bottom-5 left-5 max-w-[240px] bg-bone/90 p-5 backdrop-blur-md sm:bottom-8 sm:left-8 sm:p-7" delay={0.3}><Compass size={20} strokeWidth={1.4} className="text-terracotta" /><p className="mt-3 font-serif text-2xl leading-tight">9°15′ S<br />35°22′ W</p><p className="mt-2 text-[9px] uppercase tracking-[0.17em] text-ink/45">Onde o mapa vira sensação</p></Reveal>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingSuite, setBookingSuite] = useState(suites[0].id);
  const [checkIn, setCheckIn] = useState(isoDateFromToday(30));
  const [checkOut, setCheckOut] = useState(isoDateFromToday(33));
  const [guests, setGuests] = useState(2);
  const [selectedExperiences, setSelectedExperiences] = useState<string[]>(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('aura-selected-experiences') || '[]');
      return Array.isArray(saved) ? saved.filter((id) => experiences.some((item) => item.id === id)) : [];
    } catch { return []; }
  });
  const [toast, setToast] = useState('');

  useEffect(() => {
    try { localStorage.setItem('aura-selected-experiences', JSON.stringify(selectedExperiences)); } catch { /* Storage can be blocked in private browsing. */ }
  }, [selectedExperiences]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(''), 3200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const openBooking = useCallback((suiteId?: string) => {
    if (suiteId) setBookingSuite(suiteId);
    setBookingOpen(true);
  }, []);

  const handleDatesChange = useCallback((arrival: string, departure: string) => {
    setCheckIn(arrival);
    const minimumDeparture = new Date(`${arrival}T12:00:00`);
    minimumDeparture.setDate(minimumDeparture.getDate() + 2);
    if (new Date(`${departure}T12:00:00`) <= new Date(`${arrival}T12:00:00`)) setCheckOut(minimumDeparture.toISOString().split('T')[0]);
    else setCheckOut(departure);
  }, []);

  const toggleExperience = (id: string) => {
    const item = experiences.find((experience) => experience.id === id);
    const removing = selectedExperiences.includes(id);
    setSelectedExperiences((current) => removing ? current.filter((itemId) => itemId !== id) : [...current, id]);
    setToast(`${item?.title ?? 'Experiência'} ${removing ? 'removida da' : 'adicionada à'} sua estadia.`);
  };

  return (
    <div className="min-h-screen bg-bone text-ink">
      <a href="#conteudo" className="fixed left-4 top-3 z-[120] -translate-y-20 rounded-full bg-lime px-5 py-3 text-xs text-forest transition-transform focus:translate-y-0">Pular para o conteúdo</a>
      <Header onBook={() => openBooking()} />
      <main id="conteudo">
        <Hero onBook={() => openBooking()} checkIn={checkIn} checkOut={checkOut} guests={guests} onDatesChange={handleDatesChange} onGuestsChange={setGuests} />
        <Manifesto />
        <SuitesSection onBook={openBooking} />
        <DayStory />
        <ExperiencesSection selected={selectedExperiences} onToggle={toggleExperience} />
        <GastronomySection />
        <ArchitectureSection />
        <GallerySection />
        <TestimonialsSection />
        <JournalSection />
        <LocationSection />
        <FAQSection />
      </main>
      <Footer onBook={() => openBooking()} />

      <AnimatePresence>
        {selectedExperiences.length > 0 && !bookingOpen && <motion.div className="fixed bottom-4 right-4 z-40 sm:bottom-6 sm:right-6" initial={{ opacity: 0, y: 25, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.95 }}>
          <button onClick={() => openBooking()} className="group flex items-center gap-4 rounded-full bg-forest py-2 pl-5 pr-2 text-white shadow-2xl"><span className="text-left"><span className="block text-[9px] uppercase tracking-[0.14em] text-lime">{selectedExperiences.length} experiência{selectedExperiences.length > 1 ? 's' : ''}</span><span className="mt-0.5 block text-xs text-white/70">na sua estadia</span></span><span className="grid h-11 w-11 place-items-center rounded-full bg-lime text-forest transition-transform group-hover:rotate-45"><ArrowUpRight size={17} /></span></button>
        </motion.div>}
      </AnimatePresence>
      <AnimatePresence>
        {toast && <motion.div role="status" className="fixed bottom-24 left-1/2 z-[110] flex w-[calc(100%-32px)] max-w-md -translate-x-1/2 items-center gap-3 rounded-full bg-bone px-5 py-4 text-xs text-ink shadow-2xl sm:bottom-6" initial={{ opacity: 0, y: 20, x: '-50%' }} animate={{ opacity: 1, y: 0, x: '-50%' }} exit={{ opacity: 0, y: 12, x: '-50%' }}><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-moss text-lime"><Check size={14} /></span>{toast}<button onClick={() => setToast('')} className="ml-auto" aria-label="Fechar aviso"><X size={14} /></button></motion.div>}
      </AnimatePresence>

      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} initialSuite={bookingSuite} checkIn={checkIn} checkOut={checkOut} guests={guests} onDatesChange={handleDatesChange} onGuestsChange={setGuests} selectedExperiences={selectedExperiences} onToggleExperience={toggleExperience} />
    </div>
  );
}
