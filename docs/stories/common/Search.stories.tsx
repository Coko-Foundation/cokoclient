import { ReactNode, useState } from 'react'
import { faker } from '@faker-js/faker'

import { Search } from '../../../src/ui'

export const Base = (): ReactNode => {
  const [loading, setLoading] = useState(false)

  const handleChange = (): void => {
    setLoading(true)
    setTimeout(() => setLoading(false), 2000)
  }

  return (
    <Search
      loading={loading}
      onSearch={handleChange}
      placeholder={faker.lorem.words(4)}
    />
  )
}

export const Plain = (): ReactNode => <Search />
export const Loading = (): ReactNode => <Search loading />
