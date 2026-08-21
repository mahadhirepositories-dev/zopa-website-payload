import type {Block} from 'payload'

export const ProductDetail: Block = {
  slug: 'productDetail',
  interfaceName: 'ProductDetailBlock',
  labels: { singular: 'Product Detail', plural: 'Product Details' },
  fields: [
    {
      name: 'showBreadcrumb',
      type: 'checkbox',
      label: 'Show Breadcrumb',
      defaultValue: true,
    },
    {
      name: 'showGallery',
      type: 'checkbox',
      label: 'Show Image Gallery',
      defaultValue: true,
    },
    {
      name: 'headingOverride',
      type: 'text',
      label: 'Heading Override (optional)',
    },
    {
     name: 'subtitleOverride',
     type: 'textarea',
     label: 'Subtitle Override (optional)',
    },
  ],
}