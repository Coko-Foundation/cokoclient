import React from 'react'
import styled, { css } from 'styled-components'

type PageProps = {
  className?: string
  children?: React.ReactNode
  maxWidth?: number | null
}

const Wrapper = styled.div<{ maxWidth?: number | null }>`
  height: 100%;

  ${props =>
    props.maxWidth &&
    css`
      display: flex;
      justify-content: center;

      > div {
        max-width: ${props.maxWidth}px;
      }
    `}
`

const Page = (props: PageProps): React.ReactNode => {
  const { className, children, maxWidth = null } = props

  return (
    <Wrapper className={className} maxWidth={maxWidth}>
      {children}
    </Wrapper>
  )
}

export default Page
