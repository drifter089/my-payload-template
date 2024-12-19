import type { Block } from 'payload'

export const Section: Block = {
  slug: 'section',
  interfaceName: 'PageSection',
  fields: [
    {
      name: 'subheading',
      type: 'textarea',
      required: true,
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    {
      name: 'backgroundColor',
      type: 'select',
      defaultValue: 'primary',
      options: [
        { label: 'Primary', value: 'primary' },
        { label: 'Secondary', value: 'secondary' },
      ],
      required: true,
    },
    {
      name: 'component',
      type: 'select',
      defaultValue: 'carousel',
      options: [
        { label: 'Carousel', value: 'carousel' },
        { label: 'Basic', value: 'basic' },
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
