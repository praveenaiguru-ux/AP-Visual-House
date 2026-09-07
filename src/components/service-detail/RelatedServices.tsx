import { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Service } from '../../types';
import { siteConfig } from '../../config';

interface RelatedServicesProps {
  services: Service[];
  currentSlug: string;
}

export default function RelatedServices({ services, currentSlug }: RelatedServicesProps) {
  if (services.length === 0) return null;

  const getImageStyle = (item: Service): CSSProperties => {
    const type = item.imageType || (item.categoryId === 'ai-images' ? 'portrait' : 'product');
    const fit = item.imageFit || 'cover';
    const position = item.imagePosition || (type === 'portrait' || type === 'restoration' ? 'center 20%' : 'center');

    return {
      objectFit: fit as CSSProperties['objectFit'],
      objectPosition: position
    };
  };

  return (
    <section className="py-16 border-b border-foreground/5" aria-labelledby="related-services-heading">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#D4AF37] font-bold mb-2">
            <Sparkles className="w-4 h-4" aria-hidden="true" />
            <span>Curated Recommendations</span>
          </div>
          <h2 id="related-services-heading" className="text-3xl sm:text-4xl font-display font-bold text-foreground">
            You May Also Like
          </h2>
        </div>
        <Link
          to="/services"
          className="text-xs uppercase tracking-widest font-bold text-foreground hover:text-[#D4AF37] flex items-center gap-1.5 transition-colors self-start md:self-auto"
        >
          <span>View All 36 Services</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((item) => {
          const categorySlug = item.categorySlug || 'ai-image-creation';
          const linkTarget = `/services/${categorySlug}/${item.slug}`;

          return (
            <Link
              key={item.id}
              to={linkTarget}
              className="group bg-white border border-foreground/10 rounded-xl overflow-hidden hover:border-[#D4AF37]/60 hover:shadow-xl transition-all duration-300 flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
            >
              <div className="relative aspect-[16/10] sm:aspect-[16/11] overflow-hidden bg-foreground/5">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  style={getImageStyle(item)}
                  className="w-full h-full group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute top-3 left-3 bg-foreground/80 backdrop-blur-md text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded">
                  {item.category}
                </div>
              </div>

              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="text-xl font-display font-bold text-foreground mb-2 group-hover:text-[#D4AF37] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-foreground/65 line-clamp-2 leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-foreground/5 flex items-center justify-between mt-auto">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-foreground/50 font-semibold block">
                      Starting from
                    </span>
                    <span className="text-base font-bold text-foreground">
                      {siteConfig.currency}{item.price}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-xs font-semibold text-foreground group-hover:text-[#D4AF37] group-hover:translate-x-1 transition-all">
                    <span>Explore</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
