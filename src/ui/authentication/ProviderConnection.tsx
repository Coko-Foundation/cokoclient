import { ComponentProps, ReactNode } from 'react'
import styled from 'styled-components'

import Spin from '../common/Spin'
import Result from '../common/Result'

type ProviderConnectionProps = {
  className?: string
  closeOnSuccess?: boolean
  connecting?: boolean
  redirectUrlLabel?: string
  successfullyConnected?: boolean
}

type ResultProps = ComponentProps<typeof Result>

const Wrapper = styled.div``

const ProviderConnection = (
  props: ProviderConnectionProps,
): ReactNode => {
  const {
    className,
    closeOnSuccess = false,
    connecting = false,
    redirectUrlLabel,
    successfullyConnected = false,
  } = props

  let resultProps: ResultProps

  if (connecting) {
    resultProps = {
      icon: <Spin spinning />,
      title: 'Authenticating...',
    }
  } else if (successfullyConnected) {
    let nextPageSubTitle = ''

    if (closeOnSuccess) {
      nextPageSubTitle = 'This window should close automatically...'
    } else if (redirectUrlLabel) {
      nextPageSubTitle = `Redirecting you to ${redirectUrlLabel}...`
    } else {
      nextPageSubTitle = 'Redirecting you...'
    }

    resultProps = {
      status: 'success',
      subTitle: nextPageSubTitle,
      title: 'Connection established!',
    }
  } else {
    // Connection must have failed
    resultProps = {
      status: 'error',
      subTitle: 'Try reconnecting or contact us',
      title: 'Something went wrong!',
    }
  }

  return (
    <Wrapper className={className}>
      <Result {...resultProps} />
    </Wrapper>
  )
}

export default ProviderConnection
