import { Service, ServiceDetailData } from '../../types';

const contentPolicyFaq = {
  question: 'What type of content can I submit?',
  answer: "AP Visual House does not accept projects involving nudity, sexually explicit content, profanity, hate or offensive material, or other inappropriate content. Customers are responsible for ensuring that submitted files comply with this policy. If submitted material violates our Content Policy, AP Visual House may decline or discontinue the project."
};

// 1. CARTOON PORTRAIT (Approved Master Template baseline)
export const cartoonPortraitDetail: ServiceDetailData = {
  id: 'cartoon-portrait',
  slug: 'cartoon-portrait',
  category: 'AI Images',
  categorySlug: 'ai-image-creation',
  categoryId: 'ai-images',
  name: 'Cartoon Portrait',
  shortDescription: 'Transform your photos into vibrant, expressive cartoon and stylized digital portraits. Perfect for personal avatars, social profiles, and memorable creative gifts.',
  longDescription: 'At AP Visual House, we transform your supplied photographs into creative, personality-rich cartoon-style portraits. Every piece is carefully rendered to honor the unique energy, expressions, and style preferences of the subject.',
  startingPrice: 199,
  currency: '₹',
  deliveryTime: '24 Hours',
  revisionPolicy: '1 Minor Revision',
  formats: ['JPG', 'PNG'],
  heroImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1200',
  imageType: 'portrait',
  imageFit: 'cover',
  imagePosition: 'center 20%',
  galleryImages: [
    {
      title: 'Modern Stylized Character',
      description: 'Bold vibrant lines, smooth dimensional shading, and expressive eye rendering.',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800',
      alt: 'Modern stylized digital cartoon portrait illustration'
    },
    {
      title: 'Warm Whimsical Illustration',
      description: 'Soft lighting, gentle pastel tones, and playful animated character aesthetics.',
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=800',
      alt: 'Whimsical warm cartoon portrait of a smiling woman'
    },
    {
      title: 'Vibrant Pop-Art Vector Style',
      description: 'High-contrast color palettes, graphic outlines, and energetic pop-culture vibrancy.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800',
      alt: 'Vibrant pop-art cartoon portrait illustration of a man'
    },
    {
      title: 'Storybook Character Portrait',
      description: 'Rich narrative textures, painted backgrounds, and timeless storybook warmth.',
      image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=800',
      alt: 'Storybook fantasy inspired cartoon portrait'
    }
  ],
  whatWeCreate: [
    {
      title: 'Personalized Avatars',
      description: 'Distinctive stylized digital portraits tailored for profile pictures, gamer tags, and digital identity.'
    },
    {
      title: 'Custom Gift Art',
      description: 'Heartfelt, whimsical illustrations crafted for birthdays, milestones, and personal celebrations.'
    },
    {
      title: 'Couple & Duo Stylizations',
      description: 'Charming paired character portraits celebrating friendships, partnerships, and memorable bonds.'
    },
    {
      title: 'Expressive Social Visuals',
      description: 'Engaging cartoon interpretations designed to stand out on messaging platforms and social feeds.'
    }
  ],
  whatCustomerProvides: [
    {
      title: 'High-Resolution Reference Photo',
      description: 'One or two clear, well-lit photos showing facial features and natural expression clearly.'
    },
    {
      title: 'Style Direction & Mood',
      description: 'Any preference on color palette, background mood, or specific character nuances.'
    },
    {
      title: 'Desired Aspect Ratio',
      description: 'Square (1:1 for social avatars) or Portrait (4:5 or 9:16 for mobile wallpapers & prints).'
    }
  ],
  whatCustomerReceives: [
    {
      title: 'High-Resolution Digital Masters',
      description: 'Crisp 300 DPI exports in JPG and transparent PNG formats ready for print and screen.'
    },
    {
      title: 'Multi-Device Optimization',
      description: 'Calibrated for vivid color reproduction across mobile displays, monitors, and photo paper.'
    },
    {
      title: 'One Revision Round',
      description: 'Fine-tuning of minor color balances, background adjustments, or tone refinements.'
    }
  ],
  uploadConfig: {
    requiredUploads: [
      {
        label: 'Clear Reference Photo',
        description: 'Upload a clear, front-facing or three-quarter angle photograph with good lighting.'
      }
    ],
    optionalUploads: [
      {
        label: 'Alternative Angle / Expression',
        description: 'A second photo helping our artists capture unique features or smile nuances.'
      },
      {
        label: 'Style Reference / Color Notes',
        description: 'An example image or palette you love to guide the visual tone.'
      }
    ],
    acceptedFileTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/heic'],
    maxFiles: 5,
    maxFileSize: 10 * 1024 * 1024,
    maxTotalSize: 25 * 1024 * 1024
  },
  faq: [
    {
      question: 'What kind of photo works best for a cartoon portrait?',
      answer: 'Well-lit, clear photographs taken in natural daylight or bright indoor lighting work best. Avoid heavily compressed screenshots, dark shadows over facial features, or blurry group photos.'
    },
    {
      question: 'How long does delivery take?',
      answer: 'Standard delivery is completed within 24 hours from when we confirm your reference files and brief. Complex requests with multiple subjects may take up to 48 hours.'
    },
    {
      question: 'Can I request adjustments after receiving the draft?',
      answer: 'Yes. Every order includes one round of minor revisions covering color balance, lighting tones, or background subtleties. Fundamental concept overhauls or new reference photos require a fresh commission.'
    },
    contentPolicyFaq,
    {
      question: 'Can I print the cartoon portrait on canvas or merchandise?',
      answer: 'Absolutely. We deliver full 300 DPI high-resolution master files suitable for canvas printing, posters, mugs, phone cases, and apparel.'
    }
  ],
  relatedServices: [
    'creative-ai-portrait',
    'cinematic-portrait',
    'couple-portrait',
    'face-and-detail-enhancement'
  ],
  seoTitle: 'Custom Cartoon Portrait Services | AP Visual House',
  seoDescription: 'Transform your photos into expressive, high-resolution cartoon portraits. Starting from ₹199 with 24-hour delivery and personal concierge review.'
};

// 2. CREATIVE AI PORTRAIT
export const creativeAiPortraitDetail: ServiceDetailData = {
  id: 'creative-ai-portrait',
  slug: 'creative-ai-portrait',
  category: 'AI Images',
  categorySlug: 'ai-image-creation',
  categoryId: 'ai-images',
  name: 'Creative AI Portrait',
  shortDescription: 'Explore imaginative aesthetic worlds. From ethereal fantasy lighting and Renaissance oil aesthetics to futuristic neon cyberpunk styling.',
  longDescription: 'Our Creative AI Portrait service reimagines your portrait within breathtaking thematic worlds. Guided by our prompt engineers and visual artists, your likeness is blended into rich painterly textures, atmospheric lighting, and high-concept surrealism.',
  startingPrice: 299,
  currency: '₹',
  deliveryTime: '24–48 Hours',
  revisionPolicy: '1 Minor Revision',
  formats: ['JPG', 'PNG'],
  heroImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=1200',
  imageType: 'portrait',
  imageFit: 'cover',
  imagePosition: 'center 20%',
  galleryImages: [
    {
      title: 'Ethereal Renaissance Glow',
      description: 'Soft chiaroscuro lighting with oil painting brushwork and warm golden highlights.',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800',
      alt: 'Artistic creative Renaissance styled woman portrait'
    },
    {
      title: 'Neon Cyberpunk Aesthetic',
      description: 'Futuristic urban reflections, dual-tone magenta and cyan luminescence.',
      image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=800',
      alt: 'Neon cyberpunk inspired creative portrait'
    },
    {
      title: 'Vintage Botanical Oil',
      description: 'Lush organic flora framing with textured canvas grain and earthy hues.',
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=800',
      alt: 'Botanical oil painting portrait style'
    },
    {
      title: 'Cosmic Starfield Fantasy',
      description: 'Celestial dust, starlight accents, and dreamy mystical atmospheric depth.',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800',
      alt: 'Cosmic fantasy digital portrait'
    }
  ],
  whatWeCreate: [
    {
      title: 'Thematic Character Art',
      description: 'Reimagining your likeness as mythological, fantasy, or period-piece characters.'
    },
    {
      title: 'Painterly Digital Canvases',
      description: 'Rich digital oil, watercolor, and gouache simulations honoring traditional fine art.'
    },
    {
      title: 'Sci-Fi & Futuristic Styling',
      description: 'Cyberpunk, retro-futuristic, and holographic visual treatments with vivid mood lighting.'
    },
    {
      title: 'Surrealist Concept Art',
      description: 'Dreamlike compositions merging natural elements, geometric abstractions, and light play.'
    }
  ],
  whatCustomerProvides: [
    {
      title: 'Primary Portrait Photo',
      description: 'A clear photo showing eyes, hair, and facial contours without heavy filters.'
    },
    {
      title: 'Thematic Brief or Theme Choice',
      description: 'Your vision (e.g. Victorian noble, cosmic guardian, neon synthwave, fairycore).'
    },
    {
      title: 'Color Preferences',
      description: 'Guidance on preferred background tones or lighting temperature.'
    }
  ],
  whatCustomerReceives: [
    {
      title: 'High-Definition Digital Artwork',
      description: 'Delivered in ultra-high resolution (4000px+) suitable for prints, wallpapers, and social.'
    },
    {
      title: 'Color-Graded Master File',
      description: 'Professionally retouched and balanced for true-to-life contrast and vivid saturation.'
    },
    {
      title: '1 Minor Adjustment Round',
      description: 'Subtle lighting, glow, or contrast balancing according to your notes.'
    }
  ],
  uploadConfig: {
    requiredUploads: [
      {
        label: 'Source Portrait',
        description: 'Clear, well-lit photo of the subject face and shoulders.'
      }
    ],
    optionalUploads: [
      {
        label: 'Concept References',
        description: 'Mood images or styling examples that reflect your desired fantasy or artistic theme.'
      }
    ],
    acceptedFileTypes: ['image/jpeg', 'image/png', 'image/webp'],
    maxFiles: 5,
    maxFileSize: 10 * 1024 * 1024,
    maxTotalSize: 25 * 1024 * 1024
  },
  faq: [
    {
      question: 'Will I still look like myself in a creative AI portrait?',
      answer: 'Yes. Our artists focus on preserving your key facial geometry, smile, and distinctive features while wrapping your likeness in the chosen aesthetic universe.'
    },
    {
      question: 'Can I specify a specific historical or pop-culture era?',
      answer: 'Absolutely. Whether you want an 80s retro film look, Regency era grandeur, or cyberpunk cityscape, share your theme and we will execute it.'
    },
    contentPolicyFaq,
    {
      question: 'What is the delivery turnaround?',
      answer: 'Creative AI Portraits are delivered in 24 to 48 hours, allowing our studio time to synthesize, paint over, and color grade your final visual.'
    }
  ],
  relatedServices: [
    'cinematic-portrait',
    'cartoon-portrait',
    'couple-portrait',
    'professional-profile-image'
  ],
  seoTitle: 'Creative AI Portrait Art & Thematic Avatars | AP Visual House',
  seoDescription: 'Transform yourself into fantasy, vintage, or sci-fi characters. Bespoke Creative AI portraits starting from ₹299 with 24–48h turnaround.'
};

// 3. CINEMATIC PORTRAIT
export const cinematicPortraitDetail: ServiceDetailData = {
  id: 'cinematic-portrait',
  slug: 'cinematic-portrait',
  category: 'AI Images',
  categorySlug: 'ai-image-creation',
  categoryId: 'ai-images',
  name: 'Cinematic Portrait',
  shortDescription: 'Dramatic Hollywood film-still aesthetics. Masterful anamorphic lighting, shallow depth of field, atmospheric haze, and moody color grading.',
  longDescription: 'Turn ordinary snapshots into movie poster stills. Our Cinematic Portrait service applies advanced directional lighting, volumetric fog, rim lights, and 35mm film grain to produce striking, emotive visual drama.',
  startingPrice: 399,
  currency: '₹',
  deliveryTime: '24–48 Hours',
  revisionPolicy: '1 Minor Revision',
  formats: ['JPG', 'PNG'],
  heroImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=1200',
  imageType: 'portrait',
  imageFit: 'cover',
  imagePosition: 'center 20%',
  galleryImages: [
    {
      title: 'Noir Shadow & Rim Light',
      description: 'High-contrast black-and-white tonal depth with sharp edge highlights.',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800',
      alt: 'Dramatic noir cinematic portrait of a man'
    },
    {
      title: 'Golden Hour Film Still',
      description: 'Warm natural sun flare, amber rim lighting, and organic 35mm texture.',
      image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=800',
      alt: 'Golden hour cinematic film portrait'
    },
    {
      title: 'Moody Editorial Chiaroscuro',
      description: 'Sculpted cheekbone shadows, deep emerald and teal background undertones.',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800',
      alt: 'Moody editorial dramatic cinematic portrait'
    },
    {
      title: 'Urban Rain & Streetlight Bokeh',
      description: 'Reflective wet pavement tones, neon diffusion, and cinematic depth blur.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800',
      alt: 'Urban atmospheric cinematic portrait'
    }
  ],
  whatWeCreate: [
    {
      title: 'Movie Poster Key Visuals',
      description: 'High-impact keyframe compositions with cinematic typography and atmospheric depth.'
    },
    {
      title: 'Editorial Dramatic Stills',
      description: 'Sculpted lighting setups replicating anamorphic cinema lenses and film stock.'
    },
    {
      title: 'Moody Character Studies',
      description: 'Intense, emotionally resonant character captures with realistic skin micro-details.'
    },
    {
      title: 'Atmospheric Environmental Backdrops',
      description: 'Cinematic environments such as misty forests, rainy streets, or retro lounges.'
    }
  ],
  whatCustomerProvides: [
    {
      title: 'High-Clarity Face Photo',
      description: 'A crisp photo with natural expression and visible eyes.'
    },
    {
      title: 'Cinematic Mood Choice',
      description: 'Desired mood (e.g. Classic Noir, Warm Golden Romance, Moody Thriller, Sci-Fi Mystery).'
    }
  ],
  whatCustomerReceives: [
    {
      title: 'Cinematic Master Export',
      description: 'High-resolution image with professional LUT color grading and film grain.'
    },
    {
      title: 'Multiple Framing Formats',
      description: '16:9 cinematic widescreen crop and 4:5 social media crop.'
    },
    {
      title: '1 Tone Refinement Round',
      description: 'Fine-tuning of the color grade, shadows, and highlight warmth.'
    }
  ],
  uploadConfig: {
    requiredUploads: [
      {
        label: 'Source Photograph',
        description: 'Upload a well-lit photo of the subject face and shoulders.'
      }
    ],
    acceptedFileTypes: ['image/jpeg', 'image/png', 'image/webp'],
    maxFiles: 4,
    maxFileSize: 10 * 1024 * 1024,
    maxTotalSize: 25 * 1024 * 1024
  },
  faq: [
    {
      question: 'What makes a portrait "cinematic"?',
      answer: 'Cinematic portraits employ techniques from film cinematography: three-point sculpted lighting, anamorphic aspect ratios, shallow depth of field (creamy bokeh), atmospheric haze, and Hollywood color grading.'
    },
    {
      question: 'Can I request a movie poster format with title text?',
      answer: 'Yes! Let us know during upload or on WhatsApp if you would like custom cinematic title text and billing block credits added.'
    },
    contentPolicyFaq,
    {
      question: 'What is the turnaround time?',
      answer: 'Cinematic portraits take 24–48 hours to ensure meticulous manual lighting sculpting and color grading.'
    }
  ],
  relatedServices: [
    'creative-ai-portrait',
    'professional-profile-image',
    'cartoon-portrait',
    'short-brand-video'
  ],
  seoTitle: 'Cinematic Portrait Photography & Visual Art | AP Visual House',
  seoDescription: 'Transform your photos into dramatic film stills with anamorphic lighting and cinematic grading. Starting from ₹399 with 24–48h delivery.'
};

// 4. PROFESSIONAL PROFILE IMAGE
export const professionalProfileImageDetail: ServiceDetailData = {
  id: 'professional-profile-image',
  slug: 'professional-profile-image',
  category: 'AI Images',
  categorySlug: 'ai-image-creation',
  categoryId: 'ai-images',
  name: 'Professional Profile Image',
  shortDescription: 'Elevate your LinkedIn, resume, and corporate persona. Crisp studio lighting, polished business attire, distraction-free backgrounds, and approachable confidence.',
  longDescription: 'You only get one chance to make a first impression. Our Professional Profile Image service transforms casual or home snapshots into pristine, boardroom-ready executive headshots. We refine lighting, add tailored business attire, and smooth background clutter while preserving your natural identity.',
  startingPrice: 299,
  currency: '₹',
  deliveryTime: '24 Hours',
  revisionPolicy: '1 Minor Revision',
  formats: ['JPG', 'PNG'],
  heroImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1200',
  imageType: 'portrait',
  imageFit: 'cover',
  imagePosition: 'center 20%',
  galleryImages: [
    {
      title: 'Executive Studio Portrait',
      description: 'Crisp grey textured studio backdrop, sharp business blazer, and gentle softbox lighting.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800',
      alt: 'Professional executive businesswoman headshot'
    },
    {
      title: 'Modern Tech & Startup Headshot',
      description: 'Soft blurred architectural office background with relaxed professional blazer attire.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800',
      alt: 'Modern tech executive professional profile image'
    },
    {
      title: 'Clean Minimalist White Studio',
      description: 'Pure neutral background calibrated for corporate directories and speaking panels.',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800',
      alt: 'Clean studio corporate headshot woman'
    },
    {
      title: 'Consultant & Speaker Portrait',
      description: 'Warm natural window light, subtle depth, and approachable executive presence.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800',
      alt: 'Approachable corporate consultant headshot'
    }
  ],
  whatWeCreate: [
    {
      title: 'LinkedIn Headshots',
      description: 'Optimized circle-crop headshots that build trust and engagement with recruiters and clients.'
    },
    {
      title: 'Corporate Directory Portraits',
      description: 'Standardized, polished executive photos for company team pages and press releases.'
    },
    {
      title: 'Conference & Speaker Bios',
      description: 'High-definition portraits ready for keynote brochures, panel flyers, and media kits.'
    },
    {
      title: 'Digital Business Card Visuals',
      description: 'Clean cutouts with subtle dropshadows suitable for email signatures and vCards.'
    }
  ],
  whatCustomerProvides: [
    {
      title: 'Casual or Current Headshot',
      description: 'A photo with clear lighting on your face. Even a phone selfie against a plain wall works!'
    },
    {
      title: 'Attire & Background Preference',
      description: 'Formal suit, smart casual, modern blazer, or neutral studio/office backdrop.'
    }
  ],
  whatCustomerReceives: [
    {
      title: 'High-Res Headshot Package',
      description: '300 DPI master image, square avatar crop, and transparent PNG cutout.'
    },
    {
      title: 'Blemish & Glare Retouching',
      description: 'Natural skin smoothing, flyaway hair reduction, and eyeglasses glare reduction.'
    },
    {
      title: '1 Minor Polish Round',
      description: 'Lighting balance, collar adjustment, or backdrop tone refinement.'
    }
  ],
  uploadConfig: {
    requiredUploads: [
      {
        label: 'Current Photo / Selfie',
        description: 'A clear photo showing your face and shoulders looking toward the camera.'
      }
    ],
    optionalUploads: [
      {
        label: 'Preferred Attire / Background Reference',
        description: 'Optional example of the jacket style or office backdrop you prefer.'
      }
    ],
    acceptedFileTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/heic'],
    maxFiles: 3,
    maxFileSize: 10 * 1024 * 1024,
    maxTotalSize: 25 * 1024 * 1024
  },
  faq: [
    {
      question: 'Can you change my casual t-shirt into a formal business suit?',
      answer: 'Yes! That is one of our most popular requests. We can realistically clothe you in tailored business suits, blazers, dress shirts, or smart casual wear of your choice.'
    },
    {
      question: 'Will the photo look fake or overly airbrushed?',
      answer: 'No. Our team takes pride in photorealistic authenticity. We retain natural skin texture, freckles, and smile lines so you look genuine and recognizable.'
    },
    contentPolicyFaq,
    {
      question: 'How quickly will I receive my headshot?',
      answer: 'Standard professional headshots are delivered within 24 hours.'
    }
  ],
  relatedServices: [
    'face-and-detail-enhancement',
    'photo-enhancement',
    'cinematic-portrait',
    'creative-ai-portrait'
  ],
  seoTitle: 'Professional LinkedIn Profile Headshots | AP Visual House',
  seoDescription: 'Transform casual photos into executive corporate headshots. Tailored attire, studio lighting, starting from ₹299 with 24-hour turnaround.'
};

// 5. COUPLE PORTRAIT
export const couplePortraitDetail: ServiceDetailData = {
  id: 'couple-portrait',
  slug: 'couple-portrait',
  category: 'AI Images',
  categorySlug: 'ai-image-creation',
  categoryId: 'ai-images',
  name: 'Couple Portrait',
  shortDescription: 'Celebrate your shared bond. Romantic destinations, golden hour warmth, festive traditional attire, or artistic illustration styles crafted for two.',
  longDescription: 'Commemorate your love story with a bespoke Couple Portrait. Whether celebrating an engagement, wedding anniversary, Valentine’s Day, or simply honoring your journey together, we place you both in stunning destinations with harmonious lighting and heartfelt warmth.',
  startingPrice: 399,
  currency: '₹',
  deliveryTime: '24–48 Hours',
  revisionPolicy: '1 Minor Revision',
  formats: ['JPG', 'PNG'],
  heroImage: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=1200',
  imageType: 'portrait',
  imageFit: 'cover',
  imagePosition: 'center 20%',
  galleryImages: [
    {
      title: 'Sunset Beach Romance',
      description: 'Golden hour oceanic reflections, gentle breeze effects, and warm romantic embrace.',
      image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=800',
      alt: 'Romantic couple portrait at sunset'
    },
    {
      title: 'Traditional Wedding Splendor',
      description: 'Rich ethnic silk sherwanis and lehengas set against royal palace architecture.',
      image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=800',
      alt: 'Couple in festive traditional wedding attire'
    },
    {
      title: 'Whimsical Cartoon Pair',
      description: 'Charming stylized character duo illustration with vibrant celebratory accents.',
      image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&q=80&w=800',
      alt: 'Stylized artistic couple portrait'
    },
    {
      title: 'Vintage European Cafe',
      description: 'Cozy cobblestone street cafe scene with warm streetlamp glow and retro romance.',
      image: 'https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&q=80&w=800',
      alt: 'Couple portrait in romantic European cafe setting'
    }
  ],
  whatWeCreate: [
    {
      title: 'Anniversary & Engagement Keepsakes',
      description: 'Artistic commemorations of milestone moments formatted for framing.'
    },
    {
      title: 'Destination Fantasy Backdrops',
      description: 'Placing you together in Paris, Swiss Alps, tropical beaches, or royal forts.'
    },
    {
      title: 'Festive & Traditional Attire Styling',
      description: 'Visualizing you both in opulent festive attire for festive cards and invites.'
    },
    {
      title: 'Stylized Cartoon & Painting Duos',
      description: 'Playful character versions of both partners for home decor and social sharing.'
    }
  ],
  whatCustomerProvides: [
    {
      title: 'Photos of Both Individuals',
      description: 'Can be a single photo of you together, or two separate clear photos of each person!'
    },
    {
      title: 'Setting & Style Vision',
      description: 'Preferred destination, romantic lighting style, or requested attire.'
    }
  ],
  whatCustomerReceives: [
    {
      title: 'High-Resolution Framable Artwork',
      description: 'Print-ready file at 300 DPI suitable for large canvas or photo frames.'
    },
    {
      title: 'Harmonized Lighting & Color',
      description: 'Seamless blending of both subjects with consistent shadows and perspective.'
    },
    {
      title: '1 Minor Revision Round',
      description: 'Adjustment of smile warmth, lighting balance, or color tone.'
    }
  ],
  uploadConfig: {
    requiredUploads: [
      {
        label: 'Photo(s) of the Couple',
        description: 'Upload a photo together or individual clear photos of each person.'
      }
    ],
    optionalUploads: [
      {
        label: 'Desired Setting or Background',
        description: 'Reference photo of a favorite vacation spot or romantic dream destination.'
      }
    ],
    acceptedFileTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/heic'],
    maxFiles: 5,
    maxFileSize: 10 * 1024 * 1024,
    maxTotalSize: 25 * 1024 * 1024
  },
  faq: [
    {
      question: 'Can you combine two separate photos into one couple portrait?',
      answer: 'Yes! If you do not have a great photo together, simply upload clear separate photos of each person. Our artists seamlessly blend both subjects into a unified scene with matching lighting.'
    },
    {
      question: 'Can we change our clothing in the portrait?',
      answer: 'Yes. You can request royal wedding wear, evening formal wear, beach casuals, or traditional ethnic attire.'
    },
    contentPolicyFaq,
    {
      question: 'How long does a couple portrait take?',
      answer: 'Couple portraits are delivered in 24 to 48 hours to ensure both faces and bodies are meticulously rendered and harmonized.'
    }
  ],
  relatedServices: [
    'family-creative-portrait',
    'engagement-invitation',
    'wedding-invitation',
    'cartoon-portrait'
  ],
  seoTitle: 'Custom Couple Portraits & Romantic Art | AP Visual House',
  seoDescription: 'Create unforgettable romantic couple portraits in scenic destinations and royal attire. Starting from ₹399 with 24–48h delivery.'
};

// 6. FAMILY CREATIVE PORTRAIT
export const familyCreativePortraitDetail: ServiceDetailData = {
  id: 'family-creative-portrait',
  slug: 'family-creative-portrait',
  category: 'AI Images',
  categorySlug: 'ai-image-creation',
  categoryId: 'ai-images',
  name: 'Family Creative Portrait',
  shortDescription: 'Unite generations in a timeless heirloom. Seamlessly combine individual family members into unified festive portraits, heritage scenes, or illustrated keepsakes.',
  longDescription: 'Getting the whole family in one room with perfect lighting and smiling faces is rare. Our Family Creative Portrait service takes separate photos of parents, children, and grandparents, blending everyone into a harmonious, photorealistic or artistic generational portrait.',
  startingPrice: 499,
  currency: '₹',
  deliveryTime: '24–48 Hours',
  revisionPolicy: '1 Minor Revision',
  formats: ['JPG', 'PNG'],
  heroImage: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=1200',
  imageType: 'portrait',
  imageFit: 'cover',
  imagePosition: 'center 20%',
  galleryImages: [
    {
      title: 'Festive Generational Gathering',
      description: 'Three generations unified in traditional festive attire with warm ambient lighting.',
      image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=800',
      alt: 'Family generation portrait gathering'
    },
    {
      title: 'Modern Outdoor Garden Portrait',
      description: 'Sunlit green meadow setting with coordinated earth-tone outfits and relaxed smiles.',
      image: 'https://images.unsplash.com/photo-1542037104857-ffbb0b9155fb?auto=format&fit=crop&q=80&w=800',
      alt: 'Happy family outdoor creative portrait'
    },
    {
      title: 'Whimsical Family Cartoon Suite',
      description: 'Delightful storybook illustration capturing parents, kids, and family pets.',
      image: 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?auto=format&fit=crop&q=80&w=800',
      alt: 'Stylized family cartoon portrait'
    },
    {
      title: 'Classic Heritage Studio Canvas',
      description: 'Formal heritage styling with deep mahogany textures and classic studio rim lighting.',
      image: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&q=80&w=800',
      alt: 'Classic heritage family studio portrait'
    }
  ],
  whatWeCreate: [
    {
      title: 'Generational Wall Art',
      description: 'Large-scale heirloom portraits bringing grandparents, parents, and children together.'
    },
    {
      title: 'Holiday & Festival Family Cards',
      description: 'Custom family greeting visuals tailored for Diwali, New Year, or Christmas.'
    },
    {
      title: 'Memorial Tribute Portraits',
      description: 'Respectfully adding loved ones who have passed into current family moments.'
    },
    {
      title: 'Pet-Inclusive Compositions',
      description: 'Harmoniously including beloved family dogs or cats alongside family members.'
    }
  ],
  whatCustomerProvides: [
    {
      title: 'Photos of Each Family Member',
      description: 'Upload individual or group photos. Clear faces and eyes ensure the best likeness.'
    },
    {
      title: 'Composition & Background Notes',
      description: 'Preferred seating/standing arrangement, home living room, garden, or festive set.'
    }
  ],
  whatCustomerReceives: [
    {
      title: 'Ultra-High-Resolution Canvas Master',
      description: 'Master file at 300 DPI suitable for large framing (24x36 inches and beyond).'
    },
    {
      title: 'Balanced Perspective & Natural Proportion',
      description: 'Every family member scaled accurately with consistent environmental lighting.'
    },
    {
      title: '1 Minor Revision Round',
      description: 'Facial expression tweaks or slight positioning refinements.'
    }
  ],
  uploadConfig: {
    requiredUploads: [
      {
        label: 'Family Member Photos',
        description: 'Upload photos of all family members to be featured (individual photos welcome).'
      }
    ],
    optionalUploads: [
      {
        label: 'Pet Photos / Background Ideas',
        description: 'Optional photos of family pets or preferred living room/garden setting.'
      }
    ],
    acceptedFileTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/heic'],
    maxFiles: 5,
    maxFileSize: 10 * 1024 * 1024,
    maxTotalSize: 25 * 1024 * 1024
  },
  faq: [
    {
      question: 'Can you include a deceased loved one in the family portrait?',
      answer: 'Yes. We treat memorial additions with the utmost care and respect, blending past vintage photos naturally into current family photos with matching light and color.'
    },
    {
      question: 'How many people can be in one portrait?',
      answer: 'Our base package covers up to 4 subjects. Additional family members can easily be included for a modest nominal fee per person.'
    },
    contentPolicyFaq,
    {
      question: 'What is the turnaround time for a multi-person family portrait?',
      answer: 'Due to the complexity of blending multiple subjects with unified perspective, family portraits take 24 to 48 hours.'
    }
  ],
  relatedServices: [
    'couple-portrait',
    'old-photo-restoration',
    'cartoon-portrait',
    'anniversary-invitation'
  ],
  seoTitle: 'Custom Family Creative Portraits & Generational Art | AP Visual House',
  seoDescription: 'Unite your family in a bespoke digital portrait. Combine separate photos into one heirloom canvas starting from ₹499 with 24–48h delivery.'
};

export const aiImageServices: Service[] = [
  {
    id: 'cartoon-portrait',
    categoryId: 'ai-images',
    category: 'AI Images',
    categorySlug: 'ai-image-creation',
    title: 'Cartoon Portrait',
    description: 'Turn your photos into expressive, vibrant cartoon and stylized digital portraits with personalized character details.',
    price: 199,
    deliveryTime: '24 Hours',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800',
    slug: 'cartoon-portrait',
    imageType: 'portrait',
    imageFit: 'cover',
    imagePosition: 'center 20%',
    detail: cartoonPortraitDetail
  },
  {
    id: 'creative-ai-portrait',
    categoryId: 'ai-images',
    category: 'AI Images',
    categorySlug: 'ai-image-creation',
    title: 'Creative AI Portrait',
    description: 'Explore imaginative worlds—from Renaissance oil painting to neon cyberpunk and ethereal fantasy lighting.',
    price: 299,
    deliveryTime: '24–48 Hours',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800',
    slug: 'creative-ai-portrait',
    imageType: 'portrait',
    imageFit: 'cover',
    imagePosition: 'center 20%',
    detail: creativeAiPortraitDetail
  },
  {
    id: 'cinematic-portrait',
    categoryId: 'ai-images',
    category: 'AI Images',
    categorySlug: 'ai-image-creation',
    title: 'Cinematic Portrait',
    description: 'Dramatic Hollywood film stills with anamorphic lighting, shallow depth of field, and rich color grading.',
    price: 399,
    deliveryTime: '24–48 Hours',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800',
    slug: 'cinematic-portrait',
    imageType: 'portrait',
    imageFit: 'cover',
    imagePosition: 'center 20%',
    detail: cinematicPortraitDetail
  },
  {
    id: 'professional-profile-image',
    categoryId: 'ai-images',
    category: 'AI Images',
    categorySlug: 'ai-image-creation',
    title: 'Professional Profile Image',
    description: 'Elevate your LinkedIn, resume, and corporate profile with clean studio lighting, sharp attire, and confidence.',
    price: 299,
    deliveryTime: '24 Hours',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800',
    slug: 'professional-profile-image',
    imageType: 'portrait',
    imageFit: 'cover',
    imagePosition: 'center 20%',
    detail: professionalProfileImageDetail
  },
  {
    id: 'couple-portrait',
    categoryId: 'ai-images',
    category: 'AI Images',
    categorySlug: 'ai-image-creation',
    title: 'Couple Portrait',
    description: 'Celebrate your shared bond with romantic destinations, golden hour lighting, or artistic illustration styles.',
    price: 399,
    deliveryTime: '24–48 Hours',
    image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=800',
    slug: 'couple-portrait',
    imageType: 'portrait',
    imageFit: 'cover',
    imagePosition: 'center 20%',
    detail: couplePortraitDetail
  },
  {
    id: 'family-creative-portrait',
    categoryId: 'ai-images',
    category: 'AI Images',
    categorySlug: 'ai-image-creation',
    title: 'Family Creative Portrait',
    description: 'Unite generations in a timeless heirloom. Seamlessly combine individual photos into a harmonious family portrait.',
    price: 499,
    deliveryTime: '24–48 Hours',
    image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=800',
    slug: 'family-creative-portrait',
    imageType: 'portrait',
    imageFit: 'cover',
    imagePosition: 'center 20%',
    detail: familyCreativePortraitDetail
  }
];
