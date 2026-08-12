'use client'

import React from 'react'
import type { Form as FormType } from '@/payload-types'
import type { Control, FieldErrorsImpl, UseFormRegister } from 'react-hook-form'
import { fields } from './fields'

type FormFieldsProps = {
  form: FormType
  control: Control<any>
  errors: Partial<FieldErrorsImpl<any>>
  register: UseFormRegister<any>
}

export const FormFields: React.FC<FormFieldsProps> = ({ form, control, errors, register }) => {
  if (!form?.fields?.length) return null

  const rows: { fields: typeof form.fields; key: string }[] = []
  let currentRow: typeof form.fields = []
  let currentWidth = 0

  form.fields.forEach((field) => {
    const w = (field as any).width || 100
    if (currentWidth + w > 100 && currentRow.length > 0) {
      rows.push({ fields: currentRow, key: currentRow.map((f) => (f as any).name || (f as any).id || Math.random()).join('-') })
      currentRow = []
      currentWidth = 0
    }
    currentRow.push(field)
    currentWidth += w
  })

  if (currentRow.length > 0) {
    rows.push({ fields: currentRow, key: currentRow.map((f) => (f as any).name || (f as any).id || Math.random()).join('-') })
  }

  return (
    <>
      {rows.map((row) => (
        <div className="flex gap-4 mb-5" key={row.key}>
          {row.fields.map((field, index) => {
            const Field = fields?.[field.blockType as keyof typeof fields]
            if (Field) {
              return (
                  <div style={{ flex: `0 0 ${(field as any).width || 100}%` }} key={index}>
                     {React.createElement(Field as React.FC<any>, {
                      form,
                      ...field,
                      control,
                      errors,
                      register,
                       })}
                  </div>
                )
            }
            return null
          })}
        </div>
      ))}
    </>
  )
}