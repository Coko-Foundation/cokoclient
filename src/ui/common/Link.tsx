import React from 'react'
import styled from 'styled-components'
import { Link as ReactRouterLink, type LinkProps } from 'react-router'

import { th } from '../../toolkit'

const StyledLink = styled(ReactRouterLink)`
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

const Link = (props: LinkProps): React.ReactNode => {
  return <StyledLink {...props} />
}

export default Link
