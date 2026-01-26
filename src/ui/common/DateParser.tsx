import React from 'react'
import propTypes from 'prop-types'
import styled from 'styled-components'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(duration)
dayjs.extend(relativeTime)

const getDuration = timestamp => {
  const today = dayjs()
  const stamp = dayjs(timestamp)
  return dayjs.duration(today.diff(stamp))
}

const Wrapper = styled.span``

const DateParser = props => {
  const { timestamp, dateFormat = 'DD.MM.YYYY', humanizeThreshold = 0 } = props
  if (!timestamp) return null

  let timestampValue
  const duration = getDuration(timestamp)

  if (duration.asDays() < humanizeThreshold) {
    timestampValue = `${duration.humanize()} ago`
  } else {
    timestampValue = dayjs(timestamp).format(dateFormat)
  }

  return <Wrapper>{timestampValue}</Wrapper>
}

DateParser.propTypes = {
  /** The date string. Can be any date parsable by dayjs. */
  timestamp: propTypes.oneOfType([propTypes.string, propTypes.number, Date])
    .isRequired,
  /** Format of the rendered date. */
  dateFormat: propTypes.string,
  /** Humanize duration threshold. ie. If the time between now and the date is
   * less than this value in days, the date is converted to a humna-readable
   * form (eg. "one hour ago").
   */
  humanizeThreshold: propTypes.number,
}

export default DateParser
