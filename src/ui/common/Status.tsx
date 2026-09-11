import React from 'react'
import styled from 'styled-components'

import { grid, th, lighten, type ThemeValue } from '../../toolkit'

type StatusVariant =
  | 'Not Submitted'
  | 'Submitted'
  | 'Rejected'
  | 'Under Review'
  | 'In Production'
  | 'Published'

type StatusProps = {
  className?: string
  status: StatusVariant
}

const Wrapper = styled.span<{ $variant: StatusVariant }>`
  background-color: ${(props): ThemeValue => {
    switch (props.$variant) {
      case 'Not Submitted':
        return lighten('colorBorder', 0.5)
      case 'Submitted':
        return th('colorText')
      case 'Rejected':
        return th('colorError')
      case 'Under Review':
        return th('colorWarning')
      case 'In Production':
        return th('colorPrimary')
      case 'Published':
        return th('colorSuccess')
      default:
        return th('colorBackground')
    }
  }};
  border-radius: 2px;
  color: ${({ $variant }): ThemeValue =>
    $variant === 'Not Submitted'
      ? th('colorTextDark')
      : th('colorTextReverse')};
  font-size: ${th('fontSizeBaseSmall')};
  /* font-weight: bold; */
  padding: ${grid(1)} ${grid(3)};
  text-align: center;
`

const Status = (props: StatusProps): React.ReactNode => {
  const { className, status, ...rest } = props

  return (
    <Wrapper $variant={status} className={className} {...rest}>
      {status}
    </Wrapper>
  )
}

export default Status
