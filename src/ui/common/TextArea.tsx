import React, { ComponentProps } from 'react'
import styled from 'styled-components'
import { Input } from 'antd'

type TextAreaProps = ComponentProps<typeof Input.TextArea> & {
  className?: string
}

const StyledTextArea = styled(Input.TextArea)``

const TextArea = (props: TextAreaProps): React.ReactNode => {
  const { className, ...rest } = props

  return <StyledTextArea className={className} {...rest} />
}

export default TextArea
