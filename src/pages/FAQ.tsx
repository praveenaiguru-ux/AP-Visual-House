import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const faqs = [
  {
    q: 'How do I place an order?',
    a: 'Simply browse our services, choose the one you need, and click "Start This Project". You can fill out a quick form or message us directly on WhatsApp with your requirements. We\'ll respond with a quote.'
  },
  {
    q: 'Do I need to create an account?',
    a: 'No, you do not need to create an account. We operate as a personalized concierge service. All communication and file sharing happens directly via WhatsApp or Email to keep things simple for you.'
  },
  {
    q: 'How do I send my photos or files?',
    a: 'You can upload up to 5 reference files (up to 10 MB per file, 25 MB total) directly in our project request form. For larger video files or extensive architectural drawing sets, you can simply share a Google Drive or WhatsApp link once we connect.'
  },
  {
    q: 'How long does a project take?',
    a: 'Delivery times vary based on the complexity of the service. Simple enhancements take 24 hours, while complex 3D visualizations or video ads might take 2-5 days. Estimated delivery times are listed on every service page.'
  },
  {
    q: 'Can I request revisions?',
    a: 'Yes, we want you to be completely satisfied. Every service includes one minor revision after the initial preview is shared.'
  },
  {
    q: 'How do I make payment?',
    a: 'After we review your requirements and agree on the quote, we will share payment details (such as UPI for Indian customers or bank transfer/agreed methods). You pay manually and send us a confirmation.'
  },
  {
    q: 'Do you accept international projects?',
    a: 'Absolutely. While our primary pricing may be listed in INR, we work with clients globally across the USA, UK, UAE, Canada, and Australia.'
  },
  {
    q: 'What is your Privacy and Content Policy?',
    a: 'Your privacy is paramount. All uploaded reference photos and project files are kept strictly confidential and used solely for fulfilling your requested visual service. We never sell or distribute your private images. Furthermore, we maintain a strict zero-tolerance content policy: we do not accept or produce adult/NSFW content, hate speech, abusive, fraudulent, or illegal material.'
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="pt-12 pb-32 bg-background min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        
        {/* Header */}
        <div className="mb-16 text-center">
          <p className="text-sm font-semibold tracking-widest text-[#D4AF37] uppercase mb-4">Support</p>
          <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-6">Frequently Asked Questions</h1>
          <p className="text-lg text-foreground/70 leading-relaxed">
            Everything you need to know about our services, process, and billing.
          </p>
        </div>

        {/* Accordion */}
        <div className="flex flex-col gap-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx} 
                className={`border rounded-lg transition-colors ${isOpen ? 'border-[#D4AF37]/50 bg-white shadow-sm' : 'border-foreground/10 bg-transparent hover:bg-foreground/5'}`}
              >
                <button
                  className="w-full flex items-center justify-between p-6 text-left"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                >
                  <span className="font-display font-bold text-lg pr-8">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-foreground/50 transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180 text-[#D4AF37]' : ''}`} />
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <p className="p-6 pt-0 text-foreground/70 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <p className="text-foreground/70 mb-4">Still have questions?</p>
          <Link to="/contact" className="text-[#D4AF37] font-semibold hover:underline">Contact our support team</Link>
        </div>

      </div>
    </div>
  );
}
