import { describe, it, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import {
  buildOwnerNotificationSubject,
  buildDriveFolderUrl,
  buildOwnerNotificationBody,
  getOwnerNotificationEmail
} from './ownerEmail';

const baseInput = {
  projectReference: 'APV-2609-K7M4',
  service: 'Exterior Visualization',
  customerName: 'Pradeep',
  contact: '+919876543210',
  email: 'pradeep@example.com',
  requirement: 'Please visualize the front elevation with a modern finish.',
  startingQuote: '₹1,499',
  submittedAt: '11 Sep 2026, 19:15 IST',
  files: [
    {
      driveFileName: 'Upload-01.jpg',
      originalName: 'front-house.jpg',
      sizeMB: 2.35,
      mimeType: 'image/jpeg'
    },
    {
      driveFileName: 'Upload-02.png',
      originalName: 'reference.png',
      sizeMB: 1.82,
      mimeType: 'image/png'
    }
  ]
};

describe('Owner email notification helpers', () => {
  const originalOwnerEmail = process.env.OWNER_NOTIFICATION_EMAIL;

  beforeEach(() => {
    delete process.env.OWNER_NOTIFICATION_EMAIL;
  });

  afterEach(() => {
    if (originalOwnerEmail === undefined) {
      delete process.env.OWNER_NOTIFICATION_EMAIL;
    } else {
      process.env.OWNER_NOTIFICATION_EMAIL = originalOwnerEmail;
    }
  });

  it('builds the locked owner notification subject', () => {
    const subject = buildOwnerNotificationSubject({
      ...baseInput,
      driveProjectFolderId: 'folder123',
      driveTransferStatus: 'SUCCESS'
    });

    assert.equal(
      subject,
      'Exterior Visualization_Pradeep_+919876543210_APV-2609-K7M4'
    );
  });

  it('removes CR/LF characters from subject components', () => {
    const subject = buildOwnerNotificationSubject({
      ...baseInput,
      service: 'Exterior Visualization\r\nBcc: attacker@example.com',
      customerName: 'Pradeep\nInjected',
      driveProjectFolderId: 'folder123',
      driveTransferStatus: 'SUCCESS'
    });

    assert.equal(subject.includes('\r'), false);
    assert.equal(subject.includes('\n'), false);
    assert.equal(
      subject,
      'Exterior Visualization  Bcc: attacker@example.com_Pradeep Injected_+919876543210_APV-2609-K7M4'
    );
  });

  it('builds the Drive project folder URL from the folder ID', () => {
    assert.equal(
      buildDriveFolderUrl('1abcDEF_123'),
      'https://drive.google.com/drive/folders/1abcDEF_123'
    );
  });

  it('builds the SUCCESS owner notification body', () => {
    const body = buildOwnerNotificationBody({
      ...baseInput,
      driveProjectFolderId: 'folder123',
      driveTransferStatus: 'SUCCESS'
    });

    assert.match(body, /New Project Request/);
    assert.match(body, /Project: APV-2609-K7M4/);
    assert.match(body, /Customer: Pradeep/);
    assert.match(body, /Phone: \+919876543210/);
    assert.match(body, /Service: Exterior Visualization/);
    assert.match(body, /Customer submission: CONFIRMED ✓/);
    assert.match(body, /Files: SAFE IN GCS ✓/);
    assert.match(body, /Google Drive: SUCCESS ✓/);
    assert.match(body, /Files: 2/);
    assert.match(body, /Starting Quote: ₹1,499/);
    assert.match(body, /Submitted: 11 Sep 2026, 19:15 IST/);
    assert.match(body, /Please visualize the front elevation with a modern finish\./);
    assert.match(body, /Google Drive:/);
    assert.match(body, /https:\/\/drive\.google\.com\/drive\/folders\/folder123/);
    assert.match(body, /Project reference: APV-2609-K7M4/);
    assert.equal(body.includes('Google Drive: PENDING'), false);
  });

  it('builds the PENDING owner notification body without a Drive link', () => {
    const body = buildOwnerNotificationBody({
      ...baseInput,
      driveTransferStatus: 'PENDING',
      driveTransferReason: 'Drive request timed out.'
    });

    assert.match(body, /Google Drive: PENDING ⚠️/);
    assert.match(body, /Reason: Drive request timed out\./);
    assert.match(body, /Files: 2/);
    assert.match(
      body,
      /Action: Project files remain safely stored in GCS\. Drive transfer requires a retry\./
    );
    assert.equal(body.includes('Google Drive:\nhttps://drive.google.com'), false);
  });

  it('reads the owner recipient from runtime environment', () => {
    process.env.OWNER_NOTIFICATION_EMAIL = 'owner@example.com';
    assert.equal(getOwnerNotificationEmail(), 'owner@example.com');
  });

  it('returns an empty recipient when configuration is absent', () => {
    assert.equal(getOwnerNotificationEmail(), '');
  });
});
