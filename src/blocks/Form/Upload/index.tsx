'use client'
import React from 'react'

type UploadFieldProps = {
  name?: string
  label?: string
  required?: boolean
  multiple?: boolean
  maxFileSize?: number
  mimeTypes?: { mimeType: string }[] | null
}

export const Upload: React.FC<UploadFieldProps> = (props) => {
  const { name, label, required, multiple, mimeTypes } = props

  if (!name) return <div className="text-sm text-red-600">Missing upload field name</div>

  const accept = mimeTypes?.map((m) => m.mimeType).join(',') || undefined

  return (
    <div className="mb-4">
      <label htmlFor={name} className="mb-1 block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      <input
        id={name}
        type="file"
        name={name}
        multiple={multiple || false}
        accept={accept}
        required={required || false}
        className="w-full text-sm text-gray-600 file:mr-3 file:cursor-pointer file:rounded-sm file:border-0 file:bg-[#dbac2b] file:px-4 file:py-2 file:text-sm file:font-medium file:text-black hover:file:bg-[#c9a024]"
      />
      {multiple && (
        <p className="mt-1 text-xs text-gray-500">You can select multiple files (hold Ctrl/Cmd).</p>
      )}
    </div>
  )
}