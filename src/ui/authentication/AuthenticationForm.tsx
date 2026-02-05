import { ReactNode } from 'react'
import styled from 'styled-components'

import { grid, type ThemeValue } from '../../toolkit'

import { Form, Button, Link } from '../common'

type AuthenticationFormProps = {
  children?: ReactNode
  className?: string
  onSubmit: () => void
  alternativeActionLabel?: string
  alternativeActionLink?: string
  errorMessage?: string
  forgotPasswordUrl?: string
  hasError?: boolean
  loading?: boolean
  showForgotPassword?: boolean
  submitButtonLabel?: string
  title?: string
}

const Wrapper = styled.div``

const SubmitButton = styled(Button)`
  width: 100%;
`

const Footer = styled.div<{ $showForgotPassword?: boolean }>`
  display: flex;
  justify-content: ${(props): ThemeValue =>
    props.$showForgotPassword ? 'space-between' : 'flex-end'};
  margin-top: ${grid(4)};
`

const ForgotPassword = styled.div`
  > a {
    color: ${(props): ThemeValue => props.theme.colorText};
  }
`

const AlternativeAction = styled.div`
  font-weight: bold;

  > a {
    color: ${(props): ThemeValue => props.theme.colorText};
  }
`

const AuthenticationForm = (props: AuthenticationFormProps): ReactNode => {
  const {
    alternativeActionLabel,
    alternativeActionLink,
    className,
    children,
    errorMessage,
    forgotPasswordUrl = '/request-password-reset',
    hasError = false,
    loading = false,
    onSubmit,
    showForgotPassword = false,
    submitButtonLabel = 'Submit',
  } = props

  return (
    <Wrapper className={className}>
      <Form
        layout="vertical"
        onFinish={onSubmit}
        ribbonMessage={errorMessage}
        submissionStatus={hasError ? 'error' : null}
      >
        {children}

        <SubmitButton htmlType="submit" loading={loading} type="primary">
          {submitButtonLabel}
        </SubmitButton>
      </Form>

      {alternativeActionLabel && alternativeActionLink && (
        <Footer $showForgotPassword={showForgotPassword}>
          {showForgotPassword && (
            <ForgotPassword>
              <Link to={forgotPasswordUrl}>Forgot your password?</Link>
            </ForgotPassword>
          )}

          <AlternativeAction>
            <Link to={alternativeActionLink}>{alternativeActionLabel}</Link>
          </AlternativeAction>
        </Footer>
      )}
    </Wrapper>
  )
}

export default AuthenticationForm
