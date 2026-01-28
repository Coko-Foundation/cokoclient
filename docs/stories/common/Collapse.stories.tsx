import { faker } from '@faker-js/faker'
import { Collapse } from '../../../src/ui/common'

const makeItems = (n: number) =>
  Array.from(Array(n)).map((_, i) => ({
    key: String(i),
    label: faker.lorem.words(4),
    children: faker.lorem.sentences(6),
  }))

export const Base = () => <Collapse items={makeItems(3)} />

export const AccordionMode = () => <Collapse accordion items={makeItems(3)} />
