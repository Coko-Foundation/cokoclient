/* eslint-disable react-hooks/rules-of-hooks */

import { useState, ReactElement } from 'react'

import { InputNumber } from '../../../src/ui'
import preview from '../../../.storybook/preview'

const meta = preview.meta({
  component: InputNumber,
  title: 'Common/InputNumber',
})

export const Base = meta.story({
  render: (): ReactElement => {
    const [value, setValue] = useState<number | string | null>(2)

    return (
      <InputNumber
        label="Choose a number"
        onChange={val => setValue(val)}
        value={value}
      />
    )
  },
})

export const Disabled = meta.story({
  render: (): ReactElement => (
    <InputNumber
      disabled
      label="Choose a number"
      onChange={() => {}}
      value={3}
    />
  ),
})
