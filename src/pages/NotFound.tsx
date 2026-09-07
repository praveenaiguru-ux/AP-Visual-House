import { Link } from 'react-router-dom';
import { ArrowLeft, Compass, Sparkles } from 'lucide-react';
import { useEffect } from 'react';
import { siteConfig } from '../config';

export default function NotFound() {
  useEffect(() => {
    document.title = `Page Not Found (404) | ${siteConfig.name}`;
  }, []);

  return (
    <div className="bg-background text-foreground min-h-[75vh] flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto text-center">
        {/* Subtle decorative badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-foreground/5 border border-foreground/10 text-xs font-semibold uppercase tracking-widest text-[#D4AF37] mb-6 select-none">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Error 404</span>
        </div>

        <h1 className="text-6xl sm:text-7xl font-display font-bold text-foreground tracking-tight mb-4">
          Visual Not Found
        </h1>

        <p className="text-base sm:text-lg text-foreground/70 leading-relaxed max-w-md mx-auto mb-10">
          The page or visual service you are looking for doesn't exist, has been moved, or is temporarily unavailable.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-foreground text-background font-bold text-xs uppercase tracking-widest rounded hover:bg-[#D4AF37] hover:text-foreground transition-all duration-300 shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return Home</span>
          </Link>
          <Link
            to="/services"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-transparent border border-foreground/30 text-foreground font-bold text-xs uppercase tracking-widest rounded hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-300"
          >
            <Compass className="w-4 h-4" />
            <span>Explore Services</span>
          </Link>
        </div>

        {/* Reassuring concierge note */}
        <div className="mt-14 pt-8 border-t border-foreground/10 text-xs text-foreground/50">
          Looking for a custom visual commission?{' '}
          <Link to="/contact" className="text-[#D4AF37] hover:underline font-medium">
            Contact our creative concierge
          </Link>
        </div>
      </div>
    </div>
  );
}
