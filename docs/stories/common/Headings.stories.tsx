import { ReactElement } from 'react'

import { H1, H2, H3, H4, H5 } from '../../../src/ui'
import preview from '../../../.storybook/preview'

const meta = preview.meta({
  component: H1,
  title: 'Common/Headings',
})

export const Base = meta.story({
  render: (): ReactElement => <H1>This is a heading 1</H1>,
})
export const HeadingTwo = meta.story({
  render: (): ReactElement => <H2>This is a heading 2</H2>,
})
export const HeadingThree = meta.story({
  render: (): ReactElement => <H3>This is a heading 3</H3>,
})
export const HeadingFour = meta.story({
  render: (): ReactElement => <H4>This is a heading 4</H4>,
})
export const HeadingFive = meta.story({
  render: (): ReactElement => <H5>This is a heading 5</H5>,
})
