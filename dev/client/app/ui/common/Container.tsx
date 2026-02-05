import styled, { css } from 'styled-components'

import { ThemeValue } from '../../../../../src'

const Container = styled.div<{ $second?: boolean }>`
  display: flex;
  flex-direction: column;
  min-height: 100%;

  /* stylelint-disable-next-line no-descending-specificity */
  > div:first-child {
    align-self: center;
    margin: 20px 0;
  }

  a {
    padding: 4px;
    text-decoration: none;
    text-transform: uppercase;

    &:hover {
      outline: 2px solid ${(props): ThemeValue => props.theme.colorBorder};
    }
  }

  ${(props): ThemeValue =>
    !!props.$second &&
    css`
      align-items: center;
      /* justify-content: center; */
    `}
`

export default Container
