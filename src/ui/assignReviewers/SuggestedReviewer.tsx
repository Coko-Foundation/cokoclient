import React from 'react'
import styled from 'styled-components'

import { grid, th } from '../../toolkit'

type SuggestedReviewerProps = {
  className?: string
  name: string
}

const Wrapper = styled.span`
  border: 1px dashed ${th('colorPrimary')};
  font-size: ${th('fontSizeBaseSmall')};
  padding: ${grid(1)};
`

const Label = styled.span`
  color: ${th('colorPrimary')};
  text-transform: uppercase;
`

const SuggestedReviewer = (props: SuggestedReviewerProps): React.ReactNode => {
  const { className, name } = props

  return (
    <Wrapper className={className}>
      <Label>Author Suggested Reviewer:</Label> {name}
    </Wrapper>
  )
}

export default SuggestedReviewer
