import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name:'logo',
      type:'upload',
      relationTo:'media',
      
    } 
    ,
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
        {
          name: 'children',
          type: 'array',
          label: 'Dropdown Links',
          admin: {
            description:
              'Add links here to show a dropdown when hovering or clicking this menu item.',
          },
          fields: [
            link({
              appearances: false,
            }),
          ],
        },
      ],
      maxRows: 10,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
    },
    {
      name:'phone',
      type:'text',
      admin:{description:"Phone number",

      },
    },
    link({
      appearances:false,
      disableLabel:false,
      overrides:{
        name:'ctalink',
        admin:{
          description:'Go to Optimize procurement page',
          
        }
      }

    })
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
