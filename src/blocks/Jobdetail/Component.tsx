import React from 'react'
import type { JobDetailBlock } from '@/payload-types'
 
const BulletList: React.FC<{ items?: { text?: string | null }[] }> = ({ items }) => {
  if (!items || items.length === 0) return null
  return (
    <ul className="list-disc pl-5 space-y-2">
      {items.map((item, i) => (
        <li key={i} className="text-[15px] font-[400] text-gray-900 whitespace-pre-line font-sans">{item.text}</li>
      ))}
    </ul>
  )
}
 
type ResponsibilityItem = {
  type?: ('point' | 'detailed') | null
  text?: string | null
  heading?: string | null
  paragraph?: string | null
}
 
// Renders points as bullets and detailed items as bold heading + paragraph,
// in the order they were added (so both kinds can be mixed freely).
const ResponsibilityList: React.FC<{ items?: ResponsibilityItem[] | null }> = ({ items }) => {
  if (!items || items.length === 0) return null
  return (
    <div className="space-y-4">
      {items.map((item, i) => {
        if (item.type === 'detailed') {
          return (
            <div key={i}>
              {item.heading ? (
                <p className="text-[15px] font-[600] text-gray-900 font-sans">{item.heading}</p>
              ) : null}
              {item.paragraph ? (
                <p className="text-[15px] font-[400] text-gray-900 whitespace-pre-line font-sans mt-1">
                  {item.paragraph}
                </p>
              ) : null}
            </div>
          )
        }
        return (
          <ul key={i} className="list-disc pl-5">
            <li className="text-[15px] font-[400] text-gray-900 whitespace-pre-line font-sans">{item.text}</li>
          </ul>
        )
      })}
    </div>
  )
}
 
export const JobDetailBlockComponent: React.FC<JobDetailBlock> = ({
  city,
  locationType,
  aboutRole,
  responsibilities,
  minimumRequirements,
  desiredRequirements,
}) => {
  const rows: { label: string; value?: React.ReactNode }[] = [
    { label: 'City', value: city },
    { label: 'Location Type', value: locationType },
    { label: 'About Role', value: aboutRole && <p className="text-[15px] text-gray-900 font-[400] whitespace-pre-line font-sans">{aboutRole}</p> },
    {
      label: 'Job Responsibilities',
      value: <ResponsibilityList items={responsibilities as ResponsibilityItem[] | null} />,
    },
    {
      label: 'Minimum Requirements',
      value: minimumRequirements && minimumRequirements.length > 0 && <BulletList items={minimumRequirements} />,
    },
    {
      label: 'Desired Requirement',
      value: desiredRequirements && desiredRequirements.length > 0 && <BulletList items={desiredRequirements} />,
    },
  ]
  const visible = rows.filter((r) => r.value)
 
  return (
    <section className="px-4 md:px-16 py-16 bg-white">
      <div className="container mx-auto max-w-7xl">
        {visible.length > 0 && (
          <div className="border-t border-gray-200">
            {visible.map((row, i) => (
              <div key={i} className="flex items-start justify-between gap-8 py-5 border-b border-gray-200">
                <div className="w-64 flex-shrink-0 text-[15px] font-[400] text-gray-900 whitespace-pre-line">
                  {row.label}
                </div>
                <div className="flex-1 text-[15px] font-[400] text-gray-900">{row.value}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
