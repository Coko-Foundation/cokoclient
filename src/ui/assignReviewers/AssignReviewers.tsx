import React, { useState } from 'react'
import styled from 'styled-components'

import { grid } from '../../toolkit'
import SearchBox, { AdditionalSearchField, SearchResult } from './SearchBox'
import SuggestedReviewer from './SuggestedReviewer'
import { InputNumber, Ribbon, Switch } from '../common'
import ReviewerTable from './ReviewerTable'

const Wrapper = styled.div``

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${grid(3)};

  label:last-of-type {
    margin-top: 0;
  }
`

const ItemWrapper = styled.div``

const Head = styled.div`
  margin-bottom: ${grid(1)};
`

const HeadSecondRow = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin: ${grid(2)} ${grid(4)};

  > div > button:not(:last-child) {
    margin-right: ${grid(1)};
  }
`

const Search = styled(SearchBox)`
  margin-bottom: ${grid(1)};
`

const StyledRibbon = styled(Ribbon)`
  margin-bottom: ${grid(1)};
`

export type AdditionalReviewerColumn = {
  title: string
  dataIndex: string
}

export type Reviewer = {
  id: string
  email?: string
  displayName: string
  invited?: boolean
  acceptedInvitation?: boolean
  rejectedInvitation?: boolean
  invitationRevoked?: boolean
  reviewSubmitted?: boolean
  [key: string]: unknown
}

type AssignReviewersProps = {
  additionalReviewerColumns?: AdditionalReviewerColumn[]
  additionalSearchFields?: AdditionalSearchField[]
  amountOfReviewers: number
  automate: boolean
  canInviteMore: boolean
  canDismissReviewer?: boolean
  className?: string
  onAddReviewers: (ids: string[]) => Promise<void>
  onAmountOfReviewersChange: (value: number | string | null) => void
  onAutomationChange: (checked: boolean) => void
  onClickInvite: (id: string) => Promise<void>
  onClickRemoveRow: (id: string) => Promise<void>
  onClickRevokeInvitation: (id: string) => Promise<void>
  onSearch: (value: string) => Promise<SearchResult[]>
  onTableChange: (data: Reviewer[]) => void
  reviewerPool?: Reviewer[]
  searchPlaceholder?: string
  suggestedReviewerName?: string
  useShowEmail?: boolean
}

const AssignReviewers = ({
  additionalReviewerColumns = [],
  additionalSearchFields = [],
  amountOfReviewers,
  automate,
  canInviteMore,
  canDismissReviewer = false,
  className,
  onAddReviewers,
  onAmountOfReviewersChange,
  onAutomationChange,
  onClickInvite,
  onClickRemoveRow,
  onClickRevokeInvitation,
  onSearch,
  onTableChange,
  reviewerPool = [],
  searchPlaceholder,
  suggestedReviewerName,
  useShowEmail = false,
}: AssignReviewersProps): React.ReactNode => {
  const [showEmails, setShowEmails] = useState(false)
  const [manualSorting, setManualSorting] = useState(false)

  // Explainer text: Adding reviewers to the list won't send them an invite yet
  return (
    <Wrapper className={className}>
      {suggestedReviewerName && (
        <Top>
          <ItemWrapper>
            {suggestedReviewerName && (
              <SuggestedReviewer name={suggestedReviewerName} />
            )}
          </ItemWrapper>
        </Top>
      )}

      <Search
        additionalSearchFields={additionalSearchFields}
        onAdd={onAddReviewers}
        onSearch={onSearch}
        searchPlaceholder={searchPlaceholder}
      />

      <Head>
        <StyledRibbon status={automate ? 'success' : null}>
          Automation is {automate ? 'on' : 'off'}
        </StyledRibbon>

        <HeadSecondRow>
          <ItemWrapper>
            <Switch
              checked={automate}
              disabled={!manualSorting}
              label="Automate invites"
              labelPosition="left"
              onChange={onAutomationChange}
            />
          </ItemWrapper>
          <ItemWrapper>
            <Switch
              checked={manualSorting}
              label="Sort reviewers manually"
              labelPosition="left"
              onChange={setManualSorting}
            />
          </ItemWrapper>
          {useShowEmail && (
            <ItemWrapper>
              <Switch
                checked={showEmails}
                label="Show reviewer emails"
                labelPosition="left"
                onChange={() => setShowEmails(!showEmails)}
              />
            </ItemWrapper>
          )}

          <InputNumber
            disabled={automate}
            label="Maximum reviewers from pool"
            min={1}
            onChange={onAmountOfReviewersChange}
            value={amountOfReviewers}
          />
        </HeadSecondRow>
      </Head>

      <ReviewerTable
        additionalColumns={additionalReviewerColumns}
        canDismissReviewer={canDismissReviewer}
        canInviteMore={canInviteMore}
        manualSorting={manualSorting}
        onChange={onTableChange}
        onInvite={onClickInvite}
        onRemoveRow={onClickRemoveRow}
        onRevokeInvitation={onClickRevokeInvitation}
        reviewers={reviewerPool}
        showEmails={showEmails}
      />
    </Wrapper>
  )
}

export default AssignReviewers
