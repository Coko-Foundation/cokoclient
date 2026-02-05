import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { FormInstance } from 'antd'

import { grid } from '../../toolkit'
import { noop } from '../../toolkit/funcs'
import { Form, Button, VisuallyHiddenElement } from '../common'

type ProfileFormProps = {
  children?: ReactNode
  className?: string
  form?: FormInstance
  loading?: boolean
  message?: string
  onSubmit: () => void
  showSecondaryButton?: boolean
  secondaryButtonAction?: () => void
  secondaryButtonLabel?: string
  submitButtonLabel?: string
  submissionStatus?: 'success' | 'error' | 'danger'
}

const Wrapper = styled.div``

const FormButtonsContainer = styled.div`
  display: flex;
  gap: ${grid(1)};
  justify-content: right;
  padding: 0 ${grid(4)};
`

const ProfileForm = (props: ProfileFormProps): React.ReactNode => {
  const {
    children,
    className,
    message = '',
    form,
    loading = false,
    onSubmit,
    showSecondaryButton = false,
    secondaryButtonAction = noop,
    secondaryButtonLabel = 'Cancel',
    submitButtonLabel = 'Save',
    submissionStatus,
    ...rest
  } = props

  return (
    <Wrapper className={className}>
      <Form
        form={form}
        layout="vertical"
        onFinish={onSubmit}
        ribbonMessage={message}
        ribbonPosition="bottom"
        submissionStatus={submissionStatus}
        {...rest}
      >
        {children}

        <FormButtonsContainer>
          {showSecondaryButton && (
            <Button disabled={loading} onClick={secondaryButtonAction}>
              {secondaryButtonLabel}
            </Button>
          )}

          <Button
            data-testid="profile-form-submit-button"
            htmlType="submit"
            loading={loading}
            type="primary"
          >
            {submitButtonLabel}
          </Button>
        </FormButtonsContainer>

        {loading && (
          <VisuallyHiddenElement role="status">
            Saving profile
          </VisuallyHiddenElement>
        )}
      </Form>
    </Wrapper>
  )
}

export default ProfileForm
