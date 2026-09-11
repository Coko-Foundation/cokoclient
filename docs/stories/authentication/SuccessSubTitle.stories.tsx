import { ReactElement } from 'react'
import { faker } from '@faker-js/faker'

import { SuccessSubTitle } from '../../../src/ui'
import preview from '../../../.storybook/preview'

const meta = preview.meta({
  component: SuccessSubTitle,
  title: 'Authentication/SuccessSubTitle',
})

export const Base = meta.story({
  render: (): ReactElement => (
    <SuccessSubTitle userEmail={faker.internet.email()} />
  ),
})
