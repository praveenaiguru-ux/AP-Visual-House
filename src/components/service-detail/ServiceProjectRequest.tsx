import React, { useState, useRef, useEffect, ChangeEvent, DragEvent, FormEvent } from 'react';
import { UploadCloud, CheckCircle2, MessageCircle, FileText, X, Check, Info, AlertCircle } from 'lucide-react';
import { getWhatsAppLink } from '../../config';
import { ServiceUploadConfig, UPLOAD_LIMITS, ManagedUploadFile } from '../../types';
import UploadProgressVisual from './UploadProgressVisual';

interface ServiceProjectRequestProps {
  serviceName: string;
  startingPrice: number;
  currency: string;
  uploadConfig?: ServiceUploadConfig;
}

/**
 * BACKEND CONTRACT — FRONTEND UX UPLOAD LIMITS
 * 
 * Agreed AP Visual House frontend limits:
 * - MAX_FILES: 5 files
 * - MAX_FILE_SIZE: 10 MB (10 * 1024 * 1024 bytes)
 * - MAX_TOTAL_SIZE: 25 MB (25 * 1024 * 1024 bytes)
 * 
 * CRITICAL ARCHITECTURAL CONTRACT:
 * - Selecting a file does NOT trigger any network request.
 * - Files remain purely in the browser until customer clicks "Submit Project Request".
 * - When "Submit Project Request" is clicked, files are transferred to Cloud Run temporary staging.
 * - Real upload progress reporting, cancel, delete, and retry behaviors are strictly enforced.
 */
const FRONTEND_MAX_FILES = UPLOAD_LIMITS.MAX_FILES; // 5
const FRONTEND_MAX_FILE_SIZE = UPLOAD_LIMITS.MAX_FILE_SIZE_BYTES; // 10MB
const FRONTEND_MAX_TOTAL_SIZE = UPLOAD_LIMITS.MAX_TOTAL_SIZE_BYTES; // 25MB

export default function ServiceProjectRequest({
  serviceName,
  startingPrice,
  currency,
  uploadConfig
}: ServiceProjectRequestProps) {
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [requirements, setRequirements] = useState('');
  const [managedFiles, setManagedFiles] = useState<ManagedUploadFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [hasConfirmedPolicy, setHasConfirmedPolicy] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedProjectData, setSubmittedProjectData] = useState<{
    projectId: string;
    filesAttached: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  // Unique project request ID for storage prefix partitioning (temporary/{requestId}/{fileId})
  const [requestId] = useState<string>(() => 'req_' + Math.random().toString(36).substring(2, 10) + Date.now().toString(36));

  const fileInputRef = useRef<HTMLInputElement>(null);
  const activeXhrRef = useRef<XMLHttpRequest | null>(null);
  const isCancelledRef = useRef<boolean>(false);

  // Data-driven upload configuration capped at system ceilings
  const config: ServiceUploadConfig = uploadConfig || {
    requiredUploads: [
      {
        label: '1 Clear Customer Photo',
        description: 'Well-lit personal photo with clearly visible facial features.'
      }
    ],
    optionalUploads: [
      {
        label: 'Additional Reference Photo',
        description: 'Alternative angles or lighting.'
      },
      {
        label: 'Style / Reference Image',
        description: 'Artwork or color palette for inspiration.'
      }
    ],
    acceptedFileTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'],
    maxFiles: FRONTEND_MAX_FILES,
    maxFileSize: FRONTEND_MAX_FILE_SIZE,
    maxTotalSize: FRONTEND_MAX_TOTAL_SIZE
  };

  // Enforce system ceilings: max 5 files, 10MB individual file, 25MB total request
  const maxFilesAllowed = Math.min(config.maxFiles || FRONTEND_MAX_FILES, FRONTEND_MAX_FILES);
  const maxFileSizeBytes = Math.min(config.maxFileSize || FRONTEND_MAX_FILE_SIZE, FRONTEND_MAX_FILE_SIZE);
  const maxTotalSizeBytes = Math.min(config.maxTotalSize || FRONTEND_MAX_TOTAL_SIZE, FRONTEND_MAX_TOTAL_SIZE);
  const maxFileSizeMb = Math.round(maxFileSizeBytes / (1024 * 1024));
  const maxTotalSizeMb = Math.round(maxTotalSizeBytes / (1024 * 1024));

  // Navigation Protection: Native browser beforeunload warning during active uploads
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isUploading || isSubmitting) {
        e.preventDefault();
        e.returnValue = "Your files are being uploaded securely. Please don't refresh, close this page, or press Back until the upload is complete.";
        return e.returnValue;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isUploading, isSubmitting]);

  // Clean up any generated object URLs on unmount
  useEffect(() => {
    return () => {
      managedFiles.forEach((f) => {
        if (f.previewUrl) {
          URL.revokeObjectURL(f.previewUrl);
        }
      });
      if (activeXhrRef.current) {
        activeXhrRef.current.abort();
      }
    };
  }, [managedFiles]);

  const isAcceptedFileType = (file: File, acceptedList: string[]): boolean => {
    if (!acceptedList || acceptedList.length === 0) return true;
    const fileName = file.name.toLowerCase();
    const fileMime = file.type.toLowerCase();

    return acceptedList.some((type) => {
      const clean = type.toLowerCase().trim();
      if (fileMime && fileMime === clean) return true;
      if (clean.startsWith('.') && fileName.endsWith(clean)) return true;
      if (clean === 'application/pdf') return fileName.endsWith('.pdf');
      if (clean.includes('dwg') || clean.includes('acad')) return fileName.endsWith('.dwg');
      if (clean === 'image/jpeg' || clean === 'image/jpg') {
        return fileName.endsWith('.jpg') || fileName.endsWith('.jpeg');
      }
      if (clean === 'image/png') return fileName.endsWith('.png');
      if (clean === 'image/webp') return fileName.endsWith('.webp');
      if (clean.includes('tiff') || clean.includes('tif')) {
        return fileName.endsWith('.tif') || fileName.endsWith('.tiff');
      }
      if (clean.includes('heic')) return fileName.endsWith('.heic');
      if (clean.includes('raw')) {
        return fileName.endsWith('.raw') || fileName.endsWith('.cr2') || fileName.endsWith('.nef') || fileName.endsWith('.dng');
      }
      if (clean === 'video/mp4') return fileName.endsWith('.mp4');
      if (clean === 'video/quicktime') return fileName.endsWith('.mov');
      if (clean === 'audio/mpeg') return fileName.endsWith('.mp3');
      if (clean === 'text/plain') return fileName.endsWith('.txt');
      if (clean.includes('zip')) return fileName.endsWith('.zip');
      if (clean.includes('word') || clean.includes('msword')) {
        return fileName.endsWith('.doc') || fileName.endsWith('.docx');
      }
      const ext = clean.replace('image/', '.').replace('video/', '.').replace('audio/', '.');
      if (ext.startsWith('.') && fileName.endsWith(ext)) return true;
      return false;
    });
  };

  // Format file size utility
  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  // FILE SELECTION: Local validation & preview only — ZERO network requests
  const handleFileSelection = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;
    const incomingFiles = Array.from(selectedFiles);

    // 1. File Count validation: Max 5 files
    if (managedFiles.length + incomingFiles.length > maxFilesAllowed) {
      setError(`Please upload no more than ${maxFilesAllowed} files.`);
      return;
    }

    // 2. Individual file size validation: Max 10 MB per file
    const oversizedFile = incomingFiles.find((f) => f.size > maxFileSizeBytes);
    if (oversizedFile) {
      setError(`"${oversizedFile.name}" is larger than the ${maxFileSizeMb} MB limit.`);
      return;
    }

    // 3. Total upload size validation: Max 25 MB total
    const currentTotal = managedFiles.reduce((acc, curr) => acc + curr.size, 0);
    const incomingTotal = incomingFiles.reduce((acc, curr) => acc + curr.size, 0);
    if (currentTotal + incomingTotal > maxTotalSizeBytes) {
      setError(`Your total upload size cannot exceed ${maxTotalSizeMb} MB.`);
      return;
    }

    // 4. File type validation
    if (config.acceptedFileTypes && config.acceptedFileTypes.length > 0) {
      const invalidType = incomingFiles.find((f) => !isAcceptedFileType(f, config.acceptedFileTypes!));
      if (invalidType) {
        setError(`"${invalidType.name}" is not an accepted format for this service.`);
        return;
      }
    }

    // Build local managed file objects (staying purely in browser memory)
    const newItems: ManagedUploadFile[] = incomingFiles.map((file) => ({
      id: 'local_' + Date.now() + '_' + Math.random().toString(36).substring(2, 8),
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      previewUrl: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
      status: 'selected',
      progress: 0
    }));

    setManagedFiles((prev) => [...prev, ...newItems]);
    setError(null);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelection(e.dataTransfer.files);
  };

  // REMOVE BEFORE SUBMISSION: Instant client removal, zero network requests
  const handleRemoveFile = (fileIdToRemove: string) => {
    setManagedFiles((prev) => {
      const target = prev.find((f) => f.id === fileIdToRemove);
      if (target?.previewUrl) {
        URL.revokeObjectURL(target.previewUrl);
      }
      return prev.filter((f) => f.id !== fileIdToRemove);
    });
    setError(null);
  };

  // DELETE AFTER UPLOAD: Purges from backend temporary staging before project finalization
  const handleDeleteUploadedFile = async (fileIdToDelete: string) => {
    const target = managedFiles.find((f) => f.id === fileIdToDelete);
    if (target?.previewUrl) {
      URL.revokeObjectURL(target.previewUrl);
    }

    // Remove from UI immediately for instant responsiveness
    setManagedFiles((prev) => prev.filter((f) => f.id !== fileIdToDelete));

    // If file reached the backend, inform the backend to purge the temporary file with owner token
    if (target?.fileId) {
      try {
        await fetch(`/api/upload/${target.fileId}`, {
          method: 'DELETE',
          headers: {
            'x-upload-token': target.ownerToken || '',
            'x-request-id': target.requestId || requestId
          }
        });
      } catch (err) {
        console.warn('Backend cleanup notification skipped or failed', err);
      }
    }
  };

  // CANCEL ACTIVE UPLOAD: Aborts in-flight network transfer immediately
  const handleCancelUpload = () => {
    isCancelledRef.current = true;
    if (activeXhrRef.current) {
      activeXhrRef.current.abort();
      activeXhrRef.current = null;
    }
    setIsUploading(false);
    setIsSubmitting(false);

    // Transition currently transferring file to cancelled state
    setManagedFiles((prev) =>
      prev.map((f) =>
        f.status === 'uploading'
          ? { ...f, status: 'cancelled', progress: 0, error: 'Upload cancelled.' }
          : f
      )
    );

    setError('Upload cancelled. You can remove, replace, or retry your files.');
  };

  // UPLOAD A SINGLE FILE WITH REAL XHR PROGRESS
  const uploadSingleFile = (fileItem: ManagedUploadFile): Promise<{ success: boolean; fileId?: string; error?: string }> => {
    return new Promise((resolve) => {
      if (fileItem.status === 'uploaded' && fileItem.fileId) {
        resolve({ success: true, fileId: fileItem.fileId });
        return;
      }

      const formData = new FormData();
      formData.append('file', fileItem.file);
      formData.append('requestId', requestId);

      const xhr = new XMLHttpRequest();
      activeXhrRef.current = xhr;

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percent = Math.min(99, Math.round((event.loaded / event.total) * 100));
          setManagedFiles((prev) =>
            prev.map((f) => (f.id === fileItem.id ? { ...f, status: 'uploading', progress: percent } : f))
          );
        }
      };

      xhr.onload = () => {
        activeXhrRef.current = null;
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const res = JSON.parse(xhr.responseText);
            setManagedFiles((prev) =>
              prev.map((f) =>
                f.id === fileItem.id
                  ? {
                      ...f,
                      status: 'uploaded',
                      fileId: res.fileId,
                      requestId: res.requestId || requestId,
                      ownerToken: res.ownerToken,
                      progress: 100,
                      error: undefined
                    }
                  : f
              )
            );
            resolve({ success: true, fileId: res.fileId });
          } catch {
            setManagedFiles((prev) =>
              prev.map((f) => (f.id === fileItem.id ? { ...f, status: 'error', error: 'Invalid response from server.' } : f))
            );
            resolve({ success: false, error: 'Invalid response from server.' });
          }
        } else {
          let errMsg = 'Upload failed. Please retry.';
          try {
            const errRes = JSON.parse(xhr.responseText);
            if (errRes.error) errMsg = errRes.error;
          } catch {
            // fallback
          }
          setManagedFiles((prev) =>
            prev.map((f) => (f.id === fileItem.id ? { ...f, status: 'error', error: errMsg } : f))
          );
          resolve({ success: false, error: errMsg });
        }
      };

      xhr.onerror = () => {
        activeXhrRef.current = null;
        setManagedFiles((prev) =>
          prev.map((f) =>
            f.id === fileItem.id
              ? { ...f, status: 'error', error: 'Network interrupted. Please check connection and click Retry.' }
              : f
          )
        );
        resolve({ success: false, error: 'Network interrupted' });
      };

      xhr.onabort = () => {
        activeXhrRef.current = null;
        setManagedFiles((prev) =>
          prev.map((f) =>
            f.id === fileItem.id
              ? { ...f, status: 'cancelled', error: 'Upload cancelled.' }
              : f
          )
        );
        resolve({ success: false, error: 'Upload cancelled.' });
      };

      xhr.open('POST', '/api/upload/file');
      xhr.send(formData);
    });
  };

  // RETRY INDIVIDUAL FAILED FILE
  const handleRetryFile = async (fileIdToRetry: string) => {
    setError(null);
    const target = managedFiles.find((f) => f.id === fileIdToRetry);
    if (!target) return;

    setIsUploading(true);
    isCancelledRef.current = false;
    const result = await uploadSingleFile(target);
    setIsUploading(false);

    if (!result.success && !isCancelledRef.current) {
      setError(`Upload failed for "${target.name}". Please retry.`);
    }
  };

  // FINAL SUBMISSION HANDLER: Triggered ONLY when customer clicks "Submit Project Request"
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Prevent duplicate submissions
    if (isSubmitting || isUploading) return;

    if (!name.trim()) {
      setError('Please provide your name.');
      return;
    }
    if (!whatsapp.trim()) {
      setError('Please provide your WhatsApp number for communication.');
      return;
    }
    if (!hasConfirmedPolicy) {
      setError("Please confirm that your uploaded files comply with AP Visual House's Content Policy.");
      return;
    }

    // UX validation safeguards before submission
    if (managedFiles.length > maxFilesAllowed) {
      setError(`Please upload no more than ${maxFilesAllowed} files.`);
      return;
    }

    const oversizedFile = managedFiles.find((f) => f.size > maxFileSizeBytes);
    if (oversizedFile) {
      setError(`"${oversizedFile.name}" is larger than the ${maxFileSizeMb} MB limit.`);
      return;
    }

    const totalSize = managedFiles.reduce((acc, curr) => acc + curr.size, 0);
    if (totalSize > maxTotalSizeBytes) {
      setError(`Your total upload size cannot exceed ${maxTotalSizeMb} MB.`);
      return;
    }

    setError(null);
    isCancelledRef.current = false;

    // STEP 1: Upload all files that have not yet reached the backend
    const pendingFiles = managedFiles.filter((f) => f.status !== 'uploaded');
    if (pendingFiles.length > 0) {
      setIsUploading(true);

      for (let i = 0; i < managedFiles.length; i++) {
        if (isCancelledRef.current) break;
        const item = managedFiles[i];
        if (item.status !== 'uploaded') {
          const res = await uploadSingleFile(item);
          if (!res.success || isCancelledRef.current) {
            setIsUploading(false);
            if (!isCancelledRef.current) {
              setError(`Could not upload "${item.name}". Please retry or remove this file.`);
            }
            return;
          }
        }
      }
      setIsUploading(false);
    }

    if (isCancelledRef.current) return;

    // STEP 2: Finalize commission project request and stage for Google Drive pipeline
    setIsSubmitting(true);
    try {
      // Re-read fileIds and ownerTokens from currently uploaded files
      const uploadedFiles = managedFiles
        .filter((f) => f.status === 'uploaded' && f.fileId)
        .map((f) => ({
          fileId: f.fileId as string,
          requestId: f.requestId || requestId,
          ownerToken: f.ownerToken
        }));

      const uploadedFileIds = uploadedFiles.map((f) => f.fileId);

      const response = await fetch('/api/projects/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requestId,
          name,
          whatsapp,
          email,
          requirements,
          serviceName,
          startingPrice,
          currency,
          files: uploadedFiles,
          fileIds: uploadedFileIds,
          hasConfirmedPolicy: true,
          contentPolicyAccepted: true
        })
      });

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        throw new Error(errJson.error || 'Server error while submitting request.');
      }

      const data = await response.json();
      setSubmittedProjectData({
        projectId: data.projectId,
        filesAttached: data.filesAttached
      });
      setIsSubmitted(true);
    } catch (err: any) {
      console.error('Submission failed:', err);
      setError(err.message || 'Submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate real aggregate progress across all files
  const overallProgress = managedFiles.length === 0
    ? 0
    : Math.round(
        managedFiles.reduce((acc, curr) => {
          if (curr.status === 'uploaded') return acc + 100;
          if (curr.status === 'uploading') return acc + curr.progress;
          return acc;
        }, 0) / managedFiles.length
      );

  // Check if any file has started or finished transferring
  const hasTransferringOrUploadedFiles = managedFiles.some(
    (f) => f.status === 'uploading' || f.status === 'uploaded' || f.status === 'cancelled' || f.status === 'error'
  );

  // Prefilled WhatsApp message
  const whatsappPreFilled = `Hi AP Visual House! I just submitted a project request for ${serviceName} (Ref: ${submittedProjectData?.projectId || 'New'}). My name is ${name || '[Name]'}.`;

  return (
    <section id="project-request" className="py-16 pb-24 scroll-mt-24 border-b border-foreground/5" aria-labelledby="project-request-heading">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold block mb-2">
            Start Your Commission
          </span>
          <h2 id="project-request-heading" className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-3">
            Project Request
          </h2>
          <p className="text-sm sm:text-base text-foreground/70 leading-relaxed max-w-xl mx-auto">
            Tell us about the visual you would like created. We will personally review your request and coordinate with you directly on WhatsApp.
          </p>
        </div>

        <div className="bg-white border border-foreground/10 rounded-2xl p-6 sm:p-10 shadow-sm relative">
          {isSubmitted ? (
            <div className="py-8 text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[#25D366]/10 text-[#25D366] flex items-center justify-center mb-6">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-display font-bold text-foreground mb-1">
                Project Request Received!
              </h3>
              {submittedProjectData?.projectId && (
                <span className="inline-block px-3 py-1 bg-[#D4AF37]/10 text-[#8c7423] font-mono font-bold text-xs rounded-full mb-3">
                  Reference: {submittedProjectData.projectId}
                </span>
              )}
              <p className="text-foreground/70 max-w-md mb-6 text-sm leading-relaxed">
                Thank you, <strong className="text-foreground">{name}</strong>. Our studio concierge has received your commission request for a <strong className="text-foreground">{serviceName}</strong>.
              </p>

              <div className="bg-foreground/[0.02] border border-foreground/10 rounded-xl p-5 mb-8 text-left w-full max-w-md text-xs sm:text-sm text-foreground/80 space-y-2">
                <div className="flex justify-between py-1 border-b border-foreground/5">
                  <span className="text-foreground/50 font-medium">Service:</span>
                  <span className="font-semibold">{serviceName}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-foreground/5">
                  <span className="text-foreground/50 font-medium">Starting Quote:</span>
                  <span className="font-semibold">{currency}{startingPrice}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-foreground/5">
                  <span className="text-foreground/50 font-medium">Contact:</span>
                  <span className="font-semibold">{whatsapp}</span>
                </div>
                {managedFiles.length > 0 && (
                  <div className="flex justify-between py-1">
                    <span className="text-foreground/50 font-medium">Files Attached:</span>
                    <span className="font-semibold">{submittedProjectData?.filesAttached ?? managedFiles.length} file(s) staged</span>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-md">
                <a
                  href={getWhatsAppLink(whatsappPreFilled)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 bg-[#25D366] text-white font-bold text-xs uppercase tracking-wider rounded hover:bg-[#25D366]/90 transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Notify via WhatsApp Now</span>
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setIsSubmitted(false);
                    setRequirements('');
                    setManagedFiles([]);
                    setHasConfirmedPolicy(false);
                    setSubmittedProjectData(null);
                  }}
                  className="px-6 py-3.5 bg-foreground/5 text-foreground font-bold text-xs uppercase tracking-wider rounded hover:bg-foreground/10 transition-colors cursor-pointer"
                >
                  Submit Another
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Service Indicator */}
              <div className="p-4 rounded-lg bg-foreground/[0.02] border border-foreground/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-foreground/50 font-bold block">
                    Selected Service
                  </span>
                  <span className="text-base font-display font-bold text-foreground">
                    {serviceName}
                  </span>
                </div>
                <span className="px-3 py-1 bg-[#D4AF37]/15 text-foreground text-xs font-bold rounded">
                  From {currency}{startingPrice}
                </span>
              </div>

              {/* Name and WhatsApp */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="client-name" className="block text-xs font-bold uppercase tracking-wider text-foreground mb-2">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="client-name"
                    type="text"
                    required
                    disabled={isUploading || isSubmitting}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Maya Sharma"
                    className="w-full px-4 py-3 bg-white border border-foreground/20 rounded-lg text-foreground placeholder:text-foreground/40 text-sm focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all disabled:opacity-60"
                  />
                </div>

                <div>
                  <label htmlFor="client-whatsapp" className="block text-xs font-bold uppercase tracking-wider text-foreground mb-2">
                    WhatsApp Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="client-whatsapp"
                    type="tel"
                    required
                    disabled={isUploading || isSubmitting}
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full px-4 py-3 bg-white border border-foreground/20 rounded-lg text-foreground placeholder:text-foreground/40 text-sm focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all disabled:opacity-60"
                  />
                </div>
              </div>

              {/* Email (Optional) */}
              <div>
                <label htmlFor="client-email" className="block text-xs font-bold uppercase tracking-wider text-foreground mb-2">
                  Email Address <span className="text-foreground/40 font-normal text-[11px]">(Optional for receipt & digital file copy)</span>
                </label>
                <input
                  id="client-email"
                  type="email"
                  disabled={isUploading || isSubmitting}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. name@example.com"
                  className="w-full px-4 py-3 bg-white border border-foreground/20 rounded-lg text-foreground placeholder:text-foreground/40 text-sm focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all disabled:opacity-60"
                />
              </div>

              {/* Requirement Text */}
              <div>
                <label htmlFor="client-requirements" className="block text-xs font-bold uppercase tracking-wider text-foreground mb-2">
                  Style Preferences & Notes
                </label>
                <textarea
                  id="client-requirements"
                  rows={4}
                  disabled={isUploading || isSubmitting}
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                  placeholder="Describe your vision (e.g. 3D animated style, birthday gift theme, preferred background colors, caricature emphasis)..."
                  className="w-full px-4 py-3 bg-white border border-foreground/20 rounded-lg text-foreground placeholder:text-foreground/40 text-sm focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all resize-y disabled:opacity-60"
                />
              </div>

              {/* Upload Architecture Section */}
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-foreground">
                    Upload Photos & References <span className="text-foreground/40 font-normal text-[11px]">(Optional at this stage)</span>
                  </label>
                  <span className="text-[11px] text-foreground/50">
                    Up to {maxFilesAllowed} files · {maxFileSizeMb} MB per file · {maxTotalSizeMb} MB total
                  </span>
                </div>

                {/* Data-Driven Upload Requirements Specifications */}
                {((config.requiredUploads && config.requiredUploads.length > 0) || (config.optionalUploads && config.optionalUploads.length > 0)) && (
                  <div className="p-3.5 bg-foreground/[0.02] border border-foreground/10 rounded-lg space-y-2 text-xs">
                    <span className="text-[10px] uppercase tracking-wider text-foreground/50 font-bold block">
                      Recommended Reference Files
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-foreground/80">
                      {config.requiredUploads?.map((req, idx) => (
                        <div key={`req-${idx}`} className="flex items-start gap-1.5">
                          <span className="px-1.5 py-0.5 bg-[#D4AF37]/20 text-[#8c7423] font-bold text-[10px] rounded uppercase shrink-0">
                            Required
                          </span>
                          <span className="leading-tight font-medium text-foreground">{req.label}</span>
                        </div>
                      ))}
                      {config.optionalUploads?.map((opt, idx) => (
                        <div key={`opt-${idx}`} className="flex items-start gap-1.5">
                          <span className="px-1.5 py-0.5 bg-foreground/5 text-foreground/60 font-semibold text-[10px] rounded uppercase shrink-0">
                            Optional
                          </span>
                          <span className="leading-tight font-medium text-foreground/80">{opt.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Content Policy Notice */}
                <div className="p-3.5 bg-foreground/[0.02] border border-foreground/10 rounded-lg text-xs text-foreground/75 leading-relaxed flex items-start gap-2.5">
                  <Info className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <p>
                    <strong className="font-semibold text-foreground">Content Policy:</strong> Please do not upload nudity, sexually explicit content, profanity, hate or offensive material, or other inappropriate content. By submitting your files, you confirm that your uploaded content complies with this policy.
                  </p>
                </div>

                {/* File Dropzone (Always available to select or add replacement files unless max files reached) */}
                {managedFiles.length < maxFilesAllowed && !isUploading && (
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 ${
                      isDragging
                        ? 'border-[#D4AF37] bg-[#D4AF37]/5'
                        : 'border-foreground/20 hover:border-[#D4AF37]/60 hover:bg-foreground/[0.01]'
                    }`}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept={config.acceptedFileTypes?.join(',') || 'image/png,image/jpeg,image/webp,image/jpg'}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => handleFileSelection(e.target.files)}
                      className="hidden"
                    />
                    <div className="w-12 h-12 rounded-full bg-foreground/5 text-[#D4AF37] flex items-center justify-center mx-auto mb-3">
                      <UploadCloud className="w-6 h-6" />
                    </div>
                    <p className="text-sm font-semibold text-foreground mb-1">
                      Click to browse or drag and drop files here
                    </p>
                    <p className="text-xs text-foreground/50">
                      Up to {maxFilesAllowed} files · {maxFileSizeMb} MB per file · {maxTotalSizeMb} MB total
                    </p>
                  </div>
                )}

                {/* Large file guidance */}
                <p className="text-[11px] text-foreground/50 text-center leading-relaxed">
                  For larger video files or multi-page architectural batches, you can share a Google Drive or WhatsApp link after submitting your initial request.
                </p>

                {/* STATE A: Selected Files List (Before Submission, strictly in-browser memory) */}
                {managedFiles.length > 0 && !hasTransferringOrUploadedFiles && !isUploading && (
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold uppercase tracking-wider text-foreground/70">
                        Selected Files ({managedFiles.length}/{maxFilesAllowed})
                      </p>
                      <span className="text-[11px] text-foreground/40">
                        Files remain in browser until submitted
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      {managedFiles.map((file) => (
                        <div
                          key={file.id}
                          className="flex items-center justify-between p-2.5 bg-foreground/[0.03] border border-foreground/10 rounded-lg text-xs"
                        >
                          <div className="flex items-center gap-2.5 truncate pr-2">
                            {file.previewUrl ? (
                              <img
                                src={file.previewUrl}
                                alt={file.name}
                                className="w-7 h-7 rounded object-cover border border-foreground/10 shrink-0"
                              />
                            ) : (
                              <FileText className="w-4 h-4 text-[#D4AF37] shrink-0" />
                            )}
                            <span className="truncate font-medium text-foreground">{file.name}</span>
                            <span className="text-foreground/40 text-[10px] shrink-0">
                              ({formatSize(file.size)})
                            </span>
                            <span className="text-[10px] bg-foreground/5 text-foreground/50 px-1.5 py-0.5 rounded shrink-0 font-medium">
                              Ready to upload
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveFile(file.id)}
                            className="px-2 py-1 text-[11px] font-semibold text-foreground/60 hover:text-red-600 hover:bg-red-50 rounded transition-colors cursor-pointer"
                            aria-label={`Remove file ${file.name}`}
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* STATE B & C: Animated Upload Progress Visual during transfer, cancellation, delete, or retry */}
                {managedFiles.length > 0 && (hasTransferringOrUploadedFiles || isUploading) && (
                  <div className="mt-4">
                    <UploadProgressVisual
                      files={managedFiles}
                      overallProgress={overallProgress}
                      isUploading={isUploading}
                      onCancelUpload={handleCancelUpload}
                      onRetryFile={handleRetryFile}
                      onDeleteUploadedFile={handleDeleteUploadedFile}
                      onRemoveFile={handleRemoveFile}
                    />
                  </div>
                )}
              </div>

              {/* Mandatory Content Policy Checkbox */}
              <div className="pt-2">
                <label
                  htmlFor="content-policy-consent"
                  className="flex items-start gap-3 cursor-pointer group select-none"
                >
                  <div className="relative flex items-center justify-center mt-0.5 shrink-0">
                    <input
                      id="content-policy-consent"
                      type="checkbox"
                      required
                      disabled={isUploading || isSubmitting}
                      checked={hasConfirmedPolicy}
                      onChange={(e) => {
                        setHasConfirmedPolicy(e.target.checked);
                        if (error && error.includes('Content Policy')) setError(null);
                      }}
                      className="peer sr-only"
                    />
                    <div className="w-5 h-5 rounded border border-foreground/30 bg-white peer-checked:bg-[#D4AF37] peer-checked:border-[#D4AF37] peer-focus-visible:ring-2 peer-focus-visible:ring-[#D4AF37] transition-all flex items-center justify-center shadow-xs">
                      <Check className="w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                    </div>
                  </div>
                  <span className="text-xs text-foreground/80 group-hover:text-foreground transition-colors leading-relaxed">
                    I confirm that my uploaded files comply with AP Visual House's Content Policy. <span className="text-red-500">*</span>
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting || isUploading || !hasConfirmedPolicy}
                  className="w-full py-4 bg-foreground text-background font-bold text-xs uppercase tracking-widest rounded hover:bg-[#D4AF37] hover:text-foreground transition-all duration-300 shadow-sm cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-foreground disabled:hover:text-background"
                >
                  {isSubmitting
                    ? 'Submitting Your Request...'
                    : isUploading
                    ? 'Uploading Files Securely...'
                    : 'Submit Project Request'}
                </button>
                <p className="text-[11px] text-foreground/50 text-center mt-3">
                  Concierge fulfillment. No automated payments or credit cards required. We connect with you manually.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
