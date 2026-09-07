import { Link } from 'react-router-dom';
import { categories, services } from '../data/services';
import { siteConfig } from '../config';

export default function Services() {
  return (
    <div className="pt-12 pb-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-6">Complete Service Catalogue</h1>
          <p className="text-lg text-foreground/70 leading-relaxed">
            From quick image enhancements to full 3D visualisations and video ads, explore our entire range of creative services. 
            All services are manually fulfilled by our professional team.
          </p>
        </div>

        {/* Categories & Services */}
        <div className="flex flex-col gap-24">
          {categories.map((category) => {
            const categoryServices = services.filter(s => s.categoryId === category.id);
            
            if (categoryServices.length === 0) return null;

            return (
              <div key={category.id} id={category.id} className="scroll-mt-24">
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="text-3xl font-display font-bold">{category.title}</h2>
                  <div className="h-px flex-1 bg-foreground/10"></div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryServices.map((service) => (
                    <Link 
                      key={service.id} 
                      to={`/services/${service.categorySlug || 'ai-image-creation'}/${service.slug}`}
                      className="group flex flex-col bg-white border border-foreground/10 rounded-lg overflow-hidden hover:border-[#D4AF37]/50 hover:shadow-xl transition-all duration-300"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden bg-foreground/5">
                        <img 
                          src={service.image} 
                          alt={service.title} 
                          loading="lazy"
                          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" 
                        />
                      </div>
                      <div className="p-6 flex flex-col flex-1">
                        <h3 className="text-xl font-display font-bold mb-2 group-hover:text-[#D4AF37] transition-colors">{service.title}</h3>
                        <p className="text-sm text-foreground/60 mb-6 flex-1 line-clamp-2">{service.description}</p>
                        
                        <div className="flex items-end justify-between mt-auto">
                          <div>
                            <p className="text-[11px] uppercase tracking-wider text-foreground/50 font-semibold mb-1">Starting from</p>
                            <p className="text-lg font-bold">{siteConfig.currency}{service.price}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-[11px] uppercase tracking-wider text-foreground/50 font-semibold mb-1">Delivery</p>
                            <p className="text-sm font-medium">{service.deliveryTime}</p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
