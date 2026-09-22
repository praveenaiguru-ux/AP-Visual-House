# AP Visual House — UI Defect Log

This document tracks UI defects identified during AP Visual House stabilization,
including their fixes and regression verification.

## Status Definitions

- Open — Defect identified and not yet fixed
- In Progress — Fix is currently being implemented
- Ready for Verification — Fix deployed to staging and awaiting verification
- Closed — Fix verified successfully
- Deferred — Intentionally postponed
- Reopened — Previously closed defect has returned

## Severity Definitions

- Critical — Blocks a core customer/business flow
- High — Major functional or user experience problem
- Medium — Noticeable defect; workaround exists
- Low — Cosmetic, wording, or minor UX issue

---

## Defects

| ID | Area | Defect | Severity | Status | Fix Branch | Commit | Staging Verified | Regression |
|---|---|---|---|---|---|---|---|---|
| UI-001 | Submission Confirmation | After successful project submission, the page still displays the "Ready to Make It Visual?" / "Start This Project" CTA section, creating an ambiguous post-submission state. | Medium | Open | — | — | — | — |
| UI-002 | Submission Confirmation | Customer-facing confirmation displays technical wording "file(s) staged". Replace with customer-friendly wording such as "file attached" / "files attached". | Low | Open | — | — | — | — |
| INT-001 | Staging OAuth / Drive + Gmail | Staging used the Production OAuth callback and shared Production refresh-token configuration. The September 20 Staging submission failed with `invalid_grant` during Google Drive folder setup and subsequently during Gmail notification. The fix adds the exact Staging OAuth redirect URI and isolates the Staging refresh token in `google-drive-staging-refresh-token`, selected by `APP_ENV=staging`. | High | Closed | fix/staging-oauth-refresh-token-isolation | 3b4b0a114e2e82651a1ba02e2938160ac13508f | Yes | Yes |

---

## Regression Checklist

### Submission Confirmation

- [ ] Successful submission displays confirmation state
- [ ] Project reference is prominently displayed
- [ ] Customer name is displayed correctly
- [ ] Service name is displayed correctly
- [ ] Starting quote is displayed correctly
- [ ] Contact information is displayed correctly
- [ ] File count is displayed using customer-friendly wording
- [ ] WhatsApp notification CTA works
- [ ] Submit Another Request works
- [ ] No "Ready to Make It Visual?" / "Start This Project" CTA appears after successful submission
- [ ] Confirmation state is responsive on mobile
- [ ] Confirmation state is responsive on desktop

### INT-001 — Staging OAuth / Drive + Gmail

- [x] Add Staging `GOOGLE_DRIVE_REDIRECT_URI`
- [x] Verify Google OAuth Console contains the exact Staging redirect URI
- [x] Re-authorize the Staging Google account with Drive + Gmail scopes
- [x] Confirm Staging OAuth status reports the Staging callback URI
- [x] Submit a Staging project with a file
- [x] Confirm file transfers from Confirmed GCS to Google Drive
- [x] Confirm transferred file is deleted from Confirmed GCS
- [x] Confirm owner Gmail notification is sent
- [x] Confirm no `invalid_grant` appears in Staging logs
- [ ] Verify retry/recovery behavior for the existing retained GCS file

### INT-001 Verification Evidence

- Staging revision `ap-visual-house-staging-00018-8j2` was deployed with immutable image `sha256:33a29336798783dc644e2d1210306064550fa3fefe0675370bdc68d4bd11c4bf`.
- Staging `APP_ENV=staging` and the Production `GOOGLE_DRIVE_REFRESH_TOKEN` environment mapping was removed.
- Live OAuth status reported `google-drive-staging-refresh-token`, `connected=true`, and `tokenAvailable=true`.
- Google OAuth authorization completed successfully with `drive.file` and `gmail.send` scopes.
- End-to-end Staging test `APV-2609-AM8Y` completed successfully.
- Drive logs recorded project-folder creation, file transfer, metadata update, and transfer completion.
- Gmail log recorded: `[OWNER EMAIL] Notification sent for project APV-2609-AM8Y.`
- No `invalid_grant` appeared in the test request logs.
- Confirmed GCS prefix `confirmed/req_o09vj97emucy4x6o/` returned no objects after successful Drive transfer, confirming cleanup.
- Production refresh-token secret `google-drive-refresh-token` was not used by the Staging application during the verified flow.
- The existing retained-GCS-file retry/recovery scenario was not separately exercised during this verification.

---

## Change History

| Date | Change |
|---|---|
| 2026-09-15 | Created defect log and initial submission-confirmation defects UI-001 and UI-002. |
| 2026-09-20 | Added INT-001: Staging OAuth redirect URI configuration defect. Root cause confirmed through Cloud Run configuration, application source, OAuth status endpoint, and Staging `invalid_grant` logs. |
| 2026-09-22 | Closed INT-001 after Staging OAuth isolation, Drive transfer, Gmail notification, confirmed-storage cleanup, and no-`invalid_grant` verification using project APV-2609-AM8Y. |
