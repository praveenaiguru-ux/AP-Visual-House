# Category Heading UI Change — Implementation Record

## Purpose

This document records how the top-level service category headings were changed without changing the underlying service names or application behavior.

The change was intentionally limited to the presentation layer so that existing service names continue to flow unchanged into service detail pages, submission confirmations, email subject/body content, Google Drive metadata, and backend processing.

## Change implemented

Source file:

`src/data/services/categories.ts`

Only the `title` property of each category was changed.

| Category ID | Previous heading | New heading |
|---|---|---|
| `ai-images` | AI Image Creation | AI & Personal |
| `restoration` | Photo Restoration | Photo Restoration |
| `3d-visualization` | 3D & Architectural Visualization | Home & Architecture |
| `invitations` | Invitations & Events | Invitations & Celebrations |
| `product-creatives` | Product & Social Media Creatives | Business & Social Media |
| `video-ads` | Video Ads | Video & Motion |

## What was deliberately NOT changed

The following were left unchanged:

- Service names
- Service IDs
- Service slugs
- Category IDs
- Category slugs
- Category slug aliases
- Category ID-to-slug mappings
- Service descriptions
- Service images
- Service pricing
- Delivery information
- Service detail pages
- Submission flow
- Submission confirmation logic
- Email subject/body logic
- Google Drive integration
- Google Cloud Storage flow
- Backend/API behavior
- Authentication/OAuth configuration

### Important distinction

A category heading is a presentation label.

A service name is an application/business entity.

For example:

- Category heading: `AI & Personal`
- Service name: `Family Creative Portrait`

The service name remains `Family Creative Portrait` everywhere it was previously used.

## Source-level implementation

The implementation was a five-line replacement of category `title` values (with Photo Restoration remaining unchanged).

Example:

```ts
{
  id: 'ai-images',
  slug: 'ai-image-creation',
  shortTitle: 'AI Images',
  title: 'AI & Personal',
  ...
}
```

No category IDs, slugs, mappings, or service definitions were modified.

## Git change

The UI change was committed and merged through GitHub PR #8.

- Branch: `ui/category-heading-refresh`
- PR: #8 — `ui: refresh category headings`
- Feature commit: `89fa1cc6db797bde03d4bae876785df96cf08e55`
- Merge commit: `c3beb22836288854d50e89540f7e2e2e890f09bf`

The merge changed only:

`src/data/services/categories.ts`

with 5 additions and 5 deletions.

## Staging deployment process

The deployment was intentionally performed with zero normal Staging traffic until the new UI was verified.

### Step 1 — Build

The first build used:

`staging-category-headings-c3beb228`

However, Cloud Shell was still checked out at the previous commit:

`0fab920`

That meant the first image did not contain the category-heading change even though the Cloud Build itself completed successfully.

First image:

`sha256:6b2571df85b91882349ab05bf8f5c115e13095cd77eacd050781028ce0ed66e3`

### Step 2 — Identify and correct the stale checkout

The local checkout was checked with:

```bash
git log -1 --oneline
```

It showed:

`0fab920 (HEAD -> main, origin/main, origin/HEAD)`

The repository was then synchronized:

```bash
git pull --ff-only origin main
```

Cloud Shell moved to:

`c3beb22`

### Step 3 — Rebuild from the correct commit

The corrected source was rebuilt using:

`staging-category-headings-c3beb22`

Cloud Build:

`796d00e6-52be-4f65-92e3-9d0fa496ac58`

Correct image:

`sha256:00f1ff86f08cc0ce87ddd6037da239d7ee0129921600540b51ee038f423f83f3`

The Vite frontend bundle also changed from the earlier bundle to the new bundle, confirming that the frontend source was rebuilt.

### Step 4 — Deploy without normal traffic

The corrected image was deployed to:

`ap-visual-house-staging-00022-qhb`

Normal Staging traffic remained on:

`ap-visual-house-staging-00020-8fk`

The corrected revision was then exposed through the temporary tag:

`category-headings`

Tagged Staging URL:

`https://category-headings---ap-visual-house-staging-w627tfzezq-as.a.run.app`

### Step 5 — Verify the revision image

The Cloud Run revision was checked directly and confirmed to use:

`sha256:00f1ff86f08cc0ce87ddd6037da239d7ee0129921600540b51ee038f423f83f3`

### Step 6 — Visual QA

The tagged Staging URL was opened in the browser after the tag was moved to revision `00022-qhb`.

The updated headings were visibly confirmed:

- AI & Personal
- Photo Restoration
- Home & Architecture
- Invitations & Celebrations
- Business & Social Media
- Video & Motion

The screenshots captured during QA also confirmed that the underlying service cards continued to display their original service names, including:

`Cartoon Portrait`

`Creative AI Portrait`

`2D Floor Plan → 3D Floor Plan`

and other existing service names.

## Deployment lesson

For future UI changes, always verify the local Git commit before running `gcloud builds submit`.

Recommended sequence:

```bash
git status
```

```bash
git log -1 --oneline
```

```bash
git pull --ff-only origin main
```

Then build the image.

The important rule is:

**Build from the exact Git commit that contains the intended change.**

Do not assume that a successful Cloud Build means the intended source version was built.

## Recommended Staging pattern for future UI changes

1. Merge the approved change to `main`.
2. Synchronize Cloud Shell with `origin/main`.
3. Verify the commit SHA.
4. Build an immutable image.
5. Record the image digest.
6. Deploy the image with `--no-traffic`.
7. Assign a temporary Cloud Run tag.
8. Test the tagged revision directly.
9. Perform visual and functional QA.
10. Move Staging traffic to the tested revision only after QA passes.
11. Use the exact tested image for Production promotion.

## Current state

The category heading change is verified on the tagged Staging revision.

Normal Staging traffic has not yet been moved to revision `00022-qhb`.

Production has not been changed by this UI update.

## Reference

Feature PR:

`ui: refresh category headings` — PR #8

Merge commit:

`c3beb22836288854d50e89540f7e2e2e890f09bf`
