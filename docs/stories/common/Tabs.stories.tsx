import { ReactNode } from 'react'
import { faker } from '@faker-js/faker'

import { Tabs } from '../../../src/ui'

const makeItems = (
  n: number,
): { key: string; label: string; children: string }[] =>
  Array.from(Array(n)).map((_, i) => ({
    key: String(i),
    label: faker.lorem.words(2),
    children: faker.lorem.sentences(6),
  }))

export const Base = (): ReactNode => <Tabs items={makeItems(3)} />

export const WithJSXContent = (): ReactNode => {
  const items = [
    { label: 'Tab 1', key: 'tab-1', children: 'Tab 1 content - simple text' },
    {
      label: 'Tab 2',
      key: 'tab-2',
      children: (
        <div>
          <p>Tab 2 content - jsx</p>
          <p>
            <button type="button">Button</button>
          </p>
        </div>
      ),
    },
  ]

  return <Tabs items={items} />
}
