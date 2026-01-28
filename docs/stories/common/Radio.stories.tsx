import React, { useState } from 'react'
import { faker } from '@faker-js/faker'

import { Radio } from '../../../src/ui'

const makeOptions = n =>
  Array.from(Array(n)).map((_, i) => ({
    id: i,
    label: faker.lorem.words(3),
    value: i,
  }))

const options = makeOptions(4)

export const Base = () => {
  const [value, setValue] = useState(null)
  const handleChange = val => setValue(val)

  return (
    <Radio
      name="radio"
      onChange={handleChange}
      options={options}
      value={value}
    />
  )
}

export const Vertical = () => {
  const [value, setValue] = useState(null)
  const handleChange = val => setValue(val)

  return (
    <Radio onChange={handleChange} options={options} value={value} vertical />
  )
}

export const ButtonStyle = () => {
  const [value, setValue] = useState(null)
  const handleChange = val => setValue(val)

  return (
    <Radio
      onChange={handleChange}
      options={options}
      optionType="button"
      value={value}
    />
  )
}

export const SolidButtonStyle = () => {
  const [value, setValue] = useState(null)
  const handleChange = val => setValue(val)

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
