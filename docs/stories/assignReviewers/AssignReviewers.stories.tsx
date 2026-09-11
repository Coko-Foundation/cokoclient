import { useEffect, useState, ReactElement } from 'react'
import styled from 'styled-components'
import { faker } from '@faker-js/faker'

import { grid } from '../../../src/toolkit'
import { uniq } from '../../../src/toolkit/funcs'
import AssignReviewers, {
  type AdditionalReviewerColumn,
  type Reviewer as BaseReviewer,
} from '../../../src/ui/assignReviewers/AssignReviewers'
import { type AdditionalSearchField } from '../../../src/ui/assignReviewers/SearchBox'
import { DateParser, Note } from '../../../src/ui'
import preview from '../../../.storybook/preview'

const meta = preview.meta({
  component: AssignReviewers,
  title: 'Assign Reviewers/AssignReviewers',
})

const Wrapper = styled.div`
  margin-bottom: 100px;
`

const InteractiveWrapper = styled.div``

const StyledNote = styled(Note)`
  margin-bottom: ${grid(2)};
`

const Separator = styled.div`
  border-bottom: 2px solid gray;
  margin: 32px 0;
`

const ButtonsWrapper = styled.div`
  > button {
    margin-right: 4px;
  }
`

type Reviewer = BaseReviewer & {
  // displayName: string
  // email: string
  // id: string
  // invited: boolean
  // invitationRevoked: boolean
  isSignedUp: boolean
  // acceptedInvitation: boolean
  // rejectedInvitation: boolean
  // reviewSubmitted: boolean
  topics: string
  assessmentTraining: boolean
  languageTraining: boolean
  lastUpdated: Date
}

type ReviewerOption = Reviewer & {
  label: string
  value: string
}

const makeReviewers = (n: number): Reviewer[] =>
  Array.from(Array(n)).map(() => ({
    displayName: faker.person.fullName(),
    email: faker.internet.email(),
    id: faker.string.uuid(),
    invited: false,
    invitationRevoked: false,
    isSignedUp: true,
    acceptedInvitation: false,
    rejectedInvitation: false,
    reviewSubmitted: false,
    topics: faker.animal.type(),
    assessmentTraining: Math.random() > 0.5,
    languageTraining: Math.random() > 0.5,
    lastUpdated: faker.date.recent({ days: 180 }),
  }))

const suggestedReviewer = faker.person.fullName()

const isActive = (r: Reviewer): boolean | undefined =>
  r.invited && !r.invitationRevoked && !r.rejectedInvitation

const isAvailable = (r: Reviewer): boolean => !r.invited

const topics = uniq(Array.from(Array(20)).map(() => faker.animal.type()))

const additionalColumns = [
  {
    title: 'Topics',
    dataIndex: 'topics',
  },
  {
    title: 'Assessment Training',
    dataIndex: 'assessmentTraining',
    render: (val: any): string => (val ? 'Yes' : ''),
    sorter: (a: Reviewer, b: Reviewer): number =>
      Number(a.assessmentTraining) - Number(b.assessmentTraining),
  },
  {
    title: 'Language Training',
    dataIndex: 'languageTraining',
    render: (val: any): string => (val ? 'Yes' : ''),
    sorter: (a: Reviewer, b: Reviewer): number =>
      Number(a.languageTraining) - Number(b.languageTraining),
  },
  {
    title: 'Last Updated',
    dataIndex: 'lastUpdated',
    render: (val: any): ReactElement => (
      <DateParser dateFormat="ddd D MMM | HH:mm" timestamp={val.getTime()} />
    ),
    sorter: (a: Reviewer, b: Reviewer): number =>
      a.lastUpdated.getTime() - b.lastUpdated.getTime(),
    align: 'right',
  },
]

const additionalSearchFields = [
  {
    label: 'Assessment Training',
    value: 'assessmentTraining',
  },
  {
    label: 'Language Training',
    value: 'languageTraining',
  },
  {
    label: 'Topics',
    value: 'topics',
    items: topics,
  },
]

type TemplateProps = {
  additionalReviewerColumns?: AdditionalReviewerColumn[]
  additionalSearchFields?: AdditionalSearchField[]
  showInteractiveContent: boolean
  suggestedReviewerName: string
  useShowEmail: boolean
}

const Template = ({
  showInteractiveContent,
  ...rest
}: TemplateProps): ReactElement => {
  const [reviewers, setReviewers] = useState(makeReviewers(40))
  const [pool, setPool] = useState<Reviewer[]>(makeReviewers(8))
  const [sortedPool, setSortedPool] = useState<Reviewer[]>([])
  const [automation, setAutomation] = useState(false)
  const [amountOfReviewers, setAmountOfReviewers] = useState(2)

  useEffect(() => {
    /* eslint-disable-next-line react-hooks/set-state-in-effect */
    setSortedPool(pool)
  }, [pool])

  const handleAddReviewers = async (
    optionsClicked: string[],
  ): Promise<void> => {
    const newReviewers = optionToReviewerData(optionsClicked)
    setPool([...pool, ...newReviewers])
    setReviewers(
      reviewers.filter(r => !newReviewers.map(nr => nr.id).includes(r.id)),
    )

    return Promise.resolve()
  }

  const handleClickRemoveRow = async (rowId: string): Promise<void> => {
    const item = pool.find(r => r.id === rowId) as Reviewer
    setPool(pool.filter(r => r.id !== rowId))
    setReviewers([item, ...reviewers])
  }

  const findAvailableSlots = (): number => {
    const active = pool.filter(r => isActive(r))
    const reviewerSlotsLeft = amountOfReviewers - active.length

    if (reviewerSlotsLeft < 0) return 0
    return reviewerSlotsLeft
  }

  const canInviteMore = (): boolean => {
    const available = findAvailableSlots()
    return available > 0
  }

  const runAutomation = (): void => {
    const reviewerSlotsLeft = findAvailableSlots()

    // invite as many as allowed
    const notInvited = sortedPool.filter(r => isAvailable(r))

    const reviewerIdsToInvite = notInvited
      .slice(0, reviewerSlotsLeft)
      .map(r => r.id)

    const poolClone = [...pool]

    reviewerIdsToInvite.forEach(id => {
      const obj = poolClone.find(i => i.id === id) as Reviewer
      const index = poolClone.indexOf(obj)
      obj.invited = true
      poolClone[index] = obj
    })

    setPool(poolClone)
  }

  const handleAmountOfReviewersChange = (
    value: number | string | null,
  ): void => {
    setAmountOfReviewers(Number(value))
  }

  const handleClickInvite = async (reviewerId: string): Promise<void> => {
    if (!canInviteMore()) return

    const poolClone = [...pool]
    const reviewer = poolClone.find(r => r.id === reviewerId) as Reviewer

    // reinvited
    if (reviewer.invited && reviewer.invitationRevoked) {
      reviewer.invitationRevoked = false
    } else {
      reviewer.invited = true
    }

    setPool(poolClone)
  }

  const handleClickRevokeInvitation = async (
    reviewerId: string,
  ): Promise<void> => {
    const poolClone = [...pool]
    const reviewer = poolClone.find(r => r.id === reviewerId) as Reviewer
    reviewer.invitationRevoked = true
    setPool(poolClone)

    if (automation) runAutomation()
  }

  const handleRejectInvitation = (): void => {
    const poolClone = [...pool]

    const reviewer = poolClone.find(
      r =>
        r.invited &&
        !r.acceptedInvitation &&
        !r.rejectedInvitation &&
        !r.invitationRevoked,
    )

    if (!reviewer) return

    reviewer.rejectedInvitation = true
    setPool(poolClone)

    if (automation) runAutomation()
  }

  const handleAcceptInvitation = (): void => {
    const poolClone = [...pool]

    const reviewer = poolClone.find(
      r =>
        r.invited &&
        !r.acceptedInvitation &&
        !r.rejectedInvitation &&
        !r.invitationRevoked,
    )

    if (!reviewer) return

    reviewer.acceptedInvitation = true
    setPool(poolClone)

    if (automation) runAutomation()
  }

  const handleSubmitReview = (): void => {
    const poolClone = [...pool]

    const reviewer = poolClone.find(
      r => r.acceptedInvitation && !r.reviewSubmitted,
    )

    if (!reviewer) return

    reviewer.reviewSubmitted = true
    setPool(poolClone)

    if (automation) runAutomation()
  }

  const resetState = (): void => {
    setReviewers(makeReviewers(10))
    setPool(makeReviewers(8))
    setAutomation(false)
  }

  const handleAutomationChange = (toAutomate: boolean): void => {
    setAutomation(toAutomate)

    if (toAutomate) {
      runAutomation()
    }
  }

  const reviewerDataToOption = (reviewer: Reviewer): ReviewerOption => ({
    ...reviewer,
    label: reviewer.displayName,
    value: reviewer.id,
  })

  const optionToReviewerData = (options: string[]): Reviewer[] =>
    reviewers.filter(r => options.includes(r.id))

  const handleSearch = (input: string): Promise<ReviewerOption[]> =>
    new Promise(resolve => {
      setTimeout(() => {
        if (!input) {
          resolve([])
        }

        const lowerCaseInput = input.toLowerCase()

        const results = reviewers
          .filter((person: Reviewer) => {
            if (person.displayName.toLowerCase().includes(lowerCaseInput)) {
              return true
            }

            let foundMatchingField = false

            additionalSearchFields.forEach(field => {
              const fieldValue = person[field.value]

              if (
                field.label.toLocaleLowerCase().includes(lowerCaseInput) &&
                typeof fieldValue === 'boolean' &&
                fieldValue
              ) {
                foundMatchingField = true
              } else if (fieldValue && Array.isArray(fieldValue)) {
                fieldValue.forEach((entry: string) => {
                  if (entry.toLowerCase().includes(lowerCaseInput)) {
                    foundMatchingField = true
                  }
                })
              } else if (
                field.items &&
                typeof fieldValue === 'string' &&
                fieldValue.toLowerCase().includes(lowerCaseInput)
              ) {
                foundMatchingField = true
              }
            })

            return foundMatchingField
          })
          .map(reviewer => reviewerDataToOption(reviewer))

        resolve(results)
      }, 1000)
    })

  return (
    <Wrapper>
      {showInteractiveContent && (
        <InteractiveWrapper>
          <StyledNote>
            Add reviewers to the pool and order them by preference via drag and
            drop. Starting the automation will invite the first{' '}
            {amountOfReviewers} reviewers it finds from the top of the list that
            are available. While automation is on, revoking or rejecting an
            invitation will move to find a new reviewer. You can also invite or
            revoke invitations manually, as long as you are allowed to (eg.
            cannot invite more than {amountOfReviewers} reviewers). Automation
            can be turned off at any point. The buttons below simulate what
            would happen for certain events that would be triggered server-side.
            The reset button will bring this demo to its original state with new
            data.
          </StyledNote>

          <ButtonsWrapper>
            <button onClick={handleAcceptInvitation} type="button">
              Reviewer accepts invitation
            </button>

            <button onClick={handleRejectInvitation} type="button">
              Reviewer rejects invitation
            </button>

            <button onClick={handleSubmitReview} type="button">
              Reviewer submits review
            </button>

            <button onClick={resetState} type="button">
              Reset state
            </button>
          </ButtonsWrapper>

          <Separator />
        </InteractiveWrapper>
      )}

      <AssignReviewers
        {...rest}
        amountOfReviewers={amountOfReviewers}
        automate={automation}
        canInviteMore={canInviteMore()}
        onAddReviewers={handleAddReviewers}
        onAmountOfReviewersChange={handleAmountOfReviewersChange}
        onAutomationChange={handleAutomationChange}
        onClickInvite={handleClickInvite}
        onClickRemoveRow={handleClickRemoveRow}
        onClickRevokeInvitation={handleClickRevokeInvitation}
        onSearch={handleSearch}
        onTableChange={data => setPool(data as Reviewer[])}
        reviewerPool={pool}
      />
    </Wrapper>
  )
}

export const Base = meta.story({
  render: (): ReactElement => (
    <Template
      showInteractiveContent
      suggestedReviewerName={suggestedReviewer}
      useShowEmail
    />
  ),
})

export const AdditionalFields = meta.story({
  render: (): ReactElement => (
    <Template
      additionalReviewerColumns={additionalColumns}
      additionalSearchFields={additionalSearchFields}
      showInteractiveContent={false}
      suggestedReviewerName={suggestedReviewer}
      useShowEmail
    />
  ),
})
