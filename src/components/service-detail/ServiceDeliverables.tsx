import { Check, Upload, Info } from 'lucide-react';
import { ServiceDetailData } from '../../types';

interface ServiceDeliverablesProps {
  detail: ServiceDetailData;
}

export default function ServiceDeliverables({ detail }: ServiceDeliverablesProps) {
  return (
    <section className="py-16 border-b border-foreground/5" aria-label="Project Deliverables and Requirements">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
        {/* Left: What You Provide */}
        <div className="bg-foreground/[0.02] border border-foreground/10 rounded-xl p-8 sm:p-10 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-lg bg-foreground/5 flex items-center justify-center text-[#D4AF37]">
                <Upload className="w-5 h-5" aria-hidden="true" />
              </div>
              <h2 className="text-2xl font-display font-bold text-foreground">
                What You Provide
              </h2>
            </div>

            <p className="text-sm text-foreground/70 mb-6 leading-relaxed">
              Getting started is straightforward. To craft your custom portrait, simply share the essentials:
            </p>

            <ul className="space-y-4 mb-8">
              {detail.whatCustomerProvides.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-sm text-foreground/85">
                  <span className="w-2 h-2 rounded-full bg-[#D4AF37] mt-2 shrink-0"></span>
                  <div>
                    <span className="font-semibold text-foreground">{item.title}: </span>
                    <span className="text-foreground/75">{item.description}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Photographic clarity note */}
          <div className="p-4 rounded-lg bg-white border border-[#D4AF37]/30 flex items-start gap-3">
            <Info className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" aria-hidden="true" />
            <p className="text-xs text-foreground/80 leading-relaxed font-medium">
              Note: Clear, well-lit photos generally produce the best results.
            </p>
          </div>
        </div>

        {/* Right: What You Receive */}
        <div className="bg-white border border-foreground/10 rounded-xl p-8 sm:p-10 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-lg bg-[#25D366]/10 flex items-center justify-center text-[#25D366]">
                <Check className="w-5 h-5" aria-hidden="true" />
              </div>
              <h2 className="text-2xl font-display font-bold text-foreground">
                What You Receive
              </h2>
            </div>

            <p className="text-sm text-foreground/70 mb-6 leading-relaxed">
              Every portrait is delivered with professional production care and ready for both print and screen:
            </p>

            <ul className="space-y-4 mb-8">
              {detail.whatCustomerReceives.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-sm text-foreground/85">
                  <div className="w-5 h-5 rounded-full bg-[#25D366]/10 flex items-center justify-center text-[#25D366] shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="font-semibold text-foreground">{item.title}: </span>
                    <span className="text-foreground/75">{item.description}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Revision policy note */}
          <div className="p-4 rounded-lg bg-foreground/5 border border-foreground/10 flex items-start gap-3">
            <Info className="w-4 h-4 text-foreground/60 shrink-0 mt-0.5" aria-hidden="true" />
            <p className="text-xs text-foreground/70 leading-relaxed">
              Standard orders include one minor revision to ensure your satisfaction. Substantial concept changes or new source photos require a new commission.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
