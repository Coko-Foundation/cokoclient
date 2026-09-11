import React, { useState } from 'react'
import styled from 'styled-components'
import { grid, th } from '../../toolkit'

import { Button, Select } from '../common'

const Wrapper = styled.div`
  display: flex;
  gap: ${grid(1)};
  margin: 0 auto;
  width: 100%;

  /* stylelint-disable-next-line media-query-no-invalid */
  @media (min-width: ${th('mediaQueries.small')}) {
    padding: ${grid(4)};
  }
`

const StyledSelect = styled(Select)`
  /* stylelint-disable selector-class-pattern */

  flex-grow: 1;

  .react-select__control {
    border: 0;
    box-shadow: ${th('colorBorder')} 0 0 0 1px;
    padding: 0 ${grid(1)};
    transition: box-shadow 0.2s ease-in;
  }

  .react-select__control--is-focused {
    box-shadow: ${th('colorPrimary')} 0 0 0 2px;
  }

  .react-select__menu {
    margin-top: 4px;
  }
`

const AddButton = styled(Button)`
  height: 100%;
`

export type AdditionalSearchField = {
  label: string
  value: string
  items?: string[]
}

export type SearchResult = {
  id: string
  value: string
  label: string
  displayName: string
  isDisabled?: boolean
  status?: string
  key?: string
  [key: string]: unknown
}

type SearchResultGroup = {
  label: string
  options: SearchResult[]
}

type Selection = {
  value: string
  label: string
}

type SearchBoxProps = {
  additionalSearchFields?: AdditionalSearchField[]
  className?: string
  onAdd: (ids: string[]) => Promise<void>
  onSearch: (value: string) => Promise<SearchResult[]>
  searchPlaceholder?: string
}

const SearchBox = (props: SearchBoxProps): React.ReactNode => {
  const {
    additionalSearchFields = [],
    className,
    searchPlaceholder = 'Add a reviewer to the list',
    onAdd,
    onSearch,
  } = props

  const [selection, setSelection] = useState<Selection[]>([])
  const [loadingSearchResults, setLoadingSearchResults] = useState(false)
  const [searchResults, setSearchResults] = useState<
    SearchResult[] | SearchResultGroup[]
  >([])

  const handleSearch = (searchValue: string): void => {
    setLoadingSearchResults(true)

    /* eslint-disable-next-line promise/catch-or-return */
    onSearch(searchValue)
      .then((data: SearchResult[]) => {
        if (!additionalSearchFields.length || !data.length) {
          setSearchResults(data)
          return
        }

        const nameMatchData = data.filter((d: SearchResult) =>
          d.displayName.toLowerCase().includes(searchValue.toLowerCase()),
        )

        const otherData = data.filter(
          (d: SearchResult) =>
            !d.displayName.toLowerCase().includes(searchValue.toLowerCase()),
        )

        const parsedData: SearchResultGroup[] = []

        /* eslint-disable-next-line promise/always-return */
        if (nameMatchData.length > 0) {
          parsedData.push({
            label: 'Reviewer Name',
            options: nameMatchData.map(n => ({
              ...n,
              key: `displayName-${n.id}`,
            })),
          })
        }

        additionalSearchFields.forEach(field => {
          if (field.items && Array.isArray(field.items)) {
            field.items.forEach(item => {
              if (!item.toLowerCase().includes(searchValue.toLowerCase()))
                return

              const filteredData = otherData.filter(
                (d: SearchResult) =>
                  d[field.value] !== undefined &&
                  String(d[field.value]).includes(item),
              )

              if (!filteredData.length) return

              const group: SearchResultGroup = {
                label: `${field.label}: ${item}`,
                options: filteredData.map((f: SearchResult) => ({
                  ...f,
                  key: `${field.value}-${item}-${f.value}`,
                })),
              }

              parsedData.push(group)
            })
          } else {
            const filteredData = otherData.filter(
              (d: SearchResult) =>
                d[field.value] !== undefined && d[field.value] !== false,
            )

            if (!filteredData.length) return

            const group: SearchResultGroup = {
              label: field.label,
              options: filteredData.map((f: SearchResult) => ({
                ...f,
                key: `${field.value}-${f.value}`,
              })),
            }

            parsedData.push(group)
          }
        })

        setSearchResults(parsedData)
      })
      .finally(() => {
        setLoadingSearchResults(false)
      })
  }

  const handleAdd = (): void => {
    /* eslint-disable-next-line promise/catch-or-return */
    onAdd(selection.map(s => s.value)).finally(() => {
      setSearchResults([])
      setSelection([])
    })
  }

  const handleChange = (value: unknown): void => {
    setSelection(value as Selection[])
  }

  return (
    <Wrapper className={className}>
      <StyledSelect
        async
        defaultOpen={false}
        labelInValue
        loading={loadingSearchResults}
        mode="multiple"
        onChange={handleChange}
        onSearch={handleSearch}
        options={searchResults}
        placeholder={searchPlaceholder}
        value={selection}
      />

      <AddButton
        aria-labelledby="reviewer-team"
        disabled={selection.length === 0}
        onClick={handleAdd}
        type="primary"
      >
        Add User{selection.length > 1 && 's'}
      </AddButton>
    </Wrapper>
  )
}

export default SearchBox
