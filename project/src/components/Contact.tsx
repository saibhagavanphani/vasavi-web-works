import { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2, Phone, Mail } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useReveal } from '@/hooks/useReveal';

const SERVICES = [
  'Web Development',
  'UI/UX Design',
  'E-Commerce',
  'SEO Optimization',
  'Responsive Design',
  'Performance Tuning',
  'Other / Not Sure',
];

const BUDGETS = ['Under ₹25,000', '₹25,000 – ₹50,000', '₹50,000 – ₹1,00,000', '₹1,00,000+'];

type Status = 'idle' | 'loading' | 'success' | 'error';

export function Contact() {
  const { ref, visible } = useReveal();
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const [form, setForm] = useState({
    name: '', email: '', phone: '', company: '', service: '', budget: '', message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: form,
      });
      if (error) throw error;
      setStatus('success');
      setForm({ name: '', email: '', phone: '', company: '', service: '', budget: '', message: '' });
    } catch (error) {
      console.error('Contact submission failed', error);
      setStatus('error');
      setErrorMsg('We could not send your message right now. Please try again or email us directly.');
    }
  };

  return (
    <section id="contact" className="relative py-20 lg:py-28 bg-soft-black overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left — info */}
          <div
            ref={ref}
            className={`lg:col-span-5 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          >
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-sm font-medium text-terracotta">Contact</span>
              <span className="h-px flex-1 bg-warm-grey/30 max-w-[60px]" />
            </div>
            <h2
              className="font-display font-bold tracking-tight leading-[1.1] text-balance text-ivory mb-5"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
            >
              Let's build{' '}
              <span className="font-editorial text-terracotta">something good</span>
            </h2>
            <p className="text-base text-warm-grey leading-relaxed mb-8">
              Tell us about your project and we'll get back to you within 24 hours.
              No pressure, no jargon — just a conversation about what you need.
            </p>

            {/* Contact details */}
            <div className="space-y-3">
              <ContactDetail icon={Phone} label="Phone" value="+91 89193 98115" href="tel:+918919398115" />
              <ContactDetail icon={Mail} label="Padmaja (CEO)" value="padmajakuncham48@gmail.com" href="mailto:padmajakuncham48@gmail.com" />
              <ContactDetail icon={Mail} label="Bhagavan" value="saibhagavanphani108@gmail.com" href="mailto:saibhagavanphani108@gmail.com" />
              <ContactDetail icon={Mail} label="Sharanya" value="sharanyaparepalli73@gmail.com" href="mailto:sharanyaparepalli73@gmail.com" />
            </div>
          </div>

          {/* Right — form */}
          <div className={`lg:col-span-7 transition-all duration-700 delay-150 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <div className="p-6 lg:p-8 rounded-lg border border-warm-grey/20 bg-warm-ink/40">
              {status === 'success' ? (
                <div className="flex flex-col items-center justify-center text-center py-16">
                  <CheckCircle2 className="w-10 h-10 text-terracotta mb-4" />
                  <h3 className="font-display text-xl font-semibold text-ivory mb-2">Message sent</h3>
                  <p className="text-warm-grey text-sm max-w-xs mb-5">
                    Thanks for reaching out. We'll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="text-sm font-medium text-terracotta hover:text-terracotta-light transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Full Name" name="name" value={form.name} onChange={handleChange} required />
                    <Field label="Email" name="email" type="email" value={form.email} onChange={handleChange} required />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Phone" name="phone" type="tel" value={form.phone} onChange={handleChange} />
                    <Field label="Company" name="company" value={form.company} onChange={handleChange} />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <SelectField label="Service Needed" name="service" value={form.service} onChange={handleChange} options={SERVICES} placeholder="Select a service" />
                    <SelectField label="Budget Range" name="budget" value={form.budget} onChange={handleChange} options={BUDGETS} placeholder="Select budget" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-ivory/80 mb-1.5">
                      Project Details <span className="text-terracotta">*</span>
                    </label>
                    <textarea
                      name="message" value={form.message} onChange={handleChange} required rows={4}
                      placeholder="Tell us about your project, goals, and timeline..."
                      className="w-full px-4 py-3 rounded-md bg-ivory/[0.04] border border-warm-grey/20 text-ivory placeholder:text-warm-grey/50 text-sm focus:outline-none focus:border-terracotta transition-colors resize-none"
                    />
                  </div>

                  {status === 'error' && (
                    <div className="flex items-start gap-3 p-3.5 rounded-md bg-red-900/20 border border-red-700/30">
                      <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-red-300">{errorMsg}</p>
                    </div>
                  )}

                  <button
                    type="submit" disabled={status === 'loading'}
                    className="group w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-medium text-ivory bg-terracotta rounded-md hover:bg-terracotta-light transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === 'loading' ? (
                      <><Loader2 className="w-4 h-4 animate-spin" />Sending...</>
                    ) : (
                      <>Send Message<Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" /></>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label, name, value, onChange, type = 'text', required,
}: {
  label: string; name: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string; required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-ivory/80 mb-1.5">
        {label} {required && <span className="text-terracotta">*</span>}
      </label>
      <input
        type={type} name={name} value={value} onChange={onChange} required={required}
        className="w-full px-4 py-3 rounded-md bg-ivory/[0.04] border border-warm-grey/20 text-ivory placeholder:text-warm-grey/50 text-sm focus:outline-none focus:border-terracotta transition-colors"
      />
    </div>
  );
}

function SelectField({
  label, name, value, onChange, options, placeholder,
}: {
  label: string; name: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[]; placeholder: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-ivory/80 mb-1.5">{label}</label>
      <select
        name={name} value={value} onChange={onChange}
        className="w-full px-4 py-3 rounded-md bg-ivory/[0.04] border border-warm-grey/20 text-ivory text-sm focus:outline-none focus:border-terracotta transition-colors appearance-none cursor-pointer"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2388867D' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")",
          backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center',
        }}
      >
        <option value="" className="bg-soft-black">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt} value={opt} className="bg-soft-black">{opt}</option>
        ))}
      </select>
    </div>
  );
}

function ContactDetail({
  icon: Icon, label, value, href,
}: {
  icon: typeof Phone; label: string; value: string; href: string;
}) {
  return (
    <a
      href={href}
      className="group flex items-center gap-3 py-2.5 border-b border-warm-grey/15 hover:border-terracotta/40 transition-colors"
    >
      <Icon className="w-4 h-4 text-terracotta flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <span className="block text-xs text-warm-grey uppercase tracking-wider">{label}</span>
        <span className="text-sm text-ivory/80 group-hover:text-ivory transition-colors truncate block">{value}</span>
      </div>
    </a>
  );
}
