import React, { ReactNode, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Table as AntTable, TablePaginationConfig } from 'antd'
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DroppableProvided,
  DroppableStateSnapshot,
  DraggableProvided,
  DraggableStateSnapshot,
} from 'react-beautiful-dnd'

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

type TableBodyProps = {
  children: ReactNode
  className?: string
}

type TableRowProps = {
  children: ReactNode
  index: number
  manualSorting: boolean
  'data-row-key': string
  record: Reviewer
  style: React.CSSProperties
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

const StyledTable = styled(AntTable<Reviewer>)``

const StyledMenuOutlined = styled(MenuOutlined)`
  cursor: move;
  touch-action: none;
`

const TableBody = ({
  children,
  className,
  ...props
}: TableBodyProps): React.ReactNode => {
  return (
    <Droppable
      droppableId="droppable-table"
      ignoreContainerClipping={false}
      isCombineEnabled={false}
      isDropDisabled={false}
    >
      {(provided: DroppableProvided, _snapshot: DroppableStateSnapshot) => (
        <tbody
          className={className}
          ref={provided.innerRef}
          {...props}
          {...provided.droppableProps}
        >
          {children}
          {provided.placeholder}
        </tbody>
      )}
    </Droppable>
  )
}

const TableRow = ({
  children,
  index,
  manualSorting,
  ...props
}: TableRowProps): React.ReactNode => {
  return manualSorting ? (
    <Draggable
      draggableId={props['data-row-key'].toString()}
      index={index}
      key={props['data-row-key']}
    >
      {(provided: DraggableProvided, _snapshot: DraggableStateSnapshot) => (
        <tr
          ref={provided.innerRef}
          {...props}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {React.Children.map(children, child => {
            if (
              React.isValidElement(child) &&
              (child as React.ReactElement<{ key?: string }>).key === 'sort'
            ) {
              return React.cloneElement(
                child as React.ReactElement<{ children?: ReactNode }>,
                {
                  children: <StyledMenuOutlined />,
                },
              )
            }

            return child
          })}
        </tr>
      )}
    </Draggable>
  ) : (
    <tr {...props}>{children}</tr>
  )
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

  const onDragEnd = (result: DropResult): void => {
    const { destination, source } = result

    if (!destination) return

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return

    const newDataSource = [...reviewers]
    const draggedElement = newDataSource.splice(source.index, 1)
    newDataSource.splice(destination.index, 0, ...draggedElement)

    onChange(newDataSource)
  }

  const columns = [
    ...(manualSorting
      ? [
          {
            key: 'sort',
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

  return (
    <Wrapper className={className}>
      <DragDropContext onDragEnd={onDragEnd}>
        <StyledTable
          columns={columns}
          components={{
            body: {
              row: TableRow,
              wrapper: TableBody,
            },
          }}
          dataSource={rows}
          key={`manual-sorting-${manualSorting}`}
          onChange={handleChange}
          onRow={(record, index) =>
            ({ record, index, manualSorting }) as React.HTMLAttributes<HTMLElement>
          }
          pagination={false}
          rowKey="id"
        />
      </DragDropContext>
    </Wrapper>
  )
}

export default ReviewerTable
