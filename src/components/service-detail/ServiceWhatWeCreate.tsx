import { Sparkles, Palette, Gift, User, Users } from 'lucide-react';
import { ServiceDetailData } from '../../types';

interface ServiceWhatWeCreateProps {
  detail: ServiceDetailData;
}

export default function ServiceWhatWeCreate({ detail }: ServiceWhatWeCreateProps) {
  // Icons mapped to example categories
  const icons = [Sparkles, Palette, Gift, User, Users];

  return (
    <section className="py-16 border-b border-foreground/5" aria-labelledby="what-we-create-heading">
      <div className="max-w-3xl mb-12">
        <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold block mb-2">
          Scope & Styles
        </span>
        <h2 id="what-we-create-heading" className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
          What We Create
        </h2>
        <p className="text-base sm:text-lg text-foreground/75 leading-relaxed">
          At AP Visual House, we transform your supplied photographs into creative, personality-rich cartoon-style portraits. 
          Every piece is carefully rendered to honor the unique energy, expressions, and style preferences of the subject.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {detail.whatWeCreate.map((item, index) => {
          const IconComponent = icons[index % icons.length];
          return (
            <div
              key={index}
              className="bg-white border border-foreground/10 rounded-xl p-6 hover:border-[#D4AF37]/50 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-foreground/5 text-foreground flex items-center justify-center mb-4">
                  <IconComponent className="w-5 h-5 text-[#D4AF37]" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-display font-bold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-foreground/70 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
