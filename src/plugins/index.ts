import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { searchPlugin } from '@payloadcms/plugin-search'
import { Plugin } from 'payload'
import { revalidateRedirects } from '@/hooks/revalidateRedirects'
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import { FixedToolbarFeature, HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { searchFields } from '@/search/fieldOverrides'
import { beforeSyncWithSearch } from '@/search/beforeSync'
import { ecommercePlugin } from '@payloadcms/plugin-ecommerce'
import type { PaymentAdapter } from '@payloadcms/plugin-ecommerce/types'
import { isAdmin } from '@/access/isAdmin'
import { adminOrPublishedStatus } from '@/access/AdminorPublishedStatus'
import { isCustomer } from '@/access/isCustomer'
import { isDocumentOwner } from '@/access/isDocumentOwner'
import { adminOnlyFieldAccess } from '@/access/adminOnlyFieldAccess'
import { authenticated } from '@/access/authenticated'
import { anyone } from '@/access/anyone'
import { CallToAction } from '@/blocks/CallToAction/config'
import { Content } from '@/blocks/Content/config'
import { MediaBlock } from '@/blocks/MediaBlock/config'
import { Archive } from '@/blocks/ArchiveBlock/config'
import { FormBlock } from '@/blocks/Form/config'
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

import { Page, Post } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'
import { ProductDetail } from '@/blocks/Productdetail/config'

const razorpayAdapter: PaymentAdapter = {
  name: 'razorpay',
  label: 'Razorpay',
  initiatePayment: async () => {
    throw new Error('Razorpay initiation is handled by POST /api/create-order')
  },
  confirmOrder: async () => {
    throw new Error('Razorpay confirmation is handled by POST /api/verify-payment')
  },
  group: {
    name: 'razorpay',
    type: 'group',
    admin: {
      condition: (data: any) => data?.paymentMethod === 'razorpay',
    },
    fields: [
      {
        name: 'razorpayOrderID',
        type: 'text',
        label: 'Razorpay Order ID',
      },
      {
        name: 'razorpayPaymentID',
        type: 'text',
        label: 'Razorpay Payment ID',
      },
    ],
  },
}

const generateTitle: GenerateTitle<Post | Page> = ({ doc }) => {
  return doc?.title ? `${doc.title} | Payload Website Template` : 'Payload Website Template'
}

const generateURL: GenerateURL<Post | Page> = ({ doc }) => {
  const url = getServerSideURL()

  return doc?.slug ? `${url}/${doc.slug}` : url
}

export const plugins: Plugin[] = [
  redirectsPlugin({
    collections: ['pages', 'posts'],
    overrides: {
      // @ts-expect-error - This is a valid override, mapped fields don't resolve to the same type
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'from') {
            return {
              ...field,
              admin: {
                description: 'You will need to rebuild the website when changing this field.',
              },
            }
          }
          return field
        })
      },
      hooks: {
        afterChange: [revalidateRedirects],
      },
    },
  }),
  nestedDocsPlugin({
    collections: ['categories'],
    generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
  }),
  seoPlugin({
    generateTitle,
    generateURL,
  }),
  formBuilderPlugin({
    fields: {
      payment: false,
    },
    formOverrides: {
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'confirmationMessage') {
            return {
              ...field,
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    FixedToolbarFeature(),
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                  ]
                },
              }),
            }
          }
          return field
        })
      },
    },
  }),
  searchPlugin({
    collections: ['posts'],
    beforeSync: beforeSyncWithSearch,
    searchOverrides: {
      fields: ({ defaultFields }) => {
        return [...defaultFields, ...searchFields]
      },
    },
  }),
  ecommercePlugin({
  access: {
    adminOnlyFieldAccess,
    adminOrPublishedStatus,
    isAdmin,
    isAuthenticated: authenticated,
    isCustomer,
    isDocumentOwner,
    publicAccess: anyone,
  },
  customers: { slug: 'users' },
  products: {
  productsCollectionOverride: ({ defaultCollection }) => ({
    ...defaultCollection,
    admin: {
      ...defaultCollection.admin,
      useAsTitle: 'title',
    },
    fields: [
      ...defaultCollection.fields,
      {
        name: 'title',
        type: 'text',
        required: true,
      },
      {
        name: 'slug',
        type: 'text',
        required: true,
        unique: true,
      },
      {
        name: 'description',
        type: 'textarea',
      },
      {
       name: 'reviewDescription',
       type: 'textarea',
       label: 'Review Description',
       admin: {
          description: 'Description shown in the Reviews tab on the product page',
        },
      },
      {
        name: 'image',
        type: 'upload',
        relationTo: 'media',
      },
      {
        name: 'images',
        type: 'array',
        fields: [
          {
            name: 'image',
            type: 'upload',
            relationTo: 'media',
          },
        ],
      },
      {
        name: 'categories',
        type: 'relationship',
        relationTo: 'categories',
        hasMany: true,
      },
      {
        name: 'subtitle',
        type: 'text',
        admin: {
          description: 'Subtitle shown below the product title (e.g., "Get Listed on Zopa Vendor Page")',
        },
      },
      {
        name: 'whyRegister',
        type: 'array',
        label: 'Why Register?',
        maxRows: 10,
        fields: [
          {
            name: 'text',
            type: 'text',
            required: true,
          },
        ],
      },
      {
        name: 'howItWorks',
        type: 'array',
        label: 'How it Works',
        maxRows: 10,
        fields: [
          {
            name: 'text',
            type: 'text',
            required: true,
          },
        ],
      },
      {
        name: 'afterApproval',
        type: 'array',
        label: 'After Approval',
        maxRows: 10,
        fields: [
          {
            name: 'text',
            type: 'text',
            required: true,
          },
        ],
      },
      {
  type: 'tabs',
  tabs: [
    {
      label: 'Content',
      fields: [
        {
          name: 'layout',
          type: 'blocks',
          blocks: [
            Content,
  CallToAction,
  MediaBlock,
  FormBlock,
  {
    ...ContactUs,
    dbName: 'ctau',
  },
  {
    ...ContactInfo,
    dbName: 'ctai',
  },
  {
    ...PricingCards,
    dbName: 'pc',
  },
  AboutSection,
  ProductDetail,
          ],
          admin: {
            initCollapsed: true,
          },
        },
      ],
    },
  ],
},
    ],
  }),
  
},
  payments: {
    paymentMethods: [
      razorpayAdapter,
    ],
  },
  currencies: {
  defaultCurrency: 'INR',
  supportedCurrencies: [
    { code: 'INR', decimals: 2, label: 'Indian Rupee', symbol: '₹' },
  ],
},
}),
]
