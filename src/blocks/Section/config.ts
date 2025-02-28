import type { Block } from 'payload'

export const Section: Block = {
  slug: 'section',
  interfaceName: 'PageSection',
  fields: [
    {
      name: 'component',
      type: 'select',
      defaultValue: 'carousel',
      options: [
        { label: 'Carousel', value: 'carousel' },
        { label: 'Flex', value: 'basic' },
        { label: 'Grid', value: 'grid' },
      ],
      required: true,
    },
    {
      name: 'cards',
      type: 'select',
      defaultValue: 'horizontalcards',
      options: [
        { label: 'Horizontal Card', value: 'horizontalcards' },
        { label: 'Vertical Card', value: 'verticalcard' },
        {
          label: 'Projects',
          value: 'upcomingevents',
        },
        {
          label: 'Outputs',
          value: 'pastevents',
        },
        {
          label: 'Platforms',
          value: 'platforms',
        },
      ],
      required: true,
    },
    {
      name: 'limit',
      type: 'number',
      defaultValue: 3,
      required: true,
    },
  ],
}
