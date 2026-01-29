import React from 'react'
import { gql } from '@apollo/client'
import { useMutation } from '@apollo/client/react'

import { useCurrentUser } from '../../../../src'

import Profile from '../ui/Profile'

const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
      username
    }
  }
`

const ProfilePage = props => {
  const { currentUser, setCurrentUser } = useCurrentUser()
  const [updateUser] = useMutation(UPDATE_USER)

  const handleSubmit = username => {
    updateUser({
      variables: {
        id: currentUser.id,
        input: {
          username,
        },
      },
    }).then(() => {
      setCurrentUser()
    })
  }

  return <Profile onSubmit={handleSubmit} />
}

export default ProfilePage
