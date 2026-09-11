import React, { ComponentProps } from 'react'
import styled from 'styled-components'

import { InputNumber as AntInputNumber } from 'antd'
import { grid } from '../../toolkit'

type InputNumberProps = ComponentProps<typeof AntInputNumber> & {
  className?: string
  label?: string | null
  name?: string
}

const Wrapper = styled.div<{ $isDisabled: boolean }>`
  cursor: ${(props): string => (props.$isDisabled ? 'not-allowed' : 'default')};
  display: inline;
  opacity: ${(props): string => (props.$isDisabled ? '0.5' : '1')};

  label,
  input {
    cursor: ${(props): string =>
      props.$isDisabled ? 'not-allowed' : 'default'};
  }
`

const Label = styled.span`
  margin-right: ${grid(1)};
`

const Input = styled(AntInputNumber)`
  width: ${grid(8)};
`

const InputNumber = (props: InputNumberProps): React.ReactNode => {
  const {
    className,
    disabled = false,
    label = null,
    name = 'number-input',
    ...rest
  } = props

  return (
    <Wrapper $isDisabled={disabled} className={className}>
      <label htmlFor={name}>
        <Label>{label}</Label>
        <Input disabled={disabled} name={name} {...rest} />
      </label>
    </Wrapper>
  )
}

export default InputNumber
