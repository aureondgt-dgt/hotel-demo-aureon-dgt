import { useEffect, useRef, useState } from 'react';

export function useModalLifecycle(active: boolean, onClose: () => void) {
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  useEffect(() => {
    if (!active) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeRef.current();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [active]);
}
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

export function Logo({ light = false, compact = false }: { light?: boolean; compact?: boolean }) {
  return (
    <a href="#inicio" aria-label="AURA House — início" className={`group inline-flex items-center gap-3 ${light ? 'text-white' : 'text-ink'}`}>
      <svg width="35" height="35" viewBox="0 0 40 40" fill="none" aria-hidden="true" className="transition-transform duration-700 group-hover:rotate-45">
        <circle cx="20" cy="20" r="18.5" stroke="currentColor" strokeOpacity="0.55" />
        <path d="M20 4.5C20 13.1 13.1 20 4.5 20C13.1 20 20 26.9 20 35.5C20 26.9 26.9 20 35.5 20C26.9 20 20 13.1 20 4.5Z" fill="currentColor" />
        <circle cx="20" cy="20" r="3.2" fill={light ? '#dfff80' : '#213c30'} />
      </svg>
      {!compact && <span className="flex flex-col leading-none"><span className="text-[17px] font-medium tracking-[0.24em]">AURA</span><span className="mt-1 text-[8px] uppercase tracking-[0.35em] opacity-60">House · Alagoas</span></span>}
    </a>
  );
}

export function Reveal({ children, className = '', delay = 0, direction = 'up' }: { children: React.ReactNode; className?: string; delay?: number; direction?: 'up' | 'left' | 'right' }) {
  const reduced = useReducedMotion();
  const offset = direction === 'up' ? { y: 55, x: 0 } : direction === 'left' ? { x: -55, y: 0 } : { x: 55, y: 0 };
  return (
    <motion.div className={className}
      initial={reduced ? { opacity: 1 } : { opacity: 0, ...offset, clipPath: 'inset(0 0 18% 0)' }}
      whileInView={{ opacity: 1, x: 0, y: 0, clipPath: 'inset(0 0 0% 0)' }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

export function SplitWords({ text, className = '', delay = 0 }: { text: string; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  return (
    <span className={className} aria-label={text}>
      {text.split(' ').map((word, index) => (
        <span key={`${word}-${index}`} className="inline-block overflow-hidden pb-[0.08em] align-bottom" aria-hidden="true">
          <motion.span className="inline-block"
            initial={reduced ? false : { y: '115%', rotate: 3 }}
            animate={{ y: 0, rotate: 0 }}
            transition={{ duration: 1.1, delay: delay + index * 0.085, ease: [0.16, 1, 0.3, 1] }}>
            {word}{index < text.split(' ').length - 1 && <>&nbsp;</>}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export function SectionHeader({ eyebrow, title, text, light = false, className = '' }: { eyebrow: string; title: React.ReactNode; text?: string; light?: boolean; className?: string }) {
  return (
    <div className={`grid gap-6 md:grid-cols-12 md:gap-8 ${className}`}>
      <Reveal className="md:col-span-3">
        <div className={`flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.24em] ${light ? 'text-white/55' : 'text-ink/50'}`}>
          <span className={`h-px w-7 ${light ? 'bg-white/40' : 'bg-ink/30'}`} />{eyebrow}
        </div>
      </Reveal>
      <Reveal className="md:col-span-6" delay={0.08}>
        <h2 className={`text-balance font-serif text-[clamp(2.8rem,5.4vw,5.8rem)] leading-[0.96] tracking-[-0.035em] ${light ? 'text-white' : 'text-ink'}`}>{title}</h2>
      </Reveal>
      {text && <Reveal className="self-end md:col-span-3" delay={0.16}><p className={`max-w-sm text-sm leading-[1.8] ${light ? 'text-white/60' : 'text-ink/60'}`}>{text}</p></Reveal>}
    </div>
  );
}

export function ImageReveal({ src, alt, className = '', imageClassName = '', delay = 0 }: { src: string; alt: string; className?: string; imageClassName?: string; delay?: number }) {
  const [loaded, setLoaded] = useState(false);
  const reduced = useReducedMotion();
  return (
    <motion.div className={`relative overflow-hidden bg-sage/20 ${className} ${loaded ? '' : 'image-loading'}`}
      initial={reduced ? { opacity: 1 } : { clipPath: 'inset(12% 0 12% 0)', y: 40 }}
      whileInView={{ clipPath: 'inset(0% 0 0% 0)', y: 0 }}
      viewport={{ once: true, margin: '-5%' }} transition={{ duration: 1.15, delay, ease: [0.22, 1, 0.36, 1] }}>
      <motion.img src={src} alt={alt} onLoad={() => setLoaded(true)} loading="lazy"
        className={`h-full w-full object-cover transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'} ${imageClassName}`}
        initial={reduced ? false : { scale: 1.12 }} whileInView={{ scale: 1 }} viewport={{ once: true }}
        transition={{ duration: 1.5, delay, ease: [0.22, 1, 0.36, 1] }} />
    </motion.div>
  );
}

export function TextLink({ children, onClick, href, light = false }: { children: React.ReactNode; onClick?: () => void; href?: string; light?: boolean }) {
  const className = `group inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] ${light ? 'text-white' : 'text-ink'}`;
  const content = <><span className="relative"> {children}<span className={`absolute -bottom-1 left-0 h-px w-full origin-left transition-transform duration-500 group-hover:scale-x-0 ${light ? 'bg-white/50' : 'bg-ink/40'}`} /></span><span className={`grid h-9 w-9 place-items-center rounded-full border transition-all duration-500 group-hover:rotate-45 ${light ? 'border-white/30 group-hover:bg-white group-hover:text-ink' : 'border-ink/20 group-hover:bg-ink group-hover:text-bone'}`}><ArrowUpRight size={15} /></span></>;
  return href ? <a href={href} className={className}>{content}</a> : <button onClick={onClick} className={className}>{content}</button>;
}
