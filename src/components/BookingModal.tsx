import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, ArrowRight, CalendarDays, Check, ChevronDown, Download, Mail, Minus, Plus, X } from 'lucide-react';
import { experiences, formatBRL, suites } from '../data';

export type BookingModalProps = {
  open: boolean;
  onClose: () => void;
  initialSuite: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  onDatesChange: (checkIn: string, checkOut: string) => void;
  onGuestsChange: (guests: number) => void;
  selectedExperiences: string[];
  onToggleExperience: (id: string) => void;
};

type Quote = {
  nights: number;
  accommodation: number;
  experiences: number;
  total: number;
  seasonalNights: number;
};

function dateAtNoon(value: string) {
  return new Date(`${value}T12:00:00`);
}

export function calculateQuote(suiteId: string, checkIn: string, checkOut: string, selected: string[], guests = 1): Quote {
  const suite = suites.find((item) => item.id === suiteId) ?? suites[0];
  const start = dateAtNoon(checkIn);
  const end = dateAtNoon(checkOut);
  const nights = Math.max(0, Math.round((end.getTime() - start.getTime()) / 86400000));
  let accommodation = 0;
  let seasonalNights = 0;
  for (let index = 0; index < nights; index += 1) {
    const day = new Date(start);
    day.setDate(start.getDate() + index);
    const month = day.getMonth();
    const date = day.getDate();
    const highSeason = month === 6 || (month === 11 && date >= 15) || (month === 0 && date <= 15);
    const weekend = day.getDay() === 5 || day.getDay() === 6;
    if (highSeason || weekend) seasonalNights += 1;
    accommodation += Math.round(suite.price * (highSeason ? 1.2 : 1) * (weekend ? 1.12 : 1));
  }
  const experienceTotal = experiences.filter((item) => selected.includes(item.id)).reduce((sum, item) => sum + item.price, 0) * guests;
  return { nights, accommodation, experiences: experienceTotal, total: accommodation + experienceTotal, seasonalNights };
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.2em] text-ink/50">{children}</span>;
}

export default function BookingModal({
  open, onClose, initialSuite, checkIn, checkOut, guests, onDatesChange, onGuestsChange, selectedExperiences, onToggleExperience,
}: BookingModalProps) {
  const [step, setStep] = useState(1);
  const [suiteId, setSuiteId] = useState(initialSuite || suites[0].id);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const suite = suites.find((item) => item.id === suiteId) ?? suites[0];
  const quote = useMemo(() => calculateQuote(suiteId, checkIn, checkOut, selectedExperiences, guests), [suiteId, checkIn, checkOut, selectedExperiences, guests]);
  const minimumNights = suiteId === 'casa' ? 3 : 2;

  useEffect(() => {
    if (open) {
      setSuiteId(initialSuite || suites[0].id);
      setStep(1);
      setError('');
      setConfirmation('');
    }
  }, [open, initialSuite]);

  useEffect(() => {
    if (guests > suite.guests) onGuestsChange(suite.guests);
  }, [suite.guests, guests, onGuestsChange]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  const validateDates = () => {
    if (!checkIn || !checkOut || quote.nights < minimumNights) {
      setError(`Esta acomodação pede uma estadia mínima de ${minimumNights} noites.`);
      return false;
    }
    if (guests > suite.guests) {
      setError(`${suite.name} acomoda até ${suite.guests} hóspedes.`);
      return false;
    }
    setError('');
    return true;
  };

  const submitRequest = () => {
    if (!name.trim() || name.trim().length < 3) {
      setError('Conte para nós o seu nome completo.');
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Digite um e-mail válido para receber o retorno do concierge.');
      return;
    }
    const code = `AU-${Date.now().toString(36).slice(-6).toUpperCase()}`;
    const request = {
      code, createdAt: new Date().toISOString(), name, email, phone, notes,
      suite: suite.name, checkIn, checkOut, guests, experiences: selectedExperiences, quote,
      status: 'Solicitação local — aguardando envio ao concierge',
    };
    try {
      const current = JSON.parse(localStorage.getItem('aura-booking-requests') || '[]');
      localStorage.setItem('aura-booking-requests', JSON.stringify([...current, request]));
    } catch {
      // The e-mail fallback remains available if storage is blocked by the browser.
    }
    setConfirmation(code);
    setStep(3);
    setError('');
  };

  const formattedCheckIn = new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }).format(dateAtNoon(checkIn));
  const formattedCheckOut = new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }).format(dateAtNoon(checkOut));
  const emailBody = encodeURIComponent([
    `Olá, concierge AURA. Gostaria de verificar esta solicitação ${confirmation}:`,
    '', `Nome: ${name}`, `E-mail: ${email}`, `Telefone: ${phone || 'não informado'}`,
    `Acomodação: ${suite.name}`, `Chegada: ${formattedCheckIn}`, `Saída: ${formattedCheckOut}`,
    `Hóspedes: ${guests}`, `Noites: ${quote.nights}`,
    `Experiências: ${selectedExperiences.length ? experiences.filter((item) => selectedExperiences.includes(item.id)).map((item) => item.title).join(', ') : 'nenhuma'}`,
    `Estimativa: ${formatBRL(quote.total)}`, '', `Observações: ${notes || 'nenhuma'}`,
  ].join('\n'));
  const mailto = `mailto:concierge@aurahouse.com.br?subject=${encodeURIComponent(`Solicitação ${confirmation} · ${suite.name}`)}&body=${emailBody}`;

  const downloadCalendar = () => {
    const compact = (date: string) => date.replace(/-/g, '');
    const ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//AURA House//Solicitacao//PT-BR', 'BEGIN:VEVENT',
      `UID:${confirmation}@aurahouse.com.br`, `DTSTART;VALUE=DATE:${compact(checkIn)}`, `DTEND;VALUE=DATE:${compact(checkOut)}`,
      `SUMMARY:AURA House · ${suite.name} (solicitação)`, 'LOCATION:Litoral norte de Alagoas, Brasil',
      `DESCRIPTION:Solicitação ${confirmation}. Sujeita à confirmação do concierge.`, 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
    const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = `aura-${confirmation}.ics`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[100] flex items-end justify-center bg-[#0a1511]/70 p-0 backdrop-blur-md sm:items-center sm:p-5"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
          <motion.section role="dialog" aria-modal="true" aria-labelledby="booking-title"
            className="relative grid max-h-[94dvh] w-full max-w-6xl overflow-hidden rounded-t-[28px] bg-bone text-ink shadow-2xl sm:rounded-[28px] lg:grid-cols-[0.88fr_1.12fr]"
            initial={{ y: 60, opacity: 0, scale: 0.98 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: 50, opacity: 0, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 260, damping: 28 }}>
            <button onClick={onClose} aria-label="Fechar reserva" className="absolute right-4 top-4 z-20 grid h-11 w-11 place-items-center rounded-full bg-bone/90 text-ink backdrop-blur transition hover:rotate-90 hover:bg-white">
              <X size={18} />
            </button>

            <div className="relative hidden overflow-hidden lg:block">
              <AnimatePresence mode="wait">
                <motion.img key={suite.id} src={suite.image} alt={suite.name} className="absolute inset-0 h-full w-full object-cover"
                  initial={{ opacity: 0, scale: 1.08 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.65 }} />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-[#10241c]/90 via-[#10241c]/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-9 text-white">
                <p className="mb-3 text-[10px] uppercase tracking-[0.25em] text-white/65">Sua escolha</p>
                <h3 className="font-serif text-5xl">{suite.name}</h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/75">{suite.description}</p>
                <div className="mt-6 flex gap-5 border-t border-white/20 pt-5 text-xs text-white/80">
                  <span>{suite.size} m²</span><span>até {suite.guests} hóspedes</span><span>{suite.view}</span>
                </div>
              </div>
            </div>

            <div className="overflow-y-auto p-6 pt-16 sm:p-10 sm:pt-14">
              <div className="mb-8 flex items-center justify-between gap-4">
                <div>
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-moss/60">AURA House · Reservas</p>
                  <h2 id="booking-title" className="font-serif text-4xl sm:text-5xl">{step === 3 ? 'Quase lá.' : 'Desenhe sua estadia.'}</h2>
                </div>
                {step < 3 && <span className="shrink-0 text-xs text-ink/45">0{step} / 02</span>}
              </div>

              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div key="step-one" initial={{ opacity: 0, x: 22 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -22 }} transition={{ duration: 0.3 }}>
                    <label className="relative mb-5 block">
                      <FieldLabel>Acomodação</FieldLabel>
                      <select value={suiteId} onChange={(event) => { setSuiteId(event.target.value); setError(''); }} className="field appearance-none pr-10">
                        {suites.map((item) => <option key={item.id} value={item.id}>{item.name} · até {item.guests} · {formatBRL(item.price)}/noite</option>)}
                      </select>
                      <ChevronDown className="pointer-events-none absolute bottom-4 right-4 text-ink/50" size={16} />
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <label><FieldLabel>Chegada</FieldLabel><input className="field" type="date" value={checkIn} min={new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().split('T')[0]} onChange={(event) => onDatesChange(event.target.value, checkOut)} /></label>
                      <label><FieldLabel>Saída</FieldLabel><input className="field" type="date" value={checkOut} min={checkIn} onChange={(event) => onDatesChange(checkIn, event.target.value)} /></label>
                    </div>
                    <div className="mt-5 flex items-center justify-between border-y border-ink/10 py-4">
                      <div><FieldLabel>Hóspedes</FieldLabel><p className="text-sm">Máximo de {suite.guests} nesta acomodação</p></div>
                      <div className="flex items-center gap-3">
                        <button aria-label="Diminuir hóspedes" className="stepper" onClick={() => onGuestsChange(Math.max(1, guests - 1))}><Minus size={14} /></button>
                        <span className="w-5 text-center font-serif text-2xl">{guests}</span>
                        <button aria-label="Aumentar hóspedes" className="stepper" onClick={() => onGuestsChange(Math.min(suite.guests, guests + 1))}><Plus size={14} /></button>
                      </div>
                    </div>
                    <div className="mt-5">
                      <div className="mb-3 flex items-center justify-between"><FieldLabel>Experiências pré-selecionadas</FieldLabel><span className="text-[10px] text-ink/40">opcional</span></div>
                      {selectedExperiences.length ? (
                        <div className="flex flex-wrap gap-2">
                          {experiences.filter((item) => selectedExperiences.includes(item.id)).map((item) => (
                            <button key={item.id} onClick={() => onToggleExperience(item.id)} className="group flex items-center gap-2 rounded-full bg-sage/25 px-3 py-2 text-xs transition hover:bg-terracotta/15">
                              {item.title}<X size={12} className="opacity-50 group-hover:opacity-100" />
                            </button>
                          ))}
                        </div>
                      ) : <p className="text-xs leading-relaxed text-ink/45">Você pode adicionar experiências na seção “Viver o AURA”. Nada será cobrado nesta etapa.</p>}
                    </div>
                    <div className="mt-6 rounded-2xl bg-white/50 p-5 text-sm">
                      <div className="flex justify-between text-ink/65"><span>{formatBRL(suite.price)} base × {quote.nights || 0} noites</span><span>{formatBRL(quote.accommodation)}</span></div>
                      {quote.seasonalNights > 0 && <p className="mt-1 text-[10px] text-ink/40">{quote.seasonalNights} noite(s) com tarifa de alta temporada ou fim de semana.</p>}
                      <div className="mt-2 flex justify-between text-ink/65"><span>Experiências{guests > 1 ? ` · ${guests} hóspedes` : ''}</span><span>{formatBRL(quote.experiences)}</span></div>
                      <div className="mt-4 flex items-end justify-between border-t border-ink/10 pt-4"><span className="font-medium">Estimativa total</span><span className="font-serif text-3xl">{formatBRL(quote.total)}</span></div>
                      <p className="mt-2 text-[10px] leading-relaxed text-ink/45">Café da manhã e impostos incluídos. Tarifa estimada; disponibilidade e valor final serão confirmados pelo concierge.</p>
                    </div>
                    {error && <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="mt-4 rounded-xl bg-red-800/10 px-4 py-3 text-xs text-red-900" role="alert">{error}</motion.p>}
                    <button className="btn-primary mt-6 w-full justify-between" onClick={() => validateDates() && setStep(2)}>Continuar <ArrowRight size={17} /></button>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div key="step-two" initial={{ opacity: 0, x: 22 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -22 }} transition={{ duration: 0.3 }}>
                    <div className="mb-6 rounded-2xl border border-ink/10 p-4 text-sm">
                      <div className="flex items-start gap-3"><CalendarDays size={18} className="mt-0.5 text-moss" /><div><p className="font-medium">{suite.name} · {guests} hóspede{guests > 1 ? 's' : ''}</p><p className="mt-1 text-xs text-ink/50">{formattedCheckIn} — {formattedCheckOut} · {quote.nights} noites</p></div></div>
                    </div>
                    <div className="space-y-4">
                      <label className="block"><FieldLabel>Nome completo *</FieldLabel><input autoFocus className="field" value={name} onChange={(event) => setName(event.target.value)} placeholder="Como devemos chamar você?" autoComplete="name" /></label>
                      <label className="block"><FieldLabel>E-mail *</FieldLabel><input className="field" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="voce@email.com" autoComplete="email" /></label>
                      <label className="block"><FieldLabel>Telefone / WhatsApp</FieldLabel><input className="field" type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="+55 11 99999-9999" autoComplete="tel" /></label>
                      <label className="block"><FieldLabel>Algo que devemos saber?</FieldLabel><textarea className="field min-h-24 resize-none" value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="Horário do voo, restrições alimentares, uma celebração..." /></label>
                    </div>
                    <p className="mt-4 text-[11px] leading-relaxed text-ink/45">Nenhum pagamento será feito. Ao continuar, uma solicitação será salva neste navegador e você poderá enviá-la diretamente ao concierge por e-mail.</p>
                    {error && <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="mt-4 rounded-xl bg-red-800/10 px-4 py-3 text-xs text-red-900" role="alert">{error}</motion.p>}
                    <div className="mt-6 flex gap-3">
                      <button className="btn-secondary" onClick={() => { setStep(1); setError(''); }}><ArrowLeft size={16} /> Voltar</button>
                      <button className="btn-primary flex-1 justify-between" onClick={submitRequest}>Preparar solicitação <ArrowRight size={17} /></button>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div key="step-three" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex min-h-[450px] flex-col justify-center">
                    <div className="mb-6 grid h-14 w-14 place-items-center rounded-full bg-moss text-lime"><Check size={24} /></div>
                    <p className="max-w-md text-lg leading-relaxed text-ink/70">Sua solicitação <strong className="font-medium text-ink">{confirmation}</strong> foi preparada e salva neste dispositivo. Envie ao concierge para verificar disponibilidade e concluir sua reserva.</p>
                    <div className="my-7 rounded-2xl bg-sage/20 p-5 text-sm">
                      <p className="font-serif text-2xl">{suite.name}</p>
                      <p className="mt-2 text-ink/60">{formattedCheckIn} — {formattedCheckOut}</p>
                      <p className="mt-1 text-ink/60">{quote.nights} noites · {guests} hóspedes · {formatBRL(quote.total)} estimados</p>
                    </div>
                    <a href={mailto} className="btn-primary w-full justify-between">Enviar ao concierge <Mail size={17} /></a>
                    <button onClick={downloadCalendar} className="btn-secondary mt-3 w-full justify-between">Adicionar solicitação ao calendário <Download size={17} /></button>
                    <button onClick={onClose} className="mx-auto mt-5 text-xs underline decoration-ink/30 underline-offset-4 transition hover:decoration-ink">Voltar ao site</button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
