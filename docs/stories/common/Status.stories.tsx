import { ReactElement } from 'react'

import { Status } from '../../../src/ui'
import preview from '../../../.storybook/preview'

const meta = preview.meta({
  component: Status,
  title: 'Common/Status',
})

export const NotSubmitted = meta.story({
  render: (): ReactElement => <Status status="Not Submitted" />,
})
export const Submitted = meta.story({
  render: (): ReactElement => <Status status="Submitted" />,
})
export const Rejected = meta.story({
  render: (): ReactElement => <Status status="Rejected" />,
})
export const UnderReview = meta.story({
  render: (): ReactElement => <Status status="Under Review" />,
})
export const InProduction = meta.story({
  render: (): ReactElement => <Status status="In Production" />,
})
export const Published = meta.story({
  render: (): ReactElement => <Status status="Published" />,
})
