import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Início", href: "#inicio" },
  { label: "Sobre", href: "#sobre" },
  { label: "Serviços", href: "#servicos" },
  { label: "Galeria", href: "#galeria" },
  { label: "Equipa", href: "#equipa" },
  { label: "Contacto", href: "#contacto" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("inicio");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sections = navLinks.map((l) => l.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    const id = href.slice(1);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#141414]/95 backdrop-blur-md shadow-lg py-3"
          : "bg-transparent py-5"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <a
          href="#inicio"
          onClick={(e) => { e.preventDefault(); scrollTo("#inicio"); }}
          className="flex items-center"
          data-testid="link-logo"
        >
          <img
            src="/logo.png"
            alt="Target Personal Training Gym logo"
            className="h-10 w-auto"
          />
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                data-testid={`link-nav-${link.label.toLowerCase()}`}
                className={`text-sm font-medium tracking-widest uppercase transition-colors duration-200 ${
                  active === link.href.slice(1)
                    ? "text-[#e61f1f]"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contacto"
          onClick={(e) => { e.preventDefault(); scrollTo("#contacto"); }}
          className="hidden md:inline-flex items-center px-6 py-2.5 bg-[#e61f1f] text-white text-sm font-semibold uppercase tracking-widest rounded hover:bg-[#cc1a1a] transition-colors duration-200"
          data-testid="button-cta-nav"
        >
          Marcar Sessão
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          data-testid="button-menu-toggle"
          aria-label="Abrir menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#141414]/98 backdrop-blur-md border-t border-white/10">
          <ul className="flex flex-col py-4 px-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                  className={`block py-3 text-sm font-medium tracking-widest uppercase border-b border-white/10 transition-colors ${
                    active === link.href.slice(1) ? "text-[#e61f1f]" : "text-white/70"
                  }`}
                  data-testid={`link-mobile-nav-${link.label.toLowerCase()}`}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-4">
              <a
                href="#contacto"
                onClick={(e) => { e.preventDefault(); scrollTo("#contacto"); }}
                className="block text-center px-6 py-3 bg-[#e61f1f] text-white text-sm font-semibold uppercase tracking-widest rounded"
                data-testid="button-cta-mobile"
              >
                Marcar Sessão
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
