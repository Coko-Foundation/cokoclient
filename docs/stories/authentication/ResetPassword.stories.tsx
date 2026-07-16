import { ComponentProps, ReactElement } from 'react'

import { ResetPassword } from '../../../src/ui'
import { noop } from '../../../src/toolkit/funcs'
import { Background } from '../_helpers'
import preview from '../../../.storybook/preview'

const meta = preview.meta({
  component: ResetPassword,
  title: 'Authentication/ResetPassword',
})

const Template = (
  props: ComponentProps<typeof ResetPassword>,
): ReactElement => (
  <Background>
    <ResetPassword {...props} />
  </Background>
)

export const Base = meta.story({
  render: (): ReactElement => (
    <Template onSubmit={noop} redirectToLogin={noop} />
  ),
})
