import React from 'react'
import { faker } from '@faker-js/faker'

import { SuccessSubTitle } from '../../../src/ui'

export const Base = () => <SuccessSubTitle userEmail={faker.internet.email()} />

