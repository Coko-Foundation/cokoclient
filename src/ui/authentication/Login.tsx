import React from 'react'

import { Form, Input, Page } from '../common'
import AuthenticationForm from './AuthenticationForm'
import AuthenticationHeader from './AuthenticationHeader'
import AuthenticationWrapper from './AuthenticationWrapper'

type LoginProps = {
  className?: string
  errorMessage?: string
  hasError?: boolean
  loading?: boolean
  onSubmit: () => void
}

const Login = (props: LoginProps): React.ReactNode => {
  const {
    className,
    errorMessage,
    hasError = false,
    loading = false,
    onSubmit,
  } = props

  return (
    <Page maxWidth={600}>
      <AuthenticationWrapper className={className}>
        <AuthenticationHeader>Login</AuthenticationHeader>

        <AuthenticationForm
          alternativeActionLabel="Do you want to signup instead?"
          alternativeActionLink="/signup"
          errorMessage={errorMessage}
          hasError={hasError}
          loading={loading}
          onSubmit={onSubmit}
          showForgotPassword
          submitButtonLabel="Log in"
          title="Login"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: 'Email is required',
              },
              {
                type: 'email',
                message: 'This is not a valid email address',
              },
            ]}
          >
            <Input
              autoComplete="email"
              placeholder="Please enter your email"
              type="email"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Password is required' }]}
          >
            <Input
              autoComplete="current-password"
              placeholder="Please enter your password"
              type="password"
            />
          </Form.Item>
        </AuthenticationForm>
      </AuthenticationWrapper>
    </Page>
  )
}

export default Login
