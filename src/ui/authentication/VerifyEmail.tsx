import React from 'react'
import styled from 'styled-components'

import { Button, Spin, Result } from '../common'

type VerifyEmailProps = {
  className?: string
  verifying?: boolean
  successfullyVerified?: boolean
  alreadyVerified?: boolean
  expired?: boolean
  resend: () => void
  resending?: boolean
  resent?: boolean
  redirectToLogin: () => void
  redirectDelay?: number
}

const Wrapper = styled.div``

const VerifyEmail = (props: VerifyEmailProps): React.ReactNode => {
  const {
    className,
    verifying = false,
    successfullyVerified = false,
    alreadyVerified = false,
    expired = false,
    resend,
    resending = false,
    resent = false,
    redirectToLogin,
    redirectDelay = 3000,
  } = props

  const redirect = (): void => {
    setTimeout(() => {
      redirectToLogin()
    }, redirectDelay)
  }

  if (verifying)
    return (
      <Wrapper className={className}>
        <Result
          icon={<Spin size={18} spinning />}
          title="Verifying your email address..."
        />
      </Wrapper>
    )

  if (successfullyVerified) {
    redirect()

    return (
      <Wrapper className={className}>
        <Result
          status="success"
          subTitle="Redirecting you to login..."
          title="Email successfully verified!"
        />
      </Wrapper>
    )
  }

  if (alreadyVerified) {
    redirect()

    return (
      <Wrapper className={className}>
        <Result
          status="success"
          subTitle="Redirecting you to login..."
          title="This email has already been verified!"
        />
      </Wrapper>
    )
  }

  if (expired && !(resending || resent))
    return (
      <Wrapper className={className}>
        <Result
          extra={
            <Button onClick={resend} type="primary">
              Resend verification email
            </Button>
          }
          status="error"
          subTitle="Click the button below to get a new token"
          title="Your verification token has expired!"
        />
      </Wrapper>
    )

  if (resending)
    return (
      <Wrapper className={className}>
        <Result
          icon={<Spin size={18} spinning />}
          title="Sending verification email..."
        />
      </Wrapper>
    )

  if (resent)
    return (
      <Wrapper className={className}>
        <Result
          status="success"
          subTitle="Check your email for further instructions"
          title="New verification email has been sent!"
        />
      </Wrapper>
    )

  // if (hasError)
  return (
    <Wrapper className={className}>
      <Result
        status="error"
        subTitle="Try reloading the page or contact us"
        title="Something went wrong!"
      />
    </Wrapper>
  )

  // return null
}

export default VerifyEmail
