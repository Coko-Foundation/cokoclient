/* eslint-disable react-hooks/rules-of-hooks */

import { useState, ReactElement } from 'react'
import { faker } from '@faker-js/faker'

import { Radio } from '../../../src/ui'
import preview from '../../../.storybook/preview'

const meta = preview.meta({
  component: Radio,
  title: 'Common/Radio',
})

const makeOptions = (
  n: number,
): { id: string; label: string; value: number }[] =>
  Array.from(Array(n)).map((_, i) => ({
    id: `${i}`,
    label: faker.lorem.words(3),
    value: i,
  }))

const options = makeOptions(4)

export const Base = meta.story({
  render: (): ReactElement => {
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
  },
})

export const Vertical = meta.story({
  render: (): ReactElement => {
    const [value, setValue] = useState<string | null>(null)
    const handleChange = (val: string): void => setValue(val)

    return (
      <Radio onChange={handleChange} options={options} value={value} vertical />
    )
  },
})

export const ButtonStyle = meta.story({
  render: (): ReactElement => {
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
  },
})

export const SolidButtonStyle = meta.story({
  render: (): ReactElement => {
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
  },
})
