import { useEffect, useRef } from "react";
import { Target, Award, MapPin } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const pillarIcons = [Target, Award, MapPin];

interface AboutSectionProps {
  onBook: () => void;
}

export default function AboutSection({ onBook }: AboutSectionProps) {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.classList.add("section-visible");
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="sobre"
      ref={ref}
      className="py-24 bg-[#111] section-hidden"
      aria-labelledby="about-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[#e61f1f] text-xs font-semibold tracking-[0.4em] uppercase mb-4">
              {t.about.sectionLabel}
            </p>
            <h2
              id="about-heading"
              className="text-4xl sm:text-5xl font-black uppercase leading-tight mb-6"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              {t.about.titleLine1}
              <br />
              <span className="text-[#e61f1f]">{t.about.titleLine2}</span>
            </h2>
            <div className="space-y-4 text-white/70 leading-relaxed">
              <p>{t.about.p1}</p>
              <p>{t.about.p2}</p>
              <p>{t.about.p3}</p>
            </div>

            <button
              onClick={onBook}
              className="inline-flex items-center gap-2 mt-8 px-8 py-3 bg-[#e61f1f] text-white font-bold uppercase tracking-widest text-sm rounded hover:bg-[#cc1a1a] transition-all duration-200 hover:scale-105"
              data-testid="button-about-cta"
            >
              {t.about.cta}
            </button>
          </div>

          <div className="flex flex-col gap-6">
            <div className="relative rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=700&q=80&fit=crop"
                alt={t.about.imgAlt}
                width={700}
                height={460}
                loading="lazy"
                className="w-full h-72 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div
                className="absolute bottom-4 left-4 bg-[#e61f1f] text-white px-4 py-2 rounded font-black text-sm uppercase tracking-widest"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                Parque das Nações · Lisboa
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {t.about.pillars.map((p, i) => {
                const Icon = pillarIcons[i];
                return (
                  <div
                    key={p.title}
                    className="bg-[#1a1a1a] rounded-lg p-5 border border-white/5 hover:border-[#e61f1f]/40 transition-colors duration-300"
                    data-testid={`card-pillar-${p.title.toLowerCase().replace(/\s/g, "-")}`}
                  >
                    <Icon className="text-[#e61f1f] mb-3" size={22} />
                    <h3 className="font-bold text-white text-sm mb-1">{p.title}</h3>
                    <p className="text-white/50 text-xs leading-relaxed">{p.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
