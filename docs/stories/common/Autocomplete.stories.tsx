import React, { useState } from 'react'
import { faker } from '@faker-js/faker'

import { AutoComplete } from '../../../src/ui'

const makeOptions = n =>
  Array.from(Array(n)).map(() => ({
    value: faker.person.fullName(),
  }))

const originalOptions = makeOptions(100)

export const Base = () => {
  const [options, setOptions] = useState(originalOptions)

  const onSearch = (searchValue: string): void => {
    const regex = new RegExp(searchValue, 'i')

    const newOptions = originalOptions.filter(o => o.value.match(regex))

    setOptions(newOptions)
  }

  return (
    <AutoComplete
      onSearch={onSearch}
      options={options}
      placeholder={faker.lorem.words(4)}
    />
  )
}

export const WithDebounce = () => {
  const [options, setOptions] = useState(originalOptions)

  const onSearch = (searchValue: string): void => {
    const regex = new RegExp(searchValue, 'i')

    const newOptions = originalOptions.filter(o => o.value.match(regex))

    setOptions(newOptions)
  }

  return (
    <AutoComplete
      debounce
      debounceTimeout={1500}
      onSearch={onSearch}
      options={options}
      placeholder={faker.lorem.words(4)}
    />
  )
}
