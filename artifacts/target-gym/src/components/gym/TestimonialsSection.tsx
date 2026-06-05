import { useEffect, useRef } from "react";
import { Quote, Star } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const testimonials = [
  {
    name: "Erica Moreira",
    text: "Este ginásio tem o melhor atendimento possível. Principalmente o ambiente do ginásio é muito motivador para as pessoas que queiram estar fitness. Eu recomendo este ginásio 10/10",
    stars: 5,
    initials: "EM",
  },
  {
    name: "Cristina Azevedo",
    text: "Nota 10! Super profissionais! Parabéns",
    stars: 5,
    initials: "CA",
  },
  {
    name: "Carla Cunha",
    text: "Best gym ever 😊",
    stars: 5,
    initials: "CC",
  },
  {
    name: "João Santos",
    text: "Top Mundial 👌",
    stars: 5,
    initials: "JS",
  },
];

export default function TestimonialsSection() {
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
      ref={sectionRef}
      className="py-24 bg-[#111] section-hidden"
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <p className="text-[#e61f1f] text-xs font-semibold tracking-[0.4em] uppercase mb-4">
            {t.testimonials.sectionLabel}
          </p>
          <h2
            id="testimonials-heading"
            className="text-4xl sm:text-5xl font-black uppercase"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            {t.testimonials.titleLine1}
            <br />
            <span className="text-[#e61f1f]">{t.testimonials.titleLine2}</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {testimonials.map((review) => (
            <blockquote
              key={review.name}
              className="bg-[#1a1a1a] rounded-xl p-6 border border-white/5 hover:border-[#e61f1f]/20 transition-all duration-300 hover:-translate-y-1 flex flex-col gap-4"
              data-testid={`card-testimonial-${review.name.toLowerCase().replace(/\s/g, "-")}`}
            >
              <Quote className="text-[#e61f1f]/40" size={28} />

              <div className="flex gap-0.5">
                {Array.from({ length: review.stars }).map((_, i) => (
                  <Star key={i} className="text-[#e61f1f] fill-[#e61f1f]" size={14} />
                ))}
              </div>

              <p className="text-white/70 text-sm leading-relaxed flex-1 italic">
                "{review.text}"
              </p>

              <div className="flex items-center gap-3 mt-2">
                <div
                  className="w-10 h-10 rounded-full bg-[#e61f1f] flex items-center justify-center font-black text-white text-sm flex-shrink-0"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  {review.initials}
                </div>
                <div>
                  <p className="font-bold text-white text-sm">{review.name}</p>
                  <p className="text-white/35 text-xs">{t.testimonials.verifiedLabel}</p>
                </div>
              </div>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
