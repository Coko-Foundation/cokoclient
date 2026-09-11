import { css } from 'styled-components'

import { th } from '../../toolkit'

export const inputShadow = css`
  transition: outline 0s;

  &:focus {
    box-shadow: 0 0 2px ${th('colorPrimary')};
    outline: ${(props): string => `${props.theme.lineWidth * 4}`}px solid
      ${th('colorPrimaryBorder')};
    outline-offset: 1px;
  }
`
