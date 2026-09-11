import React, { ComponentProps } from 'react'
import styled from 'styled-components'
import { AutoComplete as AntAutoComplete } from 'antd'
import { debounce as debounceFunc } from '../../toolkit/funcs'

const StyledAutoComplete = styled(AntAutoComplete)`
  width: 100%;
`

type AutoCompleteProps = ComponentProps<typeof AntAutoComplete> & {
  className?: string
  debounce?: boolean
  debounceTimeout?: number
}

const AutoComplete = (props: AutoCompleteProps): React.ReactNode => {
  const {
    className,
    children,
    debounce = false,
    debounceTimeout = 500,
    showSearch,
    ...rest
  } = props

  let search = showSearch

  if (
    showSearch &&
    typeof showSearch !== 'boolean' &&
    'onSearch' in showSearch
  ) {
    const searchConfig = showSearch as { onSearch: (value: string) => void }
    const handleSearch = (searchValue: string): void => {
      return searchConfig.onSearch(searchValue)
    }

    const searchFunc = debounce
      ? debounceFunc(handleSearch, debounceTimeout)
      : handleSearch

    search = {
      ...showSearch,
      onSearch: searchFunc,
    }
  }

  // Allow changing on input component, as in the docs
  if (children)
    return (
      <StyledAutoComplete className={className} showSearch={search} {...rest}>
        {children}
      </StyledAutoComplete>
    )

  return (
    <StyledAutoComplete className={className} showSearch={search} {...rest} />
  )
}

export default AutoComplete
