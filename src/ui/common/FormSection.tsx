import React from 'react'
import styled from 'styled-components'
import { grid } from '../../toolkit'

import Divider from './Divider'
import { H2 } from './Headings'

type FormSectionProps = {
  className?: string
  children?: React.ReactNode
  /** Label to display as heading above section */
  label?: string | null
  last?: boolean
}

const Wrapper = styled.div`
  > div:first-child {
    padding: 0 ${grid(4)};
  }
`

const FormSection = (props: FormSectionProps): React.ReactNode => {
  const { className, children, label = null, last = false } = props

  return (
    <Wrapper className={className}>
      <div>
        <H2>{label}</H2>
        {children}
      </div>

      {!last && <Divider />}
    </Wrapper>
  )
}

export default FormSection
