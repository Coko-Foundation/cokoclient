import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { AutoComplete as AntAutoComplete } from 'antd'
import { debounce as lodashDebounceFunc } from 'lodash'

const StyledAutoComplete = styled(AntAutoComplete)`
  width: 100%;
`

const AutoComplete = props => {
  const {
    className,
    children,
    debounce = false,
    debounceTimeout = 500,
    onSearch,
    ...rest
  } = props

  console.log('hey')

  const handleSearch = searchValue => onSearch(searchValue)

  const searchFunc = debounce
    ? lodashDebounceFunc(handleSearch, debounceTimeout)
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

AutoComplete.propTypes = {
  /** Debounce the onSearch function */
  debounce: PropTypes.bool,
  /** Debounce timeout in milliseconds */
  debounceTimeout: PropTypes.number,
  /** Function to run while typing */
  onSearch: PropTypes.func.isRequired,
}

export default AutoComplete
