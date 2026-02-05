import { ReactNode } from 'react'
import styled from 'styled-components'

import Button from './common/Button'
import { type ThemeValue } from '../../../../src'

const StyledNavigationBar = styled.div`
  background: ${(props): ThemeValue => props.theme.colorPrimary};
  color: white;
  display: flex;
  height: 50px;
  justify-content: space-between;
  line-height: 50px;
  padding: 0 8px;
`

const Username = styled.div`
  margin-right: 10px;
`

const RightSide = styled.div`
  display: flex;
`

type NavigationBarProps = {
  loginLoading: boolean
  lulu?: boolean
  currentUsername?: string
  login: () => void
  logout: () => void
}

const NavigationBar = (props: NavigationBarProps): ReactNode => {
  const { login, loginLoading, lulu = false, logout, currentUsername } = props

  const onClickBtn = (): void => {
    if (currentUsername) {
      logout()
    } else {
      login()
    }
  }

  const btnText = currentUsername ? 'Logout' : 'Login'

  return (
    <StyledNavigationBar>
      <div>This is the navigation bar</div>

      <div>Connected to lulu? {lulu ? 'yes' : 'no'}</div>

      <RightSide>
        <Username>
          {currentUsername && `Logged in as ${currentUsername}`}
        </Username>

        <div>
          <Button loading={loginLoading} onClick={onClickBtn}>
            {btnText}
          </Button>
        </div>
      </RightSide>
    </StyledNavigationBar>
  )
}

export default NavigationBar
