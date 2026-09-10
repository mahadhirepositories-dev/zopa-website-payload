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
            { label: 'Bot (Autonomy)', value: 'Bot' },
            { label: 'Shield Check (Integrity)', value: 'ShieldCheck' },
            { label: 'Shield (Trust)', value: 'Shield' },
            { label: 'PiggyBank (Frugal)', value: 'PiggyBank' },
            { label: 'HandCoins (Accountability)', value: 'HandCoins' },
          ],
        },
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
      ],
    },
  ],
}