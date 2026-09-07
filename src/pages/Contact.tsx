import { siteConfig, getWhatsAppLink } from '../config';
import { Mail, MessageCircle, MapPin } from 'lucide-react';

export default function Contact() {
  return (
    <div className="pt-12 pb-32 bg-background min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-6">Contact Us</h1>
          <p className="text-lg text-foreground/70 leading-relaxed max-w-2xl mx-auto">
            Have a project in mind or a question about our services? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Methods */}
          <div className="flex flex-col gap-8">
            <h2 className="text-2xl font-display font-bold mb-2">Get in touch</h2>
            
            <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 p-6 bg-white border border-foreground/10 rounded-lg hover:border-[#25D366] hover:shadow-md transition-all group">
              <div className="w-12 h-12 bg-[#25D366]/10 text-[#25D366] rounded-full flex items-center justify-center shrink-0 group-hover:bg-[#25D366] group-hover:text-white transition-colors">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold mb-1">WhatsApp</h3>
                <p className="text-sm text-foreground/60 mb-2">Fastest response for project inquiries.</p>
                <span className="font-medium">{siteConfig.whatsappNumber}</span>
              </div>
            </a>

            <a href={`mailto:${siteConfig.email}`} className="flex items-start gap-4 p-6 bg-white border border-foreground/10 rounded-lg hover:border-foreground/30 hover:shadow-md transition-all group">
              <div className="w-12 h-12 bg-foreground/5 text-foreground rounded-full flex items-center justify-center shrink-0 group-hover:bg-foreground group-hover:text-background transition-colors">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold mb-1">Email</h3>
                <p className="text-sm text-foreground/60 mb-2">For general inquiries and partnerships.</p>
                <span className="font-medium">{siteConfig.email}</span>
              </div>
            </a>

            <div className="flex items-start gap-4 p-6 bg-white border border-foreground/10 rounded-lg">
              <div className="w-12 h-12 bg-foreground/5 text-foreground rounded-full flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold mb-1">Studio</h3>
                <p className="text-sm text-foreground/60">Digital Studio<br/>Serving clients globally.</p>
              </div>
            </div>
          </div>

          {/* Quick Form */}
          <div className="bg-foreground/5 p-8 rounded-lg border border-foreground/10">
            <h2 className="text-2xl font-display font-bold mb-6">Send a message</h2>
            <form className="flex flex-col gap-6" onSubmit={(e) => { e.preventDefault(); alert("Message sent! We'll be in touch soon."); }}>
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-medium">Name</label>
                <input type="text" id="name" required className="px-4 py-3 rounded border border-foreground/20 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] bg-white" placeholder="Your name" />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="contact" className="text-sm font-medium">Email or WhatsApp</label>
                <input type="text" id="contact" required className="px-4 py-3 rounded border border-foreground/20 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] bg-white" placeholder="How can we reach you?" />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-medium">Message</label>
                <textarea id="message" required rows={4} className="px-4 py-3 rounded border border-foreground/20 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] bg-white resize-y" placeholder="How can we help?"></textarea>
              </div>
              <button type="submit" className="mt-2 px-8 py-4 bg-foreground text-background font-bold rounded hover:bg-foreground/90 transition-colors">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
