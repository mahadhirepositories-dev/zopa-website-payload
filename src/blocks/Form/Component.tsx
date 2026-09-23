'use client'
import type { FormFieldBlock } from '@payloadcms/plugin-form-builder/types'
import type { Form } from '@/payload-types'

import { useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

import { FormFields } from './FormFields'
import { getClientSideURL } from '@/utilities/getURL'

export type FormBlockType = {
  blockName?: string
  blockType?: 'formBlock'
  enableIntro: boolean
  form: Form
  introContent?: DefaultTypedEditorState
}

export const FormBlock: React.FC<
  {
    id?: string
  } & FormBlockType
> = (props) => {
  const {
    enableIntro,
    form: formFromProps,
    form: { id: formID, confirmationMessage, confirmationType, redirect, submitButtonLabel } = {},
    introContent,
  } = props

  const formMethods = useForm<Record<string, any>>({
  defaultValues: formFromProps.fields || [],
})
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = formMethods

  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState<boolean>()
  const [error, setError] = useState<{ message: string; status?: string } | undefined>()
  const router = useRouter()

  const onSubmit = useCallback(
    async (data: Record<string, any>, event?: any) => {
      if (!formFromProps || typeof formFromProps !== 'object') return
      setIsLoading(true)
      setError(undefined)

      const uploadFieldNames = new Set(
        (formFromProps.fields as any[])
          .filter((f) => f.blockType === 'upload')
          .map((f) => f.name),
      )

      const dataToSend = Object.entries(data)
        .filter(([name]) => !uploadFieldNames.has(name))
        .map(([field, value]) => ({ field, value }))

      const hasUploads = uploadFieldNames.size > 0
      const headers: Record<string, string> = {}
      let body: BodyInit

      if (hasUploads) {
        const formData = new FormData()
        formData.append('_payload', JSON.stringify({ form: formID, submissionData: dataToSend }))
        const formEl = event?.target as HTMLFormElement
        if (formEl?.querySelectorAll) {
          formEl.querySelectorAll<HTMLInputElement>('input[type="file"][name]').forEach((input) => {
            if (input.files) Array.from(input.files).forEach((f) => formData.append(input.name, f))
          })
        }
        body = formData
      } else {
        headers['Content-Type'] = 'application/json'
        body = JSON.stringify({ form: formID, submissionData: dataToSend })
      }

      try {
        const req = await fetch(`${getClientSideURL()}/api/form-submissions`, {
          method: 'POST',
          headers,
          body,
        })
        const res = await req.json()
        if (req.status >= 400) {
          setIsLoading(false)
          setError({ message: res.errors?.[0]?.message || 'Internal Server Error', status: String(res.status) })
          return
        }
        setIsLoading(false)
        setHasSubmitted(true)
        // restore any success handling the original had here (reset(), redirect)
        if (confirmationType === 'redirect' && redirect) {
          router.push(typeof redirect === 'object' ? redirect.url : redirect)
        }
      } catch {
        setIsLoading(false)
        setError({ message: 'Something went wrong' })
      }
    },
    [formFromProps, formID, confirmationType, redirect, router],
  )

  return (
    <div className="container lg:max-w-[48rem]">
      {enableIntro && introContent && !hasSubmitted && (
        <RichText className="mb-8 lg:mb-12" data={introContent} enableGutter={false} />
      )}
      <div className="p-4 lg:p-6 border border-border rounded-[0.8rem]">
        <FormProvider {...formMethods}>
          {!isLoading && hasSubmitted && confirmationType === 'message' && (
           <RichText data={confirmationMessage || { root: { type: 'root', children: [], direction: null, format: '', indent: 0, version: 1 } }} />
          )}
          {isLoading && !hasSubmitted && <p>Loading, please wait...</p>}
          {error && <div>{`${error.status || '500'}: ${error.message || ''}`}</div>}
          {!hasSubmitted && (
            <form id={String(formID)} onSubmit={handleSubmit(onSubmit)}>
              <FormFields form={formFromProps} control={control} errors={errors} register={register} />

              <Button form={String(formID)} type="submit" variant="default">
                {submitButtonLabel}
              </Button>
            </form>
          )}
        </FormProvider>
      </div>
    </div>
  )
}