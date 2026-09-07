import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { siteConfig } from '../config';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background pt-20 pb-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Brand */}
          <div className="flex flex-col">
            <Link to="/" className="inline-block group mb-6">
              <img 
                src="/logo-reversed.png" 
                alt="AP Visual House" 
                className="h-14 w-auto"
              />
            </Link>
            <p className="text-background/70 text-sm max-w-xs font-light">
              {siteConfig.description}
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-sans font-bold text-xs uppercase tracking-widest mb-6">Services</h4>
            <ul className="flex flex-col gap-3">
              {[
                { name: 'AI Image Creation', path: '/services#ai-images' },
                { name: 'Photo Restoration', path: '/services#restoration' },
                { name: '3D Visualization', path: '/services#3d-visualization' },
                { name: 'Invitations & Events', path: '/services#invitations' },
                { name: 'Product Creatives', path: '/services#product-creatives' },
                { name: 'Video Ads', path: '/services#video-ads' }
              ].map(item => (
                <li key={item.name}>
                  <Link to={item.path} className="text-background/70 hover:text-[#D4AF37] text-[13px] font-medium transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-white font-sans font-bold text-xs uppercase tracking-widest mb-6">Explore</h4>
            <ul className="flex flex-col gap-3">
              {[
                { name: 'Gallery', path: '/gallery' },
                { name: 'Inspire', path: '/inspire' },
                { name: 'How It Works', path: '/how-it-works' },
                { name: 'FAQ', path: '/faq' },
              ].map(item => (
                <li key={item.name}>
                  <Link to={item.path} className="text-background/70 hover:text-[#D4AF37] text-[13px] font-medium transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-sans font-bold text-xs uppercase tracking-widest mb-6">Company</h4>
            <ul className="flex flex-col gap-3">
              {[
                { name: 'How It Works', path: '/how-it-works' },
                { name: 'Contact', path: '/contact' },
                { name: 'Privacy & Content Policy', path: '/faq' },
              ].map(item => (
                <li key={item.name}>
                  <Link to={item.path} className="text-background/70 hover:text-[#D4AF37] text-[13px] font-medium transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-background/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-background/50 text-[11px] font-bold uppercase tracking-wider">
            © {currentYear} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-background/50 hover:text-[#D4AF37] text-[11px] font-bold uppercase tracking-wider transition-colors">Instagram</a>
            <a href="#" className="text-background/50 hover:text-[#D4AF37] text-[11px] font-bold uppercase tracking-wider transition-colors">Behance</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
