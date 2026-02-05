import { ReactNode } from 'react'
import styled from 'styled-components'

import { type ThemeValue } from '../../../../src'

const StyledItem = styled.div`
  border: 1px solid ${(props): ThemeValue => props.theme.colorBorder};
  border-radius: 5px;
  color: ${(props): ThemeValue => props.theme.colorText};
  margin: 5px 25px;
  padding: 10px;
`

type ItemProps = {
  text: string
}

const Item = (props: ItemProps): ReactNode => {
  const { text } = props

  return <StyledItem>{text}</StyledItem>
}

export default Item
