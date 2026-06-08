import { useState, useEffect } from "react";
import { X, Calendar, Clock, User, Mail, Phone, MessageSquare, ChevronDown, CheckCircle } from "lucide-react";
import { useCreateBooking } from "@workspace/api-client-react";
import { useLanguage } from "@/context/LanguageContext";
import { useAnalytics } from "@/hooks/useAnalytics";

const timeSlots = [
  "06:00–07:00",
  "07:00–08:00",
  "08:00–09:00",
  "09:00–10:00",
  "10:00–11:00",
  "12:00–13:00",
  "17:00–18:00",
  "18:00–19:00",
  "19:00–20:00",
  "20:00–21:00",
];

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
  defaultService?: string;
}

interface FormState {
  name: string;
  email: string;
  phone: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
}

const emptyForm: FormState = {
  name: "",
  email: "",
  phone: "",
  service: "",
  preferredDate: "",
  preferredTime: "",
  message: "",
};

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="text-red-400 text-xs mt-1">{msg}</p>;
}

export default function BookingModal({ open, onClose, defaultService = "" }: BookingModalProps) {
  const { t } = useLanguage();
  const tb = t.booking;
  const { trackEvent } = useAnalytics();
  const [form, setForm] = useState<FormState>({ ...emptyForm, service: defaultService });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const mutation = useCreateBooking();

  useEffect(() => {
    if (open) setForm((f) => ({ ...f, service: defaultService }));
  }, [open, defaultService]);

  if (!open) return null;

  const set = (field: keyof FormState, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const validate = (): boolean => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim() || form.name.trim().length < 2) e.name = tb.validation.name;
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = tb.validation.email;
    if (!form.phone.trim() || form.phone.trim().length < 9) e.phone = tb.validation.phone;
    if (!form.service) e.service = tb.validation.service;
    if (!form.preferredDate) e.preferredDate = tb.validation.date;
    if (!form.preferredTime) e.preferredTime = tb.validation.time;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    trackEvent("book_class", {
      service: form.service,
      date: form.preferredDate,
      time: form.preferredTime,
    });

    mutation.mutate({
      data: {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        service: form.service as "personal-training" | "group-class" | "nutrition" | "online-training",
        preferredDate: form.preferredDate,
        preferredTime: form.preferredTime,
        message: form.message.trim() || null,
      },
    });
  };

  const handleClose = () => {
    if (mutation.isPending) return;
    setForm({ ...emptyForm, service: defaultService });
    setErrors({});
    mutation.reset();
    onClose();
  };

  const inputClass = (field: keyof FormState) =>
    `w-full bg-[#0d0d0d] border rounded-lg px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none transition-colors ${
      errors[field] ? "border-red-500 focus:border-red-400" : "border-white/10 focus:border-[#e61f1f]"
    }`;

  const labelClass = "block text-xs font-semibold uppercase tracking-widest text-white/50 mb-2";
  const today = new Date().toISOString().split("T")[0];

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
      data-testid="booking-modal-overlay"
    >
      <div
        className="relative w-full max-w-2xl bg-[#141414] rounded-2xl border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.7)] max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 pb-4 border-b border-white/10">
          <div>
            <p className="text-[#e61f1f] text-[10px] font-bold tracking-[0.4em] uppercase mb-1">
              Target Personal Training Gym
            </p>
            <h2
              id="booking-modal-title"
              className="text-2xl font-black uppercase text-white"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              {tb.title}
            </h2>
            <p className="text-white/40 text-xs mt-1">{tb.subtitle}</p>
          </div>
          <button
            onClick={handleClose}
            className="text-white/40 hover:text-white transition-colors p-1 mt-1"
            aria-label={tb.closeLabel}
            data-testid="button-booking-modal-close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Success state */}
        {mutation.isSuccess ? (
          <div className="p-10 text-center" data-testid="booking-success">
            <div className="w-20 h-20 bg-[#e61f1f]/15 rounded-full flex items-center justify-center mx-auto mb-5">
              <CheckCircle className="text-[#e61f1f]" size={36} />
            </div>
            <h3
              className="text-2xl font-black uppercase text-white mb-2"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              {tb.successTitle}
            </h3>
            <p className="text-white/50 text-sm max-w-sm mx-auto leading-relaxed">
              {tb.successSubtitle(form.email)}
            </p>
            <div className="mt-6 p-4 bg-[#1a1a1a] rounded-xl text-left text-sm space-y-2 border border-white/5">
              <div className="flex justify-between">
                <span className="text-white/40 uppercase tracking-wider text-xs">{tb.summaryService}</span>
                <span className="text-white font-medium">
                  {tb.services.find((s) => s.value === form.service)?.label}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/40 uppercase tracking-wider text-xs">{tb.summaryDate}</span>
                <span className="text-white font-medium">{form.preferredDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/40 uppercase tracking-wider text-xs">{tb.summaryTime}</span>
                <span className="text-white font-medium">{form.preferredTime}</span>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="mt-8 px-8 py-3 bg-[#e61f1f] text-white font-bold uppercase tracking-widest text-sm rounded-lg hover:bg-[#cc1a1a] transition-colors"
              data-testid="button-booking-done"
            >
              {tb.doneBtn}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5" noValidate>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="booking-name" className={labelClass}>
                  <span className="inline-flex items-center gap-1.5"><User size={10} /> {tb.nameLbl}</span>
                </label>
                <input
                  id="booking-name"
                  type="text"
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  placeholder={tb.namePlaceholder}
                  className={inputClass("name")}
                  data-testid="input-booking-name"
                />
                <FieldError msg={errors.name} />
              </div>
              <div>
                <label htmlFor="booking-email" className={labelClass}>
                  <span className="inline-flex items-center gap-1.5"><Mail size={10} /> Email</span>
                </label>
                <input
                  id="booking-email"
                  type="email"
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                  placeholder={tb.emailPlaceholder}
                  className={inputClass("email")}
                  data-testid="input-booking-email"
                />
                <FieldError msg={errors.email} />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="booking-phone" className={labelClass}>
                  <span className="inline-flex items-center gap-1.5"><Phone size={10} /> {tb.phoneLbl}</span>
                </label>
                <input
                  id="booking-phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  placeholder="+351 910 000 000"
                  className={inputClass("phone")}
                  data-testid="input-booking-phone"
                />
                <FieldError msg={errors.phone} />
              </div>
              <div>
                <label htmlFor="booking-service" className={labelClass}>
                  {tb.serviceLbl}
                </label>
                <div className="relative">
                  <select
                    id="booking-service"
                    value={form.service}
                    onChange={(e) => set("service", e.target.value)}
                    className={`${inputClass("service")} appearance-none cursor-pointer pr-10`}
                    data-testid="select-booking-service"
                  >
                    <option value="" disabled>{tb.servicePlaceholder}</option>
                    {tb.services.map((s) => (
                      <option key={s.value} value={s.value}>{s.label}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" size={16} />
                </div>
                <FieldError msg={errors.service} />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="booking-date" className={labelClass}>
                  <span className="inline-flex items-center gap-1.5"><Calendar size={10} /> {tb.dateLbl}</span>
                </label>
                <input
                  id="booking-date"
                  type="date"
                  min={today}
                  value={form.preferredDate}
                  onChange={(e) => set("preferredDate", e.target.value)}
                  className={`${inputClass("preferredDate")} [color-scheme:dark]`}
                  data-testid="input-booking-date"
                />
                <FieldError msg={errors.preferredDate} />
              </div>
              <div>
                <label htmlFor="booking-time" className={labelClass}>
                  <span className="inline-flex items-center gap-1.5"><Clock size={10} /> {tb.timeLbl}</span>
                </label>
                <div className="relative">
                  <select
                    id="booking-time"
                    value={form.preferredTime}
                    onChange={(e) => set("preferredTime", e.target.value)}
                    className={`${inputClass("preferredTime")} appearance-none cursor-pointer pr-10`}
                    data-testid="select-booking-time"
                  >
                    <option value="" disabled>{tb.timePlaceholder}</option>
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" size={16} />
                </div>
                <FieldError msg={errors.preferredTime} />
              </div>
            </div>

            <div>
              <label htmlFor="booking-message" className={labelClass}>
                <span className="inline-flex items-center gap-1.5"><MessageSquare size={10} /> {tb.notesLbl}</span>
              </label>
              <textarea
                id="booking-message"
                rows={3}
                value={form.message}
                onChange={(e) => set("message", e.target.value)}
                placeholder={tb.notesPlaceholder}
                className={`${inputClass("message")} resize-none`}
                data-testid="textarea-booking-message"
              />
            </div>

            {mutation.isError && (
              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm" data-testid="booking-error">
                {tb.errorMsg}
              </div>
            )}

            <button
              type="submit"
              disabled={mutation.isPending}
              className="w-full py-4 bg-[#e61f1f] text-white font-black uppercase tracking-widest text-sm rounded-xl hover:bg-[#cc1a1a] transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100 shadow-[0_0_30px_rgba(230,31,31,0.25)]"
              data-testid="button-booking-submit"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              {mutation.isPending ? tb.submittingBtn : tb.submitBtn}
            </button>

            <p className="text-center text-white/25 text-xs">{tb.disclaimer}</p>
          </form>
        )}
      </div>
    </div>
  );
}
