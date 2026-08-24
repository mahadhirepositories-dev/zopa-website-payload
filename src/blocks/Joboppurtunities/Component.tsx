import React from 'react'
import type { JobOpportunitiesBlock } from '@/payload-types'
import { CMSLink } from '@/components/Link'

export const JobOpportunitiesBlockComponent: React.FC<JobOpportunitiesBlock> = ({
  badge,
  heading,
  description,
  jobs,
}) => {
  return (
    <section className="px-10 py-16 bg-white">
      <div className="container mx-auto max-w-7xl px-4">
        {badge && (
          <span className="inline-block px-3 py-1 bg-[#DCDCDC] text-[13px] border border-border rounded-xs text-black mb-8">
            {badge}
          </span>
        )}
        {heading && (
          <h2 className="text-[30px] md:text-4xl font-[400] font-sans text-gray-900 mb-6">
            {heading}
          </h2>
        )}
        {description && (
          <p className="text-sm md:text-[12px] text-gray-500 leading-relaxed max-w-4xl mb-10 whitespace-pre-line">
            {description}
          </p>
        )}

        {jobs && jobs.length > 0 && (
        
          <div className="overflow-x-auto rounded-[4px] border border-gray-200">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-[#DCDCDC] text-black">
                  <th className="px-6 py-4 text-sm font-semibold">Position</th>
                  <th className="px-6 py-4 text-sm font-semibold">City</th>
                  <th className="px-6 py-4 text-sm font-semibold">Location Type</th>
                  <th className="px-6 py-4" />
                </tr>
              </thead>
              <tbody>
                {jobs.map((job, i) => (
                  <tr
                    key={i}
                    className="border-t border-gray-200 hover:bg-[#DCDCDC] transition-colors"
                  >
                    <td className="px-4 py-6 text-base font-medium text-gray-900 whitespace-pre-line">
                      {job.position}
                    </td>
                    <td className="px-4 py-6 text-sm text-gray-700">{job.city}</td>
                    <td className="px-4 py-6 text-sm text-gray-700">{job.locationType}</td>
                    <td className="px-4 py-6 text-right">
                      {job.applyLink && (
                        <CMSLink
                          {...job.applyLink}
                          className="inline-block bg-[#dbac2b] hover:bg-gray-700 text-gray-800 text-sm  px-5 py-2.5 rounded-md transition-colors"
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  )
}