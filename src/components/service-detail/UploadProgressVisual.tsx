import React from 'react';
import { Check, Loader2, AlertCircle, XCircle, Trash2, RotateCw } from 'lucide-react';
import { ManagedUploadFile } from '../../types';

interface UploadProgressVisualProps {
  files: ManagedUploadFile[];
  overallProgress: number; // 0 to 100
  isUploading: boolean;
  onCancelUpload: () => void;
  onRetryFile: (fileId: string) => void;
  onDeleteUploadedFile: (fileId: string) => void;
  onRemoveFile: (fileId: string) => void;
}

export default function UploadProgressVisual({
  files,
  overallProgress,
  isUploading,
  onCancelUpload,
  onRetryFile,
  onDeleteUploadedFile,
  onRemoveFile,
}: UploadProgressVisualProps) {
  const uploadedCount = files.filter(f => f.status === 'uploaded').length;
  const totalCount = files.length;
  const currentUploadingIndex = files.findIndex(f => f.status === 'uploading');
  const activeFileNumber = currentUploadingIndex !== -1 ? currentUploadingIndex + 1 : uploadedCount;

  // Format file size
  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  // Circular gauge math
  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (overallProgress / 100) * circumference;

  return (
    <div className="rounded-xl border border-[#D4AF37]/30 bg-[#0D0D0F]/[0.02] p-5 sm:p-6 space-y-5 transition-all">
      {/* Upload State & Navigation Warning Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-foreground/10">
        <div className="flex items-center gap-4">
          {/* Animated SVG Progress Ring */}
          <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
            <svg className="w-16 h-16 -rotate-90 transform" viewBox="0 0 80 80">
              {/* Background Track */}
              <circle
                cx="40"
                cy="40"
                r={radius}
                className="stroke-foreground/10"
                strokeWidth="5"
                fill="transparent"
              />
              {/* Animated Progress Stroke */}
              <circle
                cx="40"
                cy="40"
                r={radius}
                stroke="#D4AF37"
                strokeWidth="5"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-300 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-bold font-mono text-foreground">
                {overallProgress}%
              </span>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
              {isUploading ? (
                <>
                  <span>Uploading your files…</span>
                  <span className="inline-block w-2 h-2 rounded-full bg-[#D4AF37] animate-ping" />
                </>
              ) : (
                <span>Upload in review</span>
              )}
            </h4>
            <p className="text-xs text-foreground/60 mt-0.5">
              Please keep this page open while we securely upload your files.
            </p>
          </div>
        </div>

        {/* Cancel Upload Button */}
        {isUploading && (
          <button
            type="button"
            onClick={onCancelUpload}
            className="self-start sm:self-center px-3.5 py-1.5 rounded-lg border border-foreground/20 hover:border-red-500/50 hover:bg-red-500/10 text-xs font-semibold text-foreground/80 hover:text-red-600 transition-colors flex items-center gap-1.5 shrink-0"
          >
            <XCircle className="w-4 h-4 text-red-500" />
            <span>Cancel Upload</span>
          </button>
        )}
      </div>

      {/* Aggregate Progress Bar */}
      <div className="space-y-1.5">
        <div className="flex justify-between items-center text-xs font-medium">
          <span className="text-foreground/75">
            {isUploading ? `Uploading ${activeFileNumber} of ${totalCount} files` : `${uploadedCount} of ${totalCount} files ready`}
          </span>
          <span className="font-mono text-foreground font-semibold">
            {overallProgress}%
          </span>
        </div>
        <div className="h-2 w-full bg-foreground/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#D4AF37] to-[#e4c96b] transition-all duration-300 rounded-full"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
      </div>

      {/* Individual File Statuses */}
      <div className="space-y-2 pt-1">
        <p className="text-[11px] font-bold uppercase tracking-wider text-foreground/50">
          File Transfer Status
        </p>

        <div className="space-y-2">
          {files.map((file) => {
            const isCurrent = file.status === 'uploading';
            const isUploaded = file.status === 'uploaded';
            const isFailed = file.status === 'error';
            const isCancelled = file.status === 'cancelled';

            return (
              <div
                key={file.id}
                className={`p-2.5 rounded-lg border transition-all text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
                  isCurrent
                    ? 'border-[#D4AF37]/50 bg-[#D4AF37]/5'
                    : isUploaded
                    ? 'border-emerald-500/30 bg-emerald-500/[0.02]'
                    : isFailed
                    ? 'border-red-500/30 bg-red-500/[0.02]'
                    : isCancelled
                    ? 'border-amber-500/30 bg-amber-500/[0.02]'
                    : 'border-foreground/10 bg-foreground/[0.01]'
                }`}
              >
                {/* File Thumbnail & Name */}
                <div className="flex items-center gap-2.5 min-w-0 pr-2">
                  {file.previewUrl ? (
                    <img
                      src={file.previewUrl}
                      alt={file.name}
                      className="w-8 h-8 rounded object-cover border border-foreground/10 shrink-0"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded bg-foreground/5 flex items-center justify-center shrink-0 text-foreground/40 font-bold text-[10px]">
                      {file.name.split('.').pop()?.toUpperCase().substring(0, 3) || 'FILE'}
                    </div>
                  )}

                  <div className="min-w-0">
                    <p className="font-medium text-foreground truncate max-w-[200px] sm:max-w-[260px]">
                      {file.name}
                    </p>
                    <p className="text-[11px] text-foreground/50">
                      {formatSize(file.size)}
                    </p>
                  </div>
                </div>

                {/* Status Indicator & Action Buttons */}
                <div className="flex items-center justify-between sm:justify-end gap-2.5 shrink-0 pl-1">
                  {/* Status Badges */}
                  {isUploaded && (
                    <span className="flex items-center gap-1 text-emerald-600 font-semibold text-[11px] bg-emerald-500/10 px-2 py-0.5 rounded">
                      <Check className="w-3.5 h-3.5" />
                      <span>Uploaded</span>
                    </span>
                  )}

                  {isCurrent && (
                    <span className="flex items-center gap-1.5 text-[#D4AF37] font-semibold text-[11px] bg-[#D4AF37]/10 px-2 py-0.5 rounded">
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Uploading… {file.progress}%</span>
                    </span>
                  )}

                  {file.status === 'selected' && (
                    <span className="flex items-center gap-1 text-foreground/50 font-medium text-[11px] bg-foreground/5 px-2 py-0.5 rounded">
                      <span className="w-2 h-2 rounded-full border border-foreground/40" />
                      <span>Waiting</span>
                    </span>
                  )}

                  {isCancelled && (
                    <span className="flex items-center gap-1 text-amber-700 font-semibold text-[11px] bg-amber-500/10 px-2 py-0.5 rounded">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>Cancelled</span>
                    </span>
                  )}

                  {isFailed && (
                    <span className="flex items-center gap-1 text-red-600 font-semibold text-[11px] bg-red-500/10 px-2 py-0.5 rounded">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>Failed</span>
                    </span>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-1.5">
                    {/* Delete Uploaded File (Purges from backend staging before final submission) */}
                    {isUploaded && (
                      <button
                        type="button"
                        onClick={() => onDeleteUploadedFile(file.id)}
                        title="Delete from upload staging"
                        className="px-2 py-1 text-[11px] font-semibold text-foreground/60 hover:text-red-600 hover:bg-red-500/10 rounded border border-foreground/10 transition-colors flex items-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Delete</span>
                      </button>
                    )}

                    {/* Retry Failed File */}
                    {isFailed && (
                      <button
                        type="button"
                        onClick={() => onRetryFile(file.id)}
                        className="px-2 py-1 text-[11px] font-semibold text-[#D4AF37] hover:bg-[#D4AF37]/10 rounded border border-[#D4AF37]/30 transition-colors flex items-center gap-1"
                      >
                        <RotateCw className="w-3 h-3" />
                        <span>Retry</span>
                      </button>
                    )}

                    {/* Remove Cancelled or Failed File */}
                    {(isCancelled || isFailed) && (
                      <button
                        type="button"
                        onClick={() => onRemoveFile(file.id)}
                        className="px-2 py-1 text-[11px] font-semibold text-foreground/50 hover:text-red-600 rounded hover:bg-foreground/5 transition-colors"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Protection Notice */}
      <div className="p-3 bg-foreground/[0.02] border border-foreground/10 rounded-lg text-[11px] text-foreground/60 leading-relaxed">
        <strong>Navigation Safety:</strong> Your files are being uploaded securely. Please don't refresh, close this page, or press Back until the upload is complete.
      </div>
    </div>
  );
}
