import { ReactNode, useEffect } from 'react'
import { gql } from '@apollo/client'
import { useMutation } from '@apollo/client/react'

import NavigationBar from '../ui/NavigationBar'
import { useCurrentUser } from '../../../../src'

type LoginData = {
  login: {
    token: string | null
  } | null
}

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

const NavigationBarPage = (): ReactNode => {
  const [login, { data, loading }] = useMutation<LoginData>(LOGIN)
  const { currentUser, refetch, logout } = useCurrentUser()

  useEffect(() => {
    if (data) {
      const token = data.login?.token
      if (token) localStorage.setItem('token', token)
      refetch()
    }
  }, [data, refetch])

  return (
    <NavigationBar
      currentUsername={currentUser?.username}
      login={login}
      loginLoading={loading}
      logout={logout}
      lulu={!!currentUser?.identities?.find(id => id.provider === 'lulu')}
    />
  )
}

export default NavigationBarPage
