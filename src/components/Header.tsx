import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { siteConfig, getWhatsAppLink } from '../config';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Services', href: '/services' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Inspire', href: '/inspire' },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'FAQ', href: '/faq' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-foreground/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center group">
          <img 
            src="/logo-horizontal.png" 
            alt="AP Visual House" 
            className="h-12 w-auto"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.href}
              className="text-[12px] font-medium uppercase tracking-wider text-foreground hover:text-[#D4AF37] transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* CTAs */}
        <div className="hidden md:flex items-center gap-6">
          <a 
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[12px] font-medium uppercase tracking-wider text-foreground hover:text-[#D4AF37] transition-colors"
          >
            WhatsApp Us
          </a>
          <div className="h-4 w-[1px] bg-foreground/20"></div>
          <Link 
            to="/services" 
            className="px-5 py-2.5 bg-foreground text-background text-[12px] font-bold uppercase tracking-widest rounded-sm hover:bg-[#D4AF37] transition-all flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-[#D4AF37]"></span>
            Start a Project
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D4AF37] rounded"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-background border-b border-foreground/5 py-4 px-4 flex flex-col gap-4 shadow-lg">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.href}
              className="text-xs font-bold uppercase tracking-widest text-foreground hover:text-[#D4AF37]"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="h-px bg-foreground/10 my-2"></div>
          <a 
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold uppercase tracking-widest text-foreground hover:text-[#D4AF37]"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            WhatsApp Us
          </a>
          <Link 
            to="/services" 
            className="w-full py-3 bg-foreground text-background text-xs font-bold uppercase tracking-widest text-center rounded-sm mt-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Start a Project
          </Link>
        </div>
      )}
    </header>
  );
}
