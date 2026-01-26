import React from 'react'
import styled from 'styled-components'
import { CodeSandboxOutlined } from '@ant-design/icons'

import theme from '../app/theme'
import { makeTheme } from '../../src/components/Root'
import { darken, grid, th } from '../../src/toolkit'
import { Collapse } from '../../src/ui/common'

import ComponentStories from './ComponentStories'

const Wrapper = styled.div`
  margin-top: 60px;
  height: calc(100vh - 60px);
  display: flex;

  > div {
    height: 100%;
  }
`

const Sidebar = styled.div`
  background-color: ${th('colorSecondary')};
  box-shadow: 1px 0 3px rgba(0, 0, 0, 0.15);
  padding: ${grid(10)};
  width: 350px;
  min-width: 350px;
  overflow-y: auto;
  user-select: none;

  .ant-collapse-item {
    margin-bottom: ${grid(3)};
  }

  .ant-collapse-header {
    font-size: 1.1rem;
    font-weight: bold;
    text-transform: capitalize;
    border-bottom: ${th('borderWidth')} solid ${th('colorText')};
    padding: 0 !important;
    border-radius: 0 !important;
  }

  .ant-collapse-header:focus {
    outline: none !important;
  }

  .ant-collapse-content-box {
    margin-top: ${grid(4)};
    padding: 0 !important;
  }
`

const ComponentRow = styled.div`
  cursor: pointer;
  font-size: 1rem;
  margin: ${grid(0.5)} 0;
  transition: background-color 0.15s ease-in-out;

  &:hover {
    background-color: ${darken('colorSecondary', 0.05)};
  }
`

const ComponentName = styled.span`
  margin-left: ${grid(2)};
`

const DisplayArea = styled.div`
  flex-grow: 1;
  max-width: 1200px;
  padding: ${grid(10)};
  overflow-y: auto;
`

const modules = import.meta.glob('../stories/**/*.stories.tsx', {
  eager: true,
})

const rawFiles = import.meta.glob('../stories/**/*.stories.tsx', {
  eager: true,
  query: '?raw',
})

function structureStories(pathArray) {
  const grouped = pathArray.reduce((acc, path) => {
    const parts = path.split('/')
    const sectionName = parts[parts.length - 2]
    const fileName = parts[parts.length - 1]
    const name = fileName.split('.')[0]
    const module = modules[path]
    const exports = Object.keys(module).map(p => module[p])

    const rawContent = rawFiles[path].default
    const codeWithoutComments = rawContent.replace(
      /\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm,
      '$1',
    )
    const exportRegex = /export const (\w+)/g
    const orderInFile = [...codeWithoutComments.matchAll(exportRegex)].map(
      match => match[1],
    )

    const orderedExports = orderInFile
      .filter(name => name !== 'default' && module[name]) // Ensure it actually exists
      .map(name => module[name])

    if (!acc[sectionName]) {
      acc[sectionName] = []
    }

    acc[sectionName].push({ name, path, exports: orderedExports })
    return acc
  }, {})

  const res = Object.keys(grouped).map(section => ({
    sectionName: section,
    entries: grouped[section],
  }))

  return res
}

const structured = structureStories(Object.keys(modules))

const Root = () => {
  const firstComponent = structured[0].entries[0]
  const [currentPath, setCurrentPath] = React.useState(firstComponent)
  const mappedAntTheme = makeTheme(theme)

  const collapseItems = structured.map((section, i) => {
    return {
      key: i,
      label: section.sectionName,
      children: section.entries.map(entry => {
        return (
          <ComponentRow
            key={`section-item-${entry.name}`}
            onClick={() => setCurrentPath(entry)}
          >
            <CodeSandboxOutlined />
            <ComponentName>{entry.name}</ComponentName>
          </ComponentRow>
        )
      }),
    }
  })

  return (
    <Wrapper>
      <Sidebar>
        <Collapse
          items={collapseItems}
          ghost
          expandIconPosition="end"
          defaultActiveKey={
            collapseItems.find(section => section.label === 'common').key
          }
        />
      </Sidebar>

      <DisplayArea>
        <ComponentStories module={currentPath} theme={mappedAntTheme} />
      </DisplayArea>
    </Wrapper>
  )
}

export default Root
