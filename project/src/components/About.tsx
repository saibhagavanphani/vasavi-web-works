import { Mail, ArrowUpRight } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';

type Person = {
  name: string;
  role: string;
  bio: string;
  email: string;
  initials: string;
};

const TEAM: Person[] = [
  {
    name: 'Padmaja Shetty',
    role: 'CEO',
    bio: 'Guiding Vasavi Web Works with strategic direction and a commitment to client success.',
    email: 'padmajakuncham48@gmail.com',
    initials: 'PS',
  },
  {
    name: 'Bhagavan Shetty',
    role: 'Founder & Lead Developer',
    bio: 'Full-stack developer building fast, scalable websites with clean, maintainable code.',
    email: 'saibhagavanphani108@gmail.com',
    initials: 'BS',
  },
  {
    name: 'Sharanya Shetty',
    role: 'Co-Founder & Design Lead',
    bio: 'Designer crafting elegant, user-centric interfaces that balance beauty with function.',
    email: 'sharanyaparepalli73@gmail.com',
    initials: 'SS',
  },
];

export function About() {
  const { ref, visible } = useReveal();

  return (
    <section id="about" className="relative py-20 lg:py-28 bg-off-white border-y border-sand">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left — intro text */}
          <div
            ref={ref}
            className={`lg:col-span-5 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          >
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-sm font-medium text-terracotta">About</span>
              <span className="h-px flex-1 bg-sand max-w-[60px]" />
            </div>
            <h2
              className="font-display font-bold tracking-tight leading-[1.1] text-balance mb-5"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)' }}
            >
              A small team that{' '}
              <span className="font-editorial text-terracotta">cares deeply</span>
            </h2>
            <p className="text-base text-warm-grey leading-relaxed mb-4">
              Vasavi Web Works is a focused web studio — no bloated agency overhead,
              no account managers, no handoffs between five different people. When
              you work with us, you work directly with the people building your
              website.
            </p>
            <p className="text-base text-warm-grey leading-relaxed mb-8">
              We take on a limited number of projects at a time so each one gets
              the attention it deserves. Every website we build is crafted from
              scratch — no recycled templates.
            </p>

            {/* Values */}
            <div className="space-y-4">
              {[
                { title: 'Craft over speed', desc: 'We obsess over the details that make your site feel premium.' },
                { title: 'Transparent process', desc: "You always know what we're doing, why, and when." },
                { title: 'Long-term partnership', desc: "We're here after launch — not just until the invoice clears." },
              ].map((v) => (
                <div key={v.title} className="flex gap-3">
                  <span className="text-terracotta text-sm font-display font-bold mt-0.5">—</span>
                  <div>
                    <span className="font-display font-semibold text-soft-black text-sm">{v.title}</span>
                    <span className="text-warm-grey text-sm"> — {v.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — team */}
          <div className="lg:col-span-7">
            <div className="space-y-4">
              {TEAM.map((person, i) => (
                <TeamRow key={person.name} person={person} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TeamRow({ person, index }: { person: Person; index: number }) {
  const { ref, visible } = useReveal();

  return (
    <div
      ref={ref}
      className={`group flex items-start gap-5 p-5 border border-sand rounded-lg bg-ivory hover:border-terracotta/40 transition-all duration-500 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Initials block */}
      <div className="flex-shrink-0 w-14 h-14 rounded-md bg-soft-black flex items-center justify-center group-hover:bg-terracotta transition-colors duration-300">
        <span className="font-display text-lg font-semibold text-ivory">{person.initials}</span>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-display text-base font-semibold text-soft-black">{person.name}</h3>
        <p className="text-sm text-terracotta font-medium mb-2">{person.role}</p>
        <p className="text-sm text-warm-grey leading-relaxed mb-3">{person.bio}</p>
        <a
          href={`mailto:${person.email}`}
          className="inline-flex items-center gap-1.5 text-xs text-warm-grey hover:text-terracotta transition-colors"
        >
          <Mail className="w-3.5 h-3.5" />
          {person.email}
        </a>
      </div>

      {/* Arrow */}
      <div className="hidden sm:flex flex-shrink-0">
        <a
          href={`mailto:${person.email}`}
          className="flex items-center justify-center w-8 h-8 rounded border border-sand group-hover:border-terracotta transition-colors"
          aria-label={`Email ${person.name}`}
        >
          <ArrowUpRight className="w-4 h-4 text-warm-grey group-hover:text-terracotta transition-colors" />
        </a>
      </div>
    </div>
  );
}
