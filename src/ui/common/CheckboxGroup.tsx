import React, { ComponentProps } from 'react'
import styled from 'styled-components'
import { Checkbox } from 'antd'

import { checkboxStyles } from './Checkbox'
import { vertical as verticalCss } from '../_helpers/cssSnippets'

type CheckboxGroupProps = ComponentProps<typeof Checkbox.Group> & {
  /** Arrange items vertically instead of inline. */
  vertical?: boolean
}

const StyledGroup = styled(Checkbox.Group)`
  ${checkboxStyles}

  label.ant-checkbox-wrapper {
    margin-inline-start: 0;
  }
`

const VerticalWrapper = styled.div`
  display: inline-block;

  .ant-checkbox-group {
    ${verticalCss}
  }
`

const CheckboxGroup = (props: CheckboxGroupProps): React.ReactNode => {
  const { className, vertical = false, ...rest } = props

  const group = <StyledGroup className={className} {...rest} />

  if (vertical) return <VerticalWrapper>{group}</VerticalWrapper>
  return group
}

export default CheckboxGroup
