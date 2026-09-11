import React from 'react'
import styled, { css } from 'styled-components'

import { grid, override, type ThemeValue } from '../../toolkit'

type Status = 'success' | 'error' | 'danger'

type RibbonProps = {
  className?: string
  children?: React.ReactNode
  hide?: boolean
  status?: Status | null
  role?: string
}

type WrapperProps = {
  $hide: boolean
  $status: Status | null
}

const Wrapper = styled.div<WrapperProps>`
  background: ${(props): ThemeValue => {
    const { $status } = props
    if ($status === 'success') return props.theme.colorSuccess
    if ($status === 'error' || $status === 'danger')
      return props.theme.colorError
    return props.theme.colorSecondary
  }};
  border-radius: ${(props): ThemeValue => props.theme.borderRadius};
  color: ${(props): ThemeValue => {
    const { $status } = props
    if ($status === 'success' || $status === 'error' || $status === 'danger')
      return props.theme.colorTextReverse
    return props.theme.colorText
  }};
  padding: ${grid(0.5)} ${grid(2)};
  text-align: center;

  ${(props): ThemeValue =>
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
