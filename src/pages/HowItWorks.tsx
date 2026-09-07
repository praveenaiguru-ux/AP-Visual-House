import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

const steps = [
  {
    num: '01',
    title: 'Choose a Service',
    desc: 'Browse our complete catalogue and select the visual service that fits your needs. From restorations to 3D designs, we have you covered.'
  },
  {
    num: '02',
    title: 'Tell Us What You Want',
    desc: 'Fill out a quick project request form or message us directly on WhatsApp. Share your ideas, requirements, and any reference files.'
  },
  {
    num: '03',
    title: 'We Review & Quote',
    desc: 'Our team reviews your request to understand the scope. We then provide a clear, transparent quote and an estimated delivery timeline.'
  },
  {
    num: '04',
    title: 'We Create',
    desc: 'Once approved, our creative professionals get to work. We combine artistic expertise with modern tools to craft your visual.'
  },
  {
    num: '05',
    title: 'Review & Deliver',
    desc: 'We share a preview for your feedback. We include minor revisions to ensure it is perfect before sending the high-resolution final files.'
  }
];

export default function HowItWorks() {
  return (
    <div className="pt-12 pb-32 bg-background min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        
        {/* Header */}
        <div className="mb-20 text-center">
          <p className="text-sm font-semibold tracking-widest text-[#D4AF37] uppercase mb-4">Our Process</p>
          <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tight mb-6">From Idea to Final Visual</h1>
          <p className="text-lg text-foreground/70 leading-relaxed max-w-2xl mx-auto">
            A simple, personal, and transparent concierge process designed to turn your imagination into stunning visuals without the complication.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="hidden md:block absolute left-8 top-8 bottom-8 w-px bg-foreground/10"></div>
          
          <div className="flex flex-col gap-12 md:gap-16">
            {steps.map((step, idx) => (
              <div key={idx} className="relative flex flex-col md:flex-row gap-6 md:gap-12 group">
                {/* Number Indicator */}
                <div className="relative z-10 w-16 h-16 shrink-0 bg-background border border-foreground/20 rounded-full flex items-center justify-center font-display font-bold text-xl group-hover:border-[#D4AF37] group-hover:text-[#D4AF37] transition-colors">
                  {step.num}
                </div>
                
                {/* Content */}
                <div className="flex flex-col justify-center pt-2 md:pt-4">
                  <h3 className="text-2xl font-display font-bold mb-3">{step.title}</h3>
                  <p className="text-foreground/70 text-lg leading-relaxed max-w-2xl">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-24 text-center bg-foreground/5 p-12 rounded-2xl border border-foreground/10 relative overflow-hidden">
          <Sparkles className="absolute top-4 right-4 w-12 h-12 text-[#D4AF37] opacity-20" />
          <h3 className="text-2xl font-display font-bold mb-4">Ready to start?</h3>
          <p className="text-foreground/70 mb-8 max-w-lg mx-auto">
            Bring your ideas to us, and we'll take care of the rest. Quality guaranteed.
          </p>
          <Link 
            to="/services" 
            className="inline-flex items-center px-8 py-4 bg-foreground text-background font-medium rounded hover:bg-foreground/90 transition-colors"
          >
            Start Your Project <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>

      </div>
    </div>
  );
}
