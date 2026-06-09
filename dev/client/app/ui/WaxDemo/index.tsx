// @ts-nocheck
import { ReactNode } from 'react'
import styled from 'styled-components'
import { Wax, WaxView, ComponentPlugin } from 'wax-prosemirror-core'
import 'wax-prosemirror-core/dist/index.css'
import 'wax-prosemirror-services/dist/index.css'
import waxDemoConfig from './waxDemoConfig'

const TopBar = ComponentPlugin('topBar')

const LayoutWrapper = styled.div`
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;

  div[contenteditable='true'] {
    font-family: 'Advent Pro', sans-serif;
  }
`

const TopBarWrapper = styled.div`
  border-bottom: 1px solid #ccc;
  padding: 4px;

  button[aria-pressed='true'] {
    svg {
      fill: white;
    }
  }
`

const layout = (props: any): ReactNode => (
  <LayoutWrapper>
    <TopBarWrapper>
      <TopBar />
    </TopBarWrapper>
    <div style={{ padding: '8px 12px', minHeight: 200 }}>
      <WaxView {...props} />
    </div>
  </LayoutWrapper>
)

const WaxDemo = (): ReactNode => (
  <div style={{ maxWidth: 800, margin: '40px auto', padding: '0 16px' }}>
    <h2>Wax Editor — inversify decorator smoke test</h2>
    <p>
      Bold and Italic are injected via <code>@inject</code> into a custom{' '}
      <code>@injectable()</code> ToolGroup.
    </p>
    <Wax
      config={waxDemoConfig}
      layout={layout}
      value="<p>Type here. Bold and Italic buttons above come from a custom injectable tool group.</p>"
    />
  </div>
)

export default WaxDemo
