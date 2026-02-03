import { ReactNode } from 'react'
import { gql } from '@apollo/client'
import { useMutation } from '@apollo/client/react'

import { useCurrentUser } from '../../../../src/helpers/useCurrentUser'

import Teams from '../ui/Teams'

const ADD = gql`
  mutation Add($teamId: ID!, $userId: ID!) {
    addTeamMember(teamId: $teamId, userId: $userId) {
      id
    }
  }
`

const REMOVE = gql`
  mutation Remove($teamId: ID!, $userId: ID!) {
    removeTeamMember(teamId: $teamId, userId: $userId) {
      id
    }
  }
`

const TeamsPage = (): ReactNode => {
  const { currentUser } = useCurrentUser()

  const [addMutation] = useMutation(ADD, {
    variables: {
      teamId: 'c69f15db-3835-4b40-b695-ba22d5ae47b5', // reviewer team
      userId: currentUser?.id,
    },
  })

  const [removeMutation] = useMutation(REMOVE, {
    variables: {
      teamId: 'c69f15db-3835-4b40-b695-ba22d5ae47b5', // reviewer team
      userId: currentUser?.id,
    },
  })

  return (
    <Teams
      addToReviewerTeam={addMutation}
      removeFromReviewerTeam={removeMutation}
      teams={currentUser?.teams}
    />
  )
}

export default TeamsPage
