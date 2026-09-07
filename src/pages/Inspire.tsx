import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const articles = [
  {
    id: 1,
    title: '30 Modern Wedding Invitation Ideas',
    category: 'Invitations',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=800',
    link: '/services/wedding-invitation'
  },
  {
    id: 2,
    title: 'Old Photo Restoration: Before & After',
    category: 'Restoration',
    image: 'https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&q=80&w=800',
    link: '/services/old-photo-restoration'
  },
  {
    id: 3,
    title: 'Modern House Elevation Ideas',
    category: '3D Visualization',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
    link: '/services/building-plan-to-front-elevation'
  },
  {
    id: 4,
    title: 'Creative Couple Portrait Ideas',
    category: 'AI Images',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=800',
    link: '/services/couple-portrait'
  },
  {
    id: 5,
    title: 'Product Advertisement Trends',
    category: 'Product Creatives',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800',
    link: '/services/product-advertisement'
  },
  {
    id: 6,
    title: '3D Floor Plan Inspiration',
    category: '3D Visualization',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800',
    link: '/services/2d-floor-plan-to-3d'
  }
];

export default function Inspire() {
  return (
    <div className="pt-12 pb-24 bg-background min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16 text-center mx-auto">
          <p className="text-sm font-semibold tracking-widest text-[#D4AF37] uppercase mb-4">Ideas & Trends</p>
          <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-6">Get Inspired</h1>
          <p className="text-lg text-foreground/70 leading-relaxed max-w-2xl mx-auto">
            Explore ideas, visual trends and examples before you create your own.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <div key={article.id} className="flex flex-col group">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-6 bg-foreground/5">
                <img 
                  src={article.image} 
                  alt={article.title} 
                  loading="lazy"
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ease-in-out"
                />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-foreground/50 mb-2">{article.category}</span>
              <h3 className="text-2xl font-display font-bold leading-snug mb-4 group-hover:text-[#D4AF37] transition-colors">
                {article.title}
              </h3>
              <div className="mt-auto">
                <Link to={article.link} className="inline-flex items-center text-sm font-bold border-b-2 border-foreground/20 pb-1 hover:border-foreground transition-colors">
                  Explore Service <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
