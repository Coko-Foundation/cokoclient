import React from 'react'
// import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Input } from 'antd'

import { inputShadow } from './_reusableStyles'

const StyledSearch = styled(Input.Search)`
  input {
    ${inputShadow}
  }
`

const Search = props => {
  const { className, ...rest } = props

  return <StyledSearch className={className} {...rest} />
}

Search.propTypes = {}

export default Search
