import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { Row as AntRow, Col as AntCol, FormInstance } from 'antd'
import { RuleObject } from 'antd/es/form'

import { Form, FormSection, Input } from '../common'
import ProfileForm from './ProfileForm'

type ChangePasswordProps = {
  className?: string
  form?: FormInstance
  loading?: boolean
  message?: string
  onSubmit: () => void
  submissionStatus?: 'success' | 'error' | 'danger'
}

const Col = styled(AntCol)``

const Row = ({ children }: { children: ReactNode }): React.ReactNode => (
  <AntRow align="top" gutter={8}>
    {children}
  </AntRow>
)

const Wrapper = styled.div``

const ChangePassword = (props: ChangePasswordProps): React.ReactNode => {
  const {
    className,
    form,
    loading = false,
    message = '',
    onSubmit,
    submissionStatus,
    ...rest
  } = props

  return (
    <Wrapper className={className}>
      <ProfileForm
        form={form}
        loading={loading}
        message={message}
        onSubmit={onSubmit}
        submissionStatus={submissionStatus}
        {...rest}
      >
        <FormSection label="Password" last>
          <Row>
            <Col sm={12} xs={24}>
              <Form.Item
                label="Current password"
                name="currentPassword"
                rules={[
                  {
                    required: true,
                    message:
                      'Please provide current password before changing it',
                  },
                ]}
              >
                <Input
                  autoComplete="current-password"
                  data-testid="currentPassword"
                  type="password"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col sm={12} xs={24}>
              <Form.Item
                dependencies={['currentPassword']}
                label="New password"
                name="newPassword"
                rules={[
                  {
                    required: true,
                    message: 'This field is required',
                  },
                  ({ getFieldValue }): RuleObject => ({
                    validator(_, value): Promise<void> {
                      if (
                        (value && !!getFieldValue('currentPassword')) ||
                        !value
                      ) {
                        return Promise.resolve()
                      }

                      return Promise.reject(
                        new Error(
                          'You must first provide the current password in order to change it!',
                        ),
                      )
                    },
                  }),
                ]}
              >
                <Input
                  autoComplete="new-password"
                  data-testid="newPassword"
                  type="password"
                />
              </Form.Item>
            </Col>

            <Col sm={12} xs={24}>
              <Form.Item
                dependencies={['newPassword']}
                label="Password confirmation"
                name="newPasswordConfirmation"
                rules={[
                  {
                    required: true,
                    message: 'This field is required',
                  },
                  ({ getFieldValue }): RuleObject => ({
                    validator(_, value): Promise<void> {
                      if (!value || getFieldValue('newPassword') === value) {
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
                <Input
                  autoComplete="new-password"
                  data-testid="newPasswordConfirmation"
                  type="password"
                />
              </Form.Item>
            </Col>
          </Row>
        </FormSection>
      </ProfileForm>
    </Wrapper>
  )
}

export default ChangePassword
