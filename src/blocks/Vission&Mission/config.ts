import type {Block} from 'payload'

export const VisionMission: Block = {
  slug: 'visionMission',
  interfaceName: 'VisionMissionBlock',
  labels: { singular: 'Vision & Mission', plural: 'Vision & Mission Sections' },
  fields: [
    {
      name: 'vision',
      type: 'group',
      label: 'Vision Card',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
      ],
    },
    {
      name: 'mission',
      type: 'group',
      label: 'Mission Card',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
      ],
    },
    {
      name: 'values',
      type: 'array',
      label: 'Core Values',
      maxRows: 6,
      fields: [
        {
          name: 'icon',
          type: 'select',
          options: [
              { label: 'Robot (Autonomy)', value: 'Bot' },
              { label: 'User Shield (Integrity)', value: 'ShieldCheck' },
              { label: 'Shield Halved (Trust)', value: 'Shield' },
              { label: 'Piggy Bank (Frugal)', value: 'PiggyBank' },
              { label: 'Hand Holding Medical (Accountability)', value: 'HandCoins' },
            ],

        },
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
      ],
    },
  ],
}