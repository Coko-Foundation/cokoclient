import React from 'react'
import { Link } from 'react-router-dom'
import AuthenticationForm from './AuthenticationForm'
import AuthenticationHeader from './AuthenticationHeader'
import AuthenticationWrapper from './AuthenticationWrapper'
import SuccessSubTitle from './SuccessSubTitle'
import { Form, Input, Paragraph, Result, Page } from '../common'

type RequestPasswordResetFormProps = {
  hasError?: boolean
  loading?: boolean
  onSubmit: () => void
}

type RequestPasswordResetProps = {
  className?: string
  hasError?: boolean
  hasSuccess?: boolean
  loading?: boolean
  onSubmit: () => void
  userEmail?: string
}

const RequestPasswordResetForm = (
  props: RequestPasswordResetFormProps,
): React.ReactNode => {
  const { hasError, loading, onSubmit } = props

  return (
    <AuthenticationForm
      alternativeActionLabel="Return to login form"
      alternativeActionLink="/login"
      errorMessage="Something went wrong! Please contact the administrator."
      hasError={hasError}
      loading={loading}
      onSubmit={onSubmit}
      // submitButtonLabel="Send"
    >
      <Paragraph>
        Please enter the email address connected to your account.
      </Paragraph>

      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: 'Email is required' },
          { type: 'email', message: "Doesn't look like a valid email" },
        ]}
      >
        <Input placeholder="Enter your email" />
      </Form.Item>
    </AuthenticationForm>
  )
}

const RequestPasswordReset = (
  props: RequestPasswordResetProps,
): React.ReactNode => {
  const {
    className,
    hasError = false,
    hasSuccess = false,
    loading = false,
    onSubmit,
    userEmail = null,
  } = props

  return (
    <Page maxWidth={600}>
      <AuthenticationWrapper className={className}>
        <AuthenticationHeader>Request password reset</AuthenticationHeader>

        {hasSuccess && (
          <div role="alert">
            <Result
              data-testid="result-request-password-success"
              extra={[
                <Link key={1} to="/login">
                  Return to the login form
                </Link>,
              ]}
              status="success"
              subTitle={<SuccessSubTitle userEmail={userEmail} />}
              title="Request successful!"
            />
          </div>
        )}

        {!hasSuccess && (
          <RequestPasswordResetForm
            hasError={hasError}
            loading={loading}
            onSubmit={onSubmit}
          />
        )}
      </AuthenticationWrapper>
    </Page>
  )
}

export default RequestPasswordReset
