'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, addMonths, subMonths, isSameDay, isBefore, startOfDay } from 'date-fns';
import { openWhatsAppBooking } from '@/utils/whatsapp';

const services = [
  'Body Spa', 'Body Massage', 'Swedish Massage', 'Balinese Massage',
  'Aroma Massage', 'Deep Tissue Massage', 'Healing Touch Massage',
  'Lomi Lomi Massage', 'Relax Signature Massage', 'Couple Massage',
  'Four Hand Massage', 'Foot Massage', 'Hair Spa', 'Face Massage',
  'Facial & Skin Treatments',
];

const timeSlots = [
  '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM',
  '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM',
];

const stepLabels = ['Service', 'Date', 'Time', 'Details', 'Confirm'];

export default function BookingModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});

  const today = startOfDay(new Date());

  const calendarDays = useMemo(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
    const startDay = getDay(monthStart);
    const padStart = startDay === 0 ? 6 : startDay - 1;
    return { days, padStart };
  }, [currentMonth]);

  const resetForm = () => {
    setStep(1); setSelectedService(''); setSelectedDate(null);
    setSelectedTime(''); setName(''); setPhone(''); setMessage(''); setErrors({});
  };

  const handleClose = () => { resetForm(); onClose(); };

  const validateStep4 = () => {
    const e: { name?: string; phone?: string } = {};
    if (!name.trim()) e.name = 'Name is required';
    if (!phone.trim()) e.phone = 'Phone is required';
    else if (!/^[0-9]{10}$/.test(phone.replace(/\s/g, ''))) e.phone = 'Enter valid 10-digit number';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleConfirm = () => {
    if (!selectedDate) return;
    openWhatsAppBooking({ name, phone, service: selectedService, date: selectedDate.toISOString(), time: selectedTime, message: message || undefined });
  };

  const slideV = { enter: { x: 60, opacity: 0 }, center: { x: 0, opacity: 1 }, exit: { x: -60, opacity: 0 } };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div className="fixed inset-0 z-[300] flex items-end md:items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div className="absolute inset-0 bg-charcoal/60 backdrop-blur-sm" onClick={handleClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />

          <motion.div className="relative z-10 w-full max-w-lg md:max-w-xl bg-cream rounded-t-3xl md:rounded-3xl max-h-[90vh] overflow-hidden shadow-2xl border border-gold/10"
            initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', damping: 30, stiffness: 300 }}>

            {/* Progress bar */}
            <div className="h-1 bg-gold/10">
              <motion.div className="h-full bg-gradient-to-r from-gold to-gold-light" animate={{ width: `${(step / 5) * 100}%` }} transition={{ duration: 0.4 }} />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-6 md:px-8 py-5 border-b border-gold/10">
              <div>
                <h3 className="text-xl md:text-2xl" style={{ fontFamily: 'var(--font-display)', fontWeight: 500, color: '#1C1A18' }}>Book Your Session</h3>
                <p className="text-xs tracking-[0.15em] uppercase mt-1" style={{ fontFamily: 'var(--font-body)', color: '#C9A96E' }}>Step {step} of 5 — {stepLabels[step - 1]}</p>
              </div>
              <button onClick={handleClose} className="w-10 h-10 rounded-full border border-charcoal/10 flex items-center justify-center text-charcoal/40 hover:text-charcoal transition-all" aria-label="Close">✕</button>
            </div>

            {/* Step indicators */}
            <div className="flex items-center justify-center gap-2 py-4">
              {stepLabels.map((label, i) => (
                <div key={label} className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs transition-all ${i + 1 <= step ? 'bg-gold text-charcoal' : 'bg-gold/10 text-charcoal/30'}`} style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}>
                    {i + 1 < step ? '✓' : i + 1}
                  </div>
                  {i < stepLabels.length - 1 && <div className={`w-6 md:w-10 h-[1px] ${i + 1 < step ? 'bg-gold' : 'bg-gold/10'}`} />}
                </div>
              ))}
            </div>

            {/* Content */}
            <div className="px-6 md:px-8 pb-8 overflow-y-auto max-h-[55vh]">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div key="s1" variants={slideV} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                    <p className="text-sm mb-4" style={{ fontFamily: 'var(--font-body)', color: '#1C1A18', opacity: 0.5 }}>Choose your preferred treatment</p>
                    <div className="grid grid-cols-2 gap-2">
                      {services.map((s) => (
                        <button key={s} onClick={() => { setSelectedService(s); setStep(2); }}
                          className={`px-4 py-3 rounded-xl text-left text-sm border transition-all ${selectedService === s ? 'bg-charcoal text-cream border-charcoal' : 'bg-white border-gold/10 text-charcoal hover:border-gold/30'}`}
                          style={{ fontFamily: 'var(--font-body)' }}>{s}</button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div key="s2" variants={slideV} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                    <p className="text-sm mb-4" style={{ fontFamily: 'var(--font-body)', color: '#1C1A18', opacity: 0.5 }}>Select your preferred date (Mon–Sat)</p>
                    <div className="flex items-center justify-between mb-4">
                      <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className="w-10 h-10 rounded-full border border-gold/20 flex items-center justify-center text-charcoal/50 hover:text-charcoal transition-all">‹</button>
                      <span className="text-lg" style={{ fontFamily: 'var(--font-display)', fontWeight: 500 }}>{format(currentMonth, 'MMMM yyyy')}</span>
                      <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="w-10 h-10 rounded-full border border-gold/20 flex items-center justify-center text-charcoal/50 hover:text-charcoal transition-all">›</button>
                    </div>
                    <div className="grid grid-cols-7 gap-1 mb-2">
                      {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((d) => (
                        <div key={d} className="text-center text-xs py-2" style={{ fontFamily: 'var(--font-body)', fontWeight: 500, color: '#1C1A18', opacity: 0.4 }}>{d}</div>
                      ))}
                    </div>
                    <div className="grid grid-cols-7 gap-1">
                      {[...Array(calendarDays.padStart)].map((_, i) => <div key={`p-${i}`} />)}
                      {calendarDays.days.map((day) => {
                        const isPast = isBefore(day, today);
                        const isSun = getDay(day) === 0;
                        const isSelected = selectedDate && isSameDay(day, selectedDate);
                        const disabled = isPast || isSun;
                        return (
                          <button key={day.toISOString()} onClick={() => { if (!disabled) { setSelectedDate(day); setStep(3); } }} disabled={disabled}
                            className={`h-10 rounded-lg text-sm transition-all ${isSelected ? 'bg-charcoal text-cream font-medium' : disabled ? 'text-charcoal/15' : 'text-charcoal hover:bg-gold/10'}`}
                            style={{ fontFamily: 'var(--font-body)' }}>{format(day, 'd')}</button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div key="s3" variants={slideV} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                    <p className="text-sm mb-4" style={{ fontFamily: 'var(--font-body)', color: '#1C1A18', opacity: 0.5 }}>Choose your preferred time slot</p>
                    <div className="grid grid-cols-3 gap-3">
                      {timeSlots.map((t) => (
                        <button key={t} onClick={() => { setSelectedTime(t); setStep(4); }}
                          className={`py-3 rounded-xl text-sm border transition-all ${selectedTime === t ? 'bg-charcoal text-gold border-charcoal' : 'bg-white border-gold/10 text-charcoal hover:border-gold/30'}`}
                          style={{ fontFamily: 'var(--font-body)' }}>{t}</button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div key="s4" variants={slideV} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                    <p className="text-sm mb-6" style={{ fontFamily: 'var(--font-body)', color: '#1C1A18', opacity: 0.5 }}>Tell us about yourself</p>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs tracking-[0.15em] uppercase mb-2" style={{ fontFamily: 'var(--font-body)', color: '#1C1A18', opacity: 0.5 }}>Your Name *</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                          className={`w-full px-4 py-3 rounded-xl border bg-white text-sm outline-none focus:border-gold/50 transition-colors ${errors.name ? 'border-red-400' : 'border-gold/10'}`}
                          style={{ fontFamily: 'var(--font-body)', color: '#1C1A18' }} placeholder="Enter your full name" />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                      </div>
                      <div>
                        <label className="block text-xs tracking-[0.15em] uppercase mb-2" style={{ fontFamily: 'var(--font-body)', color: '#1C1A18', opacity: 0.5 }}>Phone Number *</label>
                        <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
                          className={`w-full px-4 py-3 rounded-xl border bg-white text-sm outline-none focus:border-gold/50 transition-colors ${errors.phone ? 'border-red-400' : 'border-gold/10'}`}
                          style={{ fontFamily: 'var(--font-body)', color: '#1C1A18' }} placeholder="10-digit mobile number" />
                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                      </div>
                      <div>
                        <label className="block text-xs tracking-[0.15em] uppercase mb-2" style={{ fontFamily: 'var(--font-body)', color: '#1C1A18', opacity: 0.5 }}>Special Requests (Optional)</label>
                        <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={3}
                          className="w-full px-4 py-3 rounded-xl border border-gold/10 bg-white text-sm outline-none focus:border-gold/50 resize-none"
                          style={{ fontFamily: 'var(--font-body)', color: '#1C1A18' }} placeholder="Anything specific you'd like us to know?" />
                      </div>
                    </div>
                    <button onClick={() => { if (validateStep4()) setStep(5); }}
                      className="w-full mt-6 py-3.5 bg-charcoal text-cream text-sm tracking-[0.15em] uppercase rounded-xl hover:bg-deep-brown transition-colors"
                      style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}>Continue →</button>
                  </motion.div>
                )}

                {step === 5 && (
                  <motion.div key="s5" variants={slideV} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                    <div className="bg-white rounded-2xl p-6 border border-gold/10 mb-6">
                      <h4 className="text-lg mb-4" style={{ fontFamily: 'var(--font-display)', fontWeight: 500, color: '#1C1A18' }}>Booking Summary</h4>
                      <div className="space-y-3">
                        {[
                          { l: '💆 Service', v: selectedService },
                          { l: '📅 Date', v: selectedDate ? format(selectedDate, 'EEEE, MMMM d, yyyy') : '' },
                          { l: '⏰ Time', v: selectedTime },
                          { l: '👤 Name', v: name },
                          { l: '📱 Phone', v: phone },
                          ...(message ? [{ l: '📝 Note', v: message }] : []),
                        ].map((item) => (
                          <div key={item.l} className="flex items-start justify-between gap-4">
                            <span className="text-sm shrink-0" style={{ fontFamily: 'var(--font-body)', color: '#1C1A18', opacity: 0.5 }}>{item.l}</span>
                            <span className="text-sm text-right" style={{ fontFamily: 'var(--font-body)', fontWeight: 500, color: '#1C1A18' }}>{item.v}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <button onClick={handleConfirm}
                      className="w-full py-3.5 bg-[#25D366] text-white text-sm tracking-[0.15em] uppercase rounded-xl hover:bg-[#20bd5a] transition-colors flex items-center justify-center gap-3 shadow-lg shadow-[#25D366]/20"
                      style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                      Confirm via WhatsApp
                    </button>
                    <p className="text-center mt-4 text-xs" style={{ fontFamily: 'var(--font-body)', color: '#1C1A18', opacity: 0.4 }}>You&apos;ll be redirected to WhatsApp to confirm your booking</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {step > 1 && step < 5 && (
              <div className="px-6 md:px-8 pb-6 pt-2 border-t border-gold/5">
                <button onClick={() => setStep(step - 1)} className="text-sm tracking-[0.1em] uppercase text-charcoal/50 hover:text-charcoal transition-colors" style={{ fontFamily: 'var(--font-body)' }}>← Back</button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
