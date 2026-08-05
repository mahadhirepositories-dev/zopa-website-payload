import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { ArrowRight } from 'lucide-react'
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa6'

const socialIcons: Record<string, React.ReactNode> = {
  linkedin: <FaLinkedinIn className="w-5 h-5" />,
  facebook: <FaFacebookF className="w-5 h-5" />,
  instagram: <FaInstagram className="w-5 h-5" />,
}

export async function Footer() {
  const footerData = await getCachedGlobal('footer', 1)()

  const {
    ctaHeading,
    ctaDescription,
    ctaButton,
    ctaLogo,
    contactAddress,
    contactPhone,
    contactEmail,
    copyright,
  } = footerData || {}

  const columns = footerData?.columns ?? []
  const socialLinks = footerData?.socialLinks ?? []

  return (
    <div className="px-4">
    <footer className="mt-auto bg-[#2a2a2a] text-white px-6 rounded-md">
      {/* CTA Section */}
      <div className="container py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          <div className="flex flex-col gap-6">
            {ctaHeading && (
              <h2 className="text-3xl md:text-4xl font-semibold leading-tight">
                {ctaHeading}
              </h2>
            )}
            {ctaButton && (
              <div>
                <CMSLink
                  {...ctaButton}
                  className="bg-[#dbac2b] text-black hover:bg-[#c99b22] px-6 py-3 rounded-lg inline-flex items-center gap-2"
                >
                  <ArrowRight className="w-4 h-4" />
                </CMSLink>
              </div>
            )}
          </div>

          <div>
            {ctaDescription && (
              <p className="text-gray-300 leading-relaxed">{ctaDescription}</p>
            )}
          </div>

          <div className="flex justify-end">
            {ctaLogo && typeof ctaLogo === 'object' && (
              <div className="w-32 h-32">
                <Media resource={ctaLogo} className="w-full h-full" imgClassName="object-contain" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="container">
        <hr className="border-gray-600" />
      </div>

      {/* Links Section */}
      <div className="container py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {columns.map((column, colIndex) => (
            <div key={colIndex}>
              {column.title && (
                <h3 className="text-lg font-semibold mb-4">{column.title}</h3>
              )}
              <ul className="space-y-3">
                {column.links?.map((item, linkIndex) => (
                  <li key={linkIndex}>
                    <CMSLink
                      {...item.link}
                      className="text-gray-300 hover:text-white transition-colors text-sm"
                    />
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-3 text-sm text-gray-300">
              {contactAddress && (
                <p className="whitespace-pre-line">{contactAddress}</p>
              )}
              {contactPhone && (
                <p>
                  <span className="text-[#dbac2b]">P: </span>
                  <a href={`tel:${contactPhone}`} className="hover:text-white transition-colors">
                    {contactPhone}
                  </a>
                </p>
              )}
              {contactEmail && (
                <p>
                  <span className="text-[#dbac2b]">E: </span>
                  <a href={`mailto:${contactEmail}`} className="hover:text-white transition-colors">
                    {contactEmail}
                  </a>
                </p>
              )}
            </div>

            {socialLinks.length > 0 && (
              <div className="flex gap-4 mt-4">
                {socialLinks.map((social, i) => {
                  const icon = socialIcons[social.platform.toLowerCase()]
                  return (
                    <a
                      key={i}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      {icon || <span className="text-sm">{social.platform}</span>}
                    </a>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="container py-6 border-t border-gray-600">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>{copyright}</p>
          <div className="flex items-center gap-6">
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms &amp; Conditions
            </Link>
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
    </div>
  )
}