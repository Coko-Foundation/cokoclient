/* eslint-disable react-hooks/rules-of-hooks */

import { useState, ReactElement } from 'react'
import { faker } from '@faker-js/faker'

import { Checkbox, Form } from '../../../src/ui'
import preview from '../../../.storybook/preview'

const meta = preview.meta({
  component: Checkbox,
  title: 'Common/Checkbox',
})

const label = faker.lorem.words(4)

export const Base = meta.story({
  render: (): ReactElement => {
    const [checked, setChecked] = useState(false)
    const handleChange = (): void => setChecked(!checked)

    return (
      <Checkbox checked={checked} onChange={handleChange}>
        {label}
      </Checkbox>
    )
  },
})

export const SingleCheckboxValidationInsideForm = meta.story({
  render: (): ReactElement => {
    return (
      // eslint-disable-next-line no-alert
      <Form onFinish={() => alert('Checkbox validation passed')}>
        <Form.Item
          name="requiredCheckbox"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error('This checkbox is required')),
            },
          ]}
          valuePropName="checked"
        >
          <Checkbox aria-label="You have to check this checkbox">
            Check the checkbox
          </Checkbox>
        </Form.Item>

        <button type="submit">Submit</button>
      </Form>
    )
  },
})
