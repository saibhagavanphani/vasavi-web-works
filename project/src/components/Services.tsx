import { ArrowRight } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';
import type { LucideIcon } from 'lucide-react';
import { Code2, Palette, ShoppingCart, Search, Smartphone, Zap } from 'lucide-react';

type Service = {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
};

const SERVICES: Service[] = [
  {
    icon: Code2,
    title: 'Web Development',
    description: 'Custom-built websites with clean, modern code that loads fast and scales with your business.',
    features: ['React & Next.js', 'Pixel-perfect build', 'Clean, semantic code'],
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'Interfaces designed to delight users and guide them toward action — not just look pretty.',
    features: ['User research', 'Wireframing & prototyping', 'Design systems'],
  },
  {
    icon: ShoppingCart,
    title: 'E-Commerce',
    description: 'Online stores that make buying effortless, from product pages to secure checkout.',
    features: ['Shopping cart setup', 'Payment integration', 'Inventory sync'],
  },
  {
    icon: Search,
    title: 'SEO Optimization',
    description: 'Get found on Google with technical SEO, optimized content, and structured data.',
    features: ['Technical SEO audit', 'Keyword strategy', 'Performance tuning'],
  },
  {
    icon: Smartphone,
    title: 'Responsive Design',
    description: 'Flawless experiences on every device — mobile, tablet, and desktop.',
    features: ['Mobile-first approach', 'Cross-browser tested', 'Touch-optimized'],
  },
  {
    icon: Zap,
    title: 'Performance Tuning',
    description: 'Fast websites that score 90+ on Core Web Vitals and keep visitors engaged.',
    features: ['Image optimization', 'Code splitting', 'CDN setup'],
  },
];

export function Services() {
  const { ref, visible } = useReveal();

  return (
    <section id="services" className="relative py-20 lg:py-28 bg-off-white border-y border-sand">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div
          ref={ref}
          className={`mb-14 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <div className="flex items-baseline gap-3 mb-4">
            <span className="text-sm font-medium text-terracotta">Services</span>
            <span className="h-px flex-1 bg-sand max-w-[60px]" />
          </div>
          <h2
            className="font-display font-bold tracking-tight leading-[1.1] text-balance"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
          >
            What we do, and why it matters for{' '}
            <span className="font-editorial text-terracotta">your business</span>
          </h2>
        </div>

        {/* Numbered editorial list */}
        <div className="border-t border-sand">
          {SERVICES.map((service, i) => (
            <ServiceRow key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceRow({ service, index }: { service: Service; index: number }) {
  const { ref, visible } = useReveal();
  const Icon = service.icon;

  return (
    <div
      ref={ref}
      className={`group grid grid-cols-12 gap-4 py-7 border-b border-sand transition-all duration-500 hover:bg-ivory/50 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      {/* Number */}
      <div className="col-span-2 sm:col-span-1">
        <span className="font-display text-lg font-medium text-warm-grey group-hover:text-terracotta transition-colors">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      {/* Icon */}
      <div className="col-span-2 sm:col-span-1">
        <div className="w-9 h-9 rounded-md border border-sand flex items-center justify-center bg-ivory group-hover:border-terracotta transition-colors">
          <Icon className="w-4 h-4 text-soft-black group-hover:text-terracotta transition-colors" />
        </div>
      </div>

      {/* Title + description */}
      <div className="col-span-8 sm:col-span-5">
        <h3 className="font-display text-lg font-semibold text-soft-black mb-1.5">
          {service.title}
        </h3>
        <p className="text-sm text-warm-grey leading-relaxed">{service.description}</p>
      </div>

      {/* Features */}
      <div className="col-span-12 sm:col-span-4 sm:col-start-9 flex flex-col gap-1 justify-center">
        {service.features.map((feat) => (
          <span key={feat} className="text-sm text-warm-grey flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-terracotta" />
            {feat}
          </span>
        ))}
      </div>

      {/* Arrow */}
      <div className="hidden sm:flex col-span-1 items-center justify-end">
        <a
          href="#contact"
          className="text-warm-grey group-hover:text-terracotta transition-colors"
          aria-label={`Learn more about ${service.title}`}
        >
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
