import type { CollectionConfig } from 'payload'

export const textFields: CollectionConfig['fields'] = [
  {
    name: 'textFieldClientComponent',
    type: 'text',
    admin: {
      components: {
        Field: '@/fields/text/components/client/Field#CustomTextFieldClient',
        Label: '@/fields/text/components/client/Label#CustomTextFieldLabelClient',
      },
    },
  },
]
