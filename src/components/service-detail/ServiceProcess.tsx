import { Sparkles } from 'lucide-react';

export default function ServiceProcess() {
  const steps = [
    {
      number: '01',
      title: 'Choose Your Style',
      description: 'Select your preferred cartoon aesthetic, background concept, and format preferences.'
    },
    {
      number: '02',
      title: 'Upload Your Photo',
      description: 'Provide a clear, well-lit photograph of the person or subjects to be illustrated.'
    },
    {
      number: '03',
      title: 'We Create Your Portrait',
      description: 'Our digital visual artists craft and render your portrait with attention to personality and detail.'
    },
    {
      number: '04',
      title: 'You Review It',
      description: 'Review the high-resolution draft and request a minor adjustment if desired.'
    },
    {
      number: '05',
      title: 'We Deliver the Final',
      description: 'Receive your print-ready JPG and PNG files directly via WhatsApp or digital download.'
    }
  ];

  return (
    <section className="py-16 border-b border-foreground/5" aria-labelledby="how-it-works-heading">
      <div className="max-w-3xl mb-12">
        <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold block mb-2">
          Effortless Concierge Experience
        </span>
        <h2 id="how-it-works-heading" className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
          How It Works
        </h2>
        <p className="text-base sm:text-lg text-foreground/75 leading-relaxed">
          Creative work without the complication. A streamlined five-step journey from your photo to finished digital artwork.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-white border border-foreground/10 rounded-xl p-6 relative flex flex-col justify-between hover:border-[#D4AF37]/50 hover:shadow-md transition-all duration-300 group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl sm:text-3xl font-display font-bold text-[#D4AF37]">
                  {step.number}
                </span>
                {index === 2 && (
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" aria-hidden="true" />
                )}
              </div>
              <h3 className="text-base font-display font-bold text-foreground mb-2 group-hover:text-[#D4AF37] transition-colors">
                {step.title}
              </h3>
              <p className="text-xs text-foreground/70 leading-relaxed">
                {step.description}
              </p>
            </div>
            
            <div className="mt-6 pt-3 border-t border-foreground/5 text-[10px] text-foreground/40 uppercase tracking-wider font-semibold">
              Step {index + 1} of 5
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
