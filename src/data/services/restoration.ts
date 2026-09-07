import { Service, ServiceDetailData } from '../../types';

const contentPolicyFaq = {
  question: 'What type of content can I submit?',
  answer: "AP Visual House does not accept projects involving nudity, sexually explicit content, profanity, hate or offensive material, or other inappropriate content. Customers are responsible for ensuring that submitted files comply with this policy. If submitted material violates our Content Policy, AP Visual House may decline or discontinue the project."
};

// 7. OLD PHOTO RESTORATION
export const oldPhotoRestorationDetail: ServiceDetailData = {
  id: 'old-photo-restoration',
  slug: 'old-photo-restoration',
  category: 'Restoration',
  categorySlug: 'photo-restoration',
  categoryId: 'restoration',
  name: 'Old Photo Restoration',
  shortDescription: 'Preserve cherished family heritage. We delicately restore faded, yellowed, and aging vintage photographs back to rich tonal depth and clarity.',
  longDescription: 'Family photographs are irreplaceable time capsules. Our Old Photo Restoration service blends archival digital retouching with careful tonal rebalancing to reverse decades of fading, chemical discoloration, dust, and silvering—restoring your ancestors’ memories for generations to come.',
  startingPrice: 299,
  currency: '₹',
  deliveryTime: '24–48 Hours',
  revisionPolicy: '1 Minor Revision',
  formats: ['JPG', 'PNG', 'TIFF (on request)'],
  heroImage: 'https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&q=80&w=1200',
  imageType: 'restoration',
  imageFit: 'cover',
  imagePosition: 'center 20%',
  galleryImages: [
    {
      title: 'Faded Sepia Heritage Revival',
      description: 'Restoration of faded 1950s sepia tones back to rich contrast and deep blacks.',
      image: 'https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&q=80&w=800',
      alt: 'Restored vintage heritage portrait of an elderly man'
    },
    {
      title: 'Monochrome Print Recovery',
      description: 'Clearing surface scratches and age haze from a vintage studio print.',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800',
      alt: 'Cleaned black and white vintage portrait'
    },
    {
      title: 'Mid-Century Family Archive',
      description: 'Rebalanced exposure across a multi-generational group portrait from 1965.',
      image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=800',
      alt: 'Restored mid-century family archive photograph'
    },
    {
      title: 'Archival Portrait Detail Sharpening',
      description: 'Gentle micro-contrast enhancement without introducing artificial digital artifacts.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800',
      alt: 'Sharpened archival vintage portrait'
    }
  ],
  whatWeCreate: [
    {
      title: 'Tonal & Contrast Rebalancing',
      description: 'Deepening faded blacks, reviving washed-out whites, and balancing natural mid-tones.'
    },
    {
      title: 'Dust, Scratch & Silvering Removal',
      description: 'Meticulous pixel-level cleaning of surface speckles, chemical decay, and scratches.'
    },
    {
      title: 'Archival Print-Ready Master',
      description: 'High-resolution digital file ready to be printed onto fine-art cotton rag or photo paper.'
    },
    {
      title: 'Digital Preservation Copy',
      description: 'Future-proof digital backup to share safely with family members across the globe.'
    }
  ],
  whatCustomerProvides: [
    {
      title: 'Scan or High-Resolution Photo of the Print',
      description: 'A flatbed scan at 300–600 DPI, or a flat, evenly lit phone photo taken without flash glare.'
    },
    {
      title: 'Preservation Goals',
      description: 'Let us know if you prefer keeping original vintage sepia warmth or a clean monochrome tone.'
    }
  ],
  whatCustomerReceives: [
    {
      title: 'Restored High-Resolution Master',
      description: 'Lossless digital file ready for archiving, social sharing, and large-format photo prints.'
    },
    {
      title: 'Side-by-Side Comparison File',
      description: 'A dedicated before/after file showing the full extent of the restoration work.'
    },
    {
      title: '1 Tone Refinement Round',
      description: 'Fine-tuning of contrast, sepia warmth, or localized shadow brightness.'
    }
  ],
  uploadConfig: {
    requiredUploads: [
      {
        label: 'Old Photo Scan / Photo',
        description: 'Upload the highest quality scan or flat photo of the original print.'
      }
    ],
    optionalUploads: [
      {
        label: 'Close-Up of Key Details',
        description: 'Optional close-up photograph of faces or damaged areas.'
      }
    ],
    acceptedFileTypes: ['image/jpeg', 'image/png', 'image/tiff', 'image/webp', 'application/pdf'],
    maxFiles: 5,
    maxFileSize: 10 * 1024 * 1024,
    maxTotalSize: 25 * 1024 * 1024
  },
  faq: [
    {
      question: 'What is the best way to scan my old photo?',
      answer: 'For best results, use a flatbed scanner set between 300 DPI and 600 DPI saved as TIFF or maximum quality JPG. If using a phone, place the photo on a flat table near natural window light, keep the camera parallel to avoid perspective skew, and avoid flash.'
    },
    {
      question: 'Can you restore a photo that is stuck to glass?',
      answer: 'Yes! Do not attempt to force the photo off the glass. Simply take a careful, glare-free photograph through the glass and upload it. We can work directly from the digital capture.'
    },
    contentPolicyFaq,
    {
      question: 'Does restoration change the authentic look of the photograph?',
      answer: 'Our philosophy is preservation, not over-processing. We remove damage and correct aging while maintaining the authentic texture, paper character, and historical integrity of the era.'
    }
  ],
  relatedServices: [
    'black-and-white-photo-colorization',
    'damaged-photo-repair',
    'face-and-detail-enhancement',
    'photo-enhancement'
  ],
  seoTitle: 'Old Photo Restoration Services | AP Visual House',
  seoDescription: 'Restore faded, yellowed, and vintage family photos to archival brilliance. Starting from ₹299 with 24–48h delivery and side-by-side comparison.'
};

// 8. BLACK & WHITE PHOTO COLORIZATION
export const blackAndWhitePhotoColorizationDetail: ServiceDetailData = {
  id: 'black-and-white-photo-colorization',
  slug: 'black-and-white-photo-colorization',
  category: 'Restoration',
  categorySlug: 'photo-restoration',
  categoryId: 'restoration',
  name: 'Black & White Photo Colorization',
  shortDescription: 'See the past in living color. Historically sensitive, photorealistic colorization of monochrome vintage prints with natural skin tones and authentic hues.',
  longDescription: 'History was never in black and white. Our Black & White Photo Colorization service breathes vibrant reality into historical archives and family heirlooms. We research period-accurate military uniforms, vintage textiles, and natural skin undertones to craft vivid, emotionally moving portraits.',
  startingPrice: 299,
  currency: '₹',
  deliveryTime: '24–48 Hours',
  revisionPolicy: '1 Minor Revision',
  formats: ['JPG', 'PNG'],
  heroImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1200',
  imageType: 'restoration',
  imageFit: 'cover',
  imagePosition: 'center 20%',
  galleryImages: [
    {
      title: 'Realistic Skin Tone Radiance',
      description: 'Multi-layered undertones creating natural warmth, blush, and lifelike eyes.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800',
      alt: 'Colorized portrait of a young man with natural skin tones'
    },
    {
      title: 'Historical Attire & Textile Hues',
      description: 'Authentic reproduction of vintage fabrics, embroidery, and period apparel.',
      image: 'https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&q=80&w=800',
      alt: 'Historically colorized vintage elder portrait'
    },
    {
      title: 'Vintage Street & Architecture',
      description: 'Bringing early 20th-century street scenes, brickwork, and greenery into realistic color.',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800',
      alt: 'Colorized archival woman portrait'
    },
    {
      title: 'Family Wedding Archival Revival',
      description: 'Reviving a 1970s monochrome wedding photo with rich jewelry and festive tones.',
      image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=800',
      alt: 'Colorized vintage wedding couple photo'
    }
  ],
  whatWeCreate: [
    {
      title: 'Multi-Layered Skin Toning',
      description: 'Subtle subsurface scattering, lip warmth, and eye color for authentic human vitality.'
    },
    {
      title: 'Period-Accurate Fabric Colors',
      description: 'Research-informed hues for vintage uniforms, saris, suits, and cultural garments.'
    },
    {
      title: 'Environmental Color Harmony',
      description: 'Natural sky gradients, foliage greens, and ambient bounce light across the entire scene.'
    },
    {
      title: 'High-Resolution Master Deliverable',
      description: '300 DPI master colorized image alongside the cleaned monochrome version.'
    }
  ],
  whatCustomerProvides: [
    {
      title: 'Monochrome Image / Scan',
      description: 'Clear scan or photo of the black & white or sepia original.'
    },
    {
      title: 'Known Color Details',
      description: 'Any known details about eye color, hair tone, or clothing colors (e.g., "The sari was crimson").'
    }
  ],
  whatCustomerReceives: [
    {
      title: 'Full-Color 300 DPI Digital Master',
      description: 'Archival quality master file ready for printing, framing, and family gifting.'
    },
    {
      title: 'Cleaned Monochrome File',
      description: 'A restored high-contrast black-and-white copy included at no extra charge.'
    },
    {
      title: '1 Color Adjustment Round',
      description: 'Fine-tuning of specific garments, background hues, or eye color nuances.'
    }
  ],
  uploadConfig: {
    requiredUploads: [
      {
        label: 'Black & White Photo',
        description: 'Upload the original black and white or sepia photograph.'
      }
    ],
    optionalUploads: [
      {
        label: 'Color Clues / Reference',
        description: 'Notes or reference photos showing eye color or garment shade.'
      }
    ],
    acceptedFileTypes: ['image/jpeg', 'image/png', 'image/tiff', 'image/webp'],
    maxFiles: 4,
    maxFileSize: 10 * 1024 * 1024,
    maxTotalSize: 25 * 1024 * 1024
  },
  faq: [
    {
      question: 'How do you know what colors were originally in the photo?',
      answer: 'Our artists use a combination of historical research for the era, contextual cues (textiles, foliage, skin undertones), and any specific color memories or family notes you provide.'
    },
    {
      question: 'What if I want a specific dress or uniform color adjusted?',
      answer: 'We include one round of color adjustments. Simply tell us if you’d like an attire tone warmed, cooled, or adjusted to a specific family memory.'
    },
    contentPolicyFaq,
    {
      question: 'Does colorization include restoration of scratches and dust?',
      answer: 'Yes! We perform foundational dust and scratch cleanup before colorization so your final image is pristine.'
    }
  ],
  relatedServices: [
    'old-photo-restoration',
    'damaged-photo-repair',
    'face-and-detail-enhancement',
    'couple-portrait'
  ],
  seoTitle: 'B&W Photo Colorization Services | AP Visual House',
  seoDescription: 'Transform black and white family photos into vibrant, realistic color portraits. Starting from ₹299 with natural skin tones and 24–48h delivery.'
};

// 9. DAMAGED PHOTO REPAIR
export const damagedPhotoRepairDetail: ServiceDetailData = {
  id: 'damaged-photo-repair',
  slug: 'damaged-photo-repair',
  category: 'Restoration',
  categorySlug: 'photo-restoration',
  categoryId: 'restoration',
  name: 'Damaged Photo Repair',
  shortDescription: 'Reconstruct severely creased, torn, stained, and water-damaged photographs. Precision digital reconstruction for compromised family treasures.',
  longDescription: 'When physical accidents, water exposure, deep tears, or tape residues threaten an irreplaceable photograph, our Damaged Photo Repair service steps in. We digitally reconstruct missing sections, eliminate water stains, and reconnect torn fragments without disturbing the original physical print.',
  startingPrice: 399,
  currency: '₹',
  deliveryTime: '48 Hours',
  revisionPolicy: '1 Minor Revision',
  formats: ['JPG', 'PNG', 'TIFF'],
  heroImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=1200',
  imageType: 'restoration',
  imageFit: 'cover',
  imagePosition: 'center 20%',
  galleryImages: [
    {
      title: 'Torn Edge & Corner Reconstruction',
      description: 'Rebuilding missing edges, background elements, and framing borders.',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800',
      alt: 'Repaired torn corner vintage portrait'
    },
    {
      title: 'Severe Crease & Fold Line Removal',
      description: 'Digitally knitting deep folds running directly through face and clothing.',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800',
      alt: 'Fold crease removal portrait restoration'
    },
    {
      title: 'Water Damage & Stain Elimination',
      description: 'Removing moisture rings, mildew discoloration, and tape stains.',
      image: 'https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&q=80&w=800',
      alt: 'Water stain removed archival print'
    },
    {
      title: 'Cracked Emulsion Smoothing',
      description: 'Re-texturizing cracked antique photographic emulsion into smooth photographic tone.',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800',
      alt: 'Antique emulsion repair portrait'
    }
  ],
  whatWeCreate: [
    {
      title: 'Torn Fragment Stitching',
      description: 'Aligning separated pieces and synthesizing missing paper fibers seamlessly.'
    },
    {
      title: 'Facial Geometry Reconstruction',
      description: 'Using anatomical symmetry and contextual cues to rebuild scratched eyes or mouths.'
    },
    {
      title: 'Stain & Adhesive Elimination',
      description: 'Removing yellowed scotch tape residue, water marks, and coffee stains.'
    },
    {
      title: 'Archival Master Export',
      description: '300 DPI high-resolution export ready for reprints and long-term cloud storage.'
    }
  ],
  whatCustomerProvides: [
    {
      title: 'Careful High-Resolution Scan / Photo',
      description: 'Piece together loose fragments on a flat scanner bed if possible, or take a high-res photo.'
    },
    {
      title: 'Damage Context',
      description: 'Let us know if any parts are missing completely or if you have an alternative photo of the subject.'
    }
  ],
  whatCustomerReceives: [
    {
      title: 'Flawlessly Reconstructed Image',
      description: 'No visible crease lines, tears, or water rings—restored to complete visual harmony.'
    },
    {
      title: 'Full-Resolution Print-Ready File',
      description: 'Delivered in 300 DPI JPG and PNG formats.'
    },
    {
      title: '1 Minor Revision Round',
      description: 'Refinements to rebuilt edge details or localized brightness levels.'
    }
  ],
  uploadConfig: {
    requiredUploads: [
      {
        label: 'Damaged Photo Scan',
        description: 'Upload high-res scan or photograph of the damaged print.'
      }
    ],
    optionalUploads: [
      {
        label: 'Additional Fragments / Angles',
        description: 'Photos of broken pieces or a second reference image of the person.'
      }
    ],
    acceptedFileTypes: ['image/jpeg', 'image/png', 'image/tiff', 'image/webp'],
    maxFiles: 5,
    maxFileSize: 10 * 1024 * 1024,
    maxTotalSize: 25 * 1024 * 1024
  },
  faq: [
    {
      question: 'Can you fix a photo with a rip straight through someone’s face?',
      answer: 'Yes. That is one of our core specialties. By analyzing the surrounding facial anatomy, eye shapes, and symmetry, our artists carefully reconstruct the missing features naturally.'
    },
    {
      question: 'Will you need my physical print?',
      answer: 'No. AP Visual House works 100% digitally. You keep your original print completely safe at home and only upload high-resolution digital scans or photos.'
    },
    contentPolicyFaq,
    {
      question: 'Why does damaged repair take 48 hours?',
      answer: 'Severe tears, water damage, and missing sections require hours of manual pixel cloning, painting, and texture reconstruction to achieve museum-grade results.'
    }
  ],
  relatedServices: [
    'old-photo-restoration',
    'face-and-detail-enhancement',
    'black-and-white-photo-colorization',
    'photo-enhancement'
  ],
  seoTitle: 'Damaged Photo Repair & Tear Reconstruction | AP Visual House',
  seoDescription: 'Fix torn, water-damaged, folded, and stained family photos. Museum-grade digital restoration starting from ₹399 with 48-hour delivery.'
};

// 10. PHOTO ENHANCEMENT
export const photoEnhancementDetail: ServiceDetailData = {
  id: 'photo-enhancement',
  slug: 'photo-enhancement',
  category: 'Restoration',
  categorySlug: 'photo-restoration',
  categoryId: 'restoration',
  name: 'Photo Enhancement',
  shortDescription: 'Revitalize underexposed, washed out, or dull photographs. Professional dynamic range expansion, shadow recovery, noise reduction, and vibrant color balance.',
  longDescription: 'Great moments are sometimes captured in poor lighting. Our Photo Enhancement service rescues underexposed indoor photos, back-lit silhouettes, grainy smartphone captures, and washed-out event photos—elevating them to commercial, professional-grade visual clarity.',
  startingPrice: 199,
  currency: '₹',
  deliveryTime: '24 Hours',
  revisionPolicy: '1 Minor Revision',
  formats: ['JPG', 'PNG'],
  heroImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=1200',
  imageType: 'restoration',
  imageFit: 'cover',
  imagePosition: 'center 20%',
  galleryImages: [
    {
      title: 'Backlit Shadow Lift',
      description: 'Recovering face details and clothing colors hidden in harsh backlight.',
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=800',
      alt: 'Enhanced backlit portrait of smiling woman'
    },
    {
      title: 'Low-Light Noise Cleansing',
      description: 'Suppressing digital sensor noise while preserving sharp edge sharpness.',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800',
      alt: 'Cleaned low-light enhanced portrait'
    },
    {
      title: 'Vibrant Landscape Dynamic Range',
      description: 'Balancing bright sky clouds with lush foreground details in outdoor photos.',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800',
      alt: 'Enhanced color vibrancy portrait'
    },
    {
      title: 'Event & Party Clarity Correction',
      description: 'Correcting yellow indoor tungsten light casts to natural skin tones.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800',
      alt: 'Enhanced party event lighting'
    }
  ],
  whatWeCreate: [
    {
      title: 'Exposure & Shadow Recovery',
      description: 'Lifting hidden details out of dark shadows without blowing out bright highlights.'
    },
    {
      title: 'Color Cast Neutralization',
      description: 'Fixing unnatural orange, yellow, or greenish indoor lighting to true skin tones.'
    },
    {
      title: 'Smart Noise & Grain Reduction',
      description: 'Smoothing high-ISO digital sensor grain while maintaining crisp eyelashes and textures.'
    },
    {
      title: 'Micro-Contrast & Punch',
      description: 'Giving flat, muddy smartphone photos depth, dimension, and professional polish.'
    }
  ],
  whatCustomerProvides: [
    {
      title: 'Original Digital Image',
      description: 'Upload the original image file directly from your phone or camera (avoid compressed messaging screenshots if possible).'
    },
    {
      title: 'Enhancement Notes',
      description: 'Mention if there are specific dark areas or colors you want emphasized.'
    }
  ],
  whatCustomerReceives: [
    {
      title: 'Crystal Clear Master File',
      description: 'Enhanced image in full resolution, ready for immediate social posting or photo printing.'
    },
    {
      title: 'True-to-Life Color Grading',
      description: 'Balanced contrast and vibrancy calibrated for modern OLED and Retina screens.'
    },
    {
      title: '1 Minor Adjustment Round',
      description: 'Slight warmth, exposure, or saturation adjustments.'
    }
  ],
  uploadConfig: {
    requiredUploads: [
      {
        label: 'Photo to Enhance',
        description: 'Upload your photo in the best resolution you have available.'
      }
    ],
    acceptedFileTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/raw'],
    maxFiles: 5,
    maxFileSize: 10 * 1024 * 1024,
    maxTotalSize: 25 * 1024 * 1024
  },
  faq: [
    {
      question: 'Can you enhance a photo sent over WhatsApp?',
      answer: 'Yes! While original camera photos are always best, our enhancement tools can significantly clean up and sharpen compressed WhatsApp or social media photos.'
    },
    {
      question: 'Will the enhanced photo look natural?',
      answer: 'Yes. We avoid the garish, over-saturated look of cheap automated filters. Our retouchers balance highlights, shadows, and natural skin hues with artistic restraint.'
    },
    contentPolicyFaq,
    {
      question: 'How fast is delivery?',
      answer: 'Standard photo enhancements are completed within 24 hours.'
    }
  ],
  relatedServices: [
    'face-and-detail-enhancement',
    'photo-restoration',
    'professional-profile-image',
    'product-image-enhancement'
  ],
  seoTitle: 'Professional Photo Enhancement Services | AP Visual House',
  seoDescription: 'Fix lighting, shadows, and color casts on underexposed or dull photos. Crisp professional enhancement starting from ₹199 with 24h delivery.'
};

// 11. FACE & DETAIL ENHANCEMENT
export const faceAndDetailEnhancementDetail: ServiceDetailData = {
  id: 'face-and-detail-enhancement',
  slug: 'face-and-detail-enhancement',
  category: 'Restoration',
  categorySlug: 'photo-restoration',
  categoryId: 'restoration',
  name: 'Face & Detail Enhancement',
  shortDescription: 'Restore sharpness to blurry, low-resolution, or soft facial features. Reconstruct eye details, iris definition, hair strands, and subtle facial textures.',
  longDescription: 'Nothing is more frustrating than having the perfect expression captured slightly out-of-focus or at low resolution. Our Face & Detail Enhancement service uses deep visual reconstruction to restore focus, define eyelashes, sharpen irises, and add natural micro-textures to blurry faces.',
  startingPrice: 299,
  currency: '₹',
  deliveryTime: '24 Hours',
  revisionPolicy: '1 Minor Revision',
  formats: ['JPG', 'PNG'],
  heroImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1200',
  imageType: 'restoration',
  imageFit: 'cover',
  imagePosition: 'center 20%',
  galleryImages: [
    {
      title: 'Out-of-Focus Portrait Recovery',
      description: 'Reconstructed eye clarity, eyelashes, and sharp lips on a soft-focus photo.',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800',
      alt: 'Sharp facial details on portrait woman'
    },
    {
      title: 'Low-Resolution Crop Upscaling',
      description: 'Zooming into a group photo face and rendering it at crisp 4K print resolution.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800',
      alt: 'High-detail sharpened man face'
    },
    {
      title: 'Motion Blur Neutralization',
      description: 'Correcting camera hand-shake on spontaneous candid family smiles.',
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=800',
      alt: 'Sharp smile details after motion blur fix'
    },
    {
      title: 'Vintage Miniature Face Sharpening',
      description: 'Bringing tiny background faces in antique prints forward with realistic clarity.',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800',
      alt: 'Archival face detail recovery'
    }
  ],
  whatWeCreate: [
    {
      title: 'Eye & Iris Definition Recovery',
      description: 'Bringing back the catchlight, iris patterns, and eyelash definition in soft eyes.'
    },
    {
      title: 'Skin Texture Synthesis',
      description: 'Adding authentic skin pores and micro-details so faces never look plastic or artificial.'
    },
    {
      title: 'Hair & Brow Strands Definition',
      description: 'Sharpening indistinct hair clumps into clean individual strands and styled contours.'
    },
    {
      title: 'High-Resolution 4X Upscale',
      description: 'Enlarging small low-res crops up to 4000px without blur or pixelated jagged edges.'
    }
  ],
  whatCustomerProvides: [
    {
      title: 'Blurry or Low-Res Source Photo',
      description: 'Upload the photo containing the face you need sharpened.'
    },
    {
      title: 'Subject Focus Instructions',
      description: 'Point out which face in a group photo should receive primary enhancement.'
    }
  ],
  whatCustomerReceives: [
    {
      title: 'Ultra-Sharp High-Definition Portrait',
      description: 'Crisp, crystal-clear facial render ready for canvas framing or profile display.'
    },
    {
      title: 'Natural Facial Authenticity',
      description: 'Maintains genuine identity, jaw contours, and smile structure.'
    },
    {
      title: '1 Polish Revision Round',
      description: 'Subtle adjustments to eye sharpness, skin softness, or tone.'
    }
  ],
  uploadConfig: {
    requiredUploads: [
      {
        label: 'Photo with Blurry Face',
        description: 'Upload the best quality copy you possess of the blurry or low-res photo.'
      }
    ],
    acceptedFileTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/heic'],
    maxFiles: 3,
    maxFileSize: 10 * 1024 * 1024,
    maxTotalSize: 25 * 1024 * 1024
  },
  faq: [
    {
      question: 'Will my face still look like me, or like someone else?',
      answer: 'We prioritize preserving your exact facial identity, bone structure, and unique features. We do not replace your face with an artificial template; we reconstruct your actual features with precision.'
    },
    {
      question: 'Can you sharpen a tiny cropped face from a distant group photo?',
      answer: 'Yes. Even if the face is only 100 pixels wide in a distant group snapshot, our deep reconstruction technology can render it into a sharp, recognizable portrait.'
    },
    contentPolicyFaq,
    {
      question: 'How fast can you deliver?',
      answer: 'Face & Detail Enhancements are completed and delivered within 24 hours.'
    }
  ],
  relatedServices: [
    'photo-enhancement',
    'old-photo-restoration',
    'professional-profile-image',
    'damaged-photo-repair'
  ],
  seoTitle: 'Face & Detail Enhancement Services | AP Visual House',
  seoDescription: 'Fix blurry faces, soft focus, and low-res photos. High-definition facial reconstruction starting from ₹299 with 24-hour delivery.'
};

export const restorationServices: Service[] = [
  {
    id: 'old-photo-restoration',
    categoryId: 'restoration',
    category: 'Restoration',
    categorySlug: 'photo-restoration',
    title: 'Old Photo Restoration',
    description: 'Restore faded, yellowed, and aging family photographs back to archival contrast and rich tonal depth.',
    price: 299,
    deliveryTime: '24–48 Hours',
    image: 'https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&q=80&w=800',
    slug: 'old-photo-restoration',
    imageType: 'restoration',
    imageFit: 'cover',
    imagePosition: 'center 20%',
    detail: oldPhotoRestorationDetail
  },
  {
    id: 'black-and-white-photo-colorization',
    categoryId: 'restoration',
    category: 'Restoration',
    categorySlug: 'photo-restoration',
    title: 'Black & White Photo Colorization',
    description: 'Historically accurate, photorealistic colorization of monochrome vintage prints with lifelike skin tones.',
    price: 299,
    deliveryTime: '24–48 Hours',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800',
    slug: 'black-and-white-photo-colorization',
    imageType: 'restoration',
    imageFit: 'cover',
    imagePosition: 'center 20%',
    detail: blackAndWhitePhotoColorizationDetail
  },
  {
    id: 'damaged-photo-repair',
    categoryId: 'restoration',
    category: 'Restoration',
    categorySlug: 'photo-restoration',
    title: 'Damaged Photo Repair',
    description: 'Reconstruct severely creased, torn, water-damaged, or stained prints back to seamless visual wholeness.',
    price: 399,
    deliveryTime: '48 Hours',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800',
    slug: 'damaged-photo-repair',
    imageType: 'restoration',
    imageFit: 'cover',
    imagePosition: 'center 20%',
    detail: damagedPhotoRepairDetail
  },
  {
    id: 'photo-enhancement',
    categoryId: 'restoration',
    category: 'Restoration',
    categorySlug: 'photo-restoration',
    title: 'Photo Enhancement',
    description: 'Revitalize underexposed, muddy, or dull photographs with professional dynamic range and color vibrancy.',
    price: 199,
    deliveryTime: '24 Hours',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=800',
    slug: 'photo-enhancement',
    imageType: 'restoration',
    imageFit: 'cover',
    imagePosition: 'center 20%',
    detail: photoEnhancementDetail
  },
  {
    id: 'face-and-detail-enhancement',
    categoryId: 'restoration',
    category: 'Restoration',
    categorySlug: 'photo-restoration',
    title: 'Face & Detail Enhancement',
    description: 'Restore sharpness to blurry faces, soft focus, and low-resolution crops with natural skin textures.',
    price: 299,
    deliveryTime: '24 Hours',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800',
    slug: 'face-and-detail-enhancement',
    imageType: 'restoration',
    imageFit: 'cover',
    imagePosition: 'center 20%',
    detail: faceAndDetailEnhancementDetail
  }
];
