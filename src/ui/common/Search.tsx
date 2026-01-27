import React, { ComponentProps } from 'react'
import styled from 'styled-components'
import { Input } from 'antd'

import { inputShadow } from './_reusableStyles'

type SearchProps = ComponentProps<typeof Input.Search>

const StyledSearch = styled(Input.Search)`
  input {
    ${inputShadow}
  }
`

const Search = (props: SearchProps): React.ReactNode => {
  const { className, ...rest } = props

  return <StyledSearch className={className} {...rest} />
}

export default Search
