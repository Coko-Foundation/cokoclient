import { faker } from '@faker-js/faker'

import { Tabs } from '../../../src/ui'

export const Base = () => (
  <Tabs>
    {Array.from(Array(3)).map((_, i) => (
      <Tabs.TabPane key={i} tab={faker.lorem.words(2)}>
        {faker.lorem.sentences(6)}
      </Tabs.TabPane>
    ))}
  </Tabs>
)

export const NewSyntax = () => {
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
