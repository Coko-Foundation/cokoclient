import { ReactElement } from 'react'
import { LinkWithoutStyles } from '../../../src/ui'
import preview from '../../../.storybook/preview'

const meta = preview.meta({
  component: LinkWithoutStyles,
  title: 'Common/LinkWithoutStyles',
})

export const Base = meta.story({
  render: (): ReactElement => (
    <LinkWithoutStyles>
      This content is wrapper with a link tag but has no link styles
    </LinkWithoutStyles>
  ),
})
