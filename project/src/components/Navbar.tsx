import { useEffect, useState } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { useScrollProgress, useActiveSection } from '@/hooks/useScroll';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Process', href: '#process' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

const SECTION_IDS = ['home', 'services', 'work', 'process', 'about', 'contact'];

export function Navbar() {
  const { scrolled } = useScrollProgress();
  const active = useActiveSection(SECTION_IDS);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'py-3 bg-ivory/90 backdrop-blur-md border-b border-sand'
            : 'py-4 bg-transparent'
        }`}
      >
        <nav className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <a href="#home" className="group flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-md bg-soft-black flex items-center justify-center group-hover:bg-terracotta transition-colors duration-200">
              <span className="font-display font-bold text-ivory text-base">V</span>
            </div>
            <span className="font-display font-semibold text-lg tracking-tight text-soft-black">
              Vasavi Web Works
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-0.5">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`relative px-3.5 py-1.5 text-sm font-medium transition-colors duration-200 ${
                  active === link.href.slice(1)
                    ? 'text-soft-black'
                    : 'text-warm-grey hover:text-soft-black'
                }`}
              >
                {link.label}
                {active === link.href.slice(1) && (
                  <span className="absolute -bottom-0.5 left-3.5 right-3.5 h-px bg-terracotta" />
                )}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-ivory bg-soft-black rounded-md hover:bg-terracotta transition-colors duration-200"
            >
              Start a Project
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-1.5 text-soft-black hover:text-terracotta transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-ivory/96 backdrop-blur-md"
          onClick={() => setMobileOpen(false)}
        />
        <div className="relative flex flex-col items-center justify-center h-full gap-1">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="font-display text-2xl font-semibold text-warm-grey hover:text-terracotta transition-colors py-2.5"
              style={{
                opacity: mobileOpen ? 1 : 0,
                transform: mobileOpen ? 'translateY(0)' : 'translateY(12px)',
                transition: `all 0.35s ease ${i * 0.05}s`,
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="mt-5 inline-flex items-center gap-2 px-6 py-3 text-base font-medium text-ivory bg-soft-black rounded-md"
          >
            Start a Project
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </>
  );
}
