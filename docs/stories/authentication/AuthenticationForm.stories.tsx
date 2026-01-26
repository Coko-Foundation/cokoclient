/* eslint-disable react/jsx-props-no-spreading */

import React from 'react'
import { faker } from '@faker-js/faker'

import { AuthenticationForm } from '../../../src/ui'
import { Filler } from '../_helpers'

const Template = args => {
  return (
    <AuthenticationForm {...args}>
      <Filler />
    </AuthenticationForm>
  )
}

export const Base = () => (
  <Template
    alternativeActionLabel="Do you want to do something else?"
    alternativeActionLink="/"
    onSubmit={() => {}}
    errorMessage={faker.lorem.sentence()}
    hasError={false}
  />
)

export const Loading = () => (
  <Template
    alternativeActionLabel="Do you want to do something else?"
    alternativeActionLink="/"
    onSubmit={() => {}}
    errorMessage={faker.lorem.sentence()}
    hasError={false}
    loading={true}
  />
)
