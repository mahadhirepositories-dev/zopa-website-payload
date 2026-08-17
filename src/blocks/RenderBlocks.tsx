import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { Product_Block } from './product/Component'
import { PricingCardsBlockComponent } from './PricingCards/component'
import { RecentClientsBlockComponent } from './RecentClients/Component'
import {BlogSectionBlockComponent} from './BlogSection/Component'
import {FullWidthBannerBlockComponent} from './FullWidthBanner/Component'
import {AboutSectionBlockComponent} from './AboutSection/Component'
import {AboutUsBlockComponent} from './AboutUs/Component'
import {VisionMissionBlockComponent} from './Vission&Mission/Component'
import {ProcurementSolutionsBlockComponent} from './ProcurementSolutions/Component'
import {ServicesSectionBlockComponent} from './ServicesSection/Component'
import {ServiceDetailSectionBlockComponent} from './Services/Component'
import { HowWeWorkBlockComponent } from './Howwework/Component'
import { InterestFormBlockComponent } from './Interestblock/Component'
import { PricingComparisonBlockComponent } from './Pricing/Component'
import { WhoCanBenefitBlockComponent } from './Whocanbenefit/Component'
import { OutcomeSectionBlockComponent } from './Outcomesection/Component'
import { WhoBenefitDetailBlockComponent } from './Whobenefit/Component'
import { ContactInfoBlockComponent } from './Contactinfo/Component'

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  product:Product_Block,
  pricingCards:PricingCardsBlockComponent,
  recentClients:RecentClientsBlockComponent,
  blogSection:BlogSectionBlockComponent,
  fullWidthBanner:FullWidthBannerBlockComponent,
  aboutSection:AboutSectionBlockComponent,
  aboutUs:AboutUsBlockComponent,
  visionMission:VisionMissionBlockComponent,
  procurementSolutions:ProcurementSolutionsBlockComponent,
  servicesSection:ServicesSectionBlockComponent,
  serviceDetailSection:ServiceDetailSectionBlockComponent,
  howWeWork:HowWeWorkBlockComponent,
  interestForm: InterestFormBlockComponent,
  pricingComparison: PricingComparisonBlockComponent,
  whoCanBenefit: WhoCanBenefitBlockComponent,
  outcomeSection: OutcomeSectionBlockComponent,
  whoBenefitDetail: WhoBenefitDetailBlockComponent,
  contactInfo:ContactInfoBlockComponent,

}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div key={index}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
