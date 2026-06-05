import { useEffect, useRef, useState } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const contactIcons = [MapPin, Phone, Mail, Clock];
const staticContactValues = [
  "Passeio do Adamastor, Parque das Nações, 1990-001 Lisboa",
  "+351 910 000 000",
  "geral@targetgym.pt",
  "",
];

export default function ContactSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.classList.add("section-visible");
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => {
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    }, 1400);
  };

  const infoLabelKeys = ["address", "phone", "email", "hours"] as const;
  const contactInfoItems = infoLabelKeys.map((key, i) => ({
    icon: contactIcons[i],
    label: t.contact.infoLabels[key],
    value: key === "hours" ? t.contact.hours : staticContactValues[i],
  }));

  return (
    <section
      id="contacto"
      ref={sectionRef}
      className="py-24 bg-[#0d0d0d] section-hidden"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <p className="text-[#e61f1f] text-xs font-semibold tracking-[0.4em] uppercase mb-4">
            {t.contact.sectionLabel}
          </p>
          <h2
            id="contact-heading"
            className="text-4xl sm:text-5xl font-black uppercase"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            {t.contact.titleLine1}
            <br />
            <span className="text-[#e61f1f]">{t.contact.titleLine2}</span>
          </h2>
          <p className="mt-4 text-white/50 max-w-xl mx-auto text-sm">
            {t.contact.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="bg-[#1a1a1a] rounded-xl p-8 border border-white/5">
            <h3
              className="text-2xl font-black uppercase mb-6 text-white"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              {t.contact.formTitle}
            </h3>

            {status === "sent" ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-[#e61f1f]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-[#e61f1f]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4
                  className="text-xl font-black text-white uppercase mb-2"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  {t.contact.successTitle}
                </h4>
                <p className="text-white/50 text-sm">{t.contact.successSubtitle}</p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-6 text-[#e61f1f] text-sm font-semibold uppercase tracking-wider hover:underline"
                  data-testid="button-reset-form"
                >
                  {t.contact.sendAnother}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-semibold uppercase tracking-widest text-white/50 mb-2">
                    {t.contact.nameLbl}
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder={t.contact.namePlaceholder}
                    className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#e61f1f] transition-colors"
                    data-testid="input-contact-name"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-xs font-semibold uppercase tracking-widest text-white/50 mb-2">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder={t.contact.emailPlaceholder}
                    className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#e61f1f] transition-colors"
                    data-testid="input-contact-email"
                  />
                </div>
                <div>
                  <label htmlFor="contact-message" className="block text-xs font-semibold uppercase tracking-widest text-white/50 mb-2">
                    {t.contact.messageLbl}
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder={t.contact.messagePlaceholder}
                    className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#e61f1f] transition-colors resize-none"
                    data-testid="textarea-contact-message"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full py-4 bg-[#e61f1f] text-white font-bold uppercase tracking-widest text-sm rounded-lg hover:bg-[#cc1a1a] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                  data-testid="button-contact-submit"
                >
                  {status === "sending" ? t.contact.sendingBtn : t.contact.sendBtn}
                </button>
              </form>
            )}
          </div>

          <div className="flex flex-col gap-6">
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactInfoItems.map((item) => (
                <div
                  key={item.label}
                  className="bg-[#1a1a1a] rounded-xl p-5 border border-white/5 flex gap-4 items-start"
                  data-testid={`contact-info-${item.label.toLowerCase()}`}
                >
                  <item.icon className="text-[#e61f1f] mt-0.5 flex-shrink-0" size={18} />
                  <div>
                    <dt className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-1">
                      {item.label}
                    </dt>
                    <dd className="text-white text-sm leading-relaxed">{item.value}</dd>
                  </div>
                </div>
              ))}
            </dl>

            <div className="rounded-xl overflow-hidden border border-white/10 h-72">
              <iframe
                title={t.contact.mapTitle}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3111.8548999985!2d-9.098752!3d38.762878!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd19329d3cab77d7%3A0x5df7d2a7eea7c25b!2sParque%20das%20Na%C3%A7%C3%B5es%2C%20Lisboa!5e0!3m2!1spt!2spt!4v1680000000000!5m2!1spt!2spt"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                data-testid="iframe-map"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
