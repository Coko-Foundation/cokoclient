import { ReactNode } from 'react'
import { faker } from '@faker-js/faker'

import SuggestedReviewer from '../../../src/ui/assignReviewers/SuggestedReviewer'

export const Base = (): ReactNode => (
  <SuggestedReviewer name={faker.person.fullName()} />
)
