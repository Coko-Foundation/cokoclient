/* eslint-disable react-hooks/rules-of-hooks */

import { useState, ReactElement } from 'react'
import { faker } from '@faker-js/faker'

import { Switch } from '../../../src/ui'
import preview from '../../../.storybook/preview'

const meta = preview.meta({
  component: Switch,
  title: 'Common/Switch',
})

export const Base = meta.story({
  render: (): ReactElement => {
    const [checked, setChecked] = useState(false)
    const handleChange = (): void => setChecked(!checked)

    return <Switch checked={checked} onChange={handleChange} />
  },
})

export const WithLabel = meta.story({
  render: (): ReactElement => <Switch label={faker.lorem.words(5)} />,
})

export const WithLabelLeft = meta.story({
  render: (): ReactElement => (
    <Switch label={faker.lorem.words(5)} labelPosition="left" />
  ),
})
