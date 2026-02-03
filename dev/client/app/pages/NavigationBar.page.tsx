import React from 'react'
import { gql } from '@apollo/client'
import { useMutation, useApolloClient } from '@apollo/client/react'

import NavigationBar from '../ui/NavigationBar'
import { useCurrentUser } from '../../../../src'

const LOGIN = gql`
  mutation Login {
    login(input: { username: "admin", password: "password" }) {
      token
      # user {
      #   id
      #   username
      # }
    }
  }
`

const NavigationBarPage = () => {
  const client = useApolloClient()
  const [login, { data, loading }] = useMutation(LOGIN)
  const { currentUser, refetch, logout } = useCurrentUser()

  React.useEffect(() => {
    if (data) {
      const token = data.login?.token
      if (token) localStorage.setItem('token', token)
      refetch()
    }
  }, [data])

  return (
    <NavigationBar
      currentUsername={currentUser?.username}
      login={login}
      loginLoading={loading}
      logout={logout}
      lulu={currentUser?.identities?.find(id => id.provider === 'lulu')}
    />
  )
}

export default NavigationBarPage
