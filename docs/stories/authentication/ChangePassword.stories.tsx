/* eslint-disable no-console */

import { ReactNode, useState } from 'react'

import { ChangePassword, Checkbox } from '../../../src/ui'
import { type PasswordFormData } from '../../../src/ui/authentication/ChangePassword'

export const Base = (): ReactNode => {
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
}
