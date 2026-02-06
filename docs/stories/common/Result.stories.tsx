import { ReactNode } from 'react'

import { Button, Result } from '../../../src/ui'

export const Base = (): ReactNode => (
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
)
