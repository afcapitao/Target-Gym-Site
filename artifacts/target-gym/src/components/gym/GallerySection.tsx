import { useState, useEffect, useRef } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

const images = [
  {
    src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80&fit=crop",
    alt: "Sala de pesos do Target Gym com equipamento profissional",
    caption: "Sala de Pesos",
  },
  {
    src: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80&fit=crop",
    alt: "Sessão de personal training no Target Gym",
    caption: "Personal Training",
  },
  {
    src: "https://images.unsplash.com/photo-1581009137042-c552e485697a?w=800&q=80&fit=crop",
    alt: "Área de treino funcional com kettlebells",
    caption: "Treino Funcional",
  },
  {
    src: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800&q=80&fit=crop",
    alt: "Equipamento cardiovascular moderno",
    caption: "Zona Cardio",
  },
  {
    src: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800&q=80&fit=crop",
    alt: "Plataforma de levantamento olímpico",
    caption: "Levantamento Olímpico",
  },
  {
    src: "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?w=800&q=80&fit=crop",
    alt: "Área de treino de combate e boxe",
    caption: "Treino de Combate",
  },
  {
    src: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80&fit=crop",
    alt: "Vista geral do ginásio Target",
    caption: "Target Gym",
  },
  {
    src: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=80&fit=crop",
    alt: "Treinador e atleta em sessão intensa",
    caption: "Sessão Intensa",
  },
];

export default function GallerySection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
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

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") setLightboxIndex((i) => (i !== null ? (i + 1) % images.length : null));
      if (e.key === "ArrowLeft") setLightboxIndex((i) => (i !== null ? (i - 1 + images.length) % images.length : null));
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxIndex]);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    document.body.style.overflow = "";
  };

  const prev = () => setLightboxIndex((i) => (i !== null ? (i - 1 + images.length) % images.length : null));
  const next = () => setLightboxIndex((i) => (i !== null ? (i + 1) % images.length : null));

  return (
    <section
      id="galeria"
      ref={sectionRef}
      className="py-24 bg-[#111] section-hidden"
      aria-labelledby="gallery-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <p className="text-[#e61f1f] text-xs font-semibold tracking-[0.4em] uppercase mb-4">
            As Nossas Instalações
          </p>
          <h2
            id="gallery-heading"
            className="text-4xl sm:text-5xl font-black uppercase"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            O Teu Novo
            <br />
            <span className="text-[#e61f1f]">Campo de Batalha</span>
          </h2>
          <p className="mt-4 text-white/50 max-w-xl mx-auto text-sm">
            Equipamento de última geração, espaços desenhados para máxima performance e
            uma atmosfera que te empurra para além dos teus limites.
          </p>
        </div>

        {/* Masonry-style grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
          {images.map((img, idx) => (
            <div
              key={img.src}
              className="break-inside-avoid relative group cursor-pointer overflow-hidden rounded-lg"
              onClick={() => openLightbox(idx)}
              data-testid={`gallery-image-${idx}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center gap-2">
                  <ZoomIn className="text-white" size={24} />
                  <span className="text-white text-xs font-semibold uppercase tracking-widest">
                    {img.caption}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
          onClick={closeLightbox}
          role="dialog"
          aria-label="Galeria ampliada"
          data-testid="lightbox-overlay"
        >
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors p-2"
            onClick={closeLightbox}
            aria-label="Fechar"
            data-testid="button-lightbox-close"
          >
            <X size={28} />
          </button>

          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors p-2 bg-white/10 rounded-full"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Imagem anterior"
            data-testid="button-lightbox-prev"
          >
            <ChevronLeft size={28} />
          </button>

          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors p-2 bg-white/10 rounded-full"
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Próxima imagem"
            data-testid="button-lightbox-next"
          >
            <ChevronRight size={28} />
          </button>

          <div
            className="max-w-5xl max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[lightboxIndex].src.replace("w=800", "w=1200")}
              alt={images[lightboxIndex].alt}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
              data-testid="img-lightbox"
            />
            <p className="text-center text-white/60 text-sm mt-4 tracking-widest uppercase">
              {images[lightboxIndex].caption}
            </p>
            <p className="text-center text-white/30 text-xs mt-1">
              {lightboxIndex + 1} / {images.length}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
