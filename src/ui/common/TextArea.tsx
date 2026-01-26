import React from 'react'
// import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Input } from 'antd'

const StyledTextArea = styled(Input.TextArea)``

const TextArea = props => {
  const { className, ...rest } = props

  return <StyledTextArea className={className} {...rest} />
}

TextArea.propTypes = {}

export default TextArea
