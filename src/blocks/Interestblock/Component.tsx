'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import type { InterestFormBlock } from '@/payload-types'
import { Media } from '@/components/Media'
import { Phone, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FormFields } from '@/blocks/Form/FormFields'
import { getClientSideURL } from '@/utilities/getURL'
import { ArrowRight } from 'lucide-react'


export const InterestFormBlockComponent: React.FC<InterestFormBlock> = (props) => {
  const {
    label,
    heading,
    description,
    backgroundImage,
    overlayHeading,
    overlayDescription,
    contactPhone,
    contactEmail,
    formHeading,
    form,
    formLogo
  } = props

  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  const defaultValues =
    form && typeof form === 'object' && form.fields
      ? (form.fields as any[]).reduce(
          (acc, field) => {
            acc[field.name] = (field as any).defaultValue || ''
            return acc
          },
          {} as Record<string, string>,
        )
      : {}

  const formMethods = useForm({ defaultValues })

  const {
  handleSubmit,
  control,
  formState: { errors },
  register,
  reset,
} = formMethods

  const onSubmit = useCallback(
    async (data: Record<string, any>) => {
      if (!form || typeof form !== 'object') return

      setIsLoading(true)
      setError(null)

      const dataToSend = Object.entries(data).map(([name, value]) => ({
        field: name,
        value,
      }))

      try {
        const req = await fetch(`${getClientSideURL()}/api/form-submissions`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            form: form.id,
            submissionData: dataToSend,
          }),
        })

        if (req.status >= 400) {
          const res = await req.json()
          setIsLoading(false)
          setError(res.errors?.[0]?.message || 'Something went wrong. Please try again.')
          return
        }

        setIsLoading(false)
        setHasSubmitted(true)
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
        timeoutRef.current = setTimeout(() => {
          setHasSubmitted(false)
          setError(null)
          reset()
        }, 7000) // show thank-you for 7s, then bring the form back
      } catch (err) {
        setIsLoading(false)
        setError('Something went wrong. Please try again.')
      }
    },
   [form, reset]
  )

  return (
    <section className="py-30 pb-45 bg-white">
      <div className="container">
        {/* Top: Label + Heading + Description */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-17">
          <div className="flex flex-col gap-4">
            {label && (
              <span className="inline-block self-start px-3 py-1 bg-[#DCDCDC] text-sm border border-border rounded-xs text-black">
                {label}
              </span>
            )}
            {heading && (
              <h2 className="text-4xl md:text-[50px] font-[400] leading-tight text-black font-sans whitespace-pre-line">
                {heading}
              </h2>
            )}
          </div>
          <div>
            {description && (
              <p className="text-gray-800 text-[13px] mt-18 leading-relaxed">{description}</p>
            )}
          </div>
        </div>

        {/* Full width image with overlay cards */}
        <div className="relative shadow-lg">
          {/* Background image */}
          <div className="relative h-[600px]">
            {backgroundImage && typeof backgroundImage === 'object' ? (
              <Media
                resource={backgroundImage}
                className="absolute inset-0 w-full h-full"
                imgClassName="object-cover w-full h-full"
              />
            ) : (
              <div className="absolute inset-0 bg-gray-300" />
            )}
          </div>

          <div>
            {/* Left: Contact Card */}
            <div className="backdrop-blur-xs bg-black/40 rounded-lg shadow-lg p-8 absolute z-10 top-117 left-5 w-[500px]">
              {overlayHeading && (
                <h3 className="text-xl font-semibold text-white mb-3">{overlayHeading}</h3>
              )}
              {overlayDescription && (
                <p className="text-white text-sm leading-relaxed mb-6">{overlayDescription}</p>
              )}

              {contactPhone && (
                <div className="flex items-center gap-4 p-4 border-b border-gray-200 hover:bg-white/50 hover:rounded-md transition-colors">
                  <div className="w-10 h-10 bg-gray-100 rounded-sm flex items-center justify-center">
                    <Phone className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-800">Call us at:</p>
                    <p className="font-semibold text-black">{contactPhone}</p>
                  </div>
                </div>
              )}
              {contactEmail && (
                <div className="flex items-center gap-4 p-4 hover:rounded-md hover:bg-white/50 hover:border-white/50 transition-colors">
                  <div className="w-10 h-10 bg-gray-100 rounded-sm flex items-center justify-center">
                    <Mail className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-800">Mail us at:</p>
                    <p className="font-semibold text-black">{contactEmail}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Right: Form Card */}
            <div className="absolute -top-15 right-6 w-full max-w-[600px]">
              <div className="bg-white rounded-lg shadow-lg">
                {/* Header */}
                <div className="bg-[#2a2a2a] px-8 py-2 flex items-center gap-4">
                  <div className="w-25 h-25 flex-shrink-0 overflow-hidden rounded-sm">
                     <Media
                         resource={formLogo}
                         className="w-full h-full"
                         imgClassName="object-contain w-full h-full"
                      />
                  </div>
                  <div className="w-px h-8 bg-gray-500" />
                  {formHeading && (
                    <h3 className="text-white text-[20px] font-[400] font-sans">{formHeading}</h3>
                  )}
                </div>

                {/* Form body */}
                {form && typeof form === 'object' && (
                  <div className="p-8">
                    {/* Success state */}
                    {hasSubmitted && (
                      <div className="text-center py-8">
                        <p className="text-lg font-semibold text-green-600 mb-2">
                          Thank you for your interest!
                        </p>
                        <p className="text-sm text-gray-500">
                          We have received your submission and will get back to you shortly.<br/>
                          Form will back in 7 seconds..
                        </p>
                      </div>
                    )}

                    {/* Loading state */}
                    {isLoading && (
                      <div className="text-center py-8">
                        <p className="text-sm text-gray-500">Submitting, please wait...</p>
                      </div>
                    )}

                    {/* Error state */}
                    {error && (
                      <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                        <p className="text-sm text-red-600">{error}</p>
                      </div>
                    )}

                    {/* Form */}
                    {!hasSubmitted && !isLoading && (
                      <FormProvider {...formMethods}>
                        <form id="interest-form" onSubmit={handleSubmit(onSubmit)}>
                          <FormFields
                            form={form}
                            control={control}
                            errors={errors}
                            register={register}
                          />

                          {/* Submit button */}
                          <Button
                            type="submit"
                            className="bg-[#dbac2b] hover:bg-[#000] text-black hover:text-white px-6 py-2.5 rounded-md font-medium"
                          >
                            Express Interest
                            <ArrowRight className="w-4 h-4 ml-2 inline-block" />
                          </Button>

                          {/* Disclaimer */}
                          <p className="mt-6 text-xs text-gray-500 border-t border-gray-200 pt-4">
                            By submitting this form you agree to our{' '}
                            <a href="/privacy-policy" className="underline hover:text-gray-700">
                              Privacy Policy
                            </a>
                            . We may contact you via email or phone for scheduling or marketing
                            purposes.
                          </p>
                        </form>
                      </FormProvider>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}