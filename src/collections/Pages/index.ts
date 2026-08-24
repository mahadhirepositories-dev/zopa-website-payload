import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { Archive } from '../../blocks/ArchiveBlock/config'
import { CallToAction } from '../../blocks/CallToAction/config'
import { Content } from '../../blocks/Content/config'
import { FormBlock } from '../../blocks/Form/config'
import { MediaBlock } from '../../blocks/MediaBlock/config'
import { hero } from '@/heros/config'
import { slugField } from 'payload'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidateDelete, revalidatePage } from './hooks/revalidatePage'
import { Product } from '@/blocks/product/config'
import { PricingCards } from '@/blocks/PricingCards/config'
import { RecentClients } from '@/blocks/RecentClients/config'
import { BlogSection } from '@/blocks/BlogSection/config'
import { FullWidthBanner } from '@/blocks/FullWidthBanner/config'
import { AboutSection } from '@/blocks/AboutSection/config'
import { AboutUs } from '@/blocks/AboutUs/config'
import { VisionMission } from '@/blocks/Vission&Mission/config'
import { ProcurementSolutions } from '@/blocks/ProcurementSolutions/config'
import { ServicesSection } from '@/blocks/ServicesSection/config'
import { ServiceDetailSection } from '@/blocks/Services/config'
import { HowWeWork } from '@/blocks/Howwework/config'
import { InterestForm } from '@/blocks/Interestblock/config'
import { PricingComparison } from '@/blocks/Pricing/config'
import { WhoCanBenefit } from '@/blocks/Whocanbenefit/config'
import { OutcomeSection } from '@/blocks/Outcomesection/config'
import { WhoBenefitDetail } from '@/blocks/Whobenefit/config'
import { ContactInfo } from '@/blocks/Contactinfo/config'
import { ContactUs } from '@/blocks/Contactus/config'
import { ProductDetail } from '@/blocks/Productdetail/config'
import { LifeAtZopa } from '@/blocks/Lifeatzopa/config'
import { JobOpportunities } from '@/blocks/Joboppurtunities/config'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  // This config controls what's populated by default when a page is referenced
  // https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
  // Type safe if the collection slug generic is passed to `CollectionConfig` - `CollectionConfig<'pages'>
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'pages',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'pages',
        req,
      }),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [hero],
          label: 'Hero',
        },
        {
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [CallToAction, Content, MediaBlock, Archive, FormBlock,Product,PricingCards,RecentClients,
                BlogSection,FullWidthBanner,AboutSection,AboutUs,VisionMission,ProcurementSolutions,ServicesSection,ServiceDetailSection,
                HowWeWork,InterestForm,PricingComparison,WhoCanBenefit,OutcomeSection,WhoBenefitDetail,ContactInfo,ContactUs,ProductDetail,
              LifeAtZopa,JobOpportunities],
              required: true,
              admin: {
                initCollapsed: true,
              },
            },
          ],
          label: 'Content',
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),

            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    slugField(),
  ],
  hooks: {
    afterChange: [revalidatePage],
    beforeChange: [populatePublishedAt],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
