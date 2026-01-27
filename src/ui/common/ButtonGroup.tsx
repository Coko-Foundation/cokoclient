import React, { ComponentProps } from 'react'
import styled, { css } from 'styled-components'

import { grid } from '../../toolkit'
import Button from './Button'

type ButtonElement = React.ReactElement<ComponentProps<typeof Button>>

type ButtonGroupProps = {
  children: ButtonElement | ButtonElement[]
  className?: string
  inline?: boolean
  justify?: 'left' | 'right' | 'center'
}

const Wrapper = styled.div<{
  $inline?: ButtonGroupProps['inline']
  $justify?: ButtonGroupProps['justify']
}>`
  display: ${props => (props.$inline ? 'inline-block' : 'flex')};

  ${props => {
    const { $inline, $justify } = props
    let justifyValue

    if ($inline) return null

    if ($justify === 'left') justifyValue = 'flex-start'
    if ($justify === 'right') justifyValue = 'flex-end'
    if ($justify === 'center') justifyValue = 'center'

    if (justifyValue)
      return css`
        justify-content: ${justifyValue};
      `

    return null
  }}

  > button {
    margin-right: ${grid(1)};
  }

  > button:first-child {
    margin-left: 0;
  }

  > button:last-child {
    margin-right: 0;
  }
`

const ButtonGroup = (props: ButtonGroupProps) => {
  const { className, children, inline = false, justify = 'left' } = props

  return (
    <Wrapper className={className} $inline={inline} $justify={justify}>
      {children}
    </Wrapper>
  )
}

export default ButtonGroup
