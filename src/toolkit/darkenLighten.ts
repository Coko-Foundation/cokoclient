/*
  Functions to change the shade of a color.

  Valid input for the Color function is defined at https://github.com/Qix-/color.

  eg.
  darken('#AAAAAA', 0.3)
  lighten('#AAA', 0.7)
  darken('rgb(255, 255, 255)', 0.2)

  It will also accept a valid variable defined in your theme instead.

  eg.
  darken('colorPrimary', 0.3)
  lighten('someProperty.customColor', 0.5)

  Percent can be either a decimal point or an integer.

  eg. these two functions will evaluate to the same thing
  darken('colorPrimary', 0.5)
  darken('colorPrimary', 50)
*/

import Color from 'color'
import { DefaultTheme } from 'styled-components'

import { get } from './funcs'

type ThemedProps = { theme: DefaultTheme }

const normalizePercent = (num: number): number =>
  num >= 1 && num <= 100 ? num / 100 : num

const darkenLighten = (
  original: string,
  percent: number,
  props: ThemedProps,
  dark: boolean,
): string => {
  const color = get(props.theme, original) || original
  const thisMuch = normalizePercent(percent)

  let converted

  try {
    /* eslint-disable-next-line new-cap */
    converted = Color(color)
  } catch (_) {
    /* eslint-disable-next-line new-cap */
    converted = Color('black')
  }

  if (dark) return converted.darken(thisMuch).string()
  return converted.lighten(thisMuch).string()
}

const darken =
  (original: string, percent: number) =>
  (props: ThemedProps): string =>
    darkenLighten(original, percent, props, true)

const lighten =
  (original: string, percent: number) =>
  (props: ThemedProps): string =>
    darkenLighten(original, percent, props, false)

export { darken, lighten }
