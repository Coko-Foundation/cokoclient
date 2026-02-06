import { ReactNode, useState } from 'react'

import { InputNumber } from '../../../src/ui'

export const Base = (): ReactNode => {
  const [value, setValue] = useState<number | string | null>(2)

  return (
    <InputNumber
      label="Choose a number"
      onChange={val => setValue(val)}
      value={value}
    />
  )
}

export const Disabled = (): ReactNode => (
  <InputNumber disabled label="Choose a number" onChange={() => {}} value={3} />
)
