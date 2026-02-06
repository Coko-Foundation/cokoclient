import { ReactNode, ComponentProps } from 'react'
import { faker } from '@faker-js/faker'

import { AuthenticationForm } from '../../../src/ui'
import { noop } from '../../../src/toolkit/funcs'
import { Filler } from '../_helpers'

const Template = (
  props: ComponentProps<typeof AuthenticationForm>,
): ReactNode => {
  return (
    <AuthenticationForm {...props}>
      <Filler />
    </AuthenticationForm>
  )
}

export const Base = (): ReactNode => (
  <Template
    alternativeActionLabel="Do you want to do something else?"
    alternativeActionLink="/"
    errorMessage={faker.lorem.sentence()}
    hasError={false}
    onSubmit={noop}
  />
)

export const Loading = (): ReactNode => (
  <Template
    alternativeActionLabel="Do you want to do something else?"
    alternativeActionLink="/"
    errorMessage={faker.lorem.sentence()}
    hasError={false}
    loading={true}
    onSubmit={noop}
  />
)
