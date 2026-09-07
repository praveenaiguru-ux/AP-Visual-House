import { CategoryDetails } from '../../types';

export const categories: CategoryDetails[] = [
  {
    id: 'ai-images',
    slug: 'ai-image-creation',
    shortTitle: 'AI Images',
    title: 'AI Image Creation',
    description: 'Personalized portraits, stylized artwork, and creative digital character illustrations crafted with artistic precision.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'restoration',
    slug: 'photo-restoration',
    shortTitle: 'Restoration',
    title: 'Photo Restoration',
    description: 'Breathe new life into precious family heirlooms, damaged prints, vintage monochrome archives, and low-resolution photos.',
    image: 'https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '3d-visualization',
    slug: '3d-architectural-visualization',
    shortTitle: '3D',
    title: '3D & Architectural Visualization',
    description: 'Transform architectural drawings, floor plans, and sketches into photorealistic 3D spatial renders, facades, and landscapes.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'invitations',
    slug: 'invitations-events',
    shortTitle: 'Invitations',
    title: 'Invitations & Events',
    description: 'Handcrafted digital invitation suites and bespoke stationery designs for weddings, birthdays, baby showers, and festive occasions.',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'product-creatives',
    slug: 'product-social-media-creatives',
    shortTitle: 'Product Creatives',
    title: 'Product & Social Media Creatives',
    description: 'Commercial advertisements, promotional posters, e-commerce enhancements, and social creatives built to elevate brand perception.',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'video-ads',
    slug: 'video-ads',
    shortTitle: 'Video',
    title: 'Video Ads',
    description: 'High-impact product videos, social reels, brand stories, and festive promotional campaigns designed for digital audiences.',
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&q=80&w=800'
  }
];

// Mapping to resolve legacy or alternate category slugs to the canonical category
export const categorySlugAliases: Record<string, string> = {
  'ai-images': 'ai-image-creation',
  'ai-image-creation': 'ai-image-creation',
  'restoration': 'photo-restoration',
  'photo-restoration': 'photo-restoration',
  '3d-visualization': '3d-architectural-visualization',
  '3d-architectural-visualization': '3d-architectural-visualization',
  'invitations': 'invitations-events',
  'invitations-and-events': 'invitations-events',
  'invitations-events': 'invitations-events',
  'product-creatives': 'product-social-media-creatives',
  'product-social-media-creatives': 'product-social-media-creatives',
  'video-ads': 'video-ads'
};

export const categoryIdToSlugMap: Record<string, string> = {
  'ai-images': 'ai-image-creation',
  'restoration': 'photo-restoration',
  '3d-visualization': '3d-architectural-visualization',
  'invitations': 'invitations-events',
  'product-creatives': 'product-social-media-creatives',
  'video-ads': 'video-ads'
};
