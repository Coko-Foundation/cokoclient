import React from 'react'
import { faker } from '@faker-js/faker'
import { Collapse } from '../../../src/ui/common'

export const Base = () => (
  <Collapse>
    {Array.from(Array(3)).map((_, i) => (
      <Collapse.Panel header={faker.lorem.words(4)} key={i}>
        {faker.lorem.sentences(6)}
      </Collapse.Panel>
    ))}
  </Collapse>
)

export const AccordionMode = () => (
  <Collapse accordion>
    {Array.from(Array(3)).map((_, i) => (
      <Collapse.Panel header={faker.lorem.words(4)} key={i}>
        {faker.lorem.sentences(6)}
      </Collapse.Panel>
    ))}
  </Collapse>
)
