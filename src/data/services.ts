import { CategoryDetails, Service, ServiceDetailData } from '../types';

// Categories metadata and aliases
export {
  categories,
  categorySlugAliases,
  categoryIdToSlugMap
} from './services/categories';

import {
  categories,
  categorySlugAliases,
  categoryIdToSlugMap
} from './services/categories';

// Category 1: AI Images
export {
  aiImageServices,
  aiImageServices as aiImagesServices,
  cartoonPortraitDetail,
  creativeAiPortraitDetail,
  cinematicPortraitDetail,
  professionalProfileImageDetail,
  professionalProfileImageDetail as professionalProfileDetail,
  couplePortraitDetail,
  familyCreativePortraitDetail
} from './services/aiImages';
import { aiImageServices } from './services/aiImages';

// Category 2: Photo Restoration
export {
  restorationServices,
  oldPhotoRestorationDetail,
  blackAndWhitePhotoColorizationDetail,
  blackAndWhitePhotoColorizationDetail as bwColorizationDetail,
  damagedPhotoRepairDetail,
  photoEnhancementDetail,
  faceAndDetailEnhancementDetail,
  faceAndDetailEnhancementDetail as faceDetailEnhancementDetail
} from './services/restoration';
import { restorationServices } from './services/restoration';

// Category 3: 3D & Architectural Visualization
export {
  architectural3dServices,
  floorPlan3dDetail,
  buildingPlanElevationDetail,
  exteriorVisualizationDetail,
  interiorVisualizationDetail,
  houseColourVisualizationDetail,
  landscapeVisualizationDetail
} from './services/architectural3d';
import { architectural3dServices } from './services/architectural3d';

// Category 4: Invitations & Events
export {
  invitationsServices,
  birthdayInvitationDetail,
  weddingInvitationDetail,
  engagementInvitationDetail,
  babyShowerInvitationDetail,
  anniversaryInvitationDetail,
  housewarmingInvitationDetail,
  namingCeremonyInvitationDetail,
  festivalInvitationDetail
} from './services/invitations';
import { invitationsServices } from './services/invitations';

// Category 5: Product & Social Media Creatives
export {
  productCreativeServices,
  productAdvertisementDetail,
  instagramCreativeDetail,
  promotionalPosterDetail,
  festivalOfferCreativeDetail,
  productImageEnhancementDetail,
  socialMediaBannerDetail
} from './services/productCreatives';
import { productCreativeServices } from './services/productCreatives';

// Category 6: Video & Motion Ads
export {
  videoAdsServices,
  shortBrandVideoDetail,
  productVideoAdDetail,
  socialMediaPromotionalVideoDetail,
  festivalPromotionalVideoDetail,
  productShowcaseVideoDetail
} from './services/videoAds';
import { videoAdsServices } from './services/videoAds';

// Aggregate all 36 services
export const services: Service[] = [
  ...aiImageServices,
  ...restorationServices,
  ...architectural3dServices,
  ...invitationsServices,
  ...productCreativeServices,
  ...videoAdsServices
];

// Ensure normalized categorySlug on all services
services.forEach((service) => {
  if (!service.categorySlug && service.categoryId) {
    service.categorySlug = categoryIdToSlugMap[service.categoryId] || service.categoryId;
  }
});

export const categorySlugMap: Record<string, string> = {
  'ai-images': 'ai-image-creation',
  'restoration': 'photo-restoration',
  '3d-visualization': '3d-architectural-visualization',
  'invitations': 'invitations-events',
  'product-creatives': 'product-social-media-creatives',
  'video-ads': 'video-ads'
};

/**
 * Resolve category details by slug or ID with alias fallback support
 */
export const getCategoryBySlug = (slugOrId: string): CategoryDetails | undefined => {
  const normalizedSlug = categorySlugAliases[slugOrId] || slugOrId;
  return categories.find(
    c => c.slug === normalizedSlug || c.id === normalizedSlug || c.slug === slugOrId || c.id === slugOrId
  );
};

/**
 * Find service by slug across all 36 services
 */
export const getServiceBySlug = (serviceSlug: string): Service | undefined => {
  return services.find(s => s.slug === serviceSlug);
};

/**
 * Find service by category and service slug with dual alias handling
 */
export const getServiceByCategoryAndSlug = (categorySlug: string, serviceSlug: string): Service | undefined => {
  const category = getCategoryBySlug(categorySlug);
  if (!category) {
    return services.find(s => s.slug === serviceSlug);
  }
  
  return services.find(s => 
    s.slug === serviceSlug && 
    (s.categoryId === category.id || s.categorySlug === category.slug || s.categorySlug === categorySlug)
  );
};

/**
 * Helper to fetch full detail data directly by slug
 */
export const getServiceDetailBySlug = (serviceSlug: string): ServiceDetailData | undefined => {
  const service = getServiceBySlug(serviceSlug);
  return service?.detail;
};
