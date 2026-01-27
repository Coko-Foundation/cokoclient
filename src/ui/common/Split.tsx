import React from 'react'
import styled from 'styled-components'

import { Col, Row } from 'antd'

type SplitProps = {
  className?: string
  children: [React.ReactNode, React.ReactNode]
  gutter?: number
  /** Number on the antd grid of 24 total */
  splitAt?: number
}

const Wrapper = styled(Row)``
const Left = styled(Col)``
const Right = styled(Col)``

const Split = (props: SplitProps): React.ReactNode => {
  const { className, children, gutter = 0, splitAt = 12 } = props
  const [left, right] = children

  return (
    <Wrapper className={className} gutter={gutter}>
      <Left span={splitAt}>{left}</Left>
      <Right span={24 - splitAt}>{right}</Right>
    </Wrapper>
  )
}

export default Split
