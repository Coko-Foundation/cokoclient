import { ReactElement } from 'react'
import { faker } from '@faker-js/faker'

import SuggestedReviewer from '../../../src/ui/assignReviewers/SuggestedReviewer'
import preview from '../../../.storybook/preview'

const meta = preview.meta({
  component: SuggestedReviewer,
  title: 'Assign Reviewers/SuggestedReviewer',
})

export const Base = meta.story({
  render: (): ReactElement => (
    <SuggestedReviewer name={faker.person.fullName()} />
  ),
})
