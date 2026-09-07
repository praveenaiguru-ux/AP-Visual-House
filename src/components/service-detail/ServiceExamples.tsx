import { ServiceExample } from '../../types';
import { Eye } from 'lucide-react';

interface ServiceExamplesProps {
  examples: ServiceExample[];
}

export default function ServiceExamples({ examples }: ServiceExamplesProps) {
  return (
    <section className="py-16 border-b border-foreground/5" aria-labelledby="examples-heading">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div className="max-w-2xl">
          <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold block mb-2">
            Visual Portfolio Showcase
          </span>
          <h2 id="examples-heading" className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-3">
            See What We Can Create
          </h2>
          <p className="text-base text-foreground/75 leading-relaxed">
            Explore stylistic directions possible with our cartoon portrait service. Each portrait is adapted to match your requested aesthetic and reference photo.
          </p>
        </div>

        {/* Ethical Controlled Disclaimer */}
        <div className="text-xs text-foreground/50 max-w-xs bg-foreground/[0.03] p-3 rounded border border-foreground/5 self-start md:self-auto">
          Controlled aesthetic examples demonstrating style possibilities. All client work is produced from submitted original photos.
        </div>
      </div>

      {/* Grid of Examples */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {examples.map((example, index) => (
          <div
            key={index}
            className="group bg-white border border-foreground/10 rounded-xl overflow-hidden shadow-sm hover:border-[#D4AF37]/50 hover:shadow-xl transition-all duration-300 flex flex-col"
          >
            {/* Image Container */}
            <div className="relative aspect-square overflow-hidden bg-foreground/5">
              <img
                src={example.image}
                alt={example.alt}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-xs text-white flex items-center gap-1.5 font-medium">
                  <Eye className="w-3.5 h-3.5 text-[#D4AF37]" aria-hidden="true" />
                  Stylistic Preview
                </span>
              </div>
            </div>

            {/* Caption */}
            <div className="p-5 flex flex-col flex-1">
              <h3 className="text-base font-display font-bold text-foreground mb-1 group-hover:text-[#D4AF37] transition-colors">
                {example.title}
              </h3>
              {example.description && (
                <p className="text-xs text-foreground/65 leading-relaxed line-clamp-2">
                  {example.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
