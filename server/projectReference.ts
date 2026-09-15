import crypto from 'crypto';

/**
 * AP Visual House customer-facing project reference.
 *
 * Format:
 *   APV-YYMM-XXXX
 *
 * Example:
 *   APV-2609-K7M4
 *
 * The suffix intentionally excludes visually confusing characters:
 * 0, O, 1, I
 *
 * YYMM is always derived from Asia/Kolkata (IST), regardless of
 * the Cloud Run/server machine timezone.
 */

const REFERENCE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const BUSINESS_TIME_ZONE = 'Asia/Kolkata';

export const PROJECT_REFERENCE_REGEX = /^APV-\d{4}-[A-HJ-NP-Z2-9]{4}$/;

function getBusinessYearMonth(date: Date): { year: string; month: string } {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: BUSINESS_TIME_ZONE,
    year: 'numeric',
    month: '2-digit'
  }).formatToParts(date);

  const year = parts.find((part) => part.type === 'year')?.value;
  const month = parts.find((part) => part.type === 'month')?.value;

  if (!year || !month) {
    throw new Error('Unable to derive project reference date in Asia/Kolkata.');
  }

  return {
    year: year.slice(-2),
    month
  };
}

export function generateProjectReference(date = new Date()): string {
  const { year, month } = getBusinessYearMonth(date);

  const randomBytes = crypto.randomBytes(4);
  let suffix = '';

  for (let i = 0; i < 4; i++) {
    suffix += REFERENCE_ALPHABET[randomBytes[i] % REFERENCE_ALPHABET.length];
  }

  return `APV-${year}${month}-${suffix}`;
}
