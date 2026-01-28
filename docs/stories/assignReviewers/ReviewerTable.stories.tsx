import React, { useState } from 'react'
import { faker } from '@faker-js/faker'

import ReviewerTable from '../../../src/ui/assignReviewers/ReviewerTable'
import { DateParser, Switch } from '../../../src/ui'

const emptyFunc = async () => {}

type StoryReviewer = {
  displayName: string
  id: string
  isSignedUp: boolean
  email: string
  topics: string
  assessmentTraining: boolean
  languageTraining: boolean
  lastUpdated: Date
}

const makeReviewers = (n: number): StoryReviewer[] =>
  Array.from(Array(n)).map(() => ({
    displayName: faker.person.fullName(),
    id: faker.string.uuid(),
    isSignedUp: true,
    email: faker.internet.email(),
    topics: faker.animal.type(),
    assessmentTraining: Math.random() > 0.5,
    languageTraining: Math.random() > 0.5,
    lastUpdated: faker.date.recent({ days: 180 }),
  }))

export const Base = () => {
  const [reviewers, setReviewers] = useState(makeReviewers(8))

  const onClickRemoveRow = async (rowId: string) => {
    setReviewers(reviewers.filter(r => r.id !== rowId))
  }

  const handleChange = (data: { id: string }[]) => {
    setReviewers(data as StoryReviewer[])
  }

  return (
    <ReviewerTable
      canInviteMore={false}
      onChange={handleChange}
      onInvite={emptyFunc}
      onRemoveRow={onClickRemoveRow}
      onRevokeInvitation={emptyFunc}
      reviewers={reviewers}
    />
  )
}

export const Empty = () => {
  return (
    <ReviewerTable
      canInviteMore={false}
      onChange={emptyFunc}
      onInvite={emptyFunc}
      onRemoveRow={emptyFunc}
      onRevokeInvitation={emptyFunc}
    />
  )
}

export const ShowEmails = () => {
  const [reviewers, setReviewers] = useState(makeReviewers(8))

  const onClickRemoveRow = async (rowId: string) => {
    setReviewers(reviewers.filter(r => r.id !== rowId))
  }

  const handleChange = (data: { id: string }[]) => {
    setReviewers(data as StoryReviewer[])
  }

  return (
    <ReviewerTable
      canInviteMore={false}
      onChange={handleChange}
      onInvite={emptyFunc}
      onRemoveRow={onClickRemoveRow}
      onRevokeInvitation={emptyFunc}
      reviewers={reviewers}
      showEmails
    />
  )
}

export const AdditionalColumns = () => {
  const [reviewers, setReviewers] = useState(makeReviewers(8))
  const [manualSorting, setManualSorting] = useState(false)

  const onClickRemoveRow = async (rowId: string) => {
    setReviewers(reviewers.filter(r => r.id !== rowId))
  }

  const handleChange = (data: { id: string }[]) => {
    setReviewers(data as StoryReviewer[])
  }

  const additionalColumns = [
    {
      title: 'Topics',
      dataIndex: 'topics',
    },
    {
      title: 'Assessment Training',
      dataIndex: 'assessmentTraining',
      render: (val: boolean) => (val ? 'Yes' : ''),
      sorter: (a: StoryReviewer, b: StoryReviewer) =>
        Number(a.assessmentTraining) - Number(b.assessmentTraining),
    },
    {
      title: 'Language Training',
      dataIndex: 'languageTraining',
      render: (val: boolean) => (val ? 'Yes' : ''),
      sorter: (a: StoryReviewer, b: StoryReviewer) =>
        Number(a.languageTraining) - Number(b.languageTraining),
    },
    {
      title: 'Date',
      dataIndex: 'lastUpdated',
      render: (val: Date) => (
        <DateParser dateFormat="ddd D MMM | HH:mm" timestamp={val.getTime()} />
      ),
      sorter: (a: StoryReviewer, b: StoryReviewer) =>
        a.lastUpdated.getTime() - b.lastUpdated.getTime(),
      align: 'right',
    },
  ]

  return (
    <div>
      <Switch
        checked={manualSorting}
        label="Manual sorting"
        labelPosition="left"
        onChange={setManualSorting}
      />

      <ReviewerTable
        additionalColumns={additionalColumns}
        canInviteMore={false}
        manualSorting={manualSorting}
        onChange={handleChange}
        onInvite={emptyFunc}
        onRemoveRow={onClickRemoveRow}
        onRevokeInvitation={emptyFunc}
        reviewers={reviewers}
      />
    </div>
  )
}
