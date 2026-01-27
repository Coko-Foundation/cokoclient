import { css, CSSObject, Interpolation, RuleSet } from 'styled-components'
import { th } from './themeHelper'

type ThemeGetter = (props: {
  theme: Record<string, unknown>
}) => Interpolation<object>

type MediaSizes = {
  mobileUp: ThemeGetter
  tabletPortraitUp: ThemeGetter
  tabletLandscapeUp: ThemeGetter
  desktopUp: ThemeGetter
}

type MediaFunction = (
  first: CSSObject | TemplateStringsArray,
  ...rest: Interpolation<object>[]
) => RuleSet

type Media = {
  [K in keyof MediaSizes]: MediaFunction
}

const sizes: MediaSizes = {
  mobileUp: th('breakpoints.0'),
  tabletPortraitUp: th('breakpoints.1'),
  tabletLandscapeUp: th('breakpoints.2'),
  desktopUp: th('breakpoints.3'),
}

const media = (Object.keys(sizes) as Array<keyof MediaSizes>).reduce(
  (acc, label) => {
    acc[label] = (
      first: CSSObject | TemplateStringsArray,
      ...rest: Interpolation<object>[]
    ) => css`
      @media (min-width: ${sizes[label]}px) {
        ${css(first as TemplateStringsArray, ...rest)};
      }
    `
    return acc
  },
  {} as Media,
)

export default media
