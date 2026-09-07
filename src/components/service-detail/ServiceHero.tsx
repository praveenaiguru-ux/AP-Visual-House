import { ArrowRight, MessageCircle, Sparkles } from 'lucide-react';
import { ServiceDetailData } from '../../types';
import { getWhatsAppLink } from '../../config';

interface ServiceHeroProps {
  detail: ServiceDetailData;
  onStartProject: () => void;
}

export default function ServiceHero({ detail, onStartProject }: ServiceHeroProps) {
  const whatsappMsg = `Hi AP Visual House, I'm interested in the ${detail.name} service (Starting from ${detail.currency}${detail.startingPrice}). Can we discuss my project?`;

  return (
    <section className="pt-4 pb-14 border-b border-foreground/5" aria-labelledby="service-title">
      <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
        {/* Content Column */}
        <div className="w-full lg:w-7/12 flex flex-col items-start">
          {/* Category Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-foreground/5 text-foreground/80 text-[11px] font-bold tracking-widest uppercase mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
            <span>{detail.categorySlug === 'ai-image-creation' ? 'AI IMAGE CREATION' : detail.category}</span>
          </div>

          {/* H1 Heading */}
          <h1
            id="service-title"
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-foreground tracking-tight leading-[1.1] mb-6"
          >
            {detail.name}
          </h1>

          {/* Description */}
          <p className="text-lg sm:text-xl text-foreground/75 leading-relaxed mb-8 max-w-2xl font-sans font-normal">
            {detail.shortDescription}
          </p>

          {/* Understated Price & Turnaround Summary */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-foreground/80 mb-8 py-3 px-4 rounded-lg bg-foreground/[0.03] border border-foreground/5">
            <div>
              <span className="text-foreground/50 text-xs uppercase tracking-wider font-semibold mr-2">Starting from</span>
              <span className="text-base font-bold text-foreground">{detail.currency}{detail.startingPrice}</span>
            </div>
            <span className="hidden sm:inline text-foreground/20">•</span>
            <div>
              <span className="text-foreground/50 text-xs uppercase tracking-wider font-semibold mr-2">Typical Delivery</span>
              <span className="font-semibold text-foreground">{detail.deliveryTime}</span>
            </div>
            <span className="hidden sm:inline text-foreground/20">•</span>
            <div className="text-xs text-foreground/70 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Personalized Concierge Art</span>
            </div>
          </div>

          {/* Primary & Secondary CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
            <button
              onClick={onStartProject}
              className="px-8 py-4 bg-foreground text-background font-bold text-xs uppercase tracking-widest rounded hover:bg-[#D4AF37] hover:text-foreground transition-all duration-300 shadow-sm flex items-center justify-center gap-2 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
            >
              <span>Start This Project</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href={getWhatsAppLink(whatsappMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-4 bg-transparent border border-foreground/20 text-foreground font-bold text-xs uppercase tracking-widest rounded hover:border-[#25D366] hover:text-[#25D366] transition-colors flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>

        {/* Hero Image Column */}
        <div className="w-full lg:w-5/12">
          <div className="relative rounded-2xl overflow-hidden border border-foreground/10 bg-foreground/5 shadow-xl group">
            <div className="aspect-[4/5] sm:aspect-square w-full overflow-hidden">
              <img
                src={detail.heroImage}
                alt={`${detail.name} example showcase by AP Visual House`}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="eager"
              />
            </div>
            {/* Image overlay badge */}
            <div className="absolute bottom-4 left-4 right-4 bg-foreground/90 backdrop-blur-md text-background p-3.5 rounded-lg border border-white/10 flex items-center justify-between text-xs">
              <div>
                <p className="font-semibold text-white tracking-wide">Custom Cartoon Stylization</p>
                <p className="text-white/60 text-[11px]">Individually crafted from personal photos</p>
              </div>
              <span className="px-2.5 py-1 bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30 text-[10px] font-bold rounded uppercase tracking-wider">
                Original Art
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
