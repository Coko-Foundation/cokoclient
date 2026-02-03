import { ReactNode } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router'

import Container from './common/Container'
import ItemList from './ItemList'
import { Button } from '../../../../src/ui/common'

// import Inversify from './Inversify'

const Buttons = styled.div`
  display: flex;
  justify-content: center;
`

type RootProps = {
  data: string[]
  loading: boolean
}

const Root = (props: RootProps): ReactNode => {
  const { data, loading } = props

  const handleConnetToProvider = (): void => {
    const redirectURL = encodeURIComponent(
      'http://localhost:4000/provider-connection-popup/lulu?next=/',
    )

    const baseLuluUrl =
      'https://api.sandbox.lulu.com/auth/realms/glasstree/protocol/openid-connect/auth'

    window.open(
      `${baseLuluUrl}?response_type=code&client_id=ketida-editor&redirect_uri=${redirectURL}`,
      undefined,
      'width=600, height=600',
    )

    // window.location = `${baseLuluUrl}?response_type=code&client_id=ketida-editor&redirect_uri=${redirectURL}`
  }

  return (
    <Container>
      <div>
        <Link to="/imagedemo">Image demo</Link>
        <Link to="/ant">Ant</Link>
        <Link to="/protected">Protected</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/subscriptions-test">Subscriptions</Link>
      </div>

      <Buttons>
        <Button onClick={handleConnetToProvider}>Connect to provider</Button>
      </Buttons>

      <ItemList data={data} loading={loading} />
    </Container>
  )
}

export default Root
