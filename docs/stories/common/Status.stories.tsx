import { ReactNode } from 'react'

import { Status } from '../../../src/ui'

export const NotSubmitted = (): ReactNode => <Status status="Not Submitted" />
export const Submitted = (): ReactNode => <Status status="Submitted" />
export const Rejected = (): ReactNode => <Status status="Rejected" />
export const UnderReview = (): ReactNode => <Status status="Under Review" />
export const InProduction = (): ReactNode => <Status status="In Production" />
export const Published = (): ReactNode => <Status status="Published" />
