import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { ServiceFAQ as ServiceFAQType } from '../../types';

interface ServiceFAQProps {
  faqs: ServiceFAQType[];
}

export default function ServiceFAQ({ faqs }: ServiceFAQProps) {
  const [openIndices, setOpenIndices] = useState<number[]>([0]);

  const toggleIndex = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <section className="py-16 border-b border-foreground/5" aria-labelledby="service-faq-heading">
      <div className="max-w-3xl mb-12">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#D4AF37] font-bold mb-2">
          <HelpCircle className="w-4 h-4" aria-hidden="true" />
          <span>Questions & Answers</span>
        </div>
        <h2 id="service-faq-heading" className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-base sm:text-lg text-foreground/75 leading-relaxed">
          Clear, honest answers about our cartoon portrait process, turnaround times, and delivery formats.
        </p>
      </div>

      <div className="max-w-4xl space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndices.includes(index);
          const answerId = `faq-answer-${index}`;
          const buttonId = `faq-btn-${index}`;

          return (
            <div
              key={index}
              className="bg-white border border-foreground/10 rounded-xl overflow-hidden transition-colors"
            >
              <button
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={answerId}
                onClick={() => toggleIndex(index)}
                className="w-full text-left p-6 flex items-center justify-between gap-4 font-display font-bold text-base sm:text-lg text-foreground hover:text-[#D4AF37] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] cursor-pointer"
              >
                <span>{faq.question}</span>
                <span
                  className={`w-8 h-8 rounded-full bg-foreground/5 flex items-center justify-center shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 bg-[#D4AF37]/10 text-[#D4AF37]' : 'text-foreground/60'
                  }`}
                >
                  <ChevronDown className="w-4 h-4" aria-hidden="true" />
                </span>
              </button>

              {isOpen && (
                <div
                  id={answerId}
                  role="region"
                  aria-labelledby={buttonId}
                  className="px-6 pb-6 pt-1 border-t border-foreground/5 text-sm sm:text-base text-foreground/75 leading-relaxed"
                >
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
