import React from 'react'
import styled from 'styled-components'
import { AutoComplete as AntAutoComplete } from 'antd'
import { debounce as debounceFunc } from '../../toolkit/funcs'

const StyledAutoComplete = styled(AntAutoComplete)`
  width: 100%;
`

type AutoCompleteProps = {
  className?: string
  children: React.ReactNode
  debounce: boolean
  debounceTimeout: number
  onSearch: (value: string) => void
}

const AutoComplete = (props: AutoCompleteProps): React.ReactNode => {
  const {
    className,
    children,
    debounce = false,
    debounceTimeout = 500,
    onSearch,
    ...rest
  } = props

  const handleSearch = (searchValue: string): void => onSearch(searchValue)

  const searchFunc = debounce
    ? debounceFunc(handleSearch, debounceTimeout)
    : handleSearch

  // Allow changing on input component, as in the docs
  if (children)
    return (
      <StyledAutoComplete className={className} onSearch={searchFunc} {...rest}>
        {children}
      </StyledAutoComplete>
    )

  return (
    <StyledAutoComplete className={className} onSearch={searchFunc} {...rest} />
  )
}

export default AutoComplete
