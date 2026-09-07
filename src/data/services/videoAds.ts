import { Service, ServiceDetailData } from '../../types';

const contentPolicyFaq = {
  question: 'What type of content can I submit?',
  answer: "AP Visual House does not accept projects involving nudity, sexually explicit content, profanity, hate or offensive material, or other inappropriate content. Customers are responsible for ensuring that submitted files comply with this policy. If submitted material violates our Content Policy, AP Visual House may decline or discontinue the project."
};

// 32. SHORT BRAND VIDEO
export const shortBrandVideoDetail: ServiceDetailData = {
  id: 'short-brand-video',
  slug: 'short-brand-video',
  category: 'Video',
  categorySlug: 'video-motion-ads',
  categoryId: 'video-ads',
  name: 'Short Brand Video',
  shortDescription: 'Cinematic, compelling 15–30 second brand videos. Kinetic typography, dynamic transitions, licensed background audio, and brand identity storytelling.',
  longDescription: 'Tell your brand story in the language of modern attention spans. Our Short Brand Video service creates punchy, cinematic 15 to 30 second videos featuring elegant logo animations, rhythm-matched transitions, licensed royalty-free background soundtracks, and crisp typography that captures who you are.',
  startingPrice: 699,
  currency: '₹',
  deliveryTime: '2–3 Days',
  revisionPolicy: '1 Round of Revisions',
  formats: ['MP4 (1080p Full HD)', 'Vertical 9:16', 'Horizontal 16:9'],
  heroImage: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&q=80&w=1200',
  imageType: 'video',
  imageFit: 'cover',
  imagePosition: 'center',
  galleryImages: [
    {
      title: 'Modern Tech Brand Anthem (15s)',
      description: 'Futuristic motion glitch transitions, bold serif typography, and bass-driven rhythm.',
      image: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&q=80&w=800',
      alt: 'Short brand video motion design'
    },
    {
      title: 'Luxury Fashion & Lifestyle Reel',
      description: 'Slow-motion film burn aesthetics, editorial text overlays, and serene acoustic score.',
      image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=800',
      alt: 'Luxury brand video creative'
    },
    {
      title: 'Creative Agency Showreel Intro',
      description: 'High-energy kinetic typography, liquid shape animations, and vibrant color bursts.',
      image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&q=80&w=800',
      alt: 'Creative agency showreel video'
    },
    {
      title: 'Artisan Cafe Story Video',
      description: 'Warm coffee steam cinematography, rustic wood textures, and customer hospitality moments.',
      image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=800',
      alt: 'Brand storytelling video clip'
    }
  ],
  whatWeCreate: [
    {
      title: 'Custom Brand Storyline (15–30s)',
      description: 'Paced specifically for high viewer retention across Instagram Reels, YouTube Shorts, and Meta Ads.'
    },
    {
      title: 'Kinetic Motion Typography',
      description: 'Modern animated titles and subtitles communicating your message with or without sound.'
    },
    {
      title: 'Licensed Royalty-Free Soundtrack',
      description: 'Commercially cleared background music and subtle sound effects matched to key cuts.'
    },
    {
      title: 'Animated Logo Outro Sting',
      description: 'Memorable brand conclusion with website URL and call-to-action prompt.'
    }
  ],
  whatCustomerProvides: [
    {
      title: 'Brand Assets & Logo',
      description: 'Vector SVG or high-res PNG logo and any brand brand colors or fonts.'
    },
    {
      title: 'Core Message / Key Selling Points',
      description: 'Brief sentences describing what you do, who you serve, and your call to action.'
    }
  ],
  whatCustomerReceives: [
    {
      title: 'Broadcast-Quality MP4 (1080p / 4K)',
      description: 'Crisp, high-bitrate video file ready to publish across all social and ad channels.'
    },
    {
      title: 'Vertical (9:16) and Horizontal (16:9)',
      description: 'Formatted for Instagram Reels / TikTok as well as YouTube / Website headers.'
    },
    {
      title: '1 Revision Round',
      description: 'Refinements to text timing, soundtrack volume balance, or caption tweaks.'
    }
  ],
  uploadConfig: {
    requiredUploads: [
      {
        label: 'Brand Message & Script Brief',
        description: 'Provide your core brand message, key benefits to display, and call to action.'
      }
    ],
    optionalUploads: [
      {
        label: 'Logo / Video Clips / Photos',
        description: 'Upload your brand logo and any existing footage or product photos you want featured.'
      }
    ],
    acceptedFileTypes: ['video/mp4', 'video/quicktime', 'image/jpeg', 'image/png', 'application/pdf', 'text/plain'],
    maxFiles: 5,
    maxFileSize: 10 * 1024 * 1024,
    maxTotalSize: 25 * 1024 * 1024
  },
  faq: [
    {
      question: 'Do I need to provide existing video footage?',
      answer: 'Not necessarily! We can produce striking motion videos using your high-res photos, brand logos, 2D/3D motion graphics, and curated premium cinematic stock footage.'
    },
    {
      question: 'Is the background music safe from copyright strikes?',
      answer: 'Yes, 100%. We only use properly licensed, royalty-free audio that is completely cleared for commercial monetization on YouTube, Meta, and TikTok.'
    },
    contentPolicyFaq,
    {
      question: 'How long does a short brand video take to create?',
      answer: 'Initial cut is delivered within 2 to 3 days.'
    }
  ],
  relatedServices: [
    'product-video-ad',
    'social-media-promotional-video',
    'social-media-banner',
    'product-showcase-video'
  ],
  seoTitle: 'Short Brand Video & Motion Ads Production | AP Visual House',
  seoDescription: 'Engaging 15–30 second brand videos for Instagram Reels and Meta Ads. Starting from ₹699 with 2–3 days delivery and licensed soundtrack.'
};

// 33. PRODUCT VIDEO AD
export const productVideoAdDetail: ServiceDetailData = {
  id: 'product-video-ad',
  slug: 'product-video-ad',
  category: 'Video',
  categorySlug: 'video-motion-ads',
  categoryId: 'video-ads',
  name: 'Product Video Ad',
  shortDescription: 'Conversion-engineered product video commercials. 3D product rotations, ingredient feature callouts, high-energy cuts, and compelling hooks for e-commerce.',
  longDescription: 'Stop the scroll and convert viewers into paying customers. Our Product Video Ad service transforms your product images into dynamic commercial motion ads. Featuring 3-second visual hooks, kinetic feature callouts, problem-solution arcs, and strong buy-now prompts built for paid Meta and TikTok ads.',
  startingPrice: 799,
  currency: '₹',
  deliveryTime: '2–3 Days',
  revisionPolicy: '1 Round of Revisions',
  formats: ['MP4 (1080p Full HD)', 'Vertical 9:16', 'Square 1:1'],
  heroImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1200',
  imageType: 'video',
  imageFit: 'cover',
  imagePosition: 'center',
  galleryImages: [
    {
      title: 'Cosmetics Skincare Commercial (20s)',
      description: 'Hydration water splash animations, texture close-ups, and natural ingredient highlights.',
      image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=800',
      alt: 'Skincare product video ad commercial'
    },
    {
      title: 'Consumer Tech & Audio Showcase',
      description: 'Exploded component view motion, bass wave visuals, and noise cancellation demo.',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800',
      alt: 'Headphones product commercial video'
    },
    {
      title: 'Apparel & Footwear Fast-Paced Cut',
      description: 'Dynamic urban footwork, speed ramps, and neon discount badge animations.',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800',
      alt: 'Sneakers commercial video ad'
    },
    {
      title: 'Nutritional Supplement Energy Ad',
      description: 'Power-packed kinetic typography, verified laboratory badges, and before/after benefits.',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800',
      alt: 'Supplement product video ad'
    }
  ],
  whatWeCreate: [
    {
      title: '3-Second Scroll-Stopping Hook',
      description: 'Visually arresting opening frame engineered to beat 80% drop-off rates on paid social.'
    },
    {
      title: 'Kinetic Feature Highlights',
      description: 'Animated pointer callouts displaying product specs, materials, and certifications.'
    },
    {
      title: 'Sound-Off Captioned Experience',
      description: 'Large, stylish subtitles ensuring full comprehension even when viewers browse on mute.'
    },
    {
      title: 'Direct-Response End Screen',
      description: 'Urgent promo code callout, star rating proof, and "Shop Now" directional arrows.'
    }
  ],
  whatCustomerProvides: [
    {
      title: 'Product Photos & Key USPs',
      description: 'Clear photos of the product and a list of the 3–4 primary benefits to feature.'
    },
    {
      title: 'Offer / Discount Details',
      description: 'Discount code, free shipping notice, or bundle pricing to showcase.'
    }
  ],
  whatCustomerReceives: [
    {
      title: 'Ad-Ready Full HD Video (MP4)',
      description: 'Ready to import into Meta Ads Manager, TikTok Ads, or Amazon Sponsored Video.'
    },
    {
      title: '9:16 Vertical Reel + 1:1 Square Feed',
      description: 'Dual formats to maximize ad delivery efficiency across placements.'
    },
    {
      title: '1 Revision Round',
      description: 'Timing adjustments, font changes, or call-to-action refinements.'
    }
  ],
  uploadConfig: {
    requiredUploads: [
      {
        label: 'Product Photos & USPs',
        description: 'Upload high-res product photos and outline key benefits or discount offers.'
      }
    ],
    optionalUploads: [
      {
        label: 'Video Footage / Brand Logo',
        description: 'Upload unboxing footage or transparent brand logo PNG.'
      }
    ],
    acceptedFileTypes: ['video/mp4', 'video/quicktime', 'image/jpeg', 'image/png', 'application/pdf', 'text/plain'],
    maxFiles: 5,
    maxFileSize: 10 * 1024 * 1024,
    maxTotalSize: 25 * 1024 * 1024
  },
  faq: [
    {
      question: 'What video length is best for Meta and Instagram ads?',
      answer: 'For direct response e-commerce ads, 15 to 20 seconds is the sweet spot. We ensure your hook lands in the first 3 seconds, features are shown by second 10, and the offer closes by second 18.'
    },
    {
      question: 'Can you work with only photos if I don’t have video clips?',
      answer: 'Yes! We use advanced 2.5D parallax motion, camera pan-and-zooms, floating ingredient graphics, and kinetic typography to make static photos feel like high-budget video.'
    },
    contentPolicyFaq,
    {
      question: 'How fast is delivery?',
      answer: 'Typical turnaround is 2 to 3 days.'
    }
  ],
  relatedServices: [
    'short-brand-video',
    'product-showcase-video',
    'product-advertisement',
    'product-image-enhancement'
  ],
  seoTitle: 'E-Commerce Product Video Ads Production | AP Visual House',
  seoDescription: 'High-converting product video ads for Meta and TikTok. Scroll-stopping hooks, kinetic feature callouts starting from ₹799 with 2–3 days delivery.'
};

// 34. SOCIAL MEDIA PROMOTIONAL VIDEO
export const socialMediaPromotionalVideoDetail: ServiceDetailData = {
  id: 'social-media-promotional-video',
  slug: 'social-media-promotional-video',
  category: 'Video',
  categorySlug: 'video-motion-ads',
  categoryId: 'video-ads',
  name: 'Social Media Promotional Video',
  shortDescription: 'Trendy, energetic promotional videos for social media. Flash sales, webinar teasers, podcast clips, and new launch announcements built for viral engagement.',
  longDescription: 'Spark conversation and ignite engagement. Our Social Media Promotional Video service designs fast-paced, visually punchy videos calibrated for Instagram Reels, YouTube Shorts, and WhatsApp Status. Perfect for flash sales, event announcements, course launches, and podcast snippets.',
  startingPrice: 699,
  currency: '₹',
  deliveryTime: '2–3 Days',
  revisionPolicy: '1 Round of Revisions',
  formats: ['MP4 (1080p Full HD)', 'Vertical 9:16'],
  heroImage: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=1200',
  imageType: 'video',
  imageFit: 'cover',
  imagePosition: 'center',
  galleryImages: [
    {
      title: 'Flash Sale Urgent Countdown (15s)',
      description: 'Ticking timer graphics, flashing price drops, and high-energy electronic beat.',
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800',
      alt: 'Social media promotional video sale'
    },
    {
      title: 'Online Webinar & Masterclass Teaser',
      description: 'Speaker video snippet with animated highlighted captions and swipe-up registration link.',
      image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&q=80&w=800',
      alt: 'Webinar promotional teaser video'
    },
    {
      title: 'Podcast Highlight Clip with Waveform',
      description: 'Dynamic animated audio waveform, word-by-word colorful karaoke subtitles, and guest tag.',
      image: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&q=80&w=800',
      alt: 'Podcast audio visualizer video clip'
    },
    {
      title: 'Gym & Fitness Challenge Launch',
      description: 'Split screen workout clips, bold motivational stamps, and signup deadline reminder.',
      image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=800',
      alt: 'Fitness challenge promotional video'
    }
  ],
  whatWeCreate: [
    {
      title: 'Viral Social Rhythm & Pacing',
      description: 'Snappy edits synchronized to upbeat trending soundscapes for high watch time.'
    },
    {
      title: 'Word-by-Word Colored Captions',
      description: 'High-retention animated subtitles highlighting punchy phrases in bright brand colors.'
    },
    {
      title: 'Dynamic Motion Graphics & Stickers',
      description: 'Visual arrows, countdown timers, emojis, and energetic sound effect accents.'
    },
    {
      title: 'Vertical 9:16 Native Format',
      description: 'Full smartphone screen immersion for Instagram Reels, YouTube Shorts, and TikTok.'
    }
  ],
  whatCustomerProvides: [
    {
      title: 'Event / Promotion Topic & Script',
      description: 'Core announcement details, dates, discounts, or voice recording/talking video clip.'
    },
    {
      title: 'Brand Assets (Logo/Colors)',
      description: 'Logo file and preferred color scheme.'
    }
  ],
  whatCustomerReceives: [
    {
      title: 'Full HD 1080x1920 MP4 Video',
      description: 'Optimized export ready for instant publishing with no compression artifacts.'
    },
    {
      title: 'Licensed Commercial Music',
      description: 'Background audio cleared for worldwide social media broadcast.'
    },
    {
      title: '1 Revision Round',
      description: 'Tweaking subtitles, pacing, or adjusting background music volume.'
    }
  ],
  uploadConfig: {
    requiredUploads: [
      {
        label: 'Promotional Brief & Script',
        description: 'Provide details on the sale, launch, or event you are promoting.'
      }
    ],
    optionalUploads: [
      {
        label: 'Audio / Video Clips / Photos',
        description: 'Upload talking head clips, voiceover audio, or photos to incorporate.'
      }
    ],
    acceptedFileTypes: ['video/mp4', 'video/quicktime', 'audio/mpeg', 'image/jpeg', 'image/png', 'text/plain'],
    maxFiles: 5,
    maxFileSize: 10 * 1024 * 1024,
    maxTotalSize: 25 * 1024 * 1024
  },
  faq: [
    {
      question: 'Can you edit talking head videos with viral style subtitles (Alex Hormozi style)?',
      answer: 'Yes! Send us your raw talking phone video, and we will cut out awkward pauses, add dynamic animated subtitles, insert pop-up b-roll images, and add engaging sound effects.'
    },
    {
      question: 'How fast can I get a promotional video for an upcoming flash sale?',
      answer: 'Typical delivery is 2 to 3 days. Express 24-hour turnaround is available on request.'
    },
    contentPolicyFaq,
    {
      question: 'Can I post this video on multiple platforms?',
      answer: 'Yes. Our 9:16 vertical MP4 format works flawlessly across Instagram Reels, YouTube Shorts, Facebook Reels, TikTok, and WhatsApp Status.'
    }
  ],
  relatedServices: [
    'short-brand-video',
    'instagram-creative',
    'festival-promotional-video',
    'promotional-poster'
  ],
  seoTitle: 'Social Media Promotional Video Production | AP Visual House',
  seoDescription: 'High-engagement promotional videos for Instagram Reels and YouTube Shorts. Animated captions, trending rhythm starting from ₹699 with 2–3 days delivery.'
};

// 35. FESTIVAL PROMOTIONAL VIDEO
export const festivalPromotionalVideoDetail: ServiceDetailData = {
  id: 'festival-promotional-video',
  slug: 'festival-promotional-video',
  category: 'Video',
  categorySlug: 'video-motion-ads',
  categoryId: 'video-ads',
  name: 'Festival Promotional Video',
  shortDescription: 'Festive holiday video greetings and commercial promotional teasers. Golden particle bursts, festive greetings, holiday sales, and warm celebratory spirit.',
  longDescription: 'Captivate your audience during the joyous festive season. Our Festival Promotional Video service crafts heartwarming holiday greetings and celebratory sales teasers for Diwali, Eid, Christmas, and New Year. Combining warm traditional music, radiant illumination, and branded festive wishes that leave a lasting impression.',
  startingPrice: 699,
  currency: '₹',
  deliveryTime: '2–3 Days',
  revisionPolicy: '1 Round of Revisions',
  formats: ['MP4 (1080p Full HD)', 'Vertical 9:16', 'Horizontal 16:9'],
  heroImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=1200',
  imageType: 'video',
  imageFit: 'cover',
  imagePosition: 'center',
  galleryImages: [
    {
      title: 'Diwali Festive Lights & Wishes (20s)',
      description: 'Radiant floating brass diyas, gold particle cascades, and traditional sitar-tabla fusion score.',
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800',
      alt: 'Diwali festival celebration promotional video'
    },
    {
      title: 'Eid Mubarak Golden Crescent Reel',
      description: 'Ornate rotating 3D golden crescent, lantern glow, and heartfelt festive blessings.',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800',
      alt: 'Eid festival promotional video'
    },
    {
      title: 'Christmas & New Year Holiday Cheer',
      description: 'Glistening snow particles, warm fireplace bokeh, festive chime orchestration, and holiday sales.',
      image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=800',
      alt: 'Christmas holiday promotional video greeting'
    },
    {
      title: 'Corporate Festive Greeting & Thank You',
      description: 'Refined corporate appreciation video thanking clients and partners with company branding.',
      image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&q=80&w=800',
      alt: 'Corporate holiday festive greeting video'
    }
  ],
  whatWeCreate: [
    {
      title: 'Culturally Rich Visual Effects',
      description: 'Traditional diya illumination, rangoli reveals, golden calligraphy, and celebratory sparkles.'
    },
    {
      title: 'Brand Integration & Greetings',
      description: 'Seamlessly weaving your company logo and leadership greeting into the festive story.'
    },
    {
      title: 'Authentic Festive Audio Score',
      description: 'Licensed celebratory music capturing cultural instruments and warm joyful resonance.'
    },
    {
      title: 'Dual Social Media Deliverables',
      description: 'Vertical 9:16 for WhatsApp Status / Instagram Reels and 16:9 for YouTube / TV displays.'
    }
  ],
  whatCustomerProvides: [
    {
      title: 'Festival Name & Greeting Text',
      description: 'Festival to celebrate, custom wish message, and promotional offer if applicable.'
    },
    {
      title: 'Brand Logo (PNG)',
      description: 'Transparent high-res logo file to feature in the opening and closing animation.'
    }
  ],
  whatCustomerReceives: [
    {
      title: 'Broadcast-Ready Full HD Video (MP4)',
      description: 'Vivid high-bitrate video ready to blast on WhatsApp broadcasts and social pages.'
    },
    {
      title: 'Commercial Audio Rights Cleared',
      description: 'Peace of mind with licensed music cleared for social broadcasting.'
    },
    {
      title: '1 Revision Round',
      description: 'Wording adjustments, timing changes, or logo animation tweaks.'
    }
  ],
  uploadConfig: {
    requiredUploads: [
      {
        label: 'Festive Greeting Brief',
        description: 'Provide festival name, custom greeting message, and any promotional discount details.'
      }
    ],
    optionalUploads: [
      {
        label: 'Company Logo / Photos',
        description: 'Upload company logo PNG or team/product photos.'
      }
    ],
    acceptedFileTypes: ['image/jpeg', 'image/png', 'video/mp4', 'application/pdf', 'text/plain'],
    maxFiles: 5,
    maxFileSize: 10 * 1024 * 1024,
    maxTotalSize: 25 * 1024 * 1024
  },
  faq: [
    {
      question: 'Can we send this video directly to our clients via WhatsApp?',
      answer: 'Yes! We deliver an optimized high-definition MP4 that compresses cleanly on WhatsApp without losing clarity, making it ideal for broadcasting to your VIP client list.'
    },
    {
      question: 'Can you create regional language greetings in Tamil, Telugu, Hindi, or Gujarati?',
      answer: 'Yes! Provide your script in the regional language of your choice, and we will animate the text with elegant typography and cultural respect.'
    },
    contentPolicyFaq,
    {
      question: 'How fast is delivery?',
      answer: 'Delivered in 2 to 3 days in advance of the festive occasion.'
    }
  ],
  relatedServices: [
    'festival-offer-creative',
    'festival-invitation',
    'short-brand-video',
    'social-media-promotional-video'
  ],
  seoTitle: 'Festival Promotional Video & Holiday Greetings | AP Visual House',
  seoDescription: 'Festive video greetings and sales teasers for Diwali, Eid, and Christmas. Starting from ₹699 with 2–3 days delivery and licensed soundtrack.'
};

// 36. PRODUCT SHOWCASE VIDEO
export const productShowcaseVideoDetail: ServiceDetailData = {
  id: 'product-showcase-video',
  slug: 'product-showcase-video',
  category: 'Video',
  categorySlug: 'video-motion-ads',
  categoryId: 'video-ads',
  name: 'Product Showcase Video',
  shortDescription: 'In-depth 360° product feature showcases. Detailed mechanical demonstrations, luxury lighting sweeps, macro zoom angles, and technical capability tours.',
  longDescription: 'Display every exquisite angle and craftsmanship detail. Our Product Showcase Video service creates high-definition product exploration reels featuring slow-motion lighting sweeps, 360-degree rotation simulation, macro close-ups, and annotated feature popups that establish unmatched premium quality.',
  startingPrice: 899,
  currency: '₹',
  deliveryTime: '2–3 Days',
  revisionPolicy: '1 Round of Revisions',
  formats: ['MP4 (1080p / 4K Ultra HD)', '16:9 Landscape', '9:16 Vertical'],
  heroImage: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1200',
  imageType: 'video',
  imageFit: 'cover',
  imagePosition: 'center',
  galleryImages: [
    {
      title: 'Horology Luxury Watch Showcase (30s)',
      description: 'Slow lighting sweep across brushed steel bezel, sapphire glass reflection, and dial macro.',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800',
      alt: 'Luxury watch product showcase video'
    },
    {
      title: 'High-Performance Footwear Breakdown',
      description: 'Sole cushioning compression simulation, breathable mesh weave zoom, and kinetic rotation.',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800',
      alt: 'Sneaker product showcase breakdown video'
    },
    {
      title: 'Precision Audio Hardware Showcase',
      description: 'Metallic headphone hinge rotation, leather stitching macro, and noise-cancelling tech callout.',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800',
      alt: 'Audio headphones hardware showcase video'
    },
    {
      title: 'Artisan Glass Perfume Bottle Showcase',
      description: 'Light refraction through crystal bottle, atomizing spray mist slow-motion, and fragrance notes.',
      image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800',
      alt: 'Perfume luxury showcase video render'
    }
  ],
  whatWeCreate: [
    {
      title: 'Cinematic Studio Light Sweeps',
      description: 'Simulating high-end robotic camera moves and moving studio softbox reflections.'
    },
    {
      title: 'Macro Detail Exploration',
      description: 'Extreme close-up pans highlighting premium stitching, metallic knurling, and materials.'
    },
    {
      title: 'Technical Specification Callouts',
      description: 'Elegant on-screen data markers highlighting dimensions, weight, battery life, and materials.'
    },
    {
      title: 'Website Product Page / Amazon Video Ready',
      description: 'Formatted for Shopify product galleries, Amazon A+ Video, and Kickstarter campaigns.'
    }
  ],
  whatCustomerProvides: [
    {
      title: 'Multiple Product Angles / 3D Model',
      description: 'High-res photos of the product from front, back, sides, and close-ups, or 3D CAD/OBJ files.'
    },
    {
      title: 'Technical Specs & Material List',
      description: 'Key technical specifications and features to highlight in on-screen callouts.'
    }
  ],
  whatCustomerReceives: [
    {
      title: 'Ultra-High-Definition MP4 Master',
      description: 'Crystal-clear 1080p/4K master file showcasing your product’s premium finish.'
    },
    {
      title: 'Web Loop Version (Muted Autoplay)',
      description: 'Clean seamless loop export optimized for web development and e-commerce product pages.'
    },
    {
      title: '1 Comprehensive Revision Round',
      description: 'Adjusting camera movement speeds, callout text phrasing, or color grading.'
    }
  ],
  uploadConfig: {
    requiredUploads: [
      {
        label: 'Product Photos / 3D File',
        description: 'Upload multiple clear photos of the product from different angles or 3D files (OBJ/FBX).'
      }
    ],
    optionalUploads: [
      {
        label: 'Specs Sheet / Brand Logo',
        description: 'Upload product technical specifications document and transparent logo PNG.'
      }
    ],
    acceptedFileTypes: ['image/jpeg', 'image/png', 'video/mp4', 'application/pdf', 'application/zip'],
    maxFiles: 5,
    maxFileSize: 10 * 1024 * 1024,
    maxTotalSize: 25 * 1024 * 1024
  },
  faq: [
    {
      question: 'Can you work with 3D CAD or OBJ files for the showcase?',
      answer: 'Yes! If you have 3D CAD files (STEP, OBJ, FBX, Rhino), we can directly texture, light, and animate 360-degree turntable camera orbits with photorealistic realism.'
    },
    {
      question: 'Can this video be used as an Amazon Product Page Video or Shopify loop?',
      answer: 'Yes, 100%. We format the video to comply with Amazon Video specifications and provide an optimized seamless looping MP4 for Shopify and WooCommerce pages.'
    },
    contentPolicyFaq,
    {
      question: 'How long does a product showcase video take?',
      answer: 'Standard delivery is completed within 2 to 3 business days.'
    }
  ],
  relatedServices: [
    'product-video-ad',
    'product-advertisement',
    'product-image-enhancement',
    'short-brand-video'
  ],
  seoTitle: 'Product Showcase Video & 360 Demonstration | AP Visual House',
  seoDescription: 'High-end product showcase videos for Amazon, Shopify, and e-commerce. Macro zooms, light sweeps starting from ₹899 with 2–3 days delivery.'
};

export const videoAdsServices: Service[] = [
  {
    id: 'short-brand-video',
    categoryId: 'video-ads',
    category: 'Video',
    categorySlug: 'video-motion-ads',
    title: 'Short Brand Video',
    description: 'Cinematic 15–30s brand videos with kinetic typography, dynamic transitions, and licensed music.',
    price: 699,
    deliveryTime: '2–3 Days',
    image: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&q=80&w=800',
    slug: 'short-brand-video',
    imageType: 'video',
    imageFit: 'cover',
    imagePosition: 'center',
    detail: shortBrandVideoDetail
  },
  {
    id: 'product-video-ad',
    categoryId: 'video-ads',
    category: 'Video',
    categorySlug: 'video-motion-ads',
    title: 'Product Video Ad',
    description: 'Conversion-engineered product commercials with 3-second hooks, kinetic callouts, and direct response offers.',
    price: 799,
    deliveryTime: '2–3 Days',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800',
    slug: 'product-video-ad',
    imageType: 'video',
    imageFit: 'cover',
    imagePosition: 'center',
    detail: productVideoAdDetail
  },
  {
    id: 'social-media-promotional-video',
    categoryId: 'video-ads',
    category: 'Video',
    categorySlug: 'video-motion-ads',
    title: 'Social Media Promotional Video',
    description: 'Snappy promotional reels with word-by-word animated subtitles for flash sales, webinars, and podcasts.',
    price: 699,
    deliveryTime: '2–3 Days',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800',
    slug: 'social-media-promotional-video',
    imageType: 'video',
    imageFit: 'cover',
    imagePosition: 'center',
    detail: socialMediaPromotionalVideoDetail
  },
  {
    id: 'festival-promotional-video',
    categoryId: 'video-ads',
    category: 'Video',
    categorySlug: 'video-motion-ads',
    title: 'Festival Promotional Video',
    description: 'Heartwarming festive greetings and holiday sales teasers for Diwali, Eid, Christmas, and New Year.',
    price: 699,
    deliveryTime: '2–3 Days',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800',
    slug: 'festival-promotional-video',
    imageType: 'video',
    imageFit: 'cover',
    imagePosition: 'center',
    detail: festivalPromotionalVideoDetail
  },
  {
    id: 'product-showcase-video',
    categoryId: 'video-ads',
    category: 'Video',
    categorySlug: 'video-motion-ads',
    title: 'Product Showcase Video',
    description: 'In-depth 360° product feature showcases with macro zoom angles, light sweeps, and technical callouts.',
    price: 899,
    deliveryTime: '2–3 Days',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800',
    slug: 'product-showcase-video',
    imageType: 'video',
    imageFit: 'cover',
    imagePosition: 'center',
    detail: productShowcaseVideoDetail
  }
];
