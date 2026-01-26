import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { ConfigProvider as AntConfigProvider } from 'antd'

import { grid, th } from '../../src/toolkit'

type ExportType = React.Component & {
  name: string
}

const Header = styled.h1`
  color: #4a4453;
  border-bottom: 2px solid ${th('colorText')};
`

const Story = styled.div`
  margin-bottom: ${grid(8)};
`

const StoryName = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #4a4453;
  margin-bottom: ${grid(3)};
  border-bottom: ${th('borderWidth')} solid ${th('colorText')};
`

const ComponentStories = ({ module, theme }) => {
  return (
    <div>
      <Header>{module.name.replace(/([a-z])([A-Z])/g, '$1 $2')}</Header>

      {module.exports.map((Export: ExportType) => {
        if (typeof Export !== 'function') return null

        const id = `${module.name}-${Export.name}`

        return (
          <Story id={id} key={id}>
            <StoryName>
              {Export.name.replace(/([a-z])([A-Z])/g, '$1 $2')}
            </StoryName>
            <div>
              <AntConfigProvider theme={theme}>
                <ThemeProvider theme={theme.token}>
                  <Export />
                </ThemeProvider>
              </AntConfigProvider>
            </div>
          </Story>
        )
      })}
    </div>
  )
}

export default ComponentStories
