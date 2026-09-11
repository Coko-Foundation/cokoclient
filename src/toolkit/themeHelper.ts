import { DefaultTheme, Interpolation } from 'styled-components'

import { get } from './funcs'

type StyledProps = { theme: DefaultTheme }
export type ThemeValue = Interpolation<object>

/**
 * Returns multiples of gridUnit.
 *
 * It lets you replace statements like this:
 *    calc(${th('gridUnit')} * 4)
 * to this:
 *    ${grid(4)}
 *
 */
const grid =
  (value: number) =>
  (props: StyledProps): string =>
    `calc(${props.theme.gridUnit} * ${value})`

/**
 * A bit of syntactic sugar for styled-components. Lets you replace this:
 *
 * ${props => props.theme.colorPrimary}
 *
 * with this:
 *
 * ${th('colorPrimary')}
 *
 * This is called 'th' (theme helper) for historic reasons
 */
const th =
  (name: string) =>
  (props: StyledProps): ThemeValue =>
    get(props.theme, name) as ThemeValue

/**
 * returns color from theme object, based on validation status
 */
type ValidationStatus = 'error' | 'success' | 'default' | 'warning'

type ValidationColorProps = {
  theme: {
    colorError: string
    colorSuccess: string
    colorBorder: string
    colorWarning: string
  }
  validationStatus?: ValidationStatus
}

const validationColor = ({
  theme,
  validationStatus = 'default',
}: ValidationColorProps): string =>
  ({
    error: theme.colorError,
    success: theme.colorSuccess,
    default: theme.colorBorder,
    warning: theme.colorWarning,
  })[validationStatus]

export { grid, th, validationColor }
