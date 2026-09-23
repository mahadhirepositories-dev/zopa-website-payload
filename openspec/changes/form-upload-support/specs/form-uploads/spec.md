# Spec Delta

## Purpose

Lets site editors add file-upload fields to forms and lets visitors submit files (resumes, documents, images) as part of a form submission, with files stored in the media library and linked back to the submission.

## ADDED Requirements

### Requirement: Admin can configure an upload field on a form

The system SHALL allow editors to add an upload field to any form, configurable with a label, required flag, optional multiple-file support, optional allowed MIME types, and optional maximum file size. Upload fields SHALL persist with the form and be rendered on the public form.

#### Scenario: Adding an upload field to a form

- **WHEN** an editor adds an upload field type to a form in the admin UI and saves it
- **THEN** the field appears among the form's fields and is rendered on the public form with the configured label and options

#### Scenario: Rendering an upload input on the public form

- **WHEN** a visitor opens a public page containing a form with an upload field
- **THEN** a file picker input is displayed for that field, allowing selection of one file (or multiple files when the field allows it)

### Requirement: Visitor submits files with a form submission

The system SHALL accept files submitted with a form and associate them with the resulting submission. Each uploaded file SHALL be stored as a media document, and the submission SHALL reference the created media documents. Uploaded file values SHALL NOT appear in the submission's text field data.

#### Scenario: Submitting a form with one file

- **WHEN** a visitor selects a file on an upload field and submits the form
- **THEN** a form submission is created, the file is stored in the media library, the submission references the created media document, and the upload field is omitted from the submission's field-value data

#### Scenario: Submitting a form with multiple files on one field

- **WHEN** a visitor selects several files on a multi-file upload field and submits the form
- **THEN** each selected file is stored as a media document and all created media documents are referenced by the submission

### Requirement: Uploaded files appear on the submission record

The system SHALL surface uploaded files on a submission record so that staff viewing the submission in the admin can see and access every file attached to it.

#### Scenario: Viewing a submission that includes uploads

- **WHEN** a staff member opens a form submission that was created with files attached
- **THEN** the record lists each uploaded file as a link to the stored media document

### Requirement: Uploaded files are validated against field options

The system SHALL reject a submission when an uploaded file does not conform to the upload field's configured constraints: a file whose MIME type is not in the field's allowed list, or whose size exceeds the field's maximum file size, SHALL cause the submission to fail with a validation error. When validation fails, the failed submission SHALL NOT be stored.

#### Scenario: File MIME type is not allowed

- **WHEN** a visitor uploads a file whose MIME type is not among the field's allowed MIME types and submits the form
- **THEN** the submission fails with a validation error and no submission record is created

#### Scenario: File exceeds the configured maximum size

- **WHEN** a visitor uploads a file larger than the field's configured maximum file size and submits the form
- **THEN** the submission fails with a validation error and no submission record is created

### Requirement: Forms without upload fields keep existing submission behavior

The system SHALL continue to submit forms that have no upload fields exactly as before, without multipart encoding or any change in the stored submission data.

#### Scenario: Submitting a form with no upload fields

- **WHEN** a visitor submits a form that has no upload fields
- **THEN** the submission is created with the same field-value data and behavior as prior to this change