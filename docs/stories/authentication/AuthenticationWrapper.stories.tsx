import { ReactNode } from 'react'
import { faker } from '@faker-js/faker'

import { AuthenticationWrapper, Paragraph } from '../../../src/ui'
import { Background } from '../_helpers'

export const Base = (): ReactNode => (
  <Background>
    <AuthenticationWrapper>
      <Paragraph>{faker.lorem.sentences(10)}</Paragraph>
    </AuthenticationWrapper>
  </Background>
)
