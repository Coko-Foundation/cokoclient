import React from 'react'
import styled from 'styled-components'

import { grid, th } from '../../toolkit'

type NoteProps = {
  className?: string
  children?: React.ReactNode
}

const Wrapper = styled.div`
  background: ${th('colorSecondary')};
  border-radius: 3px;
  font-size: ${th('fontSizeBaseSmall')};
  padding: ${grid(2)};
  text-align: justify;
`

const Note = (props: NoteProps): React.ReactNode => {
  const { className, children } = props
  return <Wrapper className={className}>{children}</Wrapper>
}

export default Note
