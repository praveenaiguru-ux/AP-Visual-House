import { useParams, Link } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import { ArrowLeft } from 'lucide-react';
import {
  services,
  categories,
  getServiceByCategoryAndSlug,
  getServiceBySlug,
  getCategoryBySlug
} from '../data/services';
import { ServiceDetailData } from '../types';

// Modular Service Detail Components
import ServiceSEO from '../components/service-detail/ServiceSEO';
import ServiceBreadcrumbs from '../components/service-detail/ServiceBreadcrumbs';
import ServiceHero from '../components/service-detail/ServiceHero';
import ServicePricingCard from '../components/service-detail/ServicePricingCard';
import ServiceWhatWeCreate from '../components/service-detail/ServiceWhatWeCreate';
import ServiceDeliverables from '../components/service-detail/ServiceDeliverables';
import ServiceExamples from '../components/service-detail/ServiceExamples';
import ServiceProcess from '../components/service-detail/ServiceProcess';
import ServiceFAQ from '../components/service-detail/ServiceFAQ';
import RelatedServices from '../components/service-detail/RelatedServices';
import ServiceProjectRequest from '../components/service-detail/ServiceProjectRequest';
import ServiceCTA from '../components/service-detail/ServiceCTA';

export default function ServiceDetail() {
  const { categorySlug, serviceSlug, slug } = useParams();
  const activeSlug = serviceSlug || slug;

  // Resolve service from data
  const service = useMemo(() => {
    if (!activeSlug) return undefined;
    if (categorySlug) {
      return getServiceByCategoryAndSlug(categorySlug, activeSlug);
    }
    return getServiceBySlug(activeSlug);
  }, [categorySlug, activeSlug]);

  // Scroll to top on slug change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeSlug]);

  const handleStartProject = () => {
    const el = document.getElementById('project-request');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      // Focus name input after scrolling
      setTimeout(() => {
        const input = document.getElementById('client-name');
        input?.focus();
      }, 400);
    }
  };

  // If service not found in registry
  if (!service) {
    return (
      <div className="bg-background text-foreground min-h-[70vh] flex items-center justify-center py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-foreground/5 border border-foreground/10 text-xs font-semibold uppercase tracking-widest text-[#D4AF37] mb-4">
            Notice
          </span>
          <h1 className="text-4xl font-display font-bold mb-4 text-foreground">Service Not Found</h1>
          <p className="text-foreground/70 mb-8 leading-relaxed text-sm">
            The visual service you are looking for could not be found or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/services"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-foreground text-background font-bold text-xs uppercase tracking-wider rounded hover:bg-[#D4AF37] hover:text-foreground transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>All Services</span>
            </Link>
            <Link
              to="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-foreground/30 text-foreground font-bold text-xs uppercase tracking-wider rounded hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all"
            >
              <span>Return Home</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Resolve Category Information
  const categoryDetails = getCategoryBySlug(service.categorySlug || service.categoryId) || categories[0];
  const canonicalPath = `/services/${service.categorySlug || 'ai-image-creation'}/${service.slug}`;

  // Complete data-driven detail model (using handcrafted detail or generic fallback structure)
  const detail: ServiceDetailData = useMemo(() => {
    if (service.detail) {
      return service.detail;
    }

    // Default structure for other services until populated in future phases
    return {
      id: service.id,
      slug: service.slug,
      category: service.category,
      categorySlug: service.categorySlug || 'ai-image-creation',
      categoryId: service.categoryId,
      name: service.title,
      shortDescription: service.description,
      longDescription: `Professional ${service.title.toLowerCase()} service tailored to your creative and visual goals. Handled with expert concierge care by AP Visual House.`,
      startingPrice: service.price,
      currency: '₹',
      deliveryTime: service.deliveryTime,
      revisionPolicy: '1 Minor Revision',
      formats: ['JPG', 'PNG'],
      heroImage: service.image,
      galleryImages: [
        {
          title: `${service.title} Showcase`,
          description: 'High-quality visual production by AP Visual House.',
          image: service.image,
          alt: `Sample visual of ${service.title}`
        }
      ],
      whatWeCreate: [
        {
          title: `Custom ${service.title}`,
          description: 'Tailored visual assets produced to your exact creative requirements.'
        }
      ],
      whatCustomerProvides: [
        {
          title: 'Reference Materials',
          description: 'Photographs, branding assets, or design references.'
        },
        {
          title: 'Project Notes',
          description: 'Specific goals, style preferences, and intended usage.'
        }
      ],
      whatCustomerReceives: [
        {
          title: 'High-Resolution Master Files',
          description: 'Universal formats ready for immediate digital deployment.'
        },
        {
          title: 'One Minor Revision',
          description: 'Fine-tuning of colors, details, or cropping.'
        }
      ],
      faq: [
        {
          question: `How does the ${service.title} service work?`,
          answer: `Submit your project requirements and reference files. Our creative studio will review your brief and coordinate with you via WhatsApp to craft your custom visual.`
        },
        {
          question: 'What is the typical turnaround time?',
          answer: `Most commissions are delivered within ${service.deliveryTime} from kickoff confirmation.`
        },
        {
          question: 'What type of content can I submit?',
          answer: 'AP Visual House does not accept projects involving nudity, sexually explicit content, profanity, hate or offensive material, or other inappropriate content. Customers are responsible for ensuring that submitted files comply with this policy. If submitted material violates our Content Policy, AP Visual House may decline or discontinue the project.'
        }
      ],
      relatedServices: services
        .filter((s) => s.categoryId === service.categoryId && s.slug !== service.slug)
        .slice(0, 5)
        .map((s) => s.slug),
      seoTitle: `${service.title} Services | AP Visual House`,
      seoDescription: `${service.description} Starting from ₹${service.price} with delivery in ${service.deliveryTime}.`
    };
  }, [service]);

  // Resolve related services list
  const relatedServicesList = useMemo(() => {
    return (detail.relatedServices || [])
      .map((relSlug) => services.find((s) => s.slug === relSlug))
      .filter((s): s is typeof services[0] => Boolean(s));
  }, [detail.relatedServices]);

  return (
    <div className="bg-background text-foreground min-h-screen pb-20">
      {/* Dynamic SEO Meta & Structured Data */}
      <ServiceSEO detail={detail} canonicalPath={canonicalPath} />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Breadcrumb Navigation */}
        <ServiceBreadcrumbs
          categoryTitle={categoryDetails.title}
          categorySlug={categoryDetails.slug || 'ai-image-creation'}
          serviceTitle={detail.name}
        />

        {/* 1. Hero Section */}
        <ServiceHero
          detail={detail}
          onStartProject={handleStartProject}
        />

        {/* 2. Quotation & Pricing Block */}
        <div className="mt-12">
          <ServicePricingCard detail={detail} />
        </div>

        {/* 3. What We Create */}
        <ServiceWhatWeCreate detail={detail} />

        {/* 4. What You Provide & What You Receive */}
        <ServiceDeliverables detail={detail} />

        {/* 5. See What We Can Create (Visual Showcase) */}
        {detail.galleryImages && detail.galleryImages.length > 0 && (
          <ServiceExamples examples={detail.galleryImages} />
        )}

        {/* 6. How It Works (5 Steps) */}
        <ServiceProcess />

        {/* 7. Frequently Asked Questions */}
        {detail.faq && detail.faq.length > 0 && (
          <ServiceFAQ faqs={detail.faq} />
        )}

        {/* 8. Related Services (You May Also Like) */}
        <RelatedServices
          services={relatedServicesList}
          currentSlug={detail.slug}
        />

        {/* 9. Project Request Flow (Concierge Form) */}
        <ServiceProjectRequest
          serviceName={detail.name}
          startingPrice={detail.startingPrice}
          currency={detail.currency}
          uploadConfig={detail.uploadConfig}
        />

        {/* 10. Final Call to Action */}
        <ServiceCTA
          serviceName={detail.name}
          startingPrice={detail.startingPrice}
          currency={detail.currency}
          onStartProject={handleStartProject}
        />
      </main>
    </div>
  );
}
