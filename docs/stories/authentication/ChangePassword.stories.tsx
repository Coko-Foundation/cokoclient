/* eslint-disable no-console */
/* eslint-disable react-hooks/rules-of-hooks */

import { useState, ReactElement } from 'react'

import { ChangePassword, Checkbox } from '../../../src/ui'
import { type PasswordFormData } from '../../../src/ui/authentication/ChangePassword'
import preview from '../../../.storybook/preview'

const meta = preview.meta({
  component: ChangePassword,
  title: 'Authentication/ChangePassword',
})

export const Base = meta.story({
  render: (): ReactElement => {
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [submissionStatus, setSubmissionStatus] = useState<
      'success' | 'error' | 'danger' | undefined
    >()

    const [error, setError] = useState(false)

    const handleSubmit = (vals: PasswordFormData): void => {
      console.log(vals)
      console.log(error)
      setLoading(true)

      setTimeout(() => {
        setLoading(false)

        if (!error) {
          setMessage('Password changed successfully')
          setSubmissionStatus('success')
        } else {
          setMessage('There was an error, please try again')
          setSubmissionStatus('error')
        }
      }, 1000)
    }

    return (
      <>
        <p>
          <Checkbox checked={error} onChange={() => setError(!error)}>
            Check and submit the form to see error state
          </Checkbox>
        </p>

        <ChangePassword
          loading={loading}
          message={message}
          onSubmit={handleSubmit}
          submissionStatus={submissionStatus}
        />
      </>
    )
  },
})
