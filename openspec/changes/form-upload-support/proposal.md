# Proposal

## Why

Forms currently accept only text-like inputs (text, email, textarea, select, etc.). Site editors need to attach files (resumes, documents, images) to form submissions, but there is no way to configure an upload field nor for visitors to send files with a submission. The bundled `@payloadcms/plugin-form-builder` already ships native server-side upload support, so the work is mostly enabling it and wiring the frontend.

## What Changes

- Enable the bundled "Upload" field type in the form-builder plugin (`fields.upload: true`) and point file storage at the existing `media` collection (`uploadCollections: ['media']`).
- Add a new frontend `Upload` field component (`src/blocks/Form/Upload/index.tsx`) styled to match the existing form fields, supporting single and multiple file selection, optional MIME-type restrictions, and optional max file size.
- Register the new field type in the field-component map (`src/blocks/Form/fields.tsx`).
- Update the three form submission handlers (`Form`, `Contactus`, `Interestblock` components) so that when a form contains an upload field the submission is posted as `multipart/form-data`: the JSON body is sent under the special `_payload` field and selected files are appended under each upload field's name (Payload populates `req.files` from these), while keeping the existing JSON path unchanged for forms without uploads.
- Server side, the plugin's existing `handleUploads` hook creates media docs, stores the relationship in the new `submissionUploads` array on `form-submissions`, and strips upload values from `submissionData`.
- Regenerate Payload types (`pnpm payload generate:types`) and apply the schema change via a migration (project runs `push: false`).

## Capabilities

### New Capabilities

- `form-uploads`: The ability for site editors to configure file-upload fields on forms and for visitors to submit files as part of a form submission; uploaded files are persisted to the media library and associated with the submission.

### Modified Capabilities

- None. No existing specs (capability inventory is empty).

## Impact

- `src/plugins/index.ts` — form-builder plugin config (`upload: true`, `uploadCollections`).
- `src/blocks/Form/Upload/index.tsx` — new frontend component.
- `src/blocks/Form/fields.tsx` — field type mapping.
- `src/blocks/Form/Component.tsx`, `src/blocks/Contactus/Component.tsx`, `src/blocks/Interestblock/Component.tsx` — multipart submit path.
- `src/payload-types.ts` — regenerated (`UploadField`, `FormSubmission.submissionUploads`).
- Database — new `submissionUploads` relational tables on `form-submissions` (requires migration; `push: false`).
- No new dependencies; no Breaking Changes.