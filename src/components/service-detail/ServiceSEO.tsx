import { useEffect } from 'react';
import { ServiceDetailData } from '../../types';
import { siteConfig } from '../../config';
import { categories } from '../../data/services';

interface ServiceSEOProps {
  detail: ServiceDetailData;
  canonicalPath: string;
}

export default function ServiceSEO({ detail, canonicalPath }: ServiceSEOProps) {
  useEffect(() => {
    // 1. Page Title
    const originalTitle = document.title;
    document.title = detail.seoTitle || `${detail.name} Services | ${siteConfig.name}`;

    // Helper to update or create meta tag
    const setMetaTag = (attributeName: string, attributeValue: string, content: string) => {
      let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`) as HTMLMetaElement | null;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attributeName, attributeValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
      return element;
    };

    // Helper to update or create link tag
    const setLinkTag = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
      return element;
    };

    const canonicalUrl = `${siteConfig.url}${canonicalPath}`;
    const description = detail.seoDescription || detail.shortDescription;

    // Standard meta tags
    setMetaTag('name', 'description', description);
    setLinkTag('canonical', canonicalUrl);

    // Open Graph
    setMetaTag('property', 'og:title', detail.seoTitle || detail.name);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:image', detail.heroImage);
    setMetaTag('property', 'og:type', 'website');
    setMetaTag('property', 'og:site_name', siteConfig.name);

    // Twitter / X
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', detail.seoTitle || detail.name);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', detail.heroImage);

    // Category resolution for structured breadcrumbs
    const cat = categories.find(c => c.slug === detail.categorySlug || c.id === detail.categoryId);
    const categoryTitle = cat?.title || detail.category || 'Visual Services';
    const categoryAnchor = cat ? (cat.slug === 'ai-image-creation' ? 'ai-images' : cat.slug) : 'services';

    // JSON-LD Structured Data
    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [
        {
          '@type': 'ListItem',
          'position': 1,
          'name': 'Home',
          'item': `${siteConfig.url}/`
        },
        {
          '@type': 'ListItem',
          'position': 2,
          'name': 'Services',
          'item': `${siteConfig.url}/services`
        },
        {
          '@type': 'ListItem',
          'position': 3,
          'name': categoryTitle,
          'item': `${siteConfig.url}/services#${categoryAnchor}`
        },
        {
          '@type': 'ListItem',
          'position': 4,
          'name': detail.name,
          'item': canonicalUrl
        }
      ]
    };

    const serviceSchema = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      'name': detail.name,
      'serviceType': 'Digital Art & Creative Visual Service',
      'description': detail.shortDescription,
      'provider': {
        '@type': 'Organization',
        'name': siteConfig.name,
        'url': siteConfig.url,
        'logo': `${siteConfig.url}/logo-horizontal.png`
      },
      'offers': {
        '@type': 'Offer',
        'price': detail.startingPrice.toString(),
        'priceCurrency': 'INR',
        'availability': 'https://schema.org/InStock',
        'url': canonicalUrl
      },
      'termsOfService': `${siteConfig.url}/faq`
    };

    const scriptId = 'service-structured-data';
    let scriptElement = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!scriptElement) {
      scriptElement = document.createElement('script');
      scriptElement.id = scriptId;
      scriptElement.type = 'application/ld+json';
      document.head.appendChild(scriptElement);
    }
    scriptElement.textContent = JSON.stringify([breadcrumbSchema, serviceSchema]);

    return () => {
      document.title = originalTitle;
      const scriptToRemove = document.getElementById(scriptId);
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [detail, canonicalPath]);

  return null;
}
