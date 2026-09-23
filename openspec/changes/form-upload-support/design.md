# Design

## Context

See proposal.md — Why. The project ships `@payloadcms/plugin-form-builder` 3.86, which already implements server-side upload handling end-to-end: an `upload` field type, a `submissionUploads` relationship array on the generated `form-submissions` collection, and a `handleUploads` beforeChange hook that reads files from `payload.files[<field name>]` (populated when a request is `multipart/form-data`), validates MIME type and size against the field config, creates media documents, links them on the submission, and strips the upload values out of `submissionData`. Payload's REST create handler also natively supports multipart (its `addDataAndFileToRequest` utility parses it and accepts the whole JSON body under a `_payload` field). The public form frontend renders plugin field types via a static map in `src/blocks/Form/fields.tsx` and posts submissions from three components (`Form`, `Contactus`, `Interestblock`). The database runs with `push: false`, so schema changes require migrations.

## Goals / Non-Goals

**Goals:**
- Reuse the plugin's native upload capability; no plugin source changes.
- Minimal divergence in the three submit handlers: uploads only change the HTTP transport when the form actually contains upload fields.
- Consistent with existing field styling and project conventions (no new dependencies).

**Non-Goals:**
- No drag-and-drop UI, previews, or client-side chunking.
- No per-field custom storage targets (files go to the shared `media` collection).
- No changes to how non-upload forms are submitted.

## Decisions

### D1: Enable the plugin's `upload` field + `uploadCollections`
Add `upload: true` to the form-builder plugin's `fields` override and set `uploadCollections: ['media']`. This makes the Upload field available in the Form builder, adds `submissionUploads`/`submissionUpload` to the `form-submissions` collection, and registers the `handleUploads` hook.
*Alternatives:* a hand-rolled upload field collection plus custom API route — rejected; duplicates verified plugin behavior and adds maintenance.

### D2: Multipart transport using the `_payload` field
When a form has upload fields, the client posts `multipart/form-data`: the existing JSON payload (`{ form, submissionData }`) is serialized into a `_payload` form field, and each selected file is appended under its upload field's `name` (repeated for multiple files). Payload's `addDataAndFileToRequest` restores `req.data` from `_payload` and exposes `req.files[name]`, which `handleUploads` consumes — a verified, documented pairing.
*Alternatives:* bracket-notation form fields (`submissionData[0][field]=...`) — fragile to parse and unnecessary; `_payload` is the platform-supported escape hatch.

### D3: Read selected files from the submitted DOM form, not RHF state
The `Upload` component is deliberately **not** registered with react-hook-form (files are not JSON-serializable and would pollute `submissionData`). react-hook-form's `handleSubmit` passes the submit event as the callback's second argument, so the submit handlers read `event.target` to gather `input[type="file"]` elements by name and append their `files`. Signature becomes `(data, event?)`.
*Alternatives:* module-level file registry — rejected as more state to keep in sync than a DOM read at the single submit point.

### D4: Keep the JSON path when no upload fields exist
Transport choice is decided per form instance: `uploadFieldNames.size > 0` selects multipart, otherwise the existing `application/json` fetch is used unchanged. Preserves verified current behavior and the spec requirement "forms without upload fields keep existing submission behavior".

### D5: Validation is server-authoritative
MIME/size enforcement is done server-side by the plugin hook (the spec requirement). The client only sets the `accept` attribute as a convenience filter; `required` uses native file-input validation.

## Risks / Trade-offs

- **Request size limit** — Payload enforces a default upload body limit; a single large file can be rejected at the HTTP layer before the hook runs. → Document the cap; raise globally via `bodyParser`/`upload` config only if a product need emerges.
- **Orphaned media docs** — if the submission fails after the hook uploads a file, a media doc could be left without a link. → Acceptable for now (plugin behavior, no spec violation); note as future cleanup (cron or afterChange verification).
- **Programmatic submit without an event** — `handleSubmit(onSubmit)()` yields no `event.target`, so no files would be attached. → Guard (`event?.target?.querySelectorAll`) keeps it safe; all current call sites submit via `<form onSubmit>`.
- **Regenerated `payload-types.ts` churn** — CRLF/LF noise appears in git status (empty diff). → Cosmetic; clear with `git checkout -- src/payload-types.ts` after regenerating.

## Migration Plan

1. Code changes (plugin config, `Upload` component, `fields.tsx`, three submit handlers).
2. `pnpm payload generate:types` → commit regenerated `src/payload-types.ts`.
3. Schema change for the new `submissionUploads` tables (`push: false` is set) → `pnpm payload migrate:create` then `pnpm payload migrate`, commit the generated migration. (Dev alternative: temporary `push: true` + dev-server restart + revert, then still commit a real migration before production.)
4. Manual verification: add an upload field to a test form in admin, submit with/without files from a public page, confirm media docs + `submissionUploads` on the record, and confirm a non-upload form still posts JSON.
5. Rollback: revert the config/code commit and the migration commit; data remains (media docs keep existing; no destructive change).

## Open Questions

None that affect the specs, approach, or task breakdown.