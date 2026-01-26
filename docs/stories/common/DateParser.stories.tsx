import React from 'react'

import { DateParser } from '../../../src/ui'
import dayjs from 'dayjs'

const timeStamp = dayjs()

export const Base = () => <DateParser timestamp={timeStamp} />

export const Formatted = () => (
  <DateParser dateFormat="MMMM DD, YYYY" timestamp={timeStamp} />
)

export const Humanized = () => (
  <DateParser timestamp={timeStamp} humanizeThreshold={1} />
)
