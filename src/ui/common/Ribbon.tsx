import React from 'react'
import styled, { css, RuleSet } from 'styled-components'

import { grid, override } from '../../toolkit'

type Status = 'success' | 'error' | 'danger'

type RibbonProps = {
  className?: string
  children?: React.ReactNode
  hide?: boolean
  status?: Status | null
}

type WrapperProps = {
  $hide: boolean
  $status: Status | null
}

const Wrapper = styled.div<WrapperProps>`
  background: ${props => {
    const { $status } = props
    if ($status === 'success') return props.theme.colorSuccess
    if ($status === 'error' || $status === 'danger')
      return props.theme.colorError
    return props.theme.colorSecondary
  }};
  border-radius: ${props => props.theme.borderRadius};
  color: ${props => {
    const { $status } = props
    if ($status === 'success' || $status === 'error' || $status === 'danger')
      return props.theme.colorTextReverse
    return props.theme.colorText
  }};
  padding: ${grid(0.5)} ${grid(2)};
  text-align: center;

  /* stylelint-disable-next-line order/properties-alphabetical-order */
  ${(props): RuleSet | false =>
    props.$hide &&
    css`
      visibility: hidden;
    `}

  ${override('ui.Ribbon')};
`

const Ribbon = (props: RibbonProps): React.ReactNode => {
  const { className, children, hide = false, status = null, ...rest } = props

  return (
    <Wrapper $hide={hide} $status={status} className={className} {...rest}>
      {children}
    </Wrapper>
  )
}

export default Ribbon
