import { useState } from 'react';
import { Link } from 'react-router-dom';
import { categories, services } from '../data/services';
import { Sparkles } from 'lucide-react';

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState<string>('All');

  // We'll use the service images as our gallery for the MVP
  const galleryItems = services.map(s => ({
    id: s.id,
    image: s.image,
    category: s.category,
    title: s.title,
    slug: s.slug,
    categorySlug: s.categorySlug || 'ai-image-creation'
  }));

  const filters = ['All', ...categories.map(c => c.shortTitle)];

  const filteredItems = activeFilter === 'All' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeFilter);

  return (
    <div className="pt-12 pb-24 bg-background min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-6 flex items-center gap-4">
            Made for You <Sparkles className="w-8 h-8 text-[#D4AF37]" />
          </h1>
          <p className="text-lg text-foreground/70 leading-relaxed">
            A glimpse of what we can create. Filter by category to see specific styles and previous works.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-12">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === filter 
                  ? 'bg-foreground text-background shadow-md' 
                  : 'bg-foreground/5 text-foreground/70 hover:bg-foreground/10 hover:text-foreground'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <Link 
              key={item.id} 
              to={`/services/${item.categorySlug}/${item.slug}`}
              className="group relative aspect-[4/5] bg-foreground/5 rounded-lg overflow-hidden block"
            >
              <img 
                src={item.image} 
                alt={item.title} 
                loading="lazy"
                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700 ease-in-out" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] mb-2">{item.category}</span>
                <h3 className="text-white font-display text-lg font-medium leading-tight">{item.title}</h3>
                <span className="text-xs text-white/70 mt-1 flex items-center gap-1 group-hover:text-[#D4AF37] transition-colors">
                  View Service Details &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
