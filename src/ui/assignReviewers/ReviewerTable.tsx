import React, { ReactNode, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Table as AntTable, TablePaginationConfig } from 'antd'
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import { MenuOutlined } from '@ant-design/icons'

import {
  FilterValue,
  SorterResult,
  SortOrder,
  TableCurrentDataSource,
} from 'antd/es/table/interface'
import { th } from '../../toolkit'

import InviteRowProp from './InviteRowProp'

type Reviewer = {
  id: string
  displayName: string
  email?: string
  invited?: boolean
  acceptedInvitation?: boolean
  rejectedInvitation?: boolean
  invitationRevoked?: boolean
  reviewSubmitted?: boolean
}

type AdditionalColumn = {
  title: string
  dataIndex: string
}

type ReviewerTableProps = {
  additionalColumns?: AdditionalColumn[]
  canInviteMore: boolean
  canDismissReviewer?: boolean
  className?: string
  manualSorting?: boolean
  onChange: (data: Reviewer[]) => void
  onInvite: (id: string) => Promise<void>
  onRemoveRow: (id: string) => Promise<void>
  onRevokeInvitation: (id: string) => Promise<void>
  reviewers?: Reviewer[]
  showEmails?: boolean
}

type TableSorter = SorterResult<Reviewer>

interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  'data-row-key': string
}

const Wrapper = styled.div`
  border: 1px solid grey;
  padding: 16px;
`

const EmptyMessage = styled.div`
  color: ${th('colorTextPlaceholder')};
  font-size: ${th('fontSizeBaseSmall')};
  font-style: italic;
`

const StyledTable = styled(AntTable<Reviewer>)`
  /* Ensure table rows can be transformed for drag and drop */
  .ant-table-tbody > tr {
    &.ant-table-row {
      position: relative;
    }
  }
`

const StyledMenuOutlined = styled(MenuOutlined)`
  cursor: grab;
  touch-action: none;
`

const SortableRow = (props: Readonly<RowProps>): React.ReactNode => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useSortable({
    id: props['data-row-key'],
  })

  const shouldAnimate = !isDragging && transform !== null

  const style: React.CSSProperties = {
    ...props.style,
    transform: CSS.Translate.toString(transform),
    transition: shouldAnimate ? 'transform 200ms ease' : undefined,
    cursor: isDragging ? 'grabbing' : 'grab',
    ...(isDragging ? { position: 'relative', zIndex: 9999, opacity: 0.8, background: 'white' } : {}),
  }

  return <tr {...props} ref={setNodeRef} style={style} {...attributes} {...listeners} />
}

const RegularRow = (props: Readonly<RowProps>): React.ReactNode => {
  return <tr {...props} />
}

const ReviewerTable = (props: ReviewerTableProps): React.ReactNode => {
  const {
    additionalColumns = [],
    canInviteMore,
    canDismissReviewer = false,
    className,
    manualSorting = false,
    onChange,
    onInvite,
    onRemoveRow,
    onRevokeInvitation,
    reviewers = [],
    showEmails = false,
  } = props

  const [tableSorter, setTableSorter] = useState<TableSorter>({})

  useEffect(() => {
    setTableSorter(manualSorting ? {} : tableSorter)
  }, [manualSorting, tableSorter])

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 1,
      },
    }),
  )

  const handleDragEnd = ({ active, over }: DragEndEvent): void => {
    if (active.id !== over?.id) {
      const oldIndex = reviewers.findIndex(r => r.id === active.id)
      const newIndex = reviewers.findIndex(r => r.id === over?.id)
      onChange(arrayMove(reviewers, oldIndex, newIndex))
    }
  }

  if (reviewers.length === 0) {
    return (
      <Wrapper className={className}>
        <EmptyMessage>No reviewers have been added to the list</EmptyMessage>
      </Wrapper>
    )
  }

  const handleChange = (
    _pagination: TablePaginationConfig,
    _filters: Record<string, FilterValue | null>,
    sorter: SorterResult<Reviewer> | SorterResult<Reviewer>[],
    extra: TableCurrentDataSource<Reviewer>,
  ): void => {
    onChange(extra.currentDataSource)
    const singleSorter = Array.isArray(sorter) ? sorter[0] : sorter
    setTableSorter(manualSorting ? {} : singleSorter)
  }

  const columns = [
    ...(manualSorting
      ? [
          {
            key: 'sort',
            width: 40,
            render: () => <StyledMenuOutlined />,
          },
        ]
      : []),
    {
      title: 'Name',
      dataIndex: 'displayName',
      key: 'displayName',
      sorter: (a: Reviewer, b: Reviewer) =>
        a.displayName.toLowerCase().localeCompare(b.displayName.toLowerCase()),
      sortDirections: ['ascend', 'descend'] as SortOrder[],
    },
    {
      title: '',
      dataIndex: 'inviteStatus',
      key: 'inviteStatus',
      render: (_text: unknown, rowData: Reviewer) => (
        <InviteRowProp className={className} data={rowData} type="status" />
      ),
    },
    ...(showEmails
      ? [
          {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            sorter: (a: Reviewer, b: Reviewer) =>
              (a.email ?? '').toLowerCase().localeCompare((b.email ?? '').toLowerCase()),
            sortDirections: ['ascend', 'descend'] as SortOrder[],
          },
        ]
      : []),
    ...additionalColumns,
    {
      title: '',
      dataIndex: 'inviteAction',
      key: 'inviteAction',
      render: (_text: unknown, rowData: Reviewer) => (
        <InviteRowProp
          canInvite={canInviteMore}
          className={className}
          data={rowData}
          onClickInvite={onInvite}
          onClickRevokeInvitation={onRevokeInvitation}
          type="action"
        />
      ),
      align: 'right' as const,
    },
    {
      title: '',
      dataIndex: 'removeRow',
      key: 'removeRow',
      render: (_text: unknown, rowData: Reviewer) => (
        <InviteRowProp
          canDismissReviewer={canDismissReviewer}
          canInvite={canInviteMore}
          className={className}
          data={rowData}
          onClickRemove={onRemoveRow}
          type="remove"
        />
      ),
    },
  ].map(col => {
    const colWithKey = col as { key?: string; sorter?: unknown }
    if (manualSorting) {
      const { sorter: _sorter, ...rest } = colWithKey
      return {
        ...rest,
        sortOrder: undefined,
      }
    }

    return {
      ...col,
      sortOrder:
        tableSorter.columnKey === colWithKey.key ? tableSorter.order : undefined,
    }
  })

  const rows = reviewers.map((r: Reviewer) => ({ ...r, key: r.id }))
  const sortableIds = rows.map(r => r.key)

  const tableContent = (
    <StyledTable
      columns={columns}
      components={manualSorting ? { body: { row: SortableRow } } : { body: { row: RegularRow } }}
      dataSource={rows}
      key={`manual-sorting-${manualSorting}`}
      onChange={handleChange}
      pagination={false}
      rowKey="key"
    />
  )

  return (
    <Wrapper className={className}>
      {manualSorting ? (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={sortableIds}
            strategy={verticalListSortingStrategy}
          >
            {tableContent}
          </SortableContext>
        </DndContext>
      ) : (
        tableContent
      )}
    </Wrapper>
  )
}

export default ReviewerTable
