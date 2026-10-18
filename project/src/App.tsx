import { useEffect, useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Services } from '@/components/Services';
import { Work } from '@/components/Work';
import { Process } from '@/components/Process';
import { About } from '@/components/About';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

export default function App() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-ivory text-soft-black">
      {/* Scroll progress bar */}
      <div className="fixed top-0 left-0 right-0 h-0.5 z-[60]">
        <div
          className="h-full bg-terracotta transition-all duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>

      <Navbar />
      <main>
        <Hero />
        <Services />
        <Work />
        <Process />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
