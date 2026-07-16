/* eslint-disable react-hooks/rules-of-hooks */

import { useState, ReactElement } from 'react'
import { faker } from '@faker-js/faker'

import { Search } from '../../../src/ui'
import preview from '../../../.storybook/preview'

const meta = preview.meta({
  component: Search,
  title: 'Common/Search',
})

export const Base = meta.story({
  render: (): ReactElement => {
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
  },
})

export const Plain = meta.story({
  render: (): ReactElement => <Search />,
})
export const Loading = meta.story({
  render: (): ReactElement => <Search loading />,
})
