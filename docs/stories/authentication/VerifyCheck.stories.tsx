import { ReactNode } from 'react'

import { VerifyCheck } from '../../../src/ui'
import { noop } from '../../../src/toolkit/funcs'

export const Base = (): ReactNode => <VerifyCheck resend={noop} />

export const Resending = (): ReactNode => (
  <VerifyCheck resend={noop} resending />
)

export const Resent = (): ReactNode => <VerifyCheck resend={noop} resent />
