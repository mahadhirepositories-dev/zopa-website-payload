import React from 'react'
 
import type { VisionMissionBlock } from '@/payload-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faRobot,
  faUserShield,
  faShieldHalved,
  faPiggyBank,
  faHandHoldingMedical,
  faWandMagicSparkles,
} from '@fortawesome/free-solid-svg-icons'
 
// Keys MUST stay the same — they match the select field values stored in the DB.
const iconMap = {
  Bot: faRobot,            // Autonomy
  ShieldCheck: faUserShield, // Integrity
  Shield: faShieldHalved,    // Trust
  PiggyBank: faPiggyBank,    // Frugal
  HandCoins: faHandHoldingMedical, // Accountability
}
 
export const VisionMissionBlockComponent: React.FC<VisionMissionBlock> = ({
  vision,
  mission,
  values,
}) => {
  return (
    <section className="py-16 px-15 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-2">
          {[vision, mission].map((item, i) => (
            <div key={i} className="p-8">
              <h3 className="text-[40px] font-[340] text-black mb-2 font-sans">{item?.title}</h3>
              <p className="text-sm text-gray-800 leading-relaxed">{item?.description}</p>
            </div>
          ))}
        </div>
 
        {values && values.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 px-6">
            {values.map((value, i) => {
              const icon = value.icon
                ? iconMap[value.icon as keyof typeof iconMap]
                : faWandMagicSparkles
              return (
                <div
                  key={i}
                  className="group border border-border rounded-lg p-6 text-center bg-white hover:bg-[#dbac2b] transition-colors"
                >
                  <div className="mb-4 flex h-15 w-15 items-center justify-start">
                    <FontAwesomeIcon
                      icon={icon}
                      className="h-14 w-14 text-[#dbac2b] group-hover:text-black"
                    />
                  </div>
 
                  <h4 className="text-[25px] font-[380] text-black text-left font-sans mt-3">
                    {value.title}
                  </h4>
                  <p className="mt-2 text-sm text-gray-800 leading-relaxed text-left mt-5 mb-4">
                    {value.description}
                  </p>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}