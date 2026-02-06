import { ReactNode, useState } from 'react'
import { faker } from '@faker-js/faker'

import { Switch } from '../../../src/ui'

export const Base = (): ReactNode => {
  const [checked, setChecked] = useState(false)
  const handleChange = (): void => setChecked(!checked)

  return <Switch checked={checked} onChange={handleChange} />
}

export const WithLabel = (): ReactNode => (
  <Switch label={faker.lorem.words(5)} />
)

export const WithLabelLeft = (): ReactNode => (
  <Switch label={faker.lorem.words(5)} labelPosition="left" />
)
