import { ReactElement } from 'react'

import { Divider } from '../../../src/ui'
import preview from '../../../.storybook/preview'

const meta = preview.meta({
  component: Divider,
  title: 'Common/Divider',
})

export const Base = meta.story({
  render: (): ReactElement => <Divider />,
})
