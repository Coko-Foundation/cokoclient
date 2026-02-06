import { ReactNode, useState } from 'react'
import styled, { css } from 'styled-components'

import { Layout, Paragraph, Switch } from '../../../src/ui'
import { type ThemeValue } from '../../../src/toolkit/themeHelper'

const Wrapper = styled.div<{ $showBorder?: boolean }>`
  ${(props): ThemeValue =>
    props.$showBorder &&
    css`
      border: 2px solid coral;
    `}
`

export const Base = (): ReactNode => {
  const [showBorder, setShowBorder] = useState(true)

  return (
    <>
      <Paragraph>
        Colored border for demo purposes only
        <Switch
          checked={showBorder}
          onChange={() => setShowBorder(!showBorder)}
        />
      </Paragraph>

      <Wrapper $showBorder={showBorder}>
        <Layout>
          <Layout.Header>Header</Layout.Header>
          <Layout.Content>Content</Layout.Content>
          <Layout.Footer>Footer</Layout.Footer>
        </Layout>
      </Wrapper>
    </>
  )
}
