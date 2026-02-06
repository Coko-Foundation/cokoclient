import { ReactNode } from 'react'
import { faker } from '@faker-js/faker'

import { CheckboxGroup } from '../../../src/ui'

type Option = {
  value: number
  label: string
  disabled?: boolean
}

const makeOptions = (n: number): Option[] =>
  Array.from(Array(n)).map((_, i) => ({
    value: i,
    label: faker.lorem.words(3),
  }))

const options = makeOptions(4)

export const Base = (): ReactNode => <CheckboxGroup options={options} />

export const Vertical = (): ReactNode => (
  <CheckboxGroup options={options} vertical />
)

export const DisabledOptions = (): ReactNode => {
  const optionsWithDisabled = makeOptions(5)
  optionsWithDisabled[1].disabled = true
  optionsWithDisabled[2].disabled = true

  return <CheckboxGroup options={optionsWithDisabled} vertical />
}
