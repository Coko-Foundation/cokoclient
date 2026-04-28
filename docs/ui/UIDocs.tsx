import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { CodeSandboxOutlined } from '@ant-design/icons'

import theme from '../app/theme'
import { makeTheme } from '../../src/components/Root'
import { darken, grid, th } from '../../src/toolkit'
import { Collapse } from '../../src/ui/common'

import ComponentStories from './ComponentStories'

// #region styled
const Wrapper = styled.div`
  margin-top: 60px;
  height: calc(100vh - 60px);
  display: flex;

  > div {
    height: 100%;
  }
`

const Sidebar = styled.div`
  /* stylelint-disable declaration-no-important */

  background-color: ${th('colorSecondary')};
  box-shadow: 1px 0 3px rgb(0 0 0 / 15%);
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
// #endregion

type StoriesModule = Record<string, any>

const modules: Record<string, StoriesModule> = import.meta.glob(
  '../stories/**/*.stories.tsx',
  {
    eager: true,
  },
)

const rawFiles: Record<string, { default: string }> = import.meta.glob(
  '../stories/**/*.stories.tsx',
  {
    eager: true,
    query: '?raw',
  },
)

type FileEntry = {
  name: string
  path: string
  exports: any[]
}

type Section = {
  sectionName: string
  entries: FileEntry[]
}

function structureStories(pathArray: string[]): Section[] {
  const grouped: Record<string, FileEntry[]> = pathArray.reduce(
    (acc, path) => {
      const parts = path.split('/')
      const sectionName = parts[parts.length - 2]
      const fileName = parts[parts.length - 1]
      const name = fileName.split('.')[0]
      const module = modules[path]

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
        .filter(exportName => exportName !== 'default' && module[exportName]) // Ensure it actually exists
        .map(exportName => module[exportName])

      if (!acc[sectionName]) {
        acc[sectionName] = []
      }

      acc[sectionName].push({ name, path, exports: orderedExports })
      return acc
    },
    {} as Record<string, FileEntry[]>,
  )

  const res: Section[] = Object.keys(grouped).map(section => ({
    sectionName: section,
    entries: grouped[section],
  }))

  return res
}

const structured = structureStories(Object.keys(modules))

const Root = (): ReactNode => {
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
          defaultActiveKey={
            collapseItems.find(section => section.label === 'common')?.key
          }
          expandIconPlacement="end"
          ghost
          items={collapseItems}
        />
      </Sidebar>

      <DisplayArea>
        <ComponentStories module={currentPath} theme={mappedAntTheme} />
      </DisplayArea>
    </Wrapper>
  )
}

export default Root
