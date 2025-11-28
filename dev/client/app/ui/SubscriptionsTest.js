import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Wrapper = styled.div``

const SubscriptionsTest = props => {
  const { data } = props

  return (
    <Wrapper>
      {data.map(item => {
        return <div key={item.id}>{item.value}</div>
      })}
    </Wrapper>
  )
}

SubscriptionsTest.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      value: PropTypes.string,
    }),
  ),
}

SubscriptionsTest.defaultProps = {
  data: [],
}

export default SubscriptionsTest
