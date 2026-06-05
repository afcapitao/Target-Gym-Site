import { useEffect, useRef } from "react";
import { Users, Dumbbell, Apple, Wifi } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const serviceIcons = [Dumbbell, Users, Apple, Wifi];

interface ServicesSectionProps {
  onBook: (service: string) => void;
}

export default function ServicesSection({ onBook }: ServicesSectionProps) {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

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

  return (
    <section
      id="servicos"
      ref={sectionRef}
      className="py-24 bg-[#0d0d0d] section-hidden"
      aria-labelledby="services-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <p className="text-[#e61f1f] text-xs font-semibold tracking-[0.4em] uppercase mb-4">
            {t.services.sectionLabel}
          </p>
          <h2
            id="services-heading"
            className="text-4xl sm:text-5xl font-black uppercase"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            {t.services.titleLine1}
            <br />
            <span className="text-[#e61f1f]">{t.services.titleLine2}</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {t.services.items.map((service, i) => {
            const Icon = serviceIcons[i];
            return (
              <article
                key={service.bookingValue}
                className="group bg-[#1a1a1a] rounded-xl overflow-hidden border border-white/5 hover:border-[#e61f1f]/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(230,31,31,0.12)]"
                data-testid={`card-service-${service.title.toLowerCase().replace(/\s/g, "-")}`}
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={service.image}
                    alt={`${service.title} at Target Gym`}
                    width={600}
                    height={208}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-black/30 to-transparent" />
                  <span className="absolute top-4 left-4 bg-[#e61f1f] text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                    {service.tag}
                  </span>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Icon className="text-[#e61f1f]" size={20} />
                    <h3
                      className="text-2xl font-black uppercase text-white"
                      style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                    >
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-white/60 text-sm leading-relaxed mb-5">{service.desc}</p>
                  <ul className="grid grid-cols-2 gap-2 mb-6">
                    {service.highlights.map((h) => (
                      <li key={h} className="flex items-center gap-2 text-xs text-white/50">
                        <span className="w-1 h-1 rounded-full bg-[#e61f1f] flex-shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => onBook(service.bookingValue)}
                    className="w-full py-2.5 border border-[#e61f1f]/50 text-[#e61f1f] text-xs font-bold uppercase tracking-widest rounded hover:bg-[#e61f1f] hover:text-white transition-all duration-200"
                    data-testid={`button-book-service-${service.bookingValue}`}
                  >
                    {t.services.bookCta}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
