import { ReactNode } from 'react'

import dayjs from 'dayjs'
import { DateParser } from '../../../src/ui'

const timeStamp = dayjs().toDate()

export const Base = (): ReactNode => <DateParser timestamp={timeStamp} />

export const Formatted = (): ReactNode => (
  <DateParser dateFormat="MMMM DD, YYYY" timestamp={timeStamp} />
)

export const Humanized = (): ReactNode => (
  <DateParser humanizeThreshold={1} timestamp={timeStamp} />
)
