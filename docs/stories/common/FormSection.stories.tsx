import { ReactElement } from 'react'
import { faker } from '@faker-js/faker'

import { FormSection } from '../../../src/ui'
import { Filler } from '../_helpers'
import preview from '../../../.storybook/preview'

const meta = preview.meta({
  component: FormSection,
  title: 'Common/FormSection',
})

export const Base = meta.story({
  render: (): ReactElement => (
    <FormSection label={faker.lorem.words(2)}>
      <Filler />
    </FormSection>
  ),
})
