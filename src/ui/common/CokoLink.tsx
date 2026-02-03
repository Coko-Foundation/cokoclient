import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router'

import { th } from '../../toolkit'

const StyledLink = styled(Link)`
  && {
    color: ${th('colorText')};
    text-decoration: underline;

    &:hover {
      color: ${th('colorText')};
      text-decoration: none;
    }

    &:focus {
      color: ${th('colorText')};
      outline: 1px solid ${th('colorPrimary')};
      text-decoration: none;
    }
  }
`

const CokoLink = props => {
  return <StyledLink {...props} />
}

export default CokoLink
