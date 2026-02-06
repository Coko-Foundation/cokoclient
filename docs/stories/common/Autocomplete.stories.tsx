import { ReactNode, useState } from 'react'
import { faker } from '@faker-js/faker'

import { AutoComplete } from '../../../src/ui'

const makeOptions = (n: number): { value: string }[] =>
  Array.from(Array(n)).map(() => ({
    value: faker.person.fullName(),
  }))

const originalOptions = makeOptions(100)

export const Base = (): ReactNode => {
  const [options, setOptions] = useState(originalOptions)

  const onSearch = (searchValue: string): void => {
    const regex = new RegExp(searchValue, 'i')

    const newOptions = originalOptions.filter(o => o.value.match(regex))

    setOptions(newOptions)
  }

  return (
    <AutoComplete
      options={options}
      placeholder={faker.lorem.words(4)}
      showSearch={{ onSearch }}
    />
  )
}

export const WithDebounce = (): ReactNode => {
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
      options={options}
      placeholder={faker.lorem.words(4)}
      showSearch={{ onSearch }}
    />
  )
}
