import { useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface HeroSectionProps {
  onBook: () => void;
}

export default function HeroSection({ onBook }: HeroSectionProps) {
  const { t } = useLanguage();
  const videoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 15;
      const y = (clientY / innerHeight - 0.5) * 15;
      el.style.transform = `translate(${x}px, ${y}px) scale(1.05)`;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div
        ref={videoRef}
        className="absolute inset-0 transition-transform duration-300 ease-out"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&q=85&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          willChange: "transform",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-[#141414]" />
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#e61f1f]" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-20">
        <p className="text-[#e61f1f] text-xs sm:text-sm font-semibold tracking-[0.4em] uppercase mb-6 opacity-0 animate-[fadeInUp_0.8s_ease_0.3s_forwards]">
          {t.hero.location}
        </p>

        <h1
          className="text-5xl sm:text-7xl lg:text-8xl font-black uppercase leading-none tracking-tight mb-6 opacity-0 animate-[fadeInUp_0.8s_ease_0.5s_forwards]"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          {t.hero.titleLine1}
          <br />
          <span className="text-[#e61f1f]">{t.hero.titleLine2}</span>
        </h1>

        <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed opacity-0 animate-[fadeInUp_0.8s_ease_0.7s_forwards]">
          {t.hero.subtitle}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-[fadeInUp_0.8s_ease_0.9s_forwards]">
          <button
            onClick={onBook}
            className="inline-flex items-center justify-center px-10 py-4 bg-[#e61f1f] text-white font-bold uppercase tracking-widest text-sm rounded hover:bg-[#cc1a1a] transition-all duration-200 hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(230,31,31,0.3)]"
            data-testid="button-hero-cta"
          >
            {t.hero.ctaStart}
          </button>
          <a
            href="#sobre"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("sobre")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center justify-center px-10 py-4 border border-white/30 text-white font-bold uppercase tracking-widest text-sm rounded hover:border-white hover:bg-white/10 transition-all duration-200"
            data-testid="button-hero-learn-more"
          >
            {t.hero.ctaLearnMore}
          </a>
        </div>
      </div>

      <a
        href="#sobre"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("sobre")?.scrollIntoView({ behavior: "smooth" });
        }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/40 hover:text-white/80 transition-colors animate-bounce"
        data-testid="link-scroll-down"
      >
        <ChevronDown size={32} />
      </a>
    </section>
  );
}
