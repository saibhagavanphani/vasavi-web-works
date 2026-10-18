import { useReveal } from '@/hooks/useReveal';

const STEPS = [
  {
    number: '01',
    title: 'Discover',
    description: 'We learn your business, your goals, and your audience. Every project starts with a conversation — not a template.',
  },
  {
    number: '02',
    title: 'Design',
    description: 'We create designs that fit your brand and guide visitors toward action. You review, we refine, together.',
  },
  {
    number: '03',
    title: 'Develop',
    description: 'We build with clean, fast, scalable code. Your site works beautifully on every device and loads quickly.',
  },
  {
    number: '04',
    title: 'Deliver',
    description: 'We launch, train your team, and stick around. Ongoing support keeps everything running smoothly.',
  },
];

export function Process() {
  const { ref, visible } = useReveal();

  return (
    <section id="process" className="relative py-20 lg:py-28 bg-soft-black overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div
          ref={ref}
          className={`max-w-2xl mb-14 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <div className="flex items-baseline gap-3 mb-4">
            <span className="text-sm font-medium text-terracotta">Process</span>
            <span className="h-px flex-1 bg-warm-grey/30 max-w-[60px]" />
          </div>
          <h2
            className="font-display font-bold tracking-tight leading-[1.1] text-balance text-ivory"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
          >
            How we work,{' '}
            <span className="font-editorial text-terracotta">step by step</span>
          </h2>
        </div>

        {/* Steps grid with dividers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-l border-warm-grey/20">
          {STEPS.map((step, i) => (
            <ProcessStep key={step.number} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessStep({
  step,
  index,
}: {
  step: (typeof STEPS)[number];
  index: number;
}) {
  const { ref, visible } = useReveal();

  return (
    <div
      ref={ref}
      className={`border-r border-t border-warm-grey/20 p-6 lg:p-7 transition-all duration-500 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <span className="font-display text-3xl font-bold text-terracotta block mb-4">
        {step.number}
      </span>
      <h3 className="font-display text-lg font-semibold text-ivory mb-2.5">
        {step.title}
      </h3>
      <p className="text-sm text-warm-grey leading-relaxed">{step.description}</p>
    </div>
  );
}
