import { ReactNode, useState } from 'react'
import { faker } from '@faker-js/faker'

import { Radio } from '../../../src/ui'

const makeOptions = (
  n: number,
): { id: string; label: string; value: number }[] =>
  Array.from(Array(n)).map((_, i) => ({
    id: `${i}`,
    label: faker.lorem.words(3),
    value: i,
  }))

const options = makeOptions(4)

export const Base = (): ReactNode => {
  const [value, setValue] = useState<string | null>(null)
  const handleChange = (val: string): void => setValue(val)

  return (
    <Radio
      name="radio"
      onChange={handleChange}
      options={options}
      value={value}
    />
  )
}

export const Vertical = (): ReactNode => {
  const [value, setValue] = useState<string | null>(null)
  const handleChange = (val: string): void => setValue(val)

  return (
    <Radio onChange={handleChange} options={options} value={value} vertical />
  )
}

export const ButtonStyle = (): ReactNode => {
  const [value, setValue] = useState<string | null>(null)
  const handleChange = (val: string): void => setValue(val)

  return (
    <Radio
      onChange={handleChange}
      options={options}
      optionType="button"
      value={value}
    />
  )
}

export const SolidButtonStyle = (): ReactNode => {
  const [value, setValue] = useState<string | null>(null)
  const handleChange = (val: string): void => setValue(val)

  return (
    <Radio
      buttonStyle="solid"
      onChange={handleChange}
      options={options}
      optionType="button"
      value={value}
    />
  )
}
