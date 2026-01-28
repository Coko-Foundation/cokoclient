import React, { ComponentProps } from 'react'
import styled from 'styled-components'
import { Input as AntInput } from 'antd'
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'

import { th } from '../../toolkit'
import { inputShadow } from './_reusableStyles'

type InputProps = Omit<ComponentProps<typeof AntInput>, 'onChange'> & {
  /** optional icon for reveal/hide password */
  passwordIconRender?: ((visible: boolean) => React.ReactNode) | null
  /** Handle change. First argument is the incoming `value`. */
  onChange?: ((value: string) => void) | null
  /** Define type of input. For other valid html input types, we have created separate components (eg. TextArea). */
  type?: string
}

const Wrapper = styled.div``

const StyledInput = styled(AntInput)`
  ${inputShadow}
`

const NoStyleButton = styled.button`
  background: none;
  border: none;
`

const StyledPassword = styled(AntInput.Password)`
  transition: outline 0s;

  :has(input:focus) {
    box-shadow: 0 0 2px ${th('colorPrimary')};
    outline: ${props => `${props.theme.lineWidth * 4}`}px solid
      ${th('colorPrimaryBorder')};
    outline-offset: 1px;
  }
`

const Input = (props: InputProps): React.ReactNode => {
  const {
    className,
    onChange = null,
    type = 'text',
    passwordIconRender = null,
    ...rest
  } = props

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    onChange?.(e.target.value)

  // wrap "eye" icon for show/hide password with a button to make it keyboard-focusable
  const defaultPasswordIconRender = (visible: boolean) => (
    <NoStyleButton
      aria-checked={visible}
      aria-label={visible ? 'Hide password' : 'Show password'}
      onClick={e => e.preventDefault()}
      role="switch"
      type="button"
    >
      {visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
    </NoStyleButton>
  )

  return (
    <Wrapper className={className}>
      {type !== 'password' && <StyledInput onChange={handleChange} {...rest} />}

      {type === 'password' && (
        <StyledPassword
          iconRender={passwordIconRender || defaultPasswordIconRender}
          onChange={handleChange}
          {...rest}
        />
      )}
    </Wrapper>
  )
}

export default Input
