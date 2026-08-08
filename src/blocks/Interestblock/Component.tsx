'use client'

import React, { useCallback, useState } from 'react'
import { useForm, FormProvider, Controller } from 'react-hook-form'
import type { InterestFormBlock } from '@/payload-types'
import { Media } from '@/components/Media'
import { Phone, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { getClientSideURL } from '@/utilities/getURL'

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
  } = props

  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Helper: find a field by name from the CMS form
  const getField = (name: string) =>
    form && typeof form === 'object' && form.fields
      ? (form.fields as any[]).find((f: any) => f.name === name)
      : null

  // Extract field data from CMS
  const nameField = getField('name')
  const phoneField = getField('phone')
  const emailField = getField('email')
  const companyField = getField('company')
  const websiteField = getField('companyWebsite')
  const solutionField = getField('solutionInterested')
  const industryField = getField('industry')
  const categoriesField = getField('operatingCategories')
  const messageField = getField('message')

  // Extract select options from CMS fields
  const solutionOptions = (solutionField as any)?.options || []
  const industryOptions = (industryField as any)?.options || []
  const categoriesOptions = (categoriesField as any)?.options || []

  // Build default values from CMS field defaults
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
    register,
    handleSubmit,
    control,
    formState: { errors },
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
      } catch (err) {
        setIsLoading(false)
        setError('Something went wrong. Please try again.')
      }
    },
    [form],
  )

  return (
    <section className="py-30 pb-45 bg-white">
      <div className="container">
        {/* Top: Label + Heading + Description */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="flex flex-col gap-4">
            {label && (
              <span className="inline-block self-start px-3 py-1 bg-[#DCDCDC] text-sm border border-border rounded-xs text-black">
                {label}
              </span>
            )}
            {heading && (
              <h2 className="text-4xl md:text-[40px] font-[400] leading-tight text-black font-sans whitespace-pre-line">
                {heading}
              </h2>
            )}
          </div>
          <div>
            {description && (
              <p className="text-gray-800 text-[13px] leading-relaxed">{description}</p>
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
            <div className="backdrop-blur-[10px] rounded-lg shadow-lg p-8 absolute z-10 top-120 left-5 w-[500px]">
              {overlayHeading && (
                <h3 className="text-xl font-semibold text-white mb-3">{overlayHeading}</h3>
              )}
              {overlayDescription && (
                <p className="text-white text-sm leading-relaxed mb-6">{overlayDescription}</p>
              )}

              {contactPhone && (
                <div className="flex items-center gap-4 mb-4 pb-4 border-b border-gray-200">
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
                <div className="flex items-center gap-4">
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
            <div className="absolute z-20 -top-15 right-0 w-full max-w-[580px]">
              <div className="bg-white rounded-lg shadow-lg">
                {/* Header */}
                <div className="bg-[#2a2a2a] px-8 py-5 flex items-center gap-4">
                  <div className="text-white">
                    <span className="text-lg font-bold">ZOPA</span>
                    <span className="text-xs block text-gray-400">Procure Efficiently</span>
                  </div>
                  <div className="w-px h-8 bg-gray-500" />
                  {formHeading && (
                    <h3 className="text-white text-lg font-semibold">{formHeading}</h3>
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
                          We have received your submission and will get back to you shortly.
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
                          {/* Row 1: Name + Phone */}
                          <div className="grid grid-cols-2 gap-4 mb-5">
                            <div>
                              <Label
                                htmlFor={nameField?.name || 'name'}
                                className="text-sm font-medium text-gray-700 mb-1.5 block"
                              >
                                {nameField?.label || 'Name'}
                                {nameField?.required && (
                                  <span className="text-red-500 ml-1">*</span>
                                )}
                              </Label>
                              <Input
                                id={nameField?.name || 'name'}
                                type="text"
                                placeholder={`Enter your ${(nameField?.label || 'name').toLowerCase()}`}
                                defaultValue={(nameField as any)?.defaultValue || ''}
                                {...register(nameField?.name || 'name', {
                                  required: nameField?.required,
                                })}
                              />
                              {errors[nameField?.name || 'name'] && (
                                <p className="text-xs text-red-500 mt-1">This field is required</p>
                              )}
                            </div>
                            <div>
                              <Label
                                htmlFor={phoneField?.name || 'phone'}
                                className="text-sm font-medium text-gray-700 mb-1.5 block"
                              >
                                {phoneField?.label || 'Phone'}
                                {phoneField?.required && (
                                  <span className="text-red-500 ml-1">*</span>
                                )}
                              </Label>
                              <Input
                                id={phoneField?.name || 'phone'}
                                type="tel"
                                placeholder={`Enter your ${(phoneField?.label || 'phone').toLowerCase()}`}
                                defaultValue={(phoneField as any)?.defaultValue || ''}
                                {...register(phoneField?.name || 'phone', {
                                  required: phoneField?.required,
                                })}
                              />
                              {errors[phoneField?.name || 'phone'] && (
                                <p className="text-xs text-red-500 mt-1">This field is required</p>
                              )}
                            </div>
                          </div>

                          {/* Row 2: Email (full width) */}
                          <div className="mb-5">
                            <Label
                              htmlFor={emailField?.name || 'email'}
                              className="text-sm font-medium text-gray-700 mb-1.5 block"
                            >
                              {emailField?.label || 'Email'}
                              {emailField?.required && (
                                <span className="text-red-500 ml-1">*</span>
                              )}
                            </Label>
                            <Input
                              id={emailField?.name || 'email'}
                              type="email"
                              placeholder={`Enter your ${(emailField?.label || 'email').toLowerCase()}`}
                              defaultValue={(emailField as any)?.defaultValue || ''}
                              {...register(emailField?.name || 'email', {
                                required: emailField?.required,
                                pattern: /^\S[^\s@]*@\S+$/,
                              })}
                            />
                            {errors[emailField?.name || 'email'] && (
                              <p className="text-xs text-red-500 mt-1">
                                {errors[emailField?.name || 'email']?.type === 'pattern'
                                  ? 'Please enter a valid email'
                                  : 'This field is required'}
                              </p>
                            )}
                          </div>

                          {/* Row 3: Company + Company Website */}
                          <div className="grid grid-cols-2 gap-4 mb-5">
                            <div>
                              <Label
                                htmlFor={companyField?.name || 'company'}
                                className="text-sm font-medium text-gray-700 mb-1.5 block"
                              >
                                {companyField?.label || 'Company'}
                                {companyField?.required && (
                                  <span className="text-red-500 ml-1">*</span>
                                )}
                              </Label>
                              <Input
                                id={companyField?.name || 'company'}
                                type="text"
                                placeholder={`Enter your ${(companyField?.label || 'company').toLowerCase()}`}
                                defaultValue={(companyField as any)?.defaultValue || ''}
                                {...register(companyField?.name || 'company', {
                                  required: companyField?.required,
                                })}
                              />
                              {errors[companyField?.name || 'company'] && (
                                <p className="text-xs text-red-500 mt-1">This field is required</p>
                              )}
                            </div>
                            <div>
                              <Label
                                htmlFor={websiteField?.name || 'companyWebsite'}
                                className="text-sm font-medium text-gray-700 mb-1.5 block"
                              >
                                {websiteField?.label || 'Company Website'}
                                {websiteField?.required && (
                                  <span className="text-red-500 ml-1">*</span>
                                )}
                              </Label>
                              <Input
                                id={websiteField?.name || 'companyWebsite'}
                                type="url"
                                defaultValue={(websiteField as any)?.defaultValue || ''}
                                {...register(websiteField?.name || 'companyWebsite', {
                                  required: websiteField?.required,
                                })}
                              />
                              {errors[websiteField?.name || 'companyWebsite'] && (
                                <p className="text-xs text-red-500 mt-1">This field is required</p>
                              )}
                            </div>
                          </div>

                          {/* Row 4: Solution Interested (full width) — OPTIONS FROM CMS */}
                          <div className="mb-5">
                            <Label
                              htmlFor={solutionField?.name || 'solutionInterested'}
                              className="text-sm font-medium text-gray-700 mb-1.5 block"
                            >
                              {solutionField?.label || 'Solution Interested'}
                              {solutionField?.required && (
                                <span className="text-red-500 ml-1">*</span>
                              )}
                            </Label>
                            <Controller
                              control={control}
                              name={solutionField?.name || 'solutionInterested'}
                              rules={{ required: solutionField?.required }}
                              render={({ field: { onChange, value } }) => (
                                <Select onValueChange={onChange} value={value || undefined}>
                                  <SelectTrigger id={solutionField?.name || 'solutionInterested'}>
                                    <SelectValue
                                      placeholder={`Select ${(solutionField?.label || 'solution').toLowerCase()}`}
                                    />
                                  </SelectTrigger>
                                  <SelectContent className="z-[9999]">
                                    {solutionOptions.map(
                                      (opt: { label: string; value: string }) => (
                                        <SelectItem key={opt.value} value={opt.value}>
                                          {opt.label}
                                        </SelectItem>
                                      ),
                                    )}
                                  </SelectContent>
                                </Select>
                              )}
                            />
                            {errors[solutionField?.name || 'solutionInterested'] && (
                              <p className="text-xs text-red-500 mt-1">This field is required</p>
                            )}
                          </div>

                          {/* Row 5: Industry + Operating Categories — OPTIONS FROM CMS */}
                          <div className="grid grid-cols-2 gap-4 mb-5">
                            <div>
                              <Label
                                htmlFor={industryField?.name || 'industry'}
                                className="text-sm font-medium text-gray-700 mb-1.5 block"
                              >
                                {industryField?.label || 'Industry'}
                                {industryField?.required && (
                                  <span className="text-red-500 ml-1">*</span>
                                )}
                              </Label>
                              <Controller
                                control={control}
                                name={industryField?.name || 'industry'}
                                rules={{ required: industryField?.required }}
                                render={({ field: { onChange, value } }) => (
                                  <Select onValueChange={onChange} value={value || undefined}>
                                    <SelectTrigger id={industryField?.name || 'industry'}>
                                      <SelectValue
                                        placeholder={`Select ${(industryField?.label || 'industry').toLowerCase()}`}
                                      />
                                    </SelectTrigger>
                                    <SelectContent className="z-[9999]">
                                      {industryOptions.map(
                                        (opt: { label: string; value: string }) => (
                                          <SelectItem key={opt.value} value={opt.value}>
                                            {opt.label}
                                          </SelectItem>
                                        ),
                                      )}
                                    </SelectContent>
                                  </Select>
                                )}
                              />
                              {errors[industryField?.name || 'industry'] && (
                                <p className="text-xs text-red-500 mt-1">This field is required</p>
                              )}
                            </div>
                            <div>
                              <Label
                                htmlFor={categoriesField?.name || 'operatingCategories'}
                                className="text-sm font-medium text-gray-700 mb-1.5 block"
                              >
                                {categoriesField?.label || 'Operating Categories'}
                                {categoriesField?.required && (
                                  <span className="text-red-500 ml-1">*</span>
                                )}
                              </Label>
                              <Controller
                                control={control}
                                name={categoriesField?.name || 'operatingCategories'}
                                rules={{ required: categoriesField?.required }}
                                render={({ field: { onChange, value } }) => (
                                  <Select onValueChange={onChange} value={value || undefined}>
                                    <SelectTrigger
                                      id={categoriesField?.name || 'operatingCategories'}
                                    >
                                      <SelectValue
                                        placeholder={`Select ${(categoriesField?.label || 'categories').toLowerCase()}`}
                                      />
                                    </SelectTrigger>
                                    <SelectContent className="z-[9999]">
                                      {categoriesOptions.map(
                                        (opt: { label: string; value: string }) => (
                                          <SelectItem key={opt.value} value={opt.value}>
                                            {opt.label}
                                          </SelectItem>
                                        ),
                                      )}
                                    </SelectContent>
                                  </Select>
                                )}
                              />
                              {errors[categoriesField?.name || 'operatingCategories'] && (
                                <p className="text-xs text-red-500 mt-1">This field is required</p>
                              )}
                            </div>
                          </div>

                          {/* Row 6: Message (full width) */}
                          <div className="mb-6">
                            <Label
                              htmlFor={messageField?.name || 'message'}
                              className="text-sm font-medium text-gray-700 mb-1.5 block"
                            >
                              {messageField?.label || 'Message'}
                              {messageField?.required && (
                                <span className="text-red-500 ml-1">*</span>
                              )}
                            </Label>
                            <Textarea
                              id={messageField?.name || 'message'}
                              rows={(messageField as any)?.rows || 4}
                              placeholder="To better assist you, please describe how we can help..."
                              defaultValue={(messageField as any)?.defaultValue || ''}
                              {...register(messageField?.name || 'message', {
                                required: messageField?.required,
                              })}
                            />
                            {errors[messageField?.name || 'message'] && (
                              <p className="text-xs text-red-500 mt-1">This field is required</p>
                            )}
                          </div>

                          {/* Submit button */}
                          <Button
                            type="submit"
                            className="bg-[#2a2a2a] hover:bg-[#1a1a1a] text-white px-6 py-2.5 rounded-md font-medium"
                          >
                            Express Interest →
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