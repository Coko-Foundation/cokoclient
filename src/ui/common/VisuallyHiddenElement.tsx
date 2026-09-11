import styled from 'styled-components'

const VisuallyHiddenElement = styled.span`
  /* stylelint-disable declaration-no-important */
  border: 0 !important;
  clip-path: inset(50%) !important;
  height: 1px !important;
  margin: -1px !important;
  overflow: hidden !important;
  padding: 0 !important;
  position: absolute !important;
  white-space: nowrap !important;
  width: 1px !important;
`

const HiddenElement = (props: any): any => <VisuallyHiddenElement {...props} />

export default HiddenElement
