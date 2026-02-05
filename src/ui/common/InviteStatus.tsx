import React from 'react'
import styled from 'styled-components'
import { grid, th, ThemeValue } from '../../toolkit'

export type Status =
  | 'success'
  | 'error'
  | 'warn'
  | 'warning'
  | 'accept'
  | 'reject'
  | 'revise'
  | 'primary'
  | 'publish'

type InviteStatusProps = {
  children?: React.ReactNode
  className?: string
  /** Determines if theme colours are reversed */
  reverseColors?: boolean
  /** List of valid status values */
  status?: Status | null
}

type StyledStatusProps = {
  $reverseColors: boolean
  $status: Status | null
}

const statuses = {
  success: ['success', 'accept'],
  error: ['error', 'reject'],
  warning: ['warn', 'warning', 'revise'],
  primary: ['primary', 'publish'],
}

const StyledStatus = styled.span<StyledStatusProps>`
  background: ${(props): ThemeValue => {
    const { $reverseColors, $status } = props
    if (!$reverseColors) return null

    if ($status && statuses.success.includes($status)) return th('colorSuccess')
    if ($status && statuses.error.includes($status)) return th('colorError')
    if ($status && statuses.warning.includes($status)) return th('colorWarning')
    if ($status && statuses.primary.includes($status)) return th('colorPrimary')

    return th('colorSecondary')
  }};
  border-radius: 3px;
  color: ${(props): ThemeValue => {
    const { $reverseColors, $status } = props
    if ($reverseColors) return th('colorTextReverse')

    if ($status && statuses.success.includes($status)) return th('colorSuccess')
    if ($status && statuses.error.includes($status)) return th('colorError')
    if ($status && statuses.warning.includes($status)) return th('colorWarning')
    if ($status && statuses.primary.includes($status)) return th('colorPrimary')

    return th('colorText')
  }};
  display: flex;
  font-family: ${th('fontInterface')};
  font-size: ${th('fontSizeBaseSmall')};
  justify-content: space-around;
  line-height: ${th('lineHeightBaseSmall')};
  max-width: ${grid(24)};
  min-width: ${grid(12)};
  padding: ${(props): ThemeValue => props.$reverseColors && '4px 8px'};
  text-transform: uppercase;
  white-space: normal;
`

const InviteStatus = (props: InviteStatusProps): React.ReactNode => {
  const { children, className, reverseColors = false, status = null } = props
  if (!children) return null

  return (
    <StyledStatus
      $reverseColors={reverseColors}
      $status={status}
      className={className}
    >
      {children}
    </StyledStatus>
  )
}

export default InviteStatus
