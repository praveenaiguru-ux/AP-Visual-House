import { Service, ServiceDetailData } from '../../types';

const contentPolicyFaq = {
  question: 'What type of content can I submit?',
  answer: "AP Visual House does not accept projects involving nudity, sexually explicit content, profanity, hate or offensive material, or other inappropriate content. Customers are responsible for ensuring that submitted files comply with this policy. If submitted material violates our Content Policy, AP Visual House may decline or discontinue the project."
};

// 18. BIRTHDAY INVITATION
export const birthdayInvitationDetail: ServiceDetailData = {
  id: 'birthday-invitation',
  slug: 'birthday-invitation',
  category: 'Invitations',
  categorySlug: 'invitations-events',
  categoryId: 'invitations',
  name: 'Birthday Invitation',
  shortDescription: 'Joyful, vibrant birthday invitations for all ages. Whimsical cartoon themes for kids, elegant milestones for adults, and mobile-friendly WhatsApp cards.',
  longDescription: 'Set the celebratory tone from the very first invite. Our Birthday Invitation service crafts playful, personalized digital cards for kids (superheroes, princesses, jungle safari, cartoon themes) or sophisticated milestone cards for adults (18th, 30th, 50th, 60th birthdays) formatted for instant WhatsApp sharing and print.',
  startingPrice: 399,
  currency: '₹',
  deliveryTime: '24–48 Hours',
  revisionPolicy: '1 Minor Revision',
  formats: ['JPG', 'PNG', 'PDF'],
  heroImage: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=1200',
  imageType: 'invitation',
  imageFit: 'cover',
  imagePosition: 'center',
  galleryImages: [
    {
      title: 'Enchanted Kingdom Kids Theme',
      description: 'Pastel fairytale castle, playful typography, and personalized photo frame.',
      image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=800',
      alt: 'Kids birthday party invitation card design'
    },
    {
      title: 'Sophisticated Milestone Gold & Black',
      description: 'Opulent art-deco champagne typography and foil accents for adult milestone birthdays.',
      image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&q=80&w=800',
      alt: 'Elegant adult milestone birthday invitation'
    },
    {
      title: 'Jungle Safari Adventure',
      description: 'Vibrant animal illustrations, tropical greenery, and fun itinerary details.',
      image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80&w=800',
      alt: 'Jungle safari kids party invitation design'
    },
    {
      title: 'Modern Minimalist Photo Card',
      description: 'Clean typography framing a radiant portrait of the birthday celebrant.',
      image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=800',
      alt: 'Modern minimalist birthday invitation photo card'
    }
  ],
  whatWeCreate: [
    {
      title: 'Custom Thematic Graphics',
      description: 'Bespoke illustrations aligned with your party theme (superheroes, cartoons, florals, vintage).'
    },
    {
      title: 'Mobile-First WhatsApp Layout',
      description: 'Vertical 9:16 format designed to fill smartphone screens without awkward horizontal pinching.'
    },
    {
      title: 'Clickable RSVP / Location Link Ready',
      description: 'PDF version formatted with clickable Google Maps venue links for guest convenience.'
    },
    {
      title: 'High-Resolution Print-Ready File',
      description: '300 DPI master file suitable for professional paper or cardstock printing.'
    }
  ],
  whatCustomerProvides: [
    {
      title: 'Event Details & Copy',
      description: 'Celebrant name, age/turning year, date, time, venue address, and RSVP phone numbers.'
    },
    {
      title: 'Theme & Photo (Optional)',
      description: 'Preferred party theme or colors, and a clear photo of the birthday boy/girl if desired.'
    }
  ],
  whatCustomerReceives: [
    {
      title: 'WhatsApp-Optimized High-Res JPG',
      description: 'Crisp image file calibrated for fast loading and crystal clear text on mobile messengers.'
    },
    {
      title: 'Print-Ready PDF Master',
      description: 'Full-bleed vector/raster composite file ready for local card printers.'
    },
    {
      title: '1 Minor Detail Revision Round',
      description: 'Text corrections (time, phone number, address) or slight color adjustments.'
    }
  ],
  uploadConfig: {
    requiredUploads: [
      {
        label: 'Event Details / Text Brief',
        description: 'Provide birthday person name, age, date, time, venue, and RSVP info (or upload a text/word doc).'
      }
    ],
    optionalUploads: [
      {
        label: 'Celebrant Photo / Theme Reference',
        description: 'Optional photo of the birthday boy/girl or screenshot of a style you like.'
      }
    ],
    acceptedFileTypes: ['image/jpeg', 'image/png', 'application/pdf', 'text/plain', 'application/msword'],
    maxFiles: 4,
    maxFileSize: 10 * 1024 * 1024,
    maxTotalSize: 25 * 1024 * 1024
  },
  faq: [
    {
      question: 'Can you include a photo of my child in the invitation?',
      answer: 'Yes! We love integrating photos. We can cut out your child’s photo, enhance the lighting, and place them seamlessly into the themed illustration background.'
    },
    {
      question: 'Can we include a clickable Google Maps link in the card?',
      answer: 'Yes! If you distribute the PDF version, we can embed active hyperlinks directly into the venue address so guests can tap and navigate immediately.'
    },
    contentPolicyFaq,
    {
      question: 'How quickly will I receive the birthday invitation?',
      answer: 'Initial drafts are delivered within 24 hours (up to 48 hours for complex custom illustration briefs).'
    }
  ],
  relatedServices: [
    'naming-ceremony-invitation',
    'anniversary-invitation',
    'cartoon-portrait',
    'festival-invitation'
  ],
  seoTitle: 'Custom Birthday Invitation Card Design | AP Visual House',
  seoDescription: 'Personalized digital birthday invitations for kids and adults. WhatsApp ready, print-ready PDF starting from ₹399 with 24–48h delivery.'
};

// 19. WEDDING INVITATION
export const weddingInvitationDetail: ServiceDetailData = {
  id: 'wedding-invitation',
  slug: 'wedding-invitation',
  category: 'Invitations',
  categorySlug: 'invitations-events',
  categoryId: 'invitations',
  name: 'Wedding Invitation',
  shortDescription: 'Royal, opulent, and contemporary digital wedding invitation suites. Multi-event itineraries (Haldi, Mehendi, Sangeet, Muhurtham, Reception) crafted with elegance.',
  longDescription: 'Announce your sacred union with timeless grandeur. Our Wedding Invitation service designs bespoke digital invitations celebrating Indian traditions and modern aesthetics. From gold-embossed royal motifs and watercolor florals to multi-page digital event booklets, we create invitations your guests will treasure.',
  startingPrice: 499,
  currency: '₹',
  deliveryTime: '24–48 Hours',
  revisionPolicy: '1 Minor Revision',
  formats: ['JPG', 'PNG', 'PDF'],
  heroImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200',
  imageType: 'invitation',
  imageFit: 'cover',
  imagePosition: 'center',
  galleryImages: [
    {
      title: 'Royal Regal Palace Motifs',
      description: 'Gold foil filigree, peacock motifs, and ornate royal palace arches.',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800',
      alt: 'Royal Indian wedding invitation design'
    },
    {
      title: 'Modern Botanical Watercolor Suite',
      description: 'Hand-painted eucalyptus leaves, dusty rose florals, and elegant calligraphy.',
      image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=800',
      alt: 'Botanical floral wedding invitation stationery'
    },
    {
      title: 'Multi-Event Itinerary Suite',
      description: 'Coordinated visual palette across Haldi, Mehendi, Sangeet, and Reception pages.',
      image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=800',
      alt: 'Wedding ceremony celebration suite'
    },
    {
      title: 'Minimalist Monogram & Foil Accent',
      description: 'Understated luxury with bespoke interlocking couple initials and textured paper feel.',
      image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=800',
      alt: 'Minimalist monogram wedding invitation card'
    }
  ],
  whatWeCreate: [
    {
      title: 'Bespoke Couple Monogram',
      description: 'Custom intertwined initials logo designed specifically for the bride and groom.'
    },
    {
      title: 'Multi-Page Event Itinerary Cards',
      description: 'Coordinated cards for Haldi, Mehendi, Sangeet, Wedding, and Reception ceremonies.'
    },
    {
      title: 'Mobile Interactive PDF with Maps',
      description: 'Digital card with active tap-to-open Google Maps links and calendar reminders.'
    },
    {
      title: '300 DPI Fine-Art Print Files',
      description: 'High-res master exports ready for physical foil stamping and heavy cardstock printing.'
    }
  ],
  whatCustomerProvides: [
    {
      title: 'Bride & Groom Names & Parents',
      description: 'Full names, family lineage details if traditional, and wedding dates/timings.'
    },
    {
      title: 'Ceremony Schedule & Venues',
      description: 'Dates, locations, dress codes, and Google Maps venue links for each function.'
    }
  ],
  whatCustomerReceives: [
    {
      title: 'Complete Digital Invitation Package',
      description: 'WhatsApp-ready image cards, multi-page digital booklet, and print-ready PDF.'
    },
    {
      title: 'Couple Monogram Badge',
      description: 'Transparent high-res monogram PNG to use on wedding favors, menus, and signage.'
    },
    {
      title: '1 Comprehensive Text Revision',
      description: 'Meticulous verification and correction of dates, names, mantras, and timings.'
    }
  ],
  uploadConfig: {
    requiredUploads: [
      {
        label: 'Wedding Schedule & Names',
        description: 'Provide couple names, family details, ceremony dates, times, and venue addresses.'
      }
    ],
    optionalUploads: [
      {
        label: 'Couple Photo / Theme Mood Board',
        description: 'Optional pre-wedding photoshoot picture or style preferences (e.g. pastel vs royal).'
      }
    ],
    acceptedFileTypes: ['image/jpeg', 'image/png', 'application/pdf', 'text/plain', 'application/msword'],
    maxFiles: 5,
    maxFileSize: 10 * 1024 * 1024,
    maxTotalSize: 25 * 1024 * 1024
  },
  faq: [
    {
      question: 'Can you include sacred mantras or traditional religious shlokas?',
      answer: 'Yes! We frequently integrate Sanskrit shlokas, Ganesh Vandana, Bismillah calligraphy, biblical verses, or custom auspicious poetry in regional languages.'
    },
    {
      question: 'How many functions can be included in the invitation?',
      answer: 'Our standard package includes a main invitation card plus up to two function details. Multi-page wedding suites covering 4 to 6 ceremonies (Haldi, Mehendi, Sangeet, Reception) can easily be accommodated.'
    },
    contentPolicyFaq,
    {
      question: 'Can I print this on physical cardstock later?',
      answer: 'Yes! We deliver print-ready 300 DPI CMYK PDF files with crop marks on request so your local printer can execute flawless physical prints.'
    }
  ],
  relatedServices: [
    'engagement-invitation',
    'anniversary-invitation',
    'couple-portrait',
    'short-brand-video'
  ],
  seoTitle: 'Luxury Digital Wedding Invitation Cards | AP Visual House',
  seoDescription: 'Bespoke digital wedding invitation suites and WhatsApp cards with royal motifs. Starting from ₹499 with 24–48h delivery and print-ready files.'
};

// 20. ENGAGEMENT INVITATION
export const engagementInvitationDetail: ServiceDetailData = {
  id: 'engagement-invitation',
  slug: 'engagement-invitation',
  category: 'Invitations',
  categorySlug: 'invitations-events',
  categoryId: 'invitations',
  name: 'Engagement Invitation',
  shortDescription: 'Charming ring ceremony and engagement announcement cards. Celebrate the formal promise of love with romantic floral accents, ring motifs, and couple photos.',
  longDescription: 'Celebrate the milestone of two hearts deciding on forever. Our Engagement Invitation service creates romantic digital cards for ring exchange ceremonies, Roka celebrations, and formal engagement soirees with bespoke typography and mobile-friendly layouts.',
  startingPrice: 399,
  currency: '₹',
  deliveryTime: '24–48 Hours',
  revisionPolicy: '1 Minor Revision',
  formats: ['JPG', 'PNG', 'PDF'],
  heroImage: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=1200',
  imageType: 'invitation',
  imageFit: 'cover',
  imagePosition: 'center',
  galleryImages: [
    {
      title: 'Romantic Ring Motif & Gold Foil',
      description: 'Subtle interlocking ring emblem with warm golden lighting and delicate script.',
      image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=800',
      alt: 'Romantic engagement ring ceremony card'
    },
    {
      title: 'Couple Photo Editorial Layout',
      description: 'Elegant framed portrait of the couple with modern minimalist typography.',
      image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=800',
      alt: 'Couple photo engagement announcement card'
    },
    {
      title: 'Pastel Garden Celebration Card',
      description: 'Soft blush pink florals, gold dust texture, and graceful ceremony timings.',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800',
      alt: 'Pastel floral engagement invitation'
    },
    {
      title: 'Traditional Roka / Nishchithartham Suite',
      description: 'Auspicious traditional motifs with royal marigold borders and formal family honors.',
      image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=800',
      alt: 'Traditional Indian engagement card'
    }
  ],
  whatWeCreate: [
    {
      title: 'Ring Ceremony Announcement Visuals',
      description: 'Tasteful digital stationery highlighting the ring exchange date, venue, and time.'
    },
    {
      title: 'Couple Photo Retouch & Placement',
      description: 'Professional color grading of the couple’s photo to match the card’s floral palette.'
    },
    {
      title: 'WhatsApp Vertical 9:16 Format',
      description: 'Optimized for high-clarity viewing on WhatsApp, Instagram Stories, and SMS.'
    },
    {
      title: 'Clickable Location Links',
      description: 'Interactive PDF option directing guests directly to the engagement banquet hall.'
    }
  ],
  whatCustomerProvides: [
    {
      title: 'Couple Names & Event Details',
      description: 'Names of the bride and groom-to-be, date, time, venue, and family RSVP contacts.'
    },
    {
      title: 'Couple Photograph (Optional)',
      description: 'A photo of the couple together to be featured on the card.'
    }
  ],
  whatCustomerReceives: [
    {
      title: 'Full-Resolution WhatsApp Card (JPG)',
      description: 'Optimized digital card for instant messaging and social sharing.'
    },
    {
      title: 'Print-Ready PDF Master',
      description: '300 DPI vector file suitable for physical printing if desired.'
    },
    {
      title: '1 Minor Detail Revision Round',
      description: 'Corrections to timings, spelling, or photo placement.'
    }
  ],
  uploadConfig: {
    requiredUploads: [
      {
        label: 'Engagement Event Details',
        description: 'Provide couple names, ceremony date, time, venue address, and RSVP info.'
      }
    ],
    optionalUploads: [
      {
        label: 'Couple Photo',
        description: 'Upload a clear photo of the couple to feature on the card.'
      }
    ],
    acceptedFileTypes: ['image/jpeg', 'image/png', 'application/pdf', 'text/plain'],
    maxFiles: 4,
    maxFileSize: 10 * 1024 * 1024,
    maxTotalSize: 25 * 1024 * 1024
  },
  faq: [
    {
      question: 'Can we include our pre-engagement proposal photo?',
      answer: 'Yes! We will color grade your photo to seamlessly complement the invitation’s aesthetic.'
    },
    {
      question: 'Is this suitable for a traditional Roka or Nishchithartham?',
      answer: 'Yes. We customize the wording, auspicious symbols (Kalash, floral garlands), and typography to match cultural and regional traditions.'
    },
    contentPolicyFaq,
    {
      question: 'What is the delivery turnaround?',
      answer: 'Standard delivery is within 24 to 48 hours.'
    }
  ],
  relatedServices: [
    'wedding-invitation',
    'couple-portrait',
    'anniversary-invitation',
    'birthday-invitation'
  ],
  seoTitle: 'Custom Engagement & Ring Ceremony Invitations | AP Visual House',
  seoDescription: 'Beautiful digital engagement invitation cards and WhatsApp invites. Starting from ₹399 with 24–48h delivery and high-res files.'
};

// 21. BABY SHOWER INVITATION
export const babyShowerInvitationDetail: ServiceDetailData = {
  id: 'baby-shower-invitation',
  slug: 'baby-shower-invitation',
  category: 'Invitations',
  categorySlug: 'invitations-events',
  categoryId: 'invitations',
  name: 'Baby Shower Invitation',
  shortDescription: 'Tender, sweet celebration stationery for welcoming new life. Soft pastel palettes, whimsical cloud/stork motifs, or traditional Godh Bharai / Seemantham designs.',
  longDescription: 'Celebrate the imminent arrival of your little miracle. Our Baby Shower Invitation service designs heartwarming digital invitation cards featuring gentle watercolor clouds, golden stars, floral wreaths, or rich traditional motifs for Godh Bharai, Seemantham, and Valaikappu ceremonies.',
  startingPrice: 399,
  currency: '₹',
  deliveryTime: '24–48 Hours',
  revisionPolicy: '1 Minor Revision',
  formats: ['JPG', 'PNG', 'PDF'],
  heroImage: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=1200',
  imageType: 'invitation',
  imageFit: 'cover',
  imagePosition: 'center',
  galleryImages: [
    {
      title: 'Whimsical Cloud & Golden Starlight',
      description: 'Soft baby blue and blush clouds with gentle starlight and sleeping crescent moon.',
      image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=800',
      alt: 'Whimsical baby shower invitation design'
    },
    {
      title: 'Traditional Godh Bharai / Seemantham',
      description: 'Auspicious green and yellow silk motifs, mango leaves, and mother-to-be blessings.',
      image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=800',
      alt: 'Traditional Indian baby shower Godh Bharai card'
    },
    {
      title: 'Gender-Neutral Botanical Sage Green',
      description: 'Modern neutral eucalyptus branches, soft cream paper texture, and clean typography.',
      image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=800',
      alt: 'Gender neutral sage green baby shower card'
    },
    {
      title: 'Mother-to-Be Maternity Portrait Card',
      description: 'Framed maternity photoshoot image surrounded by soft watercolor blossoms.',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800',
      alt: 'Maternity photo baby shower invitation'
    }
  ],
  whatWeCreate: [
    {
      title: 'Custom Thematic Illustrations',
      description: 'Delicate storybook animals, teddy bears, florals, or traditional auspicious elements.'
    },
    {
      title: 'Maternity Photo Integration',
      description: 'Elegantly placing and retouching a photo of the glowing mother-to-be.'
    },
    {
      title: 'Smartphone WhatsApp Ready (9:16)',
      description: 'Full-screen mobile vertical layout for effortless digital forwarding to friends and family.'
    },
    {
      title: 'Interactive Maps Link Version',
      description: 'PDF copy with tap-to-navigate links for banquet hall or home venue locations.'
    }
  ],
  whatCustomerProvides: [
    {
      title: 'Event Details & Parents-to-Be Names',
      description: 'Mother-to-be name, date, time, venue address, and RSVP contacts.'
    },
    {
      title: 'Theme or Color Preference',
      description: 'Blush pink, sky blue, gender-neutral sage green, or traditional festive yellow/green.'
    }
  ],
  whatCustomerReceives: [
    {
      title: 'High-Res WhatsApp Image Card (JPG)',
      description: 'Sharply rendered digital card formatted for WhatsApp and social media.'
    },
    {
      title: 'Print-Ready PDF Master',
      description: '300 DPI high-resolution file suitable for keepsake scrapbooking or printing.'
    },
    {
      title: '1 Minor Detail Revision Round',
      description: 'Fine-tuning of wording, timings, or location corrections.'
    }
  ],
  uploadConfig: {
    requiredUploads: [
      {
        label: 'Event Details',
        description: 'Provide mother-to-be name, date, time, venue location, and RSVP details.'
      }
    ],
    optionalUploads: [
      {
        label: 'Maternity Photo',
        description: 'Optional photo of the parents-to-be to include on the card.'
      }
    ],
    acceptedFileTypes: ['image/jpeg', 'image/png', 'application/pdf', 'text/plain'],
    maxFiles: 3,
    maxFileSize: 10 * 1024 * 1024,
    maxTotalSize: 25 * 1024 * 1024
  },
  faq: [
    {
      question: 'Can you design for traditional Indian ceremonies like Seemantham or Valaikappu?',
      answer: 'Yes! We frequently design traditional Seemantham, Godh Bharai, Dohale Jevan, and Valaikappu cards with regional language text and traditional decorative motifs.'
    },
    {
      question: 'Can we keep the baby gender a surprise?',
      answer: 'Absolutely. We offer gorgeous gender-neutral themes using warm gold, sage green, sunny lemon yellow, or neutral linen textures.'
    },
    contentPolicyFaq,
    {
      question: 'How fast is delivery?',
      answer: 'Delivered in 24 to 48 hours directly to your WhatsApp or email.'
    }
  ],
  relatedServices: [
    'naming-ceremony-invitation',
    'birthday-invitation',
    'wedding-invitation',
    'family-creative-portrait'
  ],
  seoTitle: 'Baby Shower & Godh Bharai Invitation Cards | AP Visual House',
  seoDescription: 'Charming digital baby shower invitation cards and Seemantham invites. Starting from ₹399 with 24–48h delivery and print-ready PDF.'
};

// 22. ANNIVERSARY INVITATION
export const anniversaryInvitationDetail: ServiceDetailData = {
  id: 'anniversary-invitation',
  slug: 'anniversary-invitation',
  category: 'Invitations',
  categorySlug: 'invitations-events',
  categoryId: 'invitations',
  name: 'Anniversary Invitation',
  shortDescription: 'Honor enduring milestones of love. Silver jubilee (25th), golden jubilee (50th), and intimate anniversary party invitations featuring then-and-now photos.',
  longDescription: 'Decades of shared devotion deserve a celebration of distinction. Our Anniversary Invitation service designs regal digital cards for 25th Silver, 50th Golden, and milestone wedding anniversaries. We celebrate the couple’s journey with side-by-side "Then & Now" photo placements and celebratory typography.',
  startingPrice: 399,
  currency: '₹',
  deliveryTime: '24–48 Hours',
  revisionPolicy: '1 Minor Revision',
  formats: ['JPG', 'PNG', 'PDF'],
  heroImage: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=1200',
  imageType: 'invitation',
  imageFit: 'cover',
  imagePosition: 'center',
  galleryImages: [
    {
      title: '50th Golden Jubilee Gala',
      description: 'Opulent gold glitter and rich black background honoring 50 golden years of marriage.',
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=800',
      alt: '50th golden wedding anniversary invitation'
    },
    {
      title: 'Then & Now Heritage Photo Card',
      description: 'Restored original wedding photo on the left, modern portrait on the right.',
      image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&q=80&w=800',
      alt: 'Then and now anniversary invitation photo card'
    },
    {
      title: '25th Silver Jubilee Elegance',
      description: 'Metallic silver calligraphy, pearl floral borders, and dinner party itinerary.',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800',
      alt: '25th silver jubilee anniversary invitation'
    },
    {
      title: 'Intimate Candlelit Dinner Invitation',
      description: 'Warm champagne tones, minimalist fonts, and romantic celebration copy.',
      image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=800',
      alt: 'Intimate anniversary dinner invitation card'
    }
  ],
  whatWeCreate: [
    {
      title: 'Then & Now Photo Storytelling',
      description: 'Retouching and harmonizing the couple’s original wedding photo alongside a recent portrait.'
    },
    {
      title: 'Milestone Emblem & Typography',
      description: 'Custom 25th, 50th, or milestone badges celebrating the number of cherished years.'
    },
    {
      title: 'Mobile-Friendly WhatsApp Card',
      description: 'Vertical 9:16 layout perfectly scaled for immediate messaging to family and friends.'
    },
    {
      title: 'Interactive Venue Navigation Link',
      description: 'PDF format with embedded Google Maps directions for easy guest arrival.'
    }
  ],
  whatCustomerProvides: [
    {
      title: 'Couple Names & Anniversary Milestone',
      description: 'Names of the couple, milestone year (e.g. 25th Silver Jubilee), date, time, and venue.'
    },
    {
      title: 'Photographs (Then & Now)',
      description: 'Upload their original wedding photo and a current photo if desired.'
    }
  ],
  whatCustomerReceives: [
    {
      title: 'High-Resolution WhatsApp Graphic (JPG)',
      description: 'Vibrant digital card ready to send on messaging apps and social media.'
    },
    {
      title: 'Print-Ready PDF Master',
      description: '300 DPI master file suitable for framing as a physical keepsake.'
    },
    {
      title: '1 Minor Detail Revision Round',
      description: 'Timing, location address, or family name adjustments.'
    }
  ],
  uploadConfig: {
    requiredUploads: [
      {
        label: 'Event Details',
        description: 'Provide couple names, years celebrated, ceremony/dinner date, time, and venue.'
      }
    ],
    optionalUploads: [
      {
        label: 'Original & Recent Photos',
        description: 'Upload vintage wedding photo and current photo for a "Then & Now" feature.'
      }
    ],
    acceptedFileTypes: ['image/jpeg', 'image/png', 'application/pdf', 'text/plain'],
    maxFiles: 4,
    maxFileSize: 10 * 1024 * 1024,
    maxTotalSize: 25 * 1024 * 1024
  },
  faq: [
    {
      question: 'Can you restore the original vintage wedding photo for the anniversary card?',
      answer: 'Yes! We perform light restoration and exposure correction on the old photo so it looks crisp and beautiful next to the modern photo.'
    },
    {
      question: 'Can we include our children and grandchildren’s names as hosts?',
      answer: 'Absolutely. We will arrange the family host credits with clear, elegant typographic hierarchy.'
    },
    contentPolicyFaq,
    {
      question: 'How fast is delivery?',
      answer: 'Delivered in 24 to 48 hours directly to your WhatsApp or email.'
    }
  ],
  relatedServices: [
    'wedding-invitation',
    'couple-portrait',
    'old-photo-restoration',
    'birthday-invitation'
  ],
  seoTitle: 'Anniversary Party Invitation Cards | AP Visual House',
  seoDescription: 'Design bespoke 25th and 50th wedding anniversary invitations with "Then & Now" photos. Starting from ₹399 with 24–48h delivery.'
};

// 23. HOUSEWARMING INVITATION
export const housewarmingInvitationDetail: ServiceDetailData = {
  id: 'housewarming-invitation',
  slug: 'housewarming-invitation',
  category: 'Invitations',
  categorySlug: 'invitations-events',
  categoryId: 'invitations',
  name: 'Housewarming Invitation',
  shortDescription: 'Warm, hospitable invitations for your new sanctuary. Griha Pravesh rituals, contemporary apartment celebrations, and new home blessing cards.',
  longDescription: 'Stepping into a new home is one of life’s proudest moments. Our Housewarming Invitation service designs inviting digital cards for Griha Pravesh poojas, house warming gatherings, and apartment open houses with traditional auspicious motifs, modern home illustrations, or actual photos of your new residence.',
  startingPrice: 399,
  currency: '₹',
  deliveryTime: '24–48 Hours',
  revisionPolicy: '1 Minor Revision',
  formats: ['JPG', 'PNG', 'PDF'],
  heroImage: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=1200',
  imageType: 'invitation',
  imageFit: 'cover',
  imagePosition: 'center',
  galleryImages: [
    {
      title: 'Traditional Griha Pravesh Kalash',
      description: 'Sacred coconut Kalash, mango leaves, toran garland, and traditional Sanskrit blessings.',
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=800',
      alt: 'Traditional Indian Griha Pravesh invitation card'
    },
    {
      title: 'Modern Architectural Sketch Card',
      description: 'Minimalist line illustration of a modern house facade with warm gold accents.',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
      alt: 'Modern housewarming invitation card design'
    },
    {
      title: 'Warm Key & Doorway Hospitality Theme',
      description: 'Charming illustration of a welcoming front door with potted plants and warm light.',
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800',
      alt: 'Housewarming party invitation card'
    },
    {
      title: 'Real House Photo Integration',
      description: 'Clean framed photo of your new home entrance paired with elegant ceremony timings.',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800',
      alt: 'Real house photo housewarming invitation'
    }
  ],
  whatWeCreate: [
    {
      title: 'Traditional Pooja or Contemporary Party Style',
      description: 'Tailored for sacred Griha Pravesh ceremonies or casual evening house parties.'
    },
    {
      title: 'New House Photo Placement',
      description: 'Incorporating a photo of your new home or building facade with professional lighting polish.'
    },
    {
      title: 'Mobile-Optimized Vertical Layout',
      description: 'Calibrated for seamless smartphone viewing and forwarding on WhatsApp groups.'
    },
    {
      title: 'Clickable Google Maps Navigation Link',
      description: 'Interactive PDF version enabling guests to navigate to your new doorstep with one tap.'
    }
  ],
  whatCustomerProvides: [
    {
      title: 'Family Names & New Address',
      description: 'Names of the home hosts, full address of the new residence, ceremony date, and timings.'
    },
    {
      title: 'Style Preference / Home Photo',
      description: 'Traditional Indian auspicious style, modern minimalist, or upload a photo of the house.'
    }
  ],
  whatCustomerReceives: [
    {
      title: 'High-Res WhatsApp Card (JPG)',
      description: 'Vivid image card ready for immediate distribution.'
    },
    {
      title: 'Print-Ready PDF Master',
      description: '300 DPI master file suitable for physical printouts.'
    },
    {
      title: '1 Minor Detail Revision Round',
      description: 'Flat number, landmark description, or time corrections.'
    }
  ],
  uploadConfig: {
    requiredUploads: [
      {
        label: 'Event Details & Address',
        description: 'Provide family names, new home address, ceremony date, time, and RSVP contact.'
      }
    ],
    optionalUploads: [
      {
        label: 'House Photo / Style Notes',
        description: 'Optional photo of your new home facade or note on preferred pooja shlokas.'
      }
    ],
    acceptedFileTypes: ['image/jpeg', 'image/png', 'application/pdf', 'text/plain'],
    maxFiles: 3,
    maxFileSize: 10 * 1024 * 1024,
    maxTotalSize: 25 * 1024 * 1024
  },
  faq: [
    {
      question: 'Can you include a detailed landmark or route map on the card?',
      answer: 'Yes! We can include brief driving landmark instructions and embed a clickable Google Maps navigation link directly in the PDF version.'
    },
    {
      question: 'Can you write the invitation in Hindi, Telugu, Tamil, or Kannada?',
      answer: 'Yes! We design in all major Indian languages. Simply provide the regional text or names, and we will format it with elegant typography.'
    },
    contentPolicyFaq,
    {
      question: 'How fast is delivery?',
      answer: 'Delivered in 24 to 48 hours directly to your WhatsApp or email.'
    }
  ],
  relatedServices: [
    '2d-floor-plan-to-3d-floor-plan',
    'house-colour-visualization',
    'festival-invitation',
    'wedding-invitation'
  ],
  seoTitle: 'Housewarming & Griha Pravesh Invitation Cards | AP Visual House',
  seoDescription: 'Celebrate your new home with custom Griha Pravesh invitations and WhatsApp cards. Starting from ₹399 with 24–48h delivery.'
};

// 24. NAMING CEREMONY INVITATION
export const namingCeremonyInvitationDetail: ServiceDetailData = {
  id: 'naming-ceremony-invitation',
  slug: 'naming-ceremony-invitation',
  category: 'Invitations',
  categorySlug: 'invitations-events',
  categoryId: 'invitations',
  name: 'Naming Ceremony Invitation',
  shortDescription: 'Sweet and auspicious invitations for welcoming baby into the world. Cradle ceremony, Namakaran, and christening announcements with charming baby photos.',
  longDescription: 'Reveal your baby’s name with auspicious warmth and joy. Our Naming Ceremony Invitation service crafts tender digital cards for Namakaran, Cradle Ceremony, Barse, and Christening celebrations. We blend adorable baby photo cutouts with traditional blessing motifs or sweet storybook pastels.',
  startingPrice: 399,
  currency: '₹',
  deliveryTime: '24–48 Hours',
  revisionPolicy: '1 Minor Revision',
  formats: ['JPG', 'PNG', 'PDF'],
  heroImage: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=1200',
  imageType: 'invitation',
  imageFit: 'cover',
  imagePosition: 'center',
  galleryImages: [
    {
      title: 'Traditional Golden Cradle Ceremony',
      description: 'Ornate floral jhula / cradle, traditional diya lamps, and auspicious blessings.',
      image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=800',
      alt: 'Traditional Indian cradle naming ceremony invitation'
    },
    {
      title: 'Sweet Cloud & Cradle Illustration',
      description: 'Soft pastel watercolor theme with sleeping baby and golden star accents.',
      image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=800',
      alt: 'Sweet cloud pastel naming ceremony card'
    },
    {
      title: 'Baby Photo Showcase Card',
      description: 'Radiant baby portrait framed in gentle florals with date and ceremony timings.',
      image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=800',
      alt: 'Baby photo naming ceremony announcement'
    },
    {
      title: 'Minimalist Christening & Blessing Suite',
      description: 'Graceful dove motif, delicate serif typography, and church ceremony details.',
      image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=800',
      alt: 'Minimalist christening blessing invitation card'
    }
  ],
  whatWeCreate: [
    {
      title: 'Baby Photo Retouch & Integration',
      description: 'Gentle skin smoothing and background removal to place your baby into a floral cradle.'
    },
    {
      title: 'Auspicious Traditional or Modern Themes',
      description: 'Jhula/cradle motifs, temple arches, floral wreaths, or minimalist pastel styling.'
    },
    {
      title: 'WhatsApp Vertical 9:16 Format',
      description: 'Screen-filling digital card designed for easy mobile sharing with relatives.'
    },
    {
      title: 'Clickable Google Maps Navigation',
      description: 'Interactive PDF enabling guests to navigate directly to the banquet hall or temple.'
    }
  ],
  whatCustomerProvides: [
    {
      title: 'Baby & Parents Details',
      description: 'Baby name (if revealing on card), parents and grandparents names, ceremony date, time, and venue.'
    },
    {
      title: 'Baby Photograph (Optional)',
      description: 'Clear photo of your newborn smiling or resting peacefully.'
    }
  ],
  whatCustomerReceives: [
    {
      title: 'High-Res WhatsApp Card (JPG)',
      description: 'Crisp image file calibrated for clear reading on smartphones.'
    },
    {
      title: 'Print-Ready PDF Master',
      description: '300 DPI master file for keeping in the baby memory book or printing.'
    },
    {
      title: '1 Minor Detail Revision Round',
      description: 'Correcting spellings, auspicious muhurtham timings, or address landmarks.'
    }
  ],
  uploadConfig: {
    requiredUploads: [
      {
        label: 'Event Details',
        description: 'Provide baby/parents names, ceremony date, time, and venue address.'
      }
    ],
    optionalUploads: [
      {
        label: 'Baby Photo',
        description: 'Upload a cute, clear photograph of your newborn baby.'
      }
    ],
    acceptedFileTypes: ['image/jpeg', 'image/png', 'application/pdf', 'text/plain'],
    maxFiles: 3,
    maxFileSize: 10 * 1024 * 1024,
    maxTotalSize: 25 * 1024 * 1024
  },
  faq: [
    {
      question: 'Can we keep the baby name hidden until the ceremony?',
      answer: 'Yes! We can format the card as an invitation to the ceremony where the name will be revealed (e.g. "Join us as we name our little prince/princess").'
    },
    {
      question: 'Can you include grandparents’ names?',
      answer: 'Yes! Traditional Indian naming cards honor grandparents prominently, and we layout those family credits with graceful typographic balance.'
    },
    contentPolicyFaq,
    {
      question: 'How fast is delivery?',
      answer: 'Delivered in 24 to 48 hours directly to your WhatsApp or email.'
    }
  ],
  relatedServices: [
    'baby-shower-invitation',
    'birthday-invitation',
    'cartoon-portrait',
    'family-creative-portrait'
  ],
  seoTitle: 'Naming Ceremony & Cradle Ceremony Invitations | AP Visual House',
  seoDescription: 'Celebrate baby’s naming ceremony with custom digital invitation cards. Starting from ₹399 with 24–48h delivery and WhatsApp-ready format.'
};

// 25. FESTIVAL INVITATION
export const festivalInvitationDetail: ServiceDetailData = {
  id: 'festival-invitation',
  slug: 'festival-invitation',
  category: 'Invitations',
  categorySlug: 'invitations-events',
  categoryId: 'invitations',
  name: 'Festival Invitation',
  shortDescription: 'Vibrant celebratory cards for cultural gatherings and festivities. Diwali get-togethers, Eid open houses, Christmas parties, and community celebrations.',
  longDescription: 'Share the spirit of celebration with friends, family, and colleagues. Our Festival Invitation service creates rich, culturally resonant digital invitations for Diwali parties, Eid milans, Christmas dinners, Ganesh Chaturthi poojas, and New Year soirees with celebratory illumination and festive energy.',
  startingPrice: 399,
  currency: '₹',
  deliveryTime: '24–48 Hours',
  revisionPolicy: '1 Minor Revision',
  formats: ['JPG', 'PNG', 'PDF'],
  heroImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=1200',
  imageType: 'invitation',
  imageFit: 'cover',
  imagePosition: 'center',
  galleryImages: [
    {
      title: 'Diwali Lights & Rangoli Gala',
      description: 'Glowing oil diyas, intricate golden rangoli patterns, and festive warm typography.',
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800',
      alt: 'Diwali party celebration festival invitation card'
    },
    {
      title: 'Eid Mubarak Crescent & Lanterns',
      description: 'Ornate hanging brass lanterns, golden crescent moon, and royal teal backdrop.',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800',
      alt: 'Eid festival party invitation card'
    },
    {
      title: 'Christmas & Winter Holiday Dinner',
      description: 'Deep pine green, frosted holly berries, golden baubles, and warm holiday warmth.',
      image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=800',
      alt: 'Christmas holiday dinner invitation card'
    },
    {
      title: 'New Year Eve Celebration Bash',
      description: 'Glittering golden confetti bursts, champagne flute illustrations, and countdown clock.',
      image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&q=80&w=800',
      alt: 'New Year celebration party invitation card'
    }
  ],
  whatWeCreate: [
    {
      title: 'Cultural Festival Artwork',
      description: 'Authentic festive elements tailored to Diwali, Eid, Christmas, Navratri, or New Year.'
    },
    {
      title: 'Personal or Corporate Party Format',
      description: 'Suitable for family home dinners or corporate holiday celebration gatherings.'
    },
    {
      title: 'WhatsApp-Optimized 9:16 Layout',
      description: 'Designed for effortless mobile sharing and instant group broadcasts.'
    },
    {
      title: 'Interactive RSVP Links',
      description: 'Clickable PDF option with WhatsApp RSVP or Google Maps venue links.'
    }
  ],
  whatCustomerProvides: [
    {
      title: 'Festival & Event Details',
      description: 'Host name or company name, festival type, date, time, venue, and dress code.'
    },
    {
      title: 'Corporate Logo (Optional)',
      description: 'If corporate event, upload high-res logo for professional co-branding.'
    }
  ],
  whatCustomerReceives: [
    {
      title: 'Vibrant WhatsApp Image Card (JPG)',
      description: 'High-res image file calibrated for mobile messaging.'
    },
    {
      title: 'Print-Ready PDF Master',
      description: '300 DPI master file for physical notices or invitations.'
    },
    {
      title: '1 Minor Detail Revision Round',
      description: 'Time adjustments, RSVP changes, or venue updates.'
    }
  ],
  uploadConfig: {
    requiredUploads: [
      {
        label: 'Festival & Party Brief',
        description: 'Provide festival name, host name, date, time, venue address, and RSVP info.'
      }
    ],
    optionalUploads: [
      {
        label: 'Company Logo / Personal Photo',
        description: 'Optional logo or family photo to incorporate into the festive design.'
      }
    ],
    acceptedFileTypes: ['image/jpeg', 'image/png', 'application/pdf', 'text/plain'],
    maxFiles: 3,
    maxFileSize: 10 * 1024 * 1024,
    maxTotalSize: 25 * 1024 * 1024
  },
  faq: [
    {
      question: 'Can you design for corporate festival dinners with our company logo?',
      answer: 'Yes! We frequently design corporate Diwali and holiday party invites featuring company branding, executive host messages, and cocktail dress codes.'
    },
    {
      question: 'How fast can I get a last-minute festival invitation?',
      answer: 'We deliver within 24 hours so you can notify your guests in time for the festivities.'
    },
    contentPolicyFaq,
    {
      question: 'Can I request bilingual text (e.g. English and Hindi)?',
      answer: 'Yes. We can seamlessly balance English and regional festival wishes in the layout.'
    }
  ],
  relatedServices: [
    'festival-offer-creative',
    'festival-promotional-video',
    'birthday-invitation',
    'housewarming-invitation'
  ],
  seoTitle: 'Festival Party Invitation Cards | AP Visual House',
  seoDescription: 'Design festive invitation cards for Diwali, Eid, Christmas, and New Year parties. Starting from ₹399 with 24–48h delivery and WhatsApp format.'
};

export const invitationsServices: Service[] = [
  {
    id: 'birthday-invitation',
    categoryId: 'invitations',
    category: 'Invitations',
    categorySlug: 'invitations-events',
    title: 'Birthday Invitation',
    description: 'Vibrant, joyous birthday invitations for all ages. Whimsical cartoon themes for kids and stylish milestone cards for adults.',
    price: 399,
    deliveryTime: '24–48 Hours',
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=800',
    slug: 'birthday-invitation',
    imageType: 'invitation',
    imageFit: 'cover',
    imagePosition: 'center',
    detail: birthdayInvitationDetail
  },
  {
    id: 'wedding-invitation',
    categoryId: 'invitations',
    category: 'Invitations',
    categorySlug: 'invitations-events',
    title: 'Wedding Invitation',
    description: 'Opulent, royal, and contemporary digital wedding suites. Multi-event itineraries crafted with elegance.',
    price: 499,
    deliveryTime: '24–48 Hours',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800',
    slug: 'wedding-invitation',
    imageType: 'invitation',
    imageFit: 'cover',
    imagePosition: 'center',
    detail: weddingInvitationDetail
  },
  {
    id: 'engagement-invitation',
    categoryId: 'invitations',
    category: 'Invitations',
    categorySlug: 'invitations-events',
    title: 'Engagement Invitation',
    description: 'Charming ring ceremony and engagement announcement cards with romantic florals and couple photos.',
    price: 399,
    deliveryTime: '24–48 Hours',
    image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=800',
    slug: 'engagement-invitation',
    imageType: 'invitation',
    imageFit: 'cover',
    imagePosition: 'center',
    detail: engagementInvitationDetail
  },
  {
    id: 'baby-shower-invitation',
    categoryId: 'invitations',
    category: 'Invitations',
    categorySlug: 'invitations-events',
    title: 'Baby Shower Invitation',
    description: 'Sweet celebration stationery for welcoming new life. Soft pastels and traditional Godh Bharai designs.',
    price: 399,
    deliveryTime: '24–48 Hours',
    image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=800',
    slug: 'baby-shower-invitation',
    imageType: 'invitation',
    imageFit: 'cover',
    imagePosition: 'center',
    detail: babyShowerInvitationDetail
  },
  {
    id: 'anniversary-invitation',
    categoryId: 'invitations',
    category: 'Invitations',
    categorySlug: 'invitations-events',
    title: 'Anniversary Invitation',
    description: 'Silver (25th) and Golden (50th) jubilee celebrations featuring romantic "Then & Now" photo placements.',
    price: 399,
    deliveryTime: '24–48 Hours',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=800',
    slug: 'anniversary-invitation',
    imageType: 'invitation',
    imageFit: 'cover',
    imagePosition: 'center',
    detail: anniversaryInvitationDetail
  },
  {
    id: 'housewarming-invitation',
    categoryId: 'invitations',
    category: 'Invitations',
    categorySlug: 'invitations-events',
    title: 'Housewarming Invitation',
    description: 'Hospitable invitations for your new home. Traditional Griha Pravesh rituals and contemporary open house cards.',
    price: 399,
    deliveryTime: '24–48 Hours',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=800',
    slug: 'housewarming-invitation',
    imageType: 'invitation',
    imageFit: 'cover',
    imagePosition: 'center',
    detail: housewarmingInvitationDetail
  },
  {
    id: 'naming-ceremony-invitation',
    categoryId: 'invitations',
    category: 'Invitations',
    categorySlug: 'invitations-events',
    title: 'Naming Ceremony Invitation',
    description: 'Sweet and auspicious cradle ceremony announcements with charming baby photos and family blessings.',
    price: 399,
    deliveryTime: '24–48 Hours',
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=800',
    slug: 'naming-ceremony-invitation',
    imageType: 'invitation',
    imageFit: 'cover',
    imagePosition: 'center',
    detail: namingCeremonyInvitationDetail
  },
  {
    id: 'festival-invitation',
    categoryId: 'invitations',
    category: 'Invitations',
    categorySlug: 'invitations-events',
    title: 'Festival Invitation',
    description: 'Vibrant celebratory cards for cultural gatherings—Diwali, Eid, Christmas, and New Year gatherings.',
    price: 399,
    deliveryTime: '24–48 Hours',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800',
    slug: 'festival-invitation',
    imageType: 'invitation',
    imageFit: 'cover',
    imagePosition: 'center',
    detail: festivalInvitationDetail
  }
];
