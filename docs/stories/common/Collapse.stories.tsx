import { ReactElement } from 'react'
import { faker } from '@faker-js/faker'
import { Collapse } from '../../../src/ui/common'
import preview from '../../../.storybook/preview'

const meta = preview.meta({
  component: Collapse,
  title: 'Common/Collapse',
})

const makeItems = (
  n: number,
): { key: string; label: string; children: string }[] =>
  Array.from(Array(n)).map((_, i) => ({
    key: String(i),
    label: faker.lorem.words(4),
    children: faker.lorem.sentences(6),
  }))

export const Base = meta.story({
  render: (): ReactElement => <Collapse items={makeItems(3)} />,
})

export const AccordionMode = meta.story({
  render: (): ReactElement => <Collapse accordion items={makeItems(3)} />,
})
