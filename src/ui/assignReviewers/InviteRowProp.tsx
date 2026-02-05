import React from 'react'
import styled from 'styled-components'
import { CloseOutlined } from '@ant-design/icons'

import { grid } from '../../toolkit'
import { noop } from '../../toolkit/funcs'
import { Button, InviteStatus } from '../common'
import { type Status } from '../common/InviteStatus'

type ReviewerData = {
  id: string
  invited?: boolean
  acceptedInvitation?: boolean
  rejectedInvitation?: boolean
  invitationRevoked?: boolean
  reviewSubmitted?: boolean
}

type InviteRowPropProps = {
  canInvite?: boolean
  canDismissReviewer?: boolean
  className?: string
  data: ReviewerData
  onClickInvite?: (id: string) => void
  onClickRemove?: (id: string) => void
  onClickRevokeInvitation?: (id: string) => void
  type: 'status' | 'action' | 'remove'
}

const StyledInviteStatus = styled(InviteStatus)`
  font-size: 12px;
  margin: 0 ${grid(1)};
`

const InviteStatusWrapper = styled.div`
  display: inline-block;
`

const InviteActionWrapper = styled.div``

const RemoveInviteWrapper = styled.div`
  &:hover {
    cursor: pointer;
  }
`

const InviteRowProp = (props: InviteRowPropProps): React.ReactNode => {
  const {
    canInvite = false,
    canDismissReviewer = false,
    className,
    data,
    onClickInvite = noop,
    onClickRemove = noop,
    onClickRevokeInvitation = noop,
    type,
  } = props

  const {
    id,
    invited,
    acceptedInvitation,
    rejectedInvitation,
    invitationRevoked,
    reviewSubmitted,
  } = data

  const reviewPending = invited && acceptedInvitation && !reviewSubmitted
  const submitted = invited && acceptedInvitation && reviewSubmitted
  const rejected = invited && rejectedInvitation
  const revoked = invited && invitationRevoked

  const responsePending =
    invited && !invitationRevoked && !acceptedInvitation && !rejectedInvitation

  const notInvited = !invited && !invitationRevoked

  const makeStatusText = (): string | null => {
    if (reviewPending) return 'accepted invitation - pending review'
    if (submitted) return 'review submitted'
    if (rejected) return 'rejected invitation'
    if (revoked) return 'invitation revoked'
    if (responsePending) return 'invited'
    if (notInvited) return 'not invited'
    return null
  }

  const makeStatus = (): Status | null => {
    if (reviewPending) return 'success'
    if (submitted) return 'primary'
    if (rejected) return 'error'
    if (revoked) return 'error'
    if (responsePending) return 'success'
    if (notInvited) return null
    return null
  }

  const handleRemove = (): void => {
    onClickRemove(id)
  }

  if (type === 'status') {
    return (
      <InviteStatusWrapper className={className}>
        <StyledInviteStatus reverseColors status={makeStatus()}>
          {makeStatusText()}
        </StyledInviteStatus>
      </InviteStatusWrapper>
    )
  }

  if (type === 'action') {
    return (
      <InviteActionWrapper className={className}>
        {notInvited && (
          <Button
            disabled={!canInvite}
            onClick={() => onClickInvite(id)}
            type="primary"
          >
            Invite
          </Button>
        )}

        {revoked && (
          <Button
            disabled={!canInvite}
            onClick={() => onClickInvite(id)}
            type="primary"
          >
            Reinvite
          </Button>
        )}

        {responsePending && (
          <Button onClick={() => onClickRevokeInvitation(id)} type="primary">
            Revoke invite
          </Button>
        )}
      </InviteActionWrapper>
    )
  }

  if (type === 'remove' && (notInvited || canDismissReviewer)) {
    return (
      <RemoveInviteWrapper className={className} onClick={handleRemove}>
        <CloseOutlined />
      </RemoveInviteWrapper>
    )
  }

  return null
}

export default InviteRowProp
