import type { GlobalConfig } from 'payload'

import { Hero } from '@/blocks/Hero/config'
import { Section } from '@/blocks/Section/config'
import { Social } from '@/blocks/Socials/config'

const LandingPage: GlobalConfig = {
  slug: 'home',
  label: 'Home Page',
  fields: [
    {
      name: 'image',
      label: 'Logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'layout',
      type: 'blocks',
      blocks: [Hero, Section, Social],
    },
  ],
}

export default LandingPage
