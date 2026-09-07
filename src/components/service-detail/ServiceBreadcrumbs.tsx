import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface ServiceBreadcrumbsProps {
  categoryTitle: string;
  categorySlug: string;
  serviceTitle: string;
}

export default function ServiceBreadcrumbs({
  categoryTitle,
  categorySlug,
  serviceTitle
}: ServiceBreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 sm:mb-8 py-1">
      <ol className="flex flex-wrap items-center gap-x-1.5 sm:gap-x-2 gap-y-1.5 text-xs sm:text-sm text-foreground/60">
        <li className="inline-flex items-center">
          <Link
            to="/"
            className="hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D4AF37] rounded"
          >
            Home
          </Link>
        </li>
        <li className="inline-flex items-center text-foreground/30 select-none shrink-0" aria-hidden="true">
          <ChevronRight className="w-3.5 h-3.5" />
        </li>
        <li className="inline-flex items-center">
          <Link
            to="/services"
            className="hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D4AF37] rounded"
          >
            Services
          </Link>
        </li>
        <li className="inline-flex items-center text-foreground/30 select-none shrink-0" aria-hidden="true">
          <ChevronRight className="w-3.5 h-3.5" />
        </li>
        <li className="inline-flex items-center">
          <Link
            to={`/services#${categorySlug === 'ai-image-creation' ? 'ai-images' : categorySlug}`}
            className="hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D4AF37] rounded truncate max-w-[150px] sm:max-w-none"
            title={categoryTitle}
          >
            {categoryTitle}
          </Link>
        </li>
        <li className="inline-flex items-center text-foreground/30 select-none shrink-0" aria-hidden="true">
          <ChevronRight className="w-3.5 h-3.5" />
        </li>
        <li className="inline-flex items-center font-semibold text-foreground break-words" aria-current="page">
          {serviceTitle}
        </li>
      </ol>
    </nav>
  );
}
