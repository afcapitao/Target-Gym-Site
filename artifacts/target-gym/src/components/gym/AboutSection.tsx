import { useEffect, useRef } from "react";
import { Target, Award, MapPin } from "lucide-react";

const pillars = [
  {
    icon: Target,
    title: "Foco Total",
    desc: "Cada sessão é desenhada em torno dos teus objetivos, não de um programa genérico.",
  },
  {
    icon: Award,
    title: "Excelência Comprovada",
    desc: "Metodologias baseadas em ciência do exercício aplicada por treinadores certificados.",
  },
  {
    icon: MapPin,
    title: "Localização Premium",
    desc: "No coração do Parque das Nações, a zona mais moderna e cosmopolita de Lisboa.",
  },
];

export default function AboutSection() {
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
          {/* Text side */}
          <div>
            <p className="text-[#e61f1f] text-xs font-semibold tracking-[0.4em] uppercase mb-4">
              Sobre Nós
            </p>
            <h2
              id="about-heading"
              className="text-4xl sm:text-5xl font-black uppercase leading-tight mb-6"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Onde a Precisão
              <br />
              <span className="text-[#e61f1f]">Encontra a Performance</span>
            </h2>
            <div className="space-y-4 text-white/70 leading-relaxed">
              <p>
                Fundado com a missão de democratizar o acesso a treino de elite,
                o <strong className="text-white">Target Personal Training Gym</strong> nasceu em
                Lisboa com uma convicção: resultados extraordinários exigem
                abordagens extraordinárias.
              </p>
              <p>
                Situado no <strong className="text-white">Passeio do Adamastor, Parque das
                Nações</strong>, o nosso espaço é mais do que um ginásio — é um laboratório
                de performance humana. Aqui, cada máquina, cada metro quadrado e
                cada treinador existem com um único propósito: levar-te mais longe
                do que julgavas ser possível.
              </p>
              <p>
                Da primeira sessão de avaliação ao treino que rompe os teus
                limites, a Target está contigo em cada passo da jornada.
              </p>
            </div>

            <a
              href="#contacto"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 mt-8 px-8 py-3 bg-[#e61f1f] text-white font-bold uppercase tracking-widest text-sm rounded hover:bg-[#cc1a1a] transition-all duration-200 hover:scale-105"
              data-testid="button-about-cta"
            >
              Agendar Avaliação Gratuita
            </a>
          </div>

          {/* Image + pillars */}
          <div className="flex flex-col gap-6">
            <div className="relative rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=700&q=80&fit=crop"
                alt="Interior do Target Personal Training Gym com equipamento profissional"
                width={700}
                height={460}
                loading="lazy"
                className="w-full h-72 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 bg-[#e61f1f] text-white px-4 py-2 rounded font-black text-sm uppercase tracking-widest"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                Parque das Nações · Lisboa
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {pillars.map((p) => (
                <div
                  key={p.title}
                  className="bg-[#1a1a1a] rounded-lg p-5 border border-white/5 hover:border-[#e61f1f]/40 transition-colors duration-300"
                  data-testid={`card-pillar-${p.title.toLowerCase().replace(/\s/g, "-")}`}
                >
                  <p.icon className="text-[#e61f1f] mb-3" size={22} />
                  <h3 className="font-bold text-white text-sm mb-1">{p.title}</h3>
                  <p className="text-white/50 text-xs leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
