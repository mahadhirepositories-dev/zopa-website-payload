# Tasks

## 1. Backend: plugin configuration

- [ ] 1.1 Enable the upload field type and media target in the form-builder plugin config (`src/plugins/index.ts`): add `upload: true` to the `fields` override and `uploadCollections: ['media']`; verify `pnpm dev` starts and the admin Form builder lists an "Upload" field type
- [ ] 1.2 Regenerate types with `pnpm payload generate:types` and verify `UploadField` and `FormSubmission.submissionUploads` appear in `src/payload-types.ts` (clear any CRLF-only git noise with `git checkout -- src/payload-types.ts` if the diff is empty)
- [ ] 1.3 Create and run a migration for the new `submissionUploads` schema (`pnpm payload migrate:create` then `pnpm payload migrate`) and verify it succeeds and the form-submissions upload tables exist in the local database

## 2. Frontend: upload field component

- [ ] 2.1 Create `src/blocks/Form/Upload/index.tsx`: a client component rendering a styled `input[type="file"]` with `name`, `accept` from `mimeTypes`, `multiple`, and `required`, plus a helper line when `multiple` is set; verify it TypeScript-compiles
- [ ] 2.2 Register `upload: Upload` in the field map (`src/blocks/Form/fields.tsx`) and verify a form containing an upload field renders the file input on a public page

## 3. Frontend: multipart submission path

- [ ] 3.1 Update `src/blocks/Form/Component.tsx` `onSubmit` to `(data, event?)`: when the form has upload fields, build `FormData` with the JSON payload under `_payload` and append each selected file under its field name from `event.target` file inputs, else keep the existing JSON fetch; verify no `Cannot find name 'form'` TypeScript errors and that a test form with a file creates a submission with linked media
- [ ] 3.2 Apply the same multipart change to `src/blocks/Contactus/Component.tsx` and verify a contact form with an upload field submits files successfully
- [ ] 3.3 Apply the same multipart change to `src/blocks/Interestblock/Component.tsx` and verify an interest form with an upload field submits files successfully
- [ ] 3.4 Verify a form with no upload fields still submits as `application/json` (network inspection shows no multipart and no `_payload`) for all three components

## 4. Validation behavior and verification

- [ ] 4.1 Verify server-side validation: uploading a file whose MIME type is not allowed, or whose size exceeds the field's `maxFileSize`, fails the submission with a validation error and creates no submission record
- [ ] 4.2 Verify a multi-file upload field attaches every selected file to the submission (all stored in media, all linked via `submissionUploads`)
- [ ] 4.3 Verify (admin > Form Submissions) that a submission created with files lists each uploaded file as a link to its media document
- [ ] 4.4 Run the project's typecheck/lint/build (per `package.json` scripts) and verify it passes with the new component and handler changes