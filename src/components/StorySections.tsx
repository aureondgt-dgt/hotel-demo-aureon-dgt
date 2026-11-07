import { useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react';
import { ArrowRight, ArrowUpRight, Check, ChevronLeft, ChevronRight, Clock3, Plus, Users, X } from 'lucide-react';
import { dayChapters, experiences, formatBRL, suites } from '../data';
import { Reveal, SectionHeader, useModalLifecycle } from './UI';

function StoryLayer({ progress, index, image, title }: { progress: MotionValue<number>; index: number; image: string; title: string }) {
  const start = index === 0 ? 0 : (index - 0.72) / dayChapters.length;
  const end = index === 0 ? 0.01 : (index - 0.12) / dayChapters.length;
  const clipPath = useTransform(progress, [start, end], index === 0 ? ['inset(0% 0% 0% 0%)', 'inset(0% 0% 0% 0%)'] : ['inset(100% 0% 0% 0%)', 'inset(0% 0% 0% 0%)']);
  const scale = useTransform(progress, [Math.max(0, start), Math.min(1, end + 0.22)], [1.09, 1]);
  const y = useTransform(progress, [0, 1], [index * -6, index * -22]);
  return (
    <motion.div className="absolute inset-0" style={{ clipPath, zIndex: index + 1 }}>
      <motion.img src={image} alt={title} className="h-full w-full object-cover" style={{ scale, y }} loading={index === 0 ? 'eager' : 'lazy'} />
      <div className="absolute inset-0 bg-gradient-to-t from-[#071510]/85 via-[#071510]/15 to-[#071510]/35" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#071510]/35 to-transparent" />
    </motion.div>
  );
}

export function DayStory() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const [active, setActive] = useState(0);
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    const next = Math.min(dayChapters.length - 1, Math.floor(value * dayChapters.length));
    if (next !== active) setActive(next);
  });

  const goToChapter = (index: number) => {
    if (!ref.current) return;
    const scrollable = ref.current.offsetHeight - window.innerHeight;
    window.scrollTo({ top: ref.current.offsetTop + scrollable * ((index + 0.18) / dayChapters.length), behavior: reduced ? 'auto' : 'smooth' });
  };

  if (reduced) {
    return (
      <section id="um-dia" ref={ref} className="bg-forest py-24 text-white">
        <div className="page-shell"><SectionHeader light eyebrow="Um dia no AURA" title={<>O relógio perde<br /><em>a importância.</em></>} /></div>
        <div className="page-shell mt-16 space-y-8">
          {dayChapters.map((chapter) => <article key={chapter.time} className="grid overflow-hidden rounded-2xl bg-white/5 md:grid-cols-2"><img src={chapter.image} alt={chapter.title} className="h-80 w-full object-cover md:h-full" loading="lazy" /><div className="p-8 md:p-12"><p className="font-serif text-5xl text-lime">{chapter.time}</p><p className="mt-8 text-[10px] uppercase tracking-[0.2em] text-white/50">{chapter.kicker}</p><h3 className="mt-3 font-serif text-4xl">{chapter.title}</h3><p className="mt-5 text-sm leading-relaxed text-white/60">{chapter.text}</p></div></article>)}
        </div>
      </section>
    );
  }

  return (
    <section id="um-dia" ref={ref} className="relative h-[430vh] bg-forest">
      <div className="sticky top-0 h-screen overflow-hidden">
        {dayChapters.map((chapter, index) => <StoryLayer key={chapter.time} progress={scrollYProgress} index={index} image={chapter.image} title={chapter.title} />)}
        <div className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-between p-5 pt-24 text-white sm:p-8 sm:pt-28 lg:p-12 lg:pt-28">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/60"><span className="h-px w-8 bg-white/40" />Um dia no AURA</div>
            <div className="hidden text-right text-[10px] uppercase tracking-[0.2em] text-white/45 sm:block">Role para sentir<br />o tempo passar</div>
          </div>
          <div className="grid items-end gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <AnimatePresence mode="wait">
                <motion.div key={active} initial={{ opacity: 0, y: 55, clipPath: 'inset(0 0 30% 0)' }} animate={{ opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' }} exit={{ opacity: 0, y: -35 }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>
                  <p className="mb-4 font-serif text-5xl italic text-lime sm:text-7xl">{dayChapters[active].time}</p>
                  <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/55">{dayChapters[active].kicker}</p>
                  <h2 className="max-w-4xl text-balance font-serif text-[clamp(3rem,7.5vw,7.6rem)] leading-[0.88] tracking-[-0.04em]">{dayChapters[active].title}</h2>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="hidden lg:col-span-3 lg:col-start-10 lg:block">
              <AnimatePresence mode="wait"><motion.p key={active} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="max-w-sm text-sm leading-[1.85] text-white/70">{dayChapters[active].text}</motion.p></AnimatePresence>
            </div>
          </div>
          <div className="pointer-events-auto flex items-end justify-between gap-8">
            <div className="flex flex-1 items-center gap-4">
              <span className="text-[10px] tabular-nums text-white/60">0{active + 1}</span>
              <div className="h-px flex-1 overflow-hidden bg-white/25"><motion.div className="h-full origin-left bg-lime" style={{ scaleX: progressScale }} /></div>
              <span className="text-[10px] text-white/60">04</span>
            </div>
            <div className="hidden gap-2 sm:flex">
              {dayChapters.map((chapter, index) => <button key={chapter.time} onClick={() => goToChapter(index)} aria-label={`Ir para ${chapter.time}`} className={`rounded-full border px-4 py-2 text-[10px] transition-all ${active === index ? 'border-lime bg-lime text-forest' : 'border-white/25 text-white/60 hover:border-white/60'}`}>{chapter.time}</button>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SuitesSection({ onBook }: { onBook: (suiteId: string) => void }) {
  const [active, setActive] = useState(0);
  const [explorer, setExplorer] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const suite = suites[active];
  useModalLifecycle(explorer, () => setExplorer(false));

  const openExplorer = () => { setGalleryIndex(0); setExplorer(true); };

  return (
    <section id="suites" className="section-space overflow-hidden bg-bone">
      <div className="page-shell">
        <SectionHeader eyebrow="Dormir no AURA" title={<>Seu espaço.<br /><em>Seu ritmo.</em></>} text="Vinte e oito acomodações desenhadas para o vento atravessar, a paisagem entrar e o mundo ficar do lado de fora." />
        <div className="mt-14 grid gap-8 lg:mt-20 lg:grid-cols-12 lg:gap-12">
          <Reveal className="order-2 lg:order-1 lg:col-span-4" direction="left">
            <div className="border-t border-ink/15">
              {suites.map((item, index) => (
                <button key={item.id} onClick={() => setActive(index)} className={`group relative flex w-full items-center gap-5 border-b border-ink/15 py-5 text-left transition-colors ${active === index ? 'text-ink' : 'text-ink/40 hover:text-ink/70'}`}>
                  <span className="text-[10px] tabular-nums">0{index + 1}</span>
                  <span className="font-serif text-[clamp(1.7rem,2.5vw,2.6rem)] leading-none">{item.name}</span>
                  <motion.span animate={{ opacity: active === index ? 1 : 0, x: active === index ? 0 : -8 }} className="ml-auto"><ArrowRight size={18} /></motion.span>
                  {active === index && <motion.span layoutId="suite-active" className="absolute bottom-[-1px] left-0 h-[2px] w-full bg-terracotta" />}
                </button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={suite.id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35 }} className="pt-8">
                <p className="max-w-md text-[15px] leading-[1.75] text-ink/65">{suite.description}</p>
                <div className="mt-6 grid grid-cols-3 gap-3 border-y border-ink/10 py-5 text-xs text-ink/60">
                  <div><strong className="block font-serif text-2xl font-normal text-ink">{suite.size}</strong>m² privativos</div>
                  <div><strong className="block font-serif text-2xl font-normal text-ink">{suite.guests}</strong>hóspedes</div>
                  <div><strong className="block font-serif text-2xl font-normal text-ink">{formatBRL(suite.price)}</strong>por noite</div>
                </div>
                <p className="mt-4 text-[10px] uppercase tracking-[0.16em] text-ink/45">Vista · {suite.view}</p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <button className="btn-primary" onClick={() => onBook(suite.id)}>Reservar esta suíte <ArrowUpRight size={16} /></button>
                  <button className="btn-secondary" onClick={openExplorer}>Ver detalhes</button>
                </div>
              </motion.div>
            </AnimatePresence>
          </Reveal>
          <Reveal className="order-1 lg:order-2 lg:col-span-8" direction="right">
            <button onClick={openExplorer} className="group relative block aspect-[4/3] w-full overflow-hidden rounded-[2px] bg-sage/20 text-left sm:aspect-[16/11]" aria-label={`Abrir galeria de ${suite.name}`}>
              <AnimatePresence mode="wait">
                <motion.img key={suite.id} src={suite.image} alt={suite.name} className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-[1.035]"
                  initial={{ opacity: 0, scale: 1.08, clipPath: 'inset(0 0 100% 0)' }} animate={{ opacity: 1, scale: 1, clipPath: 'inset(0 0 0% 0)' }} exit={{ opacity: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-white sm:bottom-7 sm:left-7 sm:right-7">
                <p className="max-w-xs text-xs leading-relaxed text-white/80">Toque para conhecer cada canto da acomodação</p>
                <span className="grid h-12 w-12 place-items-center rounded-full bg-white/90 text-ink transition-transform duration-500 group-hover:rotate-45"><ArrowUpRight size={18} /></span>
              </div>
            </button>
          </Reveal>
        </div>
      </div>

      <AnimatePresence>
        {explorer && (
          <motion.div className="fixed inset-0 z-[90] bg-forest/80 p-0 backdrop-blur-lg sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => event.target === event.currentTarget && setExplorer(false)}>
            <motion.div role="dialog" aria-modal="true" aria-label={`Detalhes de ${suite.name}`} className="mx-auto grid h-full max-w-7xl overflow-y-auto bg-bone sm:rounded-2xl lg:grid-cols-[1.3fr_0.7fr]" initial={{ y: 50, scale: 0.98 }} animate={{ y: 0, scale: 1 }} exit={{ y: 40, opacity: 0 }} transition={{ type: 'spring', stiffness: 240, damping: 28 }}>
              <div className="relative min-h-[46vh] overflow-hidden bg-forest lg:min-h-full">
                <AnimatePresence mode="wait"><motion.img key={galleryIndex} src={suite.gallery[galleryIndex]} alt={`${suite.name}, imagem ${galleryIndex + 1}`} className="absolute inset-0 h-full w-full object-cover" initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} /></AnimatePresence>
                <button onClick={() => setExplorer(false)} aria-label="Fechar galeria" className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-bone text-ink"><X size={18} /></button>
                <div className="absolute bottom-5 left-5 flex gap-2">
                  <button className="gallery-arrow" aria-label="Imagem anterior" onClick={() => setGalleryIndex((galleryIndex - 1 + suite.gallery.length) % suite.gallery.length)}><ChevronLeft size={18} /></button>
                  <button className="gallery-arrow" aria-label="Próxima imagem" onClick={() => setGalleryIndex((galleryIndex + 1) % suite.gallery.length)}><ChevronRight size={18} /></button>
                </div>
                <div className="absolute bottom-7 right-6 text-xs text-white">0{galleryIndex + 1} / 0{suite.gallery.length}</div>
              </div>
              <div className="p-7 sm:p-10 lg:py-14">
                <p className="text-[10px] uppercase tracking-[0.2em] text-ink/45">{suite.view}</p>
                <h3 className="mt-4 font-serif text-5xl">{suite.name}</h3>
                <p className="mt-6 text-sm leading-[1.85] text-ink/65">{suite.details}</p>
                <div className="mt-7 flex gap-6 border-y border-ink/10 py-5 text-xs text-ink/60"><span>{suite.size} m²</span><span className="flex items-center gap-2"><Users size={14} />até {suite.guests}</span></div>
                <ul className="mt-6 space-y-3">{suite.amenities.map((amenity) => <li key={amenity} className="flex items-center gap-3 text-sm text-ink/70"><Check size={14} className="text-terracotta" />{amenity}</li>)}</ul>
                <div className="mt-8"><span className="font-serif text-3xl">{formatBRL(suite.price)}</span><span className="ml-2 text-xs text-ink/45">/ noite, café incluído</span></div>
                <button className="btn-primary mt-6 w-full justify-between" onClick={() => { setExplorer(false); onBook(suite.id); }}>Solicitar esta suíte <ArrowUpRight size={16} /></button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export function ExperiencesSection({ selected, onToggle }: { selected: string[]; onToggle: (id: string) => void }) {
  const [detail, setDetail] = useState<string | null>(null);
  const item = experiences.find((experience) => experience.id === detail);
  useModalLifecycle(Boolean(item), () => setDetail(null));
  return (
    <section id="experiencias" className="section-space bg-[#e6e6dc]">
      <div className="page-shell">
        <SectionHeader eyebrow="Viver o AURA" title={<>Poucos planos.<br /><em>Boas histórias.</em></>} text="Escolha o que combina com a maré, o clima e a sua vontade. Pré-selecione experiências para incluir na solicitação de estadia." />
        <div className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {experiences.map((experience, index) => {
            const isSelected = selected.includes(experience.id);
            return (
              <Reveal key={experience.id} delay={(index % 3) * 0.08} className={index % 3 === 1 ? 'lg:mt-16' : ''}>
                <article className="group">
                  <button onClick={() => setDetail(experience.id)} className="relative block aspect-[4/5] w-full overflow-hidden bg-sage/20 text-left">
                    <img src={experience.image} alt={experience.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10" />
                    <span className="absolute left-5 top-5 rounded-full border border-white/35 px-3 py-1.5 text-[9px] uppercase tracking-[0.18em] text-white backdrop-blur-sm">{experience.category}</span>
                    <span className="absolute bottom-5 right-5 grid h-11 w-11 place-items-center rounded-full bg-bone/90 text-ink transition-transform duration-500 group-hover:rotate-45"><ArrowUpRight size={17} /></span>
                    <span className="absolute bottom-5 left-5 font-serif text-3xl italic text-white/85">{experience.number}</span>
                  </button>
                  <div className="pt-5">
                    <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.15em] text-ink/45"><Clock3 size={12} />{experience.time}<span>·</span>{experience.duration}</div>
                    <h3 className="mt-3 font-serif text-[2rem] leading-tight">{experience.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink/60">{experience.description}</p>
                    <div className="mt-5 flex items-center justify-between border-t border-ink/10 pt-4">
                      <span className="text-xs font-medium">{experience.price ? `${formatBRL(experience.price)} / pessoa` : 'Cortesia aos hóspedes'}</span>
                      <button onClick={() => onToggle(experience.id)} aria-pressed={isSelected} className={`flex h-9 items-center gap-2 rounded-full px-3 text-[10px] font-semibold uppercase tracking-[0.12em] transition-all ${isSelected ? 'bg-moss text-lime' : 'border border-ink/20 hover:border-ink'}`}>
                        {isSelected ? <Check size={13} /> : <Plus size={13} />}{isSelected ? 'Adicionada' : 'Adicionar'}
                      </button>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
      <AnimatePresence>
        {item && <motion.div className="fixed inset-0 z-[90] grid place-items-center bg-forest/75 p-5 backdrop-blur-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => event.target === event.currentTarget && setDetail(null)}>
          <motion.div role="dialog" aria-modal="true" aria-label={item.title} className="relative grid w-full max-w-4xl overflow-hidden rounded-2xl bg-bone sm:grid-cols-2" initial={{ y: 40, scale: 0.97 }} animate={{ y: 0, scale: 1 }} exit={{ y: 30, opacity: 0 }}>
            <img src={item.image} alt={item.title} className="h-56 w-full object-cover sm:h-full" />
            <div className="p-7 sm:p-10">
              <p className="text-[10px] uppercase tracking-[0.2em] text-ink/45">{item.category} · {item.duration}</p><h3 className="mt-4 font-serif text-4xl">{item.title}</h3><p className="mt-5 text-sm leading-[1.8] text-ink/65">{item.description}</p>
              <div className="mt-6 border-y border-ink/10 py-5"><p className="text-[10px] uppercase tracking-[0.16em] text-ink/45">O que está incluído</p><p className="mt-2 text-sm leading-relaxed">{item.includes}</p></div>
              <p className="mt-5 text-xs text-ink/50">Saída às {item.time}. Atividades ao ar livre dependem das condições do mar e do clima.</p>
              <button className="btn-primary mt-7 w-full justify-between" onClick={() => { onToggle(item.id); setDetail(null); }}>{selected.includes(item.id) ? 'Remover da minha estadia' : 'Adicionar à minha estadia'} {selected.includes(item.id) ? <X size={16} /> : <Plus size={16} />}</button>
            </div>
            <button onClick={() => setDetail(null)} className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-bone text-ink" aria-label="Fechar detalhes"><X size={17} /></button>
          </motion.div>
        </motion.div>}
      </AnimatePresence>
    </section>
  );
}
