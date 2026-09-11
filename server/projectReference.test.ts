import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  generateProjectReference,
  PROJECT_REFERENCE_REGEX
} from './projectReference';

describe('Project reference generation', () => {
  it('generates a valid customer-facing reference', () => {
    const reference = generateProjectReference(
      new Date('2026-09-09T12:00:00.000Z')
    );

    assert.match(reference, PROJECT_REFERENCE_REGEX);
    assert.match(reference, /^APV-2609-[A-HJ-NP-Z2-9]{4}$/);
  });

  it('uses IST at the UTC month boundary', () => {
    // 2026-08-31 18:45 UTC = 2026-09-01 00:15 IST.
    const reference = generateProjectReference(
      new Date('2026-08-31T18:45:00.000Z')
    );

    assert.match(reference, /^APV-2609-[A-HJ-NP-Z2-9]{4}$/);
  });

  it('keeps August when the IST date is still August', () => {
    // 2026-08-31 18:29 UTC = 2026-08-31 23:59 IST.
    const reference = generateProjectReference(
      new Date('2026-08-31T18:29:00.000Z')
    );

    assert.match(reference, /^APV-2608-[A-HJ-NP-Z2-9]{4}$/);
  });

  it('never includes visually confusing suffix characters', () => {
    for (let i = 0; i < 100; i++) {
      const reference = generateProjectReference(
        new Date('2026-09-09T12:00:00.000Z')
      );

      const suffix = reference.slice(-4);

      assert.equal(/[01OI]/.test(suffix), false);
    }
  });
});
