import { ReactNode } from 'react'
import { Link } from 'react-router'
import styled from 'styled-components'

const Wrapper = styled.div``

type ProtectedProps = {
  className?: string
}

const Protected = (props: ProtectedProps): ReactNode => {
  const { className } = props
  return (
    <Wrapper className={className}>
      <div>You should only be able to see this if you are logged in</div>

      <div>
        <Link to="/">Go back</Link>
      </div>
    </Wrapper>
  )
}

export default Protected
