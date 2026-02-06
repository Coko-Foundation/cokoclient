import { ReactNode } from 'react'
import { faker } from '@faker-js/faker'

import { FormSection } from '../../../src/ui'
import { Filler } from '../_helpers'

export const Base = (): ReactNode => (
  <FormSection label={faker.lorem.words(2)}>
    <Filler />
  </FormSection>
)
