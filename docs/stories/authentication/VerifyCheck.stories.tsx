import { ReactElement } from 'react'

import { VerifyCheck } from '../../../src/ui'
import { noop } from '../../../src/toolkit/funcs'
import preview from '../../../.storybook/preview'

const meta = preview.meta({
  component: VerifyCheck,
  title: 'Authentication/VerifyCheck',
})

export const Base = meta.story({
  render: (): ReactElement => <VerifyCheck resend={noop} />,
})

export const Resending = meta.story({
  render: (): ReactElement => <VerifyCheck resend={noop} resending />,
})

export const Resent = meta.story({
  render: (): ReactElement => <VerifyCheck resend={noop} resent />,
})
