import { ReactElement } from 'react'
import styled from 'styled-components'
import { faker } from '@faker-js/faker'

import { uniq } from '../../../src/toolkit/funcs'
import SearchBox, {
  type SearchResult,
} from '../../../src/ui/assignReviewers/SearchBox'
import preview from '../../../.storybook/preview'

const meta = preview.meta({
  component: SearchBox,
  title: 'Assign Reviewers/SearchBox',
})

const Wrapper = styled.div`
  height: 400px;
`

const topics = uniq(Array.from(Array(20)).map(() => faker.animal.type()))

type Person = {
  id: string
  displayName: string
  value: string
  label: string
  isDisabled: boolean
  status: string | undefined
  assessmentTraining: boolean
  languageTraining: boolean
  topics: string[]
  [key: string]: unknown
}

const people: Person[] = Array.from(Array(40)).map(() => ({
  id: faker.string.uuid(),
  displayName: faker.person.fullName(),
  value: faker.string.uuid(),
  label: faker.person.fullName(),
  isDisabled: Math.random() > 0.5,
  status: faker.helpers.arrayElement([undefined, faker.lorem.words(2)]),
  assessmentTraining: Math.random() > 0.5,
  languageTraining: Math.random() > 0.5,
  topics: faker.helpers.arrayElements(topics, { min: 0, max: 3 }),
}))

const additionalSearchFields = [
  {
    label: 'Assessment Training',
    value: 'assessmentTraining',
  },
  {
    label: 'Language Training',
    value: 'languageTraining',
  },
  {
    label: 'Topics',
    value: 'topics',
    items: topics,
  },
]

const handleSearch = (input: string): Promise<SearchResult[]> => {
  if (!input) {
    return Promise.resolve([])
  }

  const lowerCaseInput = input.toLowerCase()

  const results = people.filter(person => {
    if (person.label.toLowerCase().includes(lowerCaseInput)) {
      return true
    }

    let foundMatchingField = false

    additionalSearchFields.forEach(field => {
      const fieldValue = person[field.value]

      if (
        field.label.toLocaleLowerCase().includes(lowerCaseInput) &&
        typeof fieldValue === 'boolean' &&
        fieldValue
      ) {
        foundMatchingField = true
      } else if (fieldValue && Array.isArray(fieldValue)) {
        fieldValue.forEach(entry => {
          if (entry.toLowerCase().includes(lowerCaseInput)) {
            foundMatchingField = true
          }
        })
      }
    })

    return foundMatchingField
  })

  return Promise.resolve(results)
}

const handleAdd = (): Promise<void> => {
  return Promise.resolve()
}

export const Base = meta.story({
  render: (): ReactElement => {
    return (
      <Wrapper>
        <SearchBox onAdd={handleAdd} onSearch={handleSearch} />
      </Wrapper>
    )
  },
})

export const AdditionalSearchFields = meta.story({
  render: (): ReactElement => {
    return (
      <Wrapper>
        <SearchBox
          additionalSearchFields={additionalSearchFields}
          onAdd={handleAdd}
          onSearch={handleSearch}
        />
      </Wrapper>
    )
  },
})
