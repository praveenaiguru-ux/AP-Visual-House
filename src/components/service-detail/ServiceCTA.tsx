import { ArrowRight, MessageCircle } from 'lucide-react';
import { getWhatsAppLink } from '../../config';

interface ServiceCTAProps {
  serviceName: string;
  startingPrice: number;
  currency: string;
  onStartProject: () => void;
}

export default function ServiceCTA({
  serviceName,
  startingPrice,
  currency,
  onStartProject
}: ServiceCTAProps) {
  const whatsappMsg = `Hi AP Visual House, I'd like to start a project for ${serviceName} (Starting from ${currency}${startingPrice}). Here is my inquiry:`;

  return (
    <section className="py-20 bg-foreground text-background rounded-2xl my-16 px-6 sm:px-12 text-center relative overflow-hidden" aria-labelledby="cta-heading">
      {/* Decorative subtle ambient accents */}
      <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-[#D4AF37]/10 blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -right-24 w-64 h-64 rounded-full bg-[#D4AF37]/10 blur-3xl pointer-events-none"></div>

      <div className="max-w-2xl mx-auto relative z-10">
        <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold block mb-3">
          Concierge Visual Production
        </span>
        <h2 id="cta-heading" className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white mb-6">
          Ready to Make It Visual?
        </h2>
        <p className="text-base sm:text-lg text-white/75 leading-relaxed mb-10">
          Send us your photo and tell us the style you're imagining. We'll take it from there.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onStartProject}
            className="w-full sm:w-auto px-8 py-4 bg-[#D4AF37] text-foreground font-bold text-xs uppercase tracking-widest rounded hover:bg-white transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <span>Start This Project</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href={getWhatsAppLink(whatsappMsg)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/20 text-white font-bold text-xs uppercase tracking-widest rounded hover:border-[#25D366] hover:text-[#25D366] transition-colors flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]"
          >
            <MessageCircle className="w-4 h-4 text-[#25D366]" />
            <span>WhatsApp Us</span>
          </a>
        </div>

        <p className="text-xs text-white/40 mt-8">
          Delivered in 24 hours • 1 minor revision included • Starting from {currency}{startingPrice}
        </p>
      </div>
    </section>
  );
}
