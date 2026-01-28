import styled from 'styled-components'
import { v4 as uuid } from 'uuid'

import Button from './common/Button'

const Wrapper = styled.div``

type Team = {
  role: string
}

type TeamsProps = {
  className?: string
  teams: Team[]
  addToReviewerTeam: (id: string) => void
  removeFromReviewerTeam: (id: string) => void
}

const Teams = (props: TeamsProps) => {
  const {
    className,
    teams = [],
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

export default Teams
