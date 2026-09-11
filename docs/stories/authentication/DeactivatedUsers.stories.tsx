import { ReactElement } from 'react'
import { DeactivatedUser } from '../../../src/ui'
import preview from '../../../.storybook/preview'

const meta = preview.meta({
  component: DeactivatedUser,
  title: 'Authentication/DeactivatedUsers',
})

export const Base = meta.story({
  render: (): ReactElement => {
    return <DeactivatedUser />
  },
})
