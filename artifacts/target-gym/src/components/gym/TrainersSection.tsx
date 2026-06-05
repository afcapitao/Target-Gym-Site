import { useEffect, useRef } from "react";
import { Instagram, Linkedin } from "lucide-react";

const trainers = [
  {
    name: "Miguel Santos",
    role: "Head Coach · Personal Trainer",
    specialty: "Força & Condicionamento",
    certs: "NSCA-CPT · FMS Level 2 · Corrective Exercise",
    bio: "12 anos de experiência em treino de alto rendimento. Ex-atleta de halterofilismo, Miguel combina ciência do exercício com abordagem prática para resultados mensuráveis.",
    image: "https://images.unsplash.com/photo-1549476464-37392f717541?w=400&h=500&q=80&fit=crop&crop=face",
    instagram: "#",
    linkedin: "#",
  },
  {
    name: "Ana Rodrigues",
    role: "Personal Trainer · Nutrição",
    specialty: "Transformação Corporal",
    certs: "ACSM-CPT · Nutrição Desportiva · HIIT Specialist",
    bio: "Especialista em transformação corporal feminina com foco em saúde hormonal e performance. Já acompanhou mais de 200 clientes em jornadas de mudança real.",
    image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&h=500&q=80&fit=crop&crop=face",
    instagram: "#",
    linkedin: "#",
  },
  {
    name: "João Ferreira",
    role: "Personal Trainer",
    specialty: "Treino Funcional & HIIT",
    certs: "NASM-CPT · CrossFit L2 · TRX Certified",
    bio: "Apaixonado por movimento funcional e treino de alta intensidade. João adapta cada treino ao nível do cliente, garantindo progressão segura e resultados rápidos.",
    image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&h=500&q=80&fit=crop&crop=face",
    instagram: "#",
    linkedin: "#",
  },
  {
    name: "Sofia Lopes",
    role: "Nutricionista Desportiva",
    specialty: "Nutrição & Performance",
    certs: "Licenciatura em Nutrição · Pós-grad. Desporto",
    bio: "Nutricionista especializada em performance desportiva e composição corporal. Sofia cria estratégias nutricionais que potenciam o treino e respeitam o estilo de vida de cada pessoa.",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=500&q=80&fit=crop&crop=face",
    instagram: "#",
    linkedin: "#",
  },
];

interface TrainersSectionProps {
  onBook: () => void;
}

export default function TrainersSection({ onBook }: TrainersSectionProps) {
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
      id="equipa"
      ref={sectionRef}
      className="py-24 bg-[#0d0d0d] section-hidden"
      aria-labelledby="trainers-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <p className="text-[#e61f1f] text-xs font-semibold tracking-[0.4em] uppercase mb-4">
            A Nossa Equipa
          </p>
          <h2
            id="trainers-heading"
            className="text-4xl sm:text-5xl font-black uppercase"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            Os Especialistas
            <br />
            <span className="text-[#e61f1f]">Por Trás dos Resultados</span>
          </h2>
          <p className="mt-4 text-white/50 max-w-xl mx-auto text-sm">
            Treinadores certificados, apaixonados pela performance humana e
            comprometidos com o teu progresso pessoal.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trainers.map((trainer) => (
            <article
              key={trainer.name}
              className="group relative bg-[#1a1a1a] rounded-xl overflow-hidden border border-white/5 hover:border-[#e61f1f]/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(230,31,31,0.15)]"
              data-testid={`card-trainer-${trainer.name.toLowerCase().replace(/\s/g, "-")}`}
            >
              {/* Photo */}
              <div className="relative h-72 overflow-hidden">
                <img
                  src={trainer.image}
                  alt={`${trainer.name} - ${trainer.role} no Target Gym`}
                  width={400}
                  height={288}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent" />

                {/* Social links on hover */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a
                    href={trainer.instagram}
                    className="w-8 h-8 bg-[#e61f1f] rounded-full flex items-center justify-center text-white hover:bg-[#cc1a1a] transition-colors"
                    aria-label={`Instagram de ${trainer.name}`}
                    data-testid={`link-instagram-${trainer.name.toLowerCase().replace(/\s/g, "-")}`}
                  >
                    <Instagram size={14} />
                  </a>
                  <a
                    href={trainer.linkedin}
                    className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                    aria-label={`LinkedIn de ${trainer.name}`}
                    data-testid={`link-linkedin-${trainer.name.toLowerCase().replace(/\s/g, "-")}`}
                  >
                    <Linkedin size={14} />
                  </a>
                </div>

                {/* Specialty badge */}
                <div className="absolute bottom-3 left-3">
                  <span className="bg-[#e61f1f]/90 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                    {trainer.specialty}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-5">
                <h3
                  className="text-xl font-black uppercase text-white leading-tight"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  {trainer.name}
                </h3>
                <p className="text-[#e61f1f] text-xs font-semibold uppercase tracking-wider mt-1 mb-3">
                  {trainer.role}
                </p>
                <p className="text-white/50 text-xs leading-relaxed mb-3">{trainer.bio}</p>
                <p className="text-white/30 text-[10px] leading-relaxed mb-4">{trainer.certs}</p>
                <button
                  onClick={onBook}
                  className="w-full py-2 border border-white/10 text-white/50 text-[11px] font-bold uppercase tracking-widest rounded hover:border-[#e61f1f] hover:text-[#e61f1f] transition-all duration-200"
                  data-testid={`button-book-trainer-${trainer.name.toLowerCase().replace(/\s/g, "-")}`}
                >
                  Treinar com {trainer.name.split(" ")[0]}
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
