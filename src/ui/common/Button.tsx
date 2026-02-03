import { ComponentProps, ReactNode, useEffect, useRef } from 'react'
import styled, { css } from 'styled-components'
import { Button as AntButton } from 'antd'

import { darken, th, grid } from '../../toolkit'

const colors = {
  danger: 'colorError',
  error: 'colorError',
  success: 'colorSuccess',
  // warn: 'colorWarning',
}

type ButtonProps = Omit<ComponentProps<typeof AntButton>, 'danger'> & {
  direction?: 'rtl' | 'ltr'
  status?: 'error' | 'danger' | 'success'
}

const StyledButton = styled(AntButton)<{
  $direction: ButtonProps['direction']
  $status?: ButtonProps['status']
}>`
  box-shadow: none;
  font-size: ${th('fontSizeBase')};
  /* let lineHeight expand the button height */
  height: unset;
  line-height: ${th('lineHeightBase')};
  ${props =>
    props.$direction === 'rtl' &&
    css`
      direction: rtl;

      .anticon + span {
        margin-right: 8px;
        margin-left: 0;
      }
    `};

  ${props => {
    const { $status, theme, type, ghost, disabled } = props

    if (disabled) return null

    if (!$status || !Object.keys(colors).includes($status)) {
      if (type === 'primary' && !ghost) {
        return css`
          background-color: ${th('colorPrimary')};

          &:hover,
          &:focus,
          &:active {
            background-color: ${darken('colorPrimary', 0.25)} !important;
          }
        `
      }

      return css`
        &:hover,
        &:focus,
        &:active {
          border-color: ${darken('colorPrimary', 0.25)} !important;
          color: ${darken('colorPrimary', 0.25)} !important;
        }
      `
    }

    const color = theme[colors[$status]]

    // primary
    if (type === 'primary')
      return css`
        background-color: ${color};
        border-color: ${color};
        color: ${theme.colorTextReverse};

        &:hover,
        &:focus,
        &:active {
          border-color: ${color};
          color: ${theme.colorTextReverse};
        }

        &:hover,
        &:focus {
          background-color: ${darken(color, 0.25)} !important;
        }

        &:active {
          background-color: ${darken(color, 0.25)} !important;
        }
      `

    // non-primary
    return css`
      color: ${color};
      border-color: ${color};

      &:hover,
      &:focus {
        color: ${darken(color, 0.25)};
        border-color: ${darken(color, 0.25)};
      }

      &:active {
        color: ${darken(color, 0.25)};
        border-color: ${darken(color, 0.25)};
      }
    `
  }};

  padding: ${grid(2)} ${grid(4)};
`

/**
 * API is the same as https://ant.design/components/button/#API, except for the
 * `danger` prop, which is ommited in favour of `status`, described below.
 */

const Button = (props: ButtonProps): ReactNode => {
  const {
    children,
    className,
    autoFocus = false,
    direction = 'ltr',
    status,
    ...passProps
  } = props

  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (autoFocus) {
      buttonRef.current?.focus()
    }
  }, [autoFocus])

  return (
    <StyledButton
      $direction={direction}
      $status={status}
      className={className}
      ref={buttonRef}
      {...passProps}
    >
      {children}
    </StyledButton>
  )
}

export default Button
