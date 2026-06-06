import { Instagram, Facebook, Youtube, ArrowUp, Settings } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Link } from "wouter";

interface FooterProps {
  onBook: () => void;
}

const scrollTo = (href: string) => {
  const id = href.slice(1);
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

export default function Footer({ onBook }: FooterProps) {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#0a0a0a] border-t border-white/5" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <img
              src="/logo.png"
              alt="Target Personal Training Gym logo"
              className="h-16 w-auto mb-4"
            />
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              {t.footer.tagline}
            </p>
            <div className="flex gap-3 mt-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-[#1a1a1a] rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-[#e61f1f] transition-all duration-200"
                aria-label="Instagram"
                data-testid="link-social-instagram"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-[#1a1a1a] rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-[#1877f2] transition-all duration-200"
                aria-label="Facebook"
                data-testid="link-social-facebook"
              >
                <Facebook size={16} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-[#1a1a1a] rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-[#ff0000] transition-all duration-200"
                aria-label="YouTube"
                data-testid="link-social-youtube"
              >
                <Youtube size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="text-white font-black uppercase text-sm tracking-widest mb-5"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              {t.footer.navTitle}
            </h4>
            <ul className="space-y-3">
              {t.footer.quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                    className="text-white/40 hover:text-white text-sm transition-colors duration-200 flex items-center gap-2 group"
                    data-testid={`footer-link-${link.label.toLowerCase().replace(/\s/g, "-")}`}
                  >
                    <span className="w-0 h-px bg-[#e61f1f] group-hover:w-3 transition-all duration-200" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4
              className="text-white font-black uppercase text-sm tracking-widest mb-5"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              {t.footer.servicesTitle}
            </h4>
            <ul className="space-y-3">
              {t.footer.services.map((s) => (
                <li key={s}>
                  <a
                    href="#servicos"
                    onClick={(e) => { e.preventDefault(); scrollTo("#servicos"); }}
                    className="text-white/40 hover:text-white text-sm transition-colors duration-200 flex items-center gap-2 group"
                    data-testid={`footer-service-${s.toLowerCase().replace(/\s/g, "-")}`}
                  >
                    <span className="w-0 h-px bg-[#e61f1f] group-hover:w-3 transition-all duration-200" />
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="text-white font-black uppercase text-sm tracking-widest mb-5"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              {t.footer.contactTitle}
            </h4>
            <address className="not-italic space-y-3 text-sm text-white/40">
              <p>
                Passeio do Adamastor<br />
                Parque das Nações<br />
                1990-001 Lisboa
              </p>
              <p>
                <a href="tel:+351910000000" className="hover:text-white transition-colors" data-testid="link-footer-phone">
                  +351 910 000 000
                </a>
              </p>
              <p>
                <a href="mailto:geral@targetgym.pt" className="hover:text-white transition-colors" data-testid="link-footer-email">
                  geral@targetgym.pt
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="border-t border-white/5 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/25 text-xs">
            &copy; {new Date().getFullYear()} Target Personal Training Gym. {t.footer.copyright}
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-white/25 hover:text-white/50 text-xs transition-colors" data-testid="link-footer-privacy">
              {t.footer.privacy}
            </a>
            <a href="#" className="text-white/25 hover:text-white/50 text-xs transition-colors" data-testid="link-footer-terms">
              {t.footer.terms}
            </a>
            <Link
              href="/admin"
              className="flex items-center gap-1 text-white/20 hover:text-white/50 text-xs transition-colors"
              data-testid="link-footer-admin"
            >
              <Settings size={11} />
              Admin
            </Link>
            <button
              onClick={scrollToTop}
              className="w-8 h-8 bg-[#e61f1f]/20 hover:bg-[#e61f1f] rounded-full flex items-center justify-center text-[#e61f1f] hover:text-white transition-all duration-200"
              aria-label={t.footer.backToTop}
              data-testid="button-scroll-top"
            >
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
