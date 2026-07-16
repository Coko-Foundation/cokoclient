import { ComponentProps, ReactElement } from 'react'
import { faker } from '@faker-js/faker'

import { AuthenticationForm } from '../../../src/ui'
import { noop } from '../../../src/toolkit/funcs'
import { Filler } from '../_helpers'
import preview from '../../../.storybook/preview'

const meta = preview.meta({
  component: AuthenticationForm,
  title: 'Authentication/AuthenticationForm',
})

const Template = (
  props: ComponentProps<typeof AuthenticationForm>,
): ReactElement => {
  return (
    <AuthenticationForm {...props}>
      <Filler />
    </AuthenticationForm>
  )
}

export const Base = meta.story({
  render: (): ReactElement => (
    <Template
      alternativeActionLabel="Do you want to do something else?"
      alternativeActionLink="/"
      errorMessage={faker.lorem.sentence()}
      hasError={false}
      onSubmit={noop}
    />
  ),
})

export const Loading = meta.story({
  render: (): ReactElement => (
    <Template
      alternativeActionLabel="Do you want to do something else?"
      alternativeActionLink="/"
      errorMessage={faker.lorem.sentence()}
      hasError={false}
      loading={true}
      onSubmit={noop}
    />
  ),
})
