import { ReactElement } from 'react'
import { faker } from '@faker-js/faker'

import { TextArea } from '../../../src/ui'
import preview from '../../../.storybook/preview'

const meta = preview.meta({
  component: TextArea,
  title: 'Common/TextArea',
})

export const Base = meta.story({
  render: (): ReactElement => (
    <TextArea placeholder={faker.lorem.words(4)} rows={3} />
  ),
})

export const AutoSize = meta.story({
  render: (): ReactElement => (
    <TextArea autoSize placeholder={faker.lorem.words(4)} />
  ),
})
