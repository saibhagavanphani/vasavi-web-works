import { ArrowRight, ArrowDown } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';

export function Hero() {
  const { ref, visible } = useReveal();

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-28 pb-16"
    >
      <div className="relative max-w-6xl mx-auto px-6 w-full">
        <div className="max-w-4xl">
          <div
            ref={ref}
            className={`transition-all duration-700 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <p className="text-sm font-medium text-terracotta mb-6">
              Web design & development studio
            </p>

            <h1
              className="font-display font-bold tracking-tight leading-[1.08] text-balance"
              style={{ fontSize: 'clamp(2.25rem, 5.5vw, 4.25rem)' }}
            >
              Websites that make your business{' '}
              <span className="text-terracotta">stand out</span>.
            </h1>

            <p className="mt-6 text-lg text-warm-grey leading-relaxed max-w-lg">
              We design and build thoughtful websites that help businesses look
              professional, earn customer trust, and grow online.
            </p>

            <div className="mt-9 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href="#contact"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-medium text-ivory bg-soft-black rounded-md hover:bg-terracotta transition-colors duration-200"
              >
                Start Your Project
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a
                href="#work"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-medium text-soft-black border border-sand rounded-md hover:border-terracotta hover:text-terracotta transition-colors duration-200"
              >
                View Our Work
              </a>
            </div>

            {/* Small detail line */}
            <div className="mt-10 flex items-center gap-3 text-sm text-warm-grey">
              <span className="w-8 h-px bg-terracotta" />
              Based in India · Working with businesses everywhere
            </div>
          </div>

        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#services"
        className="absolute bottom-7 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-1.5 text-warm-grey hover:text-terracotta transition-colors"
      >
        <span className="text-xs uppercase tracking-wider">Scroll</span>
        <ArrowDown className="w-4 h-4 animate-bounce" />
      </a>
    </section>
  );
}
