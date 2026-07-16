import { ReactElement } from 'react'
import { faker } from '@faker-js/faker'

import { AuthenticationWrapper, Paragraph } from '../../../src/ui'
import { Background } from '../_helpers'
import preview from '../../../.storybook/preview'

const meta = preview.meta({
  component: AuthenticationWrapper,
  title: 'Authentication/AuthenticationWrapper',
})

export const Base = meta.story({
  render: (): ReactElement => (
    <Background>
      <AuthenticationWrapper>
        <Paragraph>{faker.lorem.sentences(10)}</Paragraph>
      </AuthenticationWrapper>
    </Background>
  ),
})
