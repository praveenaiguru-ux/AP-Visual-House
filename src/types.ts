export type ServiceCategory = 
  | 'AI Images'
  | 'Restoration'
  | '3D'
  | 'Invitations'
  | 'Product Creatives'
  | 'Video';

export interface CategoryDetails {
  id: string;
  slug: string;
  title: string;
  shortTitle: ServiceCategory;
  description: string;
  image: string;
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServiceExample {
  title: string;
  description?: string;
  image: string;
  alt: string;
}

/**
 * BACKEND CONTRACT — FRONTEND UX UPLOAD LIMITS
 * 
 * Agreed AP Visual House frontend upload limits:
 * - MAX_FILES: 5 files per request
 * - MAX_FILE_SIZE: 10 MB per individual file (10 * 1024 * 1024 bytes)
 * - MAX_TOTAL_SIZE: 25 MB per request (25 * 1024 * 1024 bytes)
 * 
 * IMPORTANT:
 * These frontend checks are UX validation only.
 * The future backend MUST independently enforce the same limits:
 * - rate limiting & upload throttling
 * - file count limits (5 files)
 * - individual file-size limits (10 MB)
 * - total request-size limits (25 MB)
 * - MIME/magic-byte content validation
 * - bot and abuse protection
 * Do not assume frontend validation provides security.
 */
export const UPLOAD_LIMITS = {
  MAX_FILES: 5,
  MAX_FILE_SIZE_BYTES: 10 * 1024 * 1024, // 10 MB
  MAX_TOTAL_SIZE_BYTES: 25 * 1024 * 1024, // 25 MB
  MAX_FILE_SIZE_MB: 10,
  MAX_TOTAL_SIZE_MB: 25,
} as const;

export interface ServiceUploadItem {
  label: string;
  description?: string;
}

export interface ServiceUploadConfig {
  requiredUploads?: ServiceUploadItem[];
  optionalUploads?: ServiceUploadItem[];
  acceptedFileTypes?: string[];
  maxFiles?: number;
  maxFileSize?: number; // in bytes (ceiling: 10 MB)
  maxTotalSize?: number; // in bytes (ceiling: 25 MB)
}

export type FileUploadStatus =
  | 'selected'   // Selected in browser, zero network requests made
  | 'uploading'  // Active byte transfer in progress
  | 'uploaded'   // Reached backend temporary storage, has fileId
  | 'cancelled'  // User cancelled the active upload
  | 'error';     // Upload failed (network/validation)

export interface ManagedUploadFile {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
  previewUrl?: string;
  status: FileUploadStatus;
  progress: number; // 0 to 100
  fileId?: string; // Backend temporary file ID once uploaded
  requestId?: string; // Project request session ID for storage partitioning
  ownerToken?: string; // Backend ownership token for authorized deletion & verification
  error?: string;
}

export type ServiceImageType = 
  | 'portrait' 
  | 'product' 
  | 'architecture' 
  | 'invitation' 
  | 'video' 
  | 'restoration' 
  | 'abstract';

export type ServiceImageFit = 'cover' | 'contain';
export type ServiceImagePosition = 'center' | 'top' | 'center top' | 'bottom' | string;

export interface ServiceDetailData {
  id: string;
  slug: string;
  category: ServiceCategory;
  categorySlug: string;
  categoryId: string;
  name: string;
  shortDescription: string;
  longDescription?: string;
  startingPrice: number;
  currency: string;
  deliveryTime: string;
  revisionPolicy: string;
  formats: string[];
  heroImage: string;
  galleryImages: ServiceExample[];
  whatWeCreate: {
    title: string;
    description: string;
  }[];
  whatCustomerProvides: {
    title: string;
    description?: string;
  }[];
  whatCustomerReceives: {
    title: string;
    description?: string;
  }[];
  faq: ServiceFAQ[];
  relatedServices: string[]; // array of service slugs
  uploadConfig?: ServiceUploadConfig;
  uploadRequirements?: ServiceUploadConfig;
  imageType?: ServiceImageType;
  imageFit?: ServiceImageFit;
  imagePosition?: ServiceImagePosition;
  aspectRatio?: string;
  heroImageConfig?: {
    imageType?: ServiceImageType;
    imageFit?: ServiceImageFit;
    imagePosition?: ServiceImagePosition;
    aspectRatio?: string;
  };
  seoTitle: string;
  seoDescription: string;
}

export interface Service {
  id: string;
  categoryId: string;
  category: ServiceCategory;
  categorySlug?: string;
  title: string;
  description: string;
  price: number;
  deliveryTime: string;
  image: string; // URL
  slug: string;
  imageType?: ServiceImageType;
  imageFit?: ServiceImageFit;
  imagePosition?: ServiceImagePosition;
  aspectRatio?: string;
  detail?: ServiceDetailData;
}
