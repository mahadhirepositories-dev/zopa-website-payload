import React from 'react'
import { Phone, Mail, MapPin, Clock, Globe } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa6'
import type { ContactInfoBlock } from '@/payload-types'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Phone,
  FaWhatsapp,
  Mail,
  MapPin,
  Clock,
  Globe,
}

function getAutoLink(icon: string, value: string): string {
  switch (icon) {
    case 'Phone':
      return `tel:${value}`
    case 'FaWhatsapp':
      return `https://wa.me/${value.replace(/[^0-9]/g, '')}`
    case 'Mail':
      return `mailto:${value}`
    default:
      return value
  }
}

export const ContactInfoBlockComponent: React.FC<ContactInfoBlock> = (props) => {
  const { items } = props

  return (
    <section className="py-16 bg-white">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items?.map((item, index) => {
            const Icon = item.icon ? iconMap[item.icon as keyof typeof iconMap] : null
            const href = item.link || getAutoLink(item.icon || '', item.value)
            const isExternal = href.startsWith('https')

            return (
              <a
                key={index}
                href={href}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                className="flex items-center gap-4 p-6 rounded-lg border border-border bg-white shadow-sm hover:bg-[#dbac2b] transition-shadow"
              >
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                  {Icon && <Icon className="w-5 h-5 text-gray-600" />}
                </div>
                <div>
                  <p className="text-sm text-gray-500">{item.label}</p>
                  <p className="font-semibold text-gray-900">{item.value}</p>
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}