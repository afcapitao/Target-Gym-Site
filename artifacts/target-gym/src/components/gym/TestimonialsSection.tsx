import { useEffect, useRef } from "react";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Carlos Mendes",
    age: 38,
    result: "Perdeu 18kg em 5 meses",
    text: "Nunca pensei que conseguiria transformar o meu corpo assim. O Miguel adaptou cada treino ao meu horário de trabalho e os resultados superaram tudo o que eu esperava. A Target não é só um ginásio — é uma mudança de vida.",
    stars: 5,
    initials: "CM",
  },
  {
    name: "Inês Carvalho",
    age: 29,
    result: "Ganhou 6kg de músculo",
    text: "Comecei sem saber nada sobre treino de força. A Ana acompanhou-me desde o primeiro dia com uma paciência e conhecimento incríveis. Hoje treino com cargas que nunca imaginarei conseguir levantar. Recomendo a 100%.",
    stars: 5,
    initials: "IC",
  },
  {
    name: "Rui Azevedo",
    age: 44,
    result: "Recuperou de lesão nas costas",
    text: "Tinha uma hérnia discal e achava que nunca voltaria a treinar a sério. O João trabalhou comigo de forma progressiva e inteligente. Passados 4 meses, treino mais forte do que quando tinha 30 anos.",
    stars: 5,
    initials: "RA",
  },
  {
    name: "Beatriz Oliveira",
    age: 25,
    result: "Preparou a primeira corrida de 10km",
    text: "Entrei para perder peso mas acabei apaixonada pelo treino funcional. A equipa da Target é excepcional — profissional, motivadora e genuinamente preocupada com o teu progresso. O melhor investimento que fiz em mim mesma.",
    stars: 5,
    initials: "BO",
  },
  {
    name: "Pedro Nunes",
    age: 52,
    result: "Controlou diabetes tipo 2",
    text: "Com a orientação da Sofia em nutrição e do Miguel no treino, consegui reverter a minha pré-diabetes e parar com a medicação. Isto é mais do que fitness — é medicina preventiva de alta qualidade.",
    stars: 5,
    initials: "PN",
  },
  {
    name: "Filipa Costa",
    age: 33,
    result: "Voltou ao peso pré-gravidez",
    text: "Oito meses após o parto, recuperei o meu corpo e muito mais — recuperei a minha confiança. A abordagem personalizada da Ana foi fundamental. Nunca me senti mais forte nem mais saudável.",
    stars: 5,
    initials: "FC",
  },
];

export default function TestimonialsSection() {
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
            Histórias Reais
          </p>
          <h2
            id="testimonials-heading"
            className="text-4xl sm:text-5xl font-black uppercase"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            O Que os Nossos
            <br />
            <span className="text-[#e61f1f]">Clientes Dizem</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <blockquote
              key={t.name}
              className="bg-[#1a1a1a] rounded-xl p-6 border border-white/5 hover:border-[#e61f1f]/20 transition-all duration-300 hover:-translate-y-1 flex flex-col gap-4"
              data-testid={`card-testimonial-${t.name.toLowerCase().replace(/\s/g, "-")}`}
            >
              <Quote className="text-[#e61f1f]/40" size={28} />

              {/* Stars */}
              <div className="flex gap-0.5">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <Star key={i} className="text-[#e61f1f] fill-[#e61f1f]" size={14} />
                ))}
              </div>

              <p className="text-white/70 text-sm leading-relaxed flex-1 italic">
                "{t.text}"
              </p>

              <div className="flex items-center gap-3 mt-2">
                <div className="w-10 h-10 rounded-full bg-[#e61f1f] flex items-center justify-center font-black text-white text-sm flex-shrink-0"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="font-bold text-white text-sm">{t.name}</p>
                  <p className="text-[#e61f1f] text-xs font-semibold">{t.result}</p>
                </div>
              </div>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
