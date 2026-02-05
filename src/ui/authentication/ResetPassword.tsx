import React from 'react'
import { RuleObject } from 'antd/es/form'

import AuthenticationForm from './AuthenticationForm'
import AuthenticationHeader from './AuthenticationHeader'
import AuthenticationWrapper from './AuthenticationWrapper'
import { Form, Input, Paragraph, Result, Spin, Page } from '../common'

type ResetPasswordProps = {
  className?: string
  hasError?: boolean
  hasSuccess?: boolean
  onSubmit: () => void
  verifying?: boolean
  redirectToLogin: () => void
  redirectToLoginDelay?: number
}

const ResetPassword = (props: ResetPasswordProps): React.ReactNode => {
  const {
    className,
    hasError = false,
    hasSuccess = false,
    onSubmit,
    verifying = false,
    redirectToLogin,
    redirectToLoginDelay = 3000,
  } = props

  const success = !verifying && hasSuccess

  if (success) {
    setTimeout(() => redirectToLogin(), redirectToLoginDelay)
  }

  return (
    <Page maxWidth={600}>
      <AuthenticationWrapper className={className}>
        <AuthenticationHeader>Reset password</AuthenticationHeader>

        {verifying && <Result icon={<Spin />} title="Verifying..." />}

        {success && (
          <div role="alert">
            <Result
              status="success"
              subTitle="Redirecting you to login screen..."
              title="Password successfully changed"
            />
          </div>
        )}

        {!hasSuccess && !verifying && (
          <AuthenticationForm
            errorMessage="Something went wrong!"
            hasError={hasError}
            onSubmit={onSubmit}
            submitButtonLabel="Set new password"
          >
            {hasError && (
              <Paragraph type="danger">
                The most likely scenario is that you have already used this link
                to reset your password. If that is not the case, please contact
                the system administrator.
              </Paragraph>
            )}

            <Paragraph>
              Please provide your new password in the fields below.
            </Paragraph>

            <Form.Item
              label="New password"
              name="password"
              rules={[{ required: true, message: 'New password is required' }]}
            >
              <Input placeholder="Enter new password" type="password" />
            </Form.Item>

            <Form.Item
              label="Confirm new password"
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message: 'Please confirm your new password!',
                },
                ({ getFieldValue }): RuleObject => ({
                  validator(_, value): Promise<void> {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve()
                    }

                    return Promise.reject(
                      new Error(
                        'The two passwords that you entered do not match!',
                      ),
                    )
                  },
                }),
              ]}
            >
              <Input placeholder="Enter new password again" type="password" />
            </Form.Item>
          </AuthenticationForm>
        )}
      </AuthenticationWrapper>
    </Page>
  )
}

export default ResetPassword
