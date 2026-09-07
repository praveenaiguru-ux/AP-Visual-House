import { Service, ServiceDetailData } from '../../types';

const contentPolicyFaq = {
  question: 'What type of content can I submit?',
  answer: "AP Visual House does not accept projects involving nudity, sexually explicit content, profanity, hate or offensive material, or other inappropriate content. Customers are responsible for ensuring that submitted files comply with this policy. If submitted material violates our Content Policy, AP Visual House may decline or discontinue the project."
};

// 26. PRODUCT ADVERTISEMENT
export const productAdvertisementDetail: ServiceDetailData = {
  id: 'product-advertisement',
  slug: 'product-advertisement',
  category: 'Product Creatives',
  categorySlug: 'product-social-media-creatives',
  categoryId: 'product-creatives',
  name: 'Product Advertisement',
  shortDescription: 'High-converting commercial product advertisements. Dramatic studio backdrops, dynamic lighting, persuasive benefit callouts, and conversion-focused design.',
  longDescription: 'Make your product impossible to ignore. Our Product Advertisement service takes your raw product photos and places them into high-end commercial environments with photorealistic contact shadows, floating ingredient elements, brand typography, and persuasive promotional messaging.',
  startingPrice: 399,
  currency: '₹',
  deliveryTime: '24–48 Hours',
  revisionPolicy: '1 Minor Revision',
  formats: ['JPG', 'PNG', 'PSD (on request)'],
  heroImage: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1200',
  imageType: 'product',
  imageFit: 'cover',
  imagePosition: 'center',
  galleryImages: [
    {
      title: 'Cosmetics Podium & Water Splash',
      description: 'Dynamic water ripple podium with soft pastel studio backlighting for skincare.',
      image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=800',
      alt: 'Luxury cosmetic skincare product advertisement'
    },
    {
      title: 'Tech & Electronics Neon Glow',
      description: 'Dark mode cyber pedestal with crisp edge reflections and technical feature highlights.',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800',
      alt: 'Headphones product commercial advertisement'
    },
    {
      title: 'Beverage & Splash Explosion',
      description: 'High-speed fruit slice explosion and condensation droplets for organic drinks.',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800',
      alt: 'Beverage bottle dynamic advertisement'
    },
    {
      title: 'Luxury Perfume & Stone Pedestal',
      description: 'Textured travertine stone, sunbeam shadow patterns, and refined editorial typography.',
      image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800',
      alt: 'Luxury fragrance advertisement render'
    }
  ],
  whatWeCreate: [
    {
      title: 'E-Commerce Hero Ads',
      description: 'Scroll-stopping main ads for Meta, Google Performance Max, and Amazon Sponsored Brands.'
    },
    {
      title: 'Podium & Environmental Staging',
      description: 'Placing bottles, jars, or tech gear on marble, wood, water, or minimalist stone podiums.'
    },
    {
      title: 'Feature Callout Graphics',
      description: 'Clear visual badges highlighting USPs (Organic, Wireless, Waterproof, 100% Pure).'
    },
    {
      title: 'Multi-Aspect Ratio Deliverables',
      description: '1:1 Square (Instagram Feed), 9:16 Vertical (Stories/Reels), and 16:9 Landscape (Web Banners).'
    }
  ],
  whatCustomerProvides: [
    {
      title: 'Product Photo / Packshot',
      description: 'Clear photo of the product bottle, box, or item (phone photo against white wall is fine!).'
    },
    {
      title: 'Product Features & Brand Logo',
      description: 'Key benefits you want mentioned, target audience, and PNG logo file.'
    }
  ],
  whatCustomerReceives: [
    {
      title: 'High-Resolution Commercial Ad Visual',
      description: 'Ready-to-launch ad creative optimized for Meta Ads, Amazon, or website banners.'
    },
    {
      title: 'Transparent Cutout File (PNG)',
      description: 'Clean background-free product master cutout with realistic contact shadow.'
    },
    {
      title: '1 Minor Copy & Color Revision',
      description: 'Headline text tweak or background color adjustments.'
    }
  ],
  uploadConfig: {
    requiredUploads: [
      {
        label: 'Product Photograph',
        description: 'Upload a clear photo of the product taken under good lighting.'
      }
    ],
    optionalUploads: [
      {
        label: 'Brand Logo / Ad Copy',
        description: 'Brand logo PNG and any specific headline or discount offer text.'
      }
    ],
    acceptedFileTypes: ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'],
    maxFiles: 5,
    maxFileSize: 10 * 1024 * 1024,
    maxTotalSize: 25 * 1024 * 1024
  },
  faq: [
    {
      question: 'Do I need expensive professional studio photos of my product?',
      answer: 'No! You can take a simple photo of your product with your phone under natural daylight. We will digitally cut out the product, enhance the reflections, and stage it in a luxury 3D environment.'
    },
    {
      question: 'Can you include our brand colors and logo?',
      answer: 'Yes! Upload your brand hex codes and vector/PNG logo, and our designers will align every graphic to your brand guidelines.'
    },
    contentPolicyFaq,
    {
      question: 'How long does an ad creative take?',
      answer: 'Delivery is completed within 24 to 48 hours.'
    }
  ],
  relatedServices: [
    'instagram-creative',
    'product-image-enhancement',
    'product-video-ad',
    'promotional-poster'
  ],
  seoTitle: 'Commercial Product Advertisement Design | AP Visual House',
  seoDescription: 'High-converting product ads for Meta, Amazon, and e-commerce brands. Starting from ₹399 with 24–48h delivery and luxury staging.'
};

// 27. INSTAGRAM CREATIVE
export const instagramCreativeDetail: ServiceDetailData = {
  id: 'instagram-creative',
  slug: 'instagram-creative',
  category: 'Product Creatives',
  categorySlug: 'product-social-media-creatives',
  categoryId: 'product-creatives',
  name: 'Instagram Creative',
  shortDescription: 'Sleek, thumb-stopping Instagram feed posts and stories. Editorial layouts, aesthetic color palettes, engagement-driven typography, and brand-first design.',
  longDescription: 'Cut through endless social media feeds. Our Instagram Creative service crafts polished, on-brand graphics tailored for Instagram feeds (1:1 & 4:5) and Stories (9:16). Whether for product announcements, customer quotes, lifestyle branding, or carousel slides, we deliver visuals that boost saves and shares.',
  startingPrice: 299,
  currency: '₹',
  deliveryTime: '24 Hours',
  revisionPolicy: '1 Minor Revision',
  formats: ['JPG', 'PNG'],
  heroImage: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=1200',
  imageType: 'product',
  imageFit: 'cover',
  imagePosition: 'center',
  galleryImages: [
    {
      title: 'Minimalist Editorial Feed Post',
      description: 'Clean neutral tones, high-fashion typography, and elegant product placement.',
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800',
      alt: 'Minimalist Instagram feed creative'
    },
    {
      title: 'Dynamic Story Announcement (9:16)',
      description: 'Swipe-up call to action, engaging countdown styling, and brand color gradient.',
      image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=800',
      alt: 'Instagram story product creative'
    },
    {
      title: 'Customer Review & Social Proof Card',
      description: 'Credibility-building testimonial post with clean star ratings and quotation styling.',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800',
      alt: 'Instagram social proof testimonial card'
    },
    {
      title: 'Carousel Educational Slide',
      description: 'Seamless swipeable graphic with high-clarity bullet points and visual hierarchy.',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800',
      alt: 'Educational Instagram carousel slide'
    }
  ],
  whatWeCreate: [
    {
      title: 'Feed Posts (1:1 Square & 4:5 Portrait)',
      description: 'Maximized screen real estate designs for high engagement in the main Instagram feed.'
    },
    {
      title: 'Story / Reel Cover Graphics (9:16)',
      description: 'Immersive vertical layouts designed to capture attention in the first 2 seconds.'
    },
    {
      title: 'Brand-Coordinated Color Systems',
      description: 'Curated typography, layout grids, and palettes that make your feed look cohesive.'
    },
    {
      title: 'Call-to-Action Highlights',
      description: 'Clear prompts that drive comments, profile visits, DMs, or website clicks.'
    }
  ],
  whatCustomerProvides: [
    {
      title: 'Post Purpose & Copy Brief',
      description: 'Headline text, product name, offer details, or educational tips to feature.'
    },
    {
      title: 'Brand Logo & Imagery (Optional)',
      description: 'Your logo and any brand photos you’d like included in the creative.'
    }
  ],
  whatCustomerReceives: [
    {
      title: 'Pixel-Perfect Social Export (JPG/PNG)',
      description: 'Calibrated at 1080x1350px (4:5) or 1080x1920px (9:16) for razor-sharp mobile display.'
    },
    {
      title: 'No Compression Artifacts',
      description: 'Optimized export settings ensuring crisp text even after Instagram’s compression.'
    },
    {
      title: '1 Minor Detail Revision Round',
      description: 'Copy corrections, font sizing tweaks, or slight color balance adjustments.'
    }
  ],
  uploadConfig: {
    requiredUploads: [
      {
        label: 'Creative Text / Brief',
        description: 'Provide the headline, body text, and desired call-to-action for the post.'
      }
    ],
    optionalUploads: [
      {
        label: 'Product Photo / Logo',
        description: 'Optional image to feature and transparent logo PNG.'
      }
    ],
    acceptedFileTypes: ['image/jpeg', 'image/png', 'application/pdf', 'text/plain'],
    maxFiles: 4,
    maxFileSize: 10 * 1024 * 1024,
    maxTotalSize: 25 * 1024 * 1024
  },
  faq: [
    {
      question: 'Can you design a multi-slide carousel post?',
      answer: 'Yes! We can create seamless, swipeable 3-to-10 slide carousels for storytelling, educational breakdowns, and step-by-step product guides.'
    },
    {
      question: 'How quickly will I receive my post?',
      answer: 'Standard Instagram creatives are delivered within 24 hours.'
    },
    contentPolicyFaq,
    {
      question: 'Do you write the copy or caption for the post?',
      answer: 'Our base package focuses on visual design and layout of your copy. If you need help refining your headline or offer text, our team is happy to polish it!'
    }
  ],
  relatedServices: [
    'product-advertisement',
    'social-media-banner',
    'festival-offer-creative',
    'social-media-promotional-video'
  ],
  seoTitle: 'Instagram Creative Post & Story Design | AP Visual House',
  seoDescription: 'Thumb-stopping Instagram feed posts, carousels, and stories for brands. Starting from ₹299 with 24-hour turnaround.'
};

// 28. PROMOTIONAL POSTER
export const promotionalPosterDetail: ServiceDetailData = {
  id: 'promotional-poster',
  slug: 'promotional-poster',
  category: 'Product Creatives',
  categorySlug: 'product-social-media-creatives',
  categoryId: 'product-creatives',
  name: 'Promotional Poster',
  shortDescription: 'High-impact promotional and event posters. Bold visual hierarchy, dynamic typography, and arresting layouts for retail sales, workshops, concerts, and brand launches.',
  longDescription: 'Demand attention across print and digital screens. Our Promotional Poster service creates bold, arresting posters for music gigs, retail sales, business workshops, film screenings, and pop-up markets. We engineer visual hierarchy that commands attention from across a room or on a busy feed.',
  startingPrice: 399,
  currency: '₹',
  deliveryTime: '24–48 Hours',
  revisionPolicy: '1 Minor Revision',
  formats: ['JPG', 'PNG', 'PDF Master'],
  heroImage: 'https://images.unsplash.com/photo-1572945753563-3001a331c857?auto=format&fit=crop&q=80&w=1200',
  imageType: 'product',
  imageFit: 'cover',
  imagePosition: 'center',
  galleryImages: [
    {
      title: 'Live Music & Festival Poster',
      description: 'Electric neon typography, duotone artist portraits, and venue date lineup.',
      image: 'https://images.unsplash.com/photo-1572945753563-3001a331c857?auto=format&fit=crop&q=80&w=800',
      alt: 'Live music concert event promotional poster'
    },
    {
      title: 'Retail End-of-Season Sale Poster',
      description: 'High-energy red and black color blocking with bold 50% OFF discount badges.',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800',
      alt: 'Retail store sale promotional poster'
    },
    {
      title: 'Corporate Workshop & Conference Poster',
      description: 'Clean architectural grid layout, keynote speaker headshots, and QR code registration.',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800',
      alt: 'Business conference promotional poster'
    },
    {
      title: 'Fitness & Gym Grand Opening Poster',
      description: 'Intense muscular rim lighting, motivational typography, and membership offer.',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800',
      alt: 'Fitness brand promotional poster design'
    }
  ],
  whatWeCreate: [
    {
      title: 'Commercial Event Posters',
      description: 'Concerts, sports tournaments, corporate summits, and comedy shows.'
    },
    {
      title: 'Retail Storefront Flyers & Posters',
      description: 'Noticeable promotional prints for shop windows, noticeboards, and bulletin stands.'
    },
    {
      title: 'Digital Social Media Version Included',
      description: 'Adapted 4:5 and 9:16 digital formats for WhatsApp and Instagram promotion.'
    },
    {
      title: 'Print-Ready A3 / A2 / A1 PDF Masters',
      description: 'Full-bleed 300 DPI CMYK vector and raster files ready for large format print shops.'
    }
  ],
  whatCustomerProvides: [
    {
      title: 'Event / Promotion Copy',
      description: 'Event title, date, time, venue, ticket details, discount offers, and sponsor logos.'
    },
    {
      title: 'Style / Visual Direction',
      description: 'Preferred mood: Energetic & Loud, Minimalist & Modern, or Vintage Retro.'
    }
  ],
  whatCustomerReceives: [
    {
      title: 'Full-Bleed Print Master (PDF)',
      description: '300 DPI CMYK file with trim crop marks for professional print shops.'
    },
    {
      title: 'Web & Digital Image Files (JPG/PNG)',
      description: 'Optimized high-res files for online ticketing and social sharing.'
    },
    {
      title: '1 Minor Detail Revision Round',
      description: 'Sponsor logo additions, timing updates, or typo corrections.'
    }
  ],
  uploadConfig: {
    requiredUploads: [
      {
        label: 'Poster Text & Event Info',
        description: 'Provide headline, event dates, pricing, venue address, and contact details.'
      }
    ],
    optionalUploads: [
      {
        label: 'Sponsor Logos / Photos',
        description: 'Upload speaker/performer photos and sponsor logo files.'
      }
    ],
    acceptedFileTypes: ['image/jpeg', 'image/png', 'application/pdf', 'text/plain'],
    maxFiles: 5,
    maxFileSize: 10 * 1024 * 1024,
    maxTotalSize: 25 * 1024 * 1024
  },
  faq: [
    {
      question: 'What size can you design the poster for?',
      answer: 'We can design for standard international poster sizes (A4, A3, A2, A1) or custom dimensions such as theater standees, roll-up banners, and 18x24 inch framed prints.'
    },
    {
      question: 'Can you include a scannable QR code for ticket booking?',
      answer: 'Yes! Send us your booking URL or UPI payment link, and we will generate and integrate a clean, scannable high-resolution QR code directly into the poster layout.'
    },
    contentPolicyFaq,
    {
      question: 'How fast is delivery?',
      answer: 'Turnaround is typically 24 to 48 hours.'
    }
  ],
  relatedServices: [
    'product-advertisement',
    'social-media-banner',
    'festival-offer-creative',
    'product-video-ad'
  ],
  seoTitle: 'Promotional Poster & Event Flyer Design | AP Visual House',
  seoDescription: 'High-impact posters for retail sales, events, and brand launches. Print-ready 300 DPI PDF starting from ₹399 with 24–48h delivery.'
};

// 29. FESTIVAL OFFER CREATIVE
export const festivalOfferCreativeDetail: ServiceDetailData = {
  id: 'festival-offer-creative',
  slug: 'festival-offer-creative',
  category: 'Product Creatives',
  categorySlug: 'product-social-media-creatives',
  categoryId: 'product-creatives',
  name: 'Festival Offer Creative',
  shortDescription: 'Seasonal holiday and festival marketing graphics. Festive discounts, holiday sale banners, and celebratory commercial creatives for Diwali, Eid, Christmas, and New Year.',
  longDescription: 'Festivals are the biggest shopping seasons of the year. Our Festival Offer Creative service blends rich cultural celebratory elements (diyas, gold sparks, lanterns, holiday wreaths) with clear, compelling retail sales messaging—boosting festive conversion rates for your brand.',
  startingPrice: 399,
  currency: '₹',
  deliveryTime: '24–48 Hours',
  revisionPolicy: '1 Minor Revision',
  formats: ['JPG', 'PNG'],
  heroImage: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=1200',
  imageType: 'product',
  imageFit: 'cover',
  imagePosition: 'center',
  galleryImages: [
    {
      title: 'Diwali Dhamaka Festive Sale Ad',
      description: 'Gold dust particle bursts, glowing brass oil lamps, and bold 40% OFF discount badge.',
      image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=800',
      alt: 'Diwali festive offer creative ad banner'
    },
    {
      title: 'Eid Special Festive Collection',
      description: 'Royal emerald green, Islamic crescent patterns, and festive jewelry collection showcase.',
      image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=800',
      alt: 'Eid festive sale promotional creative'
    },
    {
      title: 'Christmas & Year-End Flash Sale',
      description: 'Crisp winter snow accents, red ribbon banners, and festive gift package styling.',
      image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=800',
      alt: 'Christmas holiday discount creative banner'
    },
    {
      title: 'New Year Mega Clearance Creative',
      description: 'Celebratory champagne gold typography with urgent LIMITED TIME OFFER badges.',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800',
      alt: 'New Year sale creative design'
    }
  ],
  whatWeCreate: [
    {
      title: 'Festive Campaign Hero Visuals',
      description: 'Coordinated commercial designs for Diwali, Eid, Dussehra, Pongal, Christmas, or New Year.'
    },
    {
      title: 'Product Staging in Festive Decor',
      description: 'Decorating your product with authentic festive lighting, florals, and sparkle.'
    },
    {
      title: 'Urgency & Discount Badges',
      description: 'Clear commercial hierarchy highlighting limited-time discounts, promo codes, and free gifts.'
    },
    {
      title: 'Multi-Format Social Media Sizes',
      description: '1:1 square for Instagram/Facebook and 9:16 vertical for WhatsApp status and stories.'
    }
  ],
  whatCustomerProvides: [
    {
      title: 'Offer Details & Festive Occasion',
      description: 'Festival name, discount percentage/promo code, and product photo.'
    },
    {
      title: 'Brand Logo & Guidelines',
      description: 'Brand logo PNG and preferred brand color accents.'
    }
  ],
  whatCustomerReceives: [
    {
      title: 'High-Conversion Festive Graphic',
      description: 'Vibrant, high-resolution ad image ready for WhatsApp broadcasts and Meta ads.'
    },
    {
      title: 'Multiple Layout Formats',
      description: 'Square feed layout plus vertical story layout.'
    },
    {
      title: '1 Minor Detail Revision Round',
      description: 'Updating coupon code, changing discount numbers, or tweaking copy.'
    }
  ],
  uploadConfig: {
    requiredUploads: [
      {
        label: 'Festive Offer Brief',
        description: 'Provide festival name, discount percentage, promo code, and validity dates.'
      }
    ],
    optionalUploads: [
      {
        label: 'Product Image / Logo',
        description: 'Upload product photo and transparent logo PNG.'
      }
    ],
    acceptedFileTypes: ['image/jpeg', 'image/png', 'application/pdf', 'text/plain'],
    maxFiles: 4,
    maxFileSize: 10 * 1024 * 1024,
    maxTotalSize: 25 * 1024 * 1024
  },
  faq: [
    {
      question: 'Can you design offer graphics for regional festivals like Onam, Pongal, or Bihu?',
      answer: 'Yes! We create culturally authentic designs for all Indian and regional festivals, incorporating traditional cultural elements (pookkalam, sugarcane, traditional brass vessels).'
    },
    {
      question: 'How quickly can I get an urgent holiday promotion graphic?',
      answer: 'We provide 24-hour turnaround so you can launch your festive campaign right on schedule.'
    },
    contentPolicyFaq,
    {
      question: 'Can you create an entire set of 5 to 10 matching festive graphics?',
      answer: 'Yes! We offer package rates for full multi-creative festive campaigns covering tease, launch, and last-chance discount creative sets.'
    }
  ],
  relatedServices: [
    'festival-promotional-video',
    'product-advertisement',
    'instagram-creative',
    'promotional-poster'
  ],
  seoTitle: 'Festival Offer Creative & Holiday Sale Graphics | AP Visual House',
  seoDescription: 'Boost festive sales with high-converting Diwali, Eid, and Christmas offer banners. Starting from ₹399 with 24–48h delivery.'
};

// 30. PRODUCT IMAGE ENHANCEMENT
export const productImageEnhancementDetail: ServiceDetailData = {
  id: 'product-image-enhancement',
  slug: 'product-image-enhancement',
  category: 'Product Creatives',
  categorySlug: 'product-social-media-creatives',
  categoryId: 'product-creatives',
  name: 'Product Image Enhancement',
  shortDescription: 'Studio-grade e-commerce product image retouching. Clean white or transparent background cutouts, realistic contact shadows, color accuracy, and surface blemish cleanup.',
  longDescription: 'Turn plain smartphone snapshots into multi-million dollar e-commerce catalog images. Our Product Image Enhancement service provides precision hand-drawn clipping paths, transparent PNG cutouts, Amazon-compliant pure white backgrounds (RGB 255,255,255), realistic drop shadows, and dust/fingerprint removal.',
  startingPrice: 299,
  currency: '₹',
  deliveryTime: '24 Hours',
  revisionPolicy: '1 Minor Revision',
  formats: ['PNG (Transparent)', 'JPG (Pure White)', 'PSD'],
  heroImage: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1200',
  imageType: 'product',
  imageFit: 'cover',
  imagePosition: 'center',
  galleryImages: [
    {
      title: 'Amazon Pure White Studio Cutout',
      description: 'Zero background noise, 100% white RGB 255,255,255, and realistic soft drop shadow.',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800',
      alt: 'Clean white background sneaker product enhancement'
    },
    {
      title: 'Luxury Mirror Reflection Podiums',
      description: 'Glass-surface mirror reflection creating depth for perfume and cosmetics.',
      image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800',
      alt: 'Perfume product reflection enhancement'
    },
    {
      title: 'Surface Dust & Scratch Elimination',
      description: 'Meticulous cleaning of micro-scratches, dust specks, and manufacturing seams.',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800',
      alt: 'Retouched watch product image'
    },
    {
      title: 'Transparent PNG for Multi-Use Marketing',
      description: 'Ultra-crisp feathered edges allowing smooth drop onto any marketing background.',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800',
      alt: 'Transparent cutout headphones image'
    }
  ],
  whatWeCreate: [
    {
      title: 'Amazon / Flipkart / Shopify Ready',
      description: 'Meets 100% of marketplace technical specifications (RGB 255 pure white background).'
    },
    {
      title: 'Hand-Crafted Precision Cutout Paths',
      description: 'Smooth, natural contours around complex edges, hair, glass, and intricate jewelry.'
    },
    {
      title: 'Natural Contact & Cast Shadows',
      description: 'Retaining or synthesizing authentic ground shadows so products never look pasted.'
    },
    {
      title: 'Color Correction & Glare Control',
      description: 'Balancing metallic highlights and ensuring true-to-life product color reproduction.'
    }
  ],
  whatCustomerProvides: [
    {
      title: 'Raw Product Photo',
      description: 'A photo of the product taken against any simple backdrop (white paper or desk is great).'
    },
    {
      title: 'Platform Requirements',
      description: 'Mention if you need Amazon white background, transparent PNG, or custom shadow style.'
    }
  ],
  whatCustomerReceives: [
    {
      title: 'Pure White Background Master (JPG)',
      description: 'High-res 3000px+ file ready for immediate marketplace listing.'
    },
    {
      title: 'Transparent Cutout Master (PNG)',
      description: 'Alpha transparency file ready to drop into advertisements, posters, or catalog pages.'
    },
    {
      title: '1 Minor Detail Revision Round',
      description: 'Refinements to shadow density, edge softness, or highlight brightness.'
    }
  ],
  uploadConfig: {
    requiredUploads: [
      {
        label: 'Raw Product Photograph',
        description: 'Upload your product photo taken with phone or camera.'
      }
    ],
    acceptedFileTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/raw', 'image/tiff'],
    maxFiles: 5,
    maxFileSize: 10 * 1024 * 1024,
    maxTotalSize: 25 * 1024 * 1024
  },
  faq: [
    {
      question: 'Will these images pass Amazon and Flipkart image approval guidelines?',
      answer: 'Yes, 100%. We format images specifically to comply with Amazon, Flipkart, Myntra, and Shopify guidelines: pure RGB 255 white backgrounds, 85%+ product fill, and high zoom resolution.'
    },
    {
      question: 'Can you handle reflective objects like jewelry, mirrors, or chrome?',
      answer: 'Yes! Meticulous reflection cleaning, glare suppression, and metal polishing are among our core product retouching capabilities.'
    },
    contentPolicyFaq,
    {
      question: 'How fast is delivery for product image enhancement?',
      answer: 'Standard delivery is within 24 hours.'
    }
  ],
  relatedServices: [
    'product-advertisement',
    'instagram-creative',
    'photo-enhancement',
    'product-showcase-video'
  ],
  seoTitle: 'E-Commerce Product Image Enhancement & Cutouts | AP Visual House',
  seoDescription: 'Studio product retouching, transparent PNG cutouts, and Amazon white backgrounds. Starting from ₹299 with 24-hour turnaround.'
};

// 31. SOCIAL MEDIA BANNER
export const socialMediaBannerDetail: ServiceDetailData = {
  id: 'social-media-banner',
  slug: 'social-media-banner',
  category: 'Product Creatives',
  categorySlug: 'product-social-media-creatives',
  categoryId: 'product-creatives',
  name: 'Social Media Banner',
  shortDescription: 'Wide-format header graphics for brand channels. LinkedIn company banners, YouTube channel art, Facebook cover photos, and X/Twitter headers.',
  longDescription: 'Your social media header is the most valuable digital billboard on your profile. Our Social Media Banner service designs professional, high-resolution header graphics engineered for desktop and mobile safe zones across LinkedIn, YouTube, Twitter/X, and Facebook.',
  startingPrice: 399,
  currency: '₹',
  deliveryTime: '24–48 Hours',
  revisionPolicy: '1 Minor Revision',
  formats: ['JPG', 'PNG'],
  heroImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200',
  imageType: 'product',
  imageFit: 'cover',
  imagePosition: 'center',
  galleryImages: [
    {
      title: 'Corporate LinkedIn Header Banner',
      description: 'Clean architectural lines, company mission tagline, and authority-building credibility.',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800',
      alt: 'Corporate LinkedIn profile banner design'
    },
    {
      title: 'YouTube Creator Channel Art',
      description: 'Vibrant creator visual branding, upload schedule notice, and mobile safe-zone alignment.',
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800',
      alt: 'YouTube channel art header banner'
    },
    {
      title: 'E-Commerce Website Hero Banner',
      description: 'Full-width homepage banner featuring new collection launch with SHOP NOW CTA.',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800',
      alt: 'E-commerce website hero slider banner'
    },
    {
      title: 'Tech Startup Twitter/X Header',
      description: 'Sleek dark mode abstract gradient with product mockups and social handle.',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800',
      alt: 'Tech startup Twitter header banner'
    }
  ],
  whatWeCreate: [
    {
      title: 'Platform-Specific Safe-Zone Precision',
      description: 'Ensuring your text and face are never blocked by circular profile icons or mobile status bars.'
    },
    {
      title: 'LinkedIn Company & Personal Covers',
      description: 'Professional 1584x396px banners communicating your value proposition in seconds.'
    },
    {
      title: 'YouTube 2560x1440px Master Banners',
      description: 'Adaptive designs that look incredible on TV screens, desktops, tablets, and phones.'
    },
    {
      title: 'Website Homepage Hero Sliders',
      description: 'Wide panoramic banners built to welcome new website visitors and convert shoppers.'
    }
  ],
  whatCustomerProvides: [
    {
      title: 'Target Platform & Brand Tagline',
      description: 'LinkedIn, YouTube, Facebook, Twitter, or Website; your tagline and core message.'
    },
    {
      title: 'Logo & Photos (Optional)',
      description: 'Brand logo and any portrait or product images you want showcased.'
    }
  ],
  whatCustomerReceives: [
    {
      title: 'Platform-Optimized Graphic Files',
      description: 'Pre-sized high-resolution exports ready for instant one-click upload.'
    },
    {
      title: 'Multi-Device Safe Alignment',
      description: 'Guaranteed text visibility across both mobile app and desktop browser views.'
    },
    {
      title: '1 Minor Detail Revision Round',
      description: 'Text positioning, headline adjustments, or color tweaks.'
    }
  ],
  uploadConfig: {
    requiredUploads: [
      {
        label: 'Banner Copy & Platform Info',
        description: 'Mention target platform (e.g. LinkedIn, YouTube) and provide headline/tagline text.'
      }
    ],
    optionalUploads: [
      {
        label: 'Logo / Founder Photo',
        description: 'Upload your company logo PNG and optional founder or product photo.'
      }
    ],
    acceptedFileTypes: ['image/jpeg', 'image/png', 'application/pdf', 'text/plain'],
    maxFiles: 4,
    maxFileSize: 10 * 1024 * 1024,
    maxTotalSize: 25 * 1024 * 1024
  },
  faq: [
    {
      question: 'Will my profile photo block the text on LinkedIn or YouTube?',
      answer: 'Never. We strictly follow mobile and desktop "safe-zone" technical templates so all your headlines and logos remain 100% visible on all devices.'
    },
    {
      question: 'Can I get matching banners for both LinkedIn and YouTube?',
      answer: 'Yes! We can create a unified cross-platform visual identity adapted to each platform’s specific aspect ratio.'
    },
    contentPolicyFaq,
    {
      question: 'How fast is delivery?',
      answer: 'Social media banners are completed within 24 to 48 hours.'
    }
  ],
  relatedServices: [
    'professional-profile-image',
    'instagram-creative',
    'product-advertisement',
    'short-brand-video'
  ],
  seoTitle: 'Custom Social Media Banner & Header Design | AP Visual House',
  seoDescription: 'Professional LinkedIn, YouTube, and Facebook banners with mobile safe-zone guarantee. Starting from ₹399 with 24–48h delivery.'
};

export const productCreativeServices: Service[] = [
  {
    id: 'product-advertisement',
    categoryId: 'product-creatives',
    category: 'Product Creatives',
    categorySlug: 'product-social-media-creatives',
    title: 'Product Advertisement',
    description: 'High-converting commercial product ads with dramatic lighting, staging, and benefit callouts.',
    price: 399,
    deliveryTime: '24–48 Hours',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800',
    slug: 'product-advertisement',
    imageType: 'product',
    imageFit: 'cover',
    imagePosition: 'center',
    detail: productAdvertisementDetail
  },
  {
    id: 'instagram-creative',
    categoryId: 'product-creatives',
    category: 'Product Creatives',
    categorySlug: 'product-social-media-creatives',
    title: 'Instagram Creative',
    description: 'Scroll-stopping Instagram feed posts and stories with modern editorial aesthetics and high engagement.',
    price: 299,
    deliveryTime: '24 Hours',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800',
    slug: 'instagram-creative',
    imageType: 'product',
    imageFit: 'cover',
    imagePosition: 'center',
    detail: instagramCreativeDetail
  },
  {
    id: 'promotional-poster',
    categoryId: 'product-creatives',
    category: 'Product Creatives',
    categorySlug: 'product-social-media-creatives',
    title: 'Promotional Poster',
    description: 'High-impact event flyers and marketing posters with bold typographic hierarchy for print and web.',
    price: 399,
    deliveryTime: '24–48 Hours',
    image: 'https://images.unsplash.com/photo-1572945753563-3001a331c857?auto=format&fit=crop&q=80&w=800',
    slug: 'promotional-poster',
    imageType: 'product',
    imageFit: 'cover',
    imagePosition: 'center',
    detail: promotionalPosterDetail
  },
  {
    id: 'festival-offer-creative',
    categoryId: 'product-creatives',
    category: 'Product Creatives',
    categorySlug: 'product-social-media-creatives',
    title: 'Festival Offer Creative',
    description: 'Seasonal holiday and festive discount graphics for Diwali, Eid, Christmas, and New Year campaigns.',
    price: 399,
    deliveryTime: '24–48 Hours',
    image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=800',
    slug: 'festival-offer-creative',
    imageType: 'product',
    imageFit: 'cover',
    imagePosition: 'center',
    detail: festivalOfferCreativeDetail
  },
  {
    id: 'product-image-enhancement',
    categoryId: 'product-creatives',
    category: 'Product Creatives',
    categorySlug: 'product-social-media-creatives',
    title: 'Product Image Enhancement',
    description: 'Studio product retouching, transparent PNG cutouts, and Amazon-compliant pure white backgrounds.',
    price: 299,
    deliveryTime: '24 Hours',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800',
    slug: 'product-image-enhancement',
    imageType: 'product',
    imageFit: 'cover',
    imagePosition: 'center',
    detail: productImageEnhancementDetail
  },
  {
    id: 'social-media-banner',
    categoryId: 'product-creatives',
    category: 'Product Creatives',
    categorySlug: 'product-social-media-creatives',
    title: 'Social Media Banner',
    description: 'Platform-optimized header banners for LinkedIn, YouTube, Facebook, and Twitter with safe-zone precision.',
    price: 399,
    deliveryTime: '24–48 Hours',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800',
    slug: 'social-media-banner',
    imageType: 'product',
    imageFit: 'cover',
    imagePosition: 'center',
    detail: socialMediaBannerDetail
  }
];
