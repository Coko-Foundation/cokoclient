import { ReactElement } from 'react'
import { faker } from '@faker-js/faker'

import { AuthenticationHeader } from '../../../src/ui'
import preview from '../../../.storybook/preview'

const meta = preview.meta({
  component: AuthenticationHeader,
  title: 'Authentication/AuthenticationHeader',
})

export const Base = meta.story({
  render: (): ReactElement => (
    <AuthenticationHeader>{faker.lorem.words(3)}</AuthenticationHeader>
  ),
})
