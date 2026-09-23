import React from 'react'
import RichText from '@/components/RichText'

import type { TermsAndConditionsBlock as TermsAndConditionsBlockProps } from '@/payload-types'

export const TermsAndConditionsBlock: React.FC<TermsAndConditionsBlockProps> = (props) => {
  const { content } = props

  return (
    <section className="px-20">
  <div className="container py-10">
    {content ? (
      <RichText data={content} enableGutter={false} />
    ) : null}
  </div>
</section>
  )
}