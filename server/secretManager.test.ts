import { describe, it, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { SECRET_NAMES, getRefreshTokenSecretName } from './secretManager';

describe('Refresh token secret selection', () => {
  const originalAppEnv = process.env.APP_ENV;

  afterEach(() => {
    if (originalAppEnv === undefined) {
      delete process.env.APP_ENV;
    } else {
      process.env.APP_ENV = originalAppEnv;
    }
  });

  it('uses the dedicated staging refresh-token secret when APP_ENV=staging', () => {
    process.env.APP_ENV = 'staging';
    assert.equal(
      getRefreshTokenSecretName(),
      SECRET_NAMES.STAGING_REFRESH_TOKEN
    );
  });

  it('uses the production refresh-token secret for non-staging environments', () => {
    process.env.APP_ENV = 'production';
    assert.equal(
      getRefreshTokenSecretName(),
      SECRET_NAMES.REFRESH_TOKEN
    );
  });

  it('defaults to the production refresh-token secret when APP_ENV is unset', () => {
    delete process.env.APP_ENV;
    assert.equal(
      getRefreshTokenSecretName(),
      SECRET_NAMES.REFRESH_TOKEN
    );
  });
});
