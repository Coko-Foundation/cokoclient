import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { v4 as uuid } from 'uuid'

import Button from './common/Button'

const Wrapper = styled.div``

const Teams = props => {
  const {
    className,
    teams = null,
    addToReviewerTeam,
    removeFromReviewerTeam,
  } = props

  const isInReviewerTeam = teams && !!teams.find(t => t.role === 'reviewer')

  return (
    <Wrapper className={className}>
      <ul>
        {teams &&
          teams.length > 0 &&
          teams.map(t => <li key={uuid()}>{t.role}</li>)}

        {(!teams || teams.length === 0) && 'no teams'}
      </ul>

      <Button
        onClick={isInReviewerTeam ? removeFromReviewerTeam : addToReviewerTeam}
        type="button"
      >
        {isInReviewerTeam ? 'Remove from' : 'Add to'} reviewer team
      </Button>
    </Wrapper>
  )
}

Teams.propTypes = {
  teams: PropTypes.array,
  addToReviewerTeam: PropTypes.func.isRequired,
  removeFromReviewerTeam: PropTypes.func.isRequired,
}

export default Teams
