import { ReactElement } from 'react'

import dayjs from 'dayjs'
import { DateParser } from '../../../src/ui'
import preview from '../../../.storybook/preview'

const meta = preview.meta({
  component: DateParser,
  title: 'Common/DateParser',
})

const timeStamp = dayjs().toDate()

export const Base = meta.story({
  render: (): ReactElement => <DateParser timestamp={timeStamp} />,
})

export const Formatted = meta.story({
  render: (): ReactElement => (
    <DateParser dateFormat="MMMM DD, YYYY" timestamp={timeStamp} />
  ),
})

export const Humanized = meta.story({
  render: (): ReactElement => (
    <DateParser humanizeThreshold={1} timestamp={timeStamp} />
  ),
})
