import React from 'react'

import type { RecentClientsBlock } from '@/payload-types'

import {Media} from '@/components/Media'

export const RecentClientsBlockComponent: React.FC<RecentClientsBlock> = (props) => {
  const { heading, clients } = props

  return (
    <section className="py-20 px-10 bg-white">
    <div className="container mx-auto">
        <div className="flex justify-center">
        <div className="border rounded-xs bg-[#dbac2b] w-23 h-6 flex items-center justify-center">
        <h2 className="text-center text-xs text-black">{heading}</h2>
        </div>
        </div>
      
      <div className="grid grid-cols-8 items-center gap-6 mt-10">
        {clients?.map((client) => (
          <div key={client.id} className="flex items-center justify-center">
            <Media
              resource={client.logo}
              imgClassName="max-h-16 w-auto"
            />
          </div>
        ))}
      </div>
    </div>
    </section>
  )
}
