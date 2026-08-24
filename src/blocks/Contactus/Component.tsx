'use client'

import React, { useCallback, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import {
  FaWhatsapp,
  FaBriefcase,
  FaInfo,
  FaLinkedin,
  FaAddressBook,
} from 'react-icons/fa6'
import type { ContactUsBlock } from '@/payload-types'
import { Media } from '@/components/Media'
import { FormFields } from '@/blocks/Form/FormFields'
import { Button } from '@/components/ui/button'
import { getClientSideURL } from '@/utilities/getURL'
import { FiMail } from 'react-icons/fi'
import { FiPhone } from 'react-icons/fi'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FaBriefcase,
  FaInfo,
  FaLinkedin,
  FaAddressBook,
  FiMail,
  FiPhone
}

function getAutoLink(icon: string, value: string): string {
  switch (icon) {
    case 'Phone':
      return `tel:${value}`
    case 'FaWhatsapp':
      return `https://wa.me/${value.replace(/[^0-9]/g, '')}`
    case 'FaBriefcase':
    case 'FaInfo':
      return `mailto:${value}`
    default:
      return value
  }
}

export const ContactUsBlockComponent: React.FC<ContactUsBlock> = (props) => {
  const { heading, subheading, description, contactCards, form: formDoc, formLogo } = props

  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [error, setError] = useState<{ message: string; status?: string } | undefined>()

  const formFromProps = formDoc && typeof formDoc === 'object' ? formDoc : null
  const submitButtonLabel = formFromProps?.submitButtonLabel || 'Submit'

  const defaultValues =
    formFromProps?.fields
      ? (formFromProps.fields as any[]).reduce((acc, field) => {
          acc[field.name] = (field as any).defaultValue || ''
          return acc
        }, {} as Record<string, string>)
      : {}

  const formMethods = useForm({ defaultValues })
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = formMethods

  const onSubmit = useCallback(
    (data: Record<string, any>) => {
      let loadingTimerID: ReturnType<typeof setTimeout>
      const submitForm = async () => {
        setError(undefined)
        const dataToSend = Object.entries(data).map(([name, value]) => ({
          field: name,
          value,
        }))
        loadingTimerID = setTimeout(() => setIsLoading(true), 1000)
        try {
          const req = await fetch(`${getClientSideURL()}/api/form-submissions`, {
            body: JSON.stringify({
              form: formFromProps?.id,
              submissionData: dataToSend,
            }),
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
          })
          const res = await req.json()
          clearTimeout(loadingTimerID)
          if (req.status >= 400) {
            setIsLoading(false)
            setError({
              message: res.errors?.[0]?.message || 'Internal Server Error',
              status: String(res.status),
            })
            return
          }
          setIsLoading(false)
          setHasSubmitted(true)
        } catch (err) {
          clearTimeout(loadingTimerID)
          setIsLoading(false)
          setError({ message: 'Something went wrong.' })
        }
      }
      void submitForm()
    },
    [formFromProps?.id],
  )

  return (
    <section className="py-16 bg-white">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column */}
          <div className="flex flex-col gap-8">
            <div>
              {heading && (
  <span className="inline-block self-start px-3 py-1 bg-[#DCDCDC] text-[13px] border border-border rounded-[4px] text-black mb-2">
    {heading}
  </span>
)}
              {subheading && (
                <p className="text-[50px] text-gray-800 mb-4 font-sans">{subheading}</p>
              )}
              {description && (
                <p className="text-gray-500 text-[14px]">{description}</p>
              )}
            </div>

            <div className="flex flex-col gap-0 overflow-hidden">
              {contactCards?.map((card, index) => {
                const Icon = card.icon ? iconMap[card.icon] || FaBriefcase : FaBriefcase
                const isLinkedin = card.icon === 'FaLinkedin'
                const href = isLinkedin
                  ? (card as any).linkedinUrl || '#'
                  : card.value
                    ? getAutoLink(card.icon || '', card.value)
                    : '#'

                const cardContent = (
                    <div
                    className={`flex items-start gap-4 p-5 rounded-md border border-gray-200 ${
                    index === 1 || index === 3 ? 'bg-[#DCDCDC]' : 'bg-white'
                       } hover:bg-[#dbac2b] transition-colors`}
                    >
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shrink-0 border border-gray-200">
                      <Icon className="w-5 h-5 text-gray-700" />
                    </div>
                    <div className="flex flex-col gap-1 min-w-0">
                      <span className="text-sm font-semibold text-gray-900 font-sans">
                        {card.label}
                      </span>
                      <span className="text-sm text-gray-600 whitespace-pre-line break-words font-sans">
                        {card.value}
                      </span>
                    </div>
                  </div>
                )

                if (isLinkedin && (card as any).linkedinUrl) {
                  return (
                    <a
                      key={index}
                      href={(card as any).linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      {cardContent}
                    </a>
                  )
                }

                return <div key={index}>{cardContent}</div>
              })}
            </div>
          </div>

          {/* Right Column — Form Card */}
          <div className="bg-white rounded-[4px] shadow-lg overflow-hidden w-full h-fit self-start">
          {/* Header — same style as InterestForm */}
              <div className="bg-[#2a2a2a] px-8 py-2 flex items-center gap-4">
                {formLogo && typeof formLogo === 'object' && (
                  <div className="w-25 h-25 flex-shrink-0 overflow-hidden rounded-sm">
                     <Media
                      resource={formLogo}
                      className="w-full h-full"
                      imgClassName="object-contain w-full h-full"
                     />
                  </div>
                )}
                <div className="w-px h-8 bg-gray-500" />
                 <h3 className="text-white text-[20px] font-[400] font-sans">
                    {props.formHeading || 'Contact Us'}
                 </h3>
                </div>

  {/* Form body */}
  <div className="p-8 space-y-4">
    {formFromProps && (
      <FormProvider {...formMethods}>
        {isLoading && !hasSubmitted && (
          <p className="text-sm text-gray-500">Submitting, please wait...</p>
        )}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">
              {error.status}: {error.message}
            </p>
          </div>
        )}
        {hasSubmitted ? (
          <div className="text-center py-8">
            <p className="text-lg font-semibold text-green-600 mb-2">Thank you!</p>
            <p className="text-sm text-gray-500">
              Your message has been sent successfully.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormFields
              form={formFromProps}
              control={control}
              errors={errors}
              register={register}
            />
            <Button
             type="submit"
             className="mt-4 bg-[#dbac2b] hover:bg-[#000] text-black hover:text-white"
             disabled={isLoading}
            >
               {isLoading ? 'Submitting...' : submitButtonLabel}
             </Button>
          </form>
        )}
      </FormProvider>
    )}
  </div>
</div>
        </div>
      </div>
    </section>
  )
}