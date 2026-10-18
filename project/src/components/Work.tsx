import { ArrowUpRight } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';

type Project = {
  title: string;
  category: string;
  description: string;
  image: string;
  alt: string;
  aspect: 'wide' | 'tall' | 'square';
};

const PROJECTS: Project[] = [
  {
    title: 'Saffron Table',
    category: 'Restaurant',
    description: 'A warm, inviting website for a family restaurant — menu, reservations, and story in one place.',
    image: 'https://images.pexels.com/photos/225201/pexels-photo-225201.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Cozy restaurant interior with warm lighting',
    aspect: 'wide',
  },
  {
    title: 'Iron Core Fitness',
    category: 'Gym & Wellness',
    description: 'A high-energy site for a neighborhood gym — class schedules, trainer profiles, and membership signup.',
    image: 'https://images.pexels.com/photos/4716814/pexels-photo-4716814.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Modern gym interior with fitness equipment',
    aspect: 'tall',
  },
  {
    title: 'Carepoint Clinic',
    category: 'Healthcare',
    description: 'A calm, trustworthy website for a dental clinic — easy appointment booking and service information.',
    image: 'https://images.pexels.com/photos/6812429/pexels-photo-6812429.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Modern dental clinic reception',
    aspect: 'wide',
  },
  {
    title: 'Bean & Bloom',
    category: 'Cafe',
    description: 'A charming website for a local cafe — menu, hours, location, and a gallery that makes you want to visit.',
    image: 'https://images.pexels.com/photos/2079452/pexels-photo-2079452.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Warm and inviting cafe interior',
    aspect: 'tall',
  },
  {
    title: 'Aura Salon',
    category: 'Beauty & Spa',
    description: 'An elegant website for a beauty salon — service menu, online booking, and stylist portfolios.',
    image: 'https://images.pexels.com/photos/7195805/pexels-photo-7195805.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Contemporary beauty salon interior',
    aspect: 'wide',
  },
];

export function Work() {
  const { ref, visible } = useReveal();

  return (
    <section id="work" className="relative py-20 lg:py-28">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div
          ref={ref}
          className={`flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div>
            <div className="flex items-baseline gap-3 mb-3">
              <span className="text-sm font-medium text-terracotta">Selected Work</span>
              <span className="h-px flex-1 bg-sand max-w-[60px]" />
            </div>
            <h2
              className="font-display font-bold tracking-tight leading-[1.1] text-balance"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
            >
              Concept projects we're <span className="font-editorial text-terracotta">proud of</span>
            </h2>
          </div>
          <p className="text-sm text-warm-grey max-w-xs leading-relaxed">
            These are concept designs showcasing the kind of work we do for small
            businesses across industries.
          </p>
        </div>

        {/* Projects — varied layout */}
        {/* Row 1: two projects side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          <ProjectCard project={PROJECTS[0]} index={0} />
          <ProjectCard project={PROJECTS[1]} index={1} />
        </div>

        {/* Row 2: one large wide project */}
        <div className="mb-5">
          <ProjectCard project={PROJECTS[2]} index={2} wide />
        </div>

        {/* Row 3: two projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <ProjectCard project={PROJECTS[3]} index={3} />
          <ProjectCard project={PROJECTS[4]} index={4} />
        </div>

        {/* CTA */}
        <div className="mt-12 flex justify-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-soft-black border border-sand rounded-md hover:border-terracotta hover:text-terracotta transition-colors duration-200"
          >
            Want a website like these? Let's talk
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index, wide }: { project: Project; index: number; wide?: boolean }) {
  const { ref, visible } = useReveal();

  const aspectClass = wide
    ? 'h-72 sm:h-80 lg:h-96'
    : project.aspect === 'tall'
    ? 'h-64 sm:h-72'
    : 'h-56 sm:h-60';

  return (
    <div
      ref={ref}
      className={`group relative overflow-hidden rounded-lg border border-sand bg-off-white transition-all duration-700 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Image */}
      <div className={`relative ${aspectClass} overflow-hidden`}>
        <img
          src={project.image}
          alt={project.alt}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-soft-black/40 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
        <div className="absolute top-3 right-3 px-2.5 py-1 rounded bg-ivory/90 text-[11px] font-medium text-warm-grey">
          Concept
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div>
            <span className="text-xs font-medium text-terracotta uppercase tracking-wider">
              {project.category}
            </span>
            <h3 className="font-display text-lg font-semibold text-soft-black mt-0.5">
              {project.title}
            </h3>
          </div>
          <div className="flex items-center justify-center w-8 h-8 rounded border border-sand group-hover:border-terracotta transition-colors flex-shrink-0">
            <ArrowUpRight className="w-4 h-4 text-warm-grey group-hover:text-terracotta transition-colors" />
          </div>
        </div>
        <p className="text-sm text-warm-grey leading-relaxed">{project.description}</p>
      </div>
    </div>
  );
}
