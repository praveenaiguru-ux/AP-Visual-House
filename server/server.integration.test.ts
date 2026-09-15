import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import { createServer, type Server } from 'node:http';
import { createApp } from '../server';
import {
  _resetTokenCacheForTesting,
  _setDriveAuthFailureForTesting
} from './driveAuth';
import { storageProvider } from './storage';

let server: Server;
let baseUrl = '';

before(async () => {
  process.env.NODE_ENV = 'production';
  process.env.STORAGE_USE_EMULATOR = 'true';
  process.env.STORAGE_ENV = 'test';

  _setDriveAuthFailureForTesting(true);

  const app = await createApp();

  server = createServer(app);

  await new Promise<void>((resolve) => {
    server.listen(0, '127.0.0.1', () => {
      const address = server.address();

      if (!address || typeof address === 'string') {
        throw new Error('Unable to determine integration-test server address.');
      }

      baseUrl = `http://127.0.0.1:${address.port}`;
      resolve();
    });
  });
});

after(async () => {
  _resetTokenCacheForTesting();

  await new Promise<void>((resolve, reject) => {
    server.close((err) => {
      if (err) reject(err);
      else resolve();
    });
  });
});

test('POST /api/projects/submit preserves confirmed storage when Drive transfer is unavailable', async () => {
  const requestId = `req_integration_${Date.now()}`;

  const form = new FormData();
  form.append(
    'file',
    new Blob(['AP Visual House integration test'], { type: 'text/plain' }),
    'integration-test.txt'
  );
  form.append('requestId', requestId);

  const uploadResponse = await fetch(`${baseUrl}/api/upload/file`, {
    method: 'POST',
    body: form
  });

  assert.equal(uploadResponse.status, 201);

  const upload = await uploadResponse.json();

  assert.equal(upload.success, true);
  assert.equal(upload.requestId, requestId);
  assert.match(upload.fileId, /^up_[a-f0-9]{24}$/);
  assert.ok(upload.ownerToken);

  const submitResponse = await fetch(`${baseUrl}/api/projects/submit`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      requestId,
      name: 'Integration Test Customer',
      whatsapp: '+919876543210',
      email: 'integration@example.com',
      requirements: 'Integration test submission',
      serviceName: 'Cartoon Portrait',
      startingPrice: '199',
      currency: '₹',
      files: [
        {
          fileId: upload.fileId,
          requestId,
          ownerToken: upload.ownerToken
        }
      ],
      hasConfirmedPolicy: true
    })
  });

  assert.equal(submitResponse.status, 200);

  const submission = await submitResponse.json();

  assert.equal(submission.success, true);
  assert.match(submission.projectId, /^APV-\d{4}-[A-HJ-NP-Z2-9]{4}$/);
  assert.equal(submission.filesAttached, 1);
  assert.equal(submission.driveTransfer.status, 'pending');

  const temporaryRecord = await storageProvider.getTemporaryFile(
    upload.fileId,
    requestId
  );

  assert.equal(
    temporaryRecord,
    null,
    'temporary file must be removed after confirmed promotion'
  );

  const confirmedRecord = await storageProvider.getConfirmedFile(
    upload.fileId,
    requestId
  );

  assert.ok(
    confirmedRecord,
    'confirmed file must remain when Drive transfer fails'
  );
});
