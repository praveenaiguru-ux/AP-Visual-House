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
| INT-001 | Staging OAuth / Drive + Gmail | Staging does not define `GOOGLE_DRIVE_REDIRECT_URI`. `getDriveRedirectUri()` therefore falls back to the hard-coded Production OAuth callback URL. Staging reports the Production callback URI, and the September 20 Staging submission failed with `invalid_grant` during Google Drive folder setup and subsequently during Gmail notification. Confirmed GCS retained the uploaded file as designed. | High | Open | — | — | No | — |

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

- [ ] Add Staging `GOOGLE_DRIVE_REDIRECT_URI`
- [ ] Verify Google OAuth Console contains the exact Staging redirect URI
- [ ] Re-authorize the Staging Google account with Drive + Gmail scopes
- [ ] Confirm Staging OAuth status reports the Staging callback URI
- [ ] Submit a Staging project with a file
- [ ] Confirm file transfers from Confirmed GCS to Google Drive
- [ ] Confirm transferred file is deleted from Confirmed GCS
- [ ] Confirm owner Gmail notification is sent
- [ ] Confirm no `invalid_grant` appears in Staging logs
- [ ] Verify retry/recovery behavior for the existing retained GCS file

---

## Change History

| Date | Change |
|---|---|
| 2026-09-15 | Created defect log and initial submission-confirmation defects UI-001 and UI-002. |
| 2026-09-20 | Added INT-001: Staging OAuth redirect URI configuration defect. Root cause confirmed through Cloud Run configuration, application source, OAuth status endpoint, and Staging `invalid_grant` logs. |
