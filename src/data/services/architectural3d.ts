import { Service, ServiceDetailData } from '../../types';

const contentPolicyFaq = {
  question: 'What type of content can I submit?',
  answer: "AP Visual House does not accept projects involving nudity, sexually explicit content, profanity, hate or offensive material, or other inappropriate content. Customers are responsible for ensuring that submitted files comply with this policy. If submitted material violates our Content Policy, AP Visual House may decline or discontinue the project."
};

// 12. 2D FLOOR PLAN → 3D FLOOR PLAN
export const floorPlan3dDetail: ServiceDetailData = {
  id: '2d-floor-plan-to-3d-floor-plan',
  slug: '2d-floor-plan-to-3d-floor-plan',
  category: '3D',
  categorySlug: '3d-architectural-visualization',
  categoryId: '3d-visualization',
  name: '2D Floor Plan → 3D Floor Plan',
  shortDescription: 'Convert flat 2D architectural blueprints or hand-drawn sketches into immersive, fully furnished 3D floor plan cutaways with realistic lighting and materials.',
  longDescription: 'Flat technical floor plans can be confusing for clients, buyers, and homeowners. Our 2D to 3D Floor Plan service transforms CAD blueprints, PDF drawings, or hand sketches into furnished isometric 3D models with accurate textures, hardwood flooring, and spatial flow.',
  startingPrice: 999,
  currency: '₹',
  deliveryTime: '2–3 Days',
  revisionPolicy: '1 Round of Refinements',
  formats: ['JPG', 'PNG', 'PDF'],
  heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200',
  imageType: 'architecture',
  imageFit: 'cover',
  imagePosition: 'center',
  galleryImages: [
    {
      title: 'Modern Apartment 3D Cutaway',
      description: 'Fully furnished 2BHK layout with wooden flooring, modern kitchen island, and terrace.',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
      alt: 'Rendered 3D floor plan cutaway of modern residence'
    },
    {
      title: 'Luxury Villa Multi-Level Plan',
      description: 'Open-concept living dining area with double-height ceiling and patio integration.',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800',
      alt: 'Luxury villa 3D floor plan overview'
    },
    {
      title: 'Commercial Office Space Layout',
      description: 'Ergonomic workstation clusters, glass executive cabins, and welcoming reception.',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800',
      alt: 'Commercial office 3D floor layout plan'
    },
    {
      title: 'Compact Studio Space Maximization',
      description: 'Micro-apartment visualization featuring modular furniture and smart room division.',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800',
      alt: 'Compact studio 3D floor layout'
    }
  ],
  whatWeCreate: [
    {
      title: 'Furnished Cutaway Overviews',
      description: 'Top-down isometric views showing walls, door swings, and contemporary furniture layouts.'
    },
    {
      title: 'Realistic Material & Texture Mapping',
      description: 'Accurate hardwood, marble, ceramic tile, and carpet textures applied throughout.'
    },
    {
      title: 'Marketing-Ready Sales Visuals',
      description: 'Polished renders designed for real estate brochures, websites, and client presentations.'
    },
    {
      title: 'Dimensioned & Non-Dimensioned Versions',
      description: 'Clean aesthetic version for marketing and annotated layout for construction reference.'
    }
  ],
  whatCustomerProvides: [
    {
      title: '2D Floor Plan or Blueprint',
      description: 'AutoCAD DWG, PDF blueprint, or clear hand-drawn sketch with room dimensions.'
    },
    {
      title: 'Flooring & Style Preferences',
      description: 'Light oak, Italian marble, contemporary minimalist furniture, or traditional styling.'
    }
  ],
  whatCustomerReceives: [
    {
      title: 'High-Resolution 4K Renderings',
      description: 'Crisp isometric angle renders at 300 DPI suitable for large banners and digital displays.'
    },
    {
      title: 'Standard Top-Down Orthographic View',
      description: 'Bird-eye straight down perspective matching the architectural drawings.'
    },
    {
      title: '1 Round of Design Refinements',
      description: 'Furniture repositioning or flooring material color adjustments.'
    }
  ],
  uploadConfig: {
    requiredUploads: [
      {
        label: '2D Plan File / Blueprint',
        description: 'Upload your CAD drawing, PDF blueprint, or hand-drawn plan sketch with dimensions.'
      }
    ],
    optionalUploads: [
      {
        label: 'Furniture / Material Preferences',
        description: 'Optional mood board or notes on preferred tile, wood, and color palette.'
      }
    ],
    acceptedFileTypes: ['application/pdf', 'image/jpeg', 'image/png', 'application/acad', 'application/x-dwg', 'image/vnd.dwg'],
    maxFiles: 5,
    maxFileSize: 10 * 1024 * 1024,
    maxTotalSize: 25 * 1024 * 1024
  },
  faq: [
    {
      question: 'Can you work from a rough hand-drawn sketch?',
      answer: 'Yes! Even if you don’t have AutoCAD files, a clean hand-drawn sketch with room dimensions and door locations is sufficient for us to model your 3D floor plan.'
    },
    {
      question: 'How is the final pricing calculated?',
      answer: 'Base pricing starts from ₹999 for single-level apartments up to 1,000 sq.ft. Multi-level villas, large commercial complexes, or extensive bespoke furniture require a custom quote based on area.'
    },
    contentPolicyFaq,
    {
      question: 'What is the turnaround time for a 3D floor plan?',
      answer: 'Typical turnaround is 2–3 business days. Expedited delivery is available upon request.'
    }
  ],
  relatedServices: [
    'interior-visualization',
    'exterior-visualization',
    'building-plan-to-front-elevation',
    'house-colour-visualization'
  ],
  seoTitle: '2D to 3D Floor Plan Conversion Services | AP Visual House',
  seoDescription: 'Transform 2D blueprints into photorealistic furnished 3D floor plans. Starting from ₹999 with 2–3 days delivery and 4K renders.'
};

// 13. BUILDING PLAN → FRONT ELEVATION
export const buildingPlanElevationDetail: ServiceDetailData = {
  id: 'building-plan-to-front-elevation',
  slug: 'building-plan-to-front-elevation',
  category: '3D',
  categorySlug: '3d-architectural-visualization',
  categoryId: '3d-visualization',
  name: 'Building Plan → Front Elevation',
  shortDescription: 'Translate architectural 2D line elevations into striking, photorealistic 3D facade designs with contemporary materials, lighting, and glass balconies.',
  longDescription: 'Visualize your dream home facade before construction starts. Our Building Plan to Front Elevation service transforms structural blueprints and line drawings into photorealistic 3D elevations featuring modern wood cladding, stone tiles, architectural glass, and ambient night lighting.',
  startingPrice: 999,
  currency: '₹',
  deliveryTime: '2–3 Days',
  revisionPolicy: '1 Round of Refinements',
  formats: ['JPG', 'PNG', 'PDF'],
  heroImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200',
  imageType: 'architecture',
  imageFit: 'cover',
  imagePosition: 'center',
  galleryImages: [
    {
      title: 'Modern Minimalist Villa Facade',
      description: 'Clean geometric lines, textured stone cladding, and warm wood louvers.',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800',
      alt: 'Modern residential front elevation 3D render'
    },
    {
      title: 'Contemporary Multi-Storey Residence',
      description: 'Cantilevered balconies, glass railings, and recessed architectural spot lighting.',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
      alt: 'Multi-storey building front elevation 3D view'
    },
    {
      title: 'Dusk Lighting Facade Render',
      description: 'Warm interior ambient spill, exterior wall sconces, and twilight sky backdrop.',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800',
      alt: 'Dusk front elevation render with lighting'
    },
    {
      title: 'Traditional & Heritage Fusion Facade',
      description: 'Pitched roof elements, ornamental brackets, and earthy stone masonry.',
      image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80&w=800',
      alt: 'Heritage fusion residential front elevation'
    }
  ],
  whatWeCreate: [
    {
      title: 'Photorealistic Front Elevation 3D Views',
      description: 'Eye-level and three-quarter perspective angles highlighting architectural depth.'
    },
    {
      title: 'Material & Texture Specifications',
      description: 'Visualizing accurate exterior paints, natural stone, composite panels, and glass.'
    },
    {
      title: 'Daylight & Twilight Lighting Studies',
      description: 'Daylight sun study plus dramatic dusk lighting showcasing exterior fixtures.'
    },
    {
      title: 'Construction Reference Visuals',
      description: 'High-detail renders that guide your contractor and architect on material placement.'
    }
  ],
  whatCustomerProvides: [
    {
      title: 'Architectural Line Drawing / Blueprint',
      description: 'Front line elevation drawing or 2D floor plans with floor-to-floor heights.'
    },
    {
      title: 'Style Direction & Material Ideas',
      description: 'Modern, classical, industrial, or minimalist; preferred exterior colors or stone finishes.'
    }
  ],
  whatCustomerReceives: [
    {
      title: 'Ultra-High-Resolution 4K Renders',
      description: 'Printable 300 DPI master image files ready for hoardings, banners, or wall frames.'
    },
    {
      title: 'Day & Evening Lighting Perspectives',
      description: 'Two lighting scenarios highlighting daytime materials and nighttime facade elegance.'
    },
    {
      title: '1 Round of Material Refinements',
      description: 'Adjustment of paint colors, tile choices, or railing styles.'
    }
  ],
  uploadConfig: {
    requiredUploads: [
      {
        label: 'Front Elevation / Blueprint',
        description: 'Upload 2D elevation drawing, CAD file, or floor plan blueprint.'
      }
    ],
    optionalUploads: [
      {
        label: 'Material / Style Examples',
        description: 'Photos of house facades or finishes that inspire your dream design.'
      }
    ],
    acceptedFileTypes: ['application/pdf', 'image/jpeg', 'image/png', 'application/acad', 'application/x-dwg'],
    maxFiles: 5,
    maxFileSize: 10 * 1024 * 1024,
    maxTotalSize: 25 * 1024 * 1024
  },
  faq: [
    {
      question: 'What if I only have the floor plans and no elevation drawing?',
      answer: 'We can design a custom modern front elevation directly from your floor plans! Simply tell us your style preference (modern box, traditional pitched roof, or contemporary fusion) and our 3D architects will model the facade.'
    },
    {
      question: 'Can my civil contractor use these renders for construction?',
      answer: 'Yes. Our 3D elevations are accurately proportioned according to your structural floor heights and wall measurements, providing an unambiguous visual reference for builders.'
    },
    contentPolicyFaq,
    {
      question: 'How long does elevation rendering take?',
      answer: 'Typical delivery is 2 to 3 days depending on facade complexity and detail requirements.'
    }
  ],
  relatedServices: [
    'exterior-visualization',
    'house-colour-visualization',
    '2d-floor-plan-to-3d-floor-plan',
    'landscape-visualization'
  ],
  seoTitle: 'Building Plan to Front Elevation 3D Design | AP Visual House',
  seoDescription: 'Convert 2D building plans into photorealistic 3D front elevations. Modern facades, stone & wood textures starting from ₹999 with 2–3 days delivery.'
};

// 14. EXTERIOR VISUALIZATION
export const exteriorVisualizationDetail: ServiceDetailData = {
  id: 'exterior-visualization',
  slug: 'exterior-visualization',
  category: '3D',
  categorySlug: '3d-architectural-visualization',
  categoryId: '3d-visualization',
  name: 'Exterior Visualization',
  shortDescription: 'Cinematic, hyper-realistic exterior 3D architectural renders. Showcase residential villas, commercial complexes, and developments in realistic environments.',
  longDescription: 'Captivate property buyers, investors, and clients with photorealistic 3D exterior visualization. We model entire structures with true-to-life solar shadows, lush landscaping, vehicle integration, paving textures, and atmospheric sky lighting.',
  startingPrice: 1499,
  currency: '₹',
  deliveryTime: '2–3 Days',
  revisionPolicy: '1 Round of Refinements',
  formats: ['JPG', 'PNG', 'PDF Master'],
  heroImage: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80&w=1200',
  imageType: 'architecture',
  imageFit: 'cover',
  imagePosition: 'center',
  galleryImages: [
    {
      title: 'Luxury Contemporary Villa & Pool',
      description: 'Reflection pool, manicured lawns, outdoor pergola, and expansive glass glazing.',
      image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80&w=800',
      alt: 'Luxury contemporary villa 3D exterior render with swimming pool'
    },
    {
      title: 'Gated Community Residential Rowhouses',
      description: 'Multiple cohesive units with streetscaping, driveway pavers, and evening streetlights.',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
      alt: 'Residential rowhouse community 3D exterior visualization'
    },
    {
      title: 'Dusk Atmosphere with Illuminated Interiors',
      description: 'Warm interior lights glowing through full-height curtain walls against deep twilight.',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800',
      alt: 'Atmospheric dusk architectural exterior render'
    },
    {
      title: 'Commercial Retail & Office Plaza',
      description: 'Pedestrian plaza, architectural facade cladding, branded signage, and natural vegetation.',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
      alt: 'Commercial plaza exterior 3D visualization'
    }
  ],
  whatWeCreate: [
    {
      title: 'Cinematic Eye-Level & Aerial Shots',
      description: 'Human-scale perspectives plus dramatic bird’s-eye views contextualizing the property.'
    },
    {
      title: 'Environmental Landscaping & Staging',
      description: 'Realistic mature trees, shrubs, manicured grass, driveways, cars, and ambient figures.'
    },
    {
      title: 'Physically Based Material Shading',
      description: 'Pristine concrete, polished glass reflections, wood siding, and metal accents.'
    },
    {
      title: 'Marketing & Investor Presentations',
      description: 'Ready-to-publish renders for builder brochures, hoarding billboards, and investor decks.'
    }
  ],
  whatCustomerProvides: [
    {
      title: 'Architectural Plans / CAD / 3D Model',
      description: 'CAD DWG files, Revit/SketchUp model if available, or comprehensive 2D drawing set.'
    },
    {
      title: 'Site Details & Surrounding Context',
      description: 'Photographs of the actual site or notes on surrounding vegetation and orientation.'
    }
  ],
  whatCustomerReceives: [
    {
      title: 'High-Resolution 4K+ Visual Exports',
      description: 'Master render exports at 300 DPI for billboard-ready clarity and print sharpness.'
    },
    {
      title: 'Multiple Perspective Views',
      description: 'Front perspective, angled three-quarter view, and dramatic dusk/twilight render.'
    },
    {
      title: '1 Round of Design Refinement',
      description: 'Material tone adjustments, landscaping density tweaks, or lighting balancing.'
    }
  ],
  uploadConfig: {
    requiredUploads: [
      {
        label: 'Architectural Drawings / CAD File',
        description: 'Upload your CAD drawings, 3D model files (SKP/FBX), or PDF plans.'
      }
    ],
    optionalUploads: [
      {
        label: 'Site Photos & Material Palette',
        description: 'Photos of the site, adjacent buildings, or desired finishes.'
      }
    ],
    acceptedFileTypes: ['application/pdf', 'application/acad', 'application/x-dwg', 'image/jpeg', 'image/png', 'application/zip'],
    maxFiles: 5,
    maxFileSize: 10 * 1024 * 1024,
    maxTotalSize: 25 * 1024 * 1024
  },
  faq: [
    {
      question: 'What file formats can you accept for 3D exterior rendering?',
      answer: 'We accept AutoCAD (.dwg), SketchUp (.skp), Revit (.rvt), 3ds Max, OBJ/FBX, and standard PDF architectural sets. If you only have PDFs or sketches, we can build the 3D geometry from scratch.'
    },
    {
      question: 'How does pricing work for large properties?',
      answer: 'Starting base pricing begins from ₹1,499 for single residential villas. Multi-unit developments, commercial towers, or large-scale townships are quoted based on site scale and camera counts.'
    },
    contentPolicyFaq,
    {
      question: 'Can you match the exact physical paint and tile brands we plan to use?',
      answer: 'Yes! Send us the product codes or swatch images (e.g., Asian Paints shade codes, specific tile models), and we will match the reflectance, bump maps, and colors accurately.'
    }
  ],
  relatedServices: [
    'building-plan-to-front-elevation',
    'interior-visualization',
    'landscape-visualization',
    'house-colour-visualization'
  ],
  seoTitle: '3D Exterior Architectural Visualization Services | AP Visual House',
  seoDescription: 'Hyper-realistic 3D exterior architectural rendering for villas, apartments, and developments. Starting from ₹1,499 with 2–3 days delivery.'
};

// 15. INTERIOR VISUALIZATION
export const interiorVisualizationDetail: ServiceDetailData = {
  id: 'interior-visualization',
  slug: 'interior-visualization',
  category: '3D',
  categorySlug: '3d-architectural-visualization',
  categoryId: '3d-visualization',
  name: 'Interior Visualization',
  shortDescription: 'Photorealistic 3D interior design renders. Visualize living rooms, modular kitchens, luxury bedrooms, and commercial spaces with authentic lighting and bespoke furnishings.',
  longDescription: 'Eliminate design guesswork before purchasing furniture or renovating. Our Interior Visualization service creates photorealistic 3D views of living rooms, master suites, modern kitchens, and commercial retail spaces with accurate lighting simulation, material textures, and curated styling.',
  startingPrice: 1499,
  currency: '₹',
  deliveryTime: '2–3 Days',
  revisionPolicy: '1 Round of Refinements',
  formats: ['JPG', 'PNG', 'PDF'],
  heroImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200',
  imageType: 'architecture',
  imageFit: 'cover',
  imagePosition: 'center',
  galleryImages: [
    {
      title: 'Modern Contemporary Living Room',
      description: 'Fluted wooden accent wall, recessed LED profile lighting, and neutral linen sofa.',
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800',
      alt: 'Photorealistic 3D living room interior render'
    },
    {
      title: 'Sleek Modular Kitchen & Island',
      description: 'Quartz waterfall countertop, matte acrylic cabinets, and warm under-cabinet lighting.',
      image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=800',
      alt: 'Modular kitchen interior 3D visualization'
    },
    {
      title: 'Luxury Master Bedroom Suite',
      description: 'Cushioned headboard paneling, integrated wardrobe glass doors, and ambient reading sconces.',
      image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&q=80&w=800',
      alt: 'Luxury bedroom 3D interior render'
    },
    {
      title: 'Boutique Commercial Cafe & Reception',
      description: 'Terrazzo counter, arched wall niches, brass fixtures, and indoor botanical staging.',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800',
      alt: 'Commercial cafe interior visualization'
    }
  ],
  whatWeCreate: [
    {
      title: 'Photorealistic 3D Room Perspectives',
      description: 'Multiple camera angles capturing the best vantage points of the room.'
    },
    {
      title: 'Accurate Lighting Simulation',
      description: 'Natural sun angle through windows combined with warm interior artificial lights and spotlights.'
    },
    {
      title: 'Custom Millwork & Modular Furniture',
      description: 'Modeling bespoke TV units, wardrobes, false ceilings, and kitchen cabinetry to spec.'
    },
    {
      title: 'Decor & Texture Styling',
      description: 'Rugs, curtains, artwork, throw pillows, and indoor planters for lived-in warmth.'
    }
  ],
  whatCustomerProvides: [
    {
      title: 'Room Dimensions / Floor Plan',
      description: 'Measurements of the room, ceiling height, and window/door locations.'
    },
    {
      title: 'Design Mood Board or Ideas',
      description: 'Preferred aesthetic (Scandinavian, Japandi, Modern Minimalist, Traditional Indian, Industrial).'
    }
  ],
  whatCustomerReceives: [
    {
      title: 'High-Resolution 4K Render Package',
      description: 'Crisp 300 DPI image files showcasing wide-angle and close-up vignette views.'
    },
    {
      title: 'Day & Night Lighting Setups',
      description: 'Views showing daytime natural sun ambience and cozy evening mood lighting.'
    },
    {
      title: '1 Round of Material & Color Tweaks',
      description: 'Adjust wall paint colors, wood laminate shades, or fabric choices.'
    }
  ],
  uploadConfig: {
    requiredUploads: [
      {
        label: 'Room Dimensions / Plan',
        description: 'Upload floor plan, CAD file, or hand sketch with wall lengths and ceiling heights.'
      }
    ],
    optionalUploads: [
      {
        label: 'Inspiration / Furniture Photos',
        description: 'Reference images of sofas, kitchens, or colors you love.'
      }
    ],
    acceptedFileTypes: ['application/pdf', 'image/jpeg', 'image/png', 'application/acad', 'application/x-dwg'],
    maxFiles: 5,
    maxFileSize: 10 * 1024 * 1024,
    maxTotalSize: 25 * 1024 * 1024
  },
  faq: [
    {
      question: 'Can you render a specific sofa or furniture piece I plan to buy?',
      answer: 'Yes! Send us a photo or product link from IKEA, Pepperfry, or your local vendor, and we will place matching 3D furniture into the scene.'
    },
    {
      question: 'How many views do I get per room?',
      answer: 'Our standard package includes 2 primary high-resolution views of the room from complementary angles. Additional camera views can be added at a nominal cost.'
    },
    contentPolicyFaq,
    {
      question: 'How long does an interior visualization take?',
      answer: 'A standard room visualization takes 2–3 business days.'
    }
  ],
  relatedServices: [
    '2d-floor-plan-to-3d-floor-plan',
    'exterior-visualization',
    'house-colour-visualization',
    'building-plan-to-front-elevation'
  ],
  seoTitle: '3D Interior Design Visualization Services | AP Visual House',
  seoDescription: 'Photorealistic 3D interior rendering for living rooms, modular kitchens, and bedrooms. Starting from ₹1,499 with 2–3 days delivery.'
};

// 16. HOUSE COLOUR VISUALIZATION
export const houseColourVisualizationDetail: ServiceDetailData = {
  id: 'house-colour-visualization',
  slug: 'house-colour-visualization',
  category: '3D',
  categorySlug: '3d-architectural-visualization',
  categoryId: '3d-visualization',
  name: 'House Colour Visualization',
  shortDescription: 'Preview exterior paint combinations on your actual home before painting. Test modern color schemes, accent walls, and trim colors with 100% confidence.',
  longDescription: 'Painting your home is a major investment and mistakes are expensive to redo. Our House Colour Visualization service takes a clear photo of your actual house and digitally applies realistic paint shades, trim accents, texture finishes, and contrasting borders so you can choose your color palette with total certainty.',
  startingPrice: 699,
  currency: '₹',
  deliveryTime: '24–48 Hours',
  revisionPolicy: '1 Minor Revision',
  formats: ['JPG', 'PNG'],
  heroImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1200',
  imageType: 'architecture',
  imageFit: 'cover',
  imagePosition: 'center',
  galleryImages: [
    {
      title: 'Warm Beige & Charcoal Accents',
      description: 'Elegant earthy neutrals paired with dark charcoal trim and window borders.',
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800',
      alt: 'Modern exterior paint color visualization'
    },
    {
      title: 'Crisp Off-White & Teak Wood Trim',
      description: 'Minimalist Scandinavian aesthetic highlighting warm wooden pillars and eaves.',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
      alt: 'White exterior house paint visualization'
    },
    {
      title: 'Modern Dual-Tone Grey & Terracotta',
      description: 'Contemporary architectural color blocking with warm terracotta accent walls.',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800',
      alt: 'Dual tone house paint visualization'
    },
    {
      title: 'Traditional Ochre & White Trims',
      description: 'Heritage aesthetic with sunny warm ochre walls, white cornices, and dark brown doors.',
      image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80&w=800',
      alt: 'Traditional exterior house color scheme'
    }
  ],
  whatWeCreate: [
    {
      title: 'Realistic Paint Simulations on Real Photos',
      description: 'Applying paint coatings over your actual walls while retaining natural surface textures and shadows.'
    },
    {
      title: 'Multi-Option Color Schemes',
      description: '2 to 3 distinct color combinations (e.g. Modern Neutral, Warm Earthy, Bold Contrast).'
    },
    {
      title: 'Trim, Pillar & Accent Highlighting',
      description: 'Testing separate complementary colors for boundary walls, pillars, window trims, and pergolas.'
    },
    {
      title: 'Manufacturer Shade Code Matching',
      description: 'Matching popular paint brand shade codes (Asian Paints, Berger, Nerolac, Dulux).'
    }
  ],
  whatCustomerProvides: [
    {
      title: 'Daylight Photo of Your House',
      description: 'A clear, wide-angle photo of your house taken in natural daylight without harsh shadows.'
    },
    {
      title: 'Preferred Colors or Paint Codes',
      description: 'List your favorite color ideas or specific paint shade names you want tested.'
    }
  ],
  whatCustomerReceives: [
    {
      title: 'High-Resolution Visual Comparison',
      description: 'Clear, high-res images of your home in 2 to 3 distinct exterior color palettes.'
    },
    {
      title: 'Color Palette Summary Card',
      description: 'Reference card noting the exact body, trim, and accent paint tones used.'
    },
    {
      title: '1 Minor Tone Revision Round',
      description: 'Fine-tuning a specific shade lighter or darker according to family feedback.'
    }
  ],
  uploadConfig: {
    requiredUploads: [
      {
        label: 'House Photograph',
        description: 'Upload a clear daytime photo of the house facade from the front or three-quarters.'
      }
    ],
    optionalUploads: [
      {
        label: 'Color Swatches / Ideas',
        description: 'Optional paint shade names, shade card numbers, or example houses you like.'
      }
    ],
    acceptedFileTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/heic'],
    maxFiles: 4,
    maxFileSize: 10 * 1024 * 1024,
    maxTotalSize: 25 * 1024 * 1024
  },
  faq: [
    {
      question: 'Do I need architectural CAD drawings for this service?',
      answer: 'No! All you need is a clear photo of your existing house taken on your smartphone in daylight. We digitally mask the walls and apply realistic paint simulations directly onto the photo.'
    },
    {
      question: 'How many color combinations do I get to see?',
      answer: 'Our base package includes 2 to 3 distinct color scheme options so you and your family can compare and choose with confidence.'
    },
    contentPolicyFaq,
    {
      question: 'Can you match specific Asian Paints or Berger shade codes?',
      answer: 'Yes! Simply give us the 4-digit code or shade name (e.g. "Morning Glory" or "Camel"), and we will simulate that exact tone.'
    }
  ],
  relatedServices: [
    'building-plan-to-front-elevation',
    'exterior-visualization',
    'landscape-visualization',
    '2d-floor-plan-to-3d-floor-plan'
  ],
  seoTitle: 'House Colour Visualization & Paint Simulator | AP Visual House',
  seoDescription: 'Test exterior paint colors on your actual house photo before painting. Avoid costly mistakes. Starting from ₹699 with 24–48h delivery.'
};

// 17. LANDSCAPE VISUALIZATION
export const landscapeVisualizationDetail: ServiceDetailData = {
  id: 'landscape-visualization',
  slug: 'landscape-visualization',
  category: '3D',
  categorySlug: '3d-architectural-visualization',
  categoryId: '3d-visualization',
  name: 'Landscape Visualization',
  shortDescription: '3D outdoor garden, terrace, and landscape design renders. Transform outdoor yards, swimming pools, pathways, pergolas, and plants into lush photorealistic retreats.',
  longDescription: 'Outdoor spaces extend the living experience of any home or commercial resort. Our Landscape Visualization service transforms vacant plots, rooftops, backyards, and terraces into serene, beautifully landscaped retreats featuring lush botanical foliage, stone pathways, water bodies, and ambient outdoor lighting.',
  startingPrice: 999,
  currency: '₹',
  deliveryTime: '2–3 Days',
  revisionPolicy: '1 Round of Refinements',
  formats: ['JPG', 'PNG', 'PDF'],
  heroImage: 'https://images.unsplash.com/photo-1558036117-15d82a90b9b1?auto=format&fit=crop&q=80&w=1200',
  imageType: 'architecture',
  imageFit: 'cover',
  imagePosition: 'center',
  galleryImages: [
    {
      title: 'Modern Backyard Garden & Deck',
      description: 'Composite wood deck, minimalist fire pit, recessed step lighting, and bamboo screen.',
      image: 'https://images.unsplash.com/photo-1558036117-15d82a90b9b1?auto=format&fit=crop&q=80&w=800',
      alt: 'Backyard garden landscape 3D visualization'
    },
    {
      title: 'Terrace Garden & Pergola Lounge',
      description: 'Rooftop sanctuary with vertical greenery wall, weather-resistant sofa, and steel pergola.',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800',
      alt: 'Rooftop terrace garden 3D render'
    },
    {
      title: 'Resort Pool & Tropical Landscaping',
      description: 'Natural stone coping, sunken sun lounger shelf, palm trees, and evening bollard lights.',
      image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80&w=800',
      alt: 'Swimming pool landscape 3D render'
    },
    {
      title: 'Front Courtyard & Entryway Pavers',
      description: 'Permeable grass pavers, fountain centerpiece, flowering border beds, and entry gate.',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
      alt: 'Front courtyard landscape design 3D view'
    }
  ],
  whatWeCreate: [
    {
      title: 'Photorealistic 3D Garden & Patio Renders',
      description: 'Lush visual perspectives showcasing plant zoning, seating areas, and pathway flow.'
    },
    {
      title: 'Hardscape & Material Visualization',
      description: 'Pavers, natural slate, wooden decking, retaining walls, and modern shade pergolas.'
    },
    {
      title: 'Botanical & Foliage Variety',
      description: 'Accurately modeled turf grass, tropical palms, flowering shrubs, and privacy hedges.'
    },
    {
      title: 'Evening Outdoor Lighting Study',
      description: 'Spike lights illuminating trees, step strip lights, and underwater pool illumination.'
    }
  ],
  whatCustomerProvides: [
    {
      title: 'Site Measurements or Photos',
      description: 'Photos of the current yard/terrace and rough dimensions of the outdoor area.'
    },
    {
      title: 'Desired Features List',
      description: 'Pergola, water fountain, barbecue counter, swimming pool, fire pit, or play lawn.'
    }
  ],
  whatCustomerReceives: [
    {
      title: 'High-Resolution 4K Renderings',
      description: 'Print-ready exports at 300 DPI showing full landscape coverage from multiple angles.'
    },
    {
      title: 'Day and Dusk Lighting Views',
      description: 'Two lighting scenarios demonstrating daylight greenery and dramatic nighttime illumination.'
    },
    {
      title: '1 Round of Landscape Refinements',
      description: 'Tweaking plant types, moving furniture, or adjusting pathway paving materials.'
    }
  ],
  uploadConfig: {
    requiredUploads: [
      {
        label: 'Plot Plan / Yard Photos',
        description: 'Upload site layout, plot dimensions, or photos of the current open space.'
      }
    ],
    optionalUploads: [
      {
        label: 'Inspiration / Plant Ideas',
        description: 'Reference images of patio lounges or specific plants you love.'
      }
    ],
    acceptedFileTypes: ['application/pdf', 'image/jpeg', 'image/png', 'application/acad', 'application/x-dwg'],
    maxFiles: 5,
    maxFileSize: 10 * 1024 * 1024,
    maxTotalSize: 25 * 1024 * 1024
  },
  faq: [
    {
      question: 'Can you design a landscape for a rooftop terrace or balcony?',
      answer: 'Yes! Terrace gardens, rooftop lounges, and balcony planters are among our most frequent requests. We optimize the design for space, weight constraints, and drainage.'
    },
    {
      question: 'How do you choose which plants to include in the 3D render?',
      answer: 'We select realistic foliage appropriate for your climate (e.g. drought-tolerant succulents, tropical palms, or flowering perennials) or customize according to your preferred plant species.'
    },
    contentPolicyFaq,
    {
      question: 'How long does landscape rendering take?',
      answer: 'Standard residential landscape designs take 2–3 business days.'
    }
  ],
  relatedServices: [
    'exterior-visualization',
    'house-colour-visualization',
    'building-plan-to-front-elevation',
    'interior-visualization'
  ],
  seoTitle: '3D Landscape & Garden Visualization Services | AP Visual House',
  seoDescription: 'Transform yards, rooftop terraces, and pools into lush 3D retreats. Starting from ₹999 with 2–3 days delivery and 4K photorealistic renders.'
};

export const architectural3dServices: Service[] = [
  {
    id: '2d-floor-plan-to-3d-floor-plan',
    categoryId: '3d-visualization',
    category: '3D',
    categorySlug: '3d-architectural-visualization',
    title: '2D Floor Plan → 3D Floor Plan',
    description: 'Transform 2D blueprints into immersive, furnished 3D floor plan cutaways with realistic lighting and materials.',
    price: 999,
    deliveryTime: '2–3 Days',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
    slug: '2d-floor-plan-to-3d-floor-plan',
    imageType: 'architecture',
    imageFit: 'cover',
    imagePosition: 'center',
    detail: floorPlan3dDetail
  },
  {
    id: 'building-plan-to-front-elevation',
    categoryId: '3d-visualization',
    category: '3D',
    categorySlug: '3d-architectural-visualization',
    title: 'Building Plan → Front Elevation',
    description: 'Convert 2D line elevations into photorealistic 3D facade designs with modern finishes, glass, and wood textures.',
    price: 999,
    deliveryTime: '2–3 Days',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800',
    slug: 'building-plan-to-front-elevation',
    imageType: 'architecture',
    imageFit: 'cover',
    imagePosition: 'center',
    detail: buildingPlanElevationDetail
  },
  {
    id: 'exterior-visualization',
    categoryId: '3d-visualization',
    category: '3D',
    categorySlug: '3d-architectural-visualization',
    title: 'Exterior Visualization',
    description: 'Hyper-realistic 3D exterior architectural rendering for residential villas, commercial complexes, and developments.',
    price: 1499,
    deliveryTime: '2–3 Days',
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80&w=800',
    slug: 'exterior-visualization',
    imageType: 'architecture',
    imageFit: 'cover',
    imagePosition: 'center',
    detail: exteriorVisualizationDetail
  },
  {
    id: 'interior-visualization',
    categoryId: '3d-visualization',
    category: '3D',
    categorySlug: '3d-architectural-visualization',
    title: 'Interior Visualization',
    description: 'Photorealistic 3D interior renders for living rooms, modular kitchens, luxury bedrooms, and commercial spaces.',
    price: 1499,
    deliveryTime: '2–3 Days',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800',
    slug: 'interior-visualization',
    imageType: 'architecture',
    imageFit: 'cover',
    imagePosition: 'center',
    detail: interiorVisualizationDetail
  },
  {
    id: 'house-colour-visualization',
    categoryId: '3d-visualization',
    category: '3D',
    categorySlug: '3d-architectural-visualization',
    title: 'House Colour Visualization',
    description: 'Preview exterior paint combinations on your actual home before painting. Test color schemes with total confidence.',
    price: 699,
    deliveryTime: '24–48 Hours',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800',
    slug: 'house-colour-visualization',
    imageType: 'architecture',
    imageFit: 'cover',
    imagePosition: 'center',
    detail: houseColourVisualizationDetail
  },
  {
    id: 'landscape-visualization',
    categoryId: '3d-visualization',
    category: '3D',
    categorySlug: '3d-architectural-visualization',
    title: 'Landscape Visualization',
    description: '3D outdoor garden, terrace, and pool design renders. Transform open yards into lush photorealistic sanctuaries.',
    price: 999,
    deliveryTime: '2–3 Days',
    image: 'https://images.unsplash.com/photo-1558036117-15d82a90b9b1?auto=format&fit=crop&q=80&w=800',
    slug: 'landscape-visualization',
    imageType: 'architecture',
    imageFit: 'cover',
    imagePosition: 'center',
    detail: landscapeVisualizationDetail
  }
];
