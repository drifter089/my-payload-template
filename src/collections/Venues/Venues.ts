import { CollectionConfig, Field } from 'payload'
import { textFields } from '@/fields/text'

const Venues: CollectionConfig = {
  slug: 'venues',
  // admin: {
  //   useAsTitle: 'name',
  // },
  fields: [
    // {
    //   name: 'name',
    //   type: 'text',
    //   required: true,
    //   label: 'name of the place',
    // },
    // {
    //   name: 'description',
    //   type: 'text',
    //   required: true,
    //   label: 'description of the place',
    // },
    ...([] as Field[]).concat(textFields),
  ],
}

export default Venues
