import { IndianRupee, Clock, RefreshCw, FileImage } from 'lucide-react';
import { ServiceDetailData } from '../../types';

interface ServicePricingCardProps {
  detail: ServiceDetailData;
}

export default function ServicePricingCard({ detail }: ServicePricingCardProps) {
  const items = [
    {
      label: 'STARTING FROM',
      value: `${detail.currency}${detail.startingPrice}`,
      subtext: 'Transparent starting base',
      icon: IndianRupee
    },
    {
      label: 'DELIVERY',
      value: detail.deliveryTime.toUpperCase(),
      subtext: 'Typical turnaround',
      icon: Clock
    },
    {
      label: 'REVISION',
      value: detail.revisionPolicy.toUpperCase(),
      subtext: 'Style & color adjustments',
      icon: RefreshCw
    },
    {
      label: 'FORMAT',
      value: detail.formats.join(' / '),
      subtext: 'High-res master exports',
      icon: FileImage
    }
  ];

  return (
    <div className="bg-white border border-foreground/10 rounded-xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
      {/* Decorative top gold hairline */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#D4AF37]"></div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-foreground/5 gap-2">
        <div>
          <span className="text-[11px] uppercase tracking-widest text-[#D4AF37] font-bold">
            Concierge Quotation
          </span>
          <h2 className="text-xl font-display font-bold text-foreground">
            Service Terms & Delivery
          </h2>
        </div>
        <div className="text-xs text-foreground/50 self-start sm:self-auto">
          Digital studio fulfillment
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {items.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className="flex flex-col">
              <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider font-semibold text-foreground/50 mb-1.5">
                <Icon className="w-3.5 h-3.5 text-[#D4AF37]" aria-hidden="true" />
                <span>{item.label}</span>
              </div>
              <div className="text-2xl sm:text-3xl font-display font-bold text-foreground tracking-tight mb-1">
                {item.value}
              </div>
              <div className="text-xs text-foreground/60">
                {item.subtext}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-5 border-t border-foreground/5 text-xs text-foreground/60 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <span>Clear, upfront quotation. No hidden charges or unexpected add-ons.</span>
        <span className="text-foreground/80 font-medium">Bespoke or multi-subject quotes available upon request</span>
      </div>
    </div>
  );
}
