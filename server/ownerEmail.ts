import { getAuthenticatedGmailClient } from './driveAuth';

export interface OwnerNotificationFile {
  driveFileName: string;
  originalName: string;
  sizeMB: number;
  mimeType: string;
}

export type OwnerDriveTransferStatus = 'SUCCESS' | 'PENDING';

export interface OwnerNotificationInput {
  projectReference: string;
  service: string;
  customerName: string;
  contact: string;
  email?: string;
  requirement?: string;
  startingQuote?: string;
  submittedAt: string;
  driveProjectFolderId?: string;
  driveTransferStatus: OwnerDriveTransferStatus;
  driveTransferReason?: string;
  files: OwnerNotificationFile[];
}

export function getOwnerNotificationEmail(): string {
  return (process.env.OWNER_NOTIFICATION_EMAIL || '').trim();
}

function sanitizeHeaderValue(value: string): string {
  return value.replace(/[\r\n]/g, ' ').trim();
}

export function buildOwnerNotificationSubject(input: OwnerNotificationInput): string {
  return [
    input.service,
    input.customerName,
    input.contact,
    input.projectReference
  ].map(sanitizeHeaderValue).join('_');
}

export function buildDriveFolderUrl(folderId: string): string {
  return `https://drive.google.com/drive/folders/${encodeURIComponent(folderId)}`;
}

export function buildOwnerNotificationBody(input: OwnerNotificationInput): string {
  const driveSuccess = input.driveTransferStatus === 'SUCCESS';

  const lines = [
    'New Project Request',
    '===================',
    '',
    `Project: ${input.projectReference}`,
    '',
    `Customer: ${input.customerName}`,
    `Phone: ${input.contact}`,
    '',
    `Service: ${input.service}`,
    '',
    'Customer submission: CONFIRMED ✓',
    '',
    driveSuccess
      ? 'Files: TRANSFERRED TO GOOGLE DRIVE ✓'
      : 'Files: SAFE IN GCS ✓',
    '',
    driveSuccess
      ? 'Google Drive: SUCCESS ✓'
      : 'Google Drive: PENDING ⚠️'
  ];

  if (!driveSuccess) {
    lines.push(
      '',
      `Reason: ${input.driveTransferReason || 'Drive transfer temporarily unavailable.'}`,
      '',
      `Files: ${input.files.length}`,
      '',
      'Action: Project files remain safely stored in GCS. Drive transfer requires a retry.'
    );
  } else {
    lines.push(
      '',
      `Files: ${input.files.length}`
    );
  }

  lines.push(
    '',
    `Starting Quote: ${input.startingQuote || 'To be confirmed'}`,
    `Submitted: ${input.submittedAt}`,
    '',
    'Requirement:',
    input.requirement || 'Not provided'
  );

  if (driveSuccess && input.driveProjectFolderId) {
    lines.push(
      '',
      'Google Drive:',
      buildDriveFolderUrl(input.driveProjectFolderId)
    );
  }

  lines.push(
    '',
    `Project reference: ${input.projectReference}`
  );

  return lines.join('\n');
}

export async function sendOwnerProjectNotification(
  input: OwnerNotificationInput
): Promise<void> {
  const recipient = getOwnerNotificationEmail();

  if (!recipient) {
    throw new Error('OWNER_NOTIFICATION_EMAIL is not configured.');
  }

  const gmail = await getAuthenticatedGmailClient();
  const subject = buildOwnerNotificationSubject(input);
  const body = buildOwnerNotificationBody(input);

  const rawMessage = [
    `To: ${recipient}`,
    `Subject: ${subject}`,
    'Content-Type: text/plain; charset="UTF-8"',
    '',
    body
  ].join('\r\n');

  const encodedMessage = Buffer
    .from(rawMessage, 'utf8')
    .toString('base64url');

  await gmail.users.messages.send({
    userId: 'me',
    requestBody: {
      raw: encodedMessage
    }
  });
}
