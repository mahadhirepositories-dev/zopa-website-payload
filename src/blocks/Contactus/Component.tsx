'use client'

import React, { useCallback, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { Mail, MapPin, Phone } from 'lucide-react'
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

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Mail,
  Info: FaInfo,
  Linkedin: FaLinkedin,
  MapPin,
  Phone,
  FaWhatsapp,
  FaBriefcase,
  FaLinkedin,
  FaAddressBook,
}

function getAutoLink(icon: string, value: string): string {
  switch (icon) {
    case 'Phone':
      return `tel:${value}`
    case 'FaWhatsapp':
      return `https://wa.me/${value.replace(/[^0-9]/g, '')}`
    case 'Mail':
    case 'FaBriefcase':
    case 'Info':
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column */}
          <div className="flex flex-col gap-8">
            <div>
              {heading && (
                <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-2">
                  {heading}
                </h2>
              )}
              {subheading && (
                <p className="text-lg text-gray-600 mb-4">{subheading}</p>
              )}
              {description && (
                <p className="text-gray-500">{description}</p>
              )}
            </div>

            <div className="flex flex-col gap-4">
              {contactCards?.map((card, index) => {
                const Icon = card.icon ? iconMap[card.icon] || Mail : Mail
                const isLinkedin = card.icon === 'FaLinkedin'
                const href = isLinkedin
                  ? (card as any).linkedinUrl || '#'
                  : card.link || getAutoLink(card.icon || '', card.value)

                return (
                  <a
                    key={index}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-lg border border-border hover:shadow-md transition-shadow"
                  >
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-gray-600" />
                    </div>
                    <p className="text-sm text-gray-700 font-medium">{card.value}</p>
                  </a>
                )
              })}
            </div>
          </div>

          {/* Right Column — Form Card */}
          <div className="border border-border rounded-xl p-6 lg:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              {formLogo && typeof formLogo === 'object' && (
                <Media
                  resource={formLogo}
                  className="w-10 h-10"
                  imgClassName="w-10 h-10"
                />
              )}
              <h3 className="text-xl font-semibold text-gray-900">Contact Us</h3>
            </div>

            {formFromProps && (
              <FormProvider {...formMethods}>
                {isLoading && !hasSubmitted && (
                  <p className="text-gray-500">Loading, please wait...</p>
                )}
                {error && (
                  <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                    {error.status}: {error.message}
                  </div>
                )}
                {hasSubmitted ? (
                  <div className="py-8 text-center">
                    <p className="text-lg font-semibold text-green-600">
                      Thank you!
                    </p>
                    <p className="text-gray-500 mt-2">
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
                      className="mt-4 w-full"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Submitting...' : 'Submit'}
                    </Button>
                  </form>
                )}
              </FormProvider>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}