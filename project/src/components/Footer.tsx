import { ArrowUpRight } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Process', href: '#process' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

const SERVICE_LINKS = [
  'Web Development', 'UI/UX Design', 'E-Commerce',
  'SEO Optimization', 'Responsive Design', 'Performance Tuning',
];

export function Footer() {
  return (
    <footer className="relative bg-soft-black border-t border-warm-grey/15 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 py-14">
        {/* Top section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-warm-grey/15">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-md bg-terracotta flex items-center justify-center">
                <span className="font-display font-semibold text-ivory text-sm">V</span>
              </div>
              <span className="font-display font-semibold text-base text-ivory">
                Vasavi Web Works
              </span>
            </div>
            <p className="text-sm text-warm-grey leading-relaxed">
              Websites that make your business stand out.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-semibold text-ivory/60 uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-warm-grey hover:text-terracotta transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs font-semibold text-ivory/60 uppercase tracking-wider mb-4">
              Services
            </h4>
            <ul className="space-y-2.5">
              {SERVICE_LINKS.map((service) => (
                <li key={service}>
                  <a href="#services" className="text-sm text-warm-grey hover:text-terracotta transition-colors">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold text-ivory/60 uppercase tracking-wider mb-4">
              Get In Touch
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a href="tel:+918919398115" className="text-sm text-warm-grey hover:text-terracotta transition-colors block">
                  +91 89193 98115
                </a>
              </li>
              <li>
                <a href="mailto:padmajakuncham48@gmail.com" className="text-sm text-warm-grey hover:text-terracotta transition-colors block break-all">
                  padmajakuncham48@gmail.com
                </a>
              </li>
              <li>
                <a href="mailto:saibhagavanphani108@gmail.com" className="text-sm text-warm-grey hover:text-terracotta transition-colors block break-all">
                  saibhagavanphani108@gmail.com
                </a>
              </li>
              <li>
                <a href="mailto:sharanyaparepalli73@gmail.com" className="text-sm text-warm-grey hover:text-terracotta transition-colors block break-all">
                  sharanyaparepalli73@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-8">
          <p className="text-xs text-warm-grey">
            © {new Date().getFullYear()} Vasavi Web Works. All rights reserved.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 text-xs text-warm-grey hover:text-terracotta transition-colors"
          >
            Start a project
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
