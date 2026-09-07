import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { getWhatsAppLink } from '../config';
import { MessageCircle } from 'lucide-react';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col font-sans text-foreground bg-background overflow-x-hidden">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      
      {/* Floating WhatsApp Button */}
      <a 
        href={getWhatsAppLink()} 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 bg-[#25D366] text-white p-3.5 sm:p-4 rounded-full shadow-lg hover:-translate-y-1 transition-transform duration-300 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#25D366]"
        aria-label="Contact on WhatsApp"
      >
        <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
      </a>
    </div>
  );
}
