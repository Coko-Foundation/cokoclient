import { ReactNode, ComponentProps } from 'react'

import { ResetPassword } from '../../../src/ui'
import { noop } from '../../../src/toolkit/funcs'
import { Background } from '../_helpers'

const Template = (props: ComponentProps<typeof ResetPassword>): ReactNode => (
  <Background>
    <ResetPassword {...props} />
  </Background>
)

export const Base = (): ReactNode => (
  <Template onSubmit={noop} redirectToLogin={noop} />
)
