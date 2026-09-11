import React from 'react'

import { Paragraph, Text } from '../common'

type SuccessSubTitleProps = {
  userEmail?: string
}

const SuccessSubTitle = (props: SuccessSubTitleProps): React.ReactNode => {
  const { userEmail } = props

  return (
    <Paragraph>
      An email has been sent to <Text strong>{userEmail}</Text> containing
      further instructions.
    </Paragraph>
  )
}

export default SuccessSubTitle
