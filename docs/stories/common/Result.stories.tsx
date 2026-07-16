import { ReactElement } from 'react'

import { Button, Result } from '../../../src/ui'
import preview from '../../../.storybook/preview'

const meta = preview.meta({
  component: Result,
  title: 'Common/Result',
})

export const Base = meta.story({
  render: (): ReactElement => (
    <Result
      extra={[
        <Button key={1} type="link">
          Click me to get out of here
        </Button>,
      ]}
      status="success"
      subTitle="Success is what you get here"
      title="This is a success!"
    />
  ),
})
