/* eslint-disable react-hooks/rules-of-hooks */

import { useState, ReactElement } from 'react'
import { faker } from '@faker-js/faker'

import { Select } from '../../../src/ui'
import preview from '../../../.storybook/preview'

const meta = preview.meta({
  component: Select,
  title: 'Common/Select',
})

type Option = {
  label: string
  value: string
}

const makeOptions = (n: number): Option[] =>
  Array.from(Array(n)).map(() => ({
    label: faker.person.fullName(),
    value: faker.string.uuid(),
  }))

const makeLongOptions = (n: number): Option[] =>
  Array.from(Array(n)).map(() => ({
    label: faker.lorem.sentences(5),
    value: faker.string.uuid(),
  }))

const options = makeOptions(10)

const groupedOptions = [
  {
    label: 'Winners',
    options: makeOptions(4),
  },
  {
    label: 'Losers',
    options: makeOptions(4),
  },
]

const longOptions = makeLongOptions(10)

export const Base = meta.story({
  render: (): ReactElement => (
    <Select options={options} placeholder={faker.lorem.words(4)} />
  ),
})

export const WithGroups = meta.story({
  render: (): ReactElement => (
    <Select options={groupedOptions} placeholder={faker.lorem.words(4)} />
  ),
})

export const Multi = meta.story({
  render: (): ReactElement => (
    <Select
      mode="multiple"
      options={options}
      placeholder={faker.lorem.words(4)}
    />
  ),
})

export const Async = meta.story({
  render: (): ReactElement => {
    const [loading, setLoading] = useState(false)
    const [optionsData, setOptionsData] = useState<Option[]>([])

    const handleSearch = (): void => {
      setLoading(true)

      setTimeout(() => {
        setOptionsData(makeOptions(5))
        setLoading(false)
      }, 500)
    }

    return (
      <Select
        async
        loading={loading}
        mode="multiple"
        onSearch={handleSearch}
        options={optionsData}
        placeholder={faker.lorem.words(4)}
        // showSearch
      />
    )
  },
})

export const WrapOptionText = meta.story({
  render: (): ReactElement => (
    <Select
      options={longOptions}
      placeholder="Very long text options, sentence will be wrapped and option element will increase in height"
      wrapOptionText
    />
  ),
})
