import React from 'react'
import { faker } from '@faker-js/faker'

import { CheckboxGroup } from '../../../src/ui'

const makeOptions = n =>
  Array.from(Array(n)).map((_, i) => ({
    value: i,
    label: faker.lorem.words(3),
  }))

const options = makeOptions(4)

export const Base = () => <CheckboxGroup options={options} />

export const Vertical = () => <CheckboxGroup options={options} vertical />

export const DisabledOptions = () => {
  const optionsWithDisabled = makeOptions(5)
  optionsWithDisabled[1].disabled = true
  optionsWithDisabled[2].disabled = true

  return <CheckboxGroup options={optionsWithDisabled} vertical />
}
